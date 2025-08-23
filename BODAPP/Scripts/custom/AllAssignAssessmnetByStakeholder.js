var SMMLogoList = '';


function fnSmmeForAssemnet(BA_id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAssignAssessmnetWiseSMMELogo',
            param1: 'AAS_BA_Id',
            param1Value: parseInt(BA_id),
            StoreProcedure: 'AssignAssessmentToSMME_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" ><span class="badge bg-label-danger">No SMME Found</span></div>';
            }
            
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);

    BindGrid();
});


function BindGrid() {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: 'EnterpriseId',
            //param1Value: $('#EnterpriseId').val(),
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
                      {
                         targets: 2,
                         orderable: !1,
                         searchable: !1,
                         responsivePriority: 3,
                         render: function (e, t, a, r) {
                             //var array = retriveSMME(a.BA_Id);
                             return '<div class="d-flex align-items-center avatar-group"><ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1  open-smm-modal" data-id="' + a.BA_Id + '">' + a.SMME_Logo + '</ul></div>';
                         },
                     },
                    {
                        targets: 3,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data,type,row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Stakeholder/AssessmnetWiseSMMEByAdmin?AId='+ row.BA_QuestionTypeId +'&BAId='+ row.BA_Id+'"  ><i class="ti ti-eye mx-2 ti-sm"></i></a></div>';
                        },
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


