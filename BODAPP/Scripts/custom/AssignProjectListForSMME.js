$(document).ready(function () {

    fnProjectForSMME();

    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);

});


function fnProjectForSMME() {
    if ($("#hdnUserType").val() == "SMMEUser") {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectProjectsForSMMEUser',
                param1: 'SmmeId',
                param1Value: parseInt($('#hdnSmmeId').val()),
                param2: 'UWP_UserId',
                param2Value: parseInt($('#hdnUserId').val()),
                StoreProcedure: 'ProjectDetails_USP'
            }
        });
    } else {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectProjectForSMME',
                param1: 'SmmeId',
                param1Value: $('#hdnSmmeId').val(),
                StoreProcedure: 'ProjectDetails_USP'
            }
        });
    }

    $.ajax({
        type: "POST",
        url: URLList.GetList,
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
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
                if (count > 0) {
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class=card><div class=card-header><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=#>Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-3'><div class='d-flex align-items-center flex-wrap'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body border-top'><div class='d-flex align-items-center mb-3'>Task: <span class='text-body fw-normal'>0/0</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No SMME Found</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-edit ti-sm'></i> </a></div></div></div></div></div>");
                    $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href='/Project/ProjectDetailsNew?Id=" + v.PD_Id + "&Role=smme' onclick='getValue(102)'>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/ActivityListForSMME?Id=" + v.PD_Id + ">View Activity</a></li><li><a class=dropdown-item href='javascript:;' onclick='chkForAssignType(" + v.PD_Id + ",\"" + v.AssignType + "\")'>Assign To Team/User</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + v.Status + "' role='progressbar'></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No Member Found</div></div></div></div></div>");

                }

            });
            if (count == 0) {
                $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
            }

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
function fnProjectForAdminDetails(TypeId, SegmentId, active) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSegmentWiseAssessment',
            Param: 'BA_Id',
            param1: 'TypeId',
            param2: 'SegmentId',
            param1Value: TypeId,
            param2Value: SegmentId,
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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

            $("#dvStepDetails").append("<div id='Segment_" + SegmentId + "' class='content " + active + "'><br><div class='row g-3'><div class='col-sm-6'><label class='form-label' for='multiStepsUsername'>Name</label><input type='text' name='txtContactName' id='txtContactName' class='form-control' placeholder='johndoe'> <input type='hidden' id='hdnId' name='hdnId'></div><div class='col-12 d-flex justify-content-between mt-4'><button class='btn btn-label-secondary btn-prev' disabled='disabled'><i class='ti ti-arrow-left ti-xs me-sm-1 me-0'></i><span class='align-middle d-sm-inline-block d-none'>Previous</span></button><button class='btn btn-primary btn-next'><span class='align-middle d-sm-inline-block d-none me-sm-1 me-0'>Next</span><i class='ti ti-arrow-right ti-xs'></i></button></div></div></div>");

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


function ShowAllUser(id) {
    ProjectId = id;

    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseSMMEUser',
            param1: 'SmmeId',
            param1Value: $('#SmmeId').val(),
            param2: 'PD_Id',
            param2Value: id,
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
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            $('#setUPFormPopUp').addClass('show');
            $('.btn-close').click(function () {

                $('#setUPFormPopUp').removeClass('show');
                //$('.form-control').val('');
            });
            var count = data.length;
            $.each(data, function (i, v) {

                var index = i + 1;
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.UM_Name + "</h6><p class='mb-0 text-muted'>Email: " + v.UM_EmailId + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.UM_Id + ",null)'></div></div></div>");

            });

        },
        error: function (data) {
             LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}


function ShowAllTeam(id) {
    ProjectId = id;

    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseTeam',
            param1: 'SmmeId',
            param1Value: $('#SmmeId').val(),
            param2: 'PD_Id',
            param2Value: id,
            StoreProcedure: 'ProjectDetails_USP'
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
            //console.log(data);
            $('#setUPFormPopUp').addClass('show');
            $('.btn-close').click(function () {

                $('#setUPFormPopUp').removeClass('show');
                //$('.form-control').val('');
            });
            var count = data.length;
            $.each(data, function (i, v) {

                var index = i + 1;
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.BT_TeamName + "</h6></div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignProject(" + index + ",null," + v.BT_Id + ")'></div></div></div>");

            });

        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}


function chkForAssignType(ProjectId, Type) {
    if (Type == "Team") {
        $('#flexSwitchCheckDefault').prop('checked', true);
        ShowAllTeam(ProjectId);
        Status = 'Team';
    }
    else {
        $('#flexSwitchCheckDefault').prop('checked', false);
        ShowAllUser(ProjectId);
        Status = 'User';
    }

}
$('#flexSwitchCheckDefault').change(function () {
    //UnAssignProject();
    if ($('#flexSwitchCheckDefault').is(':checked')) {

        ShowAllTeam(ProjectId);
        Status = 'Team';


    } else {

        ShowAllUser(ProjectId);
        Status = 'User';
    }
})



function AssignProject(index, UmId, TeamId) {
    var Transaction = "";
    if ($('#chkId_' + index).is(':checked')) {

        Transaction = "AssignProjectToSmmeUser";
    } else {

        Transaction = "UnAssignProjectToSmmeUser";
    }
    //console.log(ProjectId);
    var _data = JSON.stringify({
        entity: {

            PD_Id: ProjectId,
            UserId: UmId,
            TeamId: TeamId,
            Status: Status,
            TransactionType: Transaction

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToSMMEUser',
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

            }
            else {

                Swal.fire({
                    title: "Oops!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops!",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

function UnAssignProject() {

    var _data = JSON.stringify({
        entity: {
            TD_Id: TaskId,

            TransactionType: 'ResetAssignment'

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToSMMEUser',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {

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


