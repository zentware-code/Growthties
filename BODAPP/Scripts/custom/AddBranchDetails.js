
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var formElem = document.getElementById("formBrnchDetail");
function SaveRecords() {
   
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        brnch: {
            BD_Id: $('#Id').val(),
            BD_Name: $('#txtName').val(),
            BD_AddressLine1: $('#txtAddressLine1').val(),
            BD_AddressLine2: $('#txtAddressLine2').val(),
            BD_Suburb: $('#txtSuberb').val(),     
            BD_City: $('#txtCity').val(),
            BD_ProvinceId: $('#ddlProvince').val(),
            BD_PostalCode: $('#txtPostalCode').val(),
            BD_ContactNumber: $('#txtContact').val(),
            BD_Email: $('#txtEmail').val(),
            BD_Location: $('#txtLocation').val(),
         
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
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then(function () {
                    window.location.href = "/Enterprise/ViewAllBranch";
                });
              

            }
            else {
                Swal.fire({
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
        },
        error: function (data) {
          

            Swal.fire({
                title: 'Oops...',
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
    DropdownBinder.DDLData = {
        tableName: "ProvinceSetUp_PM",
        Text: 'PM_Province',
        Value: 'PM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlProvince");
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
        retriveBranch(Id);
        $('#Id').val(Id);
    }
    
});

$(function () {
    var e = $(".ddlProvince");
    var f = $(".ddlType");


    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Province", dropdownParent: e.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
       });



    FormValidation.formValidation(formElem, {
        fields: {
            txtName: {
                validators: {
                    notEmpty: {
                        message: "Please enter name"
                    }
                }
            },
           
            txtContact: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact number"
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter email address"
                    },
                    emailAddress: {
                        message: "The value is not a valid email address"
                    }
                }
            },
            
            txtCity: {
                 validators: {
                     notEmpty: {
                         message: "Please enter city"
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
}),

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function retriveBranch(id) {
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
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            //data = JSON.parse(data);
            $('#Id').val(data["BD_Id"]);
            $('#txtName').val(data["BD_Name"]);
            $('#txtAddressLine1').val(data["BD_AddressLine1"]);
            $('#txtAddressLine2').val(data["BD_AddressLine2"]);
            $('#ddlProvince').val(data["BD_ProvinceId"]).change();
            $('#txtPostalCode').val(data["BD_PostalCode"]);
            $('#txtSuberb').val(data["BD_Suburb"]);
            $('#txtCity').val(data["BD_City"]);
            $('#txtEmail').val(data["BD_Email"]);
            $('#txtContact').val(data["BD_ContactNumber"]);
            $('#txtLocation').val(data["BD_Location"]);
           
        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops...',
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
            window.location.href = "/Enterprise/ViewAllBranch";
        });
        
    });
}

$("#btnCancelRedirect").on("click", function () {
    window.location.href = "/Enterprise/ViewAllBranch";
});
