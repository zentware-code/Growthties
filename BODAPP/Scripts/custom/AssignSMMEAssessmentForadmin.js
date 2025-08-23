var SmmeId = "";
var SMMLogoList = '';

$(document).ready(function () {

    InitUI();

    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);
   
  
});
function fnSmmeForAssemnet(BA_id) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAssignAssessmnetWiseSMMELogo',
            param1: 'AAS_BA_Id',
            param1Value: parseInt(BA_id),
            StoreProcedure: 'AssignAssessmentToSMME_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" ><span class="badge bg-label-danger">No SMME Found</span></div>';
            }
            
        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
function InitUI() {
   
    BindGrid();
}

function BindGrid() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSmmeAssessment',
            Param: 'SMME_Id',
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
                i = $(".select2");
            p = "/SMME/SMMEProfile_Dashboard?Id=";
            //o = { 1: { SMME_Active: "Pending", class: "bg-label-warning" }, 2: { SMME_Active: "Active", class: "bg-label-success" }, 3: { SMME_Active: "Inactive", class: "bg-label-secondary" } };
            i.length && (i = i).wrap('<div class="position-relative"></div>').select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
                n.length &&
                    (e = n.DataTable({
                        data:data,
                        columns: [{ data: "" }, { data: "SMME_CompanyName" }, { data: "SMME_PrimaryContactNo" },  { data: "assign" }],
                        columnDefs: [
                    {
                        className: "control",
                        searchable: !1,
                        orderable: !1,
                        //responsivePriority: 2,
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
                        title: "Assign",
                        searchable: !1,
                        orderable: !1,
                        render: function (e, t, a, s) {
                            a = a.SMME_Id;
                            return (
                              '<div class="d-flex align-items-center"><button class="btn btn-sm btn-icon me-2"  data-bs-target="#shareProject" data-bs-toggle="modal" onclick="ShowAllAssessment('+a+')" data-bs-dismiss="modal"><i class="ti ti-book ti-sm me-2 text-info"></i></button></div></div>'

                            );
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

function ShowAllAssessment(id) {
    SmmeId = id;
    $("#ulAssessmentList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
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
            data = JSON.parse(data);
            var allDisbled='Yes';
            var count = data.length;
            $.each(data, function (i, v) {
                if(v.checked=="checked")
                {
                    allDisbled='No';
                }
               
                var index = i + 1;
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignAssessment(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulAssessmentList").append("<li class='align-items-center cursor-move d-flex drag-item justify-content-between list-group-item'><div><span>" + v.AC_Category + "</span> <span>(Total Question - " + v.CountQues + ")</span></div><div class='form-check form-switch'><input class='float-end form-check-input chkinput' type=checkbox "+v.checked+" "+v.IsDisabled+" id='chkId_" + index + "' onclick='AssignAssessment(" + index + "," + v.BA_Id + "," + v.BA_QuestionTypeId + ","+ SmmeId +")'></div>");
              
            });
            if(allDisbled=='Yes')
            {
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

function AssignAssessment(index, BAId, AssessmentId, SmmeId) {
    var prtSmmeId = "";
    var transtype = '';
   
    if ($('#chkId_' + index).is(':checked')) {
        $('.chkinput').prop("disabled",true);
        $('#chkId_' + index).removeAttr("disabled");
        prtSmmeId = SmmeId;
      
    } else {
        $('.chkinput').removeAttr("disabled");
        prtSmmeId = SmmeId;
        transtype = 'UpdateAssign';
    }

    var _data = JSON.stringify({
        entity: {

            AAS_SMME_Id: prtSmmeId,
            AAS_BA_Id: BAId,
            AAS_Assessment_Id: AssessmentId,
            TransectionType: transtype
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignAssessmentToSMME',
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