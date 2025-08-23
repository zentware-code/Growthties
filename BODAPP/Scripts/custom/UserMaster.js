/// <reference path="financialyearmaster.js" />
var formElem = $("#frmUserMaster");

$(document).ready(function () {

    InitUI();
    InitValidationRules();
    AutoCompleteTextDrop('#txtDiagnostic', '#hdnDiagnosticId', 'DiagnosticMaster_DM', 'DM_Name', 'DM_Id', 'DM_Name');
    AutoCompleteTextDrop('#txtEmployee', '#hdnEmpId', 'EmployeeMaster_EM', 'EM_EmpName', 'EM_EmpId', 'EM_EmpName');
});
function AutoCompleteTextDrop(txtID, hdnID, tableName, Text, Value, ColumnName) {

    $(txtID).autocomplete({
        source: function (request, response) {
            var _data = JSON.stringify({
                data: {
                    tableName: tableName,
                    Text: Text,
                    Value: Value,
                    param: request["term"],
                    ColumnName: ColumnName
                }
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: URLList.AutoCompleteDropdown,
                data: _data,
                dataType: "json",
                success: function (data) {

                    if (data.length > 0) {
                        response($.map(data, function (item) {
                            return {
                                label: item.Text,
                                val: item.Value
                            }
                        }));

                    }
                    else {
                        response([{ label: 'No Records Found', val: -1 }]);
                    }
                },
                error: function (result) {
                    alert("Error");
                }
            });
        },
        select: function (event, ui) {
            if (ui.item.val == -1) {
                return false;
            }
            //alert(ui.item.val);
            $(hdnID).val(ui.item.val);

        }

    });
}


function InitValidationRules() {
    formElem.validate({
        rules: {
            Password: {
                required: true
            }
        }
    });
}

function InitUI() {

    DropdownBinder.DDLData = {
        tableName: "CompanyMaster_CM",
        Text: 'CM_Name',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCompanyName");
    DropdownBinder.Execute();

    $("#alrtmainDiv").hide();
    $("#lnkSaveUser").click(function () {
        SaveRecord();
    });
    $("#lnlcncl").click(function () {
        location.reload();
    });
    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#UserId').val(Id);
    }
}


function SaveRecord() {
    if (!formElem.valid()) {
        return false;
    }
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        User: {
            Password: $('#Password').val(),
            UM_ID: $('#UserId').val(),
            UserLoginID: $('#LoginId').val(),
            UserName: $('#UserName').val(),
            UserMainId: $('#hdnEmpId').val(),
            //UserMainId: 1,
            UM_Address: $('#txtAddress').val(),
            UM_ContactNo: $('#txtContactNo').val(),
            UM_EmailId: $('#txtEmailId').val(),
            UM_EM_Id: $('#hdnEmpId').val(),
            UM_DM_Id: $('#hdnDiagnosticId').val(),
            //UM_DM_Id: 1,
            CompanyNameList: $('#ddlCompanyName').val(),
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
                Swal.fire({
                    title: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                $('.form-control').val('');
               // $('#ddlCompanyName').val('').trigger('chosen:updated');

            }
            else {
                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
        },
        error: function (data) {
          

            Swal.fire({
                title:"Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function retrive(id) {
    var _data = JSON.stringify({
        user: {
            TransactionType: globalData.TransactionType,
            Param: globalData.Param,
            paramValue: parseInt(id),
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
            //data = JSON.parse(data);
            //console.log(data);
            $('#UserId').val(data["UM_Id"]);
            $('#UserName').val(data["UM_Name"]);
            $('#Password').val(data["UM_Password"]);
            $('#LoginId').val(data["UM_Login"]);
            //$('#hdnEmpId').val();
            //$('#txtEmployee').val();
            $('#txtAddress').val(data["UM_Address"]);
            $('#txtContactNo').val(data["UM_ContactNo"]);
            $('#txtEmailId').val(data["UM_EmailId"]);
            $('#hdnDiagnosticId').val(data["UM_DM_Id"]);
            $('#hdnEmpId').val(data["UM_EM_Id"]);
            $('#txtEmployee').val(data["Em_EmpName"]);
            $('#txtDiagnostic').val(data["DM_Name"]);

            $('#ddlCompanyName').val(data["CompanyNameList"]).trigger('chosen:updated');


        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}

