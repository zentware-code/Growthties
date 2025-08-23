
$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    localStorage.setItem('href', path);
        BindGrid()
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BindGrid() {
    var SMMEId = $('#SMMEId').val();
    if ($("#hdnUserType").val() == "SMMEUser") {
        var postData = JSON.stringify({
            global: {
                TransactionType: globalData.TransactionType,
                param1: 'PSM_SMMEId',
                param1Value: parseInt($('#SMMEId').val()),
                param2: 'UWP_UserId',
                param2Value: parseInt($('#hdnUserId').val()),
                StoreProcedure: globalData.StoreProcedure
            }
        });
    } else {
        var _data = JSON.stringify({
            global: {
                TransactionType: globalData.TransactionType,
                param1: 'PSM_SMMEId',
                param1Value: SMMEId,
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
            var v = '/Project/ProjectDetailsNew?Role=smme&Id=';
            var Mval = "";
            
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                        {
                            targets: 0,
                            render: function (e, t, a, s) {
                                var m = a.PD_Id;
 
                                return (
                                                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" ><span class=" fw-normal text-' +
                                        ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                        '">' +
                                            a.PD_ProjectName +
                                            '</span></a><small class="text-muted">' +
                                            a.CA_DurationFromDate + ' - ' + a.CA_DurationToDate +
                                            "</small></div></div>"
                                        );
                            },
                        },
                        {
                            targets: 1,
                            title: "Activity Name",
                            render: function (data, type, row) {
                                var projectId = row.PD_Id || row.CA_ProjectId;
                                var activityId = row.CA_Id;
                                var name = row.CA_ActivityName ? $('<div>').text(row.CA_ActivityName).html() : "Unnamed Activity";

                                // Final URL to redirect to
                                var url = '/Project/ActivityDescription?Id=' + projectId + '&CAId=' + activityId;

                                return '<a href="' + url + '" class="text-decoration-none text-primary">' + name + '</a>';
                            }
                        },
                        {
                            targets: 5,
                            title: "Actions",
                            render: function (data, type, row) {
                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/TaskListForSMME?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"  ><i class="ti ti-eye"></i></a></div>';
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

