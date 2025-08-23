var MulpleJob = [];
var MainJob = [];
var liList = '';
var List = '';
$(document).ready(function () {
  //  $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    fnProjectForSMME();

    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);
});
function fnProjectForSMME() {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllJobForSMME',
            param1: 'JD_SmmeId',
            param1Value: $('#hdnSMMEId').val(),
            param2: 'AJU_UserId',
            param2Value: $('#hdnUmId').val(),
            StoreProcedure: 'JobDetails_USP',
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#dvJob");
        },
        complete: function () {
            LoaderEnd("#dvJob");
        },
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
                List = '';
                var Bill = "";
                    if (v.JD_VistType == "Single") {
                        var labl;
                        if (v.OpenStatus > 0 && v.OpenStatus !=3) {
                            labl = 'Job in Progress'
                        }
                        else if (v.OpenStatus == 3) {
                            
                            labl = 'Completed'
                            //Bill = '<li><a class=dropdown-item href=/Job/JobInvoice?Id=' + v.JD_Id + '>Generate Invoice</a></li>'
                            }
                        else {
                            labl = 'View Job';
                        }
                        List = "<ul class='dropdown-menu dropdown-menu-end'>" + Bill + "<li><a class=dropdown-item href=/Job/JobProgressSMME?Id=" + v.JD_Id + "&Type=" + v.JD_VistType + ">" + labl + "</a></li></ul>"
                    }
                    if (v.JD_VistType == "Multiple") {

                        retriveMultiplejob(v.JD_Id, v.JD_VistType, v.OpenStatus);


                    }
                    if (v.JD_VistType == "Maintenance") {

                        retriveMaintenancejob(v.JD_Id, v.JD_VistType, v.OpenStatus);


                    }
                

                if (count > 0 ) {
                   
                    $("#dvJob").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.JD_JobName + "</a></h5><div class='client-info ellipsisWrap'><span class=fw-medium>Customer: </span><span class=text-primary>" + v.CD_Name + "</span></div></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button>" + List + "</div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.JD_VistType + "</h6><span>Vist Type</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.JD_JobStartDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.JD_JobEndDate + "</span></h6></div></div><p class=mb-0>" + v.JD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div></div></div></div>");

                }
                else {
                    $("#dvJob").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
                }

            });
            if (count == 0) {
                $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
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

function retriveMultiplejob(JobId,JD_VistType,Status) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectMultiplejob',
            param1: 'JD_Id',
            param1Value: parseInt(JobId),
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);


            $.each(data, function (i, v) {
                MulpleJob.push({
                    MJD_Id: v.MJD_Id,
                    MJD_Title: v.MJD_Title,
                    MJD_StartDate: v.MJD_StartDate,
                    MJD_EndDate: v.MJD_EndDate,
                    MJD_Status: v.MJD_Status,
                    OpenStatus: v.OpenStatus

                });
            });

            $.each(MulpleJob, function (i, m) {
                var lbl = 'View Job';
               
                  
                    liList = liList + "<li><a class=dropdown-item href=/Job/JobProgressSMME?Id=" + JobId + "&MId=" + m.MJD_Id + "&Type=" + JD_VistType + ">"+lbl+"(" + m.MJD_Title + ")</a></li>"
              
                });
            
                List = "<ul class='dropdown-menu dropdown-menu-end'>" + liList + "</ul>"
                liList = '';
         
            MulpleJob = [];
        },
        error: function (data) {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function retriveMaintenancejob(JobId,JD_VistType) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectMaintenancejob',
            param1: 'JD_Id',
            param1Value: parseInt(JobId),
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);


            $.each(data, function (i, v) {
                MainJob.push({
                    MNJD_Id: v.MNJD_Id,
                    MNJD_Frequency: v.MNJD_Frequency,
                    MNJD_VisitCount: v.MNJD_VisitCount,
                    MNJD_Date: v.MNJD_Date,
                    MNJD_Status: v.MNJD_Status,
                    OpenStatus: v.OpenStatus

                });
            });

            $.each(MainJob, function (i, m) {
                var lbl = '';
                if (m.MNJD_Status != "Completed") {
                    if (m.OpenStatus > 0) {
                        lbl = "Job In Progress";

                    }
                    else {
                        lbl = "Job Started For";
                    }
                    liList = liList + "<li><a class=dropdown-item href=/Job/JobProgressSMME?Id=" + JobId + "&MId=" + m.MNJD_Id + "&Type=" + JD_VistType + ">" + lbl + "(" + m.MNJD_Frequency + "-" + m.MNJD_VisitCount + ")</a></li>"

                }
                         });

            List = "<ul class='dropdown-menu dropdown-menu-end'>" + liList + "</ul>"
            liList = '';

            MainJob = [];
        },
        error: function (data) {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}