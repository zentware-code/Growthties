// Global variable for Id
var Id = 0;

// Function to get query string parameter by name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Form element reference
var formElem = document.getElementById("formEnterpriseUser");

// Save user record data via AJAX
function SaveRecords() {
    // Create JSON payload from form fields
    var _data = JSON.stringify({
        User: {
            UM_Id: $('#Id').val(),
            UserName: $.trim($('#txtUserName').val()),
            UM_EmailId: $('#txtUserEmail').val(),
            UM_ContactNo: $('#txtContact').val(),
            UM_ProfilePic: $('#hdnupload').val(),
            UM_Role: 'A',
            UM_SubRoleId: $('#ddlRole').val(),
            UM_SubRole: $('#ddlRole option:selected').text(),
            UM_Age: $('#txtAge').val(),
            UM_Gender: $('#ddlGender').val()
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.SaveRecordData,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data && data.IsSuccess) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                window.location.href = "/Home/ViewAllUser";
            } else {
                Swal.fire({
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

$(document).ready(function () {

    // Restrict input to alphabets only
    $('.alphabets').on('input', function () {
        let inputValue = $(this).val();
        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
        $(this).val(alphabeticValue);
    });

    // Bind dropdown data for roles
    DropdownBinder.DDLData = {
        tableName: "RoleSetUp_RM",
        Text: 'RM_Role',
        Value: 'RM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();

    // Hide main alert div initially
    $("#alrtmainDiv").hide();

    // Cancel button reloads the page
    $("#lnlcncl").click(function () {
        location.reload();
    });

    // Get Id from query string and retrieve user details if exists
    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#Id').val(Id);
    }

    // Set default profile picture
    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
});

// Initialize select2 and form validation
$(function () {
    var e = $(".ddlEnterprise"),
        f = $(".ddlRole"),
        h = $(".ddlGender");

    // Apply select2 with placeholder for gender
    h.each(function () {
        var h = $(this);
        h.wrap('<div class="position-relative"></div>')
            .select2({ placeholder: "Select A Gender", dropdownParent: h.parent() });
    });

    // Apply select2 for enterprise
    e.each(function () {
        var e = $(this);
        e.wrap('<div class="position-relative"></div>')
            .select2({ placeholder: "Select A Enterprise", dropdownParent: e.parent() });
    });

    // Apply select2 for role
    f.each(function () {
        var f = $(this);
        f.wrap('<div class="position-relative"></div>')
            .select2({ placeholder: "Select A Role", dropdownParent: f.parent() });
    });

    // Form validation using FormValidation plugin
    FormValidation.formValidation(formElem, {
        fields: {
            txtUserName: {
                validators: {
                    notEmpty: { message: "Please enter Username" }
                }
            },
            txtUserEmail: {
                validators: {
                    notEmpty: { message: "Please enter Email" },
                    emailAddress: { message: "The value is not a valid email address" }
                }
            },
            txtContact: {
                validators: {
                    notEmpty: { message: "Please enter Contact Number" }
                }
            },
            ddlRole: {
                validators: {
                    notEmpty: { message: "Please Select Role" }
                }
            }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function () { return ".mb-3"; }
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', function () {
        SaveRecords();
    });
});

// Retrieve user by Id via AJAX
function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: parseInt(id),
            param2: 'UM_MainID',
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            $('#Id').val(data["UM_Id"]);
            $('#txtUserName').val(data["UM_Name"]);
            $('#txtUserEmail').val(data["UM_EmailId"]);
            $('#txtContact').val(data["UM_ContactNo"]);
            $('#ddlRole').val(data["UM_SubRoleId"]).change();
            $('#txtAge').val(data["UM_Age"]);
            $('#ddlGender').val(data["UM_Gender"]).change();

            // Handle profile picture or avatar
            if (data["UM_ProfilePic"] == "NO") {
                $('#dvImage').hide();
                var avatar = '<div class="avatar avatar-xl"><span class="avatar-initial bg-label-' +
                    ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                    '">' + data["UM_Prefix"] + '</span></div>';
                $('#dvAvatar').append(avatar);
            } else {
                $('#dvAvatar').hide();
                $('#hdnupload').val(data["UM_ProfilePic"]);
                $('#prfpicIMG').attr('src', data["UM_ProfilePic"]);
            }
        },
        error: function () {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}

// Upload file to server
function UploadDoc(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;

    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }

    $.ajax({
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function () {
            $('#dvAvatar').hide();
            $('#dvImage').show();
            if (Id > 0) {
                UpdatePhoto();
            }
        }
    });
}

// Update user photo after upload
function UpdatePhoto() {
    Id = getParameterByName('Id');
    var id = $('#Id').val() === "" ? Id : $('#hdnId').val();

    var _data = JSON.stringify({
        entr: {
            UM_Id: id,
            UM_ProfilePic: $('#hdnupload').val(),
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/EnterpriseUserPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data && data.IsSuccess) {
                Swal.fire({
                    title: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

// Cancel redirect confirmation
function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel it!",
        customClass: {
            confirmButton: "btn btn-primary me-3 waves-effect waves-light",
            cancelButton: "btn btn-label-secondary waves-effect waves-light"
        },
        buttonsStyling: false,
    }).then(function (t) {
        if (t.value) {
            Swal.fire({
                icon: "danger",
                title: "Cancel!",
                text: "Your data has been cleared.",
                customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
            }).then(function () {
                window.location.href = "/Home/ViewAllUser";
            });
        }
    });
}

// Show file preview before upload
function ShowPreview(input) {
    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');
    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size;

        if (fileSize > maxSize) {
            Swal.fire({
                title: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
            return false;
        } else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMG').attr('src', e.target.result);
                }
                ImageDir.readAsDataURL(input.files[0]);
                UploadDoc('upload');

                var pathFl = $('#upload').val().substring(12);
                var pathStringFl = '/Upload/' + pathFl;
                $('#hdnupload').val(pathStringFl);
            }
        }
    } else {
        Swal.fire({
            title: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
        return false;
    }
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

// Reset upload button handler
$("#btnResetUpload").on("click", function () {
    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
});

// Cancel button handler
$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});
