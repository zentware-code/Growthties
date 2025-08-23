/// <reference path="financialyearmaster.js" />
var formElem = document.getElementById("formJob");
var row = 0;
var col = 0;
var cel = 0;
var text = 0;
var n,
        o
e = $(".bootstrap-maxlength-example"),
t = $(".form-repeater");
var BudgeText = "";
function validateDate() {  
    var txt = document.getElementById('txtStartDate');  
    var txt2 = document.getElementById('txtEndDate');  
    if (txt.value == "") {  
        txt.style.border = "1px solid Red";  
        return false;  
    }  
    if (txt2.value == "") {  
        txt2.style.border = "1px solid Red";  
        return false;  
    }  
}
function PreviewMaintaince()
{
    $('#tblJobMaintPrev tbody').html('');
    var tblMaintdtl = document.getElementById('tblJobMaint');
    var tblMaintListArr = [];
    for (var i = 1; i < tblMaintdtl.rows.length; i++) {
        tblMaintListArr.push({
            MNJD_Frequency: tblMaintdtl.rows[i].cells[0].innerHTML,
            MNJD_VisitCount: parseInt(tblMaintdtl.rows[i].cells[1].innerHTML),
            MNJD_Date: tblMaintdtl.rows[i].cells[2].innerHTML,
        });
    }

    for (var i = 0; i < tblMaintListArr.length; i++) {
        //var table = document.getElementById("tblJobMaintPrev");
        //var RNo;
        //var row = table.insertRow(RNo);
        //var Cell1 = row.insertCell(0);
        //var Cell2 = row.insertCell(1);
        //var Cell3 = row.insertCell(2);
        //var Cell4 = row.insertCell(3);
        var row= row+'<tr><td>'+tblMaintListArr[i].MNJD_Frequency+'</td><td>'+tblMaintListArr[i].MNJD_VisitCount+'</td><td>'+tblMaintListArr[i].MNJD_Date+'</td></tr>'
        //Cell1.innerHTML = tblMaintListArr[i].MNJD_Frequency;
        //Cell2.innerHTML =tblMaintListArr[i].MNJD_VisitCount;
        //Cell3.innerHTML = tblMaintListArr[i].MNJD_Date;
        //Cell4.innerHTML = "<a href='javascript:void(0)' class='btn btn-sm btn-round btn-danger' onclick='deleteRow(this)'; style='line-height:21px;height:24px;min-width:24px'><i class='ti ti-x ti-xs me-1'></i></a>";


    }
    $('#tblJobMaintPrev tbody').append(row);
    $('#shareProject').modal('hide');
}
function SaveRecord() {
    if ($('#ddlVisitType').val() == 'Single') {
        if( validateDate()==false)
        { 
            return false;
        }
    }
    var tableArr = [];
    var MJD_Title = '';
    var MJD_StartDate = '';
    var MJD_EndDate = '';
    for (var i = 1; i < row; i++) {
        for (var j = 1; j < col; j++) {
            if (j == 1) {
                var MJD_Title = $('#form-repeater-' + i + '-' + j).val();
            }
            else if (j == 2) {
                var MJD_StartDate = $('#form-repeater-' + i + '-' + j).val();


            }
            else if (j == 3) {
                var MJD_EndDate = $('#form-repeater-' + i + '-' + j).val();


            }

        }
        tableArr.push({
            MJD_Title: MJD_Title,
            MJD_StartDate: MJD_StartDate,
            MJD_EndDate: MJD_EndDate

        });

    }

    var tblMaintdtl = document.getElementById('tblJobMaintPrev');
    var tblMaintListArr = [];
    for (var i = 1; i < tblMaintdtl.rows.length; i++) {
        tblMaintListArr.push({
            MNJD_Frequency: tblMaintdtl.rows[i].cells[0].innerHTML,
            MNJD_VisitCount: parseInt(tblMaintdtl.rows[i].cells[1].innerHTML),
            MNJD_Date: tblMaintdtl.rows[i].cells[2].innerHTML,
        });
    }
    if ($('#tgBudgetType').is(':checked')) {

        BudgeText='Dynamic';

    } else {

         BudgeText = 'Fixed';
    }
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            JD_Id: $('#hdnId').val(),
            JD_JobName: $.trim($('#txtJobName').val()),
            JD_JobStartDate: $('#txtStartDate').val(),
            JD_JobEndDate: $('#txtEndDate').val(),
            JD_CustomerId: $('#ddlCustomer').val(),
            JD_EnterpriseId: $('#ddlEnterprise').val(),
            JD_SmmeId: $('#ddlSMME').val(),
            JD_Description: $('#txtDescription').val(),
            JD_JobCateoryId: $('#ddlCategory').val(),
            JD_VistType: $('#ddlVisitType').val(),
            JD_BudgeType: BudgeText,
            JD_Budget: $('#txtBudget').val(),

            MultipleJobDetailsList: tableArr,
            MaintenanceJobDetailsList: tblMaintListArr,
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
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
                window.location.href = "/Job/ViewAllJobsForAdmin";
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
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function extendDateByFreq(userDefinedDateString, i, ddlFrequency) {

    var parts = userDefinedDateString.split('-');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);

    var userDefinedDate = new Date(year, month, day);

    if (ddlFrequency == "Weekly") {
        if(i==1)
        {
            userDefinedDate.setDate(userDefinedDate.getDate());
        }
        else
        {
            userDefinedDate.setDate(userDefinedDate.getDate() + (7 * (i-1)));
        }
       
    }
    else if (ddlFrequency == "Monthly") {
        if(i==1)
        {
            userDefinedDate.setMonth(userDefinedDate.getMonth());

        }
        else{
            userDefinedDate.setMonth(userDefinedDate.getMonth() + (1 * (i-1)));
        }
       
    }
    else if (ddlFrequency == "Yearly") {
        if(i==1)
        {
            userDefinedDate.setFullYear(userDefinedDate.getFullYear());
        }
        else{
            userDefinedDate.setFullYear(userDefinedDate.getFullYear() + (1 * (i-1)));
        }
    }


    var extendedDay = userDefinedDate.getDate();
    var extendedMonth = userDefinedDate.getMonth() + 1;
    var extendedYear = userDefinedDate.getFullYear();

    extendedDay = (extendedDay < 10 ? '0' : '') + extendedDay;
    extendedMonth = (extendedMonth < 10 ? '0' : '') + extendedMonth;

    return extendedDay + '-' + extendedMonth + '-' + extendedYear;
}
function addRecordTableForMaint() {

    var ddlFrequency = $('#ddlFrequency').val();
    var txtVisitCount = parseInt($('#txtVisitCount').val());
    var txtDate = $('#txtDate').val();
    $('#tblJobMaint tbody').html('');
    var row='';
    var table = document.getElementById('tblJobMaint').getElementsByTagName('tbody')[0];
    var RNo;
    for (i = 1; i <= txtVisitCount; i++) {

        var extendedDate = extendDateByFreq(txtDate, i, ddlFrequency);

        var row = table.insertRow();
        var Cell1 = row.insertCell(0);
        var Cell2 = row.insertCell(1);
        var Cell3 = row.insertCell(2);
        var Cell4 = row.insertCell(3);

        Cell1.innerHTML = ddlFrequency;
        Cell2.innerHTML = i;
        Cell3.innerHTML = extendedDate;
        Cell4.innerHTML = "<button class='btn btn-sm btn-round btn-danger btnremoverow' onclick='deleteRow(this)'; style='line-height:21px;height:24px;min-width:24px'><i class='ti ti-x ti-xs me-1'></i></button>";
       //  row= row+'<tr><td>'+ddlFrequency+'</td><td>'+i+'</td><td>'+extendedDate+'</td><td><a href="javascript:void(0)" class="btn btn-sm btn-round btn-danger" onclick="deleteRow(this)"; style="line-height:21px;height:24px;min-width:24px"><i class="ti ti-x ti-xs me-1"></i></a></td></tr>'

    }
    ////console.log(row);
    //$('#tblJobMaint tbody').append('<tr><td>Monthly</td><td>1</td><td>13/06/2024</td><td><a href="javascript:void(0)" class="btn btn-sm btn-round btn-danger" onclick="deleteRow(this)"; style="line-height:21px;height:24px;min-width:24px"><i class="ti ti-x ti-xs me-1"></i></a></td></tr><tr><td>Monthly</td><td>2</td><td>13/07/2024</td><td><a href="javascript:void(0)" class="btn btn-sm btn-round btn-danger" onclick="deleteRow(this)"; style="line-height:21px;height:24px;min-width:24px"><i class="ti ti-x ti-xs me-1"></i></a></td></tr>');
}

$('#btnAddMaintaince').click(function () {
    addRecordTableForMaint();
})
$(document).ready(function () {
 DropdownBinder.DDLData = {
        tableName: "JobCategoriesSetUp_JC",
        Text: 'JC_JobCategories',
        Value: 'JC_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCategory");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $("#ddlEnterprise");
    DropdownBinder.Execute();

    var Id = getParameterByName('Id');
    if (Id != '') {
        $('#hdnId').val(Id);
        retrive(Id);
        
        //$('#hdnId').val(Id");
    }


    $('#ddlVisitType').change(function () {
        if ($('#ddlVisitType').val() == 'Single') {

            $('.clsdetails').attr("disabled", true);
            $('.clsDate').removeAttr("disabled");
            $('#btnSave').removeAttr("disabled");



        }
        else if ($('#ddlVisitType').val() == 'Maintenance') {
            $('.clsdetails').attr("disabled", true);
            $('.clsDate').attr("disabled", true);
            if (Id == '') {
                $('#shareProject').modal('show');
            }
          
        }
        else {
            //alert('HH');
            $('.clsdetails').removeAttr("disabled");
            $('.clsDate').attr("disabled", true);
            $('#txtStartDate').val('');
            $('#txtEndDate').val('');
            $('#btnSave').prop("disabled", true);
        }

    })

});

$("#ddlEnterprise").change(function () {
    $('.ddl').select2('destroy');
    $('.ddl option').remove();
    var c = $(".ddlCustomer");
    var g = $(".ddlSMME");

    g.length &&
      g.each(function () {
          var g = $(this);
          g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A SMME", dropdownParent: g.parent() });
      });
    c.length &&
      c.each(function () {
          var c = $(this);
          c.wrap('<div class="position-relative"></div>'), c.select2({ placeholder: "Select A Customer", dropdownParent: c.parent() });
      });

    DropdownBinder.DDLData = {
        tableName: "CustomerDetails_CD",
        Text: 'CD_Name',
        Value: 'CD_Id',
        ColumnName: 'CD_EnterpriseId',
        PId: $(this).val()

    };
    DropdownBinder.DDLElem = $("#ddlCustomer");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "SMMERegistration_SMME",
        Text: 'SMME_CompanyName',
        Value: 'SMME_Id',
        ColumnName: 'SMME_EnterpriseId',
        PId: $(this).val()
    };
    DropdownBinder.DDLElem = $("#ddlSMME");
    DropdownBinder.Execute();
});
$(function () {

    var c = $(".ddlCustomer");
   
    var f = $(".ddlVisitType");
    var h = $(".ddlCategory");
    var m = $(".ddlFrequency");
    var n = $(".ddlEnterprise");
    var g = $(".ddlSMME");
    c.length &&
        c.each(function () {
            var c = $(this);
            c.wrap('<div class="position-relative"></div>'), c.select2({ placeholder: "Select A Customer", dropdownParent: c.parent() });
        });

    g.length &&
       g.each(function () {
           var g = $(this);
           g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A SMME", dropdownParent: g.parent() });
       });
    f.length &&
   f.each(function () {
       var f = $(this);
       f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Visit", dropdownParent: f.parent() });
   });
    m.each(function () {
        var m = $(this);
        m.wrap('<div class="position-relative"></div>'), m.select2({ placeholder: "Select A Visit", dropdownParent: m.parent() });
    });

    h.length &&
          h.each(function () {
              var h = $(this);
              h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A Category", dropdownParent: h.parent() });
          });

    n.length &&
         n.each(function () {
             var n = $(this);
             n.wrap('<div class="position-relative"></div>'), n.select2({ placeholder: "Select A Enterprise", dropdownParent: n.parent() });
         });


    e.length &&
       e.each(function () {
           $(this).maxlength({
               warningClass: "label label-success bg-success text-white",
               limitReachedClass: "label label-danger",
               separator: " out of ",
               preText: "You typed ",
               postText: " chars available.",
               validate: !0,
               threshold: +this.getAttribute("maxlength"),
           });
       }),
       t.length &&
           ((n = 2),

           t.on("submit", function (e) {
               e.preventDefault();
           }),
           t.repeater({
               show: function () {
                   $('#btnSave').removeAttr("disabled");

                   var r = $(this).find(".form-control, .form-select"),
                       a = $(this).find(".form-label");
                   o = 1
                   r.each(function (e) {
                       var t = "form-repeater-" + n + "-" + o;
                       $(r[e]).attr("id", t), $(a[e]).attr("for", t), o++;
                   }),
                       n++,
                       $(this).slideDown();
                   row = n;
                   col = o;
                   var o = $(".bs-datepicker-autoclose"),
         //l = $("#bs-datepicker-inline"),
         e =
             (o.length && o.datepicker({ todayHighlight: !0, autoclose: !0, format: "dd/mm/yyyy", orientation: isRtl ? "auto right" : "auto left" }))

               },
               hide: function (e) {
                   Swal.fire({
                       title: "Are you sure you want to delete this element?",
                       text: "You won't be able to revert this!",
                       icon: "warning",
                       showCancelButton: !0,
                       confirmButtonText: "Delete",
                       customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
                       buttonsStyling: !1,
                   }).then((result) => {
                       if (result.isConfirmed) {
                           $(this).slideUp(e);
                            
               }
           });


},
}));


    FormValidation.formValidation(formElem, {
        fields: {
            txtJobName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Job Name"
                    }
                }
            },
            //txtStartDate: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter Start Date"
            //        }
            //    }
            //},
            //txtEndDate: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter End Date"
            //        }
            //    }
            //}
            ddlCustomer: {
                validators: {
                    notEmpty: {
                        message: "Please Select Customer"
                    }
                }
            },
            ddlCategory: {
                validators: {
                    notEmpty: {
                        message: "Please Select Category"
                    }
                }
            },
            ddlVisitType: {
                validators: {
                    notEmpty: {
                        message: "Please Select Visit Type"
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

        SaveRecord();
    });
}),



function fnCancelConfirm() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText: "Discard",
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            $('#formAccountSettings').trigger("reset");
            //window.location.href = "/Home/ViewAllEnterpriseUserForAdmin";
        });

    });
}
function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText: "Discard",
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            //$('#formAccountSettings').trigger("reset"");
            window.location.href = "/Job/ViewAllJobsForEnterprise";

        });

    });
}
$("#btnCancel").on("click", function () {
    fnCancelConfirm();
});

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});

function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'JD_Id',
            param1Value: parseInt($('#hdnId').val()),
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetJobData',
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

            $('#hdnId').val(data["JD_Id"]);
            $('#txtJobName').val(data["JD_JobName"]);
           // $('#ddlCustomer').val(data["JD_CustomerId"]).change();
            $('#ddlEnterprise').val(data["JD_EnterpriseId"]).change();
            $('#ddlCustomer').val(data["JD_CustomerId"]).change();
            $('#ddlSMME').val(data["JD_SmmeId"]).change();
            $('#ddlCategory').val(data["JD_JobCateoryId"]).change();
            $('#ddlVisitType').val(data["JD_VistType"]).change();
            $('#txtStartDate').val(data["JD_JobStartDate"]);
            $('#txtEndDate').val(data["JD_JobEndDate"]);
            $('#txtDescription').val(data["JD_Description"]);
            if (data["JD_BudgeType"] == "Dynamic") {
                $('#tgBudgetType').prop('checked', true);
                $('#txtBudget').prop('readonly', true);
            }
            else {
                $('#tgBudgetType').prop('checked', false);
                $('#txtBudget').prop('readonly', false);
            }
            $('#txtBudget').val(data["JD_Budget"]);
            //$("#btnRept").trigger('click');
          
            var i = 1;
            $.each(data.MultipleJobDetailsList, function (index, value) {
                i = i + index;

                $('#form-repeater-' + i + '-1').val(value.MJD_Title);
                $('#form-repeater-' + i + '-2').val(value.MJD_StartDate);
                $('#form-repeater-' + i + '-3').val(value.MJD_EndDate);

                $("#btnRept").trigger('click');
            });
            onLoadBudgtRetrive();

            for (var i = 0; i < data.MaintenanceJobDetailsList.length; i++) {
                //var table = document.getElementById("tblJobMaintPrev").getElementsByTagName('tbody')[0];
                //var RNo;
                //var row = table.insertRow(RNo);
                //var Cell1 = row.insertCell(0);
                //var Cell2 = row.insertCell(1);
                //var Cell3 = row.insertCell(2);
                //var Cell4 = row.insertCell(3);

                //Cell1.innerHTML = data.MaintenanceJobDetailsList[i].MNJD_Frequency;
                //Cell2.innerHTML = data.MaintenanceJobDetailsList[i].MNJD_VisitCount;
                //Cell3.innerHTML = data.MaintenanceJobDetailsList[i].MNJD_Date;
                //Cell4.innerHTML = "<a href='javascript:void(0)' class='btn btn-sm btn-round btn-danger' onclick='deleteRow(this)'; style='line-height:21px;height:24px;min-width:24px'><i class='ti ti-x ti-xs me-1'></i></a>";
                var row= row+'<tr><td>'+data.MaintenanceJobDetailsList[i].MNJD_Frequency+'</td><td>'+data.MaintenanceJobDetailsList[i].MNJD_VisitCount+'</td><td>'+data.MaintenanceJobDetailsList[i].MNJD_Date+'</td><td><a href="javascript:void(0)" class="btn btn-sm btn-round btn-danger" onclick="deleteRow(this)"; style="line-height:21px;height:24px;min-width:24px"><i class="ti ti-x ti-xs me-1"></i></a></td></tr>'


            }

            $('#tblJobMaintPrev tbody').append(row);
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
function deleteRow(rowNo) {
    var par = rowNo.parentNode;
    while (par.nodeName.toLowerCase() != 'tr') {
        par = par.parentNode;
    }
    var agree = confirm("Are sure want to delete this record....!");
    if (agree) {
        $(rowNo).closest('tr').remove();
    }
    else {
        return false;
    }
}
$('#tgBudgetType').change(function () {

    if ($('#tgBudgetType').is(':checked')) {

        $('#txtBudget').prop('readonly', true);
        $('#txtBudget').val(0);

    } else {
        $('#txtBudget').prop('readonly', false);
        $('#txtBudget').val('');
    }
})

function ShowModalEditForMaintance()
{
    $('.clsdetails').attr("disabled", true);
    $('.clsDate').attr("disabled", true);
    PreviewMaintainceModal();
}
function PreviewMaintainceModal()
{
    var tblMaintdtl = document.getElementById('tblJobMaintPrev');
    var tblMaintListArr = [];
    for (var i = 1; i < tblMaintdtl.rows.length; i++) {
        tblMaintListArr.push({
            MNJD_Frequency: tblMaintdtl.rows[i].cells[0].innerHTML,
            MNJD_VisitCount: parseInt(tblMaintdtl.rows[i].cells[1].innerHTML),
            MNJD_Date: tblMaintdtl.rows[i].cells[2].innerHTML,
        });
    }
 
    $('#tblJobMaint tbody').html('');
    //var table = document.getElementById("tblJobMaint");

    for (var i = 0; i < tblMaintListArr.length; i++) {
     
        //var RNo;
        //var row = table.insertRow(RNo);
        //var Cell1 = row.insertCell(0);
        //var Cell2 = row.insertCell(1);
        //var Cell3 = row.insertCell(2);
        //var Cell4 = row.insertCell(3);

        //Cell1.innerHTML = tblMaintListArr[i].MNJD_Frequency;
        //Cell2.innerHTML =tblMaintListArr[i].MNJD_VisitCount;
        //Cell3.innerHTML = tblMaintListArr[i].MNJD_Date;
        //Cell4.innerHTML = "<a href='javascript:void(0)' class='btn btn-sm btn-round btn-danger' onclick='deleteRow(this)'; style='line-height:21px;height:24px;min-width:24px'><i class='ti ti-x ti-xs me-1'></i></a>";
        var row= row+'<tr><td>'+tblMaintListArr[i].MNJD_Frequency+'</td><td>'+tblMaintListArr[i].MNJD_VisitCount+'</td><td>'+tblMaintListArr[i].MNJD_Date+'</td><td><a href="javascript:void(0)" class="btn btn-sm btn-round btn-danger" onclick="deleteRow(this)"; style="line-height:21px;height:24px;min-width:24px"><i class="ti ti-x ti-xs me-1"></i></a></td></tr>'


    }
    $('#tblJobMaint tbody').append(row);
    $('#shareProject').modal('show');
}



//****************Start Date < End Date Always*************

$('#txtStartDate').on('change', function () {
    validateDates();
});

$('#txtEndDate').on('change', function () {
    validateDates();
});

function validateDates() {
    var valueFrom = $('#txtStartDate').val();
    var valueTo = $('#txtEndDate').val();
    $('#error-message').text('');
    $('.dtcls').css('border', '');
    // Check if both fields have values
    if (valueFrom && valueTo) {

        var dateFromParts = valueFrom.split('-');
        var dateToParts = valueTo.split('-');

        var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);
        var dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        if (dateFrom >= dateTo) {
            $('#error-message').text("start-date must be earlier from end-date..!");
            $('.dtcls').css('border', '1px solid red');
            $('#txtEndDate').val('');
        }
    }
}



function onLoadBudgtRetrive() {
    const budgthVal = $('#txtBudget').val();
    //console.log(budgthVal);

    // Format the value and set it in txtBudgetFormatted
    const formattedValue = formatCurrencyRetrive(budgthVal);
    $('#txtBudgetFormatted').val(formattedValue);
}