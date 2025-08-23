var Id;
var M = "";
var formElem = document.getElementById("formAccountSettings");

var themeStyle = "/Content/assets/vendor/css/rtl/theme-default.css";
var themeColor = "primary";
var styleType = "light"


//function SetThemeStyle(type, styleMode) {

//    themeStyle = styleMode;
//    styleType = type;

//    //console.log(themeStyle)
//}

$(function () {
    var e = $(".ddlSector");
    var f = $(".ddlBusinessType");
    var g = $(".ddlProvince");
    var h = $(".ddlLegalEntity");
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Sector", dropdownParent: e.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
       });

    g.length &&
         g.each(function () {
             var g = $(this);
             g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
         });
    h.length &&
        h.each(function () {
            var h = $(this);
            h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A LegalEntity", dropdownParent: h.parent() });
        });
    FormValidation.formValidation(formElem, {
        fields: {
            txtCompanyName: {
                validators: {
                    notEmpty: {
                        message: "Please enter smme name"
                    }
                }
            },
            txtRegNum: {
                validators: {
                    notEmpty: {
                        message: "Please enter registration number"
                    }
                }
            },
            ddlSector: {
                validators: {
                    notEmpty: {
                        message: "Please Select sector"
                    }
                }
            },
            ddlBusinessType: {
                validators: {
                    notEmpty: {
                        message: "Please Select business type"
                    }
                }
            },
            ddlProvince: {
                validators: {
                    notEmpty: {
                        message: "Please Select Province"
                    }
                }
            },
            txtContactName: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact name"
                    }
                }
            },
            txtContactEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter email address"
                    },
                    emailAddress: {
                        message: "The value is not a valid email address"
                    }
                }
            },
            PrimaryContactNumber: {
                validators: {
                    notEmpty: {
                        message: "Please enter primary contact name"
                    }
                }
            },
            SecondaryContactEmail: {
                validators: {

                    emailAddress: {
                        message: "The value is not a valid email address"
                    }
                }
            }

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

        SaveRecords('N');
    });
}),


$(document).ready(function () {
    $('.themeContainerBox').click(function () {
        $('.themeContainerBox').removeClass('selectedTheme')
        $(this).addClass('selectedTheme')
    });
    $('.themeColorBox').click(function () {
        //$('.themeColorBox').removeClass('selectedThemeColor')
        //$(this).addClass('selectedThemeColor')
        $('.themeColorBox').html('')
        $(this).html('<i class="ti ti-check ti-sm"></i>')
    })
    //$('.alphabets').on('input', function () {

    //    let inputValue = $(this).val();

    //    let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    //    $(this).val(alphabeticValue);
    //});
    
    //var mode = $('#hdnMode').val();

    //Id = getParameterByName('Id');

    //M = getParameterByName('M');
    //if (M != 'A') {
    //    retrive(mode);
    //}
    //else if (M == 'A' && Id > 0) {
    //    retrive(mode);
    //}
    //else {
    //    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
    //}
    $('#hdnupload').val('~/Content/assets/img/avatars/default_companyphoto.png');
 
});
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
function ShowPreview(input) {

    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes
     
        var file = fileInput.get(0).files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/png"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            // invalid file type code goes here.
            Swal.fire({
                title: "Oops..",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }
     
       
        //if (getOrientation(fileInput.get(0).files[0]) == false)
        //   {
        //       Swal.fire({
        //           title: 'invalid file Orientation',
        //           icon: "error",
        //           customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //           buttonsStyling: !1
        //       });
        //       return false;
        //   }
       

        if (fileSize > maxSize) {

            Swal.fire({
                title:"Oops..",
                text: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
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
        

        }
    });
}

function ShowPreviewWorkSpace(input) {

    var fileInput = $('#uploadWorkSpce');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes

        var file = fileInput.get(0).files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            // invalid file type code goes here.
            Swal.fire({
                title: "Oops..",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }


        //if (getOrientation(fileInput.get(0).files[0]) == false) {
        //    Swal.fire({
        //        title: 'invalid file Orientation',
        //        icon: "error",
        //        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //        buttonsStyling: !1
        //    });
        //    return false;
        //}


        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops..",
                text: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMGWorkSpace').attr('src', e.target.result);
                }

                ImageDir.readAsDataURL(input.files[0]);

                UploadDoc('uploadWorkSpce');
                pathFl = $('#uploadWorkSpce').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnWorkSpceUpload').val(hdnImagePath);
            }
        }
    } else {

        Swal.fire({
            title: "Oops..",
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}

function fnCancelConfirm() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText: "Discard",
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            $('#formAccountSettings').trigger("reset");
            //window.location.href = "/Home/ViewAllEnterpriseUserForAdmin";
        });

    });
}
function fnCancelRedirect() {

   
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText:"Discard",
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
            window.location.href = "/SMME/SMMELists";
        });

    });
}

$("#btnCancel").on("click", function () {
    fnCancelConfirm();
});

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});

$("#btnResetUpload").on("click", function () {
    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_companyphoto.png');
});


function SaveRecords() {
   
    var _data = JSON.stringify({
        entity: {
            ENR_Id: $('#hdnEnterid').val(),
            ENR_BussinessDescripton: $('#txtBusinessDesc').val(),
            ENR_CompanyLogo: $('#hdnupload').val(),
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/UpdateWhiteListing',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //alert("Record saved successfully...");
                changeThemeStyle(colorHex,colorRGB,themeMode, themeStyle);
                //GetUserLoginForWhitelisting(data.Id);
            
                 Swal.fire({
                     title: "Workspace setup completed!",
                     text: "Your workspace has been successfully configured. You will now be redirected to the login page!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/Account/EnterpriseLogin';
                    }
                });



                //Swal.fire({
                //    title: "Good Job..",
                //    text: data.Message,
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});
             
                //window.location.href = '/Account/EnterpriseLogin';

            }
            else {
                Swal.fire({
                    title: "Oops..",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}
function GetUserLoginForWhitelisting(Id) {

    var _data = JSON.stringify({
        global: {
           param1Value: Id,

        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetUserLoginForWhitelisting",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            //$('#spnHeadName').text(data[0].ENR_CompanyName);
            //$('#spnHeadRole').text(data[0].UM_SubRole);
            //$('#spnCity').text(data[0].PM_Province);
            //$('#spnDate').text(data[0].ENR_CreatedDate);

            //if (data["ENR_Logo"] == "NO") {
            //    //$('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');

            //    $('#dvPic').html('<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"> <span class="avatar-initial  bg-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '>' + data["ENR_PreFix"] + '</span></div>');
            //    //<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img">
            //    //         <span class="avatar-initial  bg-@list[index]">@Model.ENR_Prefix</span>
            //    //     </div>
            //}
            //else {


            //    $('#prfpicIMG').attr('src', data["ENR_Logo"]);
            //}

        },
        error: function (data) {
            Swal.fire({
                title: "Oops..",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}