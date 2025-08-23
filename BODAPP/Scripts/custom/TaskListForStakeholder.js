function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var Id=0;
var CAId = '';

$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    localStorage.setItem('href', path);

    Id = getParameterByName('Id');
    CAId = getParameterByName('CAId');
    if (Id > 0) {
        BindGrid(Id,CAId); 
    } else {
        BindGridWithoutParam(Id, CAId);
    }
});


function BindGrid(Id, CAId) {
    var EnterId = $('#EnterpriseId').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: 'TD_ProjectId',
            param1Value: Id,
            param2: 'TD_ActivityId',
            param2Value: CAId,
            StoreProcedure: 'TaskDetails_USP',
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#datatable-example");
        },
        complete: function () {
            LoaderEnd("#datatable-example");
        },
        success: function (data, status) {
            data = JSON.parse(data);
            var Mval = "";
            var TaskPrgrs = "";
            if (EnterId > 0) {
                Mval = 'E';
            } else {
                Mval = '';
            }
            if (parseInt($('#EnterpriseId').val()) > 0)
            {
                TaskPrgrs = "/Stakeholder/TaskProgressEnterprise";
            }
            else
            {
                TaskPrgrs = "/Project/TaskProgressAdmin";
            }

            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                    // Activity column: Make Activity Name clickable to redirect to Profile
                    {
                        targets: 0,  // Assuming 1 is the column index for "Activity"
                        render: function (e, t, a, s) {
                            return (
                                '<a href="' + TaskPrgrs + '?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TaskName + '</a>'
                            );
                        },
                    },
                    // Project column: Make Project Name clickable to redirect to Profile
                    {
                        targets: 1,
                        render: function (e, t, a, s) {
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column">' +
                                '<a href="/Stakeholder/ProjectDetailsNew?Id=' + a.TD_ProjectId + '" target="_blank"><span class="fw-normal text-' +
                                //["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                '">' + a.PD_ProjectName +
                                '</span></a><small class="text-muted"><a href="#" target="_blank">' +
                                a.CA_ActivityName +
                                "</a></small></div></div>"
                            );
                        },
                    },
                    
                    // Task column: Make Task Name clickable to redirect to Profile
                    {
                        targets: 2,  // Assuming 2 is the column index for "Task Name"
                        render: function (e, t, a, s) {
                            return (
                                 '<p>' + a.TD_Date + '</p>'
                            );
                        },
                    },
                    {
                        targets: 3,  // Assuming 2 is the column index for "Task Name"
                        render: function (e, t, a, s) {
                            return (
                                 '<p>' + a.TD_Status + '</p>'
                            );
                        },
                    },
                    {
                        targets: 4,
                        title: "Actions",
                        render: function (data, type, row) {
                            if (parseInt($('#EnterpriseId').val()) > 0) {
                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" onclick="TaskProgress(' + row.TD_Id + ')"  ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                            } else {
                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" style="border: 0 !important;" onclick="TaskProgress(' + row.TD_Id + ')" ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                            }
                        },
                    },
                ],
                order: [0, "desc"],
                dom: '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                    {
                        text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Task</span>',
                        className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                        action: function (e, dt, node, config) {
                            // This will send the page to the location specified
                            window.location.href = '/Stakeholder/CreateTask?M=E&Id=' + Id + '&CAId=' + CAId;
                        }
                    },
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                return "Details of " + e.data().SectorName;
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
            });

            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0");

            setTimeout(() => {
                $(".dataTables_filter .form-control").removeClass("form-control-sm"),
                $(".dataTables_length .form-select").removeClass("form-select-sm");
            }, 300);

        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}

function BindGridWithoutParam(Id, CAId) {
    var EnterId = $('#EnterpriseId').val();

    var TransactionType = '';
    if ($('#hdnStakeHolderType').val() == 'SU') {
        TranType = 'SelectListStakeholderUserForTask';
    }
    else {
        TranType = 'SelectListStakeholderForTask';
    }


    var _data = JSON.stringify({
        global: {
            TransactionType: TranType,
            param1: 'TD_ProjectId',
            param1Value: Id,
            param2: 'TD_ActivityId',
            param2Value: CAId,

            param3: 'PD_EnterpriseId',
            param3Value: parseInt($('#EnterpriseId').val()),
            param4: 'PWS_StakeholderId',
            param4Value: parseInt($('#hdnStakeHolderId').val()),
            StoreProcedure: 'TaskDetails_USP',
        }
    });

    //var EnterId = $('#EnterpriseId').val();
    //var _data = JSON.stringify({
    //    global: {
    //        TransactionType: globalData.TransactionType,
    //        param1: 'TD_ProjectId',
    //        param1Value: Id,
    //        param2: 'TD_ActivityId',
    //        param2Value: CAId,
    //        StoreProcedure: globalData.StoreProcedure
    //    }
    //});

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#datatable-example");
        },
        complete: function () {
            LoaderEnd("#datatable-example");
        },
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
                TaskPrgrs = "/Stakeholder/TaskProgressEnterprise";
            }
            else {
                TaskPrgrs = "/Project/TaskProgressAdmin";
            }

            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                    // Activity column: Make Activity Name clickable to redirect to Profile
                    {
                        targets: 0,  // Assuming 1 is the column index for "Activity"
                        render: function (e, t, a, s) {
                            return (
                                '<a href="' + TaskPrgrs + '?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TaskName + '</a>'
                            );
                        },
                    },
                    // Project column: Make Project Name clickable to redirect to Profile
                    {
                        targets: 1,
                        render: function (e, t, a, s) {
                            var m = a.PD_Id;
                            var c = a.CA_Id;
                            var ad = '/Stakeholder/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column">' +
                                '<a href="/Stakeholder/ProjectDetailsNew?Id=' + a.TD_ProjectId + '" onclick="getValue(' + 123 + ')"><span class="fw-normal text-' +
                                //["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                '">' + a.PD_ProjectName +
                                '</span></a><small class="text-muted"><a href="' + ad + '" target="_blank" >' +
                                a.CA_ActivityName +
                                "</a></small></div></div>"
                            );
                        },
                    },


                    // Task column: Make Task Name clickable to redirect to Profile
                    {
                        targets: 2,  // Assuming 2 is the column index for "Task Name"
                        render: function (e, t, a, s) {
                            return (
                                 '<p>' + a.TD_Date + '</p>'
                            );
                        },
                    },
                    {
                        targets: 3,  // Assuming 2 is the column index for "Task Name"
                        render: function (e, t, a, s) {
                            return (
                                 '<p>' + a.TD_Status + '</p>'
                            );
                        },
                    },
                    {
                        targets: 4,
                        title: "Actions",
                        render: function (data, type, row) {
                            if (parseInt($('#EnterpriseId').val()) > 0) {
                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" onclick="TaskProgress(' + row.TD_Id + ')"  ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                            } else {
                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" style="border: 0 !important;" onclick="TaskProgress(' + row.TD_Id + ')" ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                            }
                        },
                    },
                ],
                order: [0, "desc"],
                dom: '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                    //{
                    //    text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Task</span>',
                    //    className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                    //    action: function (e, dt, node, config) {
                    //        // This will send the page to the location specified
                    //        window.location.href = '/Stakeholder/CreateTask?M=E&Id=' + Id + '&CAId=' + CAId;
                    //    }
                    //},
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                return "Details of " + e.data().SectorName;
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
            });

            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0");

            setTimeout(() => {
                $(".dataTables_filter .form-control").removeClass("form-control-sm"),
                $(".dataTables_length .form-select").removeClass("form-select-sm");
            }, 300);

        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}


//function BindGrid(Id,CAId) {
//    var EnterId = $('#EnterpriseId').val();
//    var _data = JSON.stringify({
//        global: {
//            TransactionType: globalData.TransactionType,
//            param1: 'TD_ProjectId',
//            param1Value: Id,
//            param2: 'TD_ActivityId',
//            param2Value: CAId,
           
//            StoreProcedure: globalData.StoreProcedure
//        }
//    });

//    $.ajax({
//        type: "POST",
//        url: URLList.GetList,
//        contentType: "application/json; charset=utf-8",
//        data: _data,
//        dataType: "json",
//        success: function (data, status) {
//            data = JSON.parse(data);
//            var Mval = "";
//            if (EnterId > 0) {
//                Mval = 'E';
//            }
//            else {
//                Mval = '';
//            }

//            var oTable = $('#datatable-example').DataTable({
//                data: data,
//                columns: columnData,
//                columnDefs: [
// {
//     targets: 0,
//     render: function (e, t, a, s) {
//         return (
//                                        '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><span class=" fw-normal text-' +
//                   ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
//                   '">' +
//                                        a.PD_ProjectName +
//                                        '</span></a><small class="text-muted">' +
//                                        a.PD_DurationFromDate + '-' + a.PD_DurationToDate +
//                                        "</small></div></div>"
//                                    );
//     },
// },
//                    {
//                        targets: 4,
//                        title: "Actions",
//                        //searchable: !1,
//                        //orderable: !1,
//                        render: function (data, type, row) {
//                            if (parseInt($('#EnterpriseId').val())>0)
//                            {return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" onclick="TaskProgress(' + row.TD_Id + ')"  '+row.ProgressStatus+'><i class="ti ti-list"></i></button ></div>';
//                            }
//                            else{
//                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit"style="border: 0 !important;"onclick="TaskProgress(' + row.TD_Id + ')" '+row.ProgressStatus+'><i class="ti ti-list"></i></button ></div>';
//                            }
                            
//                        },
//                    },
//                ],
//                order: [0, "desc"],
//                dom:
//                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
//                lengthMenu: [7, 10, 20, 50, 70, 100],
//                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
//                buttons: [
//                   {
//                       text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Task</span>',
//                       className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                     
//                       action: function (e, dt, node, config)
//                       {
//                           //This will send the page to the location specified
//                           window.location.href = '/Stakeholder/CreateTask?M=E&Id='+Id+'&CAId='+CAId;
//                       }
//                   },
                     
//                ],
//                responsive: {
//                    details: {
//                        display: $.fn.dataTable.Responsive.display.modal({
//                            header: function (e) {
//                                return "Details of " + e.data().SectorName;
//                            },
//                        }),
//                        type: "column",
//                        renderer: function (e, t, a) {
//                            a = $.map(a, function (e, t) {
//                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
//                            }).join("");
//                            return !!a && $('<table class="table"/><tbody />').append(a);
//                        },
//                    },
//                },
//            })
//            $(".dt-action-buttons").addClass("pt-0"),
//            $(".dataTables_filter").addClass("me-3 ps-0"),

//        setTimeout(() => {
//            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
//        }, 300);
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            alert('request failed');
//      }
//   });
//}

function TaskProgress(Id)
{
    if (parseInt($('#EnterpriseId').val()) > 0)
    {
        window.location.href = '/Stakeholder/TaskProgressEnterprise?Id=' + Id;
    }
    else
    {
        window.location.href = '/Project/TaskProgressAdmin?Id=' + Id;
    }
   
}

