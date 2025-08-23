let JobId = 0;
var MulpleJob = [];
var MainJob = [];
var liList = '';
var List = '';
$(document).ready(function () {
  
    InitUI();
 
});

function InitUI() {

    BindGrid();
    $('[data-toggle="tooltip"]').tooltip();   
}

function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectList',
            param1: 'CM_SMMEId',
            param1Value: $('#SMMEId').val(),
            StoreProcedure: 'CostManagement_USP'
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
            var count = data.length;
            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),
               
            v = "/SMME/CostManagement?Id=";
          
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "CM_Type" }, { data: "CM_Name" }, { data: "CM_Charge" }, { data: "action" }],
                        columnDefs: [
                    {
                        className: "control",
                        searchable: !1,
                        orderable: !1,
                        responsivePriority: 2,
                        targets: 0,
                        render: function (e, t, a, s) {
                            return "";
                        },
                    },
                    {
                        targets: -1,
                        title: "Actions",
                        searchable: !1,
                        orderable: !1,
                        render: function (data, type, row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="' + v + row.CM_Id + '"  ><i class="ti ti-edit"></i></a></div>';
                        
                        },
                    },
                        ],
                        order: [[1, "desc"]],
                        dom:
                            '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                        language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                        buttons: [
                            {
                                text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add </span>',
                                className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                                action: function () {
                                    window.location.href = "/SMME/CostManagement";
                                },
                            },

                        ],
                     
                        responsive: {
                            details: {
                                display: $.fn.dataTable.Responsive.display.modal({
                                    header: function (e) {
                                        return "Details of " + e.data().full_name;
                                    },
                                }),
                                type: "column",
                                renderer: function (e, t, a) {
                                    a = $.map(a, function (e, t) {
                                        return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>" : "";
                                    }).join("");
                                    return !!a && $('<table class="table"/><tbody />').append(a);
                                },
                            },
                        },
       
                    })),
                $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),
                setTimeout(() => {
                    $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);


},
error: function (xhr, textStatus, errorThrown) {
    Swal.fire({
        title: 'request failed',
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });
}
})
}

