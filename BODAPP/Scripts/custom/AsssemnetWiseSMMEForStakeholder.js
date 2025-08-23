$(document).ready(function () {
    //var path = window.location.pathname;
    //path = path.replace(/\/$/, "");
    //path = decodeURIComponent(path);
    //// //console.log(path);
    //localStorage.setItem('href', path);

    var AId = getParameterByName('AId');
    var BAId = getParameterByName('BAId');
    BindGrid(AId,BAId);
});



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function BindGrid(AId,BAId) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAsssemnetWiseSMME',
            param1: 'AAS_Assessment_Id',
            param2: 'AAS_BA_Id',
            param1Value: parseInt(AId),
            param2Value: parseInt(BAId),
            StoreProcedure: 'AssignAssessmentToSMME_USP',

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
            p = "/Stakeholder/SMMEProfile?Id=";
            //o = { 1: { SMME_Active: "Pending", class: "bg-label-warning" }, 2: { SMME_Active: "Active", class: "bg-label-success" }, 3: { SMME_Active: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "SMME_CompanyName" }, { data: "ASS_CreatedDate" }, { data: "SMME_RegNumber" }, { data: "SMME_PrimaryContactNo" }, { data: "VIEW RESPONSES" }],
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
                                '" class="text-body text-truncate"><span class="fw-medium ">' +
                                n +
                                '</span></a><small class="' + a.RegLbl + '">' +
                                i +
                                "</small></div></div>"
                            );
                        },
                    },
                      
                    {
                        targets: -1,
                        title: "VIEW RESPONSES",
                        searchable: !1,
                        orderable: !1,
                        render: function (data,type,row) {
                            return '<div class="d-flex align-items-sm-center"><a class="btn btn-sm btn-icon btnEdit '+row.ViewAns+'" href="/Stakeholder/ViewSMMEWiseAssessment?BAId='+ row.AAS_BA_Id+'&Id='+ row.SMME_Id+'"  ><i class="ti ti-eye mx-2 ti-sm"></i></a></div>';
                            
                        },
                       
                    },
                        ],
                        order: [[1, "desc"]],
                        dom:
                            '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                        language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                        buttons: [
                            
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