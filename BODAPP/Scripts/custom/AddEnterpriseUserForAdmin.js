

// Global variable to store Id from URL
var Id = 0;
var formElem = document.getElementById("formEnterpriseUser");

// -------------------------
// Utility Functions
// -------------------------

// Get query string parameter by name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Convert bytes to readable size
function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) return bytes + ' ' + sizes[i];
        bytes = parseInt(bytes / 1000);
    }
    return bytes + ' P';
}

// -------------------------
// Core Functionalities
// -------------------------

// Save user data via AJAX
function SaveRecords() {
    var _data = JSON.stringify({
        User: {
            UM_Id: $('#Id').val(),
            UserName: $.trim($('#txtUserName').val()),
            UM_EmailId: $('#txtUserEmail').val(),
            UM_ContactNo: $('#txtContact').val(),
            UM_ProfilePic: $('#hdnupload').val(),
            UM_Role: 'E',
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
                    title: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                }).then(() => window.location = '/Enterprise/ViewAllUser');
            } else {
                Swal.fire({
                    title: data.Message || "Error saving data",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
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
}

// Retrieve user details by Id
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
            $('#Id').val(data.UM_Id);
            $('#txtUserName').val(data.UM_Name);
            $('#txtUserEmail').val(data.UM_EmailId);
            $('#txtContact').val(data.UM_ContactNo);
            $('#ddlRole').val(data.UM_SubRoleId).change();
            $('#txtAge').val(data.UM_Age);
            $('#ddlGender').val(data.UM_Gender).change();

            if (data.UM_ProfilePic === "NO") {
                $('#dvImage').hide();
                var avatar = `<div class="avatar avatar-xl">
                                <span class="avatar-initial bg-label-${["success","danger","warning","info","primary","secondary"][Math.floor(Math.random()*6)]}">
                                ${data.UM_Prefix}</span></div>`;
                $('#dvAvatar').append(avatar);
            } else {
                $('#dvAvatar').hide();
                $('#hdnupload').val(data.UM_ProfilePic);
                $('#prfpicIMG').attr('src', data.UM_ProfilePic);
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
}

// Upload file to server
function UploadDoc(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;

    for (var i = 0; i < totalFiles; i++) {
        formData.append(upload, document.getElementById(upload).files[i]);
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
            if (Id > 0) UpdatePhoto();
        }
    });
}

// Update photo in DB
function UpdatePhoto() {
    var id = $('#Id').val() || getParameterByName('Id');

    var _data = JSON.stringify({
        entr: {
            UM_Id: id,
            UM_ProfilePic: $('#hdnupload').val()
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
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: false
    }).then(function (t) {
        if (t.value) {
            Swal.fire({
                icon: "danger",
                title: "Cancel!",
                text: "Your data has been cleared.",
                customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
            }).then(() => window.location.href = "/Enterprise/ViewAllUser");
        }
    });
}

// Show uploaded image preview
function ShowPreview(input) {
    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');
    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size;

        if (fileSize > maxSize) {
            Swal.fire({ title: 'File size is more than ' + size + 'b', icon: "error", customClass: { confirmButton: "btn btn-primary waves-effect waves-light" }, buttonsStyling: false });
            return false;
        }

        if (input.files && input.files[0]) {
            var ImageDir = new FileReader();
            ImageDir.onload = function (e) {
                $('#prfpicIMG').attr('src', e.target.result);
            };
            ImageDir.readAsDataURL(input.files[0]);
            UploadDoc('upload');
            $('#hdnupload').val('/Upload/' + $('#upload').val().substring(12));
        }
    } else {
        Swal.fire({ title: 'Choose an image, please', icon: "error", customClass: { confirmButton: "btn btn-primary waves-effect waves-light" }, buttonsStyling: false });
        return false;
    }
}

// -------------------------
// Document Ready
// -------------------------

$(document).ready(function () {
    // Only allow alphabets in inputs with class 'alphabets'
    $('.alphabets').on('input', function () {
        $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, ''));
    });

    // Populate dropdown with roles
    DropdownBinder.DDLData = { tableName: "RoleSetUp_RM", Text: 'RM_Role', Value: 'RM_Id' };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();

    $("#alrtmainDiv").hide();
    $("#lnlcncl").click(() => location.reload());

    Id = getParameterByName('Id');
    if (Id) {
        retrive(Id);
        $('#Id').val(Id);
    }

    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');

    // Initialize select2 for dropdowns
    $(".ddlEnterprise, .ddlRole, .ddlGender").each(function () {
        var element = $(this);
        element.wrap('<div class="position-relative"></div>').select2({ placeholder: `Select ${element.attr('class').replace('ddl', '')}`, dropdownParent: element.parent() });
    });

    // Form Validation
    FormValidation.formValidation(formElem, {
        fields: {
            txtUserName: { validators: { notEmpty: { message: "Please enter Username" } } },
            txtUserEmail: { validators: { notEmpty: { message: "Please enter Email" }, emailAddress: { message: "Not a valid email address" } } },
            txtContact: { validators: { notEmpty: { message: "Please enter Contact Number" } } },
            ddlRole: { validators: { notEmpty: { message: "Please Select Role" } } },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "is-valid", rowSelector: () => ".mb-3" }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', SaveRecords);

    // Event Handlers
    $("#btnResetUpload").click(() => $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png'));
    $("#btnCancelRedirect").click(fnCancelRedirect);
});
