
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    
    BindGrid();
    
});


function BindGrid() {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            //param1: 'BA_EnterpriseId',
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
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data, status) {
            data = JSON.parse(data);
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                     {
                         targets: 3,
                         responsivePriority: 3,
                         render: function (data, type, row) {
                             return '<div class="d-flex align-items-center avatar-group">  ' + row.SMME_Logo + '</div>';
                         },
                     },
                    {
                        targets: 4,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            ////return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Assessment/QuestionBuilding?Mode=E&Id=' + row.BA_QuestionTypeId + '&BAId=' + row.BA_Id + '"  ><i class="ti ti-edit"></i></a><a class="btn btn-sm btn-icon btnEdit" href="/Assessment/ViewAssessment?Mode=E&Id=' + row.BA_QuestionTypeId + '&BAId=' + row.BA_Id + '"  ><i class="ti ti-eye mx-2 ti-sm"></i></a></div>';
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Assessment/KPIAllocation?Mode=E&KCId=' + row.KPA_KC_Id + '&KCGId=' + row.KPA_KCG_Id + '" ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon btnEdit" data-bs-target="#shareProject" data-bs-toggle="modal" onclick="ShowAllSMME(' + row.KPA_KCG_Id + ',' + row.KPA_KC_Id + ')" data-bs-dismiss="modal"><i class="ti ti-users-plus"></i></button></div>';

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



function ShowAllSMME(grpId, ctId) {

    grpId = grpId;
    ctId = ctId;
    $("#ulSmmeList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEForAssignToKPI',
            param1: 'SWK_KCG_Id',
            param2: 'SWK_KC_Id',
            param1Value: parseInt(grpId),
            param2Value: parseInt(ctId),
            StoreProcedure: 'AssessmentKPI_USP'
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

            ///  //console.log('this is Data', data);

            var count = data.length;
            $.each(data, function (i, v) {
                var logo = "";
                var index = i + 1;
                if (v.SMME_Logo == "") {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.SMME_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }
                else {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.SMME_Logo + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }
                $("#ulSmmeList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.SMME_Id + "," + grpId + "," + ctId + ")'></div>");
            });

        },
        error: function (data) {
                LoaderEnd(".loader-sectionenr");
            
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

function AssignProject(index, SmmeId, grpId, ctId) {
    var TransactionType = "";
    //LoaderStart("#shareProject");
    if ($('#chkId_' + index).is(':checked')) {
        TransactionType = 'InsertKPItoSMME';
    } else {
        TransactionType = 'UpdateKPItoSMME';
    }

    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            SWK_SMME_Id: parseInt(SmmeId),
            SWK_KCG_Id: parseInt(grpId),
            SWK_KC_Id: parseInt(ctId)
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignKPIToSMME',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                if ($('#chkId_' + index).is(':checked')) {
                    Swal.fire({
                        title: "Successful..!",
                        text: "Your changes were saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } else {
                    //LoaderEnd("#shareProject");
                    Swal.fire({
                        title: "Successful..!",
                        text: "Your changes were saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
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