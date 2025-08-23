var UserLogoList = '';
var SMMLogoList = '';
var AcivityList = '';
var EntId = '';
var Id = 0;
var TaskList = '';
var AvailBudgte = 0;
var AvailBudgteTask = 0;
var AvailBudgteSMME = 0;
let shouldPreventChange = true;
var hdnBudget = 0;
"use strict";
var GlobData = [];
var seriseData = [];
var seriseLbl = [];
var sumFundBudget = 0;
var remaningPercentage = 0;
var projectId = 0;
var ActIdForTask = 0;
var headerRow = []
var hdnFyFilterId = 0;

var dataExpnd = [];
var dataBudget = [];
let counter = 1;

!(function () {
    $('#rdoCurrentSession').prop('checked', true);
    var xm = $("#ddlFundTypeSMME");
    var xt = $("#ddlSMME");
    var ma = $("#ddlTaskActivity");
    var fn = $("#ddlBudgetDistActivity");
    var fnt = $("#ddlBudgetDistTask");
    var fns = $("#ddlBudgetDistSMME");
    var x = $("#ddlEnterprise");
    var fy = $("#ddlFinancialYear");
    var fys = $("#ddlFinancialYearExpenditure");
    var fyfiltr = $("#ddlFinancialYearFilter");


    ma.length &&
      ma.each(function () {
          var ma = $(this);
          ma.wrap('<div class="position-relative"></div>'), ma.select2({ placeholder: "Select Activity", dropdownParent: ma.parent() });
      });

    xm.length &&
        xm.each(function () {
            var xm = $(this);
            xm.wrap('<div class="position-relative"></div>'), xm.select2({ placeholder: "Select Fund", dropdownParent: xm.parent() });
        });

    xt.length &&
        xt.each(function () {
            var xt = $(this);
            xt.wrap('<div class="position-relative"></div>'), xt.select2({ placeholder: "Select SMME", dropdownParent: xt.parent() });


        });

    fn.length &&
       fn.each(function () {
           var fn = $(this);
           fn.wrap('<div class="position-relative"></div>'), fn.select2({ placeholder: "Select Fund Name", dropdownParent: fn.parent() });
       });

    fnt.length &&
       fnt.each(function () {
           var fnt = $(this);
           fnt.wrap('<div class="position-relative"></div>'), fnt.select2({ placeholder: "Select Fund Name", dropdownParent: fnt.parent() });
       });

    fns.length &&
       fns.each(function () {
           var fns = $(this);
           fns.wrap('<div class="position-relative"></div>'), fns.select2({ placeholder: "Select Fund Name", dropdownParent: fns.parent() });
       });

    x.length &&
      x.each(function () {
          var x = $(this);
          x.wrap('<div class="position-relative"></div>'), x.select2({ placeholder: "Enterprise", dropdownParent: x.parent() });
      });

    fy.length &&
      fy.each(function () {
          var fy = $(this);
          fy.wrap('<div class="position-relative"></div>'), fy.select2({ placeholder: "Select Date", dropdownParent: fy.parent() });
      });

    fys.length &&
       fys.each(function () {
           var fys = $(this);
           fys.wrap('<div class="position-relative"></div>'), fys.select2({ placeholder: "Financial Year", dropdownParent: fys.parent() });
       });

    fyfiltr.length &&
        fyfiltr.each(function () {
            var fyfiltr = $(this);
            fyfiltr.wrap('<div class="position-relative"></div>'), fyfiltr.select2({ placeholder: "Financial Year", dropdownParent: fyfiltr.parent() });
        });

    if ($('#hdnFyFilterId').val() > 0) {
        $('.disAble').prop('disabled', false);
    } else {
        $('.disAble').prop('disabled', true);
    }

    Id = getParameterByName('Id');
    projectId = Id;
    var Type = getParameterByName('Type');

    $('tr.header').click(function () {
        $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
    });

    FinancialYear("#ddlFinancialYearFilter", Id);


    if (Id > 0) {
        retrive(Id);
        retriveFundDetails(Id);
        retriveFundDistribution(Id);
        //$('#rdoCurrentSession').prop('checked', true).trigger('change');

    }

})();


$(document).ready(function () {

    //if ($('#hdnFyFilterId').val() > 0) {
    //    $('.disAble').prop('disabled', false);
    //} else {
    //    $('.disAble').prop('disabled', true);
    //}

    //Id = getParameterByName('Id');
    //projectId = Id;
    //var Type = getParameterByName('Type');
  
    //$('tr.header').click(function () {
    //    $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
    //});

    //FinancialYear("#ddlFinancialYearFilter", Id);


    //if (Id > 0) {
    //    retrive(Id);
    //    retriveFundDetails(Id);
    //    retriveFundDistribution(Id);
    //    $('#retriveReportBtn').trigger('click');
    //    $('#rdoCurrentSession').prop('checked', true).trigger('change');

    //}

    //retriveprojectbudget(Id);

   
});


// On checkbox change
$('#rdoCurrentSession').on('change', function () {
    if ($(this).is(':checked')) {
        $('#ddlFinancialYearExpenCustom').find('option').remove();
        $('#ddlBudgetDistSMMECustom').find('option').remove();

        retriveBudgetData(Id);
        retriveExpenditureData(Id);
        setTimeout(function () {
            retriveExpenditureReport();
        }, 5000);
    }
});

$("#ddlFinancialYearExpenditure").change(function () {
    var hdnFyExpenditureId = $("#ddlFinancialYearExpenditure").val();
    $('#hdnFyExpenditureId').val(hdnFyExpenditureId);

    $('#tblSMME tbody').html('');
    $('.txSMME').val('');
    $('.txSMMESpan').text('');

    var fytt = $(".ddlBudgetDistTask");
    fytt.length &&
      fytt.each(function () {
          var fytt = $(this);
          fytt.wrap('<div class="position-relative"></div>'), fytt.select2({ placeholder: "Budget Distribution", dropdownParent: fytt.parent() });
      });


    $('#ddlBudgetDistSMME').find('option').remove();
    $('#ddlTaskActivitySMME').find('option').remove();
    $('#ddlTaskSMME').find('option').remove();

    $('#ddlSMME').val(0).change();

    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id),
        PId1: $("#ddlFinancialYearExpenditure").val(),
        ColumnName1: 'PBD_FinancialYearId',
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
    DropdownBinder.Execute();

});

$('#ddlFinancialYearFilter').on('change', function () {

    $('#ddlFinancialYearExpenCustom').find('option').remove();
    $('#ddlBudgetDistSMMECustom').find('option').remove();

    $('#customSessionRow').slideUp();
    $('#tblSMMEExpendi tbody').html('');
    $('#tblSMMEExpendi thead tr:nth-child(1)').html('');
    $('#tblSMMEExpendi thead tr:nth-child(2)').html('');
    hdnFyFilterId = $("#ddlFinancialYearFilter").val();
    ////console.log(hdnFyFilterId);
    $('#hdnFyFilterId').val(hdnFyFilterId);

    LoaderStart('#pBudgetblock');
    counter = 2;

    $(".chkFilter").prop('disabled', true);
    $('.chkFilter').prop('checked', false);
    $('#rdoCurrentSession').prop('checked', true);

    retrive(Id);
    retriveFundDetails(Id);
    retriveFundDistribution(Id);
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function deleteconfirmBoxClickForSMME(rowNo) {
    var id = $(rowNo).closest('table').attr('id');
    Swal.fire({
        title: "Do you want to Delete this Setup?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: !0,
        confirmButtonText: "Yes, Do it!",
        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then((result) => {

        if (result.isConfirmed) {
            // Get the deleted row amount
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(1) input[type='text']").val());

            // Get the deleted row expenditure amount
            var deletedRowExpAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(2) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(2) input[type='text']").val());

            // Remove the row
            $(rowNo).closest('tr').remove();

            // Initialize totals
            var TotalAmt = 0;
            var TotalExpAmt = 0;

            if (id == 'tblSMME') {
                // Calculate new totals for both Budget and Expenditure
                $.each($('#tblSMME tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(1) input[type='text']").val());
                    TotalExpAmt += isNaN(parseFloat($(this).find("td:eq(2) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(2) input[type='text']").val());
                });
            }

            // Update Total Available Budget and Expenditure
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetTaskSMME').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            var currentTotalAvailableBudgetExpen = parseFloat($('#txtTotalAvailableBudgetTaskSMME').val()) || 0;
            var newTotalAvailableBudgetExpens = currentTotalAvailableBudgetExpen + deletedRowExpAmount;

            //  $('#txtTotalAvailableBudgetTaskSMME').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivitySMME').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivitySMME').val(TotalAmt);

            // Update the total expenditures field
            $('#txtsumAllocatedBudgtActivitySMMEExpenses').val(TotalExpAmt);
            $('#hdnsumAllocatedBudgtHdnActivitySMMEExpenses').val(TotalExpAmt);

            // Disable the Save button if total expenditure is zero or less
            if (parseFloat($('#txtsumAllocatedBudgtActivitySMMEExpenses').val()) <= 0) {
                $('#saveBtnSMME').prop("disabled", true);
            } else {
                $('#saveBtnSMME').prop("disabled", false);
            }
        }
    });
}

function cellAmntChngeForSMMEBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;
    var totalSMMEAmount = 0;

    $('#tblSMME tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        totalSMMEAmount += activityAmount;
    });

    if (totalSMMEAmount > activityAmount) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + activityAmount,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        $(input).val(0);

        totalSMMEAmount = 0;
        $('#tblSMME tbody tr').each(function () {
            var activityAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
            totalSMMEAmount += activityAmount;
        });

        totalBudgetShow = activityAmount - totalSMMEAmount;
        $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

        return false;
    }

    $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

}

function cellAmntChngeForExpenditureBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;
    var totalSMMEAmount = 0;
    // var activityAmount = 0;
    var projAmnt = 0;
    var expendiAmnt = 0;

    $('#tblSMME tbody tr').each(function () {
        projAmnt = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        expendiAmnt = parseFloat($(this).find("td:eq(2) input[type='text']").val()) || 0;// a = 1000      c = a-b = 500
        if (expendiAmnt > projAmnt) {
            Swal.fire({
                title: "Oops..!",
                text: 'Amount Should Be Less Than ' + projAmnt,
                icon: 'error',
                customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
                buttonsStyling: false
            });

            $(input).val(0);
        }



        var activityAmount = parseFloat($(this).find("td:eq(2) input[type='text']").val()) || 0;
        totalSMMEAmount += activityAmount;
    });


    //if (totalSMMEAmount > projAmnt) {
    //    Swal.fire({
    //        title: "Oops..!",
    //        text: 'Amount Should Be Less Than ' + projAmnt,
    //        icon: 'error',
    //        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
    //        buttonsStyling: false
    //    });

    //    $(input).val(0);

    //    totalSMMEAmount = 0;
    //    $('#tblSMME tbody tr').each(function () {
    //        var activityAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
    //        totalSMMEAmount += activityAmount;
    //    });

    //    totalBudgetShow = projAmnt - totalSMMEAmount;
    //    $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

    //    return false; 
    //}

    $('#txtsumAllocatedBudgtActivitySMMEExpenses').val(totalSMMEAmount);
}

//////////////////////////////////////////////////////////////////////////////////Budget For SMME//////////////////////////////////////////////////////////////////////////////

$('#ddlFundTypeSMME').on('change', function () {
    if (this.value > 0) {
        fundWiseAvailBudgetSMME(this.value);

    }
});

function fundWiseAvailBudgetSMME(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),

            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            var totalallocatMoney = 0;
            var totalavalfundtbl = 0;
            var table = document.getElementById("tblSMME");
            var rows = table.getElementsByTagName("tr")
            if (rows.length > 1) {
                $('#tblSMME tbody tr').each(function (i, row) {
                    $(this).find('select.ddlFundTypeSMMETbl' + fundtype).each(function () {

                        totalallocatMoney = totalallocatMoney + parseInt($(".tblSMMEFund" + fundtype).val());
                        totalavalfundtbl = parseInt($(".hdnAvailSMMEAmntTbl" + fundtype).val());

                    })
                });
            }
            if (data[0].PBD_AvailbleBudget > 0) {

                AvailBudgteSMME = (totalavalfundtbl > 0 ? totalavalfundtbl : data[0].PBD_AvailbleBudget);
                $('#txtAvailableFundSMME').val((AvailBudgteSMME));
                $('#hdnAvailableFundSMME').val((AvailBudgteSMME));
                $('.txtAvailSMMEAmntTbl' + fundtype).val((AvailBudgteSMME));
                $('#btnAddSMMEBudget').removeAttr('disabled');
            } else {
                $('#txtAvailableFundSMME').val(0);
                $('#hdnAvailableFundSMME').val(0);
                $('#btnAddSMMEBudget').attr('disabled', 'disabled');
            }
            ////////console.log('availbe '+AvailBudgte);
            ////////console.log('total '+totalallocatMoney);
            ////////console.log('db '+data[0].PBD_AvailbleBudget);
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function cellAmntForSMMEBudget(t) {
    var txtTotalTaskSMMEBudget = $('#txtTotalTaskBudgetSMME').val()   //($('#txtTotalActivityBudget').val().substring(1)); //  -- A  1000
    var totalSMMEAmount = 0;  // --B
    $('#tblSMME tbody tr').each(function () {
        var smmeAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        totalSMMEAmount += smmeAmount;
    });

    var calculateValue = txtTotalTaskSMMEBudget - totalSMMEAmount  // - C

    var SmmeAmnt = t.value;  // -- D

    if (SmmeAmnt > calculateValue) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + txtTotalTaskSMMEBudget,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $("#txtSMMEAmnt").val(0).focus();
        return false;
    }
}

function cellAmntFortxtExpensesAmntBudget(t) {
    var txtTotalSMMEBudget = parseFloat($('#txtSMMEAmnt').val());   // Total MSME Budget
    var txtExpensesAmnt = parseFloat(t.value);  // Expenses entered by the user

    // Ensure valid numbers are entered
    if (isNaN(txtExpensesAmnt) || txtExpensesAmnt < 0) {
        Swal.fire({
            title: "Oops..!",
            text: 'Please enter a valid expenditure amount.',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
        return false;
    }

    // Check if the entered expenditure exceeds the budget
    if (txtExpensesAmnt > txtTotalSMMEBudget) {
        Swal.fire({
            title: "Oops..!",
            text: 'Expenditure amount should be less than ' + txtTotalSMMEBudget + '',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
        $("#txtExpensesAmnt").val(0).focus(); // Reset the expenditure field
        return false;
    }
}

function AddSMMEBudgetExpenses() {
    var actsmme = 0;
    var tasksmme = 0;
    var smme = 0;
    $.each($('#tblSMME tbody tr'), function (index, value) {
        if ((parseInt($('#ddlSMME').val()) == parseInt($(this).find("td:eq(0) option:selected").val()))) {
            smme = 1;
        }
    });

    if (smme == 1) {
        Swal.fire({
            title: "Oops..!",
            text: 'Same MSME already exists',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    smme = 0
    actsmme = 0;
    tasksmme = 0;
    var totalRowCount = 0;
    var rowCount = 0;
    var txtsumAllocatedBudgtForSMME = 0;
    var table = document.getElementById("tblSMME");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var m = (rows.length);
    tr = $('<tr/>');

    tr.append("<td> <select id='ddlSMMETbl_" + m + "' name='ddlSMMETbl_" + m + "' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtSMMEDate').val() + "' class='form-control' name='txtSMMEDate_" + m + "' id='txtSMMEDate_" + m + "'></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtSMMEDesc').val() + "' class='form-control' name='txtSMMEDesc_" + m + "' id='txtSMMEDesc_" + m + "'></td>");

    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtSMMEAmnt').val() + "'    class='form-control tblSMMEFund" + $('#ddlFundTypeSMME').val() + "' name='txtAmntSMME_" + m + "' id='txtAmntSMME_" + m + "' onkeyup='cellAmntChngeForSMMEBudget(this)' disabled><input type='hidden'   name='hdnTotalAvailSMMEAmnt_" + m + "' id='hdnTotalAvailSMMEAmnt_" + m + "' class='hdnTotalAvailSMMEAmntTbl" + $('#ddlFundTypeSMME').val() + "' disabled></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtExpensesAmnt').val() + "'    class='form-control tblSMMEFund" + $('#ddlFundTypeSMME').val() + "' name='txtAmntSMME_" + m + "' id='txtAmntSMME_" + m + "' onkeyup='cellAmntChngeForExpenditureBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailSMMEAmnt_" + m + "' id='hdnTotalAvailSMMEAmnt_" + m + "' class='hdnTotalAvailSMMEAmntTbl" + $('#ddlFundTypeSMME').val() + "' disabled></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistSMME').val() + "' name='hdnBudgetDistSMME_" + m + "' id='hdnBudgetDistSMME_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskActivitySMME').val() + "' name='hdnActivity_" + m + "' id='hdnActivity_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskSMME').val() + "' name='hdnTask_" + m + "' id='hdnTask_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlFinancialYearExpenditure').val() + "' name='hdnFinancialYearExpenditure_" + m + "' id='hdnFinancialYearExpenditure_" + m + "'/></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
    $('#tblSMME tbody').append(tr);

    var txtActAmnt = parseInt($('#txtSMMEAmnt').val());
    var txtsum = parseInt($('#txtsumAllocatedBudgtActivitySMME').val());
    if (isNaN(txtsum)) {
        $('#txtsumAllocatedBudgtActivitySMME').val(txtActAmnt);
        $('#hdnsumAllocatedBudgtHdnActivitySMME').val(txtActAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivitySMME').val(txtActAmnt + txtsum);
        $('#hdnsumAllocatedBudgtHdnActivitySMME').val(txtActAmnt + txtsum);
    }


    var txtExpensessAmnt = parseInt($('#txtExpensesAmnt').val());
    var txtExpensum = parseInt($('#txtsumAllocatedBudgtActivitySMMEExpenses').val());
    if (isNaN(txtExpensum)) {
        $('#txtsumAllocatedBudgtActivitySMMEExpenses').val(txtExpensessAmnt);
        $('#hdnsumAllocatedBudgtHdnActivitySMMEExpenses').val(txtExpensessAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivitySMMEExpenses').val(txtExpensessAmnt + txtExpensum);
        $('#hdnsumAllocatedBudgtHdnActivitySMMEExpenses').val(txtExpensessAmnt + txtExpensum);
    }

    var AvlBudgt = ($('#hdnTotalAvailableBudgetTaskSMME').val() - $('#hdnsumAllocatedBudgtHdnActivitySMMEExpenses').val())
    var drpSmme = $('#ddlSMMETbl_' + m + '');

    drpSmme.length &&
        drpSmme.each(function () {
            var drpSmme = $(this);
            drpSmme.wrap('<div class="position-relative"></div>'), drpSmme.select2({ placeholder: "Select A SMME", dropdownParent: drpSmme.parent() });
        });

    DropdownBinderJoin.DDLData = {
        tableName1: "ProjectWiseSmme_PSM",
        tableName2: "SMMERegistration_SMME",
        Text: 'SMME_CompanyName',
        Value: 'PSM_SmmeId',
        ColumnName1: 'SMME_Id',
        ColumnName: 'PSM_SmmeId',
        Param: 'PSM_ProjectId',
        PId: Id
    };
    DropdownBinderJoin.DDLElem = $('#ddlSMMETbl_' + m + '');
    DropdownBinderJoin.Execute();
    $('#ddlSMMETbl_' + m + '').val($('#ddlSMME').val()).change();
    $('.txtModal').val('');
    $('#ddlSMME').val(0).change();

    if (parseFloat($('#txtsumAllocatedBudgtActivitySMME').val()) <= 0) {
        $('#saveBtnSMME').prop("disabled", true);
    } else {
        $('#saveBtnSMME').prop("disabled", false);
    }

    $('#btnAddSMMEBudget').attr('disabled', 'disabled');
}

function SaveBudgetDetailsForSMME() {

    var totalAmntTabl = 0;
    var ExpenditureBudgetArr = [];
    $.each($('#tblSMME tbody tr'), function (index, value) {

        ExpenditureBudgetArr.push({
            EWB_SMMEId: parseInt($(this).find("td:eq(0) option:selected").val()),
            EWB_ExpenditureDate: $(this).find("td:eq(1) input[type='text']").val(),
            EWB_ExpenditureDescription: $(this).find("td:eq(2) input[type='text']").val(),
            EWB_Budget: parseFloat($(this).find("td:eq(3) input[type='text']").val()),
            EWB_ExpenditureBudget: parseFloat($(this).find("td:eq(4) input[type='text']").val()),
            EWB_BudgetDistId: parseInt($(this).find("td:eq(5) input[type='hidden']").val()),
            EWB_ActivityId: parseInt($(this).find("td:eq(6) input[type='hidden']").val()),
            EWB_TaskId: parseInt($(this).find("td:eq(7) input[type='hidden']").val()),
            EWB_FinancialYearId: parseInt($(this).find("td:eq(8) input[type='hidden']").val())
        });
    });

    var _data = JSON.stringify({
        entity: {
            ExpenditureWiseBudgetList: ExpenditureBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForSMMEExpenditure',
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#modalExpenditure').modal('hide');
                        $('.txtEmpFld').val('');
                        $('#tblSMME tbody').html('');
                        window.location.reload()
                    }
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
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

function retriveSMMEBudgetDetails(Id, acId, taskId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEBudgetExpenditure',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'TaskId',
            param3Value: parseInt(taskId),
            param4: 'PBD_Id',
            param4Value: parseInt($('#ddlBudgetDistSMME').val()),
            param5: 'FinancialYearId',
            param5Value: parseInt($('#ddlFinancialYearExpenditure').val()),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#section-blockBudgetExpenditure");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetExpenditure");
        },

        success: function (data) {
            data = JSON.parse(data);
            //////console.log('SMME Data dgdh-   ', data);

            // $('#tblSMME tbody').html('');
            var TotalBudgtForSMME = 0;
            var TotalBudgtForSMMEExpences = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblSMME");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;

                tr = $('<tr/>');
                tr.append("<td><select id='ddlSMMETbl_" + (i + 1) + "' name='ddlSMMETbl_" + (i + 1) + "' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input type='text' value ='" + data[i].EWB_ExpenditureDate + "' name='txtDate_" + (i + 1) + "' id='txtDate_" + (i + 1) + "' class='form-control txtDate" + data[i].EWB_BudgetDistId + "' ></td>");
                tr.append("<td ><input type='text' value ='" + data[i].EWB_ExpenditureDescription + "' name='txtDescription_" + (i + 1) + "' id='txtDescription_" + (i + 1) + "' class='form-control txtDescription" + data[i].EWB_BudgetDistId + "' ></td>");

                tr.append("<td style='width:20%;'><input type='text' value ='" + data[i].EWB_Budget + "'    class='form-control tblSMMEFund" + data[i].EWB_BudgetDistId + "' name='txtAmntSMME_" + (i + 1) + "' id='txtAmntSMME_" + (i + 1) + "' onkeyup='cellAmntChngeForSMMEBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)' disabled></td>");
                tr.append("<td style='width:20%;'><input type='text' value ='" + data[i].EWB_ExpenditureBudget + "'    class='form-control tblSMMEFund" + data[i].EWB_BudgetDistId + "' name='txtAmntSMME_" + (i + 1) + "' id='txtAmntSMME_" + (i + 1) + "' onkeyup='cellAmntChngeForExpenditureBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].EWB_BudgetDistId + "' name='hdnBudgetDistSMME_" + i + "' id='hdnBudgetDistSMME_" + i + "' class='form-control txtDescription" + data[i].EWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].EWB_ActivityId + "' name='hdnSMME_" + i + "' id='hdnSMME_" + i + "' class='form-control txtDescription" + data[i].EWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].EWB_TaskId + "' name='hdnTaskSMME_" + i + "' id='hdnTaskSMME_" + i + "' class='form-control txtDescription" + data[i].EWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].EWB_FinancialYearId + "' name='hdnFinancialYearId_" + i + "' id='hdnFinancialYearId_" + i + "' class='form-control FinancialYearId" + data[i].EWB_FinancialYearId + "'/></td>");
                tr.append("<td style='text-align:center'><button  onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
                $('#tblSMME tbody').append(tr);

                TotalBudgtForSMME = TotalBudgtForSMME + data[i].EWB_Budget;
                TotalBudgtForSMMEExpences = TotalBudgtForSMMEExpences + data[i].EWB_ExpenditureBudget;


                var drpSMME = $('#ddlSMMETbl_' + (i + 1) + '');

                drpSMME.length &&
                   drpSMME.each(function () {
                       var drpSMME = $(this);
                       drpSMME.wrap('<div class="position-relative"></div>'), drpSMME.select2({ placeholder: "Select A SMME", dropdownParent: drpSMME.parent() });
                   });

                DropdownBinderJoin.DDLData = {
                    tableName1: "ProjectWiseSmme_PSM",
                    tableName2: "SMMERegistration_SMME",
                    Text: 'SMME_CompanyName',
                    Value: 'PSM_SmmeId',
                    ColumnName1: 'SMME_Id',
                    ColumnName: 'PSM_SmmeId',
                    Param: 'PSM_ProjectId',
                    PId: Id
                };
                DropdownBinderJoin.DDLElem = $('#ddlSMMETbl_' + (i + 1) + '');
                DropdownBinderJoin.Execute();

                $('#ddlSMMETbl_' + (i + 1) + '').val(data[i].EWB_SMMEId).change();
                $('#ddlSMME').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgSMME').modal('show');
            }

            $('#txtsumAllocatedBudgtActivitySMME').val(TotalBudgtForSMME);
            $('#hdnsumAllocatedBudgtHdnActivitySMME').val(TotalBudgtForSMME);

            $('#txtsumAllocatedBudgtActivitySMMEExpenses').val(TotalBudgtForSMMEExpences);
            $('#hdnsumAllocatedBudgtHdnActivitySMMEExpenses').val(TotalBudgtForSMMEExpences);


            if (parseFloat($('#txtsumAllocatedBudgtActivitySMMEExpenses').val()) <= 0) {
                $('#saveBtnSMME').prop("disabled", true);
            } else {
                $('#saveBtnSMME').prop("disabled", false);
            }

        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

function retriveSMMEBudget(Id, taskId, smmeId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudgetForSMMEBudget',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'TaskId',
            param2Value: parseInt(taskId),
            param3: 'SMMEId',
            param3Value: parseInt(smmeId),
            param4: 'FinancialYearId',
            param4Value: parseInt($('#ddlFinancialYearExpenditure').val()),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            try {
                data = JSON.parse(data);

                //////console.log('SMME Taka ',data);

                if (Array.isArray(data) && data.length > 0) {
                    $('#txtSMMEAmnt').val(data[0].SWB_Budget);
                    $('#hdnSMMEAmnt').val(data[0].SWB_Budget);
                } else {
                    $('#txtSMMEAmnt').val(0);
                    $('#hdnSMMEAmnt').val(0);

                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtSMMEAmnt').val(0);
                $('#hdnSMMEAmnt').val(0);
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: parseInt(id),
            //param2: 'FinancialYearId',
            //param2Value: parseInt($('#ddlFinancialYearFilter').val()),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#section-blockBgtAmt");
        //},
        //complete: function () {
        //    LoaderEnd("#section-blockBgtAmt");
        //},

        success: function (data) {
            /// data = JSON.parse(data);
            try {
                data = JSON.parse(data);

                //////console.log('SMME Taka ',data);

                if (Array.isArray(data) && data.length > 0) {
                    console.log("filter data- ", data);

                    $('#hdnBdgtType').val(data[0].BT_Type);
                   
                    hdnBudget = data[0].PD_Budget;
                    sumFundBudget = data[0].PD_Budget;
                    $('#hdnBudget').val(data[0].PD_Budget);
                    $('#totalbudget').html(data[0].PD_Budget);
                    $('#totalUnallocatedBudget').html(data[0].unallocatedBudget);
                    // Currency Format
                    formatToZAR(data[0].PD_Budget, '#totalbudgetFormeted');
                    formatToZAR(data[0].unallocatedBudget, '#totalUnallocatedBudget');

                } else {
                    $('#hdnBdgtType').val(0);
                    $('#hdnBudget').val(0);
                    $('#totalbudget').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#hdnBdgtType').val(0);
                $('#hdnBudget').val(0);
                $('#totalbudget').val(0);
            }
          
            //$('#ddlFinancialYearExpenCustom').find('option').remove();
            //$('#ddlBudgetDistSMMECustom').find('option').remove();
            $('#retriveReportBtn').trigger('click');

            //retriveBudgetHeader(Id)
            //retriveBudgetData(Id);
            //retriveExpenditureData(Id);
            //setTimeout(function () { console.log('I will run after 20 seconds'); retriveExpenditureReport(); }, 20000);


            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 20);
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


$("#btnAllocateExpenses").click(function () {

    $('#ddlFinancialYearExpenditure').find('option').remove();

    // DropdownBinder.DDLData = {
    //    tableName: "FinancialYearMaster_FM",
    //    Text: 'FM_Name',
    //    Value: 'FM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFinancialYearExpenditure");
    //DropdownBinder.Execute();

    $('#ddlBudgetDistSMME').find('option').remove();
    $('#ddlTaskActivitySMME').find('option').remove();
    $('#ddlTaskSMME').find('option').remove();
    // $('#ddlSMME').find('option').remove();

    //DropdownBinder.DDLData = {
    //    tableName: "ProjectBudgetDetails_PBD",
    //    Text: 'PBD_FundName',
    //    Value: 'PBD_Id',
    //    ColumnName: 'PBD_ProjectId',
    //    PId: parseInt(Id)
    //};
    //DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
    //DropdownBinder.Execute();

    FinancialYear('#ddlFinancialYearExpenditure', Id);
    $('#tblSMME tbody').html('');
    $('.txSMME').val('');
    $('.txSMMESpan').text('');

    $('#modalBudgSMME').modal('show');
    //var totalbudget = $('#totalbudget').text();
    //$('#txtTotalProjectBudgetSMME').val(totalbudget);
});




let previousBudgetDistSMMEValue = $('#ddlBudgetDistSMME').val();

// Capture the current value before change
$('#ddlBudgetDistSMME').on('focus', function () {
    previousBudgetDistSMMEValue = $(this).val();
});

$('#ddlBudgetDistSMME').on('change', function () {
    const $this = $(this);
    const selectedValue = $this.val();

    if ($('#txtTotalProjectBudgetSMME').val() > 0) {
        // Temporarily stop further logic until user confirms
        Swal.fire({
            title: "Do you want to change this Period?",
            text: "You have unsaved changes. If you change now, all progress will be lost!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Do it!",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: "btn btn-danger me-3 waves-effect waves-light",
                cancelButton: "btn btn-label-secondary waves-effect waves-light"
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear values
                $('.onchngClr').val('');
                $('.oncngClrSMMESpn').text('');

                // Rebind dropdown
                DropdownBinder.DDLData = {
                    tableName: "ProjectBudgetDetails_PBD",
                    Text: 'PBD_FundName',
                    Value: 'PBD_Id',
                    ColumnName: 'PBD_ProjectId',
                    PId: parseInt(Id),
                    PId1: $("#ddlFinancialYearAct").val(),
                    ColumnName1: 'PBD_FinancialYearId',
                };
                DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
                DropdownBinder.Execute();

                // Enable/disable input
                if (parseFloat($('#txtTotalBudgetForSpacificFundSMME').val()) <= 0) {
                    $('#txtSMMEAmnt').prop("disabled", true);
                } else {
                    $('#txtSMMEAmnt').prop("disabled", false);
                }

                $('#ddlTaskSMME').find("option").remove();
                $('#ddlSMME').find("option").remove();
                fundWiseBudgetDistributionDetailsSMME(selectedValue);

                // Update previous value to current after confirmation
                previousBudgetDistSMMEValue = selectedValue;
            } else {
                // Revert back to previous selection (cancel case)
                $this.val(previousBudgetDistSMMEValue);
                // If you're using Select2, also trigger UI update:
                $this.trigger('change.select2');
            }
        });
    } else {
        // No confirmation needed
        if (parseFloat($('#txtTotalBudgetForSpacificFundSMME').val()) <= 0) {
            $('#txtSMMEAmnt').prop("disabled", true);
        } else {
            $('#txtSMMEAmnt').prop("disabled", false);
        }
        $('#ddlSMME').find("option").remove();
        fundWiseBudgetDistributionDetailsSMME(selectedValue);

        // Update previous value since no confirmation dialog was shown
        previousBudgetDistSMMEValue = selectedValue;
    }
});

//$('#ddlBudgetDistSMME').on('change', function () {

//    ////////$('#ddlTaskActivitySMME').find('option').remove();
//    ////////$('#ddlTaskSMME').find('option').remove(); 

//    //////$('#tblSMME tbody').html('');
//    //////$('.txSMME').val('');
//    //////$('.txSMMESpan').text('');

//    fundWiseBudgetDistributionDetailsSMME($('#ddlBudgetDistSMME').val());
//});

$('#txtSMMEAmnt').on('change', function () {
    if (parseFloat($('#txtSMMEAmnt').val()) <= 0) {
        $('.AddSMMEBtn').prop("disabled", true);
    } else {
        $('.AddSMMEBtn').prop("disabled", false);
    }
});

function retriveFundDistribution(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectFundWiseBudget',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#hdnFyFilterId').val()),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#section-blockBgtExpendiFundeibution");
        //    LoaderStart(".section-blockBgtUnAllocatedBudget");
        //},
        //complete: function () {
        //    LoaderEnd("#section-blockBgtExpendiFundeibution");
        //    LoaderEnd(".section-blockBgtUnAllocatedBudget");
        //},

        success: function (data) {
            data = JSON.parse(data);

            console.log('Fund disribution- ', data);

            var div = '';
            //   var tblFund = '';
            var totalfund = 0;
            var totalbudget = $('#totalbudget').text();
            var totalUnallocatedBudget = 0;

            $('#divfundDistribution').html('');
            //  $('#tblFund tbody').html('');
            // var count = (data.length > 4) ? 4 : data.length;
            var count = (data.length);
            for (var i = 0; i < count; i++) {
                div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><small>' + data[i].PBD_FundName + '</small><h5 class="mb-0" style="display: inline-block; width: 120px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + data[i].PBD_Amount + '</h5></div></div></div>';
                seriseData.push(data[i].PBD_Amount);
                seriseLbl.push(data[i].PBD_FundName);
                totalfund = totalfund + data[i].PBD_AmountUnFormat;

            }

            totalUnallocatedBudget = (totalbudget - totalfund);

            $('#totalUnallocatedBudget').html(formatToZAR(totalUnallocatedBudget, '#totalUnallocatedBudget'));

            $('#divfundDistribution').append(div);


            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 20);
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

function SidePopUpForShowFund() {
    $('#viewFundPopUp').addClass('show');
}

function SidePopUpForShowFundClose() {
    $('#viewFundPopUp').removeClass('show');
}

function retriveFundDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectFundWiseBudgetAllocation',
            param1: 'PBFD_ProjectId',
            param1Value: parseInt(id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#hdnFyFilterId').val()),
            StoreProcedure: 'ProjectBudgetFundDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#section-blockBgtExpendiFunders");
        //},
        //complete: function () {
        //    LoaderEnd("#section-blockBgtExpendiFunders");
        //},

        success: function (data) {
            data = JSON.parse(data);

            console.log('Top 4 Fund-', data);

            var div = '';
            var tblFund = '';
            var totalfund = 0;
            $('#divfund').html('');
            $('#tblFund tbody').html('');
            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < count; i++) {
                div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBFD_TotalAmount + '</h5><h6 class="mb-1">' + data[i].FT_Type + '</h6><small  style="display: inline-block; width: 120px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + data[i].ENR_CompanyName + '</small></div></div></div>';
                seriseData.push(data[i].PBFD_TotalAmount);
                seriseLbl.push(data[i].FT_Type);
                totalfund = totalfund + data[i].PBFD_TotalAmount;

            }
            for (var j = 0; j < data.length; j++) {
                tblFund = tblFund + '<tr><td> <div class="d-flex align-items-center"> <div class="d-flex flex-column"><h6 class="mb-0">' + data[j].ENR_CompanyName + '</h6><small>' + data[j].FT_Type + '</small></div></div></td><td class="text-end"><div class="user-progress"> <p class="mb-0 fw-medium" style="display: inline-block; width: 180px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + data[j].PBFD_TotalAmount + '</p></div> </td><tr/>'
            }

            remaningPercentage = isNaN(parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget)) == true ? 0 : parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget);
            $('#divfund').append(div);
            $('#tblFund > tbody').append(tblFund);

            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 20);
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

function fundWiseBudgetDistributionDetailsSMME(pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(pbdId),
            param3: 'FinancialYearId',
            param3Value: parseInt($('#hdnFyExpenditureId').val()),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        beforeSend: function () {
            LoaderStart("#section-blockBudgetExpenditure");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetExpenditure");
        },

        success: function (data) {
            // data = JSON.parse(data);
            try {
                data = JSON.parse(data);

                if (Array.isArray(data) && data.length > 0) {
                    $('.txtPeriodSMME').text(data[0].PBD_FundName);
                    $('#txtTotalProjectBudgetSMME').val($('#totalbudget').text())
                    $('#txtTotalBudgetForSpacificFundSMME').val(data[0].PBD_Amount);
                } else {
                    $('#txtTotalProjectBudgetSMME').val(0);
                    $('#txtTotalBudgetForSpacificFundSMME').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalProjectBudgetSMME').val(0);
                $('#txtTotalBudgetForSpacificFundSMME').val(0);
            }


            $('#ddlTaskActivitySMME').find('option').remove();

            DropdownBinder.DDLData = {
                tableName: "CreateActivity_CA",
                Text: 'CA_ActivityName',
                Value: 'CA_Id',
                ColumnName: 'CA_ProjectId',
                PId: Id
            };
            DropdownBinder.DDLElem = $('#ddlTaskActivitySMME');
            DropdownBinder.Execute();


        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function fundWiseBudgetActivityDetailsForSMME(Id, acId, pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForActivityDetailsForSMME',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'PBD_Id',
            param3Value: parseInt(pbdId),
            param4: 'FinancialYearId',
            param4Value: parseInt($('#ddlFinancialYearExpenditure').val()),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        beforeSend: function () {
            LoaderStart("#section-blockBudgetExpenditure");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetExpenditure");
        },

        success: function (data) {
            try {
                data = JSON.parse(data);

                if (Array.isArray(data) && data.length > 0) {

                    $('.txtActivityLabelSMME').text(data[0].ActivityNameSMME);
                    $('#txtTotalActivityBudgetSMME').val(data[0].AWB_BudgetSMME);
                    $('#txtTotalAvailableBudgetSMME').val(data[0].TWB_AvailableBudgetSMME);
                    $('#hdnTotalActivityBudgetSMME').val(data[0].TWB_AvailableBudgetSMME);
                } else {
                    $('#txtTotalActivityBudgetSMME').val(0);
                    $('#txtTotalAvailableBudgetSMME').val(0);
                    $('#hdnTotalActivityBudgetSMME').val(0);
                }

                //Onchange Task in SMME



            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalActivityBudgetSMME').val(0);
                $('#txtTotalAvailableBudgetSMME').val(0);
                $('#hdnTotalActivityBudgetSMME').val(0);
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

function fundWiseBudgetTaskDetails(Id, ActId, taskId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForTaskDetails',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(ActId),
            param3: 'TaskId',
            param3Value: parseInt(taskId),
            param4: 'FinancialYearId',
            param4Value: parseInt($('#ddlFinancialYearExpenditure').val()),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        beforeSend: function () {
            LoaderStart("#section-blockBudgetExpenditure");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetExpenditure");
        },

        success: function (data) {
            try {
                data = JSON.parse(data);

                //////console.log('SMME Taka ',data);

                if (Array.isArray(data) && data.length > 0) {
                    $('.txtTaskLabelSMME').text(data[0].TaskNameSMME);
                    $('#txtTotalTaskBudgetSMME').val(data[0].TWB_BudgetSMME);
                    $('#txtTotalAvailableBudgetTaskSMME').val(data[0].TWB_AvailableBudgetSMME);
                    $('#hdnTotalAvailableBudgetTaskSMME').val(data[0].TWB_BudgetSMME);
                } else {
                    $('#txtTotalTaskBudgetSMME').val(0);
                    $('#txtTotalAvailableBudgetTaskSMME').val(0);
                    $('#hdnTotalAvailableBudgetTaskSMME').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalTaskBudgetSMME').val(0);
                $('#txtTotalAvailableBudgetTaskSMME').val(0);
                $('#hdnTotalAvailableBudgetTaskSMME').val(0);
            }
        },

        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

$('#ddlTaskSMME').on('change', function () {
    $('#ddlSMME').val(0).change();
    $('#ddlSMME').find('option').remove();
    $('#tblSMME tbody').empty();
    DropdownBinderJoin.DDLData = {
        tableName1: "ProjectWiseSmme_PSM",
        tableName2: "SMMERegistration_SMME",
        Text: 'SMME_CompanyName',
        Value: 'PSM_SmmeId',
        ColumnName1: 'SMME_Id',
        ColumnName: 'PSM_SmmeId',
        Param: 'PSM_ProjectId',
        PId: Id
    };
    DropdownBinderJoin.DDLElem = $("#ddlSMME");
    DropdownBinderJoin.Execute();
    $('#btnAddSMMEBudget').attr('disabled', 'disabled');
    var taskId = $('#ddlTaskSMME').val();
    fundWiseBudgetTaskDetails(Id, $('#ddlTaskActivitySMME').val(), $(this).val());
    retriveSMMEBudgetDetails(Id, $('#ddlTaskActivitySMME').val(), $(this).val());
});

$('#ddlSMME').on('change', function () {
    $('#btnAddSMMEBudget').attr('disabled', 'disabled');
    var taskId = $('#ddlTaskSMME').val();
    var smmeId = $('#ddlSMME').val();
    retriveSMMEBudget(Id, $('#ddlTaskSMME').val(), $(this).val());
});

function retriveBudgetHeader(Id) {
    headerRow = [];
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTableHeader',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {

            headerRow = JSON.parse(data);
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

$('#ddlTaskActivitySMME').on('change', function () {
    if (this.value > 0) {
        $('#tblSMME tbody').html('');

        $('#ddlTaskSMME').find("option").remove();
        $('#txtTotalActivityBudgetSMME').val('');
        $('#txtTotalTaskBudgetSMME').val('');
        $('#txtTotalAvailableBudgetTaskSMME').val('');
        $('#hdnTotalAvailableBudgetTaskSMME').val('');
        $('#txtsumAllocatedBudgtActivitySMME').val('');
        $('#hdnsumAllocatedBudgtActivitySMME').val('');
        $('.txlblActTaskClr').text('');

        DropdownBinder.DDLData = {
            tableName: "TaskDeatils_TD",
            Text: 'TD_TaskName',
            Value: 'TD_Id',
            ColumnName: 'TD_ProjectId',
            PId: Id,
            ColumnName1: 'TD_ActivityId',
            PId1: this.value,
        };
        DropdownBinder.DDLElem = $('#ddlTaskSMME');
        DropdownBinder.Execute();

        var mt = $("#ddlTaskSMME");
        mt.length &&
            mt.each(function () {
                var mt = $(this);
                mt.wrap('<div class="position-relative"></div>'), mt.select2({ placeholder: "Select Task", dropdownParent: mt.parent() });
            });
    }

    var ActId = $('#ddlTaskActivitySMME').val();
    fundWiseBudgetActivityDetailsForSMME(Id, $(this).val(), $('#ddlBudgetDistSMME').val())

});

$("#btnAllocateExpenses").click(function () {
    $('#modalExpenditure').modal('show');
});

$("#txtExpensesAmnt").on('change', function () {
    $('#btnAddSMMEBudget').removeAttr('disabled');
})


function retriveExpenditureReport() {
    // Clear previous table content and messages
    //$('#tblSMMEExpendi tbody').html('');
    //$('#tblSMMEExpendi thead tr:nth-child(1)').html('');
    //$('#tblSMMEExpendi thead tr:nth-child(2)').html('');
    $('#reportDuration').html('');
    console.log(dataExpnd);
    if (dataExpnd.length > 0) {
        const mergedData = [];

        // Slight delay to let the spinner appear before heavy processing
        setTimeout(function () {
            const startTime = performance.now();

            // Merge logic
            $.each(dataExpnd, function (_, obj1) {
                const match = dataBudget.find(obj2 => obj2.id === obj1.id && obj2.Description === obj1.Description);
                mergedData.push(match ? $.extend({}, obj1, match) : obj1);
            });

            const fundNames = [];
            mergedData.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (key.includes("_Budget")) {
                        const fundName = key.split("_")[0];
                        if (!fundNames.includes(fundName)) fundNames.push(fundName);
                    }
                });
            });

            // Build table headers
            let headerRow1 = '<th rowspan="2">Date</th><th rowspan="2">Description</th>';
            let headerRow2 = '';
            fundNames.forEach(fundName => {
                headerRow1 += `<th colspan="3">${fundName}</th>`;
                headerRow2 += '<th>Budgeted</th><th>Actual</th><th>Variance(%)</th>';
            });

            $('#tblSMMEExpendi thead tr:nth-child(1)').append(headerRow1);
            $('#tblSMMEExpendi thead tr:nth-child(2)').append(headerRow2);

            // Add data rows
            mergedData.forEach(item => {
                let row = `<tr class="${item.RowColor || ''}">`;
                row += `<td>${item.Date || ''}</td>`;
                row += `<td>${item.Description || ''}</td>`;

                fundNames.forEach(fundName => {
                    const budgetVal = parseFloat(item[`${fundName}_Budget`]) || 0;
                    const expVal = parseFloat(item[`${fundName}_ExpenditureBudget`]) || 0;
                    let variance = "0%";

                    if (expVal !== 0) {
                        variance = (((expVal - budgetVal) / expVal) * 100).toFixed(2) + "%";
                    } else if (budgetVal !== 0) {
                        variance = "-100%";
                    }

                    row += `<td>${budgetVal.toFixed(2)}</td>`;
                    row += `<td>${expVal.toFixed(2)}</td>`;
                    row += `<td>${variance}</td>`;
                });

                row += '</tr>';
                $('#tblSMMEExpendi tbody').append(row);
              
            });

            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(2);

            $('#reportDuration').html(`Report generated in <strong>${duration} ms</strong>`);
            // LoaderEnd("#section-blockBgtExpendiReport");
            //$("#section-blockBgtExpendiReport").block({
            //    message: '<div class="spinner-border text-primary" role="status"></div>',
            //    timeout: 0.1e3,
            //    css: { backgroundColor: "transparent", border: "0" },
            //    overlayCSS: { backgroundColor: "#fff", opacity: .8 }
            //});
           
        }, 100);
        LoaderEnd("#section-blockBgtExpendiReport");
        $(".chkFilter").removeAttr('disabled');
    } else {
        // Fully clear both header rows
        $('#tblSMMEExpendi thead tr:nth-child(1)').html('');
        $('#tblSMMEExpendi thead tr:nth-child(2)').html('');

        // Optional: show a single full-width header row indicating no data
        //$('#tblSMMEExpendi thead tr:nth-child(1)').append('<th colspan="5" class="text-center">No Data Found</th>');

        // Insert a placeholder row in the body
        $('#tblSMMEExpendi tbody').html('<tr><td colspan="5" class="text-center">No data found for the selected criteria.</td></tr>');
        LoaderEnd("#section-blockBgtExpendiReport");
        $(".chkFilter").removeAttr('disabled');
    }
}


//function retriveExpenditureReport() {
//    // Clear table contents
//    $('#tblSMMEExpendi tbody').html('');
//    $('#tblSMMEExpendi thead tr:nth-child(1)').html('');
//    $('#tblSMMEExpendi thead tr:nth-child(2)').html('');
//    $('#reportDuration').html(''); // Clear old timing display

//    const mergedData = [];

//    // Slight delay to let the spinner appear before heavy processing
//    setTimeout(function () {
//        const startTime = performance.now();

//        // Merge logic
//        $.each(dataExpnd, function (_, obj1) {
//            const match = dataBudget.find(obj2 => obj2.id === obj1.id && obj2.Description === obj1.Description);
//            mergedData.push(match ? $.extend({}, obj1, match) : obj1);
//        });

//        const fundNames = [];
//        mergedData.forEach(item => {
//            Object.keys(item).forEach(key => {
//                if (key.includes("_Budget")) {
//                    const fundName = key.split("_")[0];
//                    if (!fundNames.includes(fundName)) fundNames.push(fundName);
//                }
//            });
//        });

//        // Build table headers
//        let headerRow1 = '<th rowspan="2">Date</th><th rowspan="2">Description</th>';
//        let headerRow2 = '';
//        fundNames.forEach(fundName => {
//            headerRow1 += `<th colspan="3">${fundName}</th>`;
//            headerRow2 += '<th>Budgeted</th><th>Actual</th><th>Variance(%)</th>';
//        });

//        $('#tblSMMEExpendi thead tr:nth-child(1)').append(headerRow1);
//        $('#tblSMMEExpendi thead tr:nth-child(2)').append(headerRow2);

//        // Add data rows
//        mergedData.forEach(item => {
//            let row = `<tr class="${item.RowColor || ''}">`;
//            row += `<td>${item.Date || ''}</td>`;
//            row += `<td>${item.Description || ''}</td>`;

//            fundNames.forEach(fundName => {
//                const budgetVal = parseFloat(item[`${fundName}_Budget`]) || 0;
//                const expVal = parseFloat(item[`${fundName}_ExpenditureBudget`]) || 0;
//                let variance = "0%";

//                if (expVal !== 0) {
//                    variance = (((expVal - budgetVal) / expVal) * 100).toFixed(2) + "%";
//                } else if (budgetVal !== 0) {
//                    variance = "-100%";
//                }

//                row += `<td>${budgetVal.toFixed(2)}</td>`;
//                row += `<td>${expVal.toFixed(2)}</td>`;
//                row += `<td>${variance}</td>`;
//            });

//            row += '</tr>';
//            $('#tblSMMEExpendi tbody').append(row);
//        });

//        const endTime = performance.now();
//        const duration = (endTime - startTime).toFixed(2);

//        // Show duration on page
//        $('#reportDuration').html(`Report generated in <strong>${duration} ms</strong>`);

//        // Unblock the section
//        //complete: function () {
//        $("#section-blockBgtExpendiReport").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.1e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
//        //}
//    }, 100); // Give spinner time to show
//}

function retriveExpenditureData(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseExpendForDashboard',   ////  'SelectExpendiReportData',    
            param1: 'PD_Id',
            param1Value: parseInt(Id),  // use the passed ID
            param2: 'FinancialYearId',
            param2Value: parseInt($('#ddlFinancialYearFilter').val()),
            StoreProcedure: 'SMMEExpenWiseReport_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (response) {
            var Edata = JSON.parse(response);

            if (!Array.isArray(Edata) || Edata.length <= 1) {
                console.log("No expenditure data found.");
                dataExpnd = []; // ❗ clear the data
            } else {
                dataExpnd = Edata;
            }
            //var Edata = JSON.parse(response);
            //if (Edata.length <= 1) {
            //    console.log("edata", Edata.length);
            //    // $('#tblSMMEExpendi thead').html("");
            //    //$('#tblSMMEExpendi tbody').html("");
            //} else {
            //    console.log("SMME Expnd report", Edata);
            //    dataExpnd = Edata;
            //}
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

function retriveBudgetData(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudgetReportForDashboard',     /// 'SelectBudgetExReport', 
            param1: 'PD_Id',
            param1Value: parseInt(Id),  // use the passed ID
            param2: 'FinancialYearId',
            param2Value: parseInt($('#ddlFinancialYearFilter').val()),
            StoreProcedure: 'SMMEBudgettWiseReport_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#section-blockBgtExpendiReport");
        },

        success: function (response) {
            var bdata = JSON.parse(response);
            dataBudget = bdata;
            console.log("SMME Budget report", bdata);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

$('#retriveReportBtn').on('click', function () {
    $(".chkFilter").prop('disabled', true);
    $('#rdoCurrentSession').prop('checked', true);
    retriveBudgetData(Id);
    retriveExpenditureData(Id);
    $('#tblSMMEExpendi tbody').html('');
    $('#tblSMMEExpendi thead tr:nth-child(1)').html('');
    $('#tblSMMEExpendi thead tr:nth-child(2)').html('');
    setTimeout(function () { //console.log('I will run after 20 seconds');
        retriveExpenditureReport();
    }, 5000);
});

$('#rdoCurrentSession').on('change', function () {
    if ($(this).is(':checked')) {
        $(".chkFilter").prop('disabled', true);
        $('#ddlFinancialYearExpenCustom').find('option').remove();
        $('#ddlBudgetDistSMMECustom').find('option').remove();

        retriveBudgetData(Id);
        retriveExpenditureData(Id);
        $('#tblSMMEExpendi tbody').html('');
        $('#tblSMMEExpendi thead tr:nth-child(1)').html('');
        $('#tblSMMEExpendi thead tr:nth-child(2)').html('');
        setTimeout(function () { //console.log('I will run after 20 seconds');
            retriveExpenditureReport();
        }, 5000);
    }
});

$('input[name="sessionType"]').on('change', function () {
    if ($('#rdoCustomSession').is(':checked')) {

        $('#customSessionRow').slideDown();
        FinancialYear('#ddlFinancialYearExpenCustom', Id);
    } else {
        $('#customSessionRow').slideUp(); // Hide if not selected
    }
});

function FinancialYear(ddlId, Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectFyYear',     /// 'Select',
            param1: 'PD_Id',
            param1Value: parseInt(Id),
            param2: 'ENR_Id',
            param2Value: parseInt($('#hdnProjctENrId').val()),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransactionForBudget",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            console.log(data)
            $.each(data, function () {
                $(ddlId).append($("<option />").val(this.FM_Id).text(this.FM_Name));
            });
            if (ddlId == "#ddlFinancialYearFilter") {
                $("#ddlFinancialYearFilter").val($('#hdnFyFilterId').val());
            }
            else if (ddlId == "#ddlFinancialYearExpenditure") {
                $("#ddlFinancialYearExpenditure").val($('#hdnFyFilterId').val());

                if ($("#ddlFinancialYearExpenditure").val() > 0) {
                    var fyaa = $(".ddlBudgetDistSMME");
                    fyaa.length &&
                      fyaa.each(function () {
                          var fyaa = $(this);
                          fyaa.wrap('<div class="position-relative"></div>'), fyaa.select2({ placeholder: "Budget Distribution", dropdownParent: fyaa.parent() });
                      });

                    DropdownBinder.DDLData = {
                        tableName: "ProjectBudgetDetails_PBD",
                        Text: 'PBD_FundName',
                        Value: 'PBD_Id',
                        ColumnName: 'PBD_ProjectId',
                        PId: parseInt(Id),
                        PId1: $(ddlId).val(),
                        ColumnName1: 'PBD_FinancialYearId',
                    };
                    DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
                    DropdownBinder.Execute();
                }
            }
            else if (ddlId == "#ddlFinancialYearExpenCustom") {
                $("#ddlFinancialYearExpenCustom").val($('#hdnFyFilterId').val());

                if ($("#ddlFinancialYearExpenCustom").val() > 0) {
                    var fyaa = $(".ddlBudgetDistSMMECustom");
                    fyaa.length &&
                      fyaa.each(function () {
                          var fyaa = $(this);
                          fyaa.wrap('<div class="position-relative"></div>'), fyaa.select2({ placeholder: "Budget Distribution", dropdownParent: fyaa.parent() });
                      });

                    DropdownBinder.DDLData = {
                        tableName: "ProjectBudgetDetails_PBD",
                        Text: 'PBD_FundName',
                        Value: 'PBD_Id',
                        ColumnName: 'PBD_ProjectId',
                        PId: parseInt(Id),
                        PId1: $(ddlId).val(),
                        ColumnName1: 'PBD_FinancialYearId',
                    };
                    DropdownBinder.DDLElem = $("#ddlBudgetDistSMMECustom");
                    DropdownBinder.Execute();
                }
            }

        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

$('#ddlBudgetDistSMMECustom').on('change', function () {
    $(".chkFilter").prop('disabled', true);
    LoaderStart("#section-blockBgtExpendiReport");
    retriveBudgetDataCustom(Id);
    retriveExpenditureDataCustom(Id);
    $('#tblSMMEExpendi tbody').html('');
    $('#tblSMMEExpendi thead tr:nth-child(1)').html('');
    $('#tblSMMEExpendi thead tr:nth-child(2)').html('');
    setTimeout(function () { //console.log('I will run after 20 seconds');
        retriveExpenditureReport();
    }, 5000);
});

function retriveExpenditureDataCustom(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseExpendForDashboardCustomFilter',      ///  'SelectExpendiReportDataCustom',  
            param1: 'PD_Id',
            param1Value: parseInt(Id),  // use the passed ID
            param2: 'FinancialYearId',
            param2Value: parseInt($('#ddlFinancialYearExpenCustom').val()),
            param3: 'PBD_Id',
            param3Value: parseInt($('#ddlBudgetDistSMMECustom').val()),
            StoreProcedure: 'SMMEExpenWiseReport_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    $("#section-blockBgtExpendiReport").block({ message: '<div class="spinner-border text-primary" role="status"></div>', css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
        //},
        //complete: function () {
        //    $("#section-blockBgtExpendiReport").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.1e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
        //},
        success: function (response) {
            var Edata = JSON.parse(response);

            if (!Array.isArray(Edata) || Edata.length <= 1) {
                console.log("No expenditure data found.");
                dataExpnd = []; // ❗ clear the data
            } else {
                dataExpnd = Edata;
            }

            //var Edata = JSON.parse(response);
            //if (Edata.length <= 1) {
            //    console.log("edata", Edata.length);
            //    // $('#tblSMMEExpendi thead').html("");

            //} else {
            //    console.log("SMME Expnd report", Edata);
            //    dataExpnd = Edata;
            //}
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

function retriveBudgetDataCustom(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudgetReportForDashboardCustomFilter',    /// 'SelectBudgetExCustomFilter',
            param1: 'PD_Id',
            param1Value: parseInt(Id),  // use the passed ID
            param2: 'FinancialYearId',
            param2Value: parseInt($('#ddlFinancialYearExpenCustom').val()),
            param3: 'PBD_Id',
            param3Value: parseInt($('#ddlBudgetDistSMMECustom').val()),
            StoreProcedure: 'SMMEBudgettWiseReport_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#section-blockBgtExpendiReport");
        },

        success: function (response) {
            var bdata = JSON.parse(response);
            dataBudget = bdata;
            console.log("SMME Budget report", bdata);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

