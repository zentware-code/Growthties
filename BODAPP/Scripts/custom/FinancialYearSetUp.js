var formElem = document.getElementById("setUPForm");
var form = $('#setUPForm');

$(document).ready(function () {
    InitUI();

});

function InitUI() {
    BindGrid();
}

(function () {
    // var e = document.getElementById("setUPForm");
    FormValidation.formValidation(formElem, {
        fields: {
            Name: {
                validators: {
                    notEmpty: {
                        message: "Please enter Fy Name"
                    }
                }
            }, FromDate: {
                validators: {
                    notEmpty: {
                        message: "Please enter FromDate"
                    }
                }
            },
            ToDate: {
                validators: {
                    notEmpty: {
                        message: "Please enter FromDate"
                    }
                }
            }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function (formElem, t) {
                    return ".mb-3";
                },
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', function () {

        SaveRecord();
    });
})();


function SaveRecord() {

    var _data = form.serialize();
    $.ajax({
        type: "POST",
        url: "/ScriptJson/FinancialYearSetUp",
        data: _data,
        async: false,
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                //location.reload();
                var oTable = $('#datatable-example').DataTable();
                oTable.destroy();
                BindGrid();

                if ($('#Id').val() == '') {
                    $("#setUPFormPopUp .close").click();
                } else {
                    $('#setUPFormPopUp').removeClass('show');
                }
                $('.form-control').val('');

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


function retrive(id) {


    $('#setUPFormPopUp').addClass('show');
    $('.btn-close').click(function () {

        $('#setUPFormPopUp').removeClass('show');
        $('.form-control').val('');
    });

    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            Param: globalData.Param,
            paramValue: parseInt(id),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            $('#Id').val(data["FM_Id"]);
            $('#Name').val(data["FM_Name"]);
            $('#FromDate').val(data["FM_FromDate"]);
            $('#ToDate').val(data["FM_ToDate"]);

        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}



//****************Start Date < End Date Always*************

$('#FromDate').on('change', function () {
    validateDates();
});

$('#ToDate').on('change', function () {
    validateDates();
});

function validateDates() {
    var valueFrom = $('#FromDate').val();
    var valueTo = $('#ToDate').val();
    $('#error-message').text('');
    $('.dtcls').css('border', '');
    // Check if both fields have values
    if (valueFrom && valueTo) {

        var dateFromParts = valueFrom.split('-');
        var dateToParts = valueTo.split('-');

        var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);
        var dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        if (dateFrom >= dateTo) {
            $('#error-message').text("from-date must be earlier from to-date..!");
            $('.dtcls').css('border', '1px solid red');
            $('#ToDate').val('');
        }

    }
}


function BindGrid() {
    //var _data = JSON.stringify({
    //    global: {
    //        TransactionType: 'SelectFyListForEnterprise',
    //        param1: 'ENR_Id',
    //        param1Value: parseInt($('#EnrId').val()),
    //        StoreProcedure: 'EnterpriseRegistration_USP',

    //    }
    //});

    var _data = JSON.stringify({
        global: {
            TransactionType: globalDataSelect.TransactionType,
            Param: globalDataSelect.Param,
            paramValue: globalDataSelect.paramValue,
            StoreProcedure: globalDataSelect.StoreProcedure
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
            //data = JSON.parse(data);
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [

                    {
                        targets: 2,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        responsivePriority: 2,
                        render: function (data, type, row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><button class="btn btn-sm btn-icon btnEdit" onclick="retrive(' + row.Id + ')" ><i class="ti ti-edit"></i></button></div>';
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
                        text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add </span>',
                        className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                        attr: { "data-bs-toggle": "offcanvas", "data-bs-target": popup, },
                    },

                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                //return "Details of " + e.data().SectorName;
                                return "Details";
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
