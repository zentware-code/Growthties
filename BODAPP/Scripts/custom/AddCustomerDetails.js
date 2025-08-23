// ========================================================
// Function: Get Data From URL by Parameter Name
// ========================================================
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Reference to form element
var formElem = document.getElementById("formCustDetail");

// ========================================================
// Function: Save Customer Records via AJAX
// ========================================================
function SaveRecords() {
    // Prepare JSON payload with form data
    var _data = JSON.stringify({
        cust: {
            CD_Id: $('#Id').val(),
            CD_Name: $.trim($('#txtName').val()),
            CD_AddressLine1: $('#txtAddressLine1').val(),
            CD_AddressLine2: $('#txtAddressLine2').val(),
            CD_Suburb: $('#txtSuberb').val(),
            CD_City: $('#txtCity').val(),
            CD_ProvinceId: $('#ddlProvince').val(),
            CD_PostalCode: $('#txtPostalCode').val(),
            CD_ContactNumber: $('#txtContact').val(),
            CD_Email: $('#txtEmail').val(),
            CD_Type: parseInt($('#ddlType').val()),
            CD_Location: $('#txtLocation').val(),
            CD_SectorId: $('#ddlSector').val(),
            CD_RegistrationNo: $('#txtRegistrationNo').val(),
            CD_Vat: $('#txtVat').val()
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.SaveRecordData,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data && data.IsSuccess === true) {
                if (data.Id > 0) {
                    // Show success alert and redirect based on IDs
                    Swal.fire({
                        title: "Successful..!",
                        text: "Your changes were saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if ($('#EntrId').val() > 0) {
                                window.location.href = "/Customer/ViewAllCustomerForEnterprise";
                            } else if ($('#SMMEId').val() > 0) {
                                window.location.href = "/Customer/ViewAllCustomerForSMME";
                            } else {
                                window.location.href = "/Customer/ViewAllCustomerForAdmin";
                            }
                        }
                    });
                } else {
                    // Show server message as error
                    Swal.fire({
                        title: "Oops...",
                        text: data.Message,
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    });
                }
            } else {
                // Handle error response
                Swal.fire({
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function () {
            // Generic error message
            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

// ========================================================
// Document Ready: Event Bindings and Dropdown Initialization
// ========================================================
$(document).ready(function () {
    // Restrict .alphabets inputs to letters and spaces only
    $('.alphabets').on('input', function () {
        let inputValue = $(this).val();
        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
        $(this).val(alphabeticValue);
    });

    // Bind dropdowns dynamically using DropdownBinder
    DropdownBinder.DDLData = { tableName: "ProvinceSetUp_PM", Text: 'PM_Province', Value: 'PM_Id' };
    DropdownBinder.DDLElem = $("#ddlProvince");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = { tableName: "SectorSetUp_SM", Text: 'SM_SectorName', Value: 'SM_Id' };
    DropdownBinder.DDLElem = $("#ddlSector");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = { tableName: "CustomerTypeSetUp_CT", Text: 'CT_CustomerType', Value: 'CT_Id' };
    DropdownBinder.DDLElem = $("#ddlType");
    DropdownBinder.Execute();

    $("#alrtmainDiv").hide();

    // Cancel button reload page
    $("#lnlcncl").click(function () {
        location.reload();
    });

    // Retrieve data if Id is present in URL
    var Id = getParameterByName('Id');
    if (Id !== '') {
        retrive(Id);
        $('#Id').val(Id);
    }
});

// ========================================================
// Initialize Select2 for dropdowns and form validation
// ========================================================
$(function () {
    var provinceDDL = $(".ddlProvince");
    var typeDDL = $(".ddlType");
    var sectorDDL = $(".ddlSector");

    // Apply select2 with placeholders
    provinceDDL.each(function () {
        var elem = $(this);
        elem.wrap('<div class="position-relative"></div>')
            .select2({ placeholder: "Select A Province", dropdownParent: elem.parent() });
    });

    typeDDL.each(function () {
        var elem = $(this);
        elem.wrap('<div class="position-relative"></div>')
            .select2({ placeholder: "Select A Type", dropdownParent: elem.parent() });
    });

    sectorDDL.each(function () {
        var elem = $(this);
        elem.wrap('<div class="position-relative"></div>')
            .select2({ placeholder: "Select A Sector", dropdownParent: elem.parent() });
    });

    // Initialize form validation
    FormValidation.formValidation(formElem, {
        fields: {
            txtName: { validators: { notEmpty: { message: "Please enter Name" } } },
            txtContact: { validators: { notEmpty: { message: "Please enter Contact Number" } } },
            txtEmail: {
                validators: {
                    notEmpty: { message: "Please enter email address" },
                    emailAddress: { message: "The value is not a valid email address" }
                }
            },
            ddlType: { validators: { notEmpty: { message: "Please Select Type" } } },
            txtCity: { validators: { notEmpty: { message: "Please Select City" } } }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function () { return ".mb-3"; }
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus()
        }
    }).on('core.form.valid', function () {
        SaveRecords();
    });
});

// ========================================================
// Function: Retrieve Customer Data by ID (AJAX)
// ========================================================
function retrive(id) {
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
        success: function (data) {
            // Populate fields with retrieved data
            $('#Id').val(data["CD_Id"]);
            $('#txtName').val(data["CD_Name"]);
            $('#txtAddressLine1').val(data["CD_AddressLine1"]);
            $('#txtAddressLine2').val(data["CD_AddressLine2"]);
            $('#ddlProvince').val(data["CD_ProvinceId"]).change();
            $('#ddlSector').val(data["CD_SectorId"]).change();
            $('#ddlType').val(data["CD_Type"]).change();
            $('#txtPostalCode').val(data["CD_PostalCode"]);
            $('#txtSuberb').val(data["CD_Suburb"]);
            $('#txtCity').val(data["CD_City"]);
            $('#txtEmail').val(data["CD_Email"]);
            $('#txtContact').val(data["CD_ContactNumber"]);
            $('#txtLocation').val(data["CD_Location"]);
            $('#txtRegistrationNo').val(data["CD_RegistrationNo"]);
            $('#txtVat').val(data["CD_Vat"]);
        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}

// ========================================================
// Function: Cancel Redirect Confirmation using SweetAlert
// ========================================================
function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel it!",
        customClass: {
            confirmButton: "btn btn-primary me-3 waves-effect waves-light",
            cancelButton: "btn btn-label-secondary waves-effect waves-light"
        },
        buttonsStyling: false
    }).then(function (t) {
        if (t.value) {
            Swal.fire({
                icon: "danger",
                title: "Cancel!",
                text: "Your data has been cleared.",
                customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
            }).then(function () {
                window.location.href = "/Customer/ViewAllCustomerForEnterprise";
            });
        }
    });
}

// Bind cancel button click event
$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});

// ========================================================
// Registration Number Formatter (YYYY/NNNNNN/NN)
// ========================================================
document.getElementById('txtRegistrationNo').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 4) value = value.slice(0, 4) + '/' + value.slice(4);
    if (value.length > 11) value = value.slice(0, 11) + '/' + value.slice(11, 13);
    this.value = value;
});

// ========================================================
// Function: Validate Registration Number Format
// ========================================================
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
