var UserLogoList = '';
var SMMLogoList = '';
var AcivityList = '';
var EntId='';
var Id = 0;
var TaskList='';

"use strict";
var GlobData=[];

$(document).ready(function () {
    Id = getParameterByName('Id');
    var Type = getParameterByName('Type');
    if (Id > 0) {
        BindGrid(Id);
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function BindGrid(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskListForSMME',
            param1: 'PSM_SMMEId',
            param1Value: Id,
            StoreProcedure: 'TaskDetails_USP'
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
            
            var e = $(".task-projects");
            e.length &&
                (e.DataTable({
                    data:data,
                    columns: [{ data: "" }, { data: "TD_TaskName" }, { data: "CA_ActivityName" }, { data: "" }, { data: "status" }, { data: "" }],
                    columnDefs: [
                        {
                            className: "control",
                            searchable: !1,
                            orderable: !1,
                            responsivePriority: 2,
                            targets: 0,
                            render: function (e, a, t, r) {
                                return "";
                            },
                        },
                       
                        {
                            targets: 1,
                            responsivePriority: 4,
                            render: function (e, a, t, r) {
                                var s = t.Img,
                                    d = t.TD_TaskName,
                                    n = t.PD_ProjectName;
                                return (
                                    '<div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar me-2">' +
                                    (s
                                        ? '<img src="' + assetsPath + "img/icons/brands/" + s + '" alt="Avatar" class="rounded-circle">'
                                        : '<span class="avatar-initial rounded-circle bg-label-' +
                                          ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                          '">' +
                                          (s = (((s = (d = t.TD_TaskName).match(/\b\w/g) || []).shift() || "") + (s.pop() || "")).toUpperCase()) +
                                          "</span>") +
                                    '</div></div><div class="d-flex flex-column"><span class="text-truncate fw-medium">' +
                                    d +
                                    '</span><small class="text-truncate text-muted">' +
                                    n +
                                    "</small></div></div>"
                                );
                            },
                        },
                        {
                            targets: 3,
                            orderable: !1,
                            searchable: !1,
                            render: function (e, t, a, r) {
                                //var array = retriveSMME(a.BA_Id);

                                return '<div class="d-flex align-items-center avatar-group">  ' + a.SMME_Logo + '</div>';
                            
                            },
                        },
                        {
                            targets: -2,
                            render: function (e, a, t, r) {
                                t = t.status;
                                return (
                                    '<div class="d-flex align-items-center"><div class="progress w-100 me-3" style="height: 6px;"><div class="progress-bar" style="width: ' +
                                    t +
                                    '" aria-valuenow="' +
                                    t +
                                    '" aria-valuemin="0" aria-valuemax="100"></div></div><span>' +
                                    t +
                                    "</span></div>"
                                );
                            },
                        },
                        {
                            targets: -1,
                            searchable: !1,
                            title: "Actions",
                            orderable: !1,
                            render: function (e, a, t, r) {
                                return '<div class="d-inline-block"><a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="javascript:;" class="dropdown-item">Details</a><a href="javascript:;" class="dropdown-item">Archive</a><div class="dropdown-divider"></div><a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a></div></div>';
                            },
                        },
                    ],
                    order: [[2, "desc"]],
                    dom: '<"card-header pb-0 pt-sm-0"<"head-label text-center"><"d-flex justify-content-center justify-content-md-end"f>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                    displayLength: 7,
                    lengthMenu: [7, 10, 25, 50, 75, 100],
                    responsive: {
                        details: {
                            display: $.fn.dataTable.Responsive.display.modal({
                                header: function (e) {
                                    return 'Details of "' + e.data().project_name + '" Project';
                                },
                            }),
                            type: "column",
                            renderer: function (e, a, t) {
                                t = $.map(t, function (e, a) {
                                    return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>" : "";
                                }).join("");
                                return !!t && $('<table class="table"/><tbody />').append(t);
                            },
                        },
                    },
                }),
                $("div.head-label").html('<h5 class="card-title mb-0">Task List</h5>')),
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
})
}
