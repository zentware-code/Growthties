var SMMELogoList = '';
$(document).ready(function () {
    BindGrid();
});

function BindGrid() {

    if ($('#hdnStakeHolderType').val() == 'SU') {
        TranType = 'SelectAssignProjectForSMMEFromEntrpStakeholderuser';
    }
    else {
        TranType = 'SelectAssignProjectForSMMEFromEntrpStakeholder';
    }
    var _data = JSON.stringify({
        global: {
            TransactionType: TranType,
            param1: 'ENR_Id',
            param2: 'SWS_StakeholderId',
            StoreProcedure: 'SMMERegistration_USP',

        }
    });
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data, status) {
            data = JSON.parse(data);
            
            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),
                r = "/Account/SMMESettings_contact?M=E&Id=";
            v = "/Account/SMMESettings_company?M=E&Id=";
            w = "/Account/SMMESettings_legalentity?M=E&Id=";
            x = "/Account/SMMESettings_financial?M=E&Id=";
            p = "/Stakeholder/SMMEProfile?Id=";
            //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "SMME_CompanyName" }, { data: "ETM_SMMEType" }, { data: "SMME_RegNumber" }, { data: "SMME_IncorporationDate" }, { data: "SMME_PrimaryContactNo" }, { data: "" }, { data: "action" }],
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
                        targets: 1,
                        responsivePriority: 4,
                        render: function (e, t, a, s) {
                            var n = a.SMME_CompanyName,
                                i = a.SMME_PrimaryContactEmail,
                                o = a.SMME_Logo;
                            b = a.SMME_Id;
                            return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar me-3">' +
                                (o
                                    ? '<img src="' + a.SMME_Logo + '" alt="Avatar" class="rounded-circle">'
                                    : '<span class="avatar-initial rounded-circle bg-label-' +
                                      ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                      '">' +
                                      (o = (((o = (n = a.SMME_CompanyName).match(/\b\w/g) || []).shift() || "") + (o.pop() || "")).toUpperCase()) +
                                      "</span>") +
                                '</div></div><div class="d-flex flex-column"><a href="' +
                                p + b +
                                '" class="text-body text-truncate"><span class="fw-medium">' +
                                n +
                                '</span></a><small class="'+a.RegLbl+'">' +
                                i +
                                "</small></div></div>"
                            );
                        },
                    },
                    {
                        targets: 6,
                        render: function (e, t, a, s) {

                            return '<span class="badge ' + a.SMME_class + '" text-capitalized>' + a.SMME_Active + "</span>";
                        },
                    },
                    {
                        targets: -1,
                        title: "Actions",
                        searchable: !1,
                        orderable: !1,
                        render: function (e, t, a, s) {
                            a = a.SMME_Id;
                            return (
                                    '<a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0" style=""><a class="dropdown-item text-black" data-bs-target="#asignShareholder" data-bs-toggle="modal" onclick="showEnterpriseList(' + a + ');">Assign</a></div>'
                                );
                        },
                    },
                        ],
                        order: [[1, "desc"]],
                        dom:
                            '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                        language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                        buttons: [
                            //{
                            //    extend: "collection",
                            //    className: "btn btn-label-primary dropdown-toggle mx-3 waves-effect waves-light",
                            //    text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                            //    buttons: [
                            //        {
                            //            extend: "print",
                            //            text: '<i class="ti ti-printer me-2" ></i>Print',
                            //            className: "dropdown-item",
                            //            exportOptions: {
                            //                columns: [1, 2, 3, 4, 5],
                            //                format: {
                            //                    body: function (e, t, a) {
                            //                        var s;
                            //                        return e.length <= 0
                            //                            ? e
                            //                            : ((e = $.parseHTML(e)),
                            //                              (s = ""),
                            //                              $.each(e, function (e, t) {
                            //                                  void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                            //                              }),
                            //                              s);
                            //                    },
                            //                },
                            //            },
                            //            customize: function (e) {
                            //                $(e.document.body).css("color", s).css("border-color", t).css("background-color", a),
                            //                    $(e.document.body).find("table").addClass("compact").css("color", "inherit").css("border-color", "inherit").css("background-color", "inherit");
                            //            },
                            //        },
                            //        {
                            //            extend: "csv",
                            //            text: '<i class="ti ti-file-text me-2" ></i>Csv',
                            //            className: "dropdown-item",
                            //            exportOptions: {
                            //                columns: [1, 2, 3, 4, 5],
                            //                format: {
                            //                    body: function (e, t, a) {
                            //                        var s;
                            //                        return e.length <= 0
                            //                            ? e
                            //                            : ((e = $.parseHTML(e)),
                            //                              (s = ""),
                            //                              $.each(e, function (e, t) {
                            //                                  void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                            //                              }),
                            //                              s);
                            //                    },
                            //                },
                            //            },
                            //        },
                            //        {
                            //            extend: "excel",
                            //            text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
                            //            className: "dropdown-item",
                            //            exportOptions: {
                            //                columns: [1, 2, 3, 4, 5],
                            //                format: {
                            //                    body: function (e, t, a) {
                            //                        var s;
                            //                        return e.length <= 0
                            //                            ? e
                            //                            : ((e = $.parseHTML(e)),
                            //                              (s = ""),
                            //                              $.each(e, function (e, t) {
                            //                                  void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                            //                              }),
                            //                              s);
                            //                    },
                            //                },
                            //            },
                            //        },
                            //        {
                            //            extend: "pdf",
                            //            text: '<i class="ti ti-file-code-2 me-2"></i>Pdf',
                            //            className: "dropdown-item",
                            //            exportOptions: {
                            //                columns: [1, 2, 3, 4, 5],
                            //                format: {
                            //                    body: function (e, t, a) {
                            //                        var s;
                            //                        return e.length <= 0
                            //                            ? e
                            //                            : ((e = $.parseHTML(e)),
                            //                              (s = ""),
                            //                              $.each(e, function (e, t) {
                            //                                  void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                            //                              }),
                            //                              s);
                            //                    },
                            //                },
                            //            },
                            //        },
                            //        {
                            //            extend: "copy",
                            //            text: '<i class="ti ti-copy me-2" ></i>Copy',
                            //            className: "dropdown-item",
                            //            exportOptions: {
                            //                columns: [1, 2, 3, 4, 5],
                            //                format: {
                            //                    body: function (e, t, a) {
                            //                        var s;
                            //                        return e.length <= 0
                            //                            ? e
                            //                            : ((e = $.parseHTML(e)),
                            //                              (s = ""),
                            //                              $.each(e, function (e, t) {
                            //                                  void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                            //                              }),
                            //                              s);
                            //                    },
                            //                },
                            //            },
                            //        },
                            //    ],
                            //},
                            //{
                            //    text: '<i class="ti ti-upload ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Upload </span>',
                            //    className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                            //    action: function () {
                            //        window.location.href = "/Enterprise/AddBulkSMMEForEnterprise";
                            //    },
                            //},
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
                        initComplete: function () {
                            this.api()
                                .columns(2)
                                .every(function () {
                                    var t = this,
                                        a = $('<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>')
                                            .appendTo(".user_role")
                                            .on("change", function () {
                                                var e = $.fn.dataTable.util.escapeRegex($(this).val());
                                                t.search(e ? "^" + e + "$" : "", !0, !1).draw();
                                            });
                                    t.data()
                                        .unique()
                                        .sort()
                                        .each(function (e, t) {
                                            a.append('<option value="' + e + '">' + e + "</option>");
                                        });
                                }),
                                this.api()
                                    .columns(3)
                                    .every(function () {
                                        var t = this,
                                            a = $('<select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option></select>')
                                                .appendTo(".user_plan")
                                                .on("change", function () {
                                                    var e = $.fn.dataTable.util.escapeRegex($(this).val());
                                                    t.search(e ? "^" + e + "$" : "", !0, !1).draw();
                                                });
                                        t.data()
                                            .unique()
                                            .sort()
                                            .each(function (e, t) {
                                                a.append('<option value="' + e + '">' + e + "</option>");
                                            });
                                    });
                            //this.api()
                            //    .columns(5)
                            //    .every(function () {
                            //        var t = this,
                            //            a = $('<select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option></select>')
                            //                .appendTo(".user_status")
                            //                .on("change", function () {
                            //                    var e = $.fn.dataTable.util.escapeRegex($(this).val());
                            //                    t.search(e ? "^" + e + "$" : "", !0, !1).draw();
                            //                });
                            //        t.data()
                            //            .unique()
                            //            .sort()
                            //            .each(function (e, t) {
                            //                a.append('<option value="' + o[e].title + '" class="text-capitalize">' + o[e].title + "</option>");
                            //            });
                            //    });
                        },
                    })),
                $(".datatables-users tbody").on("click", ".delete-record", function () {
                    e.row($(this).parents("tr")).remove().draw();
                }),
                setTimeout(() => {
                    $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
                }, 300);


        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    })
}

function AssignProject(index, SmmeId) {
    var TransactionType = "";
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
                    title: "Oops..",
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

//*************retrive currency*******
function formatNumber(value) {
    let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
    const [integerPart, decimalPart] = number.split('.');

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedInteger + '.' + (decimalPart || '00');
}

function showEnterpriseList(SmmeId) {

 
    SMME_Id=SmmeId;
    //alert(SmmeId);
    $("#ulEnterpriseList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseForAssignStakeholderWiseSMME',
          
            param1: 'SMME_Id',
            param1Value: parseInt(SmmeId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable=0;
            $.each(data, function (i, v) {
                
                var logo="";
                var index = i + 1;
                if(v.ENR_Logo=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.ENR_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.ENR_CompanyName +'</h6><span>'+ v.ENR_PrimaryContactEmail +'</span></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.ENR_Logo +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.ENR_CompanyName +'</h6><span>'+ v.ENR_PrimaryContactEmail +'</span></div></div>';

                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulEnterpriseList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input enr'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignStakeholder("+ index +"," + SmmeId + "," + v.ENR_Id + ")'></div>");
               
            });
            $(".enr").find("checkbox").each(function(){
                if ($(this).prop('checked')==true){ 
                    isenable=1
                }
            });
            if(isenable==0)
            {
                $('.enr').prop('disabled',false);
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
    return false;

}

function AssignStakeholder( index, SmmeId, ENR_Id) {

    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {
        TransactionType = 'InsertStakeHolderSMME';
    } else {
        TransactionType = 'UpdateStakeHolderSMME';
    }
    
    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            SWS_SMMEId: SmmeId,
            SWS_StakeholderId:ENR_Id
            //PD_Id: ProjId,
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignSMMEToStakeholder',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Good Job..",
                    title: "Your Changes Successfully done!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
            else {

                Swal.fire({
                    title: "Oops..",
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
