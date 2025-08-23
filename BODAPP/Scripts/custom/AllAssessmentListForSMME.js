
$(document).ready(function () {

    BindGrid();

      var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
   // //console.log(path);
    localStorage.setItem('href', path);

});
function BindGrid() {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: 'SmmeId',
            param1Value: $('#SmmeId').val(),
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
            LoaderStart("#datatable-example");
        },
        complete: function () {
            LoaderEnd("#datatable-example");
        },
        success: function (data, status) {
            data = JSON.parse(data);
            var oTable = $('#datatable-example').DataTable({
                data:data,
                columns:columnData,
                columnDefs: [
                     //{
                     //    targets: 2,
                     //    orderable: !1,
                     //    searchable: !1,
                     //    render: function (e, t, a, r) {
                     //        //var array = retriveSMME(a.BA_Id);

                     //        return '<div class="d-flex align-items-center avatar-group">  ' + a.SMME_Logo + '</div>';
                            
                     //    },
                     //},
                    {
                        targets: 3,
                        title: "Actions",
                        render: function (data, type, row) {
                            var status = row.StatusShow;
                            var aasId = row.BA_QuestionTypeId;

                            // Button markup
                            var button = '<a class="btn btn-primary waves-effect waves-light btnEdit" href="/Assessment/ShowAssessment?aasId=' + aasId + '">Start</a>';

                            // Disable button for Completed or Pending statuses
                            if (status == '<span class="badge rounded bg-label-success">Verified</span>' || status == '<span class="badge rounded bg-label-warning">Pending For Verification</span>') {
                                button = '<a class="btn btn-primary waves-effect waves-light btnEdit disabled" href="javascript:void(0)" tabindex="-1" aria-disabled="true">Start</a>';
                            }
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><span class="p-0">' + button + '</span></div>';
                        },

                        //render: function (data, type, row) {
                        //    var status = row.Status;
                           
                        //    var aasId = row.BA_QuestionTypeId;
                        //    //if (status == '<span class="badge rounded bg-label-success">completed</span>') {
                        //    //    return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Assessment/ViewAssessmentForSMME?BAId=' + row.BA_Id + '"><i class="ti ti-eye mx-2 ti-sm"></i></a></div>';
                        //    //} else {
                        //        return '<div class="d-flex align-items-sm-center justify-content-sm-center"><span class="p-0"><a class="btn btn-sm btn-info btnEdit" href="/Assessment/ShowAssessment?aasId=' + row.BA_QuestionTypeId + '">Start</a></span></div>';   /// <i class="ti ti-book ti-sm me-2 text-info"></i>
                        //    //}
                        //},
                    },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder:search },
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
    alert('request failed');
}
});
}

function retriveSMME(id) {
    var dataarray = [];
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAssessmnetWiseSMME',
            param1: 'AAS_BA_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'AssignAssessmentToSMME_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            dataarray = JSON.parse(data);
           
            //alert(dataarray);

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
    return dataarray;

}

