// Global Variables
var btnStatus = '';
var PageStatus = '';
var Id = 0;
var MId = 0;
var Type = "";
var elem = document.getElementById("progress-bar");
var width = 1;
var interval = 0;
let percentValue = 0,
    progressBar = $('.progress-bar');

// Disable the Post button initially
$(document).ready(function () {
    $('#btnPost').prop('disabled', true);
});

// Download template file on button click
$("#btnDownload").click(function (e) {
    e.preventDefault();
    window.location.href = "../Upload/MSME-Bulk-Upload.xlsx";
});

// Enable "Post" button only when a file is selected
$('#uploadFile').on('change', function () {
    if ($(this).val()) {
        progressBarr(); // Start progress bar
        $('#btnPost').prop('disabled', false);
    } else {
        $('#btnPost').prop('disabled', true);
    }
});

// Upload the file on "Post" button click
$('#btnPost').click(function () {
    UploadDoc('uploadFile');
});

// Start the simulated progress bar (20% per tick)
function startBar() {
    if (percentValue < 100) {
        percentValue += 20;
    }
    progressBar.css("width", percentValue + "%").html(percentValue + "%");
}

// Frame-based animation for another progress element (unused in logic)
function frame() {
    if (width >= 100) {
        clearInterval(interval);
    } else {
        width++;
        elem.style.width = width + '%';
        // SaveRecordForProgressButton(Id, MId, PageStatus); // Commented out
    }
}

// Initialize the progress bar
function progressBarr() {
    // resetProgressBar(); // Optional reset
    interval = setInterval(startBar, 100);
}

// Reset progress bar width and clear interval
function resetProgressBar() {
    width = 1;
    clearInterval(interval);
    elem.style.width = width + '%';
}

// Convert bytes to human-readable size
function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseInt(bytes / 1000);
        }
    }
    return bytes + ' P';
}

// Validate file and read its data
function FileUpload(input) {
    var file = $('#uploadFile');
    var fileInput = $('#uploadFile')[0].files[0];
    var size = bytesToSize(800000); // 800KB limit

    // Show error if file is too large
    if (fileInput.size > 800000) {
        Swal.fire({
            title: 'File size is more then ' + size + 'b',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    } else {
        if ($('#uploadFile').prop('files') && $('#uploadFile').prop('files')[0]) {
            var fileDir = new FileReader();
            fileDir.readAsDataURL($('#uploadFile').prop('files')[0]);

            // Get file name and set hidden input value
            pathFl = $('#uploadFile').val().substring(12);
            pathStringFl = '/Upload/' + pathFl;
            var hdnFilePath = pathStringFl;
            $('#hdnupload').val(hdnFilePath);

            // UploadDoc('uploadFile'); // Called on button click instead
        }
    }
}

// Handle the actual file upload via AJAX
function UploadDoc(upload) {
    // Start progress bar timer
    timer = setInterval(startBar, 500);

    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;

    // Append all selected files to form data
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }

    // AJAX request to server
    $.ajax({
        type: "POST",
        url: '/ScriptJson/UploadBulkSMMEForAdmin',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function () {
            progressBarr(); // Start progress bar
        },
        success: function () {
            clearInterval(timer); // Stop progress bar
        }
    })
    .done(function (data) {
        if (data != null && data != undefined && data.IsSuccess == true && data.Id > 0) {
            // Show success message
            Swal.fire({
                title: "Successful..!",
                icon: "success",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                text: "Your File Upload successfully",
                buttonsStyling: !1
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(); // Refresh page
                }
            });
            // window.location.href = "/SMME/AddBulkSMMEForAdmin"; // Optional redirect
        } else {
            // Show error message from server
            Swal.fire({
                title: 'Error!',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                text: data.Message,
                buttonsStyling: !1
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    })
    .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        // console.log("Request Failed: " + err); // Optional debug log
    });
}
