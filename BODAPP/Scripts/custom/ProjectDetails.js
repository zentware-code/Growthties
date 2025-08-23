/// <reference path="financialyearmaster.js" />
var formElem = document.getElementById("formProject");
var Id = 0;

$('#btnSave').click(function () {
    var projectName = $.trim($('#txtProjectName').val());
    var durationFrom = $('#txtDurationDateFrom').val();
    var durationTo = $('#txtDurationDateTo').val();
    var budgetType = $('#ddlBudgetType').val();
    var businessType = $('#ddlBusinessType').val();
    var sector = $('#ddlSector').val();

    // Only call SaveRecordForProject if all required fields are filled
    if (projectName && durationFrom && durationTo && budgetType && businessType && sector) {
        SaveRecordForProject();
    }
    // Otherwise, do nothing silently
});





function SaveRecordForProject() {
    var enrId = $('#ddlEnterprise').val();
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            PD_Id: $('#Id').val(),
            PD_ProjectName: $.trim($('#txtProjectName').val()),
            PD_DurationFromDate: $('#txtDurationDateFrom').val(),
            PD_DurationToDate: $('#txtDurationDateTo').val(),
            PD_Description: $('#txtDescription').val(),
            PD_Budget: $('#txtBudget').val(),
            PD_BudgetType: $('#ddlBudgetType').val(),
            PD_BusinessTypeId: $('#ddlBusinessType').val(),
            PD_SectorId: $('#ddlSector').val(),
            PD_EnterpriseId: $('#ddlEnterprise').val(),

            UWP_UserType: $('#hdnUserType').val(),
          //  PD_BranchId: $('#ddlBranch').val(),
            BranchList: $('#ddlBranch').val(),
        }
    });
    
    retriveEnterpriseDetails(enrId);

    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
        data: _data,
        beforeSend: function () {
            LoaderStart(".section-blockproject");  
        },
       
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                if(data.Id>0)
                {
                    var pdId = data.Id;
                   
                    if (Id > 0) {
                        Swal.fire({
                            title: "Successful..!",
                            text: "Project edited successfully..!",
                            icon: "success",
                            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                            buttonsStyling: !1
                        }).then((result) => {

                            if (result.isConfirmed) {

                                if ($('#EntrId').val() > 0) {
                                    window.location.href = "/Project/ProjectListForEnterprise";
                                }
                                else {
                                    window.location.href = "/Project/ProjectListForAdmin";
                                }

                            }


                        });
                        LoaderEnd(".section-blockproject");
                    }
                    else {
                        SendMail(pdId);
                    }
                }
                else
                {
                    Swal.fire({
                     title: "Oops...",
                     text: data.Message,
                     icon: "error",
                     customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                     buttonsStyling: !1
                 });
                }
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
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function SendMail(id) {
    $('#btnSave').prop('disabled', true); 
    $("#btnSave").html('Please Wait.....');  

    var action = 'addnewproject';

    var _data = JSON.stringify({
        emailcontent: {
            //UM_EmailId: $('#EnrEmailId').val(),
            //UserName: $('#UserName').val(),
            //CompanyName: $('#CompanyName').val(),
            PD_Id: parseInt(id),
            EventName: $('#txtProjectName').val(),
            EventFromDate: $('#txtDurationDateFrom').val(),
            EventToDate: $('#txtDurationDateTo').val(),
            Description: $('#txtDescription').val(),

            PD_BusinessType: $("#ddlBusinessType option:selected").text(),   // $('#ddlBusinessType').val(),
            PD_Sector: $("#ddlSector option:selected").text(), //$('#ddlSector').val(),
            UserName: $("#UserFirstName").val(),   // $('#ddlBusinessType').val(),
            EnrCompany: $("#CompanyName").val(),
            EnrEmail: $("#EnrEmailId").val(),
            Role: $("#hdnUesrRole").val(),
            
        },
        Action: action  
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",  
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            LoaderEnd(".section-blockproject");
        },
        success: function (data) {
            if (data != null && data.IsSuccess === true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        if ($('#EntrId').val() > 0) {
                            window.location.href = "/Project/ProjectListForEnterprise";
                        }
                        else {
                            window.location.href = "/Project/ProjectListForAdmin";
                        }
                    }
                });
            
                $("#btnSave").html('Save');  
                $('#btnSave').removeAttr('disabled');
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
            var enrId = $('#ddlEnterprise').val(data["PD_EnterpriseId"]).change()
            //data = JSON.parse(data);
          ///  //console.log('project...', data)

            if (data["IsEnable"] == '') {
                $("#txtBudgetFormatted").prop("disabled", false);
                $("#ddlBudgetType").prop("disabled", false);
            } else {
                $("#txtBudgetFormatted").prop("disabled", true);
                $("#ddlBudgetType").prop("disabled", true);
            }

            $('#Id').val(data["PD_Id"]);
            $('#txtProjectName').val(data["PD_ProjectName"]);
            $('#txtDurationDateFrom').val(data["PD_DurationFromDate"]);
            $('#txtDurationDateTo').val(data["PD_DurationToDate"]);
            $('#txtDescription').val(data["PD_Description"]);
            $('#txtBudget').val(data["PD_Budget"]);
            $('#ddlEnterprise').val(data["PD_EnterpriseId"]).change();
            $('#ddlBudgetType').val(data["PD_BudgetType"]).change();
           // $('#ddlBranch').val(data["PD_BranchId"]).change();
            $('#ddlBranch').val(data["BranchList"]).trigger('chosen:updated');

            $('#ddlSector').val(data["PD_SectorId"]).change();

            $(".ddlBusinessType").find("option").remove();
            var f = $(".ddlBusinessType");
            f.length &&
              f.each(function () {
                  var f = $(this);
                  f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select Business Type", dropdownParent: f.parent() });
              });
            DropdownBinder.DDLData = {
                tableName: "EnterpriseTypeSetUp_ETM",
                Text: 'ETM_EnterpriseType',
                Value: 'ETM_Id',
                PId: data["ENR_SectorId"],
                ColumnName: 'ETM_IndustryId'
            };
            DropdownBinder.DDLElem = $("#ddlBusinessType");
            DropdownBinder.Execute();

            $('#ddlBusinessType').val(data["PD_BusinessTypeId"]).change();
           

            // Disable the checkbox and mark it as checked
            if (data["IsCompleted"] == 1) {
                $("input[type='checkbox']").prop('checked', true);
                $("label[for='completed-toggle']").text("Completed"); 
            } else {
                $("input[type='checkbox']").prop('disabled', false).prop('checked', false);
                $("label[for='completed-toggle']").text("Mark as Completed");
            }

            frmtBudget();
            retriveEnterpriseDetails(enrId);
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
//$("#txtProjectName").on('change', function () {
//    $('#btnSave').removeAttr('disabled');
//});

$(document).ready(function () {
  
   var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
   // //console.log(path);
    localStorage.setItem('href', path);

    var hdnEnrId = $('#EntrId').val();
    // //console.log(hdnEnrId)
    var ddlEnterprise = $('#ddlEnterprise').val();

    $("#btnSave").html('Save');

    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlSector");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "BudgetType_BT",
        Text: 'BT_Type',
        Value: 'BT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBudgetType");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $("#ddlEnterprise");
    DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "BranchDetails_BD",
    //    Text: 'BD_Name',
    //    Value: 'BD_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlBranch");
    //DropdownBinder.Execute();
    


    Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#Id').val(Id);
        
        $('.projectCompleteDiv').show();
    } else {
        $('.projectCompleteDiv').hide();
    }


    

    if (hdnEnrId > 0) {
        $('#ddlEnterprise').prop('disabled', true); 
        $('#ddlEnterprise').val(hdnEnrId).change();
    } else {
        $('#ddlEnterprise').prop('disabled', false); 
    }

    $(".ddlEnterprise").each(function () {
        var c = $(this);
        c.wrap('<div class="position-relative"></div>');
        c.select2({
            placeholder: "Select Enterprise",
            dropdownParent: c.parent()
        });
    });
    //console.log($('#EntrId').val());
});

$("#ddlSector").change(function () {
    $(".ddlBusinessType").find("option").remove();
    var f = $(".ddlBusinessType");
    f.length &&
      f.each(function () {
          var f = $(this);
          f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select Business Type", dropdownParent: f.parent() });
      });

    DropdownBinder.DDLData = {
        tableName: "EnterpriseTypeSetUp_ETM",
        Text: 'ETM_EnterpriseType',
        Value: 'ETM_Id',
        PId: $(this).val(),
        ColumnName: 'ETM_IndustryId'
    };
    DropdownBinder.DDLElem = $("#ddlBusinessType");
    DropdownBinder.Execute();
});

$("#ddlEnterprise").change(function () {
    $(".ddlBranch").find("option").remove();
    var b = $(".ddlBranch");
    b.length &&
        b.each(function () {
            var b = $(this);
            b.wrap('<div class="position-relative"></div>'), b.select2({ placeholder: "Select Branch", dropdownParent: b.parent() });
        });

    DropdownBinder.DDLData = {
        tableName: "BranchDetails_BD",
        Text: 'BD_Name',
        Value: 'BD_Id',
        PId: $(this).val(),
        ColumnName: 'BD_EnterpriseId'
    };
    DropdownBinder.DDLElem = $("#ddlBranch");
    DropdownBinder.Execute();
});


$(function () {
    var e = $("#ddlBudgetType");
    var g = $(".ddlSector");
    var l = $(".ddlBusinessType");
    var x = $(".ddlEnterprise");
    var b = $(".ddlBranch");
    


    g.length &&
        g.each(function () {
            var g = $(this);
            g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select Sector", dropdownParent: g.parent() });
        });

     l.length &&
      l.each(function () {
          var l = $(this);
          l.wrap('<div class="position-relative"></div>'), l.select2({ placeholder: "Select Business Type", dropdownParent: l.parent() });
      });

     x.length &&
       x.each(function () {
           var x = $(this);
           x.wrap('<div class="position-relative"></div>'), x.select2({ placeholder: "Assign Enterprise", dropdownParent: x.parent() });
       });

    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select Budget", dropdownParent: e.parent() });
        });

    b.length &&
        b.each(function () {
            var b = $(this);
            b.wrap('<div class="position-relative"></div>'), b.select2({ placeholder: "Select Branch", dropdownParent: b.parent() });
        });

    FormValidation.formValidation(formElem, {
        fields: {
            txtProjectName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Project Name"
                    }
                }
            },
            txtDurationDateFrom: {
                validators: {
                    notEmpty: {
                        message: "Please enter duration Date-From"
                    }
                }
            },
            txtDurationDateTo: {
                validators: {
                    notEmpty: {
                        message: "Please enter duration Date-To"
                    }
                }
            },
            //txtBudget: {
            //     validators: {
            //         notEmpty: {
            //             message: "Please enter Budget"
            //         }
            //     }
            //},
            ddlBudgetType: {
                validators: {
                    notEmpty: {
                        message: "Please select Budget Type"
                    }
                }
            },
            ddlSector: {
                 validators: {
                     notEmpty: {
                         message: "Please select Industry Sector"
                     }
                 }
            },
            ddlBusinessType: {
                 validators: {
                     notEmpty: {
                         message: "Please select Business Type"
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

       // SaveRecordForProject();
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
            if ($('#EntrId').val() > 0) {
                window.location.href = "/Project/ProjectListForEnterprise";
            }
            else {
                window.location.href = "/Project/ProjectListForAdmin";
            }
            
        });

    });
}

$("#btnCancel").on("click", function () {
    fnCancelConfirm();
});

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});


//****************Start Date < End Date Always*************

    $('#txtDurationDateFrom').on('change', function () {
        validateDates();
    });

    $('#txtDurationDateTo').on('change', function () {
        validateDates();
    });

    function validateDates() {
        var valueFrom = $('#txtDurationDateFrom').val();
        var valueTo = $('#txtDurationDateTo').val();
        $('#error-message').text('');
      $('.dtcls').css('border', '');
        // Check if both fields have values
        if (valueFrom && valueTo) {

            var dateFromParts = valueFrom.split('-');
            var dateToParts = valueTo.split('-');

            var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);
            var dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

            if (dateFrom >= dateTo) {
                $('#error-message').text("start-date must be earlier from end-date..!");
                $('.dtcls').css('border', '1px solid red');
                $('#txtDurationDateTo').val('');
            }
           
        }
    }

    function ProjectCompleted() {
        var Id = getParameterByName('Id');
        var isChecked = $("#completed-toggle").prop('checked');
        if (!isChecked) {
            Swal.fire({
                title: 'Are you sure you want to unmark this project as completed?',
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                customClass: {
                    confirmButton: "btn btn-primary me-3 waves-effect waves-light",
                    cancelButton: "btn btn-label-secondary waves-effect waves-light"
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    var _data = JSON.stringify({
                        entity: {
                            PD_Id: Id,
                            UnmarkAsCompleted: true
                        }
                    });

                    $.ajax({
                        type: "POST",
                        url: '/ScriptJson/UpdateProjectIsCompleted',
                        data: _data,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (data.IsSuccess) {
                                Swal.fire({
                                    title: "Successful..!",
                                    text: 'Project unmarked successfully.',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                    customClass: {
                                        confirmButton: "btn btn-primary  waves-effect waves-light"
                                    }
                                }).then(() => {
                                    location.reload();
                                });
                            } else {
                                Swal.fire({
                                    title: "Oops...",
                                    text: 'Error: ' + (data.Message || "Unexpected error occurred."),
                                    icon: 'error',
                                    confirmButtonText: 'Ok',
                                    customClass: {
                                        confirmButton: "btn btn-danger waves-effect waves-light"
                                    }
                                });
                            }
                        },
                        error: function () {
                            Swal.fire({
                                title: "Oops...",
                                text: "Process failed",
                                icon: 'error',
                                confirmButtonText: 'Ok',
                                customClass: {
                                    confirmButton: "btn btn-danger waves-effect waves-light"
                                }
                            });
                        }
                    });
                } else {
                    $("#completed-toggle").prop('checked', true);
                }
            });
        } else {
            var _data = JSON.stringify({
                entity: {
                    PD_Id: Id,
                    MarkAsCompleted: true
                }
            });

            $.ajax({
                type: "POST",
                url: '/ScriptJson/UpdateProjectIsCompleted',
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.IsSuccess) {
                        Swal.fire({
                            title: "Successful..!",
                            text: 'Project marked as completed successfully.',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            customClass: {
                                confirmButton: "btn btn-primary waves-effect waves-light"
                            }
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Oops...",
                            text: 'Error: ' + (data.Message || "Unexpected error occurred."),
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            customClass: {
                                confirmButton: "btn btn-danger waves-effect waves-light"
                            }
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        title: "Oops...",
                        text: "Process failed",
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: "btn btn-danger waves-effect waves-light"
                        }
                    });
                }
            });
        }
    }

    function frmtBudget() {
        var hdnBudget = $('#txtBudget').val();
        if (hdnBudget) {
            var formateBudget = formatCurrencyRetrive(hdnBudget);
            //console.log('abc', formateBudget);
            $('#txtBudgetFormatted').val(formateBudget);
           // $("#txtBudgetFormatted").prop("disabled", true);
        }
    }

    function retriveEnterpriseDetails(Id) {
        if (Id > 0) {

            var _data = JSON.stringify({
                global: {
                    TransactionType: "Select",
                    Param: "ENR_Id",
                    paramValue: Id,
                    StoreProcedure: "EnterpriseRegistration_USP"
                }
            });
        }
        else {
            var _data = JSON.stringify({
                global: {
                    TransactionType: "Select",
                    Param: "ENR_Id",

                    StoreProcedure: "EnterpriseRegistration_USP"
                }
            });
        }
        $.ajax({
            type: "POST",
            url: "/ScriptJson/GetGlobalMaster",
            contentType: "application/json; charset=utf-8",
            data: _data,
            dataType: "json",
            success: function (data) {
                //console.log("Enr Details...",data)
                $('#hdnId').val(data["ENR_Id"]);

                // //console.log('data ghfhhfgf', data);

               // var primaryfullName = data["ENR_PrimaryContactName"];
               //// var nameParts = primaryfullName.split(' ');
               // $('#UserFirstName').val(nameParts[0]);
               // $('#UserLastName').val(nameParts[nameParts.length - 1]);

                $('#UserFirstName').val(data["ENR_PrimaryContactName"]);
                $('#EnrEmailId').val(data["ENR_PrimaryContactEmail"]);
                $('#CompanyName').val(data["ENR_CompanyName"]);

            }
        });
        return false;

    }


 
