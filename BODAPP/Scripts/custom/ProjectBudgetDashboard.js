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
let counter = 1;
let sincount = 0;

!(function () {
    var e = $("#ddlBudgetType");
    var f = $("#ddlFundType");
    var g = $("#ddlActivity");
    var h = $("#ddlFundTypeAct");
    var m = $("#ddlTask");
    var l = $("#ddlFundTypeTask");
    var xm = $("#ddlFundTypeSMME");
    var xt = $("#ddlSMME");
    var ma = $("#ddlTaskActivity");
    var fn = $("#ddlBudgetDistActivity");
    var fnt = $("#ddlBudgetDistTask");
    var fns = $("#ddlBudgetDistSMME");
    var x = $("#ddlEnterprise");
    var fy = $("#ddlFinancialYear");
    var fya = $("#ddlFinancialYearAct");
    var fyt = $("#ddlFinancialYearTask");
    var fys = $("#ddlFinancialYearSMME");
    var fyf = $("#ddlFinancialYearFund");
    var fyfiltr = $("#ddlFinancialYearFilter");
    
    ma.length &&
      ma.each(function () {
          var ma = $(this);
          ma.wrap('<div class="position-relative"></div>'), ma.select2({ placeholder: "Select Activity", dropdownParent: ma.parent() });
      });

    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Budget Type", dropdownParent: e.parent() });
        });

    f.length &&
        f.each(function () {
            var f = $(this);
            f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Fund Type", dropdownParent: f.parent() });
        });

    g.length &&
        g.each(function () {
            var g = $(this);
            g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select Activity", dropdownParent: g.parent() });
        });

    h.length &&
        h.each(function () {
            var h = $(this);
            h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A Fund Type", dropdownParent: h.parent() });
        });

    m.length &&
        m.each(function () {
            var m = $(this);
            m.wrap('<div class="position-relative"></div>'), m.select2({ placeholder: "Select Task", dropdownParent: m.parent() });
        });

    l.length &&
        l.each(function () {
            var l = $(this);
            l.wrap('<div class="position-relative"></div>'), l.select2({ placeholder: "Select Fund", dropdownParent: l.parent() });
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
          fy.wrap('<div class="position-relative"></div>'), fy.select2({ placeholder: "Financial Year", dropdownParent: fy.parent() });
      });

    fya.length &&
      fya.each(function () {
          var fya = $(this);
          fya.wrap('<div class="position-relative"></div>'), fya.select2({ placeholder: "Financial Year", dropdownParent: fya.parent() });
      });

    fyt.length &&
        fyt.each(function () {
            var fyt = $(this);
            fyt.wrap('<div class="position-relative"></div>'), fyt.select2({ placeholder: "Financial Year", dropdownParent: fyt.parent() });
        });

    fys.length &&
        fys.each(function () {
            var fys = $(this);
            fys.wrap('<div class="position-relative"></div>'), fys.select2({ placeholder: "Financial Year", dropdownParent: fys.parent() });
        });

    fyf.length &&
        fyf.each(function () {
            var fyf = $(this);
            fyf.wrap('<div class="position-relative"></div>'), fyf.select2({ placeholder: "Financial Year", dropdownParent: fyf.parent() });
        });

    fyfiltr.length &&
        fyfiltr.each(function () {
            var fyfiltr = $(this);
            fyfiltr.wrap('<div class="position-relative"></div>'), fyfiltr.select2({ placeholder: "Financial Year", dropdownParent: fyfiltr.parent() });
        });




    Id = getParameterByName('Id');
    projectId = Id;
    var Type = getParameterByName('Type');

    $('tr.header').click(function () {
        $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
    });

    DropdownBinder.DDLData = {
        tableName: "BudgetType_BT",
        Text: 'BT_Type',
        Value: 'BT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBudgetType");
    DropdownBinder.Execute();



    FinancialYear("#ddlFinancialYearFilter", Id);

    if (Id > 0) {
        retrive(Id);            // this function retrive the Budget total budget   'totalbudget'
        BindGridSMME(Id);       // this function retrive the SMME Report 
        retriveFundDetails(Id); // this function retrive the Budget Distribution data
        retriveFundDistribution(Id);   // this function retrive the Budget Fund Distribution data
    }
    retriveprojectbudget(Id);       // this function retrive the popup Budget Distribution 
    if ($('#hdnFyFilterId').val() > 0) {
        $('.disAble').prop('disabled', false);
    } else {
        $('.disAble').prop('disabled', true);
    }

})();


//$(document).ready(function () {
  
    

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundType");
    //DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundTypeAct");
    //DropdownBinder.Execute();

   

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundTypeTask");
    //DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundTypeSMME");
    //DropdownBinder.Execute();

    //DropdownBinderJoin.DDLData = {
    //    tableName1: "ProjectWiseSmme_PSM",
    //    tableName2: "SMMERegistration_SMME",
    //    Text: 'SMME_CompanyName',
    //    Value: 'PSM_SmmeId',
    //    ColumnName1: 'SMME_Id',
    //    ColumnName: 'PSM_SmmeId',
    //    Param: 'PSM_ProjectId',
    //    PId: Id
    //};
    //DropdownBinderJoin.DDLElem = $("#ddlSMME");
    //DropdownBinderJoin.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "EnterpriseRegistration_ENR",
    //    Text: 'ENR_CompanyName',
    //    Value: 'ENR_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlEnterprise");
    //DropdownBinder.Execute();
    
    //DropdownBinder.DDLData = {
    //    tableName: "FinancialYearMaster_FM",
    //    Text: 'FM_Name',
    //    Value: 'FM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFinancialYearFilter");
    //DropdownBinder.Execute();


//});


$("#ddlFinancialYearAct").change(function () {
    $('#ddlBudgetDistActivity').find('option').remove();
    $('#ddlActivity').find('option').remove();
    var hdnFyActId = $("#ddlFinancialYearAct").val();
    console.log(hdnFyActId)
    $('#hdnFyActId').val(hdnFyActId)

    $('#tblActivity tbody').html('');
    $('.txtact').val('');
    $('.txtactSpan').text('');

    //var fyaa = $(".ddlBudgetDistActivity");
    //fyaa.length &&
    //  fyaa.each(function () {
    //      var fyaa = $(this);
    //      fyaa.wrap('<div class="position-relative"></div>'), fyaa.select2({ placeholder: "Budget Distribution", dropdownParent: fyaa.parent() });
    //  });

    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id),
        PId1: $("#ddlFinancialYearAct").val(),
        ColumnName1: 'PBD_FinancialYearId',
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistActivity");
    DropdownBinder.Execute();
});

$("#ddlFinancialYearTask").change(function () {
    var hdnFyTaskId = $("#ddlFinancialYearTask").val();
    console.log(hdnFyTaskId)
    $('#hdnFyTaskId').val(hdnFyTaskId)

    $('#tblTask tbody').html('');
    $('.txtaskCle').val('');
    $('.txtask').val('');
    $('.txtaskSpan').text('');
    $('.txtaskCleSpn').text('');

    var fytt = $(".ddlBudgetDistTask");
    fytt.length &&
      fytt.each(function () {
          var fytt = $(this);
          fytt.wrap('<div class="position-relative"></div>'), fytt.select2({ placeholder: "Budget Distribution", dropdownParent: fytt.parent() });
      });

    $('#ddlBudgetDistTask').find('option').remove();
    $('#ddlTaskActivity').find('option').remove();
    $('#ddlTask').find('option').remove();


    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id),
        PId1: $("#ddlFinancialYearTask").val(),
        ColumnName1: 'PBD_FinancialYearId',
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistTask");
    DropdownBinder.Execute();
});

$("#ddlFinancialYearSMME").change(function () {
    //var hdnFySMMEId = $("#ddlFinancialYearSMME").val();
    //console.log(hdnFySMMEId)
    $('#hdnFySMMEId').val(hdnFySMMEId)

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
    // $('#ddlSMME').find('option').remove();
    $('#ddlSMME').val(0).change();


    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id),
        PId1: $("#ddlFinancialYearSMME").val(),
        ColumnName1: 'PBD_FinancialYearId',
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
    DropdownBinder.Execute();





});

$("#ddlFinancialYearFund").change(function () {
    var hdnFyFundId = $("#ddlFinancialYearFund").val();
    console.log(hdnFyFundId)
    $('#hdnFyFundId').val(hdnFyFundId)

    //retriveProjectBudgetFundDetails(Id);
});


$("#ddlEnterprise").change(function () {
    var ddlFndId = $("#ddlFundType").val();
    $('#sumAllocatedBudgt').val('');
    $('#sumAllocatedBudgtHdn').val('');
    retriveProjectBudgetFundDetails(Id, ddlFndId);
});

$("#ddlFundType").change(function () {
    //var ddlFndId = $("#ddlFundType").val();
    $('#sumAllocatedBudgt').val('');
    $('#sumAllocatedBudgtHdn').val('');
    retriveProjectBudgetFundDetails(Id, $(this).val());
});

$('#ddlFinancialYearFilter').on('change', function () {
    hdnFyFilterId = $("#ddlFinancialYearFilter").val();
    LoaderStart('#pBudgetblock');
    counter = 3;

   // console.log(hdnFyFilterId);
    $('#hdnFyFilterId').val(hdnFyFilterId);

      retrive(Id);//4
      retriveFundDetails(Id);
      retriveFundDistribution(Id);//5
      $('#navSMME').trigger('click');

});

$('#ddlFinancialYear').on('change', function () {
    hdnFyFilterId = $("#ddlFinancialYear").val();
    console.log(hdnFyFilterId);
    $('#tblBudget tbody input').html('');

    retriveProjectBudgetDetails(Id);
});


$('#ddlBudgetType').on('change', function () {
    //var hdnBudgetType = $('#ddlBudgetType').val();
    var hdnBudgetType = $("#ddlBudgetType option:selected").text();
    //////console.log(hdnBudgetType)
});


function FinancialYear(ddlId,Id) {
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
  //  console.log(_data)
    $.ajax({
        type: "POST",
        //url: "/ScriptJson/GetGlobalMasterTransaction",
        url: "/ScriptJson/GetGlobalMasterTransactionForBudget",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            console.log(data)
            $(ddlId).find('option').remove();
            $.each(data, function () {
                $(ddlId).append($("<option />").val(this.FM_Id).text(this.FM_Name));
            });
            if(ddlId == "#ddlFinancialYearFilter")
            {
                $("#ddlFinancialYearFilter").val($('#hdnFyFilterId').val());
                //$("#ddlFinancialYearFilter").val(26);
            }
            else if (ddlId == "#ddlFinancialYear")
            {
                $("#ddlFinancialYear").val($('#hdnFyFilterId').val());
                retriveProjectBudgetDetails(Id);
            }
            else if (ddlId == "#ddlFinancialYearFund")
            {
                $("#ddlFinancialYearFund").val($('#hdnFyFilterId').val());
            }
            else if (ddlId == "#ddlFinancialYearAct")
            {
                $("#ddlFinancialYearAct").val($('#hdnFyFilterId').val());

                if ($("#ddlFinancialYearAct").val() > 0) {
                    $('#ddlBudgetDistActivity').find('option').remove();

                DropdownBinder.DDLData = {
                    tableName: "ProjectBudgetDetails_PBD",
                    Text: 'PBD_FundName',
                    Value: 'PBD_Id',
                    ColumnName: 'PBD_ProjectId',
                    PId: parseInt(Id),
                    PId1:$(ddlId).val(),
                    ColumnName1: 'PBD_FinancialYearId',
                };
                DropdownBinder.DDLElem = $("#ddlBudgetDistActivity");
                DropdownBinder.Execute();
                }

            }
            else if (ddlId == "#ddlFinancialYearTask")
            {
                $("#ddlFinancialYearTask").val($('#hdnFyFilterId').val());

                if ($("#ddlFinancialYearTask").val() > 0) {
                    var fyaa = $(".ddlBudgetDistTask");
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
                    DropdownBinder.DDLElem = $("#ddlBudgetDistTask");
                    DropdownBinder.Execute();
                }
            }
            else if (ddlId == "#ddlFinancialYearSMME")
            {
                $("#ddlFinancialYearSMME").val($('#hdnFyFilterId').val());

                if ($("#ddlFinancialYearSMME").val() > 0) {
                    var fyaa = $(".ddlBudgetDistSMME");
                    fyaa.length &&
                      fyaa.each(function () {
                          var fyaa = $(this);
                          fyaa.wrap('<div class="position-relative"></div>'), fyaa.select2({ placeholder: "Budget Distribution", dropdownParent: fyaa.parent() });
                      });

                    //DropdownBinder.DDLData = {
                    //    tableName: "ProjectBudgetDetails_PBD",
                    //    Text: 'PBD_FundName',
                    //    Value: 'PBD_Id',
                    //    ColumnName: 'PBD_ProjectId',
                    //    PId: parseInt(Id)
                    //};
                    //DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
                    //DropdownBinder.Execute();

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
            // hdnBdgtType
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function retriveprojectbudget(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBudgetDashboardAmnt',     /// 'Select',
            param1: 'PD_Id',
            param1Value: parseInt(id),
        
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
            //data = JSON.parse(data);
            console.log("BudgetType data find --", data)

            if (data["IsEnable"] == 'disabled') {
                $("#ddlBudgetType").prop("disabled", true);
            } else {
                $("#ddlBudgetType").prop("disabled", false);
            }
       
            var currentBudget = data["PD_Budget"];
            $('#hdnTotalProjectBgt').val(data["PD_Budget"]);
            $('#txtBudget').val(data["PD_Budget"]);
            $('#ddlBudgetType').val(data["PD_BudgetType"]).change();
            $('#hdnBdgtType').val($("#ddlBudgetType option:selected").text());

            //$('#txtBudget').on('input', function () {
            //    var inputBudget = parseFloat($(this).val());

            //    // If the input budget is less than the current budget, reset the value to the current budget
            //    if (inputBudget < currentBudget) {
            //        $(this).val(currentBudget);

            //        Swal.fire({
            //            title: "Oops..!",
            //            text: "Budget cannot be less than the current budget.",
            //            icon: "error",
            //            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            //            buttonsStyling: !1
            //        });
                  
            //    }
            //});
            // hdnBdgtType
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

function validateQTY(t) {
    var QTY = $(t).closest('tr').find('td:eq(9)').text();

    if (parseInt($(t).val()) == '' || isNaN(parseInt($(t).val()))) {

        Swal.fire({
            title: "Oops..!",
            text: 'Quantity should not be blank',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    var rate = $(t).closest('tr').find('td:eq(5)').text();
    var qtyr = $(t).closest('tr').find("td:eq(6) input[type='text']").val();
    var camt = parseFloat(parseInt(qtyr) * parseFloat(rate)).toFixed(2);
    $(t).closest('tr').find('td:eq(7)').text(camt);
    //var
    totalsum();


}

function CalculateAmt() {
   
    var amount = isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val());
    var qty = isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val());

    var totalAmount = amount * qty;
    $('#txtTotalAmnt').val(totalAmount);

    var budget = parseInt($('#hdnBdgt').val());
    //if (totalAmount > budget) {

    //    Swal.fire({
    //        title: "Oops..!",
    //        text: 'Total amount should be less than ' + budget,
    //        icon: "error",
    //        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
    //        buttonsStyling: false
    //    });

    //    $('#btnAddBudget').attr('disabled', 'disabled');
    //    $('#txtAmnt').val(0);
    //    $('#txtTotalAmnt').val(0);

    //    return false; 
    //}

    $('#btnAddBudget').removeAttr('disabled');
}



function CalculateAmtForActivity() {
    $('#txtTotalAmnt').val((
         isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val()))
         (isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val())));
    if (parseInt($('#txtTotalAmnt').val()) > parseInt($('#hdnBdgt').val())) {

        Swal.fire({
            title: "Oops..!",
            text: 'Total amount should be less then - ' + parseInt($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

        $('#btnAddBudget').attr('disabled', 'disabled');
        $('#txtAmnt').val(0);
        $('#txtTotalAmnt').val((
         isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val()))
                                             *
         (isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val())));
        return false;
    }
    $('#btnAddBudget').removeAttr('disabled', 'disabled');
}

//function CheckDuplicates(Fundtype, Enter, tbl) {
//    var grid = document.getElementById(tbl);
//    if (!grid) {
//        console.error("Table not found:", tbl);
//        return false;
//    }

//    var rows = grid.getElementsByTagName("tr");
//    for (var i = 0; i < rows.length; i++) {
//        var cells = rows[i].getElementsByTagName("td");
//        if (cells.length < 2) continue;

//        var FundtypeCol = cells[0].querySelector("input[type='hidden']")?.value?.trim();
//        var EnterCol = cells[1].querySelector("input[type='hidden']")?.value?.trim();

//        if (FundtypeCol === Fundtype && EnterCol === Enter) {
//            return true; // Duplicate found
//        }
//    }
//    return false; // No duplicate
//}



//function CheckDuplicates(Fundtype, Enter,tbl) {
//    var isValid = false;
//    var grid = document.getElementById(tbl);
//    var rows = grid.getElementsByTagName("tr");
//    if (rows.length == 1) {
//        isValid = true;
//        return isValid;
//    } else {
//        for (var i = 0; i < rows.length - 1; i++) {
//            var cells = rows[i].getElementsByTagName("td");
//            var FundtypeCol = cells[0].innerHTML;
//            var EnterCol = cells[1].innerHTML;
            
//            if (FundtypeCol == Fundtype && EnterCol == Enter) {
//                return false;
//            } else {
//                isValid = true;
//            }
//        }
//    }
//    return isValid;
//}


function AddBudget() {
    //$('#tblBudgetFund > tbody').html('');         
    var ALreadyFbd = 0
    $('#totalFundBudget').text(isNaN(hdnBudget) ? 0 : hdnBudget);

    $.each($('#tblBudgetFund tbody tr'), function (index, value) {
        if (parseInt($(this).find("td:eq(0) option:selected").val()) == parseInt($('#ddlFundType').val()) && parseInt($(this).find("td:eq(1) option:selected").val()) == parseInt($('#ddlEnterprise').val())) {
            ALreadyFbd = 1;
        }
    });

    if (ALreadyFbd == 1) {
        ALreadyFbd = 1;
        Swal.fire({
            title: "Oops..!",
            text: 'Fund already allocated to this Funder!',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblBudgetFund");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var sumAllocatedBudgt = 0;
    var i = (rows.length - 1);
    tr = $('<tr/>');


    tr.append("<td><input type='hidden' value ='" + $('#ddlFundType').val() + "' id='hdnFundType_" + i + "'><select id='ddlFundTypeTbl_" + i + "' name='ddlFundTypeTbl_" + i + "' class='select2 form-select ddlFundTypeTbl' data-allow-clear='true'></select></td>");
    tr.append("<td><input type='hidden' value ='" + $('#ddlEnterprise').val() + "' id='hdnFundType_" + i + "'><select id='ddlEnterpriseTbl_" + i + "' name='ddlEnterpriseTbl_" + i + "' class='select2 form-select ddlEnterpriseTbl' data-allow-clear='true'></select></td>");

    //tr.append("<td><input type='text' value ='" + $('#txtDesc').val() + "' class='form-control' name='txtDesc_" + i + "' id='txtDesc_" + i + "' ></td>");
    tr.append("<td><input type='text' value ='" + $('#txtQty').val() + "'  class='form-control' name='txtQty_" + i + "' id='txtQty_" + i + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
    tr.append("<td><input type='text' value ='" + $('#txtAmnt').val() + "' class='form-control' name='txtAmnt_" + i + "' id='txtAmnt_" + i + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");

    tr.append("<td><input type='hidden' value ='" + $('#txtTotalAmnt').val() + "'  name='hdnTotalAmnt_" + i + "' id='hdnTotalAmnt_" + i + "' ><input type='text' value =" + $('#txtTotalAmnt').val() + "  name='txtTotalAmnt_" + i + "' id='txtTotalAmnt_" + i + "' class='form-control' disabled></td>");
 //   tr.append("<td hidden><input type='hidden' value='" + $('#ddlFinancialYearFund').val() + "' name='hdnFinancialYearFund_" + i + "' id='hdnFinancialYearFund_" + i + "'/></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClick(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
    //////console.log(parseFloat(isNaN($('#txtTotalAmnt').val()) == true ? 0 : $('#txtTotalAmnt').val()));
    if ($('#sumAllocatedBudgtHdn').val() == "") {
        $('#sumAllocatedBudgtHdn').val(0);
    }
    sumAllocatedBudgt = (parseFloat(sumAllocatedBudgt) + parseFloat(isNaN($('#txtTotalAmnt').val()) ? 0 : $('#txtTotalAmnt').val()) + parseFloat(isNaN($('#sumAllocatedBudgtHdn').val()) ? 0 : $('#sumAllocatedBudgtHdn').val()));

    if (parseInt($('#totalFundBudget').val()) < parseInt(sumAllocatedBudgt)) {
        Swal.fire({
            title: "Oops..!",
            text: 'Total amount should be less then - ' + parseInt($('#totalFundBudget').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }


    $('#tblBudgetFund tbody').append(tr);

    $('#sumAllocatedBudgt').val(sumAllocatedBudgt);
    $('#sumAllocatedBudgtHdn').val(sumAllocatedBudgt);

    var drp = $('#ddlFundTypeTbl_' + i + '');
    drp.length &&
        drp.each(function () {
            var drp = $(this);
            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
        });
    var drpenr = $('#ddlEnterpriseTbl_' + i + '');
    drpenr.length &&
        drpenr.each(function () {
            var drpenr = $(this);
            drpenr.wrap('<div class="position-relative"></div>'), drpenr.select2({ placeholder: "Select Enterprise", dropdownParent: drpenr.parent() });
        });
    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $('#ddlFundTypeTbl_' + i + '');
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $('#ddlEnterpriseTbl_' + i + '');
    DropdownBinder.Execute();

    $('#ddlFundTypeTbl_' + i + '').val($('#ddlFundType').val()).change();
    $('#ddlEnterpriseTbl_' + i + '').val($('#ddlEnterprise').val()).change();

    //$('#ddlFundType').val(0).change();
    //$('#ddlEnterprise').val(0).change();
    $('.txtModal').val('');

}

function AddBudgetDetails() {
    $('#totalBdgt').text(isNaN(hdnBudget) ? 0 : hdnBudget);
    function checkBudgetSum() {
        var sumAllocatedBudgt = 0;
       
        $('#tblBudget input[type="text"]').each(function () {
            var inputVal = parseFloat($(this).val()) || 0; 
            sumAllocatedBudgt += inputVal;
        });

       
        if (parseInt(hdnBudget) < sumAllocatedBudgt) {
            Swal.fire({
                title: "Oops..!",
                text: 'Total amount should be less than ' + parseInt(hdnBudget),
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });

            $(event.target).val(0);
            return false;
        }
    }

    $(document).on('keyup', '#tblBudget input[type="text"]', function () {
        checkBudgetSum();  
    });

    if ($('#hdnBdgtType').val() == "Quaterly") {
        $('#tblBudget tbody').html('');
        var tr;
        var sumAllocatedBudgt = 0;
        for (var i = 0; i < 4; i++) {

            tr = $('<tr/>');

            tr.append("<td>Quarter " + (i + 1) + "</td>");

            tr.append("<td><input type='text'   name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && event.keyCode!=8 && event.keyCode!=46);' ></td>");

            $('#tblBudget tbody').append(tr);

        }
    }
    else if ($('#hdnBdgtType').val() == "Annually") {
        $('#tblBudget tbody').html('');
        var tr;
        var sumAllocatedBudgt = 0;
        for (var i = 0; i < 1; i++) {

            tr = $('<tr/>');

            tr.append("<td>Annual " + (i + 1) + "</td>");

            tr.append("<td><input type='text'   name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && event.keyCode!=8 && event.keyCode!=46);'></td>");

            $('#tblBudget tbody').append(tr);

        }
    }
    else if ($('#hdnBdgtType').val() == "Monthly") {
        $('#tblBudget tbody').html('');
        var tr;
        var sumAllocatedBudgt = 0;
        for (var i = 0; i < 12; i++) {

            tr = $('<tr/>');

            tr.append("<td>Month " + (i + 1) + "</td>");

            tr.append("<td><input type='text'   name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && event.keyCode!=8 && event.keyCode!=46);'></td>");

            $('#tblBudget tbody').append(tr);

        }
    } else {

    }
}

function deleteconfirmBoxClick(rowNo) {
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
            $(rowNo).closest('tr').remove();
            var TotalAmt = 0;
            if (id = 'tblBudgetFund') {
                $.each($('#tblBudgetFund tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(4) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(4) input[type='text']").val());
                });
            }
            //$.each($('#tblBudget tr'), function (i, row) {
            //    //Here I need to loop the tr again ( i.e. row) 
            //    $(row, "input").each(function(i, sr) {
            //        //////console.log($(sr).eq(4).val());
            //        //////console.log($(sr).eq(3).val());
            //        TotalAmt +=isNaN(parseFloat($(sr).eq(4).val())) ? 0 : parseFloat($(sr).eq(4).val());

            //    });
            //});

            $('#sumAllocatedBudgt').val(TotalAmt);
            $('#sumAllocatedBudgtHdn').val(TotalAmt);

        }
    });
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
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(1) input[type='text']").val());

            $(rowNo).closest('tr').remove();

            var TotalAmt = 0;
            if (id == 'tblSMME') {
                $.each($('#tblSMME tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(1) input[type='text']").val());
                });
            }
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetTaskSMME').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            $('#txtTotalAvailableBudgetTaskSMME').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivitySMME').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivitySMME').val(TotalAmt);
        }
    });
}

function SaveBudgetDetailsForProject() {
    var tblBudget = document.getElementById("tblBudget");
    var totalAmntTabl = 0;
    var BudgetArr = [];

    $.each($('#tblBudget tbody tr'), function (index, value) {
        //   TotalAmt += isNaN(parseFloat($(this).find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        BudgetArr.push({
            PBD_FundName: $(this).find("td:eq(0)").text().trim(),
            PBD_Amount: parseFloat($(this).find("td:eq(1) input[type='text']").val()),
        });
        //totalAmntTabl=totalAmntTabl+parseFloat($(this).find("td:eq(1) input[type='text']").val());
    });


    if (totalAmntTabl > parseFloat($('#hdnBdgt').val())) {
        Swal.fire({
            title: "Oops..!",
            text: "Total Budget Exceed" + parseFloat($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        }).then((result) => {
            if (result.isConfirmed) {
                $('#exLargeModal').modal('hide');
            }
        });

        return false;
    }

    var _data = JSON.stringify({
        entity: {
            list: BudgetArr,
            PBD_ProjectId: Id,
            PBD_FinancialYearId: parseInt($('#ddlFinancialYear').val()),
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateProjectBudget',
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
                        //$('#exLargeModal').modal('hide');
                        window.location.href = '/Project/ProjectBudgetDashboard?Id=' + Id + '&ENR_Id=' + $('#hdnProjctENrId').val();
                    }

                });
                $('#tblBudget > tbody').html('');
            }
            else {
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
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

}


function retriveProjectBudgetDetails(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#ddlFinancialYear').val()),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#section-blockBudgetDist");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetDist");
        },
        
        success: function (data) {
            data = JSON.parse(data);

            //console.log("data>>> ", data);

            if (data.length > 0) {
                $('#totalBdgt').text(isNaN(hdnBudget) ? 0 : hdnBudget);
                function checkBudgetSum() {
                    var sumAllocatedBudgt = 0;

                    $('#tblBudget input[type="text"]').each(function () {
                        var inputVal = parseFloat($(this).val()) || 0;
                        sumAllocatedBudgt += inputVal;
                    });


                    if (parseInt(hdnBudget) < sumAllocatedBudgt) {
                        Swal.fire({
                            title: "Oops..!",
                            text: 'Total amount should be less than ' + parseInt(hdnBudget),
                            icon: "error",
                            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                            buttonsStyling: false
                        });

                        $(event.target).val(0);
                        return false;
                    }
                }

                $(document).on('keyup', '#tblBudget input[type="text"]', function () {
                    checkBudgetSum();
                });

                $('#tblBudget tbody').html('');
                var tr;
                for (var i = 0; i < data.length; i++) {
                    tr = $('<tr/>');
                    $(".allcn").prop('disabled', false);
                    tr = $('<tr/>');
                    tr.append("<td>" + data[i].PBD_FundName + "</td>");
                    tr.append("<td><input type='text' " + data[i].IsEnable + " value =" + data[i].PBD_Amount + " class='form-control' name='txtAmnt_" + (i + 1) + "' id='txtAmnt_" + (i + 1) + "'  onkeyup='cellAmntChngeForBudgetDistribution(this)' ></td>");
                    $('#tblBudget tbody').append(tr);
                }

                var financialYears = [];
                for (var i = 0; i < data.length; i++) {
                    if (financialYears.indexOf(data[i].FM_Name) === -1) {
                        financialYears.push(data[i].FM_Name);
                        //$('#ddlFinancialYear').append("<option value='" + data[i].FM_Id + "'>" + data[i].FM_Name + "</option>");
                        //$('#ddlFinancialYear').val(data[i].FM_Id).change();
                        //$('#ddlFinancialYearFilter').val(data[i].FM_Id).change();
                    }
                }
            } else {
                $('#tblBudget tbody').html('');
                //$('.form-control').val('');
                
                AddBudgetDetails();
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

function checkForBudget() {
    if ((hdnBudget) > 0) {
        //$('#exLargeModal').modal('show');
        //$('#modalBudgSMME').modal('show');
        //   $('#modalBudgTask').modal('show');

        $('#modalBudgAcitivity').modal('show');
        //$('#modalBudgDistribution').modal('show');
    }
    else {
        Swal.fire({
            title: "Oops..!",
            text: "Budget Amount Not Set Please Set first Budget Amount",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
    }
}


//////////////////////////////////////////////////////////////////////-Activity Budget-//////////////////////////////////////////////////////

function SaveBudgetDistribution() {
    var ArrActivity = [];
    var ArrTask = [];
    for (var i = 1; i <= $('#tblActivity tbody tr.header').length; i++) {
        if (($('#childAcitivity' + i + '').val()) > 0) {
            ArrActivity.push({
                AWB_Budget: $('#childAcitivity' + i + '').val(),
                AWB_ActivityId: $('#childAcitivityId' + i + '').val(),
            });
        }
        for (var j = 1; j <= $('#tblActivity tbody tr.childrowcls' + i + '').length; j++) {
            ArrTask.push({
                TWB_Budget: $('#childTask' + i + j + '').val(),
                TWB_TaskId: $('#childTaskId' + i + j + '').val(),
            });
        }
    }
    var total = 0;
    $('#tblActivity tbody tr').each(function (i, row) {
        $(this).find('input.activity').each(function () {

            total = total + parseInt($(this).val());

        })
    });
    if (total > parseInt(hdnBudget)) {
        Swal.fire({
            title: "Oops..!",
            text: "Budget Cannot Be Greater Than " + parseInt(hdnBudget),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

    }

    else {


        var _data = JSON.stringify({
            entity: {
                ActivityList: ArrActivity,
                TaskList: ArrTask,
                ProjectId: Id,

            }
        });
        $.ajax({
            type: "POST",
            url: '/ScriptJson/InsertUpdateBudgetAllocation',
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
                            $('#modalBudgDistribution').modal('hide');
                            $('#tblActivity tbody').html('');
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Oops..!",
                        text: data.Message,
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    });

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

    }
}

function cellAmntChngeForBudget(t) {
    var amntField = $(t).closest('tr').find("td:eq(3) input[type='text']");
    var qtyField = $(t).closest('tr').find("td:eq(2) input[type='text']");

    var amnt = amntField.val();
    var qty = qtyField.val();
    var total = isNaN(parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2)) == false ? parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2) : 0;
    $(t).closest('tr').find("td:eq(4) input[type='text']").val(total);

    var sumAllocatedBudg = 0;

    $.each($('#tblBudgetFund tbody tr'), function (index, value) {
        if ($('#sumAllocatedBudgtHdn').val() == "") {
            $('#sumAllocatedBudgtHdn').val(0);
        }
        sumAllocatedBudg = sumAllocatedBudg + (parseFloat($(this).find("td:eq(4) input[type='text']").val()));
    });

    if (parseInt($('#hdnBdgt').val()) < parseInt(sumAllocatedBudg)) {
        Swal.fire({
            title: "Oops..!",
            text: 'Total amount should be in less than ' + parseInt($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

        // Check which field triggered the function and reset that field to 0
        if ($(t).is(amntField)) {
            amntField.val(0);
        } else if ($(t).is(qtyField)) {
            qtyField.val(0);
        }

        // Disable the save buttons
        $('#btnSaveBudgetDetailsForProject').attr('disabled', 'disabled');
        $('#btnSaveBudgeFundtDetails').attr('disabled', 'disabled');

        // Restore original values for hidden inputs (to maintain consistent data)
        $(t).closest('tr').find("td:eq(4) input[type='text']").val($(t).closest('tr').find("td:eq(4) input[type='hidden']").val());
        $(t).closest('tr').find("td:eq(3) input[type='text']").val($(t).closest('tr').find("td:eq(4) input[type='hidden']").val());

        return false;
    } else {
        $(t).closest('tr').find("td:eq(4) input[type='hidden']").val(total);
        $('#btnSaveBudgetDetailsForProject').removeAttr('disabled');
        $('#btnSaveBudgeFundtDetails').removeAttr('disabled');
        $('#sumAllocatedBudgt').val(sumAllocatedBudg);
        $('#sumAllocatedBudgtHdn').val(sumAllocatedBudg);
    }
}


function AddActivityBudget() {
    if (parseFloat($('#txtTotalBudgetForSpacificFund').val()) < parseFloat($('#txtAcitivityAmnt').val())) {
        Swal.fire({
            title: "Oops..!",
            text: 'Please Enter Amount Less Than ' + parseFloat($('#txtTotalBudgetForSpacificFund').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtAcitivityAmnt').val(0);
        return false;
    }

    var activi = 0;
    // var fund = 0;
    $.each($('#tblActivity tbody tr'), function (index, value) {
        if ((parseInt($('#ddlActivity').val()) == parseInt($(this).find("td:eq(0) option:selected").val())))  {
            activi = 1;
        }
    });

    if (activi == 1) {
        Swal.fire({
            title: "Oops..!",
            text: 'Activity already exists',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    activi = 0;
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblActivity");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var txtsumAllocatedBudgtActivity = 0;
    var tr;
    var i = (rows.length);
    //////console.log('',i);
    tr = $('<tr/>');
    tr.append("<td><select id='ddlActTbl_" + i + "' name='ddlActTbl_" + i + "' class='select2 form-select ddlActTbl' data-allow-clear='true'></select></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtActivityDate').val() + "'    class='form-control' name='txtActivityDate_" + i + "' id='txtActivityDate_" + i + "'></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtActivityDesc').val() + "'   class='form-control' name='txtActivityDesc_" + i + "' id='txtActivityDesc_" + i + "'></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtAcitivityAmnt').val() + "'    class='form-control tblActivityAmount tblActFund" + $('#ddlActivity').val() + "' name='txtAmntAct_" + i + "' id='txtAmntAct_" + i + "' onkeyup='cellAmntChngeForActivityBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistActivity').val() + "' name='hdnBudgetDistActivity_" + i + "' id='hdnBudgetDistActivity_" + i + "'/><input type='text' value='" + $('#txtsumAllocatedBudgtActivity').val() + "' name='txtsumAllocatedBudgtActivity_" + i + "' id='txtsumAllocatedBudgtActivity_" + i + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlFinancialYearAct').val() + "' name='hdnFinancialYearAct_" + i + "' id='hdnFinancialYearAct_" + i + "'/></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickActivity(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");

    $('#tblActivity tbody').append(tr);
    // txtsumAllocatedBudgtActivity = (parseFloat(txtsumAllocatedBudgtActivity) + parseFloat($('#txtAcitivityAmnt').val()));


    var drpAct = $('#ddlActTbl_' + i + '');

    drpAct.length &&
       drpAct.each(function () {
           var drpAct = $(this);
           drpAct.wrap('<div class="position-relative"></div>'), drpAct.select2({ placeholder: "Select A Activity", dropdownParent: drpAct.parent() });
       });

    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName: 'CA_ProjectId',
        PId: Id
    };
    DropdownBinder.DDLElem = $('#ddlActTbl_' + i + '');
    DropdownBinder.Execute();

    var txtActAmnt = parseInt($('#txtAcitivityAmnt').val()); 
    var txtsum = parseInt($('#txtsumAllocatedBudgtActivity').val());
    if (isNaN(txtsum)) { 
        $('#txtsumAllocatedBudgtActivity').val(txtActAmnt);
        $('#hdnsumAllocatedBudgtHdnActivity').val(txtActAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivity').val(txtActAmnt + txtsum);
        $('#hdnsumAllocatedBudgtHdnActivity').val(txtActAmnt + txtsum);
    }

    // $.each($('#tblActivity tbody tr'), function (index, value) {
    //    if ((parseInt($('#ddlActivity').val()) == parseInt($(this).find("td:eq(0) option:selected").val())))  {
    //        $(this).find("td:eq(3) input[type='hidden']").val(parseInt($(this).find("td:eq(3) input[type='text']").val()) + parseInt(parseInt($('#txtAcitivityAmnt').val())));
    //    }
    //});

    var AvlBudgt = (parseFloat($('#hdnTotalAvailableBudgetActivity').val()) - parseFloat($('#hdnsumAllocatedBudgtHdnActivity').val()))  
    $('#txtTotalAvailableBudgetActivity').val(AvlBudgt);  
    // $('#hdnTotalAvailableBudgetActivity').val(AvlBudgt);

    $('#ddlActTbl_' + i + '').val($('#ddlActivity').val()).change();
    $('#ddlActivity').val(0).change();
    $('.txtModal').val('');

    if (parseFloat($('#txtsumAllocatedBudgtActivity').val()) <= 0) {
        $('#saveBtnActivity').prop("disabled", true);
    } else {
        $('#saveBtnActivity').prop("disabled", false);
    }

    $('#btnActivityBudg').attr('disabled', 'disabled');
}

$('#navAct').on('click', function () {

    BindGridAct(Id);

});
$('#navTask').on('click', function () {

    BindGridTsk(Id);


});
$('#navSMME').on('click', function () {
    sincount = 1;
    LoaderStart("#section-blockSMME");
    BindGridSMME(Id);
});
$('#ddlFundTypeAct').on('change', function () {
    if (this.value > 0) {
        fundWiseAVailBudget(this.value);

    }
});

function fundWiseAVailBudget(fundtype) {
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
            var table = document.getElementById("tblActivity");
            var rows = table.getElementsByTagName("tr")
            if (rows.length > 1) {
                $('#tblActivity tbody tr').each(function (i, row) {
                    $(this).find('select.ddlFundTypeActTbl' + fundtype).each(function () {

                        totalallocatMoney = totalallocatMoney + parseInt($(".tblActFund" + fundtype).val());

                    })
                });
            }

            if (data[0].PBD_AvailbleBudget > 0) {


                AvailBudgte = (data[0].PBD_AvailbleBudget - totalallocatMoney);
                $('#txtAvailableFund').val((data[0].PBD_AvailbleBudget) - totalallocatMoney);
                $('#hdnAvailableFund').val((data[0].PBD_AvailbleBudget) - totalallocatMoney);
                $('.txtAvailAmntTbl' + fundtype).val((data[0].PBD_AvailbleBudget - totalallocatMoney));
            }
            else {
                $('#txtAvailableFund').val(0);
                $('#hdnAvailableFund').val(0);
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

function cellAmntChngeForActivityBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;

    var totalActivityAmount = 0;
    $('#tblActivity tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalActivityAmount += activityAmount;
    });

    var totalBudgetStr = $('#txtTotalBudgetForSpacificFund').val();
    var totalBudget = parseFloat(totalBudgetStr.replace(/[^0-9.-]+/g, "")) || 0;

    // If total activity amount exceeds total budget, show the alert and reset input
    if (totalActivityAmount > totalBudget) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + totalBudget,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        // Reset the value of the current input to 0 (this is the problematic line)
        $(input).val(0);

        // Recalculate the total activity amount after reset
        totalActivityAmount = 0; 
        $('#tblActivity tbody tr').each(function () {
            var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
            totalActivityAmount += activityAmount;
        });

        // Recalculate the available budget
        totalBudgetShow = parseFloat(totalBudget) - totalActivityAmount;
        $('#txtTotalAvailableBudgetActivity').val(totalBudgetShow);
        $('#txtsumAllocatedBudgtActivity').val(totalActivityAmount);

        return false;
    }

    // Update the allocated budget field
    $('#txtsumAllocatedBudgtActivity').val(totalActivityAmount);

    // Calculate available budget
    totalBudgetShow = parseFloat(totalBudget) - totalActivityAmount;
    $('#txtTotalAvailableBudgetActivity').val(totalBudgetShow);
}

function cellAmntChngeForTaskBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;
    var totalTaskAmount = 0;

    // Recalculate the total task amount after all inputs
    $('#tblTask tbody tr').each(function () {
        var taskAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalTaskAmount += taskAmount;
    });

    // Get the total budget available for tasks
    var totalBudgetStr = $('#txtTotalActivityBudget').val();
    var totalBudget = parseFloat(totalBudgetStr.replace(/[^0-9.-]+/g, "")) || 0;

    // Check if the total task amount exceeds the total budget
    if (totalTaskAmount > totalBudget) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + totalBudget,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        // Reset the current input to 0 when the budget exceeds
        $(input).val(0);

        // Recalculate the total task amount after resetting the input
        totalTaskAmount = 0;
        $('#tblTask tbody tr').each(function () {
            var taskAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
            totalTaskAmount += taskAmount;
        });

        // Recalculate available budget after reset
        totalBudgetShow = parseFloat(totalBudget) - totalTaskAmount;
        $('#txtTotalAvailableBudgetTask').val(totalBudgetShow);
        $('#txtsumAllocatedBudgtActivityTask').val(totalTaskAmount);

        return false; // Exit the function
    }

    // Update the allocated budget for tasks
    $('#txtsumAllocatedBudgtActivityTask').val(totalTaskAmount);

    // Calculate the available budget
    totalBudgetShow = parseFloat(totalBudget) - totalTaskAmount;
    $('#txtTotalAvailableBudgetTask').val(totalBudgetShow);
}

function cellAmntChngeForSMMEBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;
    var totalSMMEAmount = 0;

    // Recalculate total SMME amount after all inputs
    $('#tblSMME tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalSMMEAmount += activityAmount;
    });

    // Get the total budget for SMME
    var totalBudgetStr = $('#txtTotalTaskBudgetSMME').val();
    var totalBudget = parseFloat(totalBudgetStr.replace(/[^0-9.-]+/g, "")) || 0;

    // Log values for debugging
    //////console.log("Total SMME Amount: ", totalSMMEAmount);
    //////console.log("Total Budget: ", totalBudget);

    // Check if the total SMME amount exceeds the total budget
    if (totalSMMEAmount > totalBudget) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + totalBudget,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        // Reset the current input to 0 when the budget exceeds
        $(input).val(0);

        // Recalculate the total SMME amount after resetting the input
        totalSMMEAmount = 0;
        $('#tblSMME tbody tr').each(function () {
            var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
            totalSMMEAmount += activityAmount;
        });

        // Recalculate the available budget after reset
        totalBudgetShow = parseFloat(totalBudget) - totalSMMEAmount;
        $('#txtTotalAvailableBudgetTaskSMME').val(totalBudgetShow);
        $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

        return false; // Exit the function
    }

    // Update the allocated budget for SMME
    $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

    // Calculate the available budget
    totalBudgetShow = parseFloat(totalBudget) - totalSMMEAmount;
    $('#txtTotalAvailableBudgetTaskSMME').val(totalBudgetShow);
}


function cellAmntForActivityBudget(t) {
    var txtTotalBudgetForSpacificFund = parseFloat($('#txtTotalBudgetForSpacificFund').val()) || 0; //  -- A  1000
    var totalActivityAmount = 0;  // --B
    $('#tblActivity tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalActivityAmount += activityAmount;
    });
    var calculateValue = txtTotalBudgetForSpacificFund - totalActivityAmount  // - C
    var AcitivityAmnt = t.value;  // -- D

    if (AcitivityAmnt > calculateValue) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + txtTotalBudgetForSpacificFund,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $("#txtAcitivityAmnt").val(0).focus();
        return false;
    }
}

function SaveBudgetDetailsForActivity() {
    var tblBudget = document.getElementById("tblActivity");
    var totalAmntTabl = 0;
    var ActBudgetArr = [];
    $.each($('#tblActivity tbody tr'), function (index, value) {
        ActBudgetArr.push({
            AWB_ActivityId: parseInt($(this).find("td:eq(0) option:selected").val()),
            AWB_ActivityDate: $(this).find("td:eq(1) input[type='text']").val(),
            AWB_ActivityDescription: $(this).find("td:eq(2) input[type='text']").val(),
            AWB_Budget: parseFloat(parseFloat($(this).find("td:eq(3) input[type='text']").val())),
            AWB_BudgetDistId: parseInt($(this).find("td:eq(4) input[type='hidden']").val()),
            AWB_FinancialYearId: parseInt($(this).find("td:eq(5) input[type='hidden']").val())
        });
    });

    var _data = JSON.stringify({
        entity: {
            ActivityList: ActBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForActivity',
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
                        $('#modalBudgAcitivity').modal('hide');
                        $('.txtModal').val('');
                        $('#navAct').trigger('click');
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

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

}

function retriveActivityBudgetDetails(id,PDBId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAcitivityWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            param2: 'PBD_Id',
            param2Value: parseInt(PDBId),
            param3: 'FinancialYearId',
            param3Value: parseInt($('#ddlFinancialYearAct').val()),
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
            LoaderStart("#section-blockBudgetAciti");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetAciti");
        },
        
        success: function (data) {
            data = JSON.parse(data);

            $('#tblActivity tbody').html('');
            var TotalBudgtForActivity = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblActivity");
                var rows = table.getElementsByTagName("tr");
                var enble = '';
                if (parseInt(data[i].AWB_Budget) > parseInt(data[i].AWB_AvailBudget)) {
                    enble = 'disabled';
                }

                //alert(rows.length);
                var tr;

                tr = $('<tr/>');

                tr.append("<td><select " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + "  id='ddlActTbl_" + (i + 1) + "' name='ddlActTbl_" + (i + 1) + "' class='select2 form-select ddlActTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].AWB_ActivityDate + "' name='txtDate_" + (i + 1) + "' id='txtDate_" + (i + 1) + "' class='form-control bs-datepicker-autoclose date-from dtcls txtDate" + data[i].AWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].AWB_ActivityDescription + "' name='txtDescription_" + (i + 1) + "' id='txtDescription_" + (i + 1) + "' class='form-control txtDescription" + data[i].AWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].AWB_Budget + "'    class='form-control tblActFund" + data[i].AWB_BudgetDistId + "' name='txtAmntAct_" + (i + 1) + "' id='txtAmntAct_" + (i + 1) + "' " + enble + " onkeyup='cellAmntChngeForActivityBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailActivityAmnt_" + (i + 1) + "' id='hdnTotalAvailActivityAmnt_" + (i + 1) + "' class='hdnTotalAvailActivityAmntTbl" + data[i].AWB_BudgetDistId + "' disabled ></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].AWB_BudgetDistId + "' name='hdnBudgetDist_" + i + "' id='hdnBudgetDist_" + i + "' class='form-control txtDescription" + data[i].AWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].AWB_FinancialYearId + "' name='hdnFinancialYearId_" + i + "' id='hdnFinancialYearId_" + i + "' class='form-control txthdnFinancialYearId" + data[i].AWB_FinancialYearId + "'/></td>");
                tr.append("<td style='text-align:center'><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickActivity(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
                // tr.append("<td style='text-align:center'><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickActivity(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
                $('#tblActivity tbody').append(tr);

                $('.txtAvailAmntTbl' + data[i].AWB_BudgetDistId + '').val(data[i].PBD_AvailbleBudget);
                $('#hdnTotalAvailActivityAmnt_' + (i + 1) + '').val(data[i].PBD_AvailbleBudget + data[i].AWB_Budget);
                $('.hdnAvailAmntTbl' + data[i].AWB_BudgetDistId + '').val(data[i].PBD_AvailbleBudget);
                //AvailBudgte=data[i].PBD_AvailbleBudget;--old

                TotalBudgtForActivity = TotalBudgtForActivity + data[i].AWB_Budget;
                AvailBudgte = data[i].PBD_AvailbleBudget + data[i].AWB_Budget;

                var drpAct = $('#ddlActTbl_' + (i + 1) + '');

                drpAct.length &&
                   drpAct.each(function () {
                       var drpAct = $(this);
                       drpAct.wrap('<div class="position-relative"></div>'), drpAct.select2({ placeholder: "Select A Activity", dropdownParent: drpAct.parent() });
                   });

                DropdownBinder.DDLData = {
                    tableName: "CreateActivity_CA",
                    Text: 'CA_ActivityName',
                    Value: 'CA_Id',
                    ColumnName: 'CA_ProjectId',
                    PId: Id

                };
                DropdownBinder.DDLElem = $('#ddlActTbl_' + (i + 1) + '');
                DropdownBinder.Execute();

                $('#ddlFundTypeAct').val(0).change();
                $('#ddlActTbl_' + (i + 1) + '').val(data[i].AWB_ActivityId).change();
                $('#ddlActivity').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgAcitivity').modal('show');
            }
            $('#txtsumAllocatedBudgtActivity').val(TotalBudgtForActivity);
            $('#hdnsumAllocatedBudgtHdnActivity').val(TotalBudgtForActivity);

            if (parseFloat($('#txtsumAllocatedBudgtActivity').val()) <= 0) {
                $('#saveBtnActivity').prop("disabled", true);
            } else {
                $('#saveBtnActivity').prop("disabled", false);
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

function deleteconfirmBoxClickActivity(rowNo) {
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
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val());

            $(rowNo).closest('tr').remove();

            var TotalAmt = 0;
            if (id == 'tblActivity') {
                $.each($('#tblActivity tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(3) input[type='text']").val());
                });
            }
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetActivity').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            $('#txtTotalAvailableBudgetActivity').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivity').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivity').val(TotalAmt);
        }
    });
}

function deleteconfirmBoxClickForTask(rowNo) {
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
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val());

            $(rowNo).closest('tr').remove();

            var TotalAmt = 0;
            if (id == 'tblTask') {
                $.each($('#tblTask tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(3) input[type='text']").val());
                });
            }
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetTask').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            $('#txtTotalAvailableBudgetTask').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivityTask').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivityTask').val(TotalAmt);
        }
    });
}


/////////////////////////////////////////////////////////////////////////////TaskWiseBudget///////////////////////////////////////////////////


function AddTaskBudget() {

    if (parseFloat($('#txtTotalActivityBudget').val()) < parseFloat($('#txtTaskAmnt').val())) {
        Swal.fire({
            title: "Oops..!",
            text: 'Please Enter Amount Less Than ' + parseFloat($('#txtTotalActivityBudget').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtTaskAmnt').val(0);
        return false;
    }
    var task = 0;
    var acti = 0;
    $.each($('#tblTask tbody tr'), function (index, value) {
        //$(t).closest('tr').find("td:eq(3) input[type='hidden']").val()
        if ((parseInt($('#ddlTask').val()) == parseInt($(this).find("td:eq(0) option:selected").val())) && (parseInt($('#ddlTaskActivity').val()) == parseInt($(this).closest('tr').find("td:eq(5) input[type='hidden']").val()))) {
            task = 1;
            acti = 1;
        }
    });

    if (task == 1 && acti == 1) {
        Swal.fire({
            title: "Oops..!",
            text: 'Same task and along with this activity already exists',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    task = 0;
    acti = 0;
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblTask");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var i = (rows.length);
    tr = $('<tr/>');
    tr.append("<td><select id='ddlTaskTbl_" + i + "' name='ddlTaskTbl_" + i + "' class='select2 form-select ddlTaskTbl' data-allow-clear='true'></select></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtTaskDate').val() + "' class='form-control' name='txtTaskDate_" + i + "' id='txtTaskDate_" + i + "'></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtTaskDesc').val() + "' class='form-control' name='txtTaskDesc_" + i + "' id='txtTaskDesc_" + i + "'></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtTaskAmnt').val() + "' class='form-control tblActivityAmount tblActFund" + $('#txtTaskAmnt').val() + "' name='txtAmntTask_" + i + "' id='txtAmntTask_" + i + "' onkeyup='cellAmntChngeForTaskBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistTask').val() + "' name='hdnBudgetDistTask_" + i + "' id='hdnBudgetDistTask_" + i + "' /></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskActivity').val() + "' name='hdnTaskActivity_" + i + "' id='hdnTaskActivity_" + i + "' /></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlFinancialYearTask').val() + "' name='hdnFinancialYearTask_" + i + "' id='hdnFinancialYearTask_" + i + "' /></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickForTask(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
    $('#tblTask tbody').append(tr);


    var txtActAmnt = parseInt($('#txtTaskAmnt').val());
    var txtsum = parseInt($('#txtsumAllocatedBudgtActivityTask').val());
    if (isNaN(txtsum)) {
        $('#txtsumAllocatedBudgtActivityTask').val(txtActAmnt);
        $('#hdnsumAllocatedBudgtHdnActivityTask').val(txtActAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivityTask').val(txtActAmnt + txtsum);
        $('#hdnsumAllocatedBudgtHdnActivityTask').val(txtActAmnt + txtsum);
    }

    $.each($('#tblTask tbody tr'), function (index, value) {
        if ((parseInt($('#ddlTask').val()) == parseInt($(this).find("td:eq(0) option:selected").val()))) {
            $(this).find("td:eq(3) input[type='hidden']").val(parseInt($(this).find("td:eq(3) input[type='text']").val()) + parseInt(parseInt($('#txtTaskAmnt').val())));
        }
    });

    var AvlBudgt = ($('#hdnTotalAvailableBudgetTask').val() - $('#hdnsumAllocatedBudgtHdnActivityTask').val())
    $('#txtTotalAvailableBudgetTask').val(AvlBudgt);

    var drpact = $('#ddlTaskActivityTbl_' + i + '');
    var drpTask = $('#ddlTaskTbl_' + i + '');
   
    drpact.length &&
        drpact.each(function () {
            var drpact = $(this);
            drpact.wrap('<div class="position-relative"></div>'), drpact.select2({ placeholder: "Select A Activity", dropdownParent: drpact.parent() });
        });

    drpTask.length &&
       drpTask.each(function () {
           var drpTask = $(this);
           drpTask.wrap('<div class="position-relative"></div>'), drpTask.select2({ placeholder: "Select A Task", dropdownParent: drpTask.parent() });
       });

    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName: 'CA_ProjectId',
        PId: Id

    };
    DropdownBinder.DDLElem = $('#ddlTaskActivityTbl_' + i + '');
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "TaskDeatils_TD",
        Text: 'TD_TaskName',
        Value: 'TD_Id',
        ColumnName: 'TD_ProjectId',
        PId: Id,
        PId1: $('#ddlTaskActivity').val(),
        ColumnName1: 'TD_ActivityId',
    };
    DropdownBinder.DDLElem = $('#ddlTaskTbl_' + i + '');
    DropdownBinder.Execute();

    $('#ddlTaskActivityTbl_' + i + '').val($('#ddlTaskActivity').val()).change();


    $('#ddlFundTypeTask').val(0).change();
    $('#ddlTaskTbl_' + i + '').val($('#ddlTask').val()).change();

    $('#ddlTask').val(0).change();

    $('.txtModal').val('');

    if (parseFloat($('#txtsumAllocatedBudgtActivityTask').val()) <= 0) {
        $('#btnSaveBudgetDetailsForTask').prop("disabled", true);
    } else {
        $('#btnSaveBudgetDetailsForTask').prop("disabled", false);
    }

    $('#btnTaskBudg').attr('disabled', 'disabled');
}

$('#ddlFundTypeTask').on('change', function () {
    if (this.value > 0) {
        fundWiseAvailBudgetTask(this.value);
    }
});

function fundWiseAvailBudgetTask(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTask',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),
            param3: 'ActivityId',
            param3Value: parseInt($('#ddlTaskActivity').val()),
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

            var totalavalfundtbl = 0;
            var totalallocatMoney = 0;
            var table = document.getElementById("tblTask");
            var rows = table.getElementsByTagName("tr")
            if (rows.length > 1) {
                $('#tblTask tbody tr').each(function (i, row) {
                    $(this).find('select.ddlFundTypeTaskTbl' + fundtype + $('#ddlTaskActivity').val()).each(function () {
                        totalallocatMoney = totalallocatMoney + parseInt($(".tblTaskFund" + fundtype + $('#ddlTaskActivity').val()).val());
                        totalavalfundtbl = parseInt($(".hdnAvailTaskAmntTbl" + fundtype + $('#ddlTaskActivity').val()).val());
                    })
                });
            }
            if (data[0].PBD_AvailbleBudget > 0) {
                AvailBudgteTask = (totalavalfundtbl > 0 ? totalavalfundtbl : data[0].PBD_AvailbleBudget);
                $('#txtAvailableFundTask').val((AvailBudgteTask));
                $('#hdnAvailableFundTask').val((AvailBudgteTask));
                $('.txtAvailTaskAmntTbl' + fundtype + $('#ddlTaskActivity').val()).val((AvailBudgteTask));
                $('#btnAddTaskBudget').removeAttr('disabled');
            }else {
                $('#txtAvailableFundTask').val(0);
                $('#hdnAvailableFundTask').val(0);
                $('#btnAddTaskBudget').attr('disabled', 'disabled');
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



function cellAmntForTaskBudget(t) {
    var txtTotalActivityBudget = $('#txtTotalActivityBudget').val()   //($('#txtTotalActivityBudget').val().substring(1)); //  -- A  1000
    var totalActivityAmount = 0;  // --B
    $('#tblTask tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalActivityAmount += activityAmount;
    });

    var calculateValue = txtTotalActivityBudget - totalActivityAmount  // - C

    var AcitivityAmnt = t.value;  // -- D

    if (AcitivityAmnt > calculateValue) {
        Swal.fire({
            title: "Oops..!",
            text: 'Amount Should Be Less Than ' + txtTotalActivityBudget,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $("#txtTaskAmnt").val(0).focus();
        return false;
    }
}


function SaveBudgetDetailsForTask() {
    var totalAmntTabl = 0;
    var TaskBudgetArr = [];
    $.each($('#tblTask tbody tr'), function (index, value) {
        TaskBudgetArr.push({
            TWB_TaskId: parseInt($(this).find("td:eq(0) option:selected").val()),
            TWB_TaskDate:  $(this).find("td:eq(1) input[type='text']").val(),
            TWB_TaskDescription: $(this).find("td:eq(2) input[type='text']").val(),
            TWB_Budget: parseFloat(parseFloat($(this).find("td:eq(3) input[type='text']").val())),
            TWB_BudgetDistId: parseInt($(this).find("td:eq(4) input[type='hidden']").val()),
            TWB_ActivityId: parseInt($(this).find("td:eq(5) input[type='hidden']").val()),
            TWB_FinancialYearId: parseInt($(this).find("td:eq(6) input[type='hidden']").val()),
        });
    });

    var _data = JSON.stringify({
        entity: {
            TaskList: TaskBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForTask',
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
                        $('#modalBudgTask').modal('hide');
                         $('#navTask').trigger('click');
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
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
}



function retriveTaskBudgetDetails(id, ActId, PbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            param2: 'ActivityId',
            param2Value: parseInt(ActId),
            param3: 'PBD_Id',
            param3Value: parseInt(PbdId),
            param4: 'FinancialYearId',
            param4Value: parseInt($('#ddlFinancialYearTask').val()),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
      
        complete: function () {
            LoaderEnd("#section-blockBudgetTsk");
        },
        
        success: function (data) {
            data = JSON.parse(data);

            ////////console.log('Dyaadg- ',data)

            $('#tblTask tbody').html('');
            var TotalBudgtForTask = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblTask");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;
                tr = $('<tr/>');
                tr.append("<td><select " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + "  id='ddlTaskTbl_" + (i + 1) + "' name='ddlTaskTbl_" + (i + 1) + "' class='select2 form-select ddlTaskTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].TWB_TaskDate + "' name='txtDate_" + (i + 1) + "' id='txtDate_" + (i + 1) + "' class='form-control txtDate" + data[i].TWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].TWB_TaskDescription + "' name='txtDescription_" + (i + 1) + "' id='txtDescription_" + (i + 1) + "' class='form-control txtDescription" + data[i].TWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].TWB_Budget + "'    class='form-control tblTaskFund" + data[i].TWB_BudgetDistId + "" + data[i].TWB_ActivityId + "' name='txtAmntTask_" + (i + 1) + "' id='txtAmntTask_" + (i + 1) + "' onkeyup='cellAmntChngeForTaskBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailTaskAmnt_" + (i + 1) + "' id='hdnTotalAvailTaskAmnt_" + (i + 1) + "' class='hdnTotalAvailTaskAmntTbl" + data[i].TWB_BudgetDistId + "" + data[i].TWB_ActivityId + "' ></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].TWB_BudgetDistId + "' name='hdnBudgetDistTask_" + i + "' id='hdnBudgetDistTask_" + i + "' class='form-control txtDescription" + data[i].TWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].TWB_ActivityId + "' name='hdnActivity_" + i + "' id='hdnActivity_" + i + "' class='form-control txtDescription" + data[i].TWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].TWB_FinancialYearId + "' name='hdnFinancialYearId_" + i + "' id='hdnFinancialYearId_" + i + "' class='form-control txtFinancialYearId" + data[i].TWB_FinancialYearId + "'/></td>");
                tr.append("<td style='text-align:center'><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickForTask(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
             
                $('#tblTask tbody').append(tr);

                TotalBudgtForTask = TotalBudgtForTask + data[i].TWB_Budget;
                AvailBudgte = data[i].PBD_AvailbleBudget + data[i].TWB_Budget;

                // var drpact = $('#ddlTaskActivityTbl_' + (i + 1) + '');
                var drp = $('#ddlFundTypeTaskTbl_' + (i + 1) + '');
                var drpTask = $('#ddlTaskTbl_' + (i + 1) + '');

                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });

                drpTask.length &&
                   drpTask.each(function () {
                       var drpTask = $(this);
                       drpTask.wrap('<div class="position-relative"></div>'), drpTask.select2({ placeholder: "Select A Task", dropdownParent: drpTask.parent() });
                   });

                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem = $('#ddlFundTypeTaskTbl_' + (i + 1) + '');
                DropdownBinder.Execute();


                DropdownBinder.DDLData = {
                    tableName: "TaskDeatils_TD",
                    Text: 'TD_TaskName',
                    Value: 'TD_Id',
                    ColumnName: 'TD_ProjectId',
                    PId: Id,
                    PId1: data[i].TWB_ActivityId,
                    ColumnName1: 'TD_ActivityId',

                };
                DropdownBinder.DDLElem = $('#ddlTaskTbl_' + (i + 1) + '');
                DropdownBinder.Execute();


                $('#ddlTaskActivityTbl_' + (i + 1) + '').val(data[i].TWB_ActivityId).change();
                $('#ddlFundTypeTaskTbl_' + (i + 1) + '').val(data[i].TWB_BudgetDistId).change();

                $('#ddlFundTypeTask').val(0).change();


                $('#ddlTaskTbl_' + (i + 1) + '').val(data[i].TWB_TaskId).change();

                $('#ddlTask').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgTask').modal('show');
            }
            $('#txtsumAllocatedBudgtActivityTask').val(TotalBudgtForTask);
            $('#hdnsumAllocatedBudgtHdnActivityTask').val(TotalBudgtForTask);

            if (parseFloat($('#txtsumAllocatedBudgtActivityTask').val()) <= 0) {
                $('#btnSaveBudgetDetailsForTask').prop("disabled", true);
            } else {
                $('#btnSaveBudgetDetailsForTask').prop("disabled", false);
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
            }else {
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


function AddSMMEBudget() {
    var actsmme = 0;
    var tasksmme = 0;
    var smme = 0;
    $.each($('#tblSMME tbody tr'), function (index, value) {
        if ((parseInt($('#ddlSMME').val()) == parseInt($(this).find("td:eq(0) option:selected").val()))){
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
    tr.append("<td  style='width:20%;'><input type='text' value =" + $('#txtSMMEAmnt').val() + "    class='form-control tblSMMEFund" + $('#ddlFundTypeSMME').val() + "' name='txtAmntSMME_" + m + "' id='txtAmntSMME_" + m + "' onkeyup='cellAmntChngeForSMMEBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailSMMEAmnt_" + m + "' id='hdnTotalAvailSMMEAmnt_" + m + "' class='hdnTotalAvailSMMEAmntTbl" + $('#ddlFundTypeSMME').val() + "' ></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistSMME').val() + "' name='hdnBudgetDistSMME_" + m + "' id='hdnBudgetDistSMME_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskActivitySMME').val() + "' name='hdnActivity_" + m + "' id='hdnActivity_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskSMME').val() + "' name='hdnTask_" + m + "' id='hdnTask_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlFinancialYearSMME').val() + "' name='hdnFinancialYearSMME_" + m + "' id='hdnFinancialYearSMME" + m + "'/></td>");
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

    var AvlBudgt = ($('#hdnTotalAvailableBudgetTaskSMME').val() - $('#hdnsumAllocatedBudgtHdnActivitySMME').val())
    $('#txtTotalAvailableBudgetTaskSMME').val(AvlBudgt);


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
    var SMMEBudgetArr = [];
    $.each($('#tblSMME tbody tr'), function (index, value) {

        SMMEBudgetArr.push({
            SWB_SMMEId: parseInt($(this).find("td:eq(0) option:selected").val()),
            SWB_SMMEDate: $(this).find("td:eq(1) input[type='text']").val(),
            SWB_SMMEDescription: $(this).find("td:eq(2) input[type='text']").val(),
            SWB_Budget: parseFloat($(this).find("td:eq(3) input[type='text']").val()),
            SWB_BudgetDistId: parseInt($(this).find("td:eq(4) input[type='hidden']").val()),
            SWB_ActivityId: parseInt($(this).find("td:eq(5) input[type='hidden']").val()),
            SWB_TaskId: parseInt($(this).find("td:eq(6) input[type='hidden']").val()),
            SWB_FinancialYearId: parseInt($(this).find("td:eq(7) input[type='hidden']").val())
        });
    });

    var _data = JSON.stringify({
        entity: {
            SMMEWiseBudgetList: SMMEBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForSMME',
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
                        $('#modalBudgSMME').modal('hide');
                        $('.txtEmpFld').val('');
                        $('#navSMME').trigger('click');
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
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
}

function retriveSMMEBudgetDetails(Id, acId, taskId, pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'TaskId',
            param3Value: parseInt(taskId),
            param4: 'PBD_Id',
            param4Value: parseInt(pbdId),
            param5: 'FinancialYearId',
            param5Value: parseInt($('#ddlFinancialYearSMME').val()),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
       
        complete: function () {
            LoaderEnd("#section-blockBudgetSMME");
        },
        
        success: function (data) {
            data = JSON.parse(data);
            console.log('SMME Budget Data dgdh-   ', data);

            $('#tblSMME tbody').html('');
            var TotalBudgtForSMME = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblSMME");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;

                tr = $('<tr/>');
                tr.append("<td><select id='ddlSMMETbl_" + (i + 1) + "' name='ddlSMMETbl_" + (i + 1) + "' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input type='text' value ='" + data[i].SWB_SMMEDate + "' name='txtDate_" + (i + 1) + "' id='txtDate_" + (i + 1) + "' class='form-control txtDate" + data[i].SWB_BudgetDistId + "' ></td>");
                tr.append("<td><input type='text' value ='" + data[i].SWB_SMMEDescription + "' name='txtDescription_" + (i + 1) + "' id='txtDescription_" + (i + 1) + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "' ></td>");

                tr.append("<td style='width:20%;'><input type='text' value ='" + data[i].SWB_Budget + "'    class='form-control tblSMMEFund" + data[i].SWB_BudgetDistId + "' name='txtAmntSMME_" + (i + 1) + "' id='txtAmntSMME_" + (i + 1) + "' onkeyup='cellAmntChngeForSMMEBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_BudgetDistId + "' name='hdnBudgetDistSMME_" + i + "' id='hdnBudgetDistSMME_" + i + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_ActivityId + "' name='hdnSMME_" + i + "' id='hdnSMME_" + i + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_TaskId + "' name='hdnTaskSMME_" + i + "' id='hdnTaskSMME_" + i + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_FinancialYearId + "' name='hdnFinancialYearId_" + i + "' id='hdnFinancialYearId_" + i + "' class='form-control FinancialYearId" + data[i].SWB_FinancialYearId + "'/></td>");
                tr.append("<td style='text-align:center'><button  onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");

                //tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
                $('#tblSMME tbody').append(tr);

                TotalBudgtForSMME = TotalBudgtForSMME + data[i].SWB_Budget;

                // AvailBudgte = data[i].PBD_AvailbleBudget + data[i].TWB_Budget;
                //$('.txtAvailSMMEAmntTbl' + data[i].SWB_FundTypeId + '').val(data[i].PBD_AvailbleBudget);
                //$('#hdnTotalAvailSMMEAmnt_' + (i + 1) + '').val(data[i].PBD_AvailbleBudget + data[i].SWB_Budget);
                //$('.hdnAvailSMMEAmntTbl' + data[i].SWB_FundTypeId + '').val(data[i].PBD_AvailbleBudget);
                //AvailBudgteSMME = data[i].PBD_AvailbleBudget + data[i].SWB_Budget;

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

                $('#ddlSMMETbl_' + (i + 1) + '').val(data[i].SWB_SMMEId).change();
                $('#ddlSMME').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgSMME').modal('show');
            }
            $('#txtsumAllocatedBudgtActivitySMME').val(TotalBudgtForSMME);
            $('#hdnsumAllocatedBudgtHdnActivitySMME').val(TotalBudgtForSMME);

            if (parseFloat($('#txtsumAllocatedBudgtActivitySMME').val()) <= 0) {
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


/////////////////////////////////////////////////////////Save///////////////////////////////////////
function SaveBudgetForProject() {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            PD_Id: Id,
            PD_BudgetType: $('#ddlBudgetType').val(),
            //PD_Budget: $('#txtBudget').val(),
            TransactionType: "UpdateBudget",
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
                $('#hdnBudget').val($('#txtBudget').val());
                $('#hdnBdgtType').val($("#ddlBudgetType option:selected").text());

                //retrive(Id)
                // $('#totalbudget').text($('#txtBudget').val());

                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {

                    if (result.isConfirmed) {
                        $('#backDropModal').modal('hide');
                    }
                    window.location.href='/Project/ProjectBudgetDashboard?Id='+ Id +'&ENR_Id='+$('#hdnProjctENrId').val();

                });

            }
            else {
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

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

}

function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: parseInt(id),
            //param2: 'FinancialYearId',
            //param2Value: parseInt($('#hdnFyFilterId').val()),
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
            //  data = JSON.parse(data);
            
            try {
                data = JSON.parse(data);

                //////console.log('SMME Taka ',data);

                if (Array.isArray(data) && data.length > 0) {
                    
                    console.log("filter data- ", data);

                    $('#hdnBdgtType').val(data[0].BT_Type);
                    //if (data[0].PD_Budget > 0) {
                    //    $("#btnBudgetFundDistribution").prop('disabled', false);
                    //}
                    hdnBudget = data[0].PD_Budget;
                    sumFundBudget = data[0].PD_Budget;
                    $('#hdnBudget').val(data[0].PD_Budget);
                    $('#totalbudget').html(data[0].PD_Budget);
                    $('#totalUnallocatedBudget').html(data[0].unallocatedBudget);
                    
                    // Currency Format
                    formatToZAR(data[0].PD_Budget, '#totalbudgetFormeted');
                    formatToZAR(data[0].PD_Budget, '#totalbudgetFormetedForDist');
                    formatToZAR(data[0].unallocatedBudget, '#totalUnallocatedBudget');

                    LoaderEnd($("#section-blockBgtAmt").val())
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

            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); 
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

$("#btnBudgetAllocation").click(function () {
      $('#ddlBudgetType').find('option').remove();
    retriveprojectbudget(Id);
    DropdownBinder.DDLData = {
        tableName: "BudgetType_BT",
        Text: 'BT_Type',
        Value: 'BT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBudgetType");
    DropdownBinder.Execute();

    $('#backDropModal').modal('show');
    if (hdnBudget > 0) {
        $("#btnBudgetFundDistribution").prop('disabled', false);
    }
});

$("#btnBudgetFundDistribution").click(function () {
    $('#ddlFinancialYearSMME').find('option').remove();
    $('#ddlFinancialYear').find('option').remove();
  
    
    FinancialYear('#ddlFinancialYear', Id);

    
    $('#exLargeModal').modal('show');
});
$("#btnBudgetFundAllocation").click(function () {
    
    $('#ddlFundType').find('option').remove();
    $('#ddlEnterprise').find('option').remove();
    $('#tblBudgetFund tbody').html('');
    
    $('.inpEmpt').val('');
    $('#sumAllocatedBudgt').val('');
 


    $('#ddlFinancialYearFund').find('option').remove();
    
    //DropdownBinder.DDLData = {
    //    tableName: "FinancialYearMaster_FM",
    //    Text: 'FM_Name',
    //    Value: 'FM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFinancialYearFund");
    //DropdownBinder.Execute();

    FinancialYear('#ddlFinancialYearFund', Id);

    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlFundType");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $("#ddlEnterprise");
    DropdownBinder.Execute();

    $('#modalBudgetAllocation').modal('show');
});


$('#txtAmnt').on('change', function () {
    if (parseFloat($('#txtAmnt').val()) <= 0) {
        $('.AddBgtAllocaBtn').prop("disabled", true);
    } else {
        $('.AddBgtAllocaBtn').prop("disabled", false);
    }
});


//------------------- // Start SMME--------------------
$("#btnAsgnSMME").click(function () {
    $('#ddlFinancialYearSMME').find('option').remove();

    //DropdownBinder.DDLData = {
    //    tableName: "FinancialYearMaster_FM",
    //    Text: 'FM_Name',
    //    Value: 'FM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFinancialYearSMME");
    //DropdownBinder.Execute();

    FinancialYear('#ddlFinancialYearSMME', Id);
    $('#ddlBudgetDistSMME').find('option').remove();
    $('#ddlTaskActivitySMME').find('option').remove();
    $('#ddlTaskSMME').find('option').remove(); 
    // $('#ddlSMME').find('option').remove();
    $('#ddlSMME').val(0).change();


    $('#tblSMME tbody').html('');
    $('.txSMME').val('');
    $('.txSMMESpan').text('');

    $('#modalBudgSMME').modal('show');
    //var totalbudget = $('#totalbudget').text();
    //$('#txtTotalProjectBudgetSMME').val('R ' + totalbudget);
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
                $('.txsmmeCle').val('');
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

//    if ($('#txtTotalProjectBudgetSMME').val() > 0) {
//        Swal.fire({
//            title: "Do you want to change this Period?",
//            text: "Once you change this period, all other data will be lost.",
//            icon: "warning",
//            showCancelButton: !0,
//            confirmButtonText: "Yes, Do it!",
//            customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
//            buttonsStyling: !1,
//        }).then((result) => {
//            if (result.isConfirmed) {
//                //$('#tblTask tbody').html('');
//                $('.txsmmeCle ').val('');
//                $('.oncngClrSMMESpn').text('');
//                //$('.txtask').val('');
//                //$('.txtaskSpan').text('');

//                //$('#ddlBudgetDistSMME').find('option').remove();
//                DropdownBinder.DDLData = {
//                    tableName: "ProjectBudgetDetails_PBD",
//                    Text: 'PBD_FundName',
//                    Value: 'PBD_Id',
//                    ColumnName: 'PBD_ProjectId',
//                    PId: parseInt(Id),
//                    PId1: $("#ddlFinancialYearAct").val(),
//                    ColumnName1: 'PBD_FinancialYearId',
//                };
//                DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
//                DropdownBinder.Execute();

//                if (parseFloat($('#txtTotalBudgetForSpacificFundSMME').val()) <= 0) {
//                    $('#txtSMMEAmnt').prop("disabled", true);
//                } else {
//                    $('#txtSMMEAmnt').prop("disabled", false);
//                }
//                $('#ddlSMME').find("option").remove();
//                fundWiseBudgetDistributionDetailsSMME($('#ddlBudgetDistSMME').val());
//            }
//        });
//    } else {
//        if (parseFloat($('#txtTotalBudgetForSpacificFundSMME').val()) <= 0) {
//            $('#txtSMMEAmnt').prop("disabled", true);
//        } else {
//            $('#txtSMMEAmnt').prop("disabled", false);
//        }
//        $('#ddlSMME').find("option").remove();
//        fundWiseBudgetDistributionDetailsSMME($('#ddlBudgetDistSMME').val());
//    }
    
//});

$('#txtSMMEAmnt').on('change', function () {
    if (parseFloat($('#txtSMMEAmnt').val()) <= 0) {
        $('.AddSMMEBtn').prop("disabled", true);
    } else {
        $('.AddSMMEBtn').prop("disabled", false);
    }
});

//------------------- // End SMME--------------------


//------------------- // Start Task--------------------
$("#btnAsgnTASK").click(function () {

    $('#ddlFinancialYearTask').find('option').remove();

    //DropdownBinder.DDLData = {
    //    tableName: "FinancialYearMaster_FM",
    //    Text: 'FM_Name',
    //    Value: 'FM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFinancialYearTask");
    //DropdownBinder.Execute();

    FinancialYear('#ddlFinancialYearTask', Id);

    $('#ddlBudgetDistTask').find('option').remove();
    $('#ddlTaskActivity').find('option').remove(); 
    $('#ddlTask').find('option').remove();

    //DropdownBinder.DDLData = {
    //    tableName: "ProjectBudgetDetails_PBD",
    //    Text: 'PBD_FundName',
    //    Value: 'PBD_Id',
    //    ColumnName: 'PBD_ProjectId',
    //    PId: parseInt(Id)
    //};
    //DropdownBinder.DDLElem = $("#ddlBudgetDistTask");
    //DropdownBinder.Execute();

    $('#tblTask tbody').html('');
    $('.txtask').val('');
    $('.txtaskSpan').text('');
    $('#modalBudgTask').modal('show');
});


let previousBudgetDistTaskValue = $('#ddlBudgetDistTask').val();

// Store previous value on focus
$('#ddlBudgetDistTask').on('focus', function () {
    previousBudgetDistTaskValue = $(this).val();
});

$('#ddlBudgetDistTask').on('change', function () {
    const $this = $(this);
    const selectedValue = $this.val();

    if ($('#txtTotalProjectBudgetTask').val() > 0) {
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
                $('#ddlTaskActivity').find('option').remove();
                $('#ddlTask').find('option').remove();
                $('#tblTask tbody').html('');
                $('.txtaskCle').val('');
                $('.txtaskCleSpn').text('');
                $('.oncgeTaskClr').val('');
                

                DropdownBinder.DDLData = {
                    tableName: "ProjectBudgetDetails_PBD",
                    Text: 'PBD_FundName',
                    Value: 'PBD_Id',
                    ColumnName: 'PBD_ProjectId',
                    PId: parseInt(Id),
                    PId1: $("#ddlFinancialYearAct").val(),
                    ColumnName1: 'PBD_FinancialYearId',
                };
                DropdownBinder.DDLElem = $("#ddlBudgetDistTask");
                DropdownBinder.Execute();

                // Enable/disable amount input
                if (parseFloat($('#txtTotalBudgetForSpacificFundTask').val()) <= 0) {
                    $('#txtTaskAmnt').prop("disabled", true);
                } else {
                    $('#txtTaskAmnt').prop("disabled", false);
                }

                // Load fund-wise data
                fundWiseBudgetDistributionDetailsTask(selectedValue);

                // Update stored previous value
                previousBudgetDistTaskValue = selectedValue;
            } else {
                // Revert dropdown selection
                $this.val(previousBudgetDistTaskValue);
                $this.trigger('change.select2'); // Remove if not using Select2
            }
        });
    } else {
        // No confirmation needed
        $('#ddlTaskActivity').find('option').remove();
        $('#ddlTask').find('option').remove();
        $('#tblTask tbody').html('');
        $('.txtaskCle').val('');
        $('.txtaskCleSpn').text('');

        if (parseFloat($('#txtTotalBudgetForSpacificFundTask').val()) <= 0) {
            $('#txtTaskAmnt').prop("disabled", true);
        } else {
            $('#txtTaskAmnt').prop("disabled", false);
        }

        // Rebind activity dropdown
        DropdownBinder.DDLData = {
            tableName: "CreateActivity_CA",
            Text: 'CA_ActivityName',
            Value: 'CA_Id',
            ColumnName: 'CA_ProjectId',
            PId: Id
        };
        DropdownBinder.DDLElem = $('#ddlTaskActivity');
        DropdownBinder.Execute();

        fundWiseBudgetDistributionDetailsTask(selectedValue);

        // Update previous value because no confirmation needed
        previousBudgetDistTaskValue = selectedValue;
    }
});


//$('#ddlBudgetDistTask').on('change', function () {

//    if ($('#txtTotalProjectBudgetTask').val() > 0) {
//        Swal.fire({
//            title: "Do you want to change this Period?",
//            text: "Once you change this period, all other data will be lost.",
//            icon: "warning",
//            showCancelButton: !0,
//            confirmButtonText: "Yes, Do it!",
//            customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
//            buttonsStyling: !1,
//        }).then((result) => {
//            if (result.isConfirmed) {
//                $('.oncgeTaskClr').val('');
//                $('.oncgeTaskClrSpn').text('');
//                //$('#ddlBudgetDistTask').find('option').remove();
//                DropdownBinder.DDLData = {
//                    tableName: "ProjectBudgetDetails_PBD",
//                    Text: 'PBD_FundName',
//                    Value: 'PBD_Id',
//                    ColumnName: 'PBD_ProjectId',
//                    PId: parseInt(Id),
//                    PId1: $("#ddlFinancialYearAct").val(),
//                    ColumnName1: 'PBD_FinancialYearId',
//                };
//                DropdownBinder.DDLElem = $("#ddlBudgetDistTask");
//                DropdownBinder.Execute();
//            }
//        });
//    } else {
//        $('#ddlTaskActivity').find('option').remove();
//        $('#ddlTask').find('option').remove();

//        $('#tblTask tbody').html('');
//        $('.txtaskCle').val('');
//        $('.txtaskCleSpn').text('');

//        if (parseFloat($('#txtTotalBudgetForSpacificFundTask').val()) <= 0) {
//            $('#txtTaskAmnt').prop("disabled", true);
//        } else {
//            $('#txtTaskAmnt').prop("disabled", false);
//        }

//        $('#ddlTaskActivity').find('option').remove();
//        DropdownBinder.DDLData = {
//            tableName: "CreateActivity_CA",
//            Text: 'CA_ActivityName',
//            Value: 'CA_Id',
//            ColumnName: 'CA_ProjectId',
//            PId: Id
//        };
//        DropdownBinder.DDLElem = $('#ddlTaskActivity');
//        DropdownBinder.Execute();

//        var txtTaskGetId = $('#ddlBudgetDistTask').val();
//        fundWiseBudgetDistributionDetailsTask(txtTaskGetId);
//    }


    
//});

$('#txtTaskAmnt').on('change', function () {
    if (parseFloat($('#txtTaskAmnt').val()) <= 0) {
        $('.AddTaskBtn').prop("disabled", true);
    } else {
        $('.AddTaskBtn').prop("disabled", false);
    }
});
//------------------- // End Task--------------------

//------------------- // Start Activity--------------------
$("#btnAsgnAct").click(function () {
    $('#ddlFinancialYearAct').find('option').remove();
    $('#ddlBudgetDistActivity').find('option').remove();
    $('#ddlActivity').find('option').remove();
    //DropdownBinder.DDLData = {
    //    tableName: "CreateActivity_CA",
    //    Text: 'CA_ActivityName',
    //    Value: 'CA_Id',
    //    ColumnName: 'CA_ProjectId',
    //    PId: Id
    //};
    //DropdownBinder.DDLElem = $('#ddlActivity');
    //DropdownBinder.Execute();

    FinancialYear('#ddlFinancialYearAct', Id);
    
    $('#tblActivity tbody').html('');
    $('.txtact').val('');
    $('.txtactSpan').text('');
    $('#modalBudgAcitivity').modal('show');
});


let previousBudgetDistActivityValue = $('#ddlBudgetDistActivity').val();

// Store the previous value when focused
$('#ddlBudgetDistActivity').on('focus', function () {
    previousBudgetDistActivityValue = $(this).val();
});

$('#ddlBudgetDistActivity').on('change', function () {
    const $this = $(this);
    const selectedValue = $this.val();

    if ($('#txtTotalProjectBudgetAct').val() > 0) {
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
                // Clear fields and reset activity-related UI
                $('.onActiCngClr').val('');
                $('.onActiCngClrSpn').text('');
                $('#ddlActivity').find('option').remove();
                $('#tblActivity tbody').html('');
                //$('#ddlBudgetDistActivity').find('option').remove();

                $('#ddlActivity').find('option').remove();
                DropdownBinder.DDLData = {
                    tableName: "CreateActivity_CA",
                    Text: 'CA_ActivityName',
                    Value: 'CA_Id',
                    ColumnName: 'CA_ProjectId',
                    PId: Id
                };
                DropdownBinder.DDLElem = $('#ddlActivity');
                DropdownBinder.Execute();

                fundWiseBudgetDistributionDetailsActivity(selectedValue);

                // Update previous value
                previousBudgetDistActivityValue = selectedValue;
            } else {
                // Revert dropdown selection on cancel
                $this.val(previousBudgetDistActivityValue);
                $this.trigger('change.select2'); // Only if using Select2
            }
        });
    } else {
        // No confirmation required, proceed directly
        if (parseFloat($('#txtTotalBudgetForSpacificFund').val()) <= 0) {
            $('#txtAcitivityAmnt').prop("disabled", true);
        } else {
            $('#txtAcitivityAmnt').prop("disabled", false);
        }

        $('#ddlActivity').find('option').remove();
        DropdownBinder.DDLData = {
            tableName: "CreateActivity_CA",
            Text: 'CA_ActivityName',
            Value: 'CA_Id',
            ColumnName: 'CA_ProjectId',
            PId: Id
        };
        DropdownBinder.DDLElem = $('#ddlActivity');
        DropdownBinder.Execute();

        fundWiseBudgetDistributionDetailsActivity(selectedValue);

        // Update previous value since no alert was needed
        previousBudgetDistActivityValue = selectedValue;
    }
});



//$('#ddlBudgetDistActivity').on('change', function () {

//    if ($('#txtTotalProjectBudgetAct').val() > 0) {
//        Swal.fire({
//        title: "Do you want to change this Period?",
//        text: "Once you change this period, all other data will be lost.",
//        icon: "warning",
//        showCancelButton: !0,
//        confirmButtonText: "Yes, Do it!",
//        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
//        buttonsStyling: !1,
//    }).then((result) => {
//        if (result.isConfirmed) {
            
//            $('.txtact').val('');
//            $('.txtactSpan').text('');
//            $('#ddlActivity').find('option').remove();
//            $('#tblActivity tbody').html('');
//            $('#ddlBudgetDistActivity').find('option').remove();
//            DropdownBinder.DDLData = {
//                tableName: "ProjectBudgetDetails_PBD",
//                Text: 'PBD_FundName',
//                Value: 'PBD_Id',
//                ColumnName: 'PBD_ProjectId',
//                PId: parseInt(Id),
//                PId1: $("#ddlFinancialYearAct").val(),
//                ColumnName1: 'PBD_FinancialYearId',
//            };
//            DropdownBinder.DDLElem = $("#ddlBudgetDistActivity");
//            DropdownBinder.Execute();  
//        }
//    });
//    } else {
//        if (parseFloat($('#txtTotalBudgetForSpacificFund').val()) <= 0) {
//            $('#txtAcitivityAmnt').prop("disabled", true);
//        } else {
//            $('#txtAcitivityAmnt').prop("disabled", false);
//        }
//        $('#ddlActivity').find('option').remove();
//        DropdownBinder.DDLData = {
//            tableName: "CreateActivity_CA",
//            Text: 'CA_ActivityName',
//            Value: 'CA_Id',
//            ColumnName: 'CA_ProjectId',
//            PId: Id
//        };
//        DropdownBinder.DDLElem = $('#ddlActivity');
//        DropdownBinder.Execute();

//        fundWiseBudgetDistributionDetailsActivity($('#ddlBudgetDistActivity').val());
//    }

    
//});

$('#txtAcitivityAmnt').on('change', function () {
    if (parseFloat($('#txtAcitivityAmnt').val()) <= 0) {
        $('.AddActBtn').prop("disabled", true);
    } else {
        $('.AddActBtn').prop("disabled", false);
    }
});


$('#ddlTaskSMME').on('change', function () {
    LoaderStart("#section-blockBudgetSMME");

        $('#ddlSMME').find("option").remove();
        $('#tblSMME tbody').html('');

        $('#btnAddSMMEBudget').attr('disabled', 'disabled');
        var taskId = $('#ddlTaskSMME').val();

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

        fundWiseBudgetTaskDetails(Id, $('#ddlTaskActivitySMME').val(), $(this).val());
        retriveSMMEBudgetDetails(Id, $('#ddlTaskActivitySMME').val(), $(this).val(), $('#ddlBudgetDistSMME').val());
});




$('#ddlTaskActivitySMME').on('change', function () {
    LoaderStart("#section-blockBudgetSMME");
    if (this.value > 0) {
        $('#tblSMME tbody').html('');
        $('#ddlSMME').find("option").remove();

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
    fundWiseBudgetActivityDetailsForSMME(Id, ActId, $('#ddlBudgetDistSMME').val())

});


$('#ddlTaskActivity').on('change', function () {

    LoaderStart("#section-blockBudgetTsk");

    $('#tblTask tbody').html('');

    if (this.value > 0) {
        $('#ddlTask').find("option").remove();
        DropdownBinder.DDLData = {
            tableName: "TaskDeatils_TD",
            Text: 'TD_TaskName',
            Value: 'TD_Id',
            ColumnName: 'TD_ProjectId',
            PId: Id,
            ColumnName1: 'TD_ActivityId',
            PId1: this.value,
        };
        DropdownBinder.DDLElem = $('#ddlTask');
        DropdownBinder.Execute();

        var mt = $("#ddlTask");
        mt.length &&
            mt.each(function () {
                var mt = $(this);
                mt.wrap('<div class="position-relative"></div>'), mt.select2({ placeholder: "Select Task", dropdownParent: mt.parent() });
            });
    }


    var ActId = $('#ddlTaskActivity').val();
    fundWiseBudgetActivityDetailsForTask(Id, ActId, $('#ddlBudgetDistTask').val())
    retriveTaskBudgetDetails(Id, ActId, $('#ddlBudgetDistTask').val());
});
//------------------- // End Activity--------------------

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
            //var totalUnallocatedBudget = 0;

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

            //totalUnallocatedBudget = (totalbudget - totalfund);

            //$('#totalUnallocatedBudget').html(formatToZAR(totalUnallocatedBudget, '#totalUnallocatedBudget'));

            $('#divfundDistribution').append(div);
         
            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); 
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

function BindGridAct(Id) {

    retriveBudgetHeader(Id);

    // clearInterval(myInterval);
    var columnDataAct = headerRow;
    //////console.log(columnDataAct);
    $('#datatable-act').empty();

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectActivityWiseBudgetForDashboard',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#hdnFyFilterId').val()),
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
            LoaderStart("#section-blockAct");
        },
        complete: function () {
            LoaderEnd("#section-blockAct");
        },

        success: function (response) {

            var data;

            try {
                data = JSON.parse(response);
            } catch (e) {
                //console.error("Failed to parse response:", e);
                LoaderEnd("#section-blockAct");
                return;
            }

            // Check if data is null, undefined, or empty array
            if (!data || data.length === 0) {
                $("#datatable-act").html("<h4 class='text-center'>No data found.</h4>");
                LoaderEnd("#section-blockAct");
                return;
            }

            var data = JSON.parse(response);

            var htmlTble;
            var groupedData = {};

            // Loop through the original data to group by description
            $.each(data, function (index, item) {
                if (!groupedData[item.Description]) {
                    groupedData[item.Description] = {
                        "Description": item.Description,
                        "Date": item.Date,
                        "RowColor": item.RowColor,
                        "data": {} // Store dynamic data
                    };
                }

                // Loop through each property and aggregate values dynamically
                $.each(item, function (key, value) {
                    if (key !== 'Description' && key !== 'Date' && key !== 'RowColor' && key !== 'AcitivityId') {
                        // Aggregate the dynamic values (like Month 1, Month 10, etc.)
                        groupedData[item.Description]["data"][key] = (groupedData[item.Description]["data"][key] || 0) + (value || 0);
                    }
                });
            });



            // Create the table header dynamically based on the dynamic keys
            var tableHeader = "<thead><tr><tr><th>Description</th><th>Date</th>";
            var dynamicColumns = Object.keys(groupedData[Object.keys(groupedData)[0]]["data"]);
            $.each(dynamicColumns, function (index, column) {
                tableHeader += "<th>" + column + "</th>";
            });
            tableHeader += '</tr></thead>';
            console.log(tableHeader);
            // Add the table header to the table

            htmlTble = '';
            // Now, create the table rows from the aggregated data
            $.each(groupedData, function (index, item) {
                var row = "<tr class='" + item.RowColor + "'>" + // Apply RowColor as the background class
                            "<td>" + item.Description + "</td>" +
                            "<td>" + item.Date + "</td>";

                // Dynamically add data columns (like Month 1, Month 10, Month 12)
                $.each(item.data, function (key, value) {
                    row += "<td>" + value + "</td>";
                });

                row += "</tr>";

                htmlTble = htmlTble + row;
            });
            var tbl = tableHeader + '<tbody>' + htmlTble + '</tbody>';
            console.log(tbl);
            $('#datatable-act').html(tbl);
        },


        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

function BindGridTsk(Id) {

    retriveBudgetHeaderNew(Id);


    var columnDataTsk = headerRow;
    $('#datatable-tsk').empty();

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseBudgetForDashboard',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#hdnFyFilterId').val()),
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
            LoaderStart("#section-blockTask");
        },
        complete: function () {
            LoaderEnd("#section-blockTask");
        },
        success: function (response) {

            var data;

            try {
                data = JSON.parse(response);
            } catch (e) {
                console.error("Failed to parse response:", e);
                LoaderEnd("#section-blockTask");
                return;
            }

            // Check if data is null, undefined, or empty array
            if (!data || data.length === 0) {
                console.warn("No data received.");
                $("#datatable-tsk").html("<h4 class='text-center'>No data found.</h4>");
                LoaderEnd("#section-blockTask");
                return;
            }

            var data = JSON.parse(response);

            //console.log( data);

            //$("#data-table tbody").append(row);
            var htmlTble;
            var groupedData = {};

            // Loop through the original data to group by description
            $.each(data, function (index, item) {
                if (!groupedData[item.Description]) {
                    groupedData[item.Description] = {
                        "Description": item.Description,
                        "Date": item.Date,
                        "RowColor": item.RowColor,
                        "data": {} // Store dynamic data
                    };
                }

                // Loop through each property and aggregate values dynamically
                $.each(item, function (key, value) {
                    if (key !== 'Description' && key !== 'Date' && key !== 'RowColor' && key !== 'AcitivityId') {
                        // Aggregate the dynamic values (like Month 1, Month 10, etc.)
                        groupedData[item.Description]["data"][key] = (groupedData[item.Description]["data"][key] || 0) + (value || 0);
                    }
                });
            });



            // Create the table header dynamically based on the dynamic keys
            var tableHeader = "<thead><tr><tr><th>Description</th><th>Date</th>";
            var dynamicColumns = Object.keys(groupedData[Object.keys(groupedData)[0]]["data"]);
            $.each(dynamicColumns, function (index, column) {
                tableHeader += "<th>" + column + "</th>";
            });
            tableHeader += '</tr></thead>';
            console.log(tableHeader);
            // Add the table header to the table

            htmlTble = '';
            // Now, create the table rows from the aggregated data
            $.each(groupedData, function (index, item) {
                var row = "<tr class='" + item.RowColor + "'>" + // Apply RowColor as the background class
                            "<td>" + item.Description + "</td>" +
                            "<td>" + item.Date + "</td>";

                // Dynamically add data columns (like Month 1, Month 10, Month 12)
                $.each(item.data, function (key, value) {
                    row += "<td>" + value + "</td>";
                });

                row += "</tr>";

                htmlTble = htmlTble + row;
            });
            var tbl = tableHeader + '<tbody>' + htmlTble + '</tbody>';
            console.log(tbl);
            $("#datatable-tsk").html(tbl);
        },


        //    //$('#datatable-tsk').DataTable({
        //    //    "paging": false,
        //    //    "ordering": true,
        //    //    "searching": false,
        //    //    "info": false
        //    //});
        //},
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

function BindGridSMME(Id) {
    retriveBudgetHeaderNew(Id);

    // clearInterval(myInterval);
    var columnDataSMME = headerRow;

    $('#datatable-smme').empty();

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudgetForDashboard',
            param1: 'PD_Id',
            param1Value: parseInt(Id),
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
        //    LoaderStart("#section-blockSMME");
        //},
        //complete: function () {
        //    LoaderEnd("#section-blockSMME");
        //},

        success: function (response) {

            var data;

            try {
                data = JSON.parse(response);
                console.log("SMMedata - ",data);
            } catch (e) {
                console.error("Failed to parse response:", e);
                LoaderEnd("#section-blockSMME");
                return;
            }

            // Check if data is null, undefined, or empty array
            if (!data || data.length === 0) {
                console.warn("No data received.");
                $("#datatable-smme").html("<h4 class='text-center'>No data found.</h4>");
                LoaderEnd("#section-blockSMME");
                return;
            }




            //var data = JSON.parse(response);
            //console.log(data);


            var htmlTble;
            var groupedData = {};

            //// Loop through the original data to group by description
            //$.each(data, function (index, item) {
            //    if (!groupedData[item.Description]) {
            //        groupedData[item.Description] = {
            //            "Description": item.Description,
            //            "Date": item.Date,
            //            "RowColor": item.RowColor,
            //            "data": {} // Store dynamic data
            //        };
            //    }

            //    // Loop through each property and aggregate values dynamically
            //    $.each(item, function (key, value) {
            //        if (key !== 'Description' && key !== 'Date' && key !== 'RowColor' && key !== 'AcitivityId' && key !== 'TaskId') {
            //            // Aggregate the dynamic values (like Month 1, Month 10, etc.)
            //            groupedData[item.Description]["data"][key] = (groupedData[item.Description]["data"][key] || 0) + (value || 0);
            //        }
            //    });
            //});

            $.each(data, function (index, item) {
                // Use a unique key combining ActivityId, TaskId, and Description
                var uniqueKey = item.AcitivityId + "_" + item.TaskId + "_" + item.Description;

                if (!groupedData[uniqueKey]) {
                    groupedData[uniqueKey] = {
                        "Description": item.Description,
                        "Date": item.Date,
                        "RowColor": item.RowColor,
                        "data": {}
                    };
                }

                $.each(item, function (key, value) {
                    if (key !== 'Description' && key !== 'Date' && key !== 'RowColor' && key !== 'AcitivityId' && key !== 'TaskId') {
                        groupedData[uniqueKey]["data"][key] = (groupedData[uniqueKey]["data"][key] || 0) + (value || 0);
                    }
                });
            });



            // Create the table header dynamically based on the dynamic keys
            var tableHeader = "<thead><tr><tr><th>Description</th><th>Date</th>";
            var dynamicColumns = Object.keys(groupedData[Object.keys(groupedData)[0]]["data"]);
            $.each(dynamicColumns, function (index, column) {
                tableHeader += "<th>" + column + "</th>";
            });
            tableHeader += '</tr></thead>';
            console.log(tableHeader);
            // Add the table header to the table

            htmlTble = '';
            // Now, create the table rows from the aggregated data
            $.each(groupedData, function (index, item) {
                var row = "<tr class='" + item.RowColor + "'>" + // Apply RowColor as the background class
                            "<td>" + item.Description + "</td>" +
                            "<td>" + item.Date + "</td>";

                // Dynamically add data columns (like Month 1, Month 10, Month 12)
                $.each(item.data, function (key, value) {
                    row += "<td>" + value + "</td>";
                });

                row += "</tr>";

                htmlTble = htmlTble + row;
            });
            var tbl = tableHeader + '<tbody>' + htmlTble + '</tbody>';
            console.log(tbl);
            $("#datatable-smme").html(tbl);

            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); 
            }

            if(sincount==1)
            {
                console.log('counter:' + counter);
                LoaderEnd("#section-blockSMME");
                sincount ++ ;
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}


function SidePopUpForShowFund() {
    $('#viewFundPopUp').addClass('show');
}

function SidePopUpForShowFundClose() {
    $('#viewFundPopUp').removeClass('show');
}

///////////////////////////////////////
function SaveBudgeFundtDetails() {
    var tblBudgetFund = document.getElementById("tblBudgetFund");
    var totalAmntTabl=0;
    var BudgetArr = [];
    
    $.each($('#tblBudgetFund tbody tr'), function (index, value) {
      
            //TotalAmt += isNaN(parseFloat($(this).find("td:eq(4) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(4) input[type='text']").val());
            BudgetArr.push({
                PBFD_FundType: parseInt($(this).find("td:eq(0) option:selected").val()),
                PBFD_Enterprise: parseInt($(this).find("td:eq(1) option:selected").val()),
                // PBFD_Desc: $(this).find("td:eq(1) input[type='text']").val(),
                PBFD_Qty: parseInt($(this).find("td:eq(2) input[type='text']").val()),
                PBFD_Amount: parseFloat($(this).find("td:eq(3) input[type='text']").val()),
                PBFD_TotalAmount: parseFloat($(this).find("td:eq(4) input[type='text']").val()),
               // PBFD_FinancialYearId: parseFloat($(this).find("td:eq(5) input[type='text']").val()),
            });
         
        totalAmntTabl=totalAmntTabl+parseFloat($(this).find("td:eq(4) input[type='text']").val());
    
    });
   

        //if (totalAmntTabl > parseFloat($('#hdnBdgt').val())) {
        //    Swal.fire({
        //        title: "Oops..!",
        //        text: "Total Budget Exceed" + parseFloat($('#hdnBdgt').val()),
        //        icon: "error",
        //        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //        buttonsStyling: !1
        //    }).then((result) => {

        //        if (result.isConfirmed) {
        //            $('#exLargeModal').modal('hide');

        //        }

        //    });
        //    return false;
        //}

        var _data = JSON.stringify({
            entity: {
                list: BudgetArr,
                PBFD_ProjectId: Id,
                PBFD_FinancialYearId: parseInt($('#ddlFinancialYearFund').val())
            }
        });

        $.ajax({
            type: "POST",
            url: '/ScriptJson/InsertUpdateProjectBudgetFundDetails',
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
                            //$('#exLargeModal').modal('hide');
                            window.location.href = '/Project/ProjectBudgetDashboard?Id=' + Id + '&ENR_Id=' + $('#hdnProjctENrId').val();
                        }
                    });
                    $('#tblBudgetFund > tbody').html('');
                }
                else {
                    Swal.fire({
                        title: "Oops..!",
                        text: data.Message,
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    });
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
    }

function retriveProjectBudgetFundDetails(id, ddlFndId) {     // Ai functien rmdhye cll kro
    //console.log(parseInt(_data));
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBFD_ProjectId',
            param1Value: parseInt(id),
            param2: 'PBFD_FinancialYearId',
            param2Value: parseInt($('#ddlFinancialYearFund').val()),
            param3: 'PBFD_FundType',
            param3Value: parseInt(ddlFndId),
            param4: 'PBFD_Enterprise',
            param4Value: parseInt($("#ddlEnterprise").val()),
            StoreProcedure: 'ProjectBudgetFundDetails_USP'
        }
    });
 ////   console.log(_data);
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#section-blockFundDist");
        },
        complete: function () {
            LoaderEnd("#section-blockFundDist");
        },
       
        success: function (data) {
            data = JSON.parse(data);
            console.log('FundType table-', data);

            $('#hdnBdgt').val(hdnBudget);
            $('#totalBudget').text(hdnBudget);
            $('#totalBudgetFund').text(hdnBudget);

            var rowCount = $('#tblBudgetFund tbody tr').length || 0;

            var tr;
            for (var i = rowCount; i < rowCount + data.length; i++) {
      
                    var index = i + 1;
                    var dataIndex = i - rowCount;
                // --- Duplicate check ---
                    var isDuplicate = false;
                    $('#tblBudgetFund tbody tr').each(function () {
                        var existingFundType = $(this).find("input[id^='hdnFundType_']").val();
                        var existingEnterprise = $(this).find("input[id^='hdnEnterprise_']").val();

                        if (existingFundType == data[dataIndex].PBFD_FundType &&
                            existingEnterprise == data[dataIndex].PBFD_Enterprise) {
                            isDuplicate = true;
                            return false; // break out of loop
                        }
                    });

                    if (isDuplicate) {
                        console.warn('Duplicate FundType and Enterprise combination skipped:', data[dataIndex]);
                        continue; // skip this iteration
                    }
                // ------------------------

                    tr = $('<tr/>');

                    tr.append("<td><input type='hidden' value ='" + data[dataIndex].PBFD_FundType + "' id='hdnFundType_" + index + "'><select id='ddlFundTypeTbl_" + index + "' name='ddlFundTypeTbl_" + index + "' class='select2 form-select ddlFundTypeTbl' data-allow-clear='true'></select></td>");
                    tr.append("<td><input type='hidden' value ='" + data[dataIndex].PBFD_Enterprise + "' id='hdnEnterprise_" + index + "'><select id='ddlEnterpriseTbl_" + index + "' name='ddlEnterpriseTbl_" + index + "' class='select2 form-select ddlEnterpriseTbl' data-allow-clear='true'></select></td>");
                    tr.append("<td><input type='text' value ='" + data[dataIndex].PBFD_Qty + "' class='form-control' name='txtQty_" + index + "' id='txtQty_" + index + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                    tr.append("<td><input type='text' value ='" + data[dataIndex].PBFD_Amount + "' class='form-control' name='txtAmnt_" + index + "' id='txtAmnt_" + index + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                    tr.append("<td><input type='text' value ='" + data[dataIndex].PBFD_TotalAmount + "' name='txtTotalAmnt_" + index + "' id='txtTotalAmnt_" + index + "' class='form-control' disabled><input type='hidden' value ='" + data[dataIndex].PBFD_TotalAmount + "' name='txtTotalAmnt_" + index + "' id='txtTotalAmnt_" + index + "' ></td>");
                    tr.append("<td hidden><input type='hidden' value='" + data[dataIndex].SWB_FinancialYearId + "' name='hdnFinancialYearId_" + i + "' id='hdnFinancialYearId_" + i + "' class='form-control FinancialYearId" + data[dataIndex].SWB_FinancialYearId + "'/></td>");
                    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClick(this)' href='javascript:;' class='text-body'><i class='ti ti-trash me-2 ti-sm'></i></a></td>");

                    $('#tblBudgetFund tbody').append(tr);

                    var drp = $('#ddlFundTypeTbl_' + (i + 1));
                    drp.length &&
                        drp.each(function () {
                            var drp = $(this);
                            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                        });

                    var drpenr = $('#ddlEnterpriseTbl_' + (i + 1));
                    drpenr.length &&
                        drpenr.each(function () {
                            var drpenr = $(this);
                            drpenr.wrap('<div class="position-relative"></div>'), drpenr.select2({ placeholder: "Select Enterprise", dropdownParent: drpenr.parent() });
                        });

                    DropdownBinder.DDLData = {
                        tableName: "FundType_FT",
                        Text: 'FT_Type',
                        Value: 'FT_Id'
                    };
                    DropdownBinder.DDLElem = $('#ddlFundTypeTbl_' + (i + 1));
                    DropdownBinder.Execute();

                    DropdownBinder.DDLData = {
                        tableName: "EnterpriseRegistration_ENR",
                        Text: 'ENR_CompanyName',
                        Value: 'ENR_Id'
                    };
                    DropdownBinder.DDLElem = $('#ddlEnterpriseTbl_' + (i + 1));
                    DropdownBinder.Execute();

                    $('#ddlFundTypeTbl_' + (i + 1)).val(data[dataIndex].PBFD_FundType).change();
                    $('#ddlEnterpriseTbl_' + (i + 1)).val(data[dataIndex].PBFD_Enterprise).change();

                    $('.txtModal').val('');
                }


                var grandTotal = 0;
                $('#tblBudgetFund tbody tr').each(function () {
                    var totalVal = parseFloat($(this).find("input[id^='txtTotalAmnt_']:hidden").val()) || 0;
                    grandTotal += totalVal;
                });

                $('#sumAllocatedBudgt').val(grandTotal);
                $('#sumAllocatedBudgtHdn').val(grandTotal);
              
               
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
                div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBFD_TotalAmount + '</h5><h6 class="mb-1">' + data[i].FT_Type + '</h6><small style="display: inline-block; width: 120px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + data[i].ENR_CompanyName + '</small></div></div></div>';
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
            // $('#remaningPerc').html((isNaN(parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget)) == true ? 0 : parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget)).toFixed(2) + '%');

            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); 
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

function fundWiseBudgetDistributionDetailsActivity(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(fundtype),
            param3: 'FinancialYearId',
            param3Value: parseInt($('#ddlFinancialYearAct').val()),
            StoreProcedure: 'ProjectBudgetDetails_USP'// aiita khlo
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
            LoaderStart("#section-blockBudgetAciti");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetAciti");
        },
        
        success: function (data) {
           // data = JSON.parse(data);
            //console.log('Activity Budget', data);

                try {
                    data = JSON.parse(data);

                    if (Array.isArray(data) && data.length > 0) {
                        $('#hdnddlBudgetDistActivity').val(fundtype)
                        $('.txtPeriod').text(data[0].PBD_FundName); 
                        $('#txtTotalProjectBudgetAct').val($('#totalbudget').text())
                        $('#txtTotalBudgetForSpacificFund').val(data[0].PBD_Amount);
                        $('#txtTotalAvailableBudgetActivity').val(data[0].AWb_AvailableBudget);
                        $('#hdnTotalAvailableBudgetActivity').val(data[0].PBD_Amount);

                        $('#tblActivity tbody').html('');
                        retriveActivityBudgetDetails(Id, fundtype);
                    } else {
                        $('#hdnddlBudgetDistActivity').val(0)
                       // $('.txtPeriod').text(data[0].PBD_FundName); 
                        $('#txtTotalProjectBudgetAct').val(0)
                        $('#txtTotalBudgetForSpacificFund').val(0);
                        $('#txtTotalAvailableBudgetActivity').val(0);
                        $('#hdnTotalAvailableBudgetActivity').val(0);
                    }
                } catch (e) {
                    console.error("Error parsing data:", e);
                    $('#hdnddlBudgetDistActivity').val(0)
                  //  $('.txtPeriod').text(data[0].PBD_FundName); 
                    $('#txtTotalProjectBudgetAct').val(0)
                    $('#txtTotalBudgetForSpacificFund').val(0);
                    $('#txtTotalAvailableBudgetActivity').val(0);
                    $('#hdnTotalAvailableBudgetActivity').val(0);
                }

            // $('#tblActivity tbody').html('');
            //retriveActivityBudgetDetails(Id, fundtype);   

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

function fundWiseBudgetDistributionDetailsTask(pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(pbdId),
            param3: 'FinancialYearId',
            param3Value: parseInt($('#hdnFyTaskId').val()),
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
           // data = JSON.parse(data);

            try {
                data = JSON.parse(data);

                if (Array.isArray(data) && data.length > 0) {
                    $('.txtPeriodTask').text(data[0].PBD_FundName);
                    $('#txtTotalProjectBudgetTask').val($('#totalbudget').text())
                    $('#txtTotalBudgetForSpacificFundTask').val('R ' + data[0].PBD_Amount);
                } else {
                    $('#txtTotalProjectBudgetTask').val(0)
                    $('#txtTotalBudgetForSpacificFundTask').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalProjectBudgetTask').val(0)
                $('#txtTotalBudgetForSpacificFundTask').val(0);
            }

            //$('#ddlTaskActivity').find('option').remove();
            //DropdownBinder.DDLData = {
            //    tableName: "CreateActivity_CA",
            //    Text: 'CA_ActivityName',
            //    Value: 'CA_Id',
            //    ColumnName: 'CA_ProjectId',
            //    PId: Id
            //};
            //DropdownBinder.DDLElem = $('#ddlTaskActivity');
            //DropdownBinder.Execute();
            
            //$('#ddlTaskActivity').on('change', function () {
             
            //        LoaderStart("#section-blockBudgetTsk");
             
            //    $('#tblTask tbody').html('');

            //    if (this.value > 0) {
            //        $('#ddlTask').find("option").remove();
            //        DropdownBinder.DDLData = {
            //            tableName: "TaskDeatils_TD",
            //            Text: 'TD_TaskName',
            //            Value: 'TD_Id',
            //            ColumnName: 'TD_ProjectId',
            //            PId: Id,
            //            ColumnName1: 'TD_ActivityId',
            //            PId1: this.value,
            //        };
            //        DropdownBinder.DDLElem = $('#ddlTask');
            //        DropdownBinder.Execute();

            //        var mt = $("#ddlTask");
            //        mt.length &&
            //            mt.each(function () {
            //                var mt = $(this);
            //                mt.wrap('<div class="position-relative"></div>'), mt.select2({ placeholder: "Select Task", dropdownParent: mt.parent() });
            //            });
            //    }

            //    var ActId = $('#ddlTaskActivity').val();
            //    fundWiseBudgetActivityDetailsForTask(Id, ActId, pbdId)
            //    retriveTaskBudgetDetails(Id, ActId, pbdId);
            //});
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

function fundWiseBudgetActivityDetailsForTask(Id, acId, pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForActivityDetailsForTask',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'PBD_Id',
            param3Value: parseInt(pbdId),
            param4: 'FinancialYearId',
            param4Value: parseInt($('#ddlFinancialYearTask').val()),
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
            try {
                data = JSON.parse(data);

                if (Array.isArray(data) && data.length > 0) {
                    $('.txtActLabelTask').text(data[0].ActivityName);
                    $('#txtTotalActivityBudget').val(data[0].AWB_Budget);
                    $('#txtTotalAvailableBudgetTask').val(data[0].TWB_AvailableBudget);
                    $('#hdnTotalAvailableBudgetTask').val(data[0].AWB_Budget);
                } else {
                    $('#txtTotalActivityBudget').val(0);
                    $('#txtTotalAvailableBudgetTask').val(0);
                    $('#hdnTotalAvailableBudgetTask').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalActivityBudget').val(0);
                $('#txtTotalAvailableBudgetTask').val(0);
                $('#hdnTotalAvailableBudgetTask').val(0);
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

function fundWiseBudgetDistributionDetailsSMME(pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(pbdId),
            param3: 'FinancialYearId',
            param3Value: parseInt($('#hdnFySMMEId').val()),
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
            LoaderStart("#section-blockBudgetSMME");
        },
        complete: function () {
            LoaderEnd("#section-blockBudgetSMME");
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


            $(".txsmmeCle").val(0);
           
            $('#ddlTaskSMME').find('option').remove();
            $('#tblSMME tbody').html('');

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
            param4Value: parseInt($('#ddlFinancialYearSMME').val()),
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
        complete: function () {
            LoaderEnd("#section-blockBudgetSMME");
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
                //$('#ddlTaskSMME').on('change', function () {

                   
                //    $('#tblSMME tbody').html('');
                //    $('#btnAddSMMEBudget').attr('disabled', 'disabled');
                //    var taskId = $('#ddlTaskSMME').val();
                //    fundWiseBudgetTaskDetails(Id, acId, taskId);
                //    retriveSMMEBudgetDetails(Id, acId, taskId, pbdId);
                //});

            }

            catch (e) {
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
            param4Value: parseInt($('#ddlFinancialYearSMME').val()),
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
            try {
                data = JSON.parse(data);

                console.log('SMME Taka ',data);

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


function retriveBudgetHeader(id) {
    headerRow = [];
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTableHeader',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#hdnFyFilterId').val()),
            StoreProcedure: 'BudgetAllocation_USP'
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

function retriveBudgetHeaderNew(id) {
    headerRow = [];
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTableHeaderNew',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            param2: 'FinancialYearId',
            param2Value: parseInt($('#hdnFyFilterId').val()),
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


function valiDateForEnterpriseSameDrpdown() {
    var result = true;
    $.each($('#tblBudgetFund tbody tr'), function (index, value) {
        var ExistsEnterpriseVal = $('#ddlEnterpriseTbl_' + (index + 1)).val();
        var ExistsFundVal = $('#ddlFundTypeTbl_' + (index + 1)).val();
        if (parseInt($(this).find("td:eq(0) option:selected").val()) == parseInt(ExistsFundVal) && parseInt($(this).find("td:eq(1) option:selected").val()) == parseInt(ExistsEnterpriseVal)) {
           
            result = false;
        }
       
        });
    return result;
}


function valiDateForEnterpriseSameDrpdown(array, fnd, enterprise) {
    for (var i in array) {
        if (array[i].PBFD_FundType == fnd && array[i].PBFD_Enterprise == enterprise) {
            //array.splice(i, 1);
            alert('Same')
          return false
        }
    }
}