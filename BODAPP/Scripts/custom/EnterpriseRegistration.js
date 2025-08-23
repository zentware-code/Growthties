function SaveRecords() {
    LoaderStart("#enrRegPageLoader");
    var _data = JSON.stringify({
        entity: {
            ENR_Id: $('#hdnId').val(),
            //ENR_PrimaryContactName: $.trim($('#txtContactName').val()),
            ENR_PrimaryContactFirstName: $.trim($('#txtContactFirstName').val()),
            ENR_PrimaryContactLastName: $.trim($('#txtContactLastName').val()),
            ENR_PrimaryContactEmail: $('#txtContactEmail').val(),
            ENR_Password: $('#txtPassword').val(),
            ENR_SecondaryContactName: $('#SecondaryContactName').val(),
            ENR_SecondaryContactEmail: $('#SecondaryContactEmail').val(),
            ENR_PrimaryContactNo: $('#PrimaryContactNumber').val(),
            ENR_SecondaryContactNo: $('#SecondaryContactNumber').val(),
            ENR_CompanyName: $.trim($('#txtCompanyName').val()),
            ENR_RegNumber: $('#txtRegNum').val(),
            ENR_SectorId: $('#ddlSector').val(),
            ENR_EnterpriseTypeId: $('#ddlBusinessType').val(),
            ENR_CountryId: $('#ddlCountry').val(),
            ENR_ProvinceId: $('#ddlProvince').val(),
            ENR_BusinessAddress: $('#txtBusinessAddress').val(),
            ENR_LegalEntityTypeId: $('#ddlLegalEntity').val(),
            ENR_TaxNumber: $('#txtTaxNumber').val(),
            ENR_VatNumber: $('#txtVatNumber').val(),
            ENR_IncorporationDate: $('#txtIncorporationDate').val(),
            ENR_RegNum2: $('#txtRegNum2').val(),
            ENR_BillingContactNumber: $('#txtBillingContactNum').val(),
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

                SendMail(data.Id)

                //Swal.fire({
                //    title:  data.Message,
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});
                $(".form-control").val('')
               
                //window.location = "/Enterprise/EnterpriseProfileComplete";

            }
            else {
               
                Swal.fire({
                    title: "Oops..",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            
            Swal.fire({
                title: "Oops..",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

function GetUserLoginForInactiveWhitelisting(Id) {

    var _data = JSON.stringify({
        global: {
            param1Value: Id,
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetUserLoginForInactiveWhitelisting",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            //$('#spnHeadName').text(data[0].ENR_CompanyName);
            //$('#spnHeadRole').text(data[0].UM_SubRole);
            //$('#spnCity').text(data[0].PM_Province);
            //$('#spnDate').text(data[0].ENR_CreatedDate);

            //if (data["ENR_Logo"] == "NO") {
            //    //$('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');

            //    $('#dvPic').html('<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"> <span class="avatar-initial  bg-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '>' + data["ENR_PreFix"] + '</span></div>');
            //    //<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img">
            //    //         <span class="avatar-initial  bg-@list[index]">@Model.ENR_Prefix</span>
            //    //     </div>
            //}
            //else {
            //    $('#prfpicIMG').attr('src', data["ENR_Logo"]);
            //}
            window.location.href = '/Enterprise/EnterpriseProfileComplete?Id=' + Id;
        },
        error: function (data) {
            window.location.href = '/Enterprise/EnterpriseProfileComplete?Id=' + Id;
        }
    });
    return false;

}


$(document).ready(function () {

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

});



function SendMail(Id) {
    $('#btnSave').prop('disabled', true);
    $("#btnSave").html('Please Wait.....');

    var action = 'enterpriseregistration';

    var _data = JSON.stringify({
        emailcontent: {
            ENR_Id: Id,
            UserName: $('#txtContactFirstName').val(),   
            EnrCompany: $('#txtCompanyName').val(),
            EnrEmail: $('#txtContactEmail').val(),
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
        complete: function () {
            LoaderEnd("#enrRegPageLoader");
        },
        success: function (data) {
            if (data != null && data.IsSuccess === true) {

                GetUserLoginForInactiveWhitelisting(Id);

                Swal.fire({
                    title: "Good Job..",
                    text: "Your registration submited successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/Enterprise/EnterpriseProfileComplete?Id=' + Id;
                    }
                });
               
                $(document).ajaxStop(function () {
                    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
                });
                //$("#btnSave").html('Save');
                //$('#btnSave').removeAttr('disabled');
            } else {
                //Swal.fire({
                //    title: "Oops..",
                //    text: "Invalid email, try another email..!",
                //    icon: "warning",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: false
                //});
                $("#btnSave").html('Save');
                $('#btnSave').removeAttr('disabled');
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops..",
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}


$('#btnContactSubmit').on('click', function () {
    var email = $('#txtContactEmail').val();
    retriveActivityBudgetDetails(email)
});

    function retriveActivityBudgetDetails(email) {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectEmailFromUserMaster',
                Param: 'UM_Login',
                param1Value: email,
                StoreProcedure: 'UserMaster_USP'
            }
        });

        $.ajax({
            type: "POST",
            url: "/ScriptJson/GetGlobalMasterTransaction",
            contentType: "application/json; charset=utf-8",
            data: _data,
            dataType: "json",
            success: function (data) {
                data = JSON.parse(data);
                //console.log('Console Data',data);
                
            },
            error: function (data) {
                Swal.fire({
                    title: "Oops..",
                    text: "Process Not Complete",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        });
        return false;
    }

