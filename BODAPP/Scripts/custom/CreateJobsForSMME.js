/// <reference path="financialyearmaster.js" />
var formElem = document.getElementById("formJob");

function SaveRecordForProject() {
   
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            JD_Id: $('#Id').val(),
            JD_JobName: $.trim($('#txtJobName').val()),
            JD_JobStartDate: $('#txtStartDate').val(),
            JD_JobEndDate: $('#txtEndDate').val(),
            JD_CustomerId: $('#ddlCustomer').val(),
            //JD_EnterpriseId: $('#EntrId').val(),
            JD_SmmeId: $('#SmmeId').val(),
            JD_Description: $('#txtDescription').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/Job/ViewAllJobsForSMME";
                    }
                });
               // window.location.href = "/Job/ViewAllJobsForSMME";
               // location.reload();
            }
            else {
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
                text:"Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}
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
            $('#Id').val(data["JD_Id"]);
            $('#txtJobName').val(data["JD_JobName"]);
            $('#txtStartDate').val(data["JD_JobStartDate"]);
            $('#txtEndDate').val(data["JD_JobEndDate"]);
            $('#txtDescription').val(data["JD_Description"]);
            $('#ddlCustomer').val(data["JD_CustomerId"]).change();
            $('#ddlEnterprise').val(data["JD_EnterpriseId"]).change();
            $('#ddlSMME').val(data["JD_SmmeId"]).change();

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
    return false;

}
$(document).ready(function () {

 DropdownBinder.DDLData = {
        tableName: "CustomerDetails_CD",
        Text: 'CD_Name',
        Value: 'CD_Id',
        ColumnName: 'CD_SmmeId',
        PId: $('#SmmeId').val()
        
    };
    DropdownBinder.DDLElem = $("#ddlCustomer");
    DropdownBinder.Execute();

    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#Id').val(Id);
    }
    
});
$(function () {

    var e = $(".ddlCustomer");
   
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Customer", dropdownParent: e.parent() });
        });
   
    FormValidation.formValidation(formElem, {
        fields: {
            txtJobName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Job Name"
                    }
                }
            },
            txtStartDate: {
                validators: {
                    notEmpty: {
                        message: "Please enter Start Date"
                    }
                }
            },
            txtEndDate: {
                validators: {
                    notEmpty: {
                        message: "Please enter End Date"
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

        SaveRecordForProject();
    });
}),

//$('#btnSave').click(function(){
//SaveRecords();
//})

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
            //$('#formAccountSettings').trigger("reset");
            window.location.href = "/Job/ViewAllJobsForSMME";
            
        });

    });
}
$("#btnCancel").on("click", function () {
    fnCancelConfirm();
});

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});