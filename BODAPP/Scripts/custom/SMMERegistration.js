var enrId = '';

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function () {
    var idtak = getParameterByName('enrId');
    idtak = parseInt(idtak);  // Ensure it's a number

    if (idtak === 30) {
        enrId = 30;
        $('.coke').show();
        $('.auth-cover-bg-color').css('background-image', 'url("../Content/assets/img/illustrations/index_img_msme_microsoft.jpg")');
        document.querySelector(':root').style.setProperty('--default-primary-hex', '#0078D4'); // Microsoft blue
        $('#dynamic-declare').html('By signing up on this website, you consent to Microsft technology South Africa collecting and processing your personal information in accordance with the Protection of Personal Information Act (POPIA). We will use your details to communicate with you regarding our services, updates, and occasional promotions via email, WhatsApp, or SMS. Your information will be kept secure and will not be shared with third parties without your explicit consent')
        
        $('.cokelogo').attr('src', '../Content/assets/img/illustrations/microsoft_logo.jpg');

    } else if (idtak > 0) {
        enrId = 1;
        $('.coke').show();
        $('.auth-cover-bg-color').css('background-image', 'url("../Content/assets/img/illustrations/index_img_msme.jpg")');
        document.querySelector(':root').style.setProperty('--default-primary-hex', '#ff0000');
        $('#dynamic-declare').html('By signing up on this website, you consent to Coca Cola Beverages South Africa collecting and processing your personal information in accordance with the Protection of Personal Information Act (POPIA). We will use your details to communicate with you regarding our services, updates, and occasional promotions via email, WhatsApp, or SMS. Your information will be kept secure and will not be shared with third parties without your explicit consent')
        //$('.cokelogo').attr('src', '../Upload/microsoft_logo.jpg');

    } else {
        enrId = '';
        $('.mpt-80').css('padding-top', '10px');
    }


    //var idtak = getParameterByName('enrId');
    //if (idtak > 0 || idtak != '') {
    //    enrId = 1  /// idtak;
    //    $('.coke').show();
    //    $('.auth-cover-bg-color').css('background-image', 'url("../Upload/index_img_msme.jpg")');     //  coke-logo.jpeg
    //    document.querySelector(':root').style.setProperty('--default-primary-hex', '#ff0000');
    //} else {
    //    enrId = '';
    //    $('.mpt-80').css('padding-top', '10px');
    //}


    $('.alphabets').on('input', function () {

        let inputValue = $(this).val();

        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

        $(this).val(alphabeticValue);
    });
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    txtApntDate = $("#txtApntDate").val();


    if (txtApntDate == "") {
        document.getElementById("txtApntDate").value = today;
    }

    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlSector");
    DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "EnterpriseTypeSetUp_ETM",
    //    Text: 'ETM_EnterpriseType',
    //    Value: 'ETM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlBusinessType");
    //DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCountry");
    DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "ProvinceSetUp_PM",
    //    Text: 'PM_Province',
    //    Value: 'PM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlProvince");
    //DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "LegalEntitySetUp_LEM",
        Text: 'LEM_LegalEntity',
        Value: 'LEM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlLegalEntity");
    DropdownBinder.Execute();


    // Update on page load
    updateEntityType();

    $('#privacyPolicyLink').on('click', function () {
        const fileUrl = '../Content/assets/documents/privacy-policy.pdf'; // <-- Set your actual file path here
        previewFile(fileUrl);
    });
});


$('#agreeCheckbox').change(function () {
    if ($(this).is(':checked')) {
        $('#nextButton').prop('disabled', false);
    } else {
        $('#nextButton').prop('disabled', true);
    }
});

$('input[name="gender"]').on('change', function () {
    $('input[name="gender"]').not(this).prop('checked', false);
});

// On page load or when radio changes
function updateEntityType() {
    var selectedValue = $('input[name="default-radio-1"]:checked').val();
    $('#txtSMMEEntityType').val(selectedValue);
}

// Update when selection changes
$('input[name="default-radio-1"]').on('change', function () {
    updateEntityType();
});


//$("#rdoEntityRegistration").click(function () {
//    if ($(this).is(":checked")) {
//        $('#lblCompanyName').html("Business Name");
//        $('#lblRegNo').html("Registration Number");
//        $('#txtCompanyName').attr('placeholder', 'Entity Name');
//        $('#txtRegNum').attr('placeholder', 'Enter Your Registration Number')
//    };
//});
//$("#rdoSoletraderRegistration").click(function () {
//    if ($(this).is(":checked")) {
//        $('#lblCompanyName').html("Business Name");
//        //$('#lblRegNo').html("Id Number");
//        $('#txtCompanyName').attr('placeholder', 'Business Name');
//        //$('#txtRegNum').attr('placeholder', 'Enter Your Id Number')
//    };
//});
//if ($('#rdoEntityRegistration').prop("checked")) {
//    $('#lblCompanyName').html("Business Name");
//    $('#lblRegNo').html("Registration Number");
//}


function SaveRecords() {
    var _data = JSON.stringify({
        entity: {
            SMME_Id: $('#hdnId').val(),
            // SMME_PrimaryContactName: $.trim($('#txtContactName').val()),

            SMME_PrimaryContactFirstName: $.trim($('#txtContactFirstName').val()),
            SMME_PrimaryContactLastName: $.trim($('#txtContactLastName').val()),

            SMME_PrimaryContactEmail: $('#txtContactEmail').val(),
            SMME_Password: $('#txtPassword').val(),
            SMME_SecondaryContactName: $('#SecondaryContactName').val(),
            SMME_SecondaryContactEmail: $('#SecondaryContactEmail').val(),
            SMME_PrimaryContactNo: $('#PrimaryContactNumber').val(),
            SMME_SecondaryContactNo: $('#SecondaryContactNumber').val(),

            SMME_CompanyName: $.trim($('#txtCompanyName').val()),
            SMME_RegNumber: $('#txtRegNum').val(),
            SMME_SectorId: $('#ddlSector').val(),
            SMME_SMMETypeId: $('#ddlBusinessType').val(),
            SMME_CountryId: $('#ddlCountry').val(),
            SMME_ProvinceId: $('#ddlProvince').val(),
            SMME_BusinessAddress: $('#txtBusinessAddress').val(),

            SMME_LegalEntityTypeId: $('#ddlLegalEntity').val(),
            SMME_TaxNumber: $('#txtTaxNumber').val(),
            SMME_VatNumber: $('#txtVatNumber').val(),
            SMME_IncorporationDate: $('#txtIncorporationDate').val(),
            SMME_RegNum2: $('#txtRegNum2').val(),
            SMME_BillingContactNumber: $('#txtBillingContactNum').val(),
            SMME_BillingAddress: $('#txtBillingAddress').val(),
            SMME_EnterpriseId: parseInt(enrId),
            SMME_EntityType: $('#txtSMMEEntityType').val(),
            SMME_PrimaryIdType: $('#ddlPrimaryIdType').val(),
            SMME_PrimaryIdNumber: $('#txtPrimaryIdNumber').val(),

            SMME_DateOfBirth: $('#txtAge').val(),
            SMME_Gender: $('input[name="gender"]:checked').val(),

        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateSMMERegistration',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                    if ($('#txtContactEmail').val() != '') {
                        SendWhatsApp();
                        SendMail();
                    } else {
                        SendWhatsApp();

                        Swal.fire({
                            title: "Success!",
                            text: data.Message,
                            icon: "success",
                            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                            buttonsStyling: !1
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/Account/SMMELogin';
                            }
                        });
                    }
                    //Swal.fire({
                    //    title: data.Message,
                    //    icon: "success",
                    //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    //    buttonsStyling: !1
                    //});
                    //$(".form-control").val('')
                    //window.location.href='/Account/SMMELogin'
                    //GetUSMMELoginForAfterReg(data.Id);
                }
                else {
                    LoaderEnd("#msmeRegPageLoader");
                    var Email = $('#txtContactEmail').val();
                    var Phone = $('#PrimaryContactNumber').val();
                    var RegistrationNo = $('#txtRegNum').val();
                    var titleText = '';
                    if (data.Id == -1) {
                        titleText = '"' + Email + '"' + " this email already exists..!";
                    } else if (data.Id == -2) {
                        titleText = '"' + Phone + '"' + " this phone number already exists..!";
                    } else if (data.Id == -3) {
                        titleText = '"' + RegistrationNo + '"' + " this Registration Number already exists..!";
                    }
                    else {
                        titleText = data.Message;
                    }
                    Swal.fire({
                        title: "Oops...",
                        text: titleText,
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    });
                    //Swal.fire({
                    //    title: "Oops..",
                    //    text: data.Message,
                    //    icon: "error",
                    //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    //    buttonsStyling: !1
                    //});
                }
            }
            else {
                LoaderEnd("#msmeRegPageLoader");
                var Email = $('#txtContactEmail').val();
                var Phone = $('#PrimaryContactNumber').val();
                var RegistrationNo = $('#txtRegNum').val();
                var titleText = '';
                if (data.Id == -1) {
                    titleText = '"' + Email + '"' + " this email already exists..!";
                } else if (data.Id == -2) {
                    titleText = '"' + Phone + '"' + " this phone number already exists..!";
                } else if (data.Id == -3) {
                    titleText = '"' + RegistrationNo + '"' + " this Registration Number already exists..!";
                }
                else {
                    titleText = data.Message;
                }
                Swal.fire({
                    title: "Oops..!",
                    text: titleText,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                //Swal.fire({
                //    title: "Oops..!",
                //    text: data.Message,
                //    icon: "error",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});
            }
        },
        error: function (data) {
            LoaderEnd("#msmeRegPageLoader");
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}


function SendMail() {
    $('#btnSave').prop('disabled', true);
    $("#btnSave").html('Please Wait.....');

    var action = 'smmeregistrationoutside';

    var _data = JSON.stringify({
        emailcontent: {
            UserName: $('#txtContactFirstName').val(),
            SMMEName: $('#txtCompanyName').val(),
            Email: $('#txtContactEmail').val(),
            UM_Login: $('#txtContactEmail').val(),
            Password: $('#txtPassword').val(),
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //beforeSend: function () {

        //},
        complete: function () {
            LoaderEnd("#msmeRegPageLoader");
        },
        success: function (data) {
            $(".form-control").val('');
            if (data != null && data.IsSuccess === true) {
                Swal.fire({
                    title: "Success!",
                    text: 'Notification sent successfully!',      //data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/Account/SMMELogin';
                    }
                });
                $("#btnSave").html('Save');
                $('#btnSave').removeAttr('disabled');


            } else {
                LoaderEnd("#msmeRegPageLoader");
                Swal.fire({
                    title: "Oops..!",
                    text: "Invalid email, try another email..!",
                    icon: "warning",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                $("#btnSave").html('Save');
                $('#btnSave').removeAttr('disabled');
                //setTimeout(function () {
                //    window.location.reload();  
                //}, 2000);
            }
        },
        error: function () {
            LoaderEnd("#msmeRegPageLoader");
            Swal.fire({
                title: "Oops..!",
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

$("#btnSave").click(function () {
    LoaderStart("#msmeRegPageLoader");
    SaveRecords();
});



function SendWhatsApp() {
    LoaderEnd("#msmeRegPageLoader");

    // Encrypt username and name
    function base64Encode(value) {
        return btoa(unescape(encodeURIComponent(value)));
    }


    // Get the raw contact number input (from South Africa)
    var rawNumber = $('#PrimaryContactNumber').val().trim().replace(/\s+/g, '');



    // Prepend South African country code (+27)
    var phoneNumber = '+27' + rawNumber;
    //var phoneNumber = '+27649130386';
    //var phoneNumber = '+91' + '9749276281';      ////  this is for self-test

    // Get other dynamic values
    var name = $('#txtCompanyName').val();
    var tenantId = '';
    var username = '';
    var dashboardUrl = '';
    if ($('#txtContactEmail').val() != '') {
        tenantId = $('#txtContactEmail').val();
        username = $('#txtContactEmail').val();
        // Encode username and name
        var encryptedUsername = encodeURIComponent(base64Encode(username));
        var encryptedName = encodeURIComponent(base64Encode(name));
        dashboardUrl = baseUrl + "Account/EmailVerified?email=" + encryptedUsername + "&com=" + encryptedName;
    } else {
        tenantId = rawNumber;
        username = rawNumber;
        // Encode username and name
        var encryptedUsername = encodeURIComponent(base64Encode(username));
        var encryptedName = encodeURIComponent(base64Encode(name));
        dashboardUrl = baseUrl + "/Account/EmailVerified?email=" + encryptedUsername + "&com=" + encryptedName;
    }


    // Build the message body
    var bodyData = {
        template_name: "welcome_templ",
        broadcast_name: "Welcome",
        parameters: [
            { name: "name", value: name },
            { name: "tenant_id", value: tenantId },
            { name: "username", value: username },
            { name: "dashboard_url", value: dashboardUrl }
            //{
            //    name: "dashboard_url",
            //    value: "https://business.facebook.com/latest/whatsapp_manager/phone_numbers/?business_id=1035633468756300&tab=phone-numbers&nav_ref=whatsapp_manager&asset_id=2938727166331313"
            //}
        ]
    };

    // Set up request options
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODAxZmNkNS03ZmNiLTQ5OWUtYTYyNy05MGM1ZjJlYTczNzgiLCJ1bmlxdWVfbmFtZSI6Im9icmllbkBncm93dGh0aWVzLmNvLnphIiwibmFtZWlkIjoib2JyaWVuQGdyb3d0aHRpZXMuY28uemEiLCJlbWFpbCI6Im9icmllbkBncm93dGh0aWVzLmNvLnphIiwiYXV0aF90aW1lIjoiMDgvMDQvMjAyNSAxMjowMToxNiIsInRlbmFudF9pZCI6IjQ2NjU0NiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.eCxKQ6BrIwdad59qIdpFgLZ79BLB-wfsGDq-othRe3Q'
        },
        body: JSON.stringify(bodyData)
    };

    // Final API URL
    var url = 'https://live-mt-server.wati.io/466546/api/v1/sendTemplateMessage?whatsappNumber=' + phoneNumber;

    // Send request
    fetch(url, options)
        .then(function (res) { return res.json(); })
        .then(function (res) { console.log(res); })
        .catch(function (err) { console.error(err); });
    LoaderEnd("#msmeRegPageLoader");
}

/// preview privacy policy
function previewFile(fileUrl) {
    const extension = fileUrl.split('.').pop().toLowerCase();
    let previewHtml = '';

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
        previewHtml = '<img src="' + fileUrl + '" style="width:100%; height:500px; object-fit:cover; border-radius:0;" />';
    } else if (extension === 'pdf') {
        previewHtml = '<iframe src="' + fileUrl + '" style="width:100%; height:500px; border:none;"></iframe>';
    } else {
        previewHtml = '<iframe src="' + fileUrl + '" style="width:100%; height:500px; border:none;"></iframe>' +
                      '<p style="margin-top:10px; color:#888;">Preview may not be supported for this file type.</p>';
    }

    Swal.fire({
        title: '',
        html:
          '<div style="text-align: left; font-size: 18px; font-weight: 600; color: #555; padding-bottom: 10px;">Privacy Policy</div>' +
          previewHtml,
        width: 800,
        padding: '1rem',
        customClass: {
            popup: 'no-radius'
        },
        showCloseButton: true,
        showConfirmButton: false
    });
}


//****************Start Date < End Date Always*************
 $('#txtAge').on('change', function () {
        validateDate();
    });

function validateDate() {
    var valueFrom = $('#txtAge').val();
    var valueTo = new Date();
    valueTo.setHours(0, 0, 0, 0);

    $('#error-message').text('');
    $('.dtcls').css('border', '');

    if (valueFrom) {
        var dateFromParts = valueFrom.split('-');
        var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        if (dateFrom >= valueTo) {
            $('#error-message').text("Date of Birth must be earlier than the current date");
            $('.dtcls').css('border', '1px solid red');
            $('#txtAge').val('');
        }
    } else {
        $('#error-message').text("Please select date of birth");
        $('.dtcls').css('border', '1px solid red');
    }
}
