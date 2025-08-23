var SMMLogoList = '';
$(document).ready(function () {
    //$("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 10e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    fnProjectListDataForAdmin();
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    //console.log(path);
    localStorage.setItem('href', path);
   
});

function fnProjectListDataForAdmin() {
    var userId = $('#hdnUserId').val();
    var _data;

    if (userId == parseInt(1)) {
        _data = JSON.stringify({
            global: {
                TransactionType: 'SelectAllProjectDynamicDataFromDatabase',
                StoreProcedure: 'ProjectDetailsForDynamicSelect_USP'
            }
        });
    } else {
        _data = JSON.stringify({
            global: {
                TransactionType: 'SelectAllProjectDynamicDataFromDatabaseForUser',
                param1: 'UWP_UserId',
                param1Value: parseInt(userId),
                StoreProcedure: 'ProjectDetailsForDynamicSelect_USP'
            }
        });
    }

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetProjectDataDynamically',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".section-blockproject"); // Optional loader
        },
        complete: function () {
            LoaderEnd(".section-blockproject");   // Optional loader end
        },
        success: function (data) {
            // Ensure target container is empty before appending
            $("#dvproject").empty();

            // Check the response structure and append HTML string
            if (data.OutPutId === 1 && data.OutPutString) {
                $("#dvproject").append(data.OutPutString);
            } else {
                $("#dvproject").append(`
                    <div class="card">
                        <div class="layout-demo-wrapper">
                            <div><h3>No Data Found</h3><br></div>
                        </div>
                    </div>
                `);
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Oops..",
                text: 'Process Not Successful',
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-primary waves-effect waves-light"
                },
                buttonsStyling: false
            });

            console.error("Error response:", xhr.responseText || error);
        }
    });

    return false;
}



//function fnProjectListDataForAdmin() {
//    var _data = JSON.stringify({
//        global: {
//            TransactionType: 'SelectAllProject',
//            StoreProcedure: 'ProjectDetailsForSelect_USP'
//        }
//    });

//    $.ajax({
//        type: "POST",
//        url: URLList.GetList,
//        contentType: "application/json; charset=utf-8",
//        data: _data,
//        dataType: "json",
//        beforeSend: function () {
//            LoaderStart(".section-blockproject");
//        },
//        complete: function () {
//            LoaderEnd(".section-blockproject");
//        },
//        success: function (data) {
//            // Parse the response if needed
//            //data = JSON.parse(data);

//            // Clear any existing content
//            $("#dvproject").empty();

//            // Check if result is successful
//            if (data.OutPutId === 1 && data.OutPutString) {
//                // Append the full HTML string directly
//                $("#dvproject").append(data.OutPutString);
//            } else {
//                // Show a "No data found" message
//                $("#dvproject").append('<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>');
//            }
//        },

//        //success: function (data) {
//        //    data = JSON.parse(data);

//        //    //console.log('console data:', data);

//        //    var count = data.length;
//        //    $.each(data, function (i, v) {
//        //        var index = i + 1;
//        //        var active = '';
//        //        if (index == 1)
//        //        { active = 'active' }
//        //        var line = '';
//        //        if (count > 0) {

//        //           // $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3'><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'></div><div class='me-2 ms-1'><h5 class='mb-0'><a class='text-body' href='/Project/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap'><span class='fw-medium'>Enterprise: </span>" + (v.ENR_Id > 1 ? "<a href='/Home/EnterpriseProfieView_Profiles?Id=" + v.ENR_Id + "' class='text-primary'>" + v.ENR_CompanyName + "</a>" : v.ENR_CompanyName) + "</div></div></div><div class='ms-auto'><div class='dropdown z-2'><button aria-expanded='false' class='btn dropdown-toggle hide-arrow p-0' data-bs-toggle='dropdown' type='button'><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class='dropdown-item' href='/Project/ProjectDetails?Id=" + v.PD_Id + "'>Edit</a></li>" + (v.IsCompleted == 1 ? '' : "<li><a class='dropdown-item' onclick='ProjectCompleted(" + v.PD_Id + ")'> Mark as Completed </a></li>") + (v.IsCompleted == 1 ? '' : "<li><a class='dropdown-item' href='/Project/CreateActivity?Id=" + v.PD_Id + "&M=E'>Create Activity</a></li>") + "</ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class='mb-0' style='width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class='mb-0'>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class='mb-1'>End Date: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><div class='mb-3 text-start'><h6 class='mb-1'>Branch: <span class='text-body fw-normal'>" + v.TotalBranch + "</span></h6></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class='mb-1'>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='95' role='progressbar'></div></div><div class='d-flex align-items-center pt-1' style='min-height: 40px;'><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1'>" + v.SMMLogoList + "</ul></div><div class='ms-auto'></div></div></div></div></div>");
//        //            $("#dvproject").append(v.projectCardDiv);

//        //        }
//        //        else {
//        //            $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
//        //        }


//        //    });
//        //    if (count == 0) {
//        //        $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
//        //    }
//        //},
//        error: function (data) {
//            Swal.fire({
//                title: "Oops..",
//                text: 'Process Not Success',
//                icon: "error",
//                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                buttonsStyling: !1
//            });
//        }
//    });
//    return false;

//}

function TaskBoard(Id) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskForKanban',
            param1: 'TD_ProjectId',
            param1Value: 21,
            StoreProcedure: 'TaskDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);

            var kanbanArray = [];
            for (var ix = 1; ix < data.length; ix++) {
                kanbanArray.push({
                    id: data[ix].id,
                    title: data[ix].title,
                    item: JSON.parse(data[ix].item),

                });
            }
       
          
            //Cookies.set('calender', arrayJobList);
            //localStorage.setItem('kanban', data);
            localStorage.setItem('kanban', JSON.stringify(data));
            window.location.href = '/Project/TaskBoard?='+Id
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function ProjectCompleted(id) {
    var _data = JSON.stringify({
        entity: {
            PD_Id: id,
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/UpdateProjectIsCompleted',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log('gsjfcgsdjff',data)
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                    Swal.fire({
                        title: "Good Job..",
                        text: data.Message,
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    })
                    var projectId = data.Id;
                    $('.dropdown-item[onclick="ProjectCompleted(' + projectId + ')"]').hide();
                    $('.dropdown-item[href="/Project/CreateActivity?Id=' + projectId + '&M=E"]').hide();
                    window.location.reload();
                } else {
                    Swal.fire({
                        title: "Oops..",
                        text: 'This project already completed',
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    });
                }
            } else {
               
                Swal.fire({
                    title: "Oops..",
                    text: data.Message || "Unexpected error occurred.",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function (data) {
           
            Swal.fire({
                title: "Oops..",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}
