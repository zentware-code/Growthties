var EntId = "";
var ProjId="";
$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    localStorage.setItem('href', path);

    InitUI();
});

function InitUI() {

    BindGrid();
}

function BindGrid() {
    //var _data = JSON.stringify({
    //    global: {
    //        TransactionType: globalData.TransactionType,
    //        param1: 'EnterpriseId',
    //        param1Value: $('#EnterpriseId').val(),
    //        StoreProcedure: globalData.StoreProcedure
    //    }
    //});

    var TransactionType = '';
    if ($('#hdnStakeHolderType').val() == 'SU') {
        TranType = 'SelectAssignProjectForSMMEFromEntrpStakeholderUser';
    }
    else {
        TranType = 'SelectAssignProjectForSMMEFromEntrpStakeholder';
    }

    var _data = JSON.stringify({
        global: {
            TransactionType: TranType,
            param1: 'EnterpriseId',
            param1Value: parseInt($('#hdnEntrId').val()),
            param2: 'StakeholderId',
            param2Value: parseInt($('#hdnStakeHolderId').val()),
            StoreProcedure: 'ProjectDetails_USP'
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
                data: data,
                columns: columnData,
                columnDefs: [
                    {
                        targets: 0,
                        render: function (e, t, a, s) {
                            var p = a.PD_Id;
                            return (
                                                           '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="/Stakeholder/ProjectDetailsNew?Id='+ p +'"><span class=" fw-normal text-' +
                                      ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                      '">' +
                                                           a.PD_ProjectName +
                                                           '</span></a><small class="text-muted">' +
                                                           a.PD_DurationFromDate +' // '+ a.PD_DurationToDate+
                                                           "</small></div></div>"
                                                       );
                        },
                    },
                    {
                        targets: 1,
                        title: "ENR_CompanyName",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            return '<div class="d-flex align-items-sm-center"><a href="/Stakeholder/EnterpriseProfieView_Profiles?Id=' + row.PD_Enterpriseid + '">' + row.ENR_CompanyName + '</a></div>';

                        },
                    },
                    {
                        targets: 3,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><button class="btn btn-sm btn-icon btnEdit" data-bs-target="#shareProject" data-bs-toggle="modal" onclick="ShowAllSMME(' + row.PD_Enterpriseid + ','+row.PD_Id+')" data-bs-dismiss="modal"><i class="ti ti-users-plus"></i></button></div>';

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
            alert('request failed');
        }
    });
}

function ShowAllSMME(id, PdId) {

    EntId = id;
    ProjId=PdId;
    //alert(PdId);
    $("#ulSmmeList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseSMMEForStakeholder',
            param1: 'StakeholderId',
            param1Value: parseInt($('#hdnStakeHolderId').val()),
            param3: 'EnterpriseId',
            param3Value: parseInt(id),
            param2: 'PD_Id',
            param2Value: parseInt(PdId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });
    console.log(_data);
    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#shareProject");
        },
        complete: function () {
            LoaderEnd("#shareProject");
        },
        success: function (data) {
            data = JSON.parse(data);

            var count = data.length;
            $.each(data, function (i, v) {
                var logo="";
                var index = i + 1;
                if(v.SMME_Logo=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.SMME_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.SMME_CompanyName +'</h6><span>'+ v.SMME_PrimaryContactEmail +'</span></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.SMME_Logo +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.SMME_CompanyName +'</h6><span>'+ v.SMME_PrimaryContactEmail +'</span></div></div>';
                }
                $("#ulSmmeList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignProject(" + index + ", " + v.SMME_Id + ", \"" + v.SMME_CompanyName + "\", \"" + v.SMME_PrimaryContactEmail + "\")'></div>");

            });
            if (count == 0) {
                $("#ulSmmeList").append('<div class=card><div class=layout-demo-wrapper><div><h5>No Data Found</h5><br></div></div></div>');
            }
            retriveProject(PdId);
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function AssignProject(index, SmmeId, SMMEName, mail) {
    var TransactionType = "";
    LoaderStart("#shareProject");
    if ($('#chkId_' + index).is(':checked')) {

        TransactionType = 'Insert';
    } else {

        TransactionType = 'Update';
    }

    var _data = JSON.stringify({
        entity: {

            TransactionType: TransactionType,
            PSM_EnterpriseId: EntId,
            PSM_SmmeId: SmmeId,
            PSM_ProjectId: ProjId

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToSMME',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                if ($('#chkId_' + index).is(':checked')) {
                    SendMail(SMMEName, mail)
                } else {
                    LoaderEnd("#shareProject");
                    Swal.fire({
                        title: "Successful..!",
                        text: "Your changes were saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
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

function retriveProject(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PD_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetProjectForAdmin',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            $('#PDId').val(data["PD_Id"]);
            $('#PDName').val(data["PD_ProjectName"]);
            $('#PDStartDte').val(data["PD_DurationFromDate"]);
            $('#PDEndDte').val(data["PD_DurationToDate"]);
            $('#PDDesc').val(data["PD_Description"]);

        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


function SendMail(SMMEName, Email) {
    //$('#btnSave').prop('disabled', true);
    //$("#btnSave").html('Please Wait.....');

    var action = 'addnewprojectassigntosmme';

    var _data = JSON.stringify({
        emailcontent: {
            PD_Id: parseInt($('#PDId').val()),
            EventName: $.trim($('#PDName').val()),
            EventFromDate: $('#PDStartDte').val(),
            EventToDate: $('#PDEndDte').val(),
            Description: $('#PDDesc').val(),
            Email: Email,
            SMMEName: SMMEName,
            Role: 'smme'
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            LoaderEnd("#shareProject");
        },
        success: function (data) {
            if (data != null && data.IsSuccess === true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

                //$("#btnSave").html('Save');
                //$('#btnSave').removeAttr('disabled');
            } else {
                Swal.fire({
                    title: "Oops...",
                    text: "Email does not exist, try another email..!",
                    icon: "warning",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                //setTimeout(function () {
                //    window.location.reload();  
                //}, 2000);
            }
        },

        error: function () {
            Swal.fire({
                title: "Oops...",
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}