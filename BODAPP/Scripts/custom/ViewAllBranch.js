let JobId = 0;
var MulpleJob = [];
var MainJob = [];
var liList = '';
var List = '';
$(document).ready(function () {
    //  $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 9e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    InitUI();
   
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
   // //console.log(path);
    localStorage.setItem('href', path);
});

function InitUI() {

    BindGrid();
    $('[data-toggle="tooltip"]').tooltip();   
}


function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectListForEnterprise',
            param1: 'BD_EnterpriseId',
            param1Value: $('#EntrId').val(),
            StoreProcedure: 'BranchDetails_USP'
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

            //console.log('Branch List',data);

            var count = data.length;
            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),
               
            v = "/Enterprise/AddBranch?Id=";
            //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "BD_Name" }, { data: "BD_Email" }, { data: "BD_ContactNumber" }, { data: "BD_City" }, { data: "SMME_Logo" }, { data: "action" }],
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
                           render: function (data, type, row) {
                               return '<a class="" onclick=getValue(63); href="/Enterprise/BranchWiseArea?BId=' + row.BD_Id + '&EnrId=' + row.BD_EnterpriseId + '">' +
                                          '<span class="text-primary">' + row.BD_Name + '</span>' +
                                      '</a>';
                           }
                       },
                        {
                            targets: -1,
                            title: "Actions",
                            searchable: !1,
                            orderable: !1,
                            render: function (data, type, row) {
                                //<a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" >Create Task</a><a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>
                                return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="' + v + row.BD_Id + '"  ><i class="ti ti-edit"></i></a><a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top" title="AssignSMME" data-bs-target="#shareProject" data-bs-toggle="modal" onclick="ShowAllSMME(' + row.BD_Id + ')" data-bs-dismiss="modal">Asign SMME</a><a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top" title="AssignUsers"   onclick="ShowAllUser(' + row.BD_Id + ')" data-bs-dismiss="modal">Assign User</a><a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top" title="AssignProject"   onclick="ShowAllProjects(' + row.BD_Id + ')" data-bs-dismiss="modal">Assign Project</a></div></div>';
                       
                            },

                        },
                       {
                           targets: 5,
                           orderable: !1,
                           searchable: !1,
                           responsivePriority: 3,
                           render: function (e, t, a, r) {
                               return '<div class="d-flex align-items-center avatar-group"><ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1  open-smm-modal" data-id="' + a.BD_Id + '">' + a.SMME_Logo + '</div>';
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
                                    window.location.href = "/Enterprise/AddBranch";
                                },
                            },

                        ],
                        
                        //buttons: [
                        //    {
                        //        extend: "collection",
                        //        className: "btn btn-label-primary dropdown-toggle mx-3 waves-effect waves-light",
                        //        text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                        //        buttons: [

                        //            {
                        //                extend: "print",
                        //                text: '<i class="ti ti-printer me-2" ></i>Print',
                        //                className: "dropdown-item",
                        //                exportOptions: {
                        //                    columns: [1, 2, 3, 4, 5],
                        //                    format: {
                        //                        body: function (e, t, a) {
                        //                            var s;
                        //                            return e.length <= 0
                        //                                ? e
                        //                                : ((e = $.parseHTML(e)),
                        //                                  (s = ""),
                        //                                  $.each(e, function (e, t) {
                        //                                      void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                        //                                  }),
                        //                                  s);
                        //                        },
                        //                    },
                        //                },
                        //                customize: function (e) {
                        //                    $(e.document.body).css("color", s).css("border-color", t).css("background-color", a),
                        //                        $(e.document.body).find("table").addClass("compact").css("color", "inherit").css("border-color", "inherit").css("background-color", "inherit");
                        //                },
                        //            },
                        //            {
                        //                extend: "csv",
                        //                text: '<i class="ti ti-file-text me-2" ></i>Csv',
                        //                className: "dropdown-item",
                        //                exportOptions: {
                        //                    columns: [1, 2, 3, 4, 5],
                        //                    format: {
                        //                        body: function (e, t, a) {
                        //                            var s;
                        //                            return e.length <= 0
                        //                                ? e
                        //                                : ((e = $.parseHTML(e)),
                        //                                  (s = ""),
                        //                                  $.each(e, function (e, t) {
                        //                                      void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                        //                                  }),
                        //                                  s);
                        //                        },
                        //                    },
                        //                },
                        //            },
                        //            {
                        //                extend: "excel",
                        //                text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
                        //                className: "dropdown-item",
                        //                exportOptions: {
                        //                    columns: [1, 2, 3, 4, 5],
                        //                    format: {
                        //                        body: function (e, t, a) {
                        //                            var s;
                        //                            return e.length <= 0
                        //                                ? e
                        //                                : ((e = $.parseHTML(e)),
                        //                                  (s = ""),
                        //                                  $.each(e, function (e, t) {
                        //                                      void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                        //                                  }),
                        //                                  s);
                        //                        },
                        //                    },
                        //                },
                        //            },
                        //            {
                        //                extend: "pdf",
                        //                text: '<i class="ti ti-file-code-2 me-2"></i>Pdf',
                        //                className: "dropdown-item",
                        //                exportOptions: {
                        //                    columns: [1, 2, 3, 4, 5],
                        //                    format: {
                        //                        body: function (e, t, a) {
                        //                            var s;
                        //                            return e.length <= 0
                        //                                ? e
                        //                                : ((e = $.parseHTML(e)),
                        //                                  (s = ""),
                        //                                  $.each(e, function (e, t) {
                        //                                      void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                        //                                  }),
                        //                                  s);
                        //                        },
                        //                    },
                        //                },
                        //            },
                        //            {
                        //                extend: "copy",
                        //                text: '<i class="ti ti-copy me-2" ></i>Copy',
                        //                className: "dropdown-item",
                        //                exportOptions: {
                        //                    columns: [1, 2, 3, 4, 5],
                        //                    format: {
                        //                        body: function (e, t, a) {
                        //                            var s;
                        //                            return e.length <= 0
                        //                                ? e
                        //                                : ((e = $.parseHTML(e)),
                        //                                  (s = ""),
                        //                                  $.each(e, function (e, t) {
                        //                                      void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                        //                                  }),
                        //                                  s);
                        //                        },
                        //                    },
                        //                },
                        //            },
                        //        ],
                        //    },
                           
                        //],
                        responsive: {
                            details: {
                                display: $.fn.dataTable.Responsive.display.modal({
                                    header: function (e) {
                                        return "Details of " + e.data().BD_Name;
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
LoaderEnd(".loader-sectionenr");
    Swal.fire({
        title: 'Oops...',
        text: 'request failed',
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });
}
})
}

function ShowAllProjects(BD_Id) {

 
    $("#ulProjectList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseProjectForBranch',
            param1: 'BD_Id',
            param1Value: BD_Id,
            param2: 'BD_EnterpriseId',
            param2Value: $('#EntrId').val(),
            StoreProcedure: 'BranchDetails_USP'
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
            $('#setProject').addClass('show');
            $('.btn-close').click(function () {

                $('#setProject').removeClass('show');
                //$('.form-control').val('');
            });
            var count = data.length;
            $.each(data, function (i, v) {

                var index = i + 1;
                $("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Date: " + v.PD_DurationDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkProjId_" + index + "' onclick='AssignProjectToBranch(" + index + "," + v.PD_Id + "," + BD_Id + ")'></div></div></div>");

            });

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
    return false;

}

function ShowAllUser(BD_Id) {

 
    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseUserForBranch',
            param1: 'BD_Id',
            param1Value: BD_Id,
            param2: 'BD_EnterpriseId',
            param2Value: $('#EntrId').val(),
            StoreProcedure: 'BranchDetails_USP'
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
            $('#setUPFormPopUp').addClass('show');
            $('.btn-close').click(function () {

                $('#setUPFormPopUp').removeClass('show');
                //$('.form-control').val('');
            });
            var count = data.length;
            $.each(data, function (i, v) {

                var index = i + 1;
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.UM_Name + "</h6><p class='mb-0 text-muted'>Email: " + v.UM_EmailId + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignUsers(" + index + "," + v.UM_Id + "," + BD_Id + ")'></div></div></div>");

            });

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
    return false;

}

function ShowAllSMME(id) {
    $("#ulSMMEList").html("");
    var enrId = $('#EntrId').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseSMMEForBranch',
            param1: 'BD_EnterpriseId',
            param1Value: $('#EntrId').val(),
            param2: "BD_Id",
            param2Value: id,
            StoreProcedure: 'BranchDetails_USP'
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
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                $("#ulSMMEList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.SMME_CompanyName + "</h6><p class='mb-0 text-muted'>" + v.SMME_PrimaryContactEmail + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input chkinput chkinputsmme' type='checkbox' " + v.Ischecked + " id='chkIdSMME_" + index + "' onclick='AssignSMMEToBranch(" + index + "," + v.SMME_Id + "," + id + "," + enrId + ")'></div></div></div>");
                //if ($('#chkIdSMME_' + index).is(':checked')) {

                //    $('#chkIdSMME_' + index).removeAttr("disabled");
                //} else {

                //    $('#chkIdSMME_' + index).attr("disabled", true);
                //}
            });
            //if ($('.chkinputsmme:checked').length == 0) {
            //    $('.chkinputsmme').removeAttr("disabled");
            //}

        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function AssignSMMEToBranch(index, smmeId, BD_Id, enrId) {
    var Transaction = "";

    if ($('#chkIdSMME_' + index).is(':checked'))
    {
        Transaction = "AssignSMMEToBranch";
    } else {
        Transaction = "UnAssignSMMEToBranch";
    }

    var _data = JSON.stringify({
        entity: {
            BD_SmmeId:smmeId,
            BD_Id: BD_Id,
            BD_EnterpriseId: parseInt(enrId),
            TransactionType: Transaction
        }
    }); $.ajax({
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



function AssignUsers(index, UserId,BD_Id) {
    var Transaction = "";

    if ($('#chkId_' + index).is(':checked')) {

      
        Transaction = "AssignEnterUserToBranch";
    } else {

        
        Transaction = "UnAssignEnterUserToBranch";
    }

    var _data = JSON.stringify({
        entity: {

            UserId:UserId,
            BD_Id:BD_Id,
            TransactionType: Transaction

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignUserToBranch',
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

function AssignProjectToBranch(index, PDId ,BD_Id) {
    var Transaction = "";

    if ($('#chkProjId_' + index).is(':checked')) {

      
        Transaction = "AssignProjectToBranch";
    } else {

        
        Transaction = "UnAssignProjectToBranch";
    }

    var _data = JSON.stringify({
        entity: {

            BWP_ProjectId :PDId,
            BD_Id:BD_Id,
            TransactionType: Transaction

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToBranch',
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
