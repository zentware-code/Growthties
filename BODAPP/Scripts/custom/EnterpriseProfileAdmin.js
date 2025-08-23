
$(document).ready(function () {
    retriveEnterprise();
});

function fnCustForEnterprise(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectListForEnterprise',
            param1: 'CD_EnterpriseId',
            param1Value: parseInt(id),
            StoreProcedure: 'CustomerDetails_USP',
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
                    fnSmmeForEnterprise(v.PD_Id);
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class=card><div class=card-header><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=#>Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-3'><div class='d-flex align-items-center flex-wrap'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body border-top'><div class='d-flex align-items-center mb-3'>Task: <span class='text-body fw-normal'>0/0</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No SMME Found</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-edit ti-sm'></i> </a></div></div></div></div></div>");
                    $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/ProjectDetails?Id=" + v.PD_Id + ">Edit</a></li><li><a class=dropdown-item href=/Project/CreateActivity?Id=" + v.PD_Id + "&M=E>Create Activity</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class='text-body fw-normal'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1 style='min-height: 40px;''><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1'>" + SMMLogoList + "</ul></div></div></div></div></div>");

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

function retriveEnterprise() {
    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectForProfile",
            param1: "ENR_Id",
            param1Value: $('#hdnId').val(),
            StoreProcedure: "EnterpriseRegistration_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
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
            $('#spnHeadName').text(data[0].ENR_CompanyName);
            $('#spnHeadRole').text(data[0].UM_SubRole);
            $('#spnCity').text(data[0].PM_Province);
            $('#spnDate').text(data[0].ENR_CreatedDate);
            $('#spnName').text(data[0].ENR_PrimaryContactName);
            $('#spnBusinessType').text(data[0].ETM_EnterpriseType);
            $('#spnSector').text(data[0].SM_SectorName);
            $('#spnCountry').text(data[0].CM_CountryName);
            $('#spnProvince').text(data[0].PM_Province);
            $('#spnTown').text(data[0].ENR_City);
            $('#spnContactNo').text(data[0].ENR_PrimaryContactNo);
            $('#spnEmail').text(data[0].ENR_PrimaryContactEmail);
            
            $('#spnEmp').text(data[0].TotalUser);
            $('#spnSMME').text(data[0].TotalSMME);
            $('#spnProjcct').text(data[0].TotalProject);
            $('#spnJob').text(data[0].TotalJob);

            if (data[0].ENR_Logo == "NO") {
                $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
            }
            else {
                $('#prfpicIMG').attr('src', data[0].ENR_Logo);
            }

        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops..',
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}


