function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var Id=0;
var CAId='';
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
        BindGridWithoutParam();
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
            var Mval = "";
            var TaskPrgrs = "";
            if (EnterId > 0) {
                Mval = 'E';
            } else {
                Mval = '';
            }
            if (parseInt($('#EnterpriseId').val()) > 0)
            {
                TaskPrgrs = "/Project/TaskProgressEnterprise";
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
                            var m = a.PD_Id;
                            var c = a.CA_Id;
                            var ad = '/Project/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column">' +
                                '<a href="' + TaskPrgrs + '?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TaskName + '</a>' 
                                + '<small class="text-muted"><a href="'+ ad +'" target="_blank">' +
                            a.CA_ActivityName +
                            "</a></small></div></div>"
                            );
                        },
                    },   
                    // Project column: Make Project Name clickable to redirect to Profile
                    {
                        targets: 1,
                        render: function (e, t, a, s) {
                            var m = a.PD_Id;
                            var c = a.CA_Id;
                            //var ad = '/Project/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column">' +
                                '<a href="/Project/ProjectDetailsNew?Id=' + a.TD_ProjectId + '" target="_blank"><span class="fw-normal text-' +
                                //["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                '">' + a.PD_ProjectName +
                                '</span></a>' + "</div></div>"
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
                            var projectId = row.TD_ProjectId;
                            var taskId = row.TD_Id;
                            var progressStatus = row.ProgressStatus || '';
                            var enterpriseCheck = parseInt($('#EnterpriseId').val()) > 0;

                            if ($("#hdnUserType").val() == "EnrUser") {
                                return '<div class="dropdown text-center">' +
                                '<button class="btn btn-sm btn-icon dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                                    '<i class="ti ti-dots-vertical"></i>' +
                                '</button>' +
                                '<ul class="dropdown-menu dropdown-menu-end">' +
                                    '<li><a class="dropdown-item" href="/Project/CreateTask?M=' + Mval + '&Id=' + projectId + '&TDId=' + taskId + '"><i class="ti ti-edit me-2"></i>Edit Task</a></li>' +
                                    '<li><button class="dropdown-item" onclick="TaskProgress(' + taskId + ')" ' + progressStatus + '><i class="ti ti-list me-2"></i>View Task Board</button></li>' +
                                    //'<li><button class="dropdown-item" data-bs-target="#asignShareholderUser" data-bs-toggle="modal" onclick="showStackUserList(' + taskId + ',' + projectId + ')"><i class="ti ti-users me-2"></i>Manage Users</button></li>' +
                                '</ul>' +
                            '</div>';
                            } else {
                                return '<div class="dropdown text-center">' +
                                '<button class="btn btn-sm btn-icon dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                                    '<i class="ti ti-dots-vertical"></i>' +
                                '</button>' +
                                '<ul class="dropdown-menu dropdown-menu-end">' +
                                    '<li><a class="dropdown-item" href="/Project/CreateTask?M=' + Mval + '&Id=' + projectId + '&TDId=' + taskId + '"><i class="ti ti-edit me-2"></i>Edit Task</a></li>' +
                                    '<li><button class="dropdown-item" onclick="TaskProgress(' + taskId + ')" ' + progressStatus + '><i class="ti ti-list me-2"></i>View Task Board</button></li>' +
                                    '<li><button class="dropdown-item" data-bs-target="#asignShareholderUser" data-bs-toggle="modal" onclick="showStackUserList(' + taskId + ',' + projectId + ')"><i class="ti ti-users me-2"></i>Manage Users</button></li>' +
                                '</ul>' +
                            '</div>';
                            }
                            
                        }
                    },

                    //{
                    //    targets: 4,
                    //    title: "Actions",
                    //    render: function (data, type, row) {
                    //        if (parseInt($('#EnterpriseId').val()) > 0) {
                    //            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" onclick="TaskProgress(' + row.TD_Id + ')"  ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                    //        } else {
                    //            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" style="border: 0 !important;" onclick="TaskProgress(' + row.TD_Id + ')" ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                    //        }
                    //    },
                    //},
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
                            window.location.href = '/Project/CreateTask?M=E&Id=' + Id + '&CAId=' + CAId;
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

function BindGridWithoutParam() {
    var EnterId = $('#EnterpriseId').val();
    if ($("#hdnUserType").val() == "EnrUser") {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectTaskListForEnrUser',
                param1: 'TD_ProjectId',
                param1Value: Id,
                param2: 'TD_ActivityId',
                param2Value: CAId,
                param3: 'PD_EnterpriseId',
                param3Value: parseInt($('#EnterpriseId').val()),
                param4: 'TWEU_UserId',
                param4Value: parseInt($('#hdnUserId').val()),
                StoreProcedure: globalData.StoreProcedure
            }
        });
    } else {
        var _data = JSON.stringify({
            global: {
                TransactionType: globalData.TransactionType,
                param1: 'TD_ProjectId',
                param1Value: Id,
                param2: 'TD_ActivityId',
                param2Value: CAId,
                param3: 'PD_EnterpriseId',
                param3Value: parseInt($('#EnterpriseId').val()),
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
                            var m = a.PD_Id;
                            var c = a.CA_Id;
                            var ad = '/Project/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column">' +
                                '<a href="' + TaskPrgrs + '?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TaskName + '</a>'
                                + '<small class="text-muted"><a href="' + ad + '" target="_blank">' +
                            a.CA_ActivityName +
                            "</a></small></div></div>"
                            );
                        },
                        //render: function (e, t, a, s) {
                        //    return (
                        //        '<a href="' + TaskPrgrs + '?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TaskName + '</a>'
                        //    );
                        //},
                    },
                    // Project column: Make Project Name clickable to redirect to Profile
                    {
                        targets: 1,
                        render: function (e, t, a, s) {
                            var m = a.PD_Id;
                            var c = a.CA_Id;
                            //var ad = '/Project/ActivityDescription?Id=' + m + '&CAId=' + c + '';
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column">' +
                                '<a href="/Project/ProjectDetailsNew?Id=' + a.TD_ProjectId + '" target="_blank"><span class="fw-normal text-' +
                                //["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                '">' + a.PD_ProjectName +
                                '</span></a>'+ "</div></div>"
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
                            var projectId = row.TD_ProjectId;
                            var taskId = row.TD_Id;
                            var progressStatus = row.ProgressStatus || '';
                            var enterpriseCheck = parseInt($('#EnterpriseId').val()) > 0;

                            if ($("#hdnUserType").val() == "EnrUser") {
                                return '<div class="dropdown text-center">' +
                                '<button class="btn btn-sm btn-icon dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                                    '<i class="ti ti-dots-vertical"></i>' +
                                '</button>' +
                                '<ul class="dropdown-menu dropdown-menu-end">' +
                                    '<li><a class="dropdown-item" href="/Project/CreateTask?M=' + Mval + '&Id=' + projectId + '&TDId=' + taskId + '"><i class="ti ti-edit me-2"></i>Edit Task</a></li>' +
                                    '<li><button class="dropdown-item" onclick="TaskProgress(' + taskId + ')" ' + progressStatus + '><i class="ti ti-list me-2"></i>View Task Board</button></li>' +
                                    //'<li><button class="dropdown-item" data-bs-target="#asignShareholderUser" data-bs-toggle="modal" onclick="showStackUserList(' + taskId + ',' + projectId + ')"><i class="ti ti-users me-2"></i>Manage Users</button></li>' +
                                '</ul>' +
                            '</div>';
                            } else {
                                return '<div class="dropdown text-center">' +
                                '<button class="btn btn-sm btn-icon dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                                    '<i class="ti ti-dots-vertical"></i>' +
                                '</button>' +
                                '<ul class="dropdown-menu dropdown-menu-end">' +
                                    '<li><a class="dropdown-item" href="/Project/CreateTask?M=' + Mval + '&Id=' + projectId + '&TDId=' + taskId + '"><i class="ti ti-edit me-2"></i>Edit Task</a></li>' +
                                    '<li><button class="dropdown-item" onclick="TaskProgress(' + taskId + ')" ' + progressStatus + '><i class="ti ti-list me-2"></i>View Task Board</button></li>' +
                                    '<li><button class="dropdown-item" data-bs-target="#asignShareholderUser" data-bs-toggle="modal" onclick="showStackUserList(' + taskId + ',' + projectId + ')"><i class="ti ti-users me-2"></i>Manage Users</button></li>' +
                                '</ul>' +
                            '</div>';
                            }

                        }
                    },
                    //{
                    //    targets: 4,
                    //    title: "Actions",
                    //    render: function (data, type, row) {
                    //        if (parseInt($('#EnterpriseId').val()) > 0) {
                    //            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" onclick="TaskProgress(' + row.TD_Id + ')"  ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                    //        } else {
                    //            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateTask?M=' + Mval + '&Id=' + row.TD_ProjectId + '&TDId=' + row.TD_Id + '"  ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" style="border: 0 !important;" onclick="TaskProgress(' + row.TD_Id + ')" ' + row.ProgressStatus + '><i class="ti ti-list"></i></button ></div>';
                    //        }
                    //    },
                    //},
                ],
                order: [0, "desc"],
                dom: '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [],
                //buttons: [
                //    {
                //        text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Task</span>',
                //        className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                //        action: function (e, dt, node, config) {
                //            // This will send the page to the location specified
                //            window.location.href = '/Project/CreateTask?M=E&Id=' + Id + '&CAId=' + CAId;
                //        }
                //    },
                //],
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


function TaskProgress(Id)
{
    if (parseInt($('#EnterpriseId').val()) > 0)
    {
        window.location.href = '/Project/TaskProgressEnterprise?Id=' + Id;
    }
    else
    {
        window.location.href = '/Project/TaskProgressAdmin?Id=' + Id;
    }
}

function showStackUserList(tskid, projectId) {
    $("#ulSTUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseUserForTaskTagging',
            param2: 'TaskId',
            param2Value: parseInt(tskid),
            param1: 'UM_MainID',
            //param2Value: parseInt($('#hdnStakeHolderId').val()),
            StoreProcedure: 'TaskDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
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

            //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable = 0;

            // Clear previous list content (optional, based on your use-case)
            $("#ulSTUserList").empty();

            if (count === 0) {
                $("#ulSTUserList").append("<li class='text-muted text-center fs-4'>Data not found</li>");
                return;
            }

            $.each(data, function (i, v) {

                var logo = "";
                var index = i + 1;
                if (v.UM_ProfilePic == "") {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.UM_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0">' + v.UM_Name + '</h6><span>' + v.UM_EmailId + '</span></div></div>';
                }
                else {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.UM_ProfilePic + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + v.UM_Name + '</h6><span>' + v.UM_EmailId + '</span></div></div>';
                }
                $("#ulSTUserList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input enr'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='UserTaggingForTask(" + index + "," + tskid + "," + projectId + "," + v.UM_ParentId + "," + v.UM_Id + ")'></div>");

            });
            $(".enr").find("checkbox").each(function () {
                if ($(this).prop('checked') == true) {
                    isenable = 1
                }
            });
            if (isenable == 0) {
                $('.enr').prop('disabled', false);
            }
        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

function UserTaggingForTask(index, tskid,projectId, ENR_Id, UM_Id) {
    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {
        TransactionType = 'InsertTaskTagToEnrUser';
    } else {
        TransactionType = 'UpdateTaskTagToEnrUser';
    }

    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            TWEU_EnterpriseId: parseInt(ENR_Id),
            TWEU_ProjectId: parseInt(projectId),
            TWEU_TaskId: parseInt(tskid),
            TWEU_UserId: parseInt(UM_Id),
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/TaggingTaskToEnterpriseUser',
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
            } else {
                Swal.fire({
                    title: 'Oops..',
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
