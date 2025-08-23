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

// Disable the "Post" button on page load
$(document).ready(function () {
    $('#btnPost').prop('disabled', true);
});

// Download Excel template file on button click
$("#btnDownload").click(function (e) {
    e.preventDefault();
    window.location.href = "../Upload/MSME-Bulk-Upload.xlsx";
});

// Enable "Post" button when a file is selected
$('#uploadFile').on('change', function () {
    if ($(this).val()) {
        progressBarr(); // Start progress bar
        $('#btnPost').prop('disabled', false);
    } else {
        $('#btnPost').prop('disabled', true);
    }
});

// Handle file upload on button click
$('#btnPost').click(function () {
    UploadDoc('uploadFile');
});

// Progress bar update (increases by 20%)
function startBar() {
    if (percentValue < 100) {
        percentValue += 20;
    }
    progressBar.css("width", percentValue + "%").html(percentValue + "%");
}

// Optional progress animation function (not actively used)
function frame() {
    if (width >= 100) {
        clearInterval(interval);
    } else {
        width++;
        elem.style.width = width + '%';
        // SaveRecordForProgressButton(Id, MId, PageStatus); // Optional functionality
    }
}

// Start the progress bar animation
function progressBarr() {
    // resetProgressBar(); // Optional reset before starting
    interval = setInterval(startBar, 100);
}

// Reset the progress bar
function resetProgressBar() {
    width = 1;
    clearInterval(interval);
    elem.style.width = width + '%';
}

// Convert byte size to readable format
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

// Validate file and prepare hidden path value
function FileUpload(input) {
    var file = $('#uploadFile');
    var fileInput = $('#uploadFile')[0].files[0];
    var size = bytesToSize(800000); // 800KB limit

    if (fileInput.size > 800000) {
        // Show error if file exceeds allowed size
        Swal.fire({
            title: 'File size is more then ' + size + 'b',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    } else {
        if ($('#uploadFile').prop('files') && $('#uploadFile').prop('files')[0]) {
            // Read file as DataURL (optional preview/processing)
            var fileDir = new FileReader();
            fileDir.readAsDataURL($('#uploadFile').prop('files')[0]);

            // Extract filename and set hidden input value
            pathFl = $('#uploadFile').val().substring(12);
            pathStringFl = '/Upload/' + pathFl;
            var hdnFilePath = pathStringFl;
            $('#hdnupload').val(hdnFilePath);

            // UploadDoc('uploadFile'); // Upload triggered by button click
        }
    }
}

// Upload file using AJAX
function UploadDoc(upload) {
    timer = setInterval(startBar, 500); // Start progress bar timer

    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;

    // Append selected files to form data
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }

    $.ajax({
        type: "POST",
        url: '/ScriptJson/UploadBulkSMMEForEnterprise',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function () {
            progressBarr(); // Start progress bar animation
        },
        success: function () {
            clearInterval(timer); // Stop progress bar
        }
    }).done(function (data) {
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

            // window.location.href = "/Enterprise/AddBulkSMMEForEnterprise"; // Optional redirect
        } else {
            // Show server error message
            Swal.fire({
                title: 'Oops..!',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                text: data.Message,
                buttonsStyling: !1
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(); // Refresh page
                }
            });
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        // console.log("Request Failed: " + err); // Optional debug
    });
}
