var SMMELogoList = '';
$(document).ready(function () {
    BindGrid();
});



function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllProjectForStakeholder',
            param1: 'PWS_EnterpriseId',
            param2: 'PWS_StakeholderId',
            StoreProcedure: 'ProjectDetails_USP',
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

            //  //console.log('This is define: ',data)

            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
                i = $(".select2"),

            r = "/Account/EnterpriseSettings_contact?M=E&Id=";
            v = "/Stakeholder/EnterpriseProfieView_Profiles?Id=";
            p = "/Account/EnterpriseSettings_company?M=E&Id=";
            w = "/Account/EnterpriseSettings_legalentity?M=E&Id=";
            x = "/Account/EnterpriseSettings_financial?M=E&Id=";
            y = "/Enterprise/EnterpriseWiseSMME?M=E&Id=";
            z = "/Customer/EnterpriseWiseCustomer?M=E&Id=";
            //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data: data,
                        columns: [{ data: "" }, { data: "PD_ProjectName" }, { data: "PD_DurationFromDate" }, { data: "PD_DurationToDate" }, { data: "PD_Budget" }, { data: "SMME_Count" }, { data: "Stakeholder_Count" }, { data: "action" }],
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
                            var n = a.PD_ProjectName,
                                //i = a.ENR_PrimaryContactEmail,
                                //o = a.ENR_Logo;
                            m = a.PD_Id;
                            return (
                                                           '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                      ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                      '">' +
                                           a.PD_ProjectName +
                                           '</span></a></div></div>'
                                       );

                        },
                    },
                    // {
                    //    targets: 5,
                    //    render: function (e, t, a, s) {
                    //        return a.SMME_Count
                    //    },
                    //},
                    //{
                    //    targets: 6,
                    //    render: function (e, t, a, s) {
                    //        return a.Stakeholder_Count
                    //    },
                    //},
                        {
                            targets: -1,
                            title: "Actions",
                            searchable: !1,

                            render: function (e, t, a, s) {
                                a = a.PD_Id;
                                return (
                                    '<a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0" style=""><a class="dropdown-item text-black" data-bs-target="#asignShareholder" data-bs-toggle="modal" onclick="showEnterpriseList(' + a + ');">Assign</a><a class="dropdown-item text-black" onclick="">Manage Stakeholder</a></div>'
                                    //'<div class="d-flex align-items-center"><a href="' + p + a + '" class="text-body"><i class="ti ti-edit ti-sm me-2"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="' + p + a + '" class="dropdown-item" target="_blank">Details</a><a href="' +
                                    // r + a +
                                    //'" class="dropdown-item">Contact</a><a href="' + w + a + '" class="dropdown-item"  target="_blank">legal</a><a href="' + x + a + '" class="dropdown-item" target="_blank">Finance</a></div><a href="' + z + a + '" class="text-body"  target="_blank"><i class="ti ti-user-plus ti-sm me-2"></i></a></div>'
                                );
                            },
                        },
                        ],

                        dom:
                            '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                        language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                        buttons:[]
                        //{
                        //    extend:"collection",
                        //    className:'btn btn-lable-primary dropdown-toggle me-4 waves-effect waves-light border-none',
                        //    text:'<i class="ti ti-file-export ti-xs me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>'
                        //}
                        ,
                        responsive: {
                            details: {
                                display: $.fn.dataTable.Responsive.display.modal({
                                    header: function (e) {
                                        var name = e.data().full_name ? e.data().full_name : e.data().ENR_CompanyName;
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
            Swal.fire({
                title: 'Request failed',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
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
                    title: "Your Changes Successfully done!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
            else {

                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
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
}


//*************retrive currency*******
function formatNumber(value) {
    let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
    const [integerPart, decimalPart] = number.split('.');

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedInteger + '.' + (decimalPart || '00');
}


function showEnterpriseList(PdId) {

 
    ProjId=PdId;
    //alert(PdId);
    $("#ulEnterpriseList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseForStakeholderForAdmin',
          
            param1: 'PD_Id',
            param1Value: parseInt(PdId),
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
                $("#ulEnterpriseList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input enr'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignStakeholder("+ index +"," + PdId + "," + v.ENR_Id + ")'></div>");
               
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
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


function AssignStakeholder( index, PdId, ENR_Id) {
    //var TransactionType = 'UpdateStakeholder';
    //if($(chk).is(':checked'))
    //{$('.enr').prop('disabled',true);
    //    $(chk).prop('disabled',false);
     
    //}
    //else
    //{
    //    $('.enr').prop('disabled',false);
    //    ENR_Id=0;
    //}

    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {

        TransactionType = 'InsertStakeHolder';
    } else {

        TransactionType = 'UpdateStakeHolder';
    }
    
   

    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            PWS_ProjectId: PdId,
            PWS_StakeholderId:ENR_Id
            //PD_Id: ProjId,
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToStakeholder',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Changes Successfully done!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
            else {

                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
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
}
