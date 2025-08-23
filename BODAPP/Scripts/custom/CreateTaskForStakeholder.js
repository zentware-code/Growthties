var formElem = document.getElementById("formCreateTask");
var SMMLogoList = '';
var Id = 0;
function SaveRecordForCreateTask() {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            TD_Id: $('#hdnTaskId').val(),
            TD_TaskName: $('#txtTaskName').val(),
            TD_DurationFromDate: $('#txtDurationDateFrom').val(),
            TD_DurationToDate: $('#txtDurationDateTo').val(),
            TD_Description: $('#txtDescription').val(),
            TD_ProjectId: $('#hdnProjectId').val(),
            TD_ActivityId: $('#hdnActivityId').val(),
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
                });
                window.location.href = '/Stakeholder/TaskList?Id=' + $('#hdnProjectId').val() + '&CAId=' + $('#hdnActivityId').val() + '';
            }
            else {
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
        },
        error: function (data) {


            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
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
        beforeSend: function () {
            LoaderStart("#pageLoad");
        },
        complete: function () {
            LoaderEnd("#pageLoad");
        },
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';

                //fnSmmeForEnterprise(Id);
                $("#snglProjectDiv").append("<div class=''><div class='card' style='min-height:365px;height:100%;'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap' id='dvEnterprise'><span class=fw-medium>Enterprise: </span><span class=text-primary>" + v.ENR_CompanyName + "</span></div></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 badge bg-label-info me-auto px-3 py-2 rounded'><h6 class='mb-0 text-info'> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3'><h6 class=mb-0>Start Date: <span class=' fw-normal text-success'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class=' fw-normal text-danger'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class=' fw-normal text-warning'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + v.Status + "' role='progressbar'></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'><ul class='d-flex align-items-center avatar-group list-unstyled mb-0 mt-1 z-2  open-smm-modal' data-id='" + v.PD_Id + "'>" + v.SMMLogoList + "</ul></div><div class=ms-auto></div></div></div></div></div>");
                if (M == 'E') {
                    $('#dvEnterprise').css('display', 'none');
                }
            });

        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

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
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

$("#ddlActivity").change(function () {
    $('#hdnActivityId').val($(this).val());
});
$(document).ready(function () {
     Id = getParameterByName('Id');
    var M = getParameterByName('M');
    var TDId = getParameterByName('TDId');
    var CAId = getParameterByName('CAId');
    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName: 'CA_ProjectId',
        PId: Id

    };
    DropdownBinder.DDLElem = $("#ddlActivity");
    DropdownBinder.Execute();

    $('#ddlActivity').val(Id).change();
    $('#hdnProjectId').val(Id);

    fnProjectForAdmin(Id,M)
    if (TDId > 0) {
        retrive(TDId);
    }

    if (CAId > 0) {
        $('#hdnActivityId').val(CAId);
        $('#ddlActivity').val(CAId).change();
    }

   
});
$(function () {
    var e = $(".ddlActivity");
    e.length &&
    e.each(function () {
        var e = $(this);
        e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Activity", dropdownParent: e.parent() });
    });
    FormValidation.formValidation(formElem, {
        fields: {
            txtTaskName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Task Name"
                    }
                }
            },
            ddlActivity: {
                validators: {
                    notEmpty: {
                        message: "Please Select Activity"
                    }
                }
            },
            txtDurationDateFrom: {
                validators: {
                    notEmpty: {
                        message: "Please enter  Date From"
                    }
                }
            },

            txtDurationDateTo: {
                validators: {
                    notEmpty: {
                        message: "Please enter  Date To"
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

        SaveRecordForCreateTask();
    });
})

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
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".card-body");
        },
        complete: function () {
            LoaderEnd(".card-body");
        },
        success: function (data) {
            data = JSON.parse(data);
            $('#hdnTaskId').val(data[0].TD_Id);
            $('#txtTaskName').val(data[0].TD_TaskName);
            $('#txtDurationDateFrom').val(data[0].TD_DurationFromDate);
            $('#txtDurationDateTo').val(data[0].TD_DurationToDate);
            $('#txtDescription').val(data[0].TD_Description);
            $('#hdnProjectId').val(data[0].TD_ProjectId);
            $('#hdnActivityId').val(data[0].TD_ActivityId);
            $('#ddlActivity').val(data[0].TD_ActivityId).change();

        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
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
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            window.location.href = '/Stakeholder/TaskList?Id=' + $('#hdnProjectId').val() + '&CAId=' + $('#hdnActivityId').val() + '';
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

        // Check if both fields have values
        if (valueFrom && valueTo) {

            var dateFromParts = valueFrom.split('-');
            var dateToParts = valueTo.split('-');

            var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);
            var dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

            if (dateFrom >= dateTo) {
                $('#error-message').text("start-date must be earlier from end-date..!");
            }
        }
    }



//*************retrive currency************
    function formatNumber(value) {
        let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
        const [integerPart, decimalPart] = number.split('.');

        let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        return formattedInteger + '.' + (decimalPart || '00');
    }