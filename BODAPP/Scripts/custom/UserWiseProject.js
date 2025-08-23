

var uId = '';
$(document).ready(function () {
    uId = getParameterByName('Id');
    retriveUserProfileData();
    retriveUserWiseProject();
});


function retriveUserWiseProject() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectUserWiseProjects',
            param1: 'UWP_UserId',
            param1Value: parseInt(uId),
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
                var a = v.PD_Id;
                var p = '/Project/ProjectDetailsNew?Id='+a+'' ;
                if (index == 1)
                { active = 'active' }
                var line = '';
                
                if (count > 0) {
                    //fnSmmeForEnterprise(v.PD_Id);
                    
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class=card><div class=card-header><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=#>Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-3'><div class='d-flex align-items-center flex-wrap'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body border-top'><div class='d-flex align-items-center mb-3'>Task: <span class='text-body fw-normal'>0/0</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No MSME Associated</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-edit ti-sm'></i> </a></div></div></div></div></div>");
                    $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link' href='"+p+"'>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/ProjectDetails?Id=" + v.PD_Id + ">Edit</a></li><li><a class=dropdown-item href=/Project/CreateActivity?Id=" + v.PD_Id + "&M=E>Create Activity</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class='text-body fw-normal'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1 style='min-height: 40px;''><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1'>" + v.SMMLogoList + "</ul></div></div></div></div></div>");

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

function retriveUserProfileData() {
    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectUserProfileProjectPageHeader",
            param1: "UM_Id",
            param1Value: parseInt(uId),
            StoreProcedure: "UserMaster_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            $('#spnHeadName').text(data[0].UM_Name);
            $('#spnHeadRole').text(data[0].UM_SubRole);
            $('#spnHeadBranch').text(data[0].BD_Name);
            $('#spnDate').text(data[0].UM_CreatedAt);
            
            if (data && data[0]) {
                const profilePic = data[0].UM_ProfilePic;
                const prefix = data[0].UM_Prefix || "";
                const fullName = data[0].UM_Name || "";

                const initials = (fullName.match(/\b\w/g) || [])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() || prefix.toUpperCase();

                const bgColors = ["primary", "secondary", "success", "danger", "warning", "info"];
                const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

                if (!profilePic || profilePic === "NO" || profilePic === "") {
                    $('#spnanAvtar').hide();
                    $('#spnanInitials')
                        .text(initials)
                        .show()
                        .parent()
                        .removeClass()
                        .addClass(`d-flex justify-content-center align-items-center bg-${randomColor} text-white fw-bold`)
                        .css({ width: '100%', height: '100px', fontSize: '33px' });
                } else {
                    $('#spnanInitials').hide();
                    $('#spnanAvtar').attr('src', profilePic).show();
                }
            }

        },
        error: function (data) {
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


var uId = $('#hdnId').val(); // Get user ID from hidden input

$('.nav-link').on('click', function () {
    var target = $(this).data('target');
    var url = "";

    if (target === "Profile") {
        url = "/Home/UserProfileDetails?Id=" + uId;
    } else if (target === "MSMEs") {
        url = "/Home/UserWiseSMME?Id=" + uId;
    } else if (target === "Areas") {
        url = "/Home/UserWiseArea?Id=" + uId;
    } else if (target === "Projects") {
        // Optional: handle Projects if needed
        return;
    }

    if (url !== "") {
        window.location.href = url;
    }
});