/// <reference path="financialyearmaster.js" />
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var formElem = document.getElementById("formCost");
function SaveRecords() {
   
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        cost: {
            CM_Id: $('#Id').val(),
            CM_Name: $('#txtCostName').val(),
            CM_Charge:parseFloat( $('#txtCost').val()),
            CM_Type: $('#ddlType').val(),
          
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertCostManagement',
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
                }).then(function () {
                    window.location.href = "/SMME/ViewCostManagement";
                });
              

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
$(document).ready(function () {

    $('.alphabets').on('input', function () {

        let inputValue = $(this).val();

        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

        $(this).val(alphabeticValue);
    });
    //DropdownBinder.DDLData = {
    //    tableName: "ProvinceSetUp_PM",
    //    Text: 'PM_Province',
    //    Value: 'PM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlProvince");
    //DropdownBinder.Execute();


    //$("#alrtmainDiv").hide();
    ////$("#lnkSaveUser").click(function () {
    ////    SaveRecord();
    ////});
    //$("#lnlcncl").click(function () {
    //    location.reload();
    //});
    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#Id').val(Id);
    }
    
});

$(function () {

    var f = $(".ddlType");

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
       });

    FormValidation.formValidation(formElem, {
        fields: {
            txtCostName: {
                validators: {
                    notEmpty: {
                        message: "Please cost name"
                    }
                }
            },
           
            txtCost: {
                validators: {
                    notEmpty: {
                        message: "Please enter cost"
                    }
                }
            },
           
            
            ddlType: {
                validators: {
                    notEmpty: {
                        message: "Please select  type"
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
            TransactionType: 'Select',
            param1: 'CM_Id ',
            param1Value: parseInt(id),
            param2: 'CM_SMMEId ',
            param2Value: parseInt($('#SMMEId').val()),
            StoreProcedure: 'CostManagement_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            $('#Id').val(data[0].CM_Id);
            $('#txtCostName').val(data[0].CM_Name);
            $('#txtCost').val(data[0].CM_Charge);
            $('#ddlType').val(data[0].CM_Type).change();
    
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
            window.location.href = "/SMME/ViewCostManagement";
        });
        
    });

}

$("#btnCancelRedirect").on("click", function () {
    //fnCancelRedirect();
    window.location.href = "/SMME/ViewCostManagement";
});
