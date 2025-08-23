var ToDate = '';
var FromDate = '';

function selectDate(type) {
    if (type == 'W') {
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        let dd = oneWeekAgo.getDate();
        let mm = oneWeekAgo.getMonth() + 1;
        let yyyy = oneWeekAgo.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        FromDate = dd + '-' + mm + '-' + yyyy;
    } else if (type == '1M') {
        var oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        let dd = oneMonthAgo.getDate();
        let mm = oneMonthAgo.getMonth() + 1;
        let yyyy = oneMonthAgo.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        FromDate = dd + '-' + mm + '-' + yyyy;
    } else if (type == '3M') {
        var threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        let dd = threeMonthsAgo.getDate();
        let mm = threeMonthsAgo.getMonth() + 1;
        let yyyy = threeMonthsAgo.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        FromDate = dd + '-' + mm + '-' + yyyy;
    } else if (type == '6M') {
        var sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        let dd = sixMonthsAgo.getDate();
        let mm = sixMonthsAgo.getMonth() + 1;
        let yyyy = sixMonthsAgo.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        FromDate = dd + '-' + mm + '-' + yyyy;
    } else if (type == '12M') {
        var twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        let dd = twelveMonthsAgo.getDate();
        let mm = twelveMonthsAgo.getMonth() + 1;
        let yyyy = twelveMonthsAgo.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        FromDate = dd + '-' + mm + '-' + yyyy;
    } else if (type == 'all') {
        FromDate = '';
    }

    // Set the formatted date in the hidden input field


    //console.log("Formatted FromDate: " + FromDate);
    fnReportAdmin();
}

$(document).ready(function () {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    ToDate = dd + '-' + mm + '-' + yyyy;
    //console.log(FromDate);


    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlIndustrySector");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCountry");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "LegalEntitySetUp_LEM",
        Text: 'LEM_LegalEntity',
        Value: 'LEM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlLegalEntity");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "PortfolioGrowth_PG",
        Text: 'PG_Name',
        Value: 'PG_Id'
    };
    DropdownBinder.DDLElem = $("#ddlProtfolioGrowth");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "JobCategoriesSetUp_JC",
        Text: 'JC_JobCategories',
        Value: 'JC_Id'
    };
    DropdownBinder.DDLElem = $("#ddlJobCategory");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "BudgetType_BT",
        Text: 'BT_Type',
        Value: 'BT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBudgetType");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CustomerTypeSetUp_CT",
        Text: 'CT_CustomerType',
        Value: 'CT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCustomerType");
    DropdownBinder.Execute();

    fnReportAdmin();
});

$('#ddlCountry').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlCountry').val(selectedValue);
});

$('#ddlProvince').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlProvince').val(selectedValue);
});

$('#ddlIndustrySector').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlIndustrySector').val(selectedValue);
});

$('#ddlBusinessType').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlBusinessType').val(selectedValue);
});

$('#ddlLegalEntity').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlLegalEntity').val(selectedValue);
});

$('#ddlProtfolioGrowth').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlProtfolioGrowth').val(selectedValue);
});

$('#ddlJobCategory').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlJobCategory').val(selectedValue);
});

$('#ddlBudgetType').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlBudgetType').val(selectedValue);
});

$('#ddlCustomerType').change(function () {
    var selectedValue = $(this).val();
    $('#hdnddlCustomerType').val(selectedValue);
});


//(function () {
   
//    $(".tagifyDiv").hide();
//    var $tagifyInput = $('.TagifyBasic');
//    var tagify = new Tagify($tagifyInput[0]);

   
//    tagify.on('remove', function () {
//        fnReportAdmin(); 
//    });

//    $('.btnApplyFilter').on('click', function () {
//        tagify.removeAllTags();

//        var selectedTags = [];

//        // Country Dropdown
//        $('.ddlCountry').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Country") {
//                selectedTags.push("Country: " + selectedText);
//            }
//        });

//        // Province Dropdown
//        $('.ddlProvince').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Province") {
//                selectedTags.push("Province: " + selectedText);
//            }
//        });

//        // Industry Dropdown
//        $('.ddlIndustrySector').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Industry Type") {
//                selectedTags.push("Industry: " + selectedText);
//            }
//        });

//        // Business Type Dropdown
//        $('.ddlBusinessType').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Type") {
//                selectedTags.push("Business Type: " + selectedText);
//            }
//        });

//        // Legal Entity Dropdown
//        $('.ddlLegalEntity').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A LegalEntity") {
//                selectedTags.push("Legal Entity: " + selectedText);
//            }
//        });

//        // Portfolio Growth Dropdown
//        $('.ddlProtfolioGrowth').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select Protfolio Growth") {
//                selectedTags.push("Portfolio Growth: " + selectedText);
//            }
//        });

//        // Job Category Dropdown
//        $('.ddlJobCategory').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Enterprise") {
//                selectedTags.push("Job Category: " + selectedText);
//            }
//        });

//        // Budget Type Dropdown
//        $('.ddlBudgetType').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Budget Type") {
//                selectedTags.push("Budget Type: " + selectedText);
//            }
//        });

//        // Customer Type Dropdown
//        $('.ddlCustomerType').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Customer Type") {
//                selectedTags.push("Customer Type: " + selectedText);
//            }
//        });

//        // Visit Type Dropdown
//        $('.ddlVisitType').each(function () {
//            var selectedText = $(this).find('option:selected').text();
//            var selectedValue = $(this).val();
//            if (selectedValue && selectedText !== "Select A Visit Type") {
//                selectedTags.push("Visit Type: " + selectedText);
//            }
//        });

//        // Add the selected tags to Tagify (only if there are selected values)
//        if (selectedTags.length > 0) {
//            tagify.addTags(selectedTags);

//            // Show the tagifyDiv
//            $(".tagifyDiv").show();
//        } else {
//            // Hide the tagifyDiv 
//            $(".tagifyDiv").hide();
//        }
//    });

 
//    var e = $("#ddlIndustrySector");
//    e.length && e.each(function () {
//        var e = $(this);
//        e.wrap('<div class="position-relative"></div>');
//        e.select2({ placeholder: "Select A Industry Type", dropdownParent: e.parent() });
//    });

//    var f = $(".ddlBusinessType");
//    f.length && f.each(function () {
//        var f = $(this);
//        f.wrap('<div class="position-relative"></div>');
//        f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
//    });

//    var c = $(".ddlCountry");
//    c.length && c.each(function () {
//        var c = $(this);
//        c.wrap('<div class="position-relative"></div>');
//        c.select2({ placeholder: "Select A Country", dropdownParent: c.parent() });
//    });

//    var g = $(".ddlProvince");
//    g.length && g.each(function () {
//        var g = $(this);
//        g.wrap('<div class="position-relative"></div>');
//        g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
//    });

//    var h = $(".ddlLegalEntity");
//    h.length && h.each(function () {
//        var h = $(this);
//        h.wrap('<div class="position-relative"></div>');
//        h.select2({ placeholder: "Select A LegalEntity", dropdownParent: h.parent() });
//    });

//    var j = $(".ddlProtfolioGrowth");
//    j.length && j.each(function () {
//        var j = $(this);
//        j.wrap('<div class="position-relative"></div>');
//        j.select2({ placeholder: "Select Protfolio Growth", dropdownParent: j.parent() });
//    });

//    var x = $(".ddlJobCategory");
//    x.length && x.each(function () {
//        var x = $(this);
//        x.wrap('<div class="position-relative"></div>');
//        x.select2({ placeholder: "Select A Enterprise", dropdownParent: x.parent() });
//    });

//    var a = $("#ddlBudgetType");
//    a.length && a.each(function () {
//        var a = $(this);
//        a.wrap('<div class="position-relative"></div>');
//        a.select2({ placeholder: "Select A Budget Type", dropdownParent: a.parent() });
//    });

//    var d = $(".ddlCustomerType");
//    d.length && d.each(function () {
//        var d = $(this);
//        d.wrap('<div class="position-relative"></div>');
//        d.select2({ placeholder: "Select A Customer Type", dropdownParent: d.parent() });
//    });

//    var v = $(".ddlVisitType");
//    v.length && v.each(function () {
//        var v = $(this);
//        v.wrap('<div class="position-relative"></div>');
//        v.select2({ placeholder: "Select A Visit Type", dropdownParent: v.parent() });
//    });
//})();

(function () {
    // Initially hide the tagifyDiv
    $(".tagifyDiv").hide();

    // Initialize Tagify on the input field
    var input = document.querySelector('.TagifyBasic');
    var tagify = new Tagify(input);

    tagify.on('remove', function (e) {
        var removedTag = e.detail.data.id;
        var tagName = e.detail.data.value;

        var remainingTags = tagify.value.map(tag => tag.id);

        var tagName = tagify.value.map(tag => {
            return tag.value.split(':')[0];
        });

        //console.log('tagList', tagName);

        if (!Array.isArray(remainingTags)) {
            console.error('remainingTags is not an array');
            return;
        }

        fnReportAdminAfterRemoveTag(remainingTags, tagName);
    });


    // Apply button click event
    $('#btnApplyFilter').on('click', function () {
        fnReportAdmin();

        tagify.removeAllTags();

        var selectedTags = [];

        // Country Dropdown
        $('.ddlCountry').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Country") {
                selectedTags.push({ value: "Country: " + selectedText, id: selectedValue });
                $("#hdnddlCountry").val(selectedValue);
            }
        });

        // Other dropdowns (similar structure for Province, Industry, etc.)
        $('.ddlProvince').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Province") {
                selectedTags.push({ value: "Province: " + selectedText, id: selectedValue });
                $("#hdnddlProvince").val(selectedValue);
            }
        });

        // Industry Dropdown
        $('.ddlIndustrySector').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Industry Type") {
                selectedTags.push({ value: "Industry: " + selectedText, id: selectedValue });
                $("#hdnddlIndustry").val(selectedValue);
            }
        });

        // Business Type Dropdown
        $('.ddlBusinessType').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Type") {
                selectedTags.push({ value: "BusinessType: " + selectedText, id: selectedValue });
                $("#hdnddlBusinessType").val(selectedValue);
            }
        });

        // Legal Entity Dropdown
        $('.ddlLegalEntity').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A LegalEntity") {
                selectedTags.push({ value: "LegalEntity: " + selectedText, id: selectedValue });
                $("#hdnddlLegalEntity").val(selectedValue);
            }
        });

        // Portfolio Growth Dropdown
        $('.ddlProtfolioGrowth').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select Protfolio Growth") {
                selectedTags.push({ value: "PortfolioGrowth: " + selectedText, id: selectedValue });
                $("#hdnddlPortfolioGrowth").val(selectedValue);
            }
        });

        // Job Category Dropdown
        $('.ddlJobCategory').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Enterprise") {
                selectedTags.push({ value: "JobCategory: " + selectedText, id: selectedValue });
                $("#hdnddlJobCategory").val(selectedValue);
            }
        });

        // Budget Type Dropdown
        $('.ddlBudgetType').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Budget Type") {
                selectedTags.push({ value: "BudgetType: " + selectedText, id: selectedValue });
                $("#hdnddlBudgetType").val(selectedValue);
            }
        });

        // Customer Type Dropdown
        $('.ddlCustomerType').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Customer Type") {
                selectedTags.push({ value: "CustomerType: " + selectedText, id: selectedValue });
                $("#hdnddlCustomerType").val(selectedValue);
            }
        });

        // Visit Type Dropdown
        $('.ddlVisitType').each(function () {
            var selectedText = $(this).find('option:selected').text();
            var selectedValue = $(this).val();
            if (selectedValue && selectedText !== "Select A Visit Type") {
                selectedTags.push({ value: "VisitType: " + selectedText, id: selectedValue });
                $("#hdnddlVisitType").val(selectedValue);
            }
        });

        // Add the selected tags to Tagify
        if (selectedTags.length > 0) {
            tagify.addTags(selectedTags);
            $(".tagifyDiv").show();
        } else {
            $(".tagifyDiv").hide();
        }

    });

    // Initialize Select2 for dropdowns
    var e = $("#ddlIndustrySector");
    e.length && e.each(function () {
        var e = $(this);
        e.wrap('<div class="position-relative"></div>');
        e.select2({ placeholder: "Select A Industry Type", dropdownParent: e.parent() });
    });

    var f = $(".ddlBusinessType");
    f.length && f.each(function () {
        var f = $(this);
        f.wrap('<div class="position-relative"></div>');
        f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
    });

    var c = $(".ddlCountry");
    c.length && c.each(function () {
        var c = $(this);
        c.wrap('<div class="position-relative"></div>');
        c.select2({ placeholder: "Select A Country", dropdownParent: c.parent() });
    });

    var g = $(".ddlProvince");
    g.length && g.each(function () {
        var g = $(this);
        g.wrap('<div class="position-relative"></div>');
        g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
    });

    var h = $(".ddlLegalEntity");
    h.length && h.each(function () {
        var h = $(this);
        h.wrap('<div class="position-relative"></div>');
        h.select2({ placeholder: "Select A LegalEntity", dropdownParent: h.parent() });
    });

    var j = $(".ddlProtfolioGrowth");
    j.length && j.each(function () {
        var j = $(this);
        j.wrap('<div class="position-relative"></div>');
        j.select2({ placeholder: "Select Protfolio Growth", dropdownParent: j.parent() });
    });

    var x = $(".ddlJobCategory");
    x.length && x.each(function () {
        var x = $(this);
        x.wrap('<div class="position-relative"></div>');
        x.select2({ placeholder: "Select A Enterprise", dropdownParent: x.parent() });
    });

    var a = $("#ddlBudgetType");
    a.length && a.each(function () {
        var a = $(this);
        a.wrap('<div class="position-relative"></div>');
        a.select2({ placeholder: "Select A Budget Type", dropdownParent: a.parent() });
    });

    var d = $(".ddlCustomerType");
    d.length && d.each(function () {
        var d = $(this);
        d.wrap('<div class="position-relative"></div>');
        d.select2({ placeholder: "Select A Customer Type", dropdownParent: d.parent() });
    });

    var v = $(".ddlVisitType");
        v.length && v.each(function () {
            var v = $(this);
            v.wrap('<div class="position-relative"></div>');
            v.select2({ placeholder: "Select A Visit Type", dropdownParent: v.parent() });
        });
})();

function fnReportAdminAfterRemoveTag(remainingTags, tagName) {
    if (!Array.isArray(remainingTags)) {
        console.error("remainingTags is not an array or is undefined");
        return;
    }

    function isTagInArray(tagArray, tagValue) {
        for (var i = 0; i < tagArray.length; i++) {
            if (tagArray[i] === tagValue) {

                return true;
            }
        }
        return false;
    }

    var valuarr = [{
        CountryId: isTagInArray(remainingTags, $('#hdnddlCountry').val()) ? parseInt($('#hdnddlCountry').val()) : null,
        ProvinceId: isTagInArray(remainingTags, $('#hdnddlProvince').val()) ? parseInt($('#hdnddlProvince').val()) : null,
        IndustrySectorId: isTagInArray(remainingTags, $('#hdnddlIndustrySector').val()) ? parseInt($('#hdnddlIndustrySector').val()) : null,
        BusinessTypeId: isTagInArray(remainingTags, $('#hdnddlBusinessType').val()) ? parseInt($('#hdnddlBusinessType').val()) : null,
        LegalEntityTypeId: isTagInArray(remainingTags, $('#hdnddlLegalEntity').val()) ? parseInt($('#hdnddlLegalEntity').val()) : null,
        ProtfolioGrowthId: isTagInArray(remainingTags, $('#hdnddlProtfolioGrowth').val()) ? parseInt($('#hdnddlProtfolioGrowth').val()) : null,
        JobCategoryId: isTagInArray(remainingTags, $('#hdnddlJobCategory').val()) ? parseInt($('#hdnddlJobCategory').val()) : null,
        CustomerTypeId: isTagInArray(remainingTags, $('#hdnddlCustomerType').val()) ? parseInt($('#hdnddlCustomerType').val()) : null,
        BudgetTypeId: isTagInArray(remainingTags, $('#hdnddlBudgetType').val()) ? parseInt($('#hdnddlBudgetType').val()) : null,
        FromDate: FromDate,
        ToDate: ToDate
    }
    ]

    var _data = JSON.stringify({
        rpt: {
            CountryId: isTagInArray(remainingTags, $('#hdnddlCountry').val()) ? parseInt($('#hdnddlCountry').val()) : null,
            ProvinceId: isTagInArray(remainingTags, $('#hdnddlProvince').val()) ? parseInt($('#hdnddlProvince').val()) : null,
            IndustrySectorId: isTagInArray(remainingTags, $('#hdnddlIndustrySector').val()) ? parseInt($('#hdnddlIndustrySector').val()) : null,
            BusinessTypeId: isTagInArray(remainingTags, $('#hdnddlBusinessType').val()) ? parseInt($('#hdnddlBusinessType').val()) : null,
            LegalEntityTypeId: isTagInArray(remainingTags, $('#hdnddlLegalEntity').val()) ? parseInt($('#hdnddlLegalEntity').val()) : null,
            ProtfolioGrowthId: isTagInArray(remainingTags, $('#hdnddlProtfolioGrowth').val()) ? parseInt($('#hdnddlProtfolioGrowth').val()) : null,
            JobCategoryId: isTagInArray(remainingTags, $('#hdnddlJobCategory').val()) ? parseInt($('#hdnddlJobCategory').val()) : null,
            CustomerTypeId: isTagInArray(remainingTags, $('#hdnddlCustomerType').val()) ? parseInt($('#hdnddlCustomerType').val()) : null,
            BudgetTypeId: isTagInArray(remainingTags, $('#hdnddlBudgetType').val()) ? parseInt($('#hdnddlBudgetType').val()) : null,
            FromDate: FromDate,
            ToDate: ToDate
        }
    });

    // Send the data with an AJAX request
    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetAdminReport',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
         beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },

        //beforeSend: function () {
        //    LoaderStart("#main-report");
        //    LoaderStart("#project-div");
        //    LoaderEnd("#activity-div");
        //    LoaderEnd("#task-div");
        //    LoaderEnd("#job-div");

        //},
        //complete: function () {
        //    LoaderEnd("#main-report");
        //    LoaderEnd("#project-div");
        //    LoaderEnd("#activity-div");
        //    LoaderEnd("#task-div");
        //    LoaderEnd("#job-div");
        //},
       
        success: function (data) {
            //console.log('Console Vaulue', valuarr);

            for (var i = 0; i < valuarr.length; i++) {
                if (valuarr[0].CountryId == null) {
                    $("#ddlCountry").val('').trigger('change');
                }
                else if (valuarr[0].ProvinceId == null) {
                    $("#ddlProvince").val('').trigger('change');
                }
                else if (valuarr[0].IndustrySectorId == null) {
                    $("#ddlIndustrySector").val('').trigger('change');
                }
                else if (valuarr[0].LegalEntityTypeId == null) {
                    $("#ddlLegalEntity").val('').trigger('change');
                }
                else if (valuarr[0].ProtfolioGrowthId == null) {
                    $("#ddlProtfolioGrowth").val('').trigger('change');
                }
                else if (valuarr[0].JobCategoryId == null) {
                    $("#ddlJobCategory").val('').trigger('change');
                }
                else if (valuarr[0].BudgetTypeId == null) {
                    $("#ddlBudgetType").val('').trigger('change');
                }
                else if (valuarr[0].CustomerTypeId == null) {
                    $("#ddlCustomerType").val('').trigger('change');
                }
                else if (valuarr[0].BusinessTypeId == null) {
                    $("#ddlBusinessType").val('').trigger('change');
                }
                else if (valuarr[0].VisitType == null) {
                    $("#ddlVisitType").val('').trigger('change');
                }
            }
            //ENTERPRISE
            $("#spnTotalEnterprise").text(data["TotalEnterprise"]);
            $("#spnTotalPendingEnterprise").text(data["TotalPendingEnterprise"]);
            $("#spnTotalActiveEnterprise").text(data["TotalActiveEnterprise"]);
            $("#spnTotalCompletedEnterprise").text(data["TotalCompletedEnterprise"]);

            //SMME
            $("#spnTotalMSME").text(data["TotalSMME"]);
            $("#spnTotalPendingMSME").text(data["TotalPendingSMME"]);
            $("#spnTotalActiveMSME").text(data["TotalActiveSMME"]);
            $("#spnTotalCompletedMSME").text(data["TotalCompletedSMME"]);

            //PROJECT
            $("#spnTotalProject").text(data["TotalProject"]);
            $("#spnTotalPendingProject").text(data["TotalPendingProject"]);
            $("#spnTotalActiveProject").text(data["TotalActiveProject"]);
            $("#spnTotalCompletedProject").text(data["TotalCompletedProject"]);

            //ASSESSMENT
            $("#spnTotalAssessment").text(data["TotalAssesment"]);
            $("#spnTotalPendingAssessment").text(data["TotalPendingAssesment"]);
            $("#spnTotalActiveAssessment").text(data["TotalActiveAssesment"]);
            $("#spnTotalCompletedAssessment").text(data["TotalCompletedAssesment"]);

            //CUSTOMER
            $("#spnTotalCustomer").text(data["TotalCustomer"]);
            $("#spnTotalPendingCustomer").text(data["TotalPendingCustomer"]);
            $("#spnTotalActiveCustomer").text(data["TotalActiveCustomer"]);
            $("#spnTotalCompletedCustomer").text(data["TotalDeactiveCustomer"]);

            //JOBS
            $("#spnTotalJob").text(data["TotalJOB"]);
            $("#spnTotalPendingJob").text(data["TotalOpenJOB"]);
            $("#spnTotalActiveJob").text(data["TotalProgressJOB"]);
            $("#spnTotalCompletedJob").text(data["TotalCompletedJOB"]);

            //PROJECTS
            $("#spnPendingProject").text(data["TotalPendingProject"]);
            $("#spnInprogressProject").text(data["TotalActiveProject"]);
            $("#spnCompletedProject").text(data["TotalCompletedProject"]);

            //JOBS
            $("#spnPendingJob").text(data["TotalOpenJOB"]);
            $("#spnInprogressJob").text(data["TotalProgressJOB"]);
            $("#spnCompletedJob").text(data["TotalCompletedJOB"]);

            //TASKS
            $("#spnPendingTASKS").text(data["TotalOpenJOB"]);
            $("#spnInprogressTASKS").text(data["TotalProgressTask"]);
            $("#spnCompletedTASKS").text(data["TotalCompletedTask"]);

            //ACIVITY
            $("#spnPendingACTIVITIES").text(data["TotalPendingActivity"]);
            $("#spnInprogressACTIVITIES").text(data["TotalActiveActivity"]);
            $("#spnCompletedACTIVITIES").text(data["TotalCompletedActivity"]);
        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}

function fnReportAdmin() {
    //var formattedFromDate = $('#formattedFromDate').val();
    //var formattedToDate = $('#formattedToDate').val();

    var _data = JSON.stringify({
        rpt: {
         
            CountryId: parseInt($('#ddlCountry').val()),
            ProvinceId: parseInt($('#ddlProvince').val()),
            IndustrySectorId: parseInt($('#ddlIndustrySector').val()),
            BusinessTypeId: parseInt($('#ddlBusinessType').val()),
            LegalEntityTypeId: parseInt($('#ddlLegalEntity').val()),
            
            ProtfolioGrowthId: parseInt($('#ddlProtfolioGrowth').val()),
            JobCategoryId: parseInt($('#ddlJobCategory').val()),
            CustomerTypeId: parseInt($('#ddlCustomerType').val()),
            BudgetTypeId: parseInt($('#ddlBudgetType').val()),
            VisitType: $('#ddlVisitType').val(),
            FromDate: FromDate,
            ToDate: ToDate,
        }
    });

    $.ajax({
        type: "POST",
         url: '/ScriptJson/GetAdminReport',
        contentType: "application/json; charset=utf-8",
     
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        //beforeSend: function () {
        //    LoaderStart("#main-report");
        //    LoaderStart("#project-div");
        //    LoaderEnd("#activity-div");
        //    LoaderEnd("#task-div");
        //    LoaderEnd("#job-div");
            
        //},
        //complete: function () {
        //    LoaderEnd("#main-report");
        //    LoaderEnd("#project-div");
        //    LoaderEnd("#activity-div");
        //    LoaderEnd("#task-div");
        //    LoaderEnd("#job-div");
        //},
        
        success: function (data) {
          
            //console.log('Conlole data', data);
            //ENTERPRISE
            $("#spnTotalEnterprise").text(data["TotalEnterprise"]);
            $("#spnTotalPendingEnterprise").text(data["TotalPendingEnterprise"]);
            $("#spnTotalActiveEnterprise").text(data["TotalActiveEnterprise"]);
            $("#spnTotalCompletedEnterprise").text(data["TotalCompletedEnterprise"]);
            
            //SMME
            $("#spnTotalMSME").text(data["TotalSMME"]);
            $("#spnTotalPendingMSME").text(data["TotalPendingSMME"]);
            $("#spnTotalActiveMSME").text(data["TotalActiveSMME"]);
            $("#spnTotalCompletedMSME").text(data["TotalCompletedSMME"]);

            //PROJECT
            $("#spnTotalProject").text(data["TotalProject"]);
            $("#spnTotalPendingProject").text(data["TotalPendingProject"]);
            $("#spnTotalActiveProject").text(data["TotalActiveProject"]);
            $("#spnTotalCompletedProject").text(data["TotalCompletedProject"]);

            //ASSESSMENT
            $("#spnTotalAssessment").text(data["TotalAssesment"]);
            $("#spnTotalPendingAssessment").text(data["TotalPendingAssesment"]);
            $("#spnTotalActiveAssessment").text(data["TotalActiveAssesment"]);
            $("#spnTotalCompletedAssessment").text(data["TotalCompletedAssesment"]);

            //CUSTOMER
            $("#spnTotalCustomer").text(data["TotalCustomer"]);
            $("#spnTotalPendingCustomer").text(data["TotalPendingCustomer"]);
            $("#spnTotalActiveCustomer").text(data["TotalActiveCustomer"]);
            $("#spnTotalCompletedCustomer").text(data["TotalDeactiveCustomer"]);

            //JOBS
            $("#spnTotalJob").text(data["TotalJOB"]);
            $("#spnTotalPendingJob").text(data["TotalOpenJOB"]);
            $("#spnTotalActiveJob").text(data["TotalProgressJOB"]);
            $("#spnTotalCompletedJob").text(data["TotalCompletedJOB"]);

            //PROJECTS
            $("#spnPendingProject").text(data["TotalPendingProject"]);
            $("#spnInprogressProject").text(data["TotalActiveProject"]);
            $("#spnCompletedProject").text(data["TotalCompletedProject"]);

            //JOBS
            $("#spnPendingJob").text(data["TotalOpenJOB"]);
            $("#spnInprogressJob").text(data["TotalProgressJOB"]);
            $("#spnCompletedJob").text(data["TotalCompletedJOB"]);
            
            //TASKS
            $("#spnPendingTASKS").text(data["TotalOpenJOB"]);
            $("#spnInprogressTASKS").text(data["TotalProgressTask"]);
            $("#spnCompletedTASKS").text(data["TotalCompletedTask"]);

            //ACIVITY
            $("#spnPendingACTIVITIES").text(data["TotalPendingActivity"]);
            $("#spnInprogressACTIVITIES").text(data["TotalActiveActivity"]);
            $("#spnCompletedACTIVITIES").text(data["TotalCompletedActivity"]);

        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

$("#ddlIndustrySector").change(function () {
    $(".ddlBusinessType").find("option").remove();
    var f = $(".ddlBusinessType");

    f.length &&
      f.each(function () {
          var f = $(this);
          f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
      });

    DropdownBinder.DDLData = {
        tableName: "EnterpriseTypeSetUp_ETM",
        Text: 'ETM_EnterpriseType',
        Value: 'ETM_Id',
        PId: $(this).val(),
        ColumnName: 'ETM_IndustryId'
    };
    DropdownBinder.DDLElem = $("#ddlBusinessType");
    DropdownBinder.Execute();
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



//$("#btnApplyFilter").click(function () {
//    fnReportAdmin();
//    resetFilters();
//});

//function resetFilters() {
//    // Reset each dropdown to its default state (empty or unselected)
//    $("#ddlIndustrySector").val('').trigger('change');
//    $("#ddlCountry").val('').trigger('change');
//    $("#ddlProvince").val('').trigger('change');
//    $("#ddlLegalEntity").val('').trigger('change');
//    $("#ddlProtfolioGrowth").val('').trigger('change');
//    $("#ddlJobCategory").val('').trigger('change');
//    $("#ddlBudgetType").val('').trigger('change');
//    $("#ddlCustomerType").val('').trigger('change'); 
//    $("#ddlVisitType").val('').trigger('change');
//}


//print report
function printDiv(divId) {
    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
}


// current date-time
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}${period}`;
}

const currentDate = new Date();
const formattedDate = formatDate(currentDate);
const formattedTime = formatTime(currentDate);

document.getElementById('current-time').innerText = `${formattedDate} ${formattedTime}`;