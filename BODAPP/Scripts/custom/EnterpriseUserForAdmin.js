/// <reference path="financialyearmaster.js" />
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var formElem = document.getElementById("formEnterpriseUser");


function SaveRecords() {
   
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        User: {
            UM_Id: $('#Id').val(),
            UserName: $('#txtUserName').val(),
            UM_EmailId: $('#txtUserEmail').val(),
            UM_ContactNo: $('#txtContact').val(),
            ENR_Id: $('#ddlEnterprise').val(),
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
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then(function () {
                    window.location.href = "/Home/ViewAllEnterpriseUserForAdmin";
                });
                //window.location = '/Home/ViewAllEnterpriseUserForAdmin';

            }
            else {
                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
        },
        error: function (data) {
          

            Swal.fire({
                title:"Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

$(document).ready(function () {

    DropdownBinder.DDLData = {
        tableName: "RoleSetUp_RM",
        Text: 'RM_Role',
        Value: 'RM_Role'
    };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $("#ddlEnterprise");
    DropdownBinder.Execute();

    $("#alrtmainDiv").hide();
    //$("#lnkSaveUser").click(function () {
    //    SaveRecord();
    //});
    $("#lnlcncl").click(function () {
        location.reload();
    });
    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#Id').val(Id);
    }
    
});

$(function () {
    var e = $(".ddlEnterprise");
    var f = $(".ddlRole");
    var h = $(".ddlGender");
    h.length &&
h.each(function () {
    var h = $(this);
    h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A Gender", dropdownParent: h.parent() });
});
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Enterprise", dropdownParent: e.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Role", dropdownParent: f.parent() });
       });

    FormValidation.formValidation(formElem, {
        fields: {
            txtUserName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Username"
                    }
                }
            },
            txtUserEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter Email"
                    },
					emailAddress: { message: "The value is not a valid email address" }
                }
            },
            txtContact: {
                validators: {
                    notEmpty: {
                        message: "Please enter Contact Number"
                    }
                }
            },
            ddlEnterprise: {
                validators: {
                    notEmpty: {
                        message: "Please Select Enterprise"
                    }
                }
             },
            ddlRole: {
                 validators: {
                     notEmpty: {
                         message: "Please Select Role"
                     }
                 }
             },

        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function (formElem, t) {
                    return ".mb-6";
                },
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', function () {
SaveRecords();
    });
}),

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: parseInt(id),
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
            //data = JSON.parse(data);
            $('#Id').val(data["UM_Id"]);
            $('#txtUserName').val(data["UM_Name"]);
            $('#txtUserEmail').val(data["UM_EmailId"]);
            $('#txtContact').val(data["UM_ContactNo"]);
            $('#ddlEnterprise').val(data["UM_ParentId"]).change();
            $('#ddlRole').val(data["UM_SubRole"]).change();
            $('#txtAge').val(data["UM_Age"]);

            $('#ddlGender').val(data["UM_Gender"]).change();
        },
        error: function (data) {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function fnCancelRedirect() {
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
        }).then(function() {
            window.location.href = "/Home/ViewAllEnterpriseUserForAdmin";
        });
        
    });

    //Swal.fire({
    //    title: "Are you sure?",
    //    text: "You won't be able to revert this!",
    //    icon: "warning",
    //    showCancelButton: !0,
    //    confirmButtonText: "Yes, Cancel it!",
    //    cancelButtonText: "Discard",
    //    customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },

    //    buttonsStyling: !1,
    //}).then((result) => {
    //    if (result.isConfirmed) {
    //        Swal.fire({
    //                    icon: "danger",
    //                    title: "Cancel!",
    //                    text: "Your data has been cleared.",
    //                    customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
    //                }).then(function() {
    //                    window.location.href = "/Home/ViewAllEnterpriseUserForAdmin";
    //                });
    //    } else if (
            
    //      result.dismiss === Swal.DismissReason.cancel
    //    ) {
    //        swalWithBootstrapButtons.fire({
    //            title: "Cancelled",
    //            text: "Your imaginary file is safe :)",
    //            icon: "error"
    //        });
    //    }
    //});
}

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});
