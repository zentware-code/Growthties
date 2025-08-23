let Id = 0;
let CAId = 0;
var SMMLogoList = '';

$(document).ready(function () {
        LoaderStart(".loader-sectionenr");

    Id = getParameterByName('Id');
    CAId = getParameterByName('CAId');
   
    if (Id > 0) {
        retriveActivityDetails()
        BindGrid(Id, CAId)
        fnSmmeForProject(Id)
       }
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function retriveActivityDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectActivityDetails',
            param1: 'CA_Id',
            param1Value: parseInt(CAId),
            param2: 'CA_ProjectId',
            param2Value: parseInt(Id),
            StoreProcedure: 'CreateActivity_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
           
            if (typeof data === "string") {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.error("Invalid JSON:", e);
                    return;
                }
            }
          
            if (!Array.isArray(data)) {
                console.error("Expected array, got:", data);
                return;
            }

            var count = data.length;

            $.each(data, function (i, v) {
                console.log('acti_data', data);
                var index = i + 1;
                var active = '';
                if (index == 1) {
                    active = 'active';
                }
                var line = '';
                pl = '/Project/ProjectDetailsNew?Id=' + v.PD_Id;
                al = '/Project/CreateActivity?M=E' + '&Id=' + v.PD_Id + '&CAId=' + v.CA_Id;

                // Set progress and dropdown state
                var progressPercent = v.IsCompleted == 1 ? 100 : v.Status;
                var isCompleted = v.IsCompleted == 1;

                // Build dropdown (enabled or disabled)
                var dropdownHTML = isCompleted
                    ? "<div class='dropdown z-2'>\
                        <button class='btn p-0 text-muted' disabled title='Task is completed'>\
                            <i class='ti ti-dots-vertical'></i>\
                        </button>\
                      </div>"
                                    : "<div class='dropdown z-2'>\
                        <button aria-expanded='false' class='btn dropdown-toggle hide-arrow p-0' data-bs-toggle='dropdown' type='button'>\
                          <i class='text-muted ti ti-dots-vertical'></i>\
                        </button>\
                        <ul class='dropdown-menu dropdown-menu-end'>\
                          <li><a class='dropdown-item' href='" + al + "'>Edit</a></li>\
                        </ul>\
                      </div>";

                                // Append card to container
                                $("#snglActivityDiv").append(
                                  "<div class=''>\
                    <div class='card' style='min-height:365px;height:100%;'>\
                      <div class='card-header p-1 py-3'>\
                        <div class='d-flex justify-content-between'>\
                          <div class='me-2 ms-2'>\
                            <h3 class='mb-2'>\
                              <a class='text-body stretched-link' href='javascript:;'>" + v.CA_ActivityName + "</a>\
                            </h3>\
                            <div class='client-info ellipsisWrap' id='dvEnterprise'>\
                              <span class='fw-medium'>Project Name: </span>\
                              <a href='" + pl + "'><span class='text-primary'>" + v.PD_ProjectName + "</span></a>\
                            </div>\
                          </div>\
                          " + dropdownHTML + "\
                        </div>\
                      </div>\
                      <div class='card-body p-2 py-3'>\
                        <div class='d-flex align-items-center flex-wrap justify-content-between'>\
                          <div class='mb-3 badge bg-label-info me-auto px-3 py-2 rounded'></div>\
                          <div class='mb-3 d-flex justify-content-between w-100'>\
                            <h6 class='mb-0'>Start Date: <span class='fw-normal text-success'>" + v.CA_DurationFromDate + "</span></h6>\
                            <h6 class='mb-0'>Deadline: <span class='fw-normal text-danger'>" + v.CA_DurationToDate + "</span></h6>\
                          </div>\
                        </div>\
                        <p class='mt-5 ellipsisWrap-new-ln'>" + v.CA_Description + "</p>\
                      </div>\
                      <div class='card-body p-2 py-3'>\
                        <div class='d-flex align-items-center mb-3'></div>\
                        <div class='d-flex align-items-center justify-content-between mb-2 pb-1'></div>\
                      <div class='d-flex align-items-center pt-1'><div class='ms-auto'></div></div>\
                      <div class='d-flex align-items-center justify-content-between mb-2 pb-1'>\
                        <small>" + progressPercent + "% Completed</small>\
                      </div>\
                      <div class='mb-2 progress' style='height:8px'>\
                        <div class='progress-bar' style='width:" + progressPercent + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + progressPercent + "' role='progressbar'></div>\
                      </div>\
                    </div>\
                    </div>\
                  </div>"
                );

            });
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


function BindGrid(Id, CAId) {
    var EnterId = $('#EnterpriseId').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTasksForActivityDetails',
            param1: 'TD_ProjectId',
            param1Value: Id,
            param2: 'TD_ActivityId',
            param2Value: CAId,

            StoreProcedure: 'TaskDetails_USP'
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data, status) {
            data = JSON.parse(data);
            var Mval = "";
            var TaskPrgrs = "";
            if (EnterId > 0) {
                Mval = 'E';
            } else {
                Mval = '';
            }
            if (parseInt($('#EnterpriseId').val()) > 0) {
                TaskPrgrs = "/Project/TaskProgressEnterprise";
            }
            else if (parseInt($('#SmmeId').val()) > 0) {
                TaskPrgrs = "/Project/TaskProgressSMME";
            } else {
                TaskPrgrs = "/Project/TaskProgressAdmin";
            }

            let t, a;
            //s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example");

            //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };

            n.length &&
                (e = n.DataTable({
                    data: data,
                    columns: [{ data: "TD_TaskName" }, { data: "PD_Project" }, { data: "Logo" }, { data: "status" }],
                    columnDefs: [
                {
                    targets: 0,
                    render: function (e, t, a, s) {
                        var n = a.TD_TaskName,
                            i = a.CA_ActivityName,
                            o = a.Logo,
                            r = a.TD_Id;
                        var m = a.PD_Id;
                        var c = a.CA_Id;
                        var ad = '/Project/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                        return (
                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar me-3">' +
                            (o
                                ? '<img src="' + a.Logo + '" alt="Avatar" class="rounded-circle">'
                                : '<span class="avatar-initial rounded-circle bg-label-' +
                                  ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                  '">' +
                                  (o = (((o = (n = a.TD_TaskName).match(/\b\w/g) || []).shift() || "") + (o.pop() || "")).toUpperCase()) +
                                  "</span>") +
                            '</div></div><div class="d-flex flex-column"><a href="' + TaskPrgrs + '?Mode=V&Id=' + r + '" class="text-body text-truncate"><span class="fw-medium">' +
                            n +
                            '</span></a><small class="text-muted"><a href="'+ ad +'">' +
                            i +
                            "</a></small></div></div>"
                        );
                    },
                },
                   {
                       targets: 2,
                       orderable: !1,
                       searchable: !1,
                       render: function (e, t, a, r) {
                           //var array = retriveSMME(a.BA_Id);
                           fnSmmeForTask(a.TD_Id);
                           return '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1">' + SMMLogoList + '</ul>';

                       },
                   },
                {
                    targets: 3,
                    render: function (e, t, a, s) {
                        // Strip HTML from TD_Status if necessary
                        var statusText = $("<div>").html(a.TD_Status).text().trim();
    
                        // Set progress to 100% if Completed
                        var progressValue = statusText === "Completed" ? 100 : parseInt(a.Status) || 0;

                        return (
                            '<div class="d-flex align-items-center">' +
                                '<div class="progress w-100 me-3" style="height: 6px;">' +
                                    '<div class="progress-bar" style="width: ' + progressValue + '%;" aria-valuenow="' + progressValue + '" aria-valuemin="0" aria-valuemax="100"></div>' +
                                '</div>' +
                                '<span>' + progressValue + '%</span>' +
                            '</div>'
                        );
                    },
                },

                    ],
                    lengthMenu: [5, 10, 30, 75, 100],
                    scrollY: '200px',
                    order: [[1, "desc"]],
                    dom:
                        '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                    language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                    buttons: [],

                })),
            $(".datatables-users tbody").on("click", ".delete-record", function () {
                e.row($(this).parents("tr")).remove().draw();
            })
            
            LoaderEnd(".loader-sectionenr");
        },
        error: function (xhr, textStatus, errorThrown) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops..',
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    })
}



function fnSmmeForTask(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseSMMELogo',
            param1: 'TD_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'TaskDetails_USP'
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
            UserLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {

                    UserLogoList = UserLogoList + v.UM_ProfilePic;

                });
            }
            else {
                UserLogoList = '<div class="d-flex align-items-center" ><span class="badge bg-label-danger">No User Found</span></div>';
            }

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}



function fnSmmeForProject(id) {

    $('#divSmmE').html('');
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseSMMELogoDetails',
            param1: 'PD_Id',
            param1Value: parseInt(id),
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
            if (count > 0 && count == 1) {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
                $('#divSmmE').append(SMMLogoList);
            }
            else if (count > 0 && count > 1) {
                $.each(data, function (i, v) {
                    SMMLogoList = SMMLogoList + v.SMME_Logo;
                });
                $('#divSmmE').append(SMMLogoList + '<div class="avatar me-2"><button class="btn btn-sm btn-icon" data-bs-target="#shareProjectClkLogo" data-bs-toggle="modal" onclick="ShowAllSMMEClkLogo()" data-bs-dismiss="modal"><span id="clkLogo" class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip" data-bs-placement="bottom" title="3 more">+3</span></button> </div>');

               
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" ><span class="badge bg-label-danger">No SMME Found</span></div>';
                $('#divSmmE').append(SMMLogoList);
            }

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
