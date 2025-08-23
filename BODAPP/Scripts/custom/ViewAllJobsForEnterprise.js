let JobId = 0;
var MulpleJob = [];
var MainJob = [];
var liList = '';
var List = '';
var CustId='';
$(document).ready(function () {
   // $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    InitUI();
   

}); 

function InitUI() {
    CustId = getParameterByName('Id');
    BindGrid();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllJobForEnterprise',
            param1: 'JD_EnterpriseId',
            param1Value: $('#EntrId').val(),
            param2: 'JD_CustomerId',
            param2Value: parseInt(CustId),
            StoreProcedure: 'JobDetails_USP',

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
            var count = data.length;
            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),
               
            v = "/Job/CreateJobsForEnterprise?Id=";
                //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "JD_JobName" }, { data: "JD_VistType" }, { data: "JobStatusLbl" }, { data: "CD_Name" }, { data: "SMME_CompanyName" }, { data: "action" }],
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
                           
                               
                                if (row.JD_VistType == "Single") {
                               
                                    var Link='';
                                    if(row.OpenStatus>0 && row.OpenStatus!=3 )
                                   
                                     { 
                                        Link='<a href="/Job/JobProgressEnterprise?Id=' + row.JD_Id +'&Type='+row.JD_VistType+'" class="dropdown-item" target="_blank">Job Progress</a>';
                                       }
                                    
                                    else if(row.OpenStatus==3){
                                        Link='<a href="/Job/JobProgressEnterprise?Id=' + row.JD_Id +'&Type='+row.JD_VistType+'" class="dropdown-item" target="_blank">View</a>';
                                    }
                                    else if(row.OpenStatus==0){
                                        Link='<a href="#" class="dropdown-item" style="cursor: none;">Job Not Started</a>';
                                    }
                                    List = '<a href="#" target="blank" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0">'+Link+'</div>'
                            
                                }
                            
                                if (row.JD_VistType == "Multiple") {
                                    if(row.JD_Status!="Completed")
                                    { 
                                        retriveMultiplejob(row.JD_Id,row.JD_VistType,row.OpenStatus);
                                    }
                                }
                                if (row.JD_VistType == "Maintenance") {
                                    if(row.JD_Status!="Completed")
                                    { 
                                        retriveMaintenancejob(row.JD_Id,row.JD_VistType,row.OpenStatus);
                                    }
                                }
                                //if (count > 0) {
                                return (
                                 '<div class="d-flex align-items-center"><a href="' + v + row.JD_Id + '" class="text-body"  target="_blank"><i class="ti ti-edit ti-sm me-2"></i></a><button class="btn btn-sm btn-icon me-2"  data-bs-target="#shareProject" data-bs-toggle="modal" onclick="ShowAllSMME(' + row.JD_Id + ')" data-bs-dismiss="modal"><i class="ti ti-user-plus ti-sm me-2"></i></button>' + List + '</div>'
                             );
                                //}
                                
                            
                            
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
                title: "Oops...",
                text: 'request failed',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    })
}

function ShowAllSMME(id) {

    JobId = id;
    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: $('#EntrId').val(),
            param2: "JD_Id",
            param2Value: id,
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
        success: function (data) {
            data = JSON.parse(data);

            var count = data.length;
            $.each(data, function (i, v) {

                var index = i + 1;
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.SMME_CompanyName + "</h6><p class='mb-0 text-muted'>Email: " + v.SMME_PrimaryContactEmail + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input chkinput' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignJob(" + index + "," + v.SMME_Id + ",\"" + v.SMME_CompanyName + "\", \"" + v.SMME_PrimaryContactEmail + "\")'></div></div></div>");
                retriveJob(id)
                if ($('#chkId_' + index).is(':checked')) {

                    $('#chkId_' + index).removeAttr("disabled");
                } else {

                    $('#chkId_' + index).attr("disabled", true);
                }
            });
            if ($('.chkinput:checked').length == 0) {
                $('.chkinput').removeAttr("disabled");
            }

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

function AssignJob(index, UmId, SMMEName, mail) {
    var Transaction = "";

    if ($('#chkId_' + index).is(':checked')) {

        $('.chkinput').attr("disabled", true);
        $('#chkId_' + index).removeAttr("disabled");
        Transaction = "AssignJobToEntrSMME";
    } else {

        $('.chkinput').removeAttr("disabled");
        Transaction = "UnAssignJobToEntrSMME";
    }

    var _data = JSON.stringify({
        entity: {

            AJU_JobId: JobId,
            AJU_UserId: UmId,
            TransactionType: Transaction

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignJobToEnterpriseUser',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                if ($('#chkId_' + index).is(':checked')) {
                    SendMail(SMMEName, mail);
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

function retriveMultiplejob(JobId,Type,Status) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectMultiplejob',
            param1: 'JD_Id',
            param1Value: parseInt(JobId),
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
             
            $.each(data, function (i, v) {
                MulpleJob.push({
                    MJD_Id: v.MJD_Id,
                    MJD_Title: v.MJD_Title,
                    MJD_StartDate: v.MJD_StartDate,
                    MJD_EndDate: v.MJD_EndDate,
                    MJD_Status: v.MJD_Status,
                    OpenStatus: v.OpenStatus
                });
            });
            if(Status>0){
                $.each(MulpleJob, function (i, m) {
                    if(m.MJD_Status!='Completed')
                    {
                        liList = liList + '<a href=/Job/JobProgressEnterprise?Id=' + JobId + '&MId=' + m.MJD_Id + '&Type='+Type+' class="dropdown-item" target="_blank">Job Progress For(' + m.MJD_Title + ')</a>';
                    }
                });
            }
            List = '<a href="#" target="blank" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0">' + liList + '</div>';
         
            liList = '';

            MulpleJob = [];
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

function retriveMaintenancejob(JobId,Type,Status) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectMaintenancejob',
            param1: 'JD_Id',
            param1Value: parseInt(JobId),
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);


            $.each(data, function (i, v) {
                MainJob.push({
                    MNJD_Id: v.MNJD_Id,
                    MNJD_Frequency: v.MNJD_Frequency,
                    MNJD_VisitCount: v.MNJD_VisitCount,
                    MNJD_Date: v.MNJD_Date,

                });
            });
            if(Status>0){
                $.each(MainJob, function (i, m) {
                    if(m.MNJD_Status!='Completed')
                    {
                        liList = liList + '<a href=/Job/JobProgressEnterprise?Id=' + JobId + '&MId=' + m.MNJD_Id + '&Type='+Type+' class="dropdown-item" target="_blank">Job Progress For(' + m.MNJD_Frequency + '-' + m.MNJD_VisitCount + ')</a>';
                    }
                });
            }
            List = '<a href="#" target="blank" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0">' + liList + '</div>';

            liList = '';

            MainJob = [];
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

    var action = 'assignjobtosmmebyenterprise';

    var _data = JSON.stringify({
        emailcontent: {
            JobId: parseInt($('#JDId').val()),
            JobName: $.trim($('#JDName').val()),
            JobDurationFromDate: $('#JDStartDte').val(),
            JobDurationToDate: $('#JDEndDte').val(),
            JobDesc: $('#JDDesc').val(),
            Email: Email,
            SMMEName: SMMEName
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.IsSuccess === true) {

                Swal.fire({
                    title: "Successful..!",
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                $(document).ajaxStop(function () {
                    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

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

function retriveJob(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'JD_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetJobData',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);


            $('#JDId').val(data["JD_Id"]);
            $('#JDName').val(data["JD_JobName"]);
            $('#JDStartDte').val(data["JD_JobStartDate"]);
            $('#JDEndDte').val(data["JD_JobEndDate"]);
            $('#JDDesc').val(data["JD_Description"]);

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