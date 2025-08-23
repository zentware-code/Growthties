var Id;
var M = "";
var formElem = document.getElementById("formAccountSettings");
$(function () {
    var e = $(".ddlSector");
    var f = $(".ddlBusinessType");
    var c = $(".ddlCountry");
    var g = $(".ddlProvince");

    var y = $(".ddlBookingCountry");
    var z = $(".ddlBookingProvince");

    var h = $(".ddlLegalEntity");
    var k = $(".ddlBEELevel");
    var j = $(".ddlProtfolioGrowth");

    k.length &&
       k.each(function () {
           var k = $(this);
           k.wrap('<div class="position-relative"></div>'), k.select2({ placeholder: "Select BEE Level", dropdownParent: k.parent() });
       });

    f.length &&
      f.each(function () {
          var f = $(this);
          f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select Business Type", dropdownParent: f.parent() });
      });

    j.length &&
      j.each(function () {
          var j = $(this);
          j.wrap('<div class="position-relative"></div>'), j.select2({ placeholder: "Select Protfolio Growth", dropdownParent: j.parent() });
      });

    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select Sector", dropdownParent: e.parent() });
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
    g.length &&
         g.each(function () {
             var g = $(this);
             g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select Province/State", dropdownParent: g.parent() });
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
                        message: "Please Enter SMME Name"
                    }
                }
            },
            txtRegNum: {
                validators: {
                    notEmpty: {
                        message: "Please Enter Registration Number"
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
                        message: "Please Enter Business Address"
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
                        message: "Please select province"
                    }
                }
            },
            txtSuburb: {
                validators: {
                    notEmpty: {
                        message: "Please Enter Suburb"
                    }
                }
            },
            txtCity: {
                validators: {
                    notEmpty: {
                        message: "Please Enter City"
                    }
                }
            },
            //ddlProvince: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please Select Province"
            //        }
            //    }
            //},
            txtPostalCode: {
                validators: {
                    notEmpty: {
                        message: "Please Enter Postal Code"
                    }
                }
            },
            ddlBEELevel: {
                validators: {
                    notEmpty: {
                        message: "Please Select BEELevel"
                    }
                }
            },
            ddlProtfolioGrowth: {
                validators: {
                    notEmpty: {
                        message: "Please Select Protfolio Growth"
                    }
                }
            },
            txtBlckWomen: {
                validators: {
                    notEmpty: {
                        message: "Please Enter Blck Women(%)"
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
                        message: "Please enter primary contact name"
                    }
                }
            },
            //SecondaryContactNumber: {
            //    validators: {
            //        notEmpty: {
            //            message: "Please enter secondary contact name"
            //        }
            //    }
            //},
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
            ddlBookingCountry: {
                validators: {
                    notEmpty: {
                        message: "Please enter billing country"
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
            ddlBookinfCountry: {
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
}),

$("#ddlSector").change(function () {
    $(".ddlBusinessType").find("option").remove();
    var f = $(".ddlBusinessType");
    f.length &&
      f.each(function () {
          var f = $(this);
          f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Business Type", dropdownParent: f.parent() });
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

     localStorage.setItem('href', '/Stakeholder/SMMESettings_company');


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

    DropdownBinder.DDLData = {
        tableName: "BEELevel_BL",
        Text: 'BL_Level',
        Value: 'BL_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBEELevel");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "PortfolioGrowth_PG",
        Text: 'PG_Name',
        Value: 'PG_Id'
    };
    DropdownBinder.DDLElem = $("#ddlProtfolioGrowth");
    DropdownBinder.Execute();



    var mode = $('#hdnMode').val();

    Id = getParameterByName('Id');

    M = getParameterByName('M');
    if (M != 'A') {
        retrive(mode);
    } else if (M == 'A' && Id > 0) {
        retrive(mode);
    } else {
        $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');

       // $('#prfpicIMGWorkSpace').attr('src', '/Content/assets/img/avatars/default_photo.png');
        $('#prfpicIMGWorkSpaceComLogo').attr('src', '/Content/assets/img/avatars/default_companyphoto.png');
    }

});
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function retrive(mode) {
    if (Id > 0) {

        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "SMME_Id",
                paramValue: Id,
                StoreProcedure: "SMMERegistration_USP"
            }
        });
    }
    else {
        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "SMME_Id",
                StoreProcedure: "SMMERegistration_USP"
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
            $('#hdnId').val(data["SMME_Id"]);
            if (mode == 'contact') {

                var primaryfullName = data["SMME_PrimaryContactName"];
                var nameParts = primaryfullName.split(' ');
                $('#txtContactFirstName').val(nameParts[0]);
                $('#txtContactLastName').val(nameParts[nameParts.length - 1]);

                var secondaryfullName = data["SMME_SecondaryContactName"];
                var nameParts = primaryfullName.split(' ');
                $('#SecondaryContactFirstName').val(nameParts[0]);
                $('#SecondaryContactLastName').val(nameParts[nameParts.length - 1]);

               // $('#txtContactName').val(data["SMME_PrimaryContactName"]);

                $('#txtContactEmail').val(data["SMME_PrimaryContactEmail"]);
                //$('#SecondaryContactName').val(data["SMME_SecondaryContactName"]);
                $('#SecondaryContactEmail').val(data["SMME_SecondaryContactEmail"]);
                $('#PrimaryContactNumber').val(data["SMME_PrimaryContactNo"]);
                $('#SecondaryContactNumber').val(data["SMME_SecondaryContactNo"]);

                if (data["SMME_Logo"] == "NO" || data["SMME_Logo"] == " ") {
                    $('#dvImage').css('display', 'none');
                    var avatar = ' <div class="avatar avatar-xl"><span class="avatar-initial bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + data["SMME_PreFix"] + '</span></div>';
                    $('#dvAvatar').append(avatar);
                }
                else {
                    $('#dvAvatar').css('display', 'none');
                    $('#hdnupload').val(data["SMME_Logo"]);
                    $('#prfpicIMG').attr('src', data["SMME_Logo"]);
                }
            }
            else if (mode == 'company') {

              //  //console.log('This is final data:', data);

                $('#txtCompanyName').val(data["SMME_CompanyName"]);
                $('#txtRegNum').val(data["SMME_RegNumber"]);
                $('#ddlSector').val(data["SMME_SectorId"]).change();

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

                $('#ddlCountry').val(data["SMME_CountryId"]).change();
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
                    PId: data["SMME_CountryId"],
                    ColumnName: 'PM_CountryId'
                };
                DropdownBinder.DDLElem = $("#ddlProvince");
                DropdownBinder.Execute();

                $("#ddlBusinessType").val(data["SMME_SMMETypeId"]).change();
                $('#ddlProvince').val(data["SMME_ProvinceId"]).change();
                $('#txtBusinessAddress').val(data["SMME_BusinessAddress"]);
                $('#txtPostalCode').val(data["SMME_PostalCode"]);
                $('#txtAddress2').val(data["SMME_Address2"]);
                $('#txtCity').val(data["SMME_City"]);
                $('#txtSuburb').val(data["SMME_Subarb"]);
                $('#ddlProtfolioGrowth').val(data["SMME_ProtfolioGrowth"]).change();
                $('#txtBlckWomen').val(data["SMME_BlckWomen"]);


                $("#ddlBEELevel").val(data["SMME_BEElevel"]).change();

                if (data["SMME_CompanyLogo"] == "NO") {
                    $('#dvImageWorkSpaceComLogo').css('display', 'none');
                    var avatar = '<img alt="user-avatar" class="d-block w-px-150 h-px-50 rounded" id="prfpicIMGWorkSpaceComLogo" src="/Content/assets/img/avatars/default_companyphoto.png">';
                    $('#dvAvatarComLogo').append(avatar);
                }
                else {
                    $('#dvAvatarComLogo').css('display', 'none');
                    $('#hdnWorkSpceUploadComLogo').val(data["SMME_CompanyLogo"]);
                    $('#prfpicIMGWorkSpaceComLogo').attr('src', data["SMME_CompanyLogo"]);
                }
                
            }
            else if (mode == 'legal_entity') {
                $('#ddlLegalEntity').val(data["SMME_LegalEntityTypeId"]).change();
                $('#txtTaxNumber').val(data["SMME_TaxNumber"]);
                $('#txtVatNumber').val(data["SMME_VatNumber"]);
                $('#txtIncorporationDate').val(data["SMME_IncorporationDate"]);
                $('#txtRegNum2').val(data["SMME_RegNum2"]);
            }
            else if (mode == 'financial') {
               // //console.log('This is final data:', data);

                $('#txtBillingFirstName').val(data["SMME_BillingFirstName"]);
                $('#txtBillingLastName').val(data["SMME_BillingLastName"]);
                $('#txtBillingEmail').val(data["SMME_BillingEmail"]);
                $('#txtBillingSuburb').val(data["SMME_BillingSuburb"]);
                $('#txtBillingCity').val(data["SMME_BillingCity"]);
                $('#txtBillingPostalCode').val(data["SMME_BillingPostalCode"]);
                $('#ddlBookingCountry').val(data["SMME_BillingCountryId"]).change();
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
                    PId: data["SMME_CountryId"],
                    ColumnName: 'PM_CountryId'
                };
                DropdownBinder.DDLElem = $("#ddlBookingProvince");
                DropdownBinder.Execute();

                $('#ddlBookingProvince').val(data["SMME_BillingProvinceId"]).change();
                $('#txtBillingContactNum').val(data["SMME_BillingContactNumber"]);
                $('#txtBillingAddress').val(data["SMME_BillingAddress"]);

            }

        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
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
            SMME_Id: id,
            Mode: $('#hdnMode').val(),
            //SMME_PrimaryContactName: $.trim($('#txtContactName').val()),
            SMME_PrimaryContactFirstName: $.trim($('#txtContactFirstName').val()),
            SMME_PrimaryContactLastName: $.trim($('#txtContactLastName').val()),

            SMME_PrimaryContactEmail: $.trim($('#txtContactEmail').val()),
            SMME_Password: $('#txtPassword').val(),
            //  SMME_SecondaryContactName: $('#SecondaryContactName').val(),
            SMME_SecondaryContactFirstName: $('#SecondaryContactFirstName').val(),
            SMME_SecondaryContactLastName: $('#SecondaryContactLastName').val(),
            
            SMME_SecondaryContactEmail: $.trim($('#SecondaryContactEmail').val()),
            SMME_PrimaryContactNo: $.trim($('#PrimaryContactNumber').val()),
            SMME_SecondaryContactNo: $.trim($('#SecondaryContactNumber').val()),

            SMME_CompanyName: $.trim($('#txtCompanyName').val()),
            SMME_RegNumber: $.trim($('#txtRegNum').val()),
            SMME_SectorId: $('#ddlSector').val(),
            SMME_SMMETypeId: $('#ddlBusinessType').val(),
            SMME_ProvinceId: $('#ddlProvince').val(),
            SMME_CountryId: $('#ddlCountry').val(),

            SMME_BusinessAddress: $('#txtBusinessAddress').val(),
            SMME_City: $('#txtCity').val(),
            SMME_Address2: $('#txtAddress2').val(),
            SMME_Subarb: $('#txtSuburb').val(),
            SMME_PostalCode: $.trim($('#txtPostalCode').val()),
            SMME_PhNumber: $.trim($('#txtPhNo').val()),
            SMME_Logo: $('#hdnupload').val(),
            SMME_ProtfolioGrowth: $('#ddlProtfolioGrowth').val(),
            SMME_BlckWomen: $('#txtBlckWomen').val(),

            SMME_LegalEntityTypeId: $('#ddlLegalEntity').val(),
            SMME_TaxNumber: $.trim($('#txtTaxNumber').val()),
            SMME_VatNumber: $.trim($('#txtVatNumber').val()),
            SMME_IncorporationDate: $('#txtIncorporationDate').val(),
            SMME_RegNum2: $.trim($('#txtRegNum2').val()),

            SMME_BillingFirstName: $.trim($('#txtBillingFirstName').val()),
            SMME_BillingLastName: $.trim($('#txtBillingLastName').val()),
            SMME_BillingEmail: $.trim($('#txtBillingEmail').val()),
            SMME_BillingSuburb: $.trim($('#txtBillingSuburb').val()),
            SMME_BillingCity: $.trim($('#txtBillingCity').val()),
            SMME_BillingPostalCode: $.trim($('#txtBillingPostalCode').val()),

            SMME_BillingProvinceId: $('#ddlBookingProvince').val(),
            SMME_BillingCountryId: $('#ddlBookingCountry').val(),

            SMME_BillingContactNumber: $.trim($('#txtBillingContactNum').val()),
            SMME_BillingAddress: $('#txtBillingAddress').val(),
            SMME_BEElevel: $('#ddlBEELevel').val(),
            SMME_EnterpriseId: parseInt($('#hdnEnterId').val()),
            IsStakeHolderEntry:'Y'
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateSMMERegistrationStakeHolder',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {

                Id = data.Id;
                if (data.Id > 0) {
                    Swal.fire({
                        title: "Successful..!",
                        text: data.Message,
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    });
                    if (Type == 'N') {
                        fnNextRedirect()
                    }
                }
            }
            else {
                var Email = $('#txtContactEmail').val();
                var Phone = $('#PrimaryContactNumber').val();
                var RegNo = $('#txtRegNum').val();

                var titleText = '';
                if (data.Id == -1) {
                    titleText = '"' + Email + '"' + " this email already exists..!";
                } else if (data.Id == -2) {
                    titleText = '"' + Phone + '"' + " this phone number already exists..!";
                } else if (data.Id == -3) {
                    titleText = '"' + RegNo + '"' + " this registration number already exists..!";
                } else {
                    titleText = data.Message;
                }
                Swal.fire({
                    title: "Oops..!",
                    text: titleText,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
        }
        },
        error: function (data) {
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
function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
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


        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops..!",
                text: 'File size is more then ' + size + 'b',
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
                    $('#prfpicIMG').attr('src', e.target.result);
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
            title: "Oops..!",
            text: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}  //Create Clone with ShowPreviewCompanyLogo

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
            if (M != 'A') {
                $('#dvAvatar').css('display', 'none');
                $('#dvImage').css('display', 'block');
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
            SMME_Id: id,
            SMME_Logo: $('#hdnupload').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/SMMEPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }

        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

} //Create Clone with UpdateCompanyLogo


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
            if (parseInt($('#hdnEnterId').val()) > 0) {
                window.location.href = "/Stakeholder/ViewAllSMMEForStakeholder";
            }
            else {
                window.location.href = "/SMME/SMMELists";
            }


        });

    });
}

function fnNextRedirect() {

    Swal.fire({
        title: "Successful..!",
        text: "Your changes were saved successfully!",
        icon: "success",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //confirmButtonText: "Next",

        buttonsStyling: !1
    }).then(function () {
        var mode = $('#hdnMode').val();
        if (Id > 0 && M == "A") {
            if (mode == 'contact') {
                SendMail(Id);
                window.location = "/Stakeholder/SMMESettings_legalentity?Id=" + Id + '&M=A';
            }
            if (mode == 'company') {
                window.location = "/Stakeholder/SMMESettings_contact?Id=" + Id + '&M=A';

            }
            if (mode == 'legal_entity') {
            //    window.location = "/Stakeholder/SMMESettings_financial?Id=" + Id + '&M=A';
            //}
            //if (mode == 'financial') {
                if (parseInt($('#hdnEnterId').val()) > 0) {
                    window.location.href = "/Stakeholder/ViewAllSMMEForStakeholder";
                }
                else {
                    window.location.href = "/SMME/SMMELists";
                }

            }
        }
        if (Id > 0 && M == "E") {
            if (mode == 'contact') {
               // SendMail(Id);
                window.location = "/Stakeholder/SMMESettings_legalentity?Id=" + Id + '&M=E';
            }
            if (mode == 'company') {
                window.location = "/Stakeholder/SMMESettings_contact?Id=" + Id + '&M=E';

            }
            if (mode == 'legal_entity') {
            //    window.location = "/Stakeholder/SMMESettings_financial?Id=" + Id + '&M=E';
            //}
            //if (mode == 'financial') {
                if (parseInt($('#hdnEnterId').val()) > 0) {
                    window.location.href = "/Stakeholder/ViewAllSMMEForStakeholder";
                }
                else {
                    window.location.href = "/SMME/SMMELists";
                }

            }
        }
        else if (Id <= 0 && M == "A") {
            if (mode == 'contact') {
                window.location = "/Stakeholder/SMMESettings_legalentity?Id=0&M=A";
            }
            if (mode == 'company') {
                window.location = "/Stakeholder/SMMESettings_contact?Id=0&M=A";
            }
            if (mode == 'legal_entity') {
            //    window.location = "/Stakeholder/SMMESettings_financial?Id=0&M=A";
            //}
            //if (mode == 'financial') {
                if (parseInt($('#hdnEnterId').val()) > 0) {
                    window.location.href = "/Stakeholder/ViewAllSMMEForStakeholder";
                }
                else {
                    window.location.href = "/SMME/SMMELists";
                }

            }

        }
        else if (Id <= 0 && M != "A" && M != 'E') {
            if (mode == 'contact') {
                window.location = "/Stakeholder/SMMESettings_legalentity";
            }
            if (mode == 'company') {
                window.location = "/Stakeholder/SMMESettings_contact";
            }
            if (mode == 'legal_entity') {
            //    window.location = "/Stakeholder/SMMESettings_financial";
            //}
            //if (mode == 'financial') {
                if (parseInt($('#hdnEnterId').val()) > 0) {
                    window.location.href = "/Stakeholder/ViewAllSMMEForStakeholder";
                }
                else {
                    window.location.href = "/SMME/SMMELists";
                }

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

$("#btnResetUpload").on("click", function () {

    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
});


//Formet Registration Number
document.getElementById('txtRegNum').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    // Format the input as YYYY/NNNNNN/NN
    if (value.length > 4) {
        value = value.slice(0, 4) + '/' + value.slice(4);
    }
    if (value.length > 11) {
        value = value.slice(0, 11) + '/' + value.slice(11, 13);
    }
    // Update the input field
    this.value = value;
});
function validateForm() {
    const input = document.getElementById('txtRegNum').value.trim();
    const regex = /^\d{4}\/\d{6}\/\d{2}$/;

    if (!regex.test(input)) {
        document.getElementById('error').innerText = 'Invalid format. Use YYYY/NNNNNN/NN.';
        document.getElementById('error').style.display = 'block';
        return false;
    }
    document.getElementById('error').style.display = 'none';
    return true;
}


//****************Start Date < End Date Always*************
function validateDate() {
    var valueFrom = $('#txtIncorporationDate').val();
    var valueTo = new Date();
    valueTo.setHours(0, 0, 0, 0);

    $('#error-message').text('').removeClass('error'); 
    $('.dtcls').css('border', ''); 

    // Check if valueFrom is not empty
    if (valueFrom) {
        // Assuming the date format is DD-MM-YYYY
        var dateFromParts = valueFrom.split('-');

        var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        if (dateFrom >= valueTo) {
            $('#error-message').text("Incorporation Date must be earlier than the current date")
                .addClass('error'); 
            $('.dtcls').css('border', '1px solid red');
            $('#txtIncorporationDate').val('');
        }
    } else {
        
        $('#error-message').text("Incorporation Date is required")
            .addClass('error');
        $('.dtcls').css('border', '1px solid red');
    }
}



function retriveSameAddress(Id) {
    if (Id > 0) {

        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "SMME_Id",
                paramValue: Id,
                StoreProcedure: "SMMERegistration_USP"
            }
        });
    }
    else {
        var _data = JSON.stringify({
            global: {
                TransactionType: "Select",
                Param: "SMME_Id",
                StoreProcedure: "SMMERegistration_USP"
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
            $('#hdnId').val(data["SMME_Id"]);
         
                var primaryfullName = data["SMME_PrimaryContactName"];
                var nameParts = primaryfullName.split(' ');
                $('#txtBillingFirstName').val(nameParts[0]);
                $('#txtBillingLastName').val(nameParts[nameParts.length - 1]);
                $('#txtBillingEmail').val(data["SMME_PrimaryContactEmail"]);
                $('#txtBillingContactNum').val(data["SMME_PrimaryContactNo"]);
                $('#txtBillingAddress').val(data["SMME_BusinessAddress"]);

                $('#txtBillingSuburb').val(data["SMME_Subarb"]);
                $('#txtBillingCity').val(data["SMME_City"]);  
                $('#txtBillingPostalCode').val(data["SMME_PostalCode"]);
                $('#txtBillingCity').val(data["SMME_City"]);
                $('#ddlBookingCountry').val(data["SMME_CountryId"]).change();
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
                    PId: data["SMME_CountryId"],
                    ColumnName: 'PM_CountryId'
                };
                DropdownBinder.DDLElem = $("#ddlBookingProvince");
                DropdownBinder.Execute();

                $('#ddlBookingProvince').val(data["SMME_ProvinceId"]).change();



                //$('#ddlBookingCountry').val(data["SMME_CountryId"]);
                //$('#ddlBookingProvince').val(data["SMME_ProvinceId"]);
       
        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}


function handleCheckboxChange(checkbox, Id) {
    if (checkbox.checked) {
        retriveSameAddress(Id);
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
                title: "Oops..!",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops..!",
                text: 'File size is more then ' + size + 'b',
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
                    $('#prfpicIMG').attr('src', e.target.result);
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
            title: "Oops..!",
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
                title: "Oops..!",
                text: ' invalid file type',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        if (fileSize > maxSize) {

            Swal.fire({
                title: "Oops..!",
                text: 'File size is more then ' + size + 'b',
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
            title: "Oops..!",
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
            if (M != 'A') {
                $('#dvAvatarComLogo').css('display', 'none');
                $('#dvImageComLogo').css('display', 'block');
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
            SMME_Id: id,
            SMME_CompanyLogo: $('#hdnWorkSpceUploadComLogo').val(),
            Type: 'CompanyLogo',
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/SMMEPhotoUpdateCompany",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#prfpicIMGWorkSpaceComLogo').attr('src', $('#hdnWorkSpceUploadComLogo').val());
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
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
                title: "Oops..!",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

}


function SendMail(Link) {
    LoaderStart("#section-block");
    $('#btnUpdateNext').prop('disabled', true);
    $("#btnUpdateNext").html('Please Wait.....');

    var action = 'smmeregistration';

    var _data = JSON.stringify({
        emailcontent: {
            UserName: $('#txtContactFirstName').val(),
            SMMEName: $('#txtCompanyName').val(),
            Email: $('#txtContactEmail').val(),
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
                LoaderEnd("#section-block");
                Swal.fire({
                    title: "Successful..!",
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });


                $(".form-control").val('')
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


