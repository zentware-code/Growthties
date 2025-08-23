var Id;
var M = "";

var formElem = document.getElementById("formAccountSettings");

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function retriveEnterprise(mode) {
    if (Id > 0) {

        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "ENR_Id",
                paramValue: Id,
                StoreProcedure: "EnterpriseRegistration_USP"
            }
        });
    }
    else {
        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "ENR_Id",
                StoreProcedure: "EnterpriseRegistration_USP"
            }
        });
    }
    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#enrFullpageloading");
        },
        complete: function () {
            LoaderEnd("#enrFullpageloading");
        },
        success: function (data) {
          //  //console.log(data)
            $('#hdnId').val(data["ENR_Id"]);
            if (mode == 'contact') {
                var primaryfullName = data["ENR_PrimaryContactName"];
                var nameParts = primaryfullName.split(' ');
                $('#txtContactFirstName').val(nameParts[0]);
                $('#txtContactLastName').val(nameParts[nameParts.length - 1]);
                var secondaryfullName = data["ENR_SecondaryContactName"];
                var nameParts = primaryfullName.split(' ');
                $('#SecondaryContactFirstName').val(nameParts[0]);
                $('#SecondaryContactLastName').val(nameParts[nameParts.length - 1]);
                $('#txtContactEmail').val(data["ENR_PrimaryContactEmail"]);
                $('#SecondaryContactEmail').val(data["ENR_SecondaryContactEmail"]);
                $('#PrimaryContactNumber').val(data["ENR_PrimaryContactNo"]);
                $('#SecondaryContactNumber').val(data["ENR_SecondaryContactNo"]);

                if (data["ENR_Logo"] == "NO") {
                    $('#dvImageWorkSpace').css('display', 'none');
                    var avatar = ' <div class="avatar avatar-xl"><span class="avatar-initial bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + data["ENR_PreFix"] + '</span></div>';
                    $('#dvAvatar').append(avatar);
                }
                else {
                    $('#dvAvatar').css('display', 'none');
                    $('#hdnWorkSpceUpload').val(data["ENR_Logo"]);
                    $('#prfpicIMGWorkSpace').attr('src', data["ENR_Logo"]);
                }
            }
            else if (mode == 'company') {
                $('#txtCompanyName').val(data["ENR_CompanyName"]);
                $('#txtRegNum').val(data["ENR_RegNumber"]);
                $('#ddlSector').val(data["ENR_SectorId"]).change();

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
                    PId: data["ENR_SectorId"],
                    ColumnName: 'ETM_IndustryId'
                };
                DropdownBinder.DDLElem = $("#ddlBusinessType");
                DropdownBinder.Execute();

                $('#ddlCountry').val(data["ENR_CountryId"]).change();
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
                    PId: data["ENR_CountryId"],
                    ColumnName: 'PM_CountryId'
                };
                DropdownBinder.DDLElem = $("#ddlProvince");
                DropdownBinder.Execute();

                $("#ddlBusinessType").val(data["ENR_EnterpriseTypeId"]).change();
                $('#ddlProvince').val(data["ENR_ProvinceId"]).change();      
                $('#txtBusinessAddress').val(data["ENR_BusinessAddress"]);
                $('#txtPostalCode').val(data["ENR_PostalCode"]);
                $('#txtAddress2').val(data["ENR_Address2"]);
                $('#txtCity').val(data["ENR_City"]);
                $('#txtSuburb').val(data["ENR_Subarb"]);
                $('#txtBusinessDesc').val(data["ENR_BussinessDescripton"]);
                if (data["ENR_CompanyLogo"] == "NO") {
                    $('#dvImageWorkSpaceComLogo').css('display', 'none');
                    var avatar = '<img alt="user-avatar" class="d-block w-px-150 h-px-50 rounded" id="prfpicIMGWorkSpaceComLogo" src="/Content/assets/img/avatars/default_companyphoto.png">';
                    $('#dvAvatarComLogo').append(avatar);
                }
                else {
                    $('#dvAvatarComLogo').css('display', 'none');
                    $('#hdnWorkSpceUploadComLogo').val(data["ENR_CompanyLogo"]);
                    $('#prfpicIMGWorkSpaceComLogo').attr('src', data["ENR_CompanyLogo"]);
                }
                
            }
            else if (mode == 'legal_entity') {
                $('#ddlLegalEntity').val(data["ENR_LegalEntityTypeId"]).change();
                $('#txtTaxNumber').val(data["ENR_TaxNumber"]);
                $('#txtVatNumber').val(data["ENR_VatNumber"]);
                $('#txtIncorporationDate').val(data["ENR_IncorporationDate"]);
                $('#txtRegNum2').val(data["ENR_RegNum2"]);
            }
            else if (mode == 'financial') {
               // //console.log('This is final data:', data);
                $('#txtBillingFirstName').val(data["ENR_BillingFirstName"]);
                $('#txtBillingLastName').val(data["ENR_BillingLastName"]);
                $('#txtBillingEmail').val(data["ENR_BillingEmail"]);
                $('#txtBillingSuburb').val(data["ENR_BillingSuburb"]);
                $('#txtBillingCity').val(data["ENR_BillingCity"]);
                $('#txtBillingPostalCode').val(data["ENR_BillingPostalCode"]);

                $('#ddlBookingCountry').val(data["ENR_BillingCountryId"]).change();
                $(".ddlBookingProvince").find("option").remove();
                var z = $(".ddlBookingProvince");

                z.length &&
                  z.each(function () {
                      var z = $(this);
                      z.wrap('<div class="position-relative"></div>'), z.select2({ placeholder: "Select Province", dropdownParent: z.parent() });
                  });
                DropdownBinder.DDLData = {
                    tableName: "ProvinceSetUp_PM",
                    Text: 'PM_Province',
                    Value: 'PM_Id',
                    PId: data["ENR_CountryId"],
                    ColumnName: 'PM_CountryId'
                };
                DropdownBinder.DDLElem = $("#ddlBookingProvince");
                DropdownBinder.Execute();

                $('#ddlBookingProvince').val(data["ENR_BillingProvinceId"]).change();

                $('#txtBillingContactNum').val(data["ENR_BillingContactNumber"]);
                $('#txtBillingAddress').val(data["ENR_BillingAddress"]);
            }

        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}

function SaveRecords(Type) {
    Id = getParameterByName('Id');
    if ($('#hdnId').val() == "") {
        var id = Id;
    } else {
        var id = $('#hdnId').val();
    }
    var _data = JSON.stringify({
        entity: {
            ENR_Id: id,
            Mode: $('#hdnModeForm').val(),
            ENR_PrimaryContactFirstName: $.trim($('#txtContactFirstName').val()),
            ENR_PrimaryContactLastName: $.trim($('#txtContactLastName').val()),

            ENR_PrimaryContactEmail: $.trim($('#txtContactEmail').val()),
            ENR_Password: $('#txtPassword').val(),
            ENR_SecondaryContactFirstName: $.trim($('#SecondaryContactFirstName').val()),
            ENR_SecondaryContactLastName: $.trim($('#SecondaryContactLastName').val()),

            ENR_SecondaryContactEmail: $.trim($('#SecondaryContactEmail').val()),
            ENR_PrimaryContactNo: $.trim($('#PrimaryContactNumber').val()),
            ENR_SecondaryContactNo: $.trim($('#SecondaryContactNumber').val()),
            ENR_PhNumber: $.trim($('#txtPhNo').val()),
            ENR_Logo: $('#hdnWorkSpceUpload').val(),

            ENR_CompanyName: $.trim($('#txtCompanyName').val()),
            ENR_RegNumber: $.trim($('#txtRegNum').val()),
            ENR_SectorId: $('#ddlSector').val(),
            ENR_EnterpriseTypeId: $('#ddlBusinessType').val(),
            ENR_CountryId: $('#ddlCountry').val(),
            ENR_ProvinceId: $('#ddlProvince').val(),

            ENR_BusinessAddress: $('#txtBusinessAddress').val(),
            ENR_City: $('#txtCity').val(),
            ENR_Address2: $('#txtAddress2').val(),
            ENR_Subarb: $('#txtSuburb').val(),
            ENR_PostalCode: $.trim($('#txtPostalCode').val()),
            ENR_BussinessDescripton: $.trim($('#txtBusinessDesc').val()),
            ENR_CompanyLogo:  $.trim($('#hdnWorkSpceUploadComLogo').val()),

            ENR_LegalEntityTypeId: $('#ddlLegalEntity').val(),
            ENR_TaxNumber: $.trim($('#txtTaxNumber').val()),
            ENR_VatNumber: $.trim($('#txtVatNumber').val()),
            ENR_IncorporationDate: $('#txtIncorporationDate').val(),
            ENR_RegNum2: $.trim($('#txtRegNum2').val()),

            ENR_BillingFirstName: $.trim($('#txtBillingFirstName').val()),
            ENR_BillingLastName: $.trim($('#txtBillingLastName').val()),
            ENR_BillingEmail: $.trim($('#txtBillingEmail').val()),
            ENR_BillingSuburb: $.trim($('#txtBillingSuburb').val()),
            ENR_BillingCity: $.trim($('#txtBillingCity').val()),
            ENR_BillingPostalCode: $.trim($('#txtBillingPostalCode').val()),

            ENR_BillingProvinceId: $('#ddlBookingProvince').val(),
            ENR_BillingCountryId: $('#ddlBookingCountry').val(),
            ENR_BillingContactNumber: $.trim($('#txtBillingContactNum').val()),
            ENR_BillingAddress: $('#txtBillingAddress').val(),

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateEnterpriseRegn',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //alert("Record saved successfully...");
                Id = data.Id;
                //Swal.fire({
                //    title: data.Message,
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});

                
                if (Type == 'N') {
                    fnNextRedirect();
                }

            }
            else {
                var Email = $('#txtContactEmail').val();
                var Phone = $('#PrimaryContactNumber').val();

                var titleText = '';
                if (data.Id == -1) {
                    titleText = '"'+Email+'"' + " this email already exists..!";
                } else if (data.Id == -2) {
                    titleText = '"'+Phone+'"' + " this phone number already exists..!";
                } else {
                    titleText = data.Message; 
                }
                Swal.fire({
                    title: "Oops...",
                    text: titleText,
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

function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 2050) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseInt(bytes / 1000);
        }
    }
    return bytes + ' P';
}

function ShowPreview(input) {

    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes

        var file = fileInput.get(0).files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/png"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            // invalid file type code goes here.
            Swal.fire({
                title: "Oops...",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops...",
                text: 'File size must be less than or equal to 1 MB.',  // 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMGWorkSpace').attr('src', e.target.result);
                }

                ImageDir.readAsDataURL(input.files[0]);

                UploadDoc('upload');
                pathFl = $('#upload').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnupload').val(hdnImagePath);
               
            }
        }
    } else {

        Swal.fire({
            title: "Oops...",
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}

function ShowPreviewWorkSpace(input) {

    var fileInput = $('#uploadWorkSpce');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes

        var file = fileInput.get(0).files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            // invalid file type code goes here.
            Swal.fire({
                title: "Oops...",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops...",
                text: 'File size must be less than or equal to 1 MB.',   //'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMGWorkSpace').attr('src', e.target.result);
                }

                ImageDir.readAsDataURL(input.files[0]);

                UploadDoc('uploadWorkSpce');
                pathFl = $('#uploadWorkSpce').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnWorkSpceUpload').val(hdnImagePath);
            }
        }
    } else {

        Swal.fire({
            title: "Oops...",
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}

//For upload file into folder
function UploadDoc(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            M = getParameterByName('M');
          
                $('#dvAvatar').css('display', 'none');
                $('#dvImageWorkSpace').css('display', 'block');
                  if (M != 'A') {
                UpdatePhoto();
            }

        }
    });
}

function UpdatePhoto() {
    Id = getParameterByName('Id');
    if ($('#hdnId').val() == "") {
        var id = Id;
    } else {
        var id = $('#hdnId').val();
    }
    var _data = JSON.stringify({
        entr: {
            ENR_Id: id,
           // ENR_CompanyLogo: $('#hdnupload').val(),
            ENR_Logo: $('#hdnWorkSpceUpload').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/EnterpriseProfPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#imgMainLayout').attr('src', $('#hdnupload').val());
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    //text: "Your changes were saved successfully!",
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location.reload();
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

///--------------------------------------     For CompanyLogo Update    ---------------------------------------
function ShowPreviewComLogo(input) {

    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes

        var file = fileInput.get(0).files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/png"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            // invalid file type code goes here.
            Swal.fire({
                title: "Oops...",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops...",
                text: 'File size must be less than or equal to 1 MB.', ///'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMGWorkSpaceComLogo').attr('src', e.target.result);
                }
                $('#prfpicIMGWorkSpaceComLogo').attr('src', e.target.result);

                ImageDir.readAsDataURL(input.files[0]);

                UploadDoc('upload');
                pathFl = $('#upload').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnupload').val(hdnImagePath);
               
            }
        }
    } else {

        Swal.fire({
            title: "Oops...",
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}

function ShowPreviewWorkSpaceComLogo(input) {

    var fileInput = $('#uploadWorkSpceComLogo'); 
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes

        var file = fileInput.get(0).files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            // invalid file type code goes here.
            Swal.fire({
                title: "Oops...",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops...",
                text: 'File size must be less than or equal to 1 MB.',  /// 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMGWorkSpaceComLogo').attr('src', e.target.result);
                    
                }

                ImageDir.readAsDataURL(input.files[0]);

                UploadDocComLogo('uploadWorkSpceComLogo');
                pathFl = $('#uploadWorkSpceComLogo').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnWorkSpceUploadComLogo').val(hdnImagePath);
            }
        }
    } else {

        Swal.fire({
            title: "Oops...",
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}

//For upload file into folder
function UploadDocComLogo(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            M = getParameterByName('M');
               $('#dvAvatarComLogo').css('display', 'none');
               $('#dvImageWorkSpaceComLogo').css('display', 'block');
            if (M != 'A') {
             
                UpdatePhotoComLogo();
            }

        }
    });
}

function UpdatePhotoComLogo() {
    Id = getParameterByName('Id');
    if ($('#hdnId').val() == "") {
        var id = Id;
    } else {
        var id = $('#hdnId').val();
    }
    var _data = JSON.stringify({
        entr: {
            ENR_Id: id,
            ENR_CompanyLogo: $('#hdnWorkSpceUploadComLogo').val(),
            // ENR_Logo: $('#hdnWorkSpceUploadComLogo').val(),
            Type: 'CompanyLogo',
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/EnterprisePhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#prfpicIMGWorkSpaceComLogo').attr('src', $('#hdnWorkSpceUploadComLogo').val());
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    //text: "Your changes were saved successfully!",
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location.reload();
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


function retriveEnterpriseSameAddress(Id) {
    if (Id > 0) {

        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "ENR_Id",
                paramValue: Id,
                StoreProcedure: "EnterpriseRegistration_USP"
            }
        });
    }
    else {
        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "ENR_Id",

                StoreProcedure: "EnterpriseRegistration_USP"
            }
        });
    }
    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {

            $('#hdnId').val(data["ENR_Id"]);

               // //console.log('data ghfhhfgf', data);

                var primaryfullName = data["ENR_PrimaryContactName"];
                var nameParts = primaryfullName.split(' ');
                $('#txtBillingFirstName').val(nameParts[0]);
                $('#txtBillingLastName').val(nameParts[nameParts.length - 1]);
                $('#txtBillingEmail').val(data["ENR_PrimaryContactEmail"]);
                $('#txtBillingContactNum').val(data["ENR_PrimaryContactNo"]);
                $('#txtBillingAddress').val(data["ENR_BusinessAddress"]);

                $('#txtBillingSuburb').val(data["ENR_Subarb"]); 
                $('#txtBillingCity').val(data["ENR_City"]);
                $('#txtBillingPostalCode').val(data["ENR_PostalCode"]);

                $('#ddlBookingCountry').val(data["ENR_CountryId"]).change();
                    $(".ddlBookingProvince").find("option").remove();
                    var z = $(".ddlBookingProvince");

                    z.length &&
                      z.each(function () {
                          var z = $(this);
                          z.wrap('<div class="position-relative"></div>'), z.select2({ placeholder: "Select A Province", dropdownParent: z.parent() });
                      });
                    DropdownBinder.DDLData = {
                        tableName: "ProvinceSetUp_PM",
                        Text: 'PM_Province',
                        Value: 'PM_Id',
                        PId: data["ENR_CountryId"],
                        ColumnName: 'PM_CountryId'
                    };
                    DropdownBinder.DDLElem = $("#ddlBookingProvince");
                    DropdownBinder.Execute();

            $('#ddlBookingProvince').val(data["ENR_ProvinceId"]).change();
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
    return false;

}

function handleCheckboxChange(checkbox, Id) {
    if (checkbox.checked) {
        retriveEnterpriseSameAddress(Id); 
    } else {
        clearFormFields(); 
    }
}

function clearFormFields() {
    $('#txtBillingFirstName').val('');
    $('#txtBillingLastName').val('');
    $('#txtBillingEmail').val('');
    $('#txtBillingContactNum').val('');
    $('#txtBillingAddress').val('');
    $('#txtBillingSuburb').val('');
    $('#txtBillingCity').val('');
    $('#txtBillingPostalCode').val('');
    $('#ddlBookingCountry').val(null).trigger('change'); 
    $('#ddlBookingProvince').val(null).trigger('change'); 
}

$("#ddlSector").change(function () {
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
        PId : $(this).val(),
        ColumnName : 'ETM_IndustryId'
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

$("#ddlBookingCountry").change(function () {
    $(".ddlBookingProvince").find("option").remove();
    var g = $(".ddlBookingProvince");

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
    DropdownBinder.DDLElem = $("#ddlBookingProvince");
    DropdownBinder.Execute();
});


$(document).ready(function () {

    localStorage.setItem('href', '/Account/EnterpriseSettings_company')
  

    $('.alphabets').on('input', function () {
       
        let inputValue = $(this).val();

        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

        $(this).val(alphabeticValue);
    });

    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlSector");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCountry");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBookingCountry");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "LegalEntitySetUp_LEM",
        Text: 'LEM_LegalEntity',
        Value: 'LEM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlLegalEntity");
    DropdownBinder.Execute();

    var mode = $('#hdnModeForm').val();
 
    Id = getParameterByName('Id');

    M = getParameterByName('M');
    if (M != 'A') {
        retriveEnterprise(mode);
    }
    else if (M == 'A' && Id > 0) {
        retriveEnterprise(mode);
    }
    else {
        $('#prfpicIMGWorkSpace').attr('src', '/Content/assets/img/avatars/default_photo.png');
        //   $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
        $('#prfpicIMGWorkSpaceComLogo').attr('src', '/Content/assets/img/avatars/default_companyphoto.png');
    }

});

$(function () {
    var e = $(".ddlSector");
    var f = $(".ddlBusinessType");
    var c = $(".ddlCountry");
    var g = $(".ddlProvince");
    var y = $(".ddlBookingCountry");
    var z = $(".ddlBookingProvince");
    var h = $(".ddlLegalEntity");
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select Sector", dropdownParent: e.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select Business Type", dropdownParent: f.parent() });
       });

    g.length &&
         g.each(function () {
             var g = $(this);
             g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select Province/State", dropdownParent: g.parent() });
         });

    c.length &&
         c.each(function () {
             var c = $(this);
             c.wrap('<div class="position-relative"></div>'), c.select2({ placeholder: "Select Country", dropdownParent: c.parent() });
         });
    y.length &&
       y.each(function () {
           var y = $(this);
           y.wrap('<div class="position-relative"></div>'), y.select2({ placeholder: "Select Country", dropdownParent: y.parent() });
       });
    z.length &&
         z.each(function () {
             var z = $(this);
             z.wrap('<div class="position-relative"></div>'), z.select2({ placeholder: "Select Province/State", dropdownParent: z.parent() });
         });

    h.length &&
        h.each(function () {
            var h = $(this);
            h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select Legal Entity Type", dropdownParent: h.parent() });
        });

    $('#txtIncorporationDate').on('change', function () {
        validateDate();
    });


    FormValidation.formValidation(formElem, {
        fields: {
            txtCompanyName: {
                validators: {
                    notEmpty: {
                        message: "Please enter enterprise name"
                    }
                }
            },
            txtRegNum: {
                validators: {
                    notEmpty: {
                        message: "Please enter registration number"
                    }
                }
            },
            ddlSector: {
                validators: {
                    notEmpty: {
                        message: "Please Select sector"
                    }
                }
            },
            ddlBusinessType: {
                validators: {
                    notEmpty: {
                        message: "Please Select business type"
                    }
                }
            },
            txtBusinessAddress: {
                validators: {
                    notEmpty: {
                        message: "Please enter address"
                    }
                }
            },
            txtCity: {
                validators: {
                    notEmpty: {
                        message: "Please enter city"
                    }
                }
            },
            txtSuburb: {
                validators: {
                    notEmpty: {
                        message: "Please enter suburb"
                    }
                }
            },
            txtPostalCode: {
                validators: {
                    notEmpty: {
                        message: "Please enter postal code"
                    }
                }
            },
            ddlCountry: {
                validators: {
                    notEmpty: {
                        message: "Please Select Country"
                    }
                }
            },
            ddlProvince: {
                validators: {
                    notEmpty: {
                        message: "Please Select Province"
                    }
                }
            },
            
            txtContactFirstName: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact firstname "
                    }
                }
            },
            txtContactLastName: {
                validators: {
                    notEmpty: {
                        message: "Please enter contact lastname"
                    }
                }
            },
            //SecondaryContactFirstName: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter secondary contact firstname"
            //        }
            //    }
            //},
            //SecondaryContactLastName: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter secondary contact lastname"
            //        }
            //    }
            //},


            txtContactEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter email address"
                    },
                    emailAddress: {
                        message: "The value is not a valid email address"
                    }
                }
            },
            PrimaryContactNumber: {
                validators: {
                    notEmpty: {
                        message: "Please enter primary contact number"
                    }
                }
            },
            //SecondaryContactEmail: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter email address"
            //        },
            //        emailAddress: {
            //            message: "The value is not a valid email address"
            //        }
            //    }
            //},
            //SecondaryContactNumber: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter secondary contact number"
            //        }
            //    }
            //},
             txtBillingFirstName: {
                validators: {
                        notEmpty: {
                            message: "Please enter billing firstname "
                        }
                }
            },
            txtBillingLastName: {
                validators: {
                        notEmpty: {
                            message: "Please enter billing lastname"
                        }
                }
            },
            txtBillingEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter billing email"
                    },
                    emailAddress: {
                        message: "The value is not a valid email address"
                    }
                }
            },
            txtBillingContactNum: {
                validators: {
                    notEmpty: {
                        message: "Please enter billing contact number"
                    }
                }
            },
            txtBillingAddress: {
                validators: {
                    notEmpty: {
                        message: "Please enter billing address"
                    }
                }
            },
            txtBillingCity: {
                validators: {
                    notEmpty: {
                        message: "Please enter billing city"
                    }
                }
            },
            txtBillingPostalCode: {
                validators: {
                    notEmpty: {
                        message: "Please enter billing postal code"
                    }
                }
            },
            
            ddlBookingCountry: {
                validators: {
                    notEmpty: {
                        message: "Please select country"
                    }
                }
            },
            ddlBookingProvince: {
                validators: {
                    notEmpty: {
                        message: "Please select province"
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

        SaveRecords('N');
    });

});

//Get Data From URL   
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
            //$('#formAccountSettings').trigger("reset");
            window.location.href = "/Enterprise/EnterpriseLists";
        });

    });
}

function fnNextRedirect() {
    Swal.fire({
        title: "Successful..!",
        text: "Your changes were saved successfully!",
        icon: "success",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //confirmButtonText:"Next",
        buttonsStyling: !1
    }).then(function () {
                    var mode = $('#hdnModeForm').val();
                    if (Id > 0 && M == "A") {
                        if (mode == 'contact') {
                            SendMail(Id)
                            window.location = "/Account/EnterpriseSettings_legalentity?Id=" + Id + '&M=A';
                        }
                        if (mode == 'company') {
                           
                            window.location = "/Account/EnterpriseSettings_contact?Id=" + Id + '&M=A';

                        }
                        if (mode == 'legal_entity') {
                        //    window.location = "/Account/EnterpriseSettings_financial?Id=" + Id + '&M=A';
                        //}
                        //if (mode == 'financial') {
                           
                            window.location = "/Enterprise/EnterpriseLists";
                        }
                    }
                    if (Id > 0 && M == "E") {
                        if (mode == 'contact') {
                            //SendMail(Id)
                            window.location = "/Account/EnterpriseSettings_legalentity?Id=" + Id + '&M=E';
                        }
                        if (mode == 'company') {
                            
                            window.location = "/Account/EnterpriseSettings_contact?Id=" + Id + '&M=E';

                        }
                        if (mode == 'legal_entity') {
                        //    window.location = "/Account/EnterpriseSettings_financial?Id=" + Id + '&M=E';
                        //}
                        //if (mode == 'financial') {
                           
                            window.location = "/Enterprise/EnterpriseLists";
                        }
                    }
                    else if (Id <= 0 && M == "A") {
                        if (mode == 'contact') {
                            window.location = "/Account/EnterpriseSettings_legalentity?Id=0&M=A";
                        }
                        if (mode == 'company') {
                            window.location = "/Account/EnterpriseSettings_contact?Id=0&M=A";
                        }
                        if (mode == 'legal_entity') {
                            window.location = "/Account/EnterpriseSettings_financial?Id=0&M=A";
                        }
                        if (mode == 'financial') {
                          //  SendMail(Id)
                            window.location = "/Enterprise/EnterpriseLists";
                        }

                    }
                    else if (Id <= 0 && M != "A" && M != 'E') {
                        if (mode == 'contact') {
                            window.location = "/Account/EnterpriseSettings_legalentity";
                        }
                        if (mode == 'company') {
                            window.location = "/Account/EnterpriseSettings_contact";
                        }
                        if (mode == 'legal_entity') {
                            window.location = "/Account/EnterpriseSettings_financial";
                        }
                        if (mode == 'financial') {
                          //  SendMail(Id)
                            window.location = "/Enterprise/EnterpriseLists";
                        }
                    }
    });
   
    
}

$("#btnCancel").on("click", function () {
    fnCancelConfirm();
});

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});

$("#btnResetWorkSpceUploadComLogo").on("click", function () {

    $('#prfpicIMGWorkSpaceComLogo').attr('src', '/Content/assets/img/avatars/default_companyphoto.png');
});

$("#btnResetWorkSpceUpload").on("click", function () {

    $('#prfpicIMGWorkSpace').attr('src', '/Content/assets/img/avatars/default_photo.png');
});



$(document).ready(function () {
    $('#txtRegNum').on('input', function () {
        let value = $(this).val().replace(/\D/g, ''); // Remove non-digit characters

        // Format the input as YYYY/NNNNNN/NN
        if (value.length > 4) {
            value = value.slice(0, 4) + '/' + value.slice(4);
        }
        if (value.length > 11) {
            value = value.slice(0, 11) + '/' + value.slice(11, 13);
        }

        // Update the input field
        $(this).val(value);
    });

    $('#form').on('submit', function () {
        const input = $('#txtRegNum').val().trim();
        const regex = /^\d{4}\/\d{6}\/\d{2}$/;

        if (!regex.test(input)) {
            $('#error').text('Invalid format. Use YYYY/NNNNNN/NN.').show();
            return false;
        }
        $('#error').hide();
        return true;
    });
});

//document.getElementById('txtRegNum').addEventListener('input', function () {
//    let value = this.value.replace(/\D/g, ''); // Remove non-digit characters
//    // Format the input as YYYY/NNNNNN/NN
//    if (value.length > 4) {
//        value = value.slice(0, 4) + '/' + value.slice(4);
//    }
//    if (value.length > 11) {
//        value = value.slice(0, 11) + '/' + value.slice(11, 13);
//    }
//    // Update the input field
//    this.value = value;
//});

//function validateForm() {
//    const input = document.getElementById('txtRegNum').value.trim();
//    const regex = /^\d{4}\/\d{6}\/\d{2}$/;

//    if (!regex.test(input)) {
//        document.getElementById('error').innerText = 'Invalid format. Use YYYY/NNNNNN/NN.';
//        document.getElementById('error').style.display = 'block';
//        return false;
//    }
//    document.getElementById('error').style.display = 'none';
//    return true;
//}


//****************Start Date < End Date Always*************
function validateDate() {
    var valueFrom = $('#txtIncorporationDate').val();
    var valueTo = new Date();
    valueTo.setHours(0, 0, 0, 0);

    $('#error-message').text('');
    $('.dtcls').css('border', '');

    // Check if valueFrom is not empty
    if (valueFrom) {
        // Assuming the date format is DD-MM-YYYY
        var dateFromParts = valueFrom.split('-');
        // Create a new date object
        var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        if (dateFrom >= valueTo) {
            $('#error-message').text("Incorporation Date must be earlier than the current date");
            $('.dtcls').css('border', '1px solid red');
            $('#txtIncorporationDate').val('');
        }
    } else {
        // Handle the case where the input is empty
        $('#error-message').text("Date of Birth is required");
        $('.dtcls').css('border', '1px solid red');
    }
}


function SendMail(Id) {
    
    LoaderStart("#enrFullpageloading");
    $('#btnUpdateNext').prop('disabled', true);
    $("#btnUpdateNext").html('Please Wait.....');

    var action = 'enterpriseregistration';

    var _data = JSON.stringify({
        emailcontent: {
            ENR_Id: Id,
            UserName: $('#txtContactFirstName').val(),
            EnrCompany: $('#txtCompanyName').val(),
            EnrEmail: $('#txtContactEmail').val(),
            UM_Login: $('#txtContactEmail').val(),
            Password: $('#PrimaryContactNumber').val().replace(/\s+/g, ''),
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.IsSuccess === true) {

                LoaderEnd("#enrFullpageloading");
               // GetUserLoginForInactiveWhitelisting(Id);

                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                            //window.location.href = "/Project/ProjectListForAdmin";
                        }
                    
                });

                if (Type == 'N') {
                        fnNextRedirect()
                }

                $(document).ajaxStop(function () {
                    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

                });
                $("#btnUpdateNext").html('Save');
                $('#btnUpdateNext').removeAttr('disabled');

                
            } else {
                Swal.fire({
                    title: "Oops...",
                    text: "Invalid email, try another email..!",
                    icon: "warning",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                $("#btnUpdateNext").html('Save');
                $('#btnUpdateNext').removeAttr('disabled');
                //setTimeout(function () {
                //    window.location.reload();  
                //}, 2000);
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

