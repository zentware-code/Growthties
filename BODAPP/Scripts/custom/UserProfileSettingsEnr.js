var formElem = document.getElementById("formAdminUserManage");

$(document).ready(function () {
    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');

    DropdownBinder.DDLData = {
        tableName: "RoleSetUp_RM",
        Text: 'RM_Role',
        Value: 'RM_Role'
    };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "BranchDetails_BD",
        Text: 'BD_Name',
        Value: 'BD_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBranch");
    DropdownBinder.Execute();

    Id = getParameterByName('Id');
    if (Id != '') {
            $('#Id').val(Id);
        GetDataForEnrProfile(Id);

        //    $('.projectCompleteDiv').show();
        //} else {
        //    $('.projectCompleteDiv').hide();
        //}
    }
   
}
);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function () {
    var h = $(".ddlGender");
    var f = $(".ddlRole");
    var b = $(".ddlBranch");

    h.length &&
    h.each(function () {
        var h = $(this);
        h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select Gender", dropdownParent: h.parent() });
    });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select Role", dropdownParent: f.parent() });
       });

    b.length &&
        b.each(function () {
            var b = $(this);
            b.wrap('<div class="position-relative"></div>'), b.select2({ placeholder: "Select Branch", dropdownParent: b.parent() });
        });


    FormValidation.formValidation(formElem, {
        fields: {
            txtFirstName: {
                validators: {
                    notEmpty: {
                        message: "Please enter firstname"
                    }
                }
            },
            txtLastName: {
                validators: {
                    notEmpty: {
                        message: "Please enter lastname"
                    }
                }
            },
            txtUserEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter email"
                    },
                    emailAddress: { message: "The value is not a valid email address" }
                }
            },
            txtContact: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact number"
                    }
                }
            },
            ddlEnterprise: {
                validators: {
                    notEmpty: {
                        message: "Please select enterprise"
                    }
                }
            },
            ddlRole: {
                validators: {
                    notEmpty: {
                        message: "Please select role"
                    }
                }
            },

        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function (formElem, t) {
                    return ".mb-3";
                },
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', function () {
        SaveRecords();
    });
});

function SaveRecords() {
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        User: {
            UM_Id: $('#Id').val(),
            UM_FirstName: $.trim($('#txtFirstName').val()),
            UM_LastName: $.trim($('#txtLastName').val()),
            UM_EmailId: $.trim($('#txtUserEmail').val()),
            UM_ContactNo: $.trim($('#txtContact').val()),
            UM_ProfilePic: $('#hdnupload').val(),
            UM_Role: 'A',
            UM_SubRoleId: $('#ddlRole').val(),
            UM_SubRole: $('#ddlRole option:selected').text(),
            UM_Age: $('#txtAge').val(),
            UM_Gender: $('#ddlGender').val(),
            UM_BranchId: $('#ddlBranch').val()
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/InsertEnterpriseUserFromEnterprise",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                var retId = $('#Id').val();
                //if (retId > 0) {
                    Swal.fire({
                        title: "Successful..!",
                        text: "Your changes were saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    }).then((result) => {
                        if (result.isConfirmed) {
                            GetDataForEnrProfile(retId)
                        }
                    });

                    $('#setupUserProfileSetingModal').modal('hide');
                    $('#setupUserProfileSetingModal').find('input, select').val('');
                    $(".form-control").val('')
                    $("#btnUpdateNext").html('Save');
                    $('#btnUpdateNext').removeAttr('disabled');
                //} else {
                //    SendMail();
                //}
            }
            else {
                var Email = $('#txtUserEmail').val();
                var Phone = $('#txtContact').val();

                var titleText = '';
                if (data.Id == -1) {
                    titleText = '"' + Email + '"' + " this email already exists..!";
                } else if (data.Id == -2) {
                    titleText = '"' + Phone + '"' + " this phone number already exists..!";
                } else {
                    titleText = data.Message;
                }

                Swal.fire({
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {


            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });
}

function GetDataForEnrProfile(id) {
    //$('#setupUserProfileSetingModal').addClass('show');
    //$('.btn-close').click(function () {

    //    $('#setupUserProfileSetingModal').removeClass('show');
    //    $('.form-control').val('');
    //});
    //$('#setupUserProfileSetingModal').addClass('show').css('display', 'block').attr('aria-hidden', 'false');


    $('#setupUserProfileSetingModal').modal('show');
    // Close button functionality
    $('.btn-close, .btn[data-bs-dismiss="modal"]').click(function () {
        $('#setupUserProfileSetingModal').removeClass('show').css('display', 'none').attr('aria-hidden', 'true');
        $('.form-control').val('');
        $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
        $('.select2').val('').change();
    });


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseUserForUserProfile',
            param1: 'UM_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'UserMaster_USP'
        }
    });
  


    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

         console.log('userprofiledate - ', data);

            $('#Id').val(data[0].UM_Id);
            $('#txtFirstName').val(data[0].UM_FirstName);
            $('#txtLastName').val(data[0].UM_LastName);
            $('#txtUserEmail').val(data[0].UM_EmailId);
            $('#txtContact').val(data[0].UM_ContactNo);
            $('#ddlRole').val(data[0].UM_SubRole).change();
            $('#txtAge').val(data[0].UM_Age);
            $('#ddlGender').val(data[0].UM_Gender).change();
            $('#ddlBranch').val(data[0].UM_BranchId).change();



            if (data[0].UM_ProfilePic == "NO") {
                $('#dvImage').css('display', 'none');
                $('#dvAvatar').css('display', 'block');
                $('#dvAvatar').html('');

                var avatar = '<div class="avatar avatar-lg me-2"><span class="avatar-initial rounded-circle  bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + data[0].UM_Prefix + '</span></div>';
                $('#dvAvatar').append(avatar);

            } else {
                $('#dvAvatar').html('');
                $('#dvAvatar').css('display', 'none');
                $('#dvImage').css('display', 'block');
                $('#hdnupload').val(data[0].UM_ProfilePic);
                $('#prfpicIMG').attr('src', data[0].UM_ProfilePic);
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

//For upload file into folder
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
        success: function (response) {
            $('#dvAvatar').css('display', 'none');
            $('#dvImage').css('display', 'block');
            if (Id > 0) {

                UpdatePhoto();
            }

        }
    });
}

function UpdatePhoto() {
    Id = getParameterByName('Id');
    if ($('#Id').val() == "") {
        var id = Id;
    } else {
        var id = $('#hdnId').val();
    }
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
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: 'Good Job!',
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

}

function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            //$('#formAccountSettings').trigger("reset");
            window.location.href = "/Enterprise/ViewAllUser";
        });

    });
}

function ShowPreview(input) {

    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes


        if (fileSize > maxSize) {

            Swal.fire({
                title: 'Oops..',
                text: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
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
                pathFl = $('#upload').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnupload').val(hdnImagePath);
            }
        }
    } else {

        Swal.fire({
            title: 'Oops..',
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}

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

$("#btnResetUpload").on("click", function () {

    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
});

//function SendMail() {
//    $('#btnUpdateNext').prop('disabled', true);
//    $("#btnUpdateNext").html('Please Wait.....');

//    var action = 'adminuseradd';

//    var _data = JSON.stringify({
//        emailcontent: {
//            UserName: $('#txtFirstName').val(),
//            SubRole: $('#ddlRole option:selected').text(),
//            UM_Login: $('#txtUserEmail').val(),
//            Password: $('#txtContact').val().replace(/\s+/g, ''),
//        },
//        Action: action
//    });

//    $.ajax({
//        type: "POST",
//        url: "/ScriptJson/GetEmailExistsByTemplate",
//        data: _data,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            if (data != null && data.IsSuccess === true) {
//                //Swal.fire({
//                //    title: data.Message,
//                //    icon: "success",
//                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                //    buttonsStyling: !1
//                //});

//                Swal.fire({
//                    title: 'Good Job!',
//                    text: "Your changes were saved successfully!",
//                    icon: "success",
//                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                    buttonsStyling: !1
//                });

//                var oTable = $('#datatable-example').DataTable();
//                oTable.destroy();
//                BindGrid();

//                $('#setupUserProfileSetingModal').modal('hide');
//                $('#setupUserProfileSetingModal').find('input, select').val('');
//                $(".form-control").val('')

//                //Swal.fire({
//                //    title: "Your changes were saved successfully!",
//                //    icon: "success",
//                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                //    buttonsStyling: !1
//                //}).then((result) => {

//                //    if (result.isConfirmed) {

//                //        if ($('#EntrId').val() > 0) {
//                //            window.location.href = "/Project/ProjectListForEnterprise";
//                //        }
//                //        else {
//                //            window.location.href = "/Project/ProjectListForAdmin";
//                //        }

//                //    }


//                //});
//                //$(document).ajaxStop(function () {
//                //    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
//                //});
//                $("#btnUpdateNext").html('Save');
//                $('#btnUpdateNext').removeAttr('disabled');


//            } else {
//                Swal.fire({
//                    title: 'Oops..',
//                    text: "Invalid email, try another email..!",
//                    icon: "warning",
//                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                    buttonsStyling: false
//                });
//                $("#btnUpdateNext").html('Save');
//                $('#btnUpdateNext').removeAttr('disabled');
//                //setTimeout(function () {
//                //    window.location.reload();  
//                //}, 2000);
//            }
//        },
//        error: function () {
//            Swal.fire({
//                title: 'Oops..',
//                text: "Process not complete",
//                icon: "error",
//                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                buttonsStyling: false
//            });
//        }
//    });
//}

