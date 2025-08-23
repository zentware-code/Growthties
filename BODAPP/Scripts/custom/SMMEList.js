var FilterVal = '';
$(document).ready(function () {
    FilterVal = getParameterByName('Filter');
    InitUI();
   
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);

});

function InitUI() {
    retriveCount();
    BindGrid();
}

function retriveCount() {
    var _data = JSON.stringify({
        global: {
            TransactionType: "CountSMME",
            Param: "SMME_Id",
            StoreProcedure: "SMMERegistration_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            $('#spnTotSmme').text(data["Total"]);
            $('#spnActiveSmme').text(data["Active"]);
            $('#spnDeactiveSmme').text(data["Deactive"]);
            $('#spnPendSmme').text(data["Pending"]);
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAll',
            param1: 'SMME_Id',
            param2: 'SMME_Filter',
            paramString2: FilterVal,
            StoreProcedure: 'SMMERegistration_USP',
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
            
            //console.log("Admin SMMEList - ",data);

            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),
                r = "/Account/SMMESettings_contact?M=E&Id=";
            v = "/Account/SMMESettings_company?M=E&Id=";
            w = "/Account/SMMESettings_legalentity?M=E&Id=";
            x = "/Account/SMMESettings_financial?M=E&Id=";
            z = "/Customer/SMMEWiseCustomer?M=E&Id=";
            p = "/SMME/SMMEProfile?Id=";
            q = "/SMME/SMMEProfile_Dashboard?Id=";
            //o = { 1: { SMME_Active: "Pending", class: "bg-label-warning" }, 2: { SMME_Active: "Active", class: "bg-label-success" }, 3: { SMME_Active: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "SMME_CompanyName" }, { data: "ETM_SMMEType" }, { data: "SMME_PrimaryContactNo" }, { data: "SMME_RegNumber" }, { data: "SMME_IncorporationDate" }, { data: "" }, { data: "action" }],
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
                                      //(o = (((o = (n = a.SMME_CompanyName).match(/\b\w/g) || []).shift() || "") + (o.pop() || "")).toUpperCase()) +
                                      (o = ((a.SMME_CompanyName || "").match(/\b\w/g) || []).reduce(function(r, v, i, arr) {
                                        return (arr[0] || "") + (arr[arr.length - 1] || "");
                                        }, "").toUpperCase())+
                                      "</span>") +
                                '</div></div><div class="d-flex flex-column"><a href="' +
                                q + b +
                                '" class="text-body text-truncate"><span class="fw-medium" style="display: inline-block; width: 180px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' +
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
                                '<div class="d-flex align-items-center">'
                                + '<a href="' + v + a + '" class="text-body"><i class="ti ti-edit ti-sm me-2"></i></a><a href="' + z + a + '" class="text-body"  target="_blank"><i class="ti ti-user-plus ti-sm me-2"></i></a></div>'
                            );
                        },
                    },
                        ],
                        order: [[1, "desc"]],
                        dom:
                            '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                        language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                        buttons: [
                             
                            {
                                extend: "collection",
                                className: "btn btn-label-primary dropdown-toggle mx-3 waves-effect waves-light",
                                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                                buttons: [
                                    {
                                        extend: "print",
                                        text: '<i class="ti ti-printer me-2" ></i>Print',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [1, 2, 3, 4, 5],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                        customize: function (e) {
                                            $(e.document.body).css("color", s).css("border-color", t).css("background-color", a),
                                                $(e.document.body).find("table").addClass("compact").css("color", "inherit").css("border-color", "inherit").css("background-color", "inherit");
                                        },
                                    },
                                    {
                                        extend: "csv",
                                        text: '<i class="ti ti-file-text me-2" ></i>Csv',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [1, 2, 3, 4, 5],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                    {
                                        extend: "excel",
                                        text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [1, 2, 3, 4, 5],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                    {
                                        extend: "pdf",
                                        text: '<i class="ti ti-file-code-2 me-2"></i>Pdf',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [1, 2, 3, 4, 5],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                    {
                                        extend: "copy",
                                        text: '<i class="ti ti-copy me-2" ></i>Copy',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [1, 2, 3, 4, 5],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            {
                                 text: '<i class="ti ti-upload ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Upload </span>',
                                 className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                                 action: function () {
                                     window.location.href = "/SMME/AddBulkSMMEForAdmin";
                                 },
                             },
                            
                        ],
                        responsive: {
                            details: {
                                display: $.fn.dataTable.Responsive.display.modal({
                                    //header: function (e) {
                                    //    return "Details of " + e.data().full_name;
                                    //},
                                    header: function (e) {
                                        var name = e.data().full_name ? e.data().full_name : e.data().SMME_CompanyName;
                                        return "Details of " + (name || "Name not found");
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


function ProjectListForAssign(smmeId) {

    $("#ulProjectList").html("");

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllProjectForAssignToSMME',
            param1: 'SMME_Id',
            param1Value: parseInt(smmeId),
            StoreProcedure: 'ProjectDetails_USP'
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

            // //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable = 0;
            $.each(data, function (i, v) {
                 var index = i + 1;

                $("#ulProjectList").append(
                     "<li class='d-flex flex-wrap mb-3'>" +
                         "<div class='d-flex justify-content-between w-100'>" +
                             // Avatar section
                             "<div class='d-flex align-items-center'>" +
                                 "<div class='avatar me-2'>" +
                                     "<img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'>" +
                                 "</div>" +
                                 "<div class='ms-1 me-3'>" +
                                     "<h6 class='mb-0'>" + v.PD_ProjectName + "</h6>" +
                                     "<span class='d-block text-muted'>" + v.ENR_CompanyName + "</span>" +  // Added d-block to ensure span breaks to next line
                                 "</div>" +
                             "</div>" +
                             // Checkbox section
                             "<div class='form-check form-switch align-self-center'>" +  // Align checkbox vertically in the center
                                 "<input class='float-end form-check-input enr' type='checkbox' " + (v.IsAssigned ? 'checked="checked"' : '') + " id='chkId_" + index + "' onclick='AssignProject(" + index + ", " + smmeId + ", " + v.PD_Id + "," + v.ENR_Id + ")'>" +
                             "</div>" +
                         "</div>" +
                     "</li>"
                 );
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


function AssignProject(index, smmeId, pdId, enrId ) {
    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {
        TransactionType = 'Insert';
    } else {
        TransactionType = 'Update';
    }

    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            PSM_SmmeId: parseInt(smmeId),
            PSM_ProjectId: parseInt(pdId),
            PSM_EnterpriseId: parseInt(enrId)
        }
    });


    $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToSMME',
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
                    });
                } else {
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


function BranchListForAssign(smmeId) {

    $("#ulBranchList").html("");

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllBranchForAssignToSMME',
            param1: 'SMME_Id',
            param1Value: parseInt(smmeId),
            StoreProcedure: 'ProjectDetails_USP'
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

            // //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable = 0;
            $.each(data, function (i, v) {
                var index = i + 1;

                $("#ulBranchList").append(
                     "<li class='d-flex flex-wrap mb-3'>" +
                         "<div class='d-flex justify-content-between w-100'>" +
                             // Avatar section
                             "<div class='d-flex align-items-center'>" +
                                 "<div class='avatar me-2'>" +
                                     "<img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'>" +
                                 "</div>" +
                                 "<div class='ms-1 me-3'>" +
                                     "<h6 class='mb-0'>" + v.BD_Name + "</h6>" +
                                     "<span class='d-block text-muted'>" + v.BD_Email + "</span>" +  // Added d-block to ensure span breaks to next line
                                 "</div>" +
                             "</div>" +
                             // Checkbox section
                             "<div class='form-check form-switch align-self-center'>" +  // Align checkbox vertically in the center
                                 "<input class='float-end form-check-input' type='checkbox' " + (v.IsAssigned ? 'checked="checked"' : '') + " id='chkId_" + index + "' onclick='AssignBranch(" + index + ", " + smmeId + ", " + v.BD_Id + ")' " + v.BranchStatus + ">" +
                             "</div>" +
                         "</div>" +
                     "</li>"
                 );
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


function AssignBranch(index, smmeId, BD_Id) {
    var Transaction = "";

    if ($('#chkId_' + index).is(':checked')) {

        Transaction = "AssignSMMEToBranch";
    } else {
        Transaction = "UnAssignSMMEToBranch";
    }

    var _data = JSON.stringify({
        entity: {
                    BD_SmmeId: smmeId,
                    BD_Id: BD_Id,
                    TransactionType: Transaction
                }
            });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignSMMEToBranch',
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
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}



