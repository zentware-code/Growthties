var BId = '';
var EnrId = '';

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function () {
    BId = getParameterByName('BId');
    EnrId = getParameterByName('EnrId');

    if (BId != '') {
        BranchDataRetrive();
        fnProjectForEnterprise();
    }
});

function BranchDataRetrive() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBranchData',
            param1: 'BD_Id',
            param1Value: parseInt(BId),
            StoreProcedure: 'BranchDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (response) {
            // Step 1: Parse the JSON string into an array
            var data = typeof response === 'string' ? JSON.parse(response) : response;

            // Step 2: Validate and extract first item
            if (Array.isArray(data) && data.length > 0) {
                var item = data[0];
                
                $('#spnanAvtar').text(item.BranchAvatar || '');
                $('#spnHeadName').text(item.BD_Name || '');
                $('#spnCity').text(item.BD_City || '');
                $('#spnHeadEmail').text(item.BD_Email || '');
                $('#spnHeadPhone').text(item.BD_ContactNumber || '');
            } else {
                // No data found
                $("#dvEnrList").html(
                    '<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>'
                );
            }
        },
        error: function () {
            Swal.fire({
                title: 'Process Not Successful',
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-primary waves-effect waves-light"
                },
                buttonsStyling: false
            });
        }
    });

    return false;
}


$('.nav-link').filter(function () {
    return $(this).text().trim() === 'Areas';
}).on('click', function () {
    var url = "/Enterprise/BranchWiseArea?BId=" + BId + "&EnrId=" + EnrId;
    window.location.href = url;
});

$('.nav-link').filter(function () {
    return $(this).text().trim() === 'User Lists';
}).on('click', function () {
    var url = "/Enterprise/BranchWiseUser?BId=" + BId + "&EnrId=" + EnrId;
    window.location.href = url;
});

$('.nav-link').filter(function () {
    return $(this).text().trim() === 'Dashboard';
}).on('click', function () {
    var url = "/Enterprise/BranchDashboard?BId=" + BId + "&EnrId=" + EnrId;
    window.location.href = url;
});

function fnProjectForEnterprise() {
    //console.log(parseInt($('#hdnEntrId').val()));
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBranchWiseProjects',
            param1: 'BWP_BD_Id',
            param1Value: parseInt(BId),
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
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';

                if (count > 0) {
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class=card><div class=card-header><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=#>Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-3'><div class='d-flex align-items-center flex-wrap'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body border-top'><div class='d-flex align-items-center mb-3'>Task: <span class='text-body fw-normal'>0/0</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No SMME Found</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-edit ti-sm'></i> </a></div></div></div></div></div>");
                    $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href='/Project/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/ProjectDetails?Id=" + v.PD_Id + ">Edit</a></li><li><a class=dropdown-item href=/Project/CreateActivity?Id=" + v.PD_Id + "&M=E>Create Activity</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln' style='display: inline-block; width: 280px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class='text-body fw-normal'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1 style='min-height: 40px;''><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1 open-smm-modal' data-id='" + v.PD_Id + "'>" + v.SMMLogoList + "</ul></div></div></div></div></div>");
                }
                else {
                    $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
                }
            });
            if (count == 0) {
                $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
            }
        },
        error: function (data) {
                LoaderEnd(".loader-sectionenr");
            
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}


$('.open-msme-modal').on('click', function () {
    $('#shareShowProjectWiseSMME').modal('show');
});



