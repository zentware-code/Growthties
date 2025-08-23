let TaskId = 0;
var Status = "";
var Id = 0;
var CAId = '';

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function () {
    Id = getParameterByName('Id');
    CAId = getParameterByName('CAId');
    if (Id > 0) {
        BindGrid(Id,CAId);
    } else {
        BindGridWithoutParam();
    }
});


function BindGrid(Id,CAId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskListForSMME',
            param1: 'TD_ProjectId',
            param1Value: Id,
            param2: 'TD_ActivityId',
            param2Value: CAId,
            param3: 'PSM_SMMEId',
            param3Value: parseInt($('#SmmeId').val()),
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
            var v = '/Project/ProjectDetailsNew?Role=smme&Id=';
            var Mval = "";
            var TaskPrgrs = "";
          
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                     {
                         targets: 0,
                         render: function (e, t, a, s) {
                             var m = a.PD_Id;
                             return (
                                                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                       ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                       '">' +
                                            a.PD_ProjectName +
                                            '</span></a><small class="text-muted">' +
                                            a.PD_DurationFromDate + ' - ' + a.PD_DurationToDate +
                                            "</small></div></div>"
                                        );
                         },
                     },
                      {
                        targets: 1,  // Assuming 1 is the column index for "Activity"
                        render: function (e, t, a, s) {
                            return (
                                '<a href="/Project/TaskProgressSMME?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TD_TaskName + '</a>'
                            );
                        },
                    },
                    {
                        targets: 4,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><button class="btn btn-sm btn-icon me-2"  onclick="chkForAssignType(' +  row.TD_Id + ',\'' + row.AssignType + '\')" data-bs-dismiss="modal"><i class="ti ti-user-plus"></i></button><a class="btn btn-sm btn-icon me-2" href="/Project/TaskProgressSMME?Id='+row.TD_Id+'"><i class="ti ti-subtask"></i></a></div>';
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



function BindGridWithoutParam() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskListForSMME',
            param1: 'TD_ProjectId',
            param1Value: Id,
            param2: 'TD_ActivityId',
            param2Value: CAId,
            param3: 'PSM_SMMEId',
            param3Value: parseInt($('#SmmeId').val()),
            //param4: 'TWEU_UserId',
            //param4Value: parseInt($('#hdnUserId').val()),
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
            var v = '/Project/ProjectDetailsNew?Role=smme&Id=';
            var Mval = "";
            var TaskPrgrs = "";
          
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                     {
                         targets: 0,
                         render: function (e, t, a, s) {
                             var m = a.PD_Id;
                             return (
                                                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                       ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                       '">' +
                                            a.PD_ProjectName +
                                            '</span></a><small class="text-muted">' +
                                            a.PD_DurationFromDate + ' - ' + a.PD_DurationToDate +
                                            "</small></div></div>"
                                        );
                         },
                     },
                      {
                        targets: 1,  // Assuming 1 is the column index for "Activity"
                        render: function (e, t, a, s) {
                            return (
                                '<a href="/Project/TaskProgressSMME?Id=' + a.TD_Id + '&Mode=V" target="_blank">' + a.TD_TaskName + '</a>'
                            );
                        },
                    },
                    {
                        targets: 4,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><button class="btn btn-sm btn-icon me-2"  onclick="chkForAssignType(' +  row.TD_Id + ',\'' + row.AssignType + '\')" data-bs-dismiss="modal"><i class="ti ti-user-plus"></i></button><a class="btn btn-sm btn-icon me-2" href="/Project/TaskProgressSMME?Id='+row.TD_Id+'"><i class="ti ti-subtask"></i></a></div>';
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



function chkForAssignType(TaskId, Type) {
    if (Type == "Team") {
        $('#flexSwitchCheckDefault').prop('checked', true);
        ShowAllTeam(TaskId);
        Status = 'Team';
    }
    else {
        $('#flexSwitchCheckDefault').prop('checked', false);
        ShowAllUser(TaskId);
        Status = 'User';
    }
   
}

function ShowAllUser(id) {
    TaskId=id;
  
    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllSmmeUser',
            param1:'PSM_SMMEId',
            param1Value: $('#SmmeId').val(),
            param2: 'TD_Id',
            param2Value: id,
            StoreProcedure: globalData.StoreProcedure
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
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.UM_Name + "</h6><p class='mb-0 text-muted'>Email: " + v.UM_EmailId + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignTask(" + index + "," + v.UM_Id + ",null)'></div></div></div>");

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
function ShowAllTeam(id) {
    TaskId=id;
  
    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseTeam',
            param1:'PSM_SMMEId',
            param1Value: $('#SmmeId').val(),
            param2: 'TD_Id',
            param2Value: id,
            StoreProcedure: globalData.StoreProcedure
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
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.BT_TeamName + "</h6></div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignTask(" + index + ",null," + v.BT_Id + ")'></div></div></div>");

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

$('#flexSwitchCheckDefault').change(function () {
    //UnAssignTask();
    if ($('#flexSwitchCheckDefault').is(':checked')) {
       
        ShowAllTeam(TaskId);
        Status='Team';
        

    } else {

        ShowAllUser(TaskId);
        Status='User';
    }
})


function AssignTask(index, UmId, TeamId) {
    var Transaction="";
    if ($('#chkId_' + index).is(':checked')) {

        Transaction = "AssignTaskToSmmeUser";
    } else {

        Transaction="UnAssignTaskToSmmeUser";
    }

    var _data = JSON.stringify({
        entity: {

            TD_Id: TaskId,
            UserId: UmId,
            TeamId: TeamId,
            Status:Status,
            TransactionType: Transaction

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignTaskToSMMEUser',
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
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
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
}

function UnAssignTask() {
   
    var _data = JSON.stringify({
        entity: {
              TD_Id: TaskId,
            
            TransactionType: 'ResetAssignment'

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignTaskToSMMEUser',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
               
            }
            else {

                Swal.fire({
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
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
}



function TaskProgress(Id) {
    window.location.href = '/Project/TaskProgressSMME?Id=' + Id;
    }