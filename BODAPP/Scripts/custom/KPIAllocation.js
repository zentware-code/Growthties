var QuesArr = [];
var formElem = document.getElementById("setUPForm");
var form = $('#setUPForm');
var KCId = 0;
var KCGId = 0;
var Mode = '';
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

!function () {
    KCId = getParameterByName('KCId');
    KCGId = getParameterByName('KCGId');
    Mode = getParameterByName('Mode');
    if ((Mode == 'E') && (parseInt(KCId)>0) && (parseInt(KCGId)>0)) {
        retrieveQuestionWithParam();
    } else {
        retrieveQuestion();
    }

    var x = $(".ddlCategoryName");
    var y = $(".ddlCategoryGroupName");
    x.length &&
        x.each(function () {
            var x = $(this);
            x.wrap('<div class="position-relative"></div>'), x.select2({ placeholder: "Select KPI Category", dropdownParent: x.parent() });
        });
    y.length &&
       y.each(function () {
           var y = $(this);
           y.wrap('<div class="position-relative"></div>'), y.select2({ placeholder: "Select KPI CategoryGroup", dropdownParent: y.parent() });
       });

    DropdownBinder.DDLData = {
        tableName: "KPICategorySetUp_KC",
        Text: 'KC_CategoryName',
        Value: 'KC_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCategoryName");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "KPICategoryGroupSetUp_KCG",
        Text: 'KCG_CategoryGroupName',
        Value: 'KCG_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCategoryGroupName");
    DropdownBinder.Execute();


    var e = document.getElementById("setUPForm");
    FormValidation.formValidation(formElem, {
        fields: {
            CategoryGroupName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Category GroupName"
                    }
                }
            }
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

        SaveRecordKPICategoryGroup();
    });

    //retrieveQuestion();
}();

var offcanvas = new bootstrap.Offcanvas($('#setUPFormPopUp')[0]);

// Show the offcanvas when the "Add" button is clicked
$('#btnAdd').on('click', function () {
    offcanvas.show();  // Show the offcanvas popup
});

// Reset the form when the popup is dismissed
$('[data-bs-dismiss="offcanvas"]').on('click', function () {
    $('#setUPForm')[0].reset();  // Reset the form on popup close
});


function SaveRecordKPICategoryGroup() {
    var _data = form.serialize();
    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
        data: _data,
        async: false,
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
                        if ($('#Id').val() == '') {
                            $("#setUPFormPopUp .close").click();
                        } else {
                            $('#setUPFormPopUp').removeClass('show');
                        }
                        $('.form-control').val('');

                        $('#ddlCategoryGroupName').find('option').remove();
                        DropdownBinder.DDLData = {
                            tableName: "KPICategoryGroupSetUp_KCG",
                            Text: 'KCG_CategoryGroupName',
                            Value: 'KCG_Id'
                        };
                        DropdownBinder.DDLElem = $("#ddlCategoryGroupName");
                        DropdownBinder.Execute();

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
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

}


function retrieveQuestion() {

    //if (Mode == 'E') {
    //    var _data = JSON.stringify({
    //        global: {
    //            TransactionType: 'SelectKPIQuestionForKPIAllocationWithParam',
    //            param1: 'KPS_Id',
    //            param1Value: parseInt(KPSId),
    //            StoreProcedure: 'AssessmentKPI_USP'
    //        }
    //    });
    //} else {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectKPIQuestionForKPIAllocation',
                StoreProcedure: 'AssessmentKPI_USP'
            }
        });
    //}
    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
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
            console.log("Show data", data);

            var QsList = '';

            $.each(data, function (index, elem) {
                index = index + 1;
                console.log("data-", elem);

                // Use the KPS_Id as the value for the checkbox
                QsList += '<tr>' +
                            '<input type="hidden" value="' + elem.KP_Id + '" />' +
                            '<td style="width:10%">' +
                                '<input type="checkbox" class="form-check-input selectItem" ' + (elem.IsChecked ? 'checked' : '') +
                                ' value="' + elem.KPS_Id + '" id="defaultCheck' + index + '" />' +
                            '</td>' +
                            '<td style="width:30%">' + elem.KPS_KPI + '</td>' +
                          '</tr>';
            });

            // Append the generated rows to the tbody
            $('#tblQuestionBuild tbody').html(QsList);
            LoaderEnd(".loader-sectionenr");
        },
        error: function () {
                LoaderEnd(".loader-sectionenr");
           
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });

    return false;
}


function retrieveQuestionWithParam() {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectKPIQuestionForKPIAllocationWithParam',
                param1: 'KPA_KC_Id',
                param1Value: parseInt(KCId),
                param2: 'KPA_KCG_Id',
                param2Value: parseInt(KCGId),
                StoreProcedure: 'AssessmentKPI_USP'
            }
        });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
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
            //console.log("Show data", data);
            var QsList = '';
            $.each(data, function (index, elem) {
                index = index + 1;
                console.log("data-", elem);

                // Use the KPS_Id as the value for the checkbox
                QsList += '<tr>' +
                            '<input type="hidden" value="' + elem.KP_Id + '" />' +
                            '<td style="width:10%">' +
                                '<input type="checkbox" class="form-check-input selectItem" ' + (elem.IsChecked ? 'checked' : '') +
                                ' value="' + elem.KPS_Id + '" id="defaultCheck' + index + '" />' +
                            '</td>' +
                            '<td style="width:30%">' + elem.KPS_KPI + '</td>' +
                          '</tr>';
            });



            $('#ddlCategoryName').val(KCId).change();
            $('#ddlCategoryGroupName').val(KCGId).change();

            // Append the generated rows to the tbody
            $('#tblQuestionBuild tbody').html(QsList);

            LoaderEnd(".loader-sectionenr");
        },
        error: function () {
         LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });

    return false;
}






// Function to handle "Select All" checkbox
$('#selectAll').on('click', function () {
    var isChecked = $(this).prop('checked');

    // Select/Deselect all checkboxes based on "Select All"
    $('.selectItem').each(function () {
        $(this).prop('checked', isChecked);
    });

    // If "Select All" is checked, update the QuesArr array
    if (isChecked) {
        $('.selectItem').each(function () {
            var kpiId = $(this).val();
            if (QuesArr.indexOf(kpiId) === -1) {
                QuesArr.push(kpiId);  // Add the KPA_KPS_Id to the array
            }
        });
    } else {
        QuesArr = [];
    }
});

$('#tblQuestionBuild').on('change', '.selectItem', function () {
    var kpiId = $(this).val();  

    if ($(this).is(':checked')) {
        if (QuesArr.indexOf(kpiId) === -1) {
            QuesArr.push(kpiId);
        }
    } else {
        var index = QuesArr.indexOf(kpiId);
        if (index > -1) {
            QuesArr.splice(index, 1); 
        }
    }

    // Check if all checkboxes are selected
    var allChecked = $('.selectItem:checked').length === $('.selectItem').length;
    if (allChecked) {
        $('#selectAll').prop('checked', true); 
    } else {
        $('#selectAll').prop('checked', false); 
    }
});

//// Use a single event listener for both dropdowns
//$("#ddlCategoryGroupName, #ddlCategoryName").on('change', function () {
//    // Check which dropdown triggered the event
//    if (this.id === "ddlCategoryGroupName") {
//        KCGId = $(this).val();
//    } else if (this.id === "ddlCategoryName") {
//        KCId = $(this).val();
//    }
//    retrieveQuestionWithParam(KCGId, KCId); // Call the function to retrieve questions
//});


function collectSelectedQuestions() {
    var selectedIds = [];
    $(".selectItem:checked").each(function () {
        selectedIds.push({ KPA_KPS_Id: $(this).val() });  // Push selected IDs into the array
    });
    return selectedIds;
}

function SaveRecords() {
    // Collect selected questions first
    var QuesArr = collectSelectedQuestions(); 

    // Check if there are any selected questions
    if (QuesArr.length === 0) {
        Swal.fire({
            title: "Oops...",
            text: "No questions selected!",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
        return;  // Exit the function if no questions are selected
    }

    // Prepare the data for submission
    var _data = JSON.stringify({
        entity: {
            KPA_KC_Id: parseInt($("#ddlCategoryName").val()),  // Get selected category ID
            KPA_KCG_Id: parseInt($("#ddlCategoryGroupName").val()),  // Get selected category group ID
            KPIQnsList: QuesArr  // The selected KPA_KPS_Id values
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertKPIQuestionAllocation',  // Correct URL
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Question built successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        Mode = getParameterByName('Mode');
                        if (Mode == 'E') {
                            //retrieveQuestionWithParam();
                            window.location.href = "/Assessment/KPIAllocationList";
                        } else {
                            window.location.href = "/Assessment/KPIAllocationList";
                        }

                        //window.location.reload();
                    }
                });
            } else {
                Swal.fire({
                    title: "Oops...",
                    text: data.Message || 'An error occurred while saving the data.',
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}


$("#submitBtn").on('click', function () {
    // Get selected values from the dropdowns
    var categoryName = $("#ddlCategoryName").val();
    var categoryGroupName = $("#ddlCategoryGroupName").val();

    // Flag to track if all fields are valid
    var isValid = true;

    // Check if category name is selected
    if (categoryName <= 0) {
        $(".position-relative").css("border", "1px solid red");  
        isValid = false;
    } else {
        $(".position-relative").css("border", "");  
    }

    // Check if category group name is selected
    if (categoryGroupName <= 0) {
        $(".position-relative").css("border", "1px solid red");  
        isValid = false;
    } else {
        $(".position-relative").css("border", ""); 
    }

    if (isValid) {
        SaveRecords();  
    } else {
        Swal.fire({
            title: "Oops!",
            text: "Please select all required fields.",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
    }
});

$("#ddlCategoryName").on('change', function () {
    var categoryName = $("#ddlCategoryName").val();
    if (categoryName > 0) {
        $(".position-relative").css("border", "");
    }
});
$("#ddlCategoryGroupName").on('change', function () {
    var categoryGroupName = $("#ddlCategoryGroupName").val();
    if (categoryGroupName > 0) {
        $(".position-relative").css("border", "");
    }
});
    
