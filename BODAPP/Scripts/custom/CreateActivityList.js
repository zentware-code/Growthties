var ProjId;
$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    ////console.log(path);
    localStorage.setItem('href', path);

    var Id = getParameterByName('Id');
    //var TDId = getParameterByName('TDId');
    if (Id > 0) {
        ProjId = Id;
            BindGrid();
    }
    else
    {
        if ($("#hdnUserType").val() == "EnrUser") {
            BindGridForUser();
        } else {
            BindGridForList();
        }
    }
       
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BindGridForUser() {
    var EnterId = $('#EnterpriseId').val();
    if ($("#hdnUserType").val() == "EnrUser") {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectActiListforUser',
                param1: 'UWP_UserId',
                param1Value: parseInt($('#hdnUserId').val()),
                StoreProcedure: globalData.StoreProcedure
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
        success: function (data, status) {
            data = JSON.parse(data);
            var v = '/Project/ProjectDetailsNew?Id=';

            var Mval = "";
            if (EnterId > 0) {
                Mval = 'E';
            }
            else {
                Mval = '';
            }
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                     {
                         targets: 1,
                         render: function (e, t, a, s) {
                             var m = a.PD_Id;
                             var c = a.CA_Id;
                             var ad = '/Project/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                             return (
                                       '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                       //["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                       '">' +
                                            a.PD_ProjectName +
                                            '</span></a><small class="text-muted">' +
                                           // a.CA_DurationFromDate + ' - ' + a.CA_DurationToDate +
                                            "</small></div></div>"
                                        );
                         },
                     },
                     {
                         targets: 0,
                         title: "Activity Name",
                         render: function (data, type, row) {
                             var projectId = row.PD_Id || row.CA_ProjectId;
                             var activityId = row.CA_Id;
                             var name = row.CA_ActivityName ? $('<div>').text(row.CA_ActivityName).html() : "Unnamed Activity";

                             // Final URL to redirect to
                             var url = '/Project/ActivityDescription?Id=' + projectId + '&CAId=' + activityId;

                             return '<a href="' + url + '" class="text-decoration-none text-primary" target="_blank">' + name + '</a>';
                         }
                     },
                     {
                         targets: 3,
                         title: "TaskCount",
                         render: function (data, type, row) {
                             return '<a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="text-primary" target="_blank">' + row.TaskCount + '</a>';
                         },
                     },
                    {
                        targets: 5,
                        title: "Actions",
                        render: function (data, type, row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit ' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? 'disabled' : '') + '" href="/Project/CreateActivity?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? ' style="pointer-events: none; opacity: 0.5;"' : '') + '><i class="ti ti-edit"></i></a><a href="javascript:;" class="text-body dropdown-toggle hide-arrow ' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? 'disabled' : '') + '" data-bs-toggle="dropdown"' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? ' style="pointer-events: none; opacity: 0.5;"' : '') + '><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">Create Task</a><a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? '' : "<a class='dropdown-item' " + row.VisibilityNone + " onclick='ActivityCompleted(" + row.CA_Id + ")'> Mark as Completed </a>") + '</div></div>';
                        },
                    },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                 {
                     text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Activity</span>',
                     className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",

                     action: function (e, dt, node, config) {
                         //This will send the page to the location specified
                         window.location.href = '/Project/CreateActivity?M=E&Id=' + ProjId + '';
                     }
                 },

                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                var name = e.data().full_name ? e.data().full_name : e.data().PD_ProjectName;
                                return "Details of " + (name || "Name not found");
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            })
            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),

        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
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
    });
}


function BindGrid() {
    var EnterId = $('#EnterpriseId').val();
        var _data = JSON.stringify({
            global: {
                TransactionType: globalData.TransactionType,
                param1: globalData.param1,
                param1Value: parseInt(ProjId),
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
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data, status) {
            data = JSON.parse(data);
            var v = '/Project/ProjectDetailsNew?Id=';
           
            var Mval = "";
            if (EnterId > 0) {
                Mval = 'E';
            }
            else {
                Mval = '';
            }
            var oTable = $('#datatable-example').DataTable({
                scrollX: true,        // Allow horizontal scrolling
                responsive: true,
                data: data,
                columns: columnData,
                columnDefs: [
    {
        targets: 0,
        title: "Activity Name",
        responsivePriority: 2, // Important, but not more than Actions
        render: function (data, type, row) {
            var projectId = row.PD_Id || row.CA_ProjectId;
            var activityId = row.CA_Id;
            var name = row.CA_ActivityName ? $('<div>').text(row.CA_ActivityName).html() : "Unnamed Activity";
            var url = '/Project/ActivityDescription?Id=' + projectId + '&CAId=' + activityId;
            return '<a href="' + url + '" class="text-decoration-none text-primary" target="_blank">' + name + '</a>';
        }
    },
    {
        targets: 1,
        title: "Project",
        responsivePriority: 3,
        render: function (e, t, a, s) {
            var m = a.PD_Id;
            var c = a.CA_Id;
            var v = '/Project/ProjectDetailsNew?Id=';
            return (
                '<div class="d-flex justify-content-start align-items-center user-name">' +
                '<div class="d-flex flex-column">' +
                '<a href="' + v + m + '" target="_blank"><span class="fw-normal">' +
                a.PD_ProjectName +
                '</span></a></div></div>'
            );
        }
    },
    {
        targets: 3,
        title: "TaskCount",
        render: function (data, type, row) {
            return '<a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="text-primary" target="_blank">' + row.TaskCount + '</a>';
        },
    },
    {
        targets: 5,
        title: "Actions",
        responsivePriority: 1, // Always show Actions column
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
            var isCompleted = row.IsCompleted === '<span class="badge bg-label-success" text-capitalized="">Completed</span>';
            var disabledClass = isCompleted ? 'disabled' : '';
            var style = isCompleted ? ' style="pointer-events: none; opacity: 0.5;"' : '';

            return '<div class="d-flex align-items-sm-center justify-content-sm-center">' +
                '<a class="btn btn-sm btn-icon btnEdit ' + disabledClass + '" href="/Project/CreateActivity?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"' + style + '><i class="ti ti-edit"></i></a>' +
                '<a href="javascript:;" class="text-body dropdown-toggle hide-arrow ' + disabledClass + '" data-bs-toggle="dropdown"' + style + '><i class="ti ti-dots-vertical ti-sm mx-1"></i></a>' +
                '<div class="dropdown-menu dropdown-menu-end m-0">' +
                '<a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">Create Task</a>' +
                '<a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>' +
                (!isCompleted ? "<a " + row.VisibilityNone + " class='dropdown-item' " + row.VisibilityNone + " onclick='ActivityCompleted(" + row.CA_Id + ")'> Mark as Completed </a>" : '') +
                '</div></div>';
        }
    }
                ],

            
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                 {
                     text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Activity</span>',
                     className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                     
                     action: function (e, dt, node, config)
                     {
                         //This will send the page to the location specified
                         window.location.href = '/Project/CreateActivity?M=E&Id='+ProjId+'';
                     }
                 },
                     
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                var name = e.data().full_name ? e.data().full_name : e.data().PD_ProjectName;
                                return "Details of " + (name || "Name not found");
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            })
            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),

        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
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
    });
}

function BindGridForList() {
    var EnterId = $('#EnterpriseId').val();
    console.log("project- ", EnterId);
    if (EnterId > 0) {
        var _data = JSON.stringify({
            global: {
                TransactionType: globalData.TransactionType,
                param1: globalData.param1,
                param1Value: parseInt(ProjId),
                param2: "PD_EnterpriseId",
                param2Value: parseInt(EnterId),
                StoreProcedure: globalData.StoreProcedure
            }
        });
    } else {
        var _data = JSON.stringify({
            global: {
                TransactionType: globalData.TransactionType,
                param1: globalData.param1,
                param1Value: parseInt(ProjId),
                StoreProcedure: globalData.StoreProcedure
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
        success: function (data, status) {
            data = JSON.parse(data);
            var v = '/Project/ProjectDetailsNew?Id=';
            var Mval = "";
            if (EnterId > 0) {
                Mval = 'E';
            }
            else {
                Mval = '';
            }
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                        {
                            targets: 0,
                            title: "Activity Name",
                            render: function (data, type, row) {
                                var projectId = row.PD_Id || row.CA_ProjectId;
                                var activityId = row.CA_Id;
                                var name = row.CA_ActivityName ? $('<div>').text(row.CA_ActivityName).html() : "Unnamed Activity";

                                // Final URL to redirect to
                                var url = '/Project/ActivityDescription?Id=' + projectId + '&CAId=' + activityId;

                                return '<a href="' + url + '" class="text-decoration-none text-primary" target="_blank">' + name + '</a>';
                            }
                        },
                        {
                            targets: 1,
                            render: function (e, t, a, s) {
                               var m = a.PD_Id;
                                return (
                                                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                        //["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                        '">' +
                                                            a.PD_ProjectName +
                                                            '</span></a><small class="text-muted">' +
                                                           // a.PD_DurationFromDate + ' - ' + a.PD_DurationToDate +
                                                            "</small></div></div>"
                                                        );
                            },
                        },
                        
                       {
                           targets: 3,
                           title: "TaskCount",
                           render: function (data, type, row) {
                               return '<a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="text-primary" target="_blank">' + row.TaskCount + '</a>';
                           },
                       },
                        {
                            targets: 5,
                            title: "Actions",
                            //searchable: !1,
                            //orderable: !1,
                            render: function (data, type, row) {
                            
                                //return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateActivity?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"  ><i class="ti ti-edit"></i></a><a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" >Create Task</a><a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? '' : "<a class='dropdown-item text-black' onclick='ActivityCompleted(" + row.CA_Id + ")'> Mark as Completed </a>") + '</div></div>';

                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit ' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? 'disabled' : '') + '" href="/Project/CreateActivity?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? ' style="pointer-events: none; opacity: 0.5;"' : '') + '><i class="ti ti-edit"></i></a><a href="javascript:;" class="text-body dropdown-toggle hide-arrow ' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? 'disabled' : '') + '" data-bs-toggle="dropdown"' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? ' style="pointer-events: none; opacity: 0.5;"' : '') + '><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">Create Task</a><a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>' + (row.IsCompleted == '<span class="badge bg-label-success" text-capitalized="">Completed</span>' ? '' : "<a " + row.VisibilityNone + " class='dropdown-item' onclick='ActivityCompleted(" + row.CA_Id + ")'> Mark as Completed </a>") + '</div></div>';

                            },
                        },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                 
                     
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                var name = e.data().full_name ? e.data().full_name : e.data().PD_ProjectName;
                                return "Details of " + (name || "Name not found");
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            })
            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),

        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
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
    });
}



function ActivityCompleted(id) {
    var _data = JSON.stringify({
        entity: {
            TransactionType: "IsCompleted",
            CA_Id: id,
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertCreateActivity',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log('gsjfcgsdjff', data)
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                    Swal.fire({
                        title: "Successful..!",
                        text: "Your changes were saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false,
                    }).then(() => {
                        location.reload();
                    });
                } else {

                    Swal.fire({
                        title: "Oops..",
                        text: 'This activity already completed',
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
