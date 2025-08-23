var formElem = document.getElementById("formAdminUserManage");

$(document).ready(function () {
    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    //console.log(path);
    localStorage.setItem('href', path);
    InitUI();

    DropdownBinder.DDLData = {
        tableName: "RoleSetUp_RM",
        Text: 'RM_Role',
        Value: 'RM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();
}
);

$(function () {
    var h = $(".ddlGender");
    var f = $(".ddlRole");


    h.length &&
    h.each(function () {
        var h = $(this);
        h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select Gender", dropdownParent: h.parent() });
    });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select Role", dropdownParent: f.parent() });
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
            txtUserEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter email"
                    },
                    emailAddress: { message: "The value is not a valid email address" }
                }
            },
            txtContact: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact number"
                    }
                }
            },
            ddlEnterprise: {
                validators: {
                    notEmpty: {
                        message: "Please select enterprise"
                    }
                }
            },
            ddlRole: {
                validators: {
                    notEmpty: {
                        message: "Please select role"
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
            TransactionType: 'SelectAllAdminUser',
            StoreProcedure: 'UserMaster_USP',
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

            p = "/Home/UserPermission?mainid=1&UserId=";
            v = "/Home/AddAdminUser?Id=";
            //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
            //i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
            n.length &&
                (e = n.DataTable({
                    data: data,
                    columns: [{ data: "" }, { data: "UM_Name" }, { data: "UM_ContactNo" }, { data: "UM_SubRole" }, { data: "action" }],
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
                    //responsivePriority: 4,
                    render: function (e, t, a, s) {
                        var n = a.UM_Name,
                            i = a.UM_EmailId,
                            o = a.UM_ProfilePic;
                        b = a.UM_Id;
                        return (
                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar me-3">' +
                            (o
                                ? '<img src="' + a.UM_ProfilePic + '" alt="Avatar" class="rounded-circle">'
                                : '<span class="avatar-initial rounded-circle bg-label-' +
                                  ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                  '">' +
                                  (o = (((o = (n = a.UM_Name).match(/\b\w/g) || []).shift() || "") + (o.pop() || "")).toUpperCase()) +
                                  "</span>") +
                            '</div></div><div class="d-flex flex-column"><a href="/Home/UserProfileDetails?Id='+b+'"><span class="fw-medium">' +
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
                        a = a.UM_Id;
                        w = 'UserMaster_UM';
                        y = 'UM_Id';
                        return (
                            //'<div class="d-flex align-items-center">' + '<i class="ti ti-edit ti-sm me-2" style="cursor: pointer;" onclick="retrive(' + a + ')"></i>' + '</div>'
                            '<div class="d-flex align-items-center"><a href="#" target="blank" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><button class="dropdown-item" onclick="retrive(' + a + ')">Edit</button><a href="' + p + a + '" class="dropdown-item" target="_blank">Manage Permissions</a></div></div>'    /// <button class="dropdown-item" onclick="DeleteRecords(\'' + w + '\', \'' + y + '\', ' + a + ')">Delete</button>
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
                                header: function (e) {
                                    var name = e.data().full_name ? e.data().full_name : e.data().UM_Name;
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
        User: {
            UM_Id: $('#Id').val(),
            UM_FirstName: $.trim($('#txtFirstName').val()),
            UM_LastName: $.trim($('#txtLastName').val()),
            UM_EmailId: $.trim($('#txtUserEmail').val()),
            UM_ContactNo: $.trim($('#txtContact').val()),
            UM_ProfilePic: $('#hdnupload').val(),
            UM_Role: 'A',
            UM_SubRoleId: $('#ddlRole').val(),
            UM_SubRole: $('#ddlRole option:selected').text(),
            UM_Age: $('#txtAge').val(),
            UM_Gender: $('#ddlGender').val(),
            
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
                var retId = $('#Id').val();
                if (retId > 0) {
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

                    $('#setUPFormAdminUserManageModal').modal('hide');
                    $('#setUPFormAdminUserManageModal').find('input, select').val('');
                    $(".form-control").val('')
                    $("#btnUpdateNext").html('Save');
                    $('#btnUpdateNext').removeAttr('disabled');
                } else {
                    SendWhatsApp();
                    SendMail();
                }
            }
            else {
                var Email = $('#txtUserEmail').val();
                var Phone = $('#txtContact').val();

                var titleText = '';
                if (data.Id == -1) {
                    titleText = '"' + Email + '"' + " this email already exists..!";
                } else if (data.Id == -2) {
                    titleText = '"' + Phone + '"' + " this phone number already exists..!";
                } else {
                    titleText = data.Message;
                }

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

    $('#setUPFormAdminUserManageModal').modal('show');
    // Close button functionality
    $('.btn-close, .btn[data-bs-dismiss="modal"]').click(function () {
        $('#setUPFormAdminUserManageModal').removeClass('show').css('display', 'none').attr('aria-hidden', 'true');
        $('.form-control').val('');
        $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
        $('.select2').val('').change();
    });

    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectAdminUser",
            param1: "UM_Id",
            param1Value: parseInt(id),
            param2: 'UM_MainID',
            StoreProcedure: "UserMaster_USP"
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
            $('#Id').val(data["UM_Id"]);
            $('#txtFirstName').val(data["UM_FirstName"]);
            $('#txtLastName').val(data["UM_LastName"]);
            $('#txtUserEmail').val(data["UM_EmailId"]);
            $('#txtContact').val(data["UM_ContactNo"]);
            //$('#ddlRole').val(data["UM_SubRole"]).change();
            $('#ddlRole').val(data["UM_SubRoleId"]).change();
            $('#txtAge').val(data["UM_Age"]);
            $('#ddlGender').val(data["UM_Gender"]).change();
            
            

            if (data["UM_ProfilePic"] == "NO") {
                $('#dvImage').css('display', 'none');
                $('#dvAvatar').css('display', 'block');
                $('#dvAvatar').html('');
               
                var avatar = '<div class="avatar avatar-lg me-2"><span class="avatar-initial rounded-circle  bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + data["UM_Prefix"] + '</span></div>';
                $('#dvAvatar').append(avatar);

            } else {
                $('#dvAvatar').html('');
                $('#dvAvatar').css('display', 'none');
                $('#dvImage').css('display', 'block');
                $('#hdnupload').val(data["UM_ProfilePic"]);
                $('#prfpicIMG').attr('src', data["UM_ProfilePic"]);
            }
        },
        error: function (data) {
                LoaderEnd(".loader-sectionenr");
           
            Swal.fire({
                title: 'Oops..',
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
            UM_Id: id,
            UM_ProfilePic: $('#hdnupload').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/EnterpriseUserPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: 'Good Job!',
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..',
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
                title: 'Oops..',
                text: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        } else {
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
            title: 'Oops..',
            text: 'choose any one image, please',
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

function SendMail() {
    $('#btnUpdateNext').prop('disabled', true);
    $("#btnUpdateNext").html('Please Wait.....');

    var action = 'adminuseradd';

    var _data = JSON.stringify({
        emailcontent: {
            UserName: $('#txtFirstName').val(),
            SubRole: $('#ddlRole option:selected').text(),
            UM_Login: $('#txtUserEmail').val(),
            Password: $('#txtContact').val().replace(/\s+/g, ''),
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
             LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            if (data != null && data.IsSuccess === true) {
                //Swal.fire({
                //    title: data.Message,
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});

                Swal.fire({
                    title: 'Good Job!',
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

                var oTable = $('#datatable-example').DataTable();
                oTable.destroy();
                BindGrid();

                $('#setUPFormAdminUserManageModal').modal('hide');
                $('#setUPFormAdminUserManageModal').find('input, select').val('');
                $(".form-control").val('')

                //Swal.fire({
                //    title: "Your changes were saved successfully!",
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //}).then((result) => {

                //    if (result.isConfirmed) {

                //        if ($('#EntrId').val() > 0) {
                //            window.location.href = "/Project/ProjectListForEnterprise";
                //        }
                //        else {
                //            window.location.href = "/Project/ProjectListForAdmin";
                //        }

                //    }


                //});
                //$(document).ajaxStop(function () {
                //    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
                //});
                $("#btnUpdateNext").html('Save');
                $('#btnUpdateNext').removeAttr('disabled');

            } else {
                LoaderEnd(".loader-sectionenr");
                Swal.fire({
                    title: 'Oops..',
                    text: "Invalid email, try another email..!",
                    icon: "warning",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                $("#btnUpdateNext").html('Save');
                $('#btnUpdateNext').removeAttr('disabled');
                //setTimeout(function () {
                //    window.location.reload();  
                //}, 2000);
            }
        },
        error: function () {
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


function SendWhatsApp() {
    //LoaderEnd("#msmeRegPageLoader");

    // Encrypt username and name
    function base64Encode(value) {
        return btoa(unescape(encodeURIComponent(value)));
    }


    // Get the raw contact number input (from South Africa)
    var rawNumber = $('#txtContact').val().trim().replace(/\s+/g, '');



    // Prepend South African country code (+27)
    var phoneNumber = '+27' + rawNumber;
    //var phoneNumber = '+91' + '9749276281';      ////  this is for self-test

    // Get other dynamic values
    var name = $('#txtFirstName').val();
    var tenantId = '';
    var username = '';
    var dashboardUrl = '';
    if ($('#txtUserEmail').val() != '') {
        tenantId = $('#txtContact').val().replace(/\s+/g, '');
        username = $('#txtUserEmail').val();
        // Encode username and name
        var encryptedUsername = encodeURIComponent(base64Encode(username));
        var encryptedName = encodeURIComponent(base64Encode(name));
        dashboardUrl = baseUrl + "Account/EmailVerified?email=" + encryptedUsername + "&com=" + encryptedName;
    } else {
        tenantId = rawNumber;
        username = rawNumber;
        // Encode username and name
        var encryptedUsername = encodeURIComponent(base64Encode(username));
        var encryptedName = encodeURIComponent(base64Encode(name));
        dashboardUrl = baseUrl + "/Account/EmailVerified?email=" + encryptedUsername + "&com=" + encryptedName;
    }


    // Build the message body
    var bodyData = {
        template_name: "welcome_templ",
        broadcast_name: "Welcome",
        parameters: [
            { name: "name", value: name },
            { name: "tenant_id", value: tenantId },
            { name: "username", value: username },
            { name: "dashboard_url", value: dashboardUrl }
            //{
            //    name: "dashboard_url",
            //    value: "https://business.facebook.com/latest/whatsapp_manager/phone_numbers/?business_id=1035633468756300&tab=phone-numbers&nav_ref=whatsapp_manager&asset_id=2938727166331313"
            //}
        ]
    };

    // Set up request options
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODAxZmNkNS03ZmNiLTQ5OWUtYTYyNy05MGM1ZjJlYTczNzgiLCJ1bmlxdWVfbmFtZSI6Im9icmllbkBncm93dGh0aWVzLmNvLnphIiwibmFtZWlkIjoib2JyaWVuQGdyb3d0aHRpZXMuY28uemEiLCJlbWFpbCI6Im9icmllbkBncm93dGh0aWVzLmNvLnphIiwiYXV0aF90aW1lIjoiMDgvMDQvMjAyNSAxMjowMToxNiIsInRlbmFudF9pZCI6IjQ2NjU0NiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.eCxKQ6BrIwdad59qIdpFgLZ79BLB-wfsGDq-othRe3Q'
        },
        body: JSON.stringify(bodyData)
    };

    // Final API URL
    var url = 'https://live-mt-server.wati.io/466546/api/v1/sendTemplateMessage?whatsappNumber=' + phoneNumber;

    // Send request
    fetch(url, options)
        .then(function (res) { return res.json(); })
        .then(function (res) { console.log(res); })
        .catch(function (err) { console.error(err); });
    //LoaderEnd("#msmeRegPageLoader");
}





