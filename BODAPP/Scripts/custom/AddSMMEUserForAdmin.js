// Get Query Parameter from URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var formElem = document.getElementById("formEnterpriseUser");

// Save Records via AJAX
function SaveRecords() {
    var _data = JSON.stringify({
        User: {
            UM_Id: $('#Id').val(),
            UserName: $.trim($('#txtUserName').val()),
            UM_EmailId: $('#txtUserEmail').val(),
            UM_ContactNo: $('#txtContact').val(),
            UM_Role: 'S',
            UM_SubRoleId: $('#ddlRole').val(),
            UM_SubRole: $('#ddlRole option:selected').text(),
            UM_Age: $('#txtAge').val(),
            UM_Gender: $('#ddlGender').val()
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.SaveRecordData,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data && data.IsSuccess) {
                Swal.fire({
                    title: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                }).then(() => window.location = '/SMME/ViewAllSMMEUser');
            } else {
                Swal.fire({
                    title: data?.Message || "Something went wrong!",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

$(document).ready(function () {
    // Allow only alphabets
    $('.alphabets').on('input', function () {
        $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, ''));
    });

    // Bind Dropdown Data
    DropdownBinder.DDLData = { tableName: "RoleSetUp_RM", Text: 'RM_Role', Value: 'RM_Id' };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();

    $("#alrtmainDiv").hide();
    $("#lnlcncl").click(() => location.reload());

    var Id = getParameterByName('Id');
    if (Id) {
        retrive(Id);
        $('#Id').val(Id);
    }
});

// Select2 Initialization
$(function () {
    const initSelect2 = (selector, placeholder) => {
        $(selector).each(function () {
            const el = $(this);
            el.wrap('<div class="position-relative"></div>')
              .select2({ placeholder, dropdownParent: el.parent() });
        });
    };

    initSelect2(".ddlEnterprise", "Select A Enterprise");
    initSelect2(".ddlRole", "Select A Role");
    initSelect2(".ddlGender", "Select A Gender");

    // Form Validation
    FormValidation.formValidation(formElem, {
        fields: {
            txtUserName: { validators: { notEmpty: { message: "Please enter Username" } } },
            txtUserEmail: { 
                validators: { 
                    notEmpty: { message: "Please enter Email" }, 
                    emailAddress: { message: "The value is not a valid email address" } 
                } 
            },
            txtContact: { validators: { notEmpty: { message: "Please enter Contact Number" } } },
            ddlRole: { validators: { notEmpty: { message: "Please Select Role" } } }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: () => ".mb-3",
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', SaveRecords);
});

// Retrieve Data by ID
function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: parseInt(id),
            param2: 'UM_MainID',
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
            $('#Id').val(data["UM_Id"]);
            $('#txtUserName').val(data["UM_Name"]);
            $('#txtUserEmail').val(data["UM_EmailId"]);
            $('#txtContact').val(data["UM_ContactNo"]);
            $('#txtAge').val(data["UM_Age"]);
            $('#ddlGender').val(data["UM_Gender"]).change();
            $('#ddlRole').val(data["UM_SubRoleId"]).change();
        },
        error: function () {
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

// Cancel Confirmation
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
        buttonsStyling: false,
    }).then((t) => {
        if (t.value) {
            Swal.fire({
                icon: "danger",
                title: "Cancel!",
                text: "Your data has been cleared.",
                customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
            }).then(() => window.location.href = "/SMME/ViewAllSMMEUser");
        }
    });
}

$("#btnCancelRedirect").on("click", fnCancelRedirect);
