var formElem = document.getElementById("formAdminCustomer");

$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    //console.log(path);
    localStorage.setItem('href', path);


    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCountry");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlSector");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CustomerTypeSetUp_CT",
        Text: 'CT_CustomerType',
        Value: 'CT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlType");
    DropdownBinder.Execute();

    InitUI();
});


$("#ddlCountry").change(function () {
    $(".ddlProvince").find("option").remove();
    var g = $(".ddlProvince");

    g.length &&
      g.each(function () {
          var g = $(this);
          g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
      });
    DropdownBinder.DDLData = {
        tableName: "ProvinceSetUp_PM",
        Text: 'PM_Province',
        Value: 'PM_Id',
        PId: $(this).val(),
        ColumnName: 'PM_CountryId'
    };
    DropdownBinder.DDLElem = $("#ddlProvince");
    DropdownBinder.Execute();
});


$('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');


$(function () {
    var c = $(".ddlCountry");
    var h = $(".ddlProvince");
    var e = $(".ddlSector");
    var f = $(".ddlType");
   
    
    h.length &&
        h.each(function () {
            var h = $(this);
            h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A Province", dropdownParent: h.parent() });
        });
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Sector", dropdownParent: e.parent() });
        });

    c.length &&
        c.each(function () {
            var c = $(this);
            c.wrap('<div class="position-relative"></div>'), c.select2({ placeholder: "Select A Country", dropdownParent: c.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
       });

    FormValidation.formValidation(formElem, {
        fields: {
            txtFirstName: {
                validators: {
                    notEmpty: {
                        message: "Please enter firstname"
                    }
                }
            },
            txtLastName: {
                validators: {
                    notEmpty: {
                        message: "Please enter lastname"
                    }
                }
            },

            txtContact: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact number"
                    }
                }
            },
            ddlCountry: {
                validators: {
                    notEmpty: {
                        message: "Please Select Country"
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter email address"
                    },
                    emailAddress: {
                        message: "The value is not a valid email address"
                    }
                }
            },
            ddlType: {
                validators: {
                    notEmpty: {
                        message: "Please select type"
                    }
                }
            },
            txtCity: {
                validators: {
                    notEmpty: {
                        message: "Please select city"
                    }
                }
            },

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
        SaveRecords();
    });
});

function InitUI() {
    BindGrid();
}

function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectListForAdmin',
            param1: 'CD_Id',
            StoreProcedure: 'CustomerDetails_USP',
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
            
            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),
               
            v = "/Customer/AddCustomerDetails?Id=";
                //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
           
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "CD_Name" }, { data: "CD_ContactNumber" }, { data: "CT_CustomerType" }, { data: "CD_RegistrationNo" }, { data: "action" }],
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

                           var n = a.CD_Name,
                                  i = a.CD_Email,
                                  o = a.CD_ProfilePic;
                           b = a.CD_Id;
                           return (
                                '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar me-3">' +
                                (o
                                    ? '<img src="' + a.CD_ProfilePic + '" alt="Avatar" class="rounded-circle">'
                                    : '<span class="avatar-initial rounded-circle bg-label-' +
                                      ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                      '">' +
                                      (o = (((o = (n = a.CD_Name).match(/\b\w/g) || []).shift() || "") + (o.pop() || "")).toUpperCase()) +
                                      "</span>") +
                                '</div></div><div class="d-flex flex-column"><a href="/Customer/CustomerDetails?Id=' + a.CD_Id + '" /> <span class="fw-medium">' +
                                 n +
                                '</span></a><small class="text-muted">' +
                                i +
                                "</small></div></div>"
                           );
                       },
                   },
                    {
                        targets: -1,
                        title: "Actions",
                        searchable: !1,
                        orderable: !1,
                        render: function (e, t, a, s) {
                            a = a.CD_Id;
                            return (
                               '<div class="d-flex align-items-center">' + '<i class="ti ti-edit ti-sm me-2" style="cursor: pointer;" onclick="retrive(' + a + ')"></i>' + '</div>'
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
                                text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add </span>',
                                className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                                attr: { "data-bs-toggle": "modal", "data-bs-target": popup, },
                            },
                        ],
                        responsive: {
                            details: {
                                display: $.fn.dataTable.Responsive.display.modal({
                                    //header: function (e) {
                                    //    return "Details of " + e.data().full_name;
                                    //},
                                    header: function (e) {
                                        var name = e.data().full_name ? e.data().full_name : e.data().CD_Name;
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
                                //                a.append('<option value="' + o[e].ENR_CompanyName + '" class="text-capitalize">' + o[e].ENR_CompanyName + "</option>");
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
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops..',
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    })
}

function SaveRecords() {
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        cust: {
            CD_Id: $('#Id').val(),
            CD_FirstName: $.trim($('#txtFirstName').val()),
            CD_LastName: $.trim($('#txtLastName').val()),
            CD_ProfilePic: $('#hdnupload').val(),
            CD_AddressLine1: $('#txtAddressLine1').val(),
            CD_AddressLine2: $('#txtAddressLine2').val(),
            CD_Suburb: $('#txtSuberb').val(),
            CD_City: $('#txtCity').val(),
            CD_ProvinceId: $('#ddlProvince').val(),
            CD_CountryId: $('#ddlCountry').val(),
            
            CD_PostalCode: $.trim($('#txtPostalCode').val()),
            CD_ContactNumber: $.trim($('#txtContact').val()),
            CD_Email: $.trim($('#txtEmail').val()),
            CD_Type: parseInt($('#ddlType').val()),
            CD_Location: $('#txtLocation').val(),
            CD_SectorId: $('#ddlSector').val(),
            CD_RegistrationNo: $.trim($('#txtRegistrationNo').val()),
            CD_Vat: $.trim($('#txtVat').val()),
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecordData,
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
                var oTable = $('#datatable-example').DataTable();
                oTable.destroy();
                BindGrid();
                $('#setUPFormAdminCustomerModal').modal('hide');
                $('#setUPFormAdminCustomerModal').find('.form-control').val('');
                $('#setUPFormAdminCustomerModal').find('.select2').val('').change();

                $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');

                //window.location = '/Home/ViewAllEnterpriseUserForAdmin';
            } else {
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
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function retrive(id) {
    $('#setUPFormAdminCustomerModal').modal('show');

    // Close button functionality
    $('.btn-close, .btn[data-bs-dismiss="modal"]').click(function () {
        $('#setUPFormAdminCustomerModal').removeClass('show').css('display', 'none').attr('aria-hidden', 'true');
        $('.form-control').val('');
        $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
        $('.select2').val('').change();
    });

    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: parseInt(id),
            StoreProcedure: globalData.StoreProcedure
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
            //data = JSON.parse(data);
            $('#Id').val(data["CD_Id"]);
            $('#txtFirstName').val(data["CD_FirstName"]);
            $('#txtLastName').val(data["CD_LastName"]);
            $('#txtAddressLine1').val(data["CD_AddressLine1"]);
            $('#txtAddressLine2').val(data["CD_AddressLine2"]);
            
         

            $('#ddlCountry').val(data["CD_CountryId"]).change();
            $(".ddlProvince").find("option").remove();
                var g = $(".ddlProvince");

                g.length &&
                  g.each(function () {
                      var g = $(this);
                      g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
                  });
                DropdownBinder.DDLData = {
                    tableName: "ProvinceSetUp_PM",
                    Text: 'PM_Province',
                    Value: 'PM_Id',
                    PId: data["CD_CountryId"],
                    ColumnName: 'PM_CountryId'
                };
                DropdownBinder.DDLElem = $("#ddlProvince");
                DropdownBinder.Execute();

            $('#ddlSector').val(data["CD_SectorId"]).change();
            $('#ddlProvince').val(data["CD_ProvinceId"]).change();
            $('#ddlType').val(data["CD_Type"]).change();
            $('#txtPostalCode').val(data["CD_PostalCode"]);
            $('#txtSuberb').val(data["CD_Suburb"]);
            $('#txtCity').val(data["CD_City"]);
            $('#txtEmail').val(data["CD_Email"]);
            $('#txtContact').val(data["CD_ContactNumber"]);
            $('#txtLocation').val(data["CD_Location"]);
            $('#txtRegistrationNo').val(data["CD_RegistrationNo"]);
            $('#txtVat').val(data["CD_Vat"]);

            if (data["CD_ProfilePic"] == "NO") {
                $('#dvImage').css('display', 'none');
                $('#dvAvatar').css('display', 'block');
                $('#dvAvatar').html('');
               
                var avatar = '<div class="avatar avatar-lg me-2"><span class="avatar-initial rounded-circle  bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + data["CD_Prefix"] + '</span></div>';
                $('#dvAvatar').append(avatar);
              
            }else {
             $('#dvAvatar').html('');
                $('#dvAvatar').css('display', 'none');
                $('#dvImage').css('display', 'block');
                $('#hdnupload').val(data["CD_ProfilePic"]);
                $('#prfpicIMG').attr('src', data["CD_ProfilePic"]);
            }
           
        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
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

//For upload file into folder
function UploadDoc(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            $('#dvAvatar').css('display', 'none');
            $('#dvImage').css('display', 'block');
            if (Id > 0) {
                UpdatePhoto();
            }
        }
    });
}
function UpdatePhoto() {
    Id = getParameterByName('Id');
    if ($('#Id').val() == "") {
        var id = Id;
    } else {
        var id = $('#hdnId').val();
    }
    var _data = JSON.stringify({
        entr: {
            CD_Id: id,
            CD_ProfilePic: $('#hdnupload').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/CustomerPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: data.Message,
                    icon: "success",
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

function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            //$('#formAccountSettings').trigger("reset");
            window.location.href = "/Enterprise/ViewAllUser";
        });

    });
}
function ShowPreview(input) {

    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes


        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops...",
                text: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMG').attr('src', e.target.result);
                }

                ImageDir.readAsDataURL(input.files[0]);

                UploadDoc('upload');
                pathFl = $('#upload').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnupload').val(hdnImagePath);
            }
        }
    } else {

        Swal.fire({
            title: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}
function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseInt(bytes / 1000);
        }
    }
    return bytes + ' P';
}
$("#btnResetUpload").on("click", function () {

    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
});



//Formet Registration Number
document.getElementById('txtRegistrationNo').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    // Format the input as YYYY/NNNNNN/NN
    if (value.length > 4) {
        value = value.slice(0, 4) + '/' + value.slice(4);
    }
    if (value.length > 11) {
        value = value.slice(0, 11) + '/' + value.slice(11, 13);
    }
    // Update the input field
    this.value = value;
});
function validateForm() {
    const input = document.getElementById('txtRegistrationNo').value.trim();
    const regex = /^\d{4}\/\d{6}\/\d{2}$/;

    if (!regex.test(input)) {
        document.getElementById('error').innerText = 'Invalid format. Use YYYY/NNNNNN/NN.';
        document.getElementById('error').style.display = 'block';
        return false;
    }
    document.getElementById('error').style.display = 'none';
    return true;
}