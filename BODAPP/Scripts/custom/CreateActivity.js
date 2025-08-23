var formElem = document.getElementById("formCreateTask");
var SMMLogoList = '';
var ProjId='';
var M = '';
function SaveRecordForCreateAct() {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            CA_Id: $('#hdnCAId').val(),
            CA_ProjectId: $('#hdnProjectId').val(),
            CA_ActivityName: $('#txtActivityName').val(),
            CA_DurationFromDate: $('#txtDurationDateFrom').val(),
            CA_DurationToDate: $('#txtDurationDateTo').val(),
            CA_Description: $('#txtDescription').val(),
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
                if(data.Id > 0){
                    var id = data.Id;
                    SendMail(id);
                }
              
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (parseInt(ProjId) > 0)
                        {
                            //SendMail()
                            window.location.href = '/Project/CreateActivityList?Id=' + parseInt(ProjId) + ''
                        }
                        else {
                            //SendMail()
                            window.location.href = '/Project/CreateActivityList';

                        }
                    }
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
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

}
function fnSmmeForEnterprise(ProjectId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseSMMELogo',
            param1: 'PD_Id',
            param1Value: parseInt(ProjectId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {
                    SMMLogoList = SMMLogoList + v.SMME_Logo;
                });
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" >No SMME Found</div>';
            }

        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fnProjectForAdmin(Id,M) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllProjectById',
            param1: 'PD_Id',
            param1Value: Id,
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart(".loader-sectionenr");
        //},
        //complete: function () {
        //    LoaderEnd(".loader-sectionenr");
        //},
        
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
                //fnSmmeForEnterprise(v.PD_Id);
                //<ul class="d-flex align-items-center avatar-group list-unstyled mb-0 mt-1 z-2"><li class="avatar avatar-sm pull-up" data-bs-placement="top" data-bs-toggle="tooltip" data-popup="tooltip-custom" title="Vinnie Mostowy"><img alt="Avatar" class="rounded-circle" src="../Content/assets/img/avatars/5.png"></li><li class="avatar avatar-sm pull-up" data-bs-placement="top" data-bs-toggle="tooltip" data-popup="tooltip-custom" title="Allen Rieske"><img alt="Avatar" class="rounded-circle" src="../Content/assets/img/avatars/12.png"></li><li class="avatar avatar-sm pull-up me-2" data-bs-placement="top" data-bs-toggle="tooltip" data-popup="tooltip-custom" title="Julee Rossignol"><img alt="Avatar" class="rounded-circle" src="../Content/assets/img/avatars/6.png"></li><li><small class="text-muted">280 Members</small></li></ul>
                //$("#snglProjectDiv").append("<div class=''><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap'><span class=fw-medium>Enterprise: </span><span class=text-muted>" + v.ENR_CompanyName + "</span></div></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/CreateTask?Id=" + v.PD_Id + ">Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>All Hours: <span class='text-body fw-normal'>380/244</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>Task: 290/344</small> <small>95% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:95% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No SMME Found</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-message-dots ti-sm'></i> 15</a></div></div></div></div></div>");
               
                ///$("#snglProjectDiv").append("<div class=''><div class='card' style='min-height:365px;height:100%;'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap' id='dvEnterprise'><span class=fw-medium>Enterprise: </span><span class=text-primary>" + v.ENR_CompanyName + "</span></div></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 badge bg-label-info me-auto px-3 py-2 rounded'><h6 class='mb-0 text-info'> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3'><h6 class=mb-0>Start Date: <span class=' fw-normal text-success'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class=' fw-normal text-danger'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class=' fw-normal text-warning'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'><ul class='d-flex align-items-center avatar-group list-unstyled mb-0 mt-1 z-2'>" + SMMLogoList + "</ul></div><div class=ms-auto></div></div></div></div></div>");
                
                $("#snglProjectDiv").append("<div class=''><div class='card' style='min-height:365px;height:100%;'><div class='card-header p-1 py-3'><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='me-2 ms-1'><h5 class='mb-0'><a class='text-body stretched-link' href='javascript:;'>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap' id='dvEnterprise'><span class='fw-medium'>Enterprise: </span><span class='text-primary'>" + v.ENR_CompanyName + "</span></div></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 badge bg-label-info me-auto px-3 py-2 rounded'><h6 class='mb-0 text-info'> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3'><h6 class='mb-0'>Start Date: <span class='fw-normal text-success'>" + v.PD_DurationFromDate + "</span></h6><h6 class='mb-1'>Deadline: <span class='fw-normal text-danger'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</p></div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class='mb-1'>Task: <span class='fw-normal text-warning'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + v.Status + "' role='progressbar'></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'><ul class='d-flex align-items-center avatar-group list-unstyled mb-0 mt-1 z-2  open-smm-modal' data-id='" + v.PD_Id + "'>" + v.SMMLogoList + "</ul></div><div class='ms-auto'></div></div></div></div></div>");

                if (M == 'E') {
                    $('#dvEnterprise').css('display', 'none');
                }
            });
            LoaderEnd(".loader-sectionenr");
        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
$(document).ready(function () {
    var Id = getParameterByName('Id');
    M = getParameterByName('M');
    ProjId = Id;
    $('#hdnProjectId').val(Id);
    
    LoaderStart(".loader-sectionenr");

    fnProjectForAdmin(Id, M);
    var CAId = getParameterByName('CAId');
    if (CAId > 0) {
        retrive(CAId);
    }
    retriveEnterpriseDetails();
});
$(function () {

    FormValidation.formValidation(formElem, {
        fields: {
            txtActivityName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Activity Name"
                    }
                }
            },
            txtDurationDateFrom: {
                validators: {
                    notEmpty: {
                        message: "Please enter Duration Date From"
                    }
                }
            },
            txtDurationDateTo: {
                validators: {
                    notEmpty: {
                        message: "Please enter Duration Date To"
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
        SaveRecordForCreateAct();
    });
})

function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: 'CA_Id',
            param1Value: parseInt(id),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart(".loader-sectionenr");
        //},
        //complete: function () {
        //    LoaderEnd(".loader-sectionenr");
        //},
        success: function (data) {
            data = JSON.parse(data);
            $('#hdnCAId').val(data[0].CA_Id);
            $('#hdnTaskId').val(data[0].CA_TaskId);
            $('#hdnProjectId').val(data[0].CA_ProjectId);
            $('#txtActivityName').val(data[0].CA_ActivityName);
            $('#txtDurationDateFrom').val(data[0].CA_DurationFromDate);
            $('#txtDurationDateTo').val(data[0].CA_DurationToDate);
            $('#txtDescription').val(data[0].CA_Description);
       
            if (data[0].IsCompleted == 1) {
                
                $("input[type='checkbox']")
                    .prop('checked', true)
                $("label[for='completed-toggle']").text("Completed");
            } else {
                
                $("input[type='checkbox']")
                    .prop('checked', false)
                $("label[for='completed-toggle']").text("Mark as Completed");
            }

        },
        error: function (data) {
            //LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    //LoaderEnd(".loader-sectionenr");
    return false;
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
            window.location.href = "/Project/CreateActivityList";
        });

    });
}

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




//*************retrive currency*******
function formatNumber(value) {
    let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
    const [integerPart, decimalPart] = number.split('.');

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedInteger + '.' + (decimalPart || '00');
}



function ActivityCompleted() {
    var CAId = getParameterByName('CAId');
    var isChecked = $("#completed-toggle").prop('checked');
    if (!isChecked) {
        Swal.fire({
            title: "Oops..",
            text: 'Are you sure you want to unmark this Activity as completed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes', 
            cancelButtonText: 'Cancel' 
        }).then((result) => {
            if (result.isConfirmed) {
                   
                var _data = JSON.stringify({
                    entity: {
                        TransactionType: "IsCompleted",
                        CA_Id: CAId,
                       // UnmarkAsCompleted: true  
                    }
                });

                $.ajax({
                    type: "POST",
                    url: '/ScriptJson/InsertCreateActivity',
                    data: _data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.IsSuccess) {
                            Swal.fire({
                                title: "Successful..!",
                                text: 'Activity unmarked successfully.',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            }).then(() => {
                                location.reload();  
                            });
                        } else {
                            Swal.fire({
                                title: "Oops...",
                                text: 'Error: ' + (data.Message || "Unexpected error occurred."),
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            title: "Oops...",
                            text: "Process failed",
                            icon: 'error',
                            confirmButtonText: 'Ok'
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
                TransactionType: "IsCompleted",
                CA_Id: CAId,
               // MarkAsCompleted: true  
            }
        });

        $.ajax({
            type: "POST",
            url: '/ScriptJson/InsertCreateActivity',
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.IsSuccess) {
                    Swal.fire({
                        title: "Successful..!",
                        text: 'Activity marked as completed successfully.',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        location.reload();  
                    });
                } else {
                    Swal.fire({
                        title: "Oops...",
                        text: 'Error: ' + (data.Message || "Unexpected error occurred."),
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    title: "Oops...",
                    text: "Process failed",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    }
}

function retriveEnterpriseDetails() {
    var enrId = $('#EntrId').val();

    if (enrId > 0) {
        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "ENR_Id",
                paramValue: parseInt(enrId),
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

function SendMail(id) {
    //$('#btnSave').prop('disabled', true); 
    //$("#btnSave").html('Please Wait.....');
    LoaderStart("#enrFullpageloading");

    var action = 'createnewactivity';

    var _data = JSON.stringify({
        emailcontent: {
            Id: parseInt(id),
            PD_Id: $('#hdnProjectId').val(),
            EventName: $('#txtActivityName').val(),
            EventFromDate: $('#txtDurationDateFrom').val(),
            EventToDate: $('#txtDurationDateTo').val(),
            Description: $('#txtDescription').val(),

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
        //complete: function () {
        //    LoaderEnd("#enrFullpageloading");
        //},
        success: function (data) {
            LoaderEnd("#enrFullpageloading");
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
            
                //$("#btnSave").html('Save');  
                //$('#btnSave').removeAttr('disabled');
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



