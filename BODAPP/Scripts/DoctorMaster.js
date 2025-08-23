$(document).ready(function () {
    var formElem = $("#frmmaster");
    $("#alrtmainDiv").hide();

    DropdownBinder.DDLData = {
        tableName: "HospitalDepartmentMaster_HD",
        Text: 'HD_Name',
        Value: 'HD_Id'
    };
    DropdownBinder.DDLElem = $("#HD_HospitalDeptMasterId");
    DropdownBinder.Execute();


    $('#lnkSave').click(Save);

    InitValidationRules();

    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
    }

    function InitValidationRules() {
        $('#frmmaster').validate({
            rules: {
                DoctorName: "required",
                Degree: "required",
                RegNo: "required",
                Speciality: "required",
                HD_HospitalDeptMasterId: "required",
                Gender: "required",
                PhNo: "required",
                MobNo: {
                    required: true,
                    minlength: 12,
                    maxlength: 15,
                    digits: true,
                    min: 999999999
                },
               
                IPDVisitFees: "required",
                OPDVisitFees: "required",
                OTFees: "required",
                DoctorType: "required",
                Address: "required",
                //UserName: "required",
                //Password: "required"

            },
            messages: {
                DoctorName: "Please fill Doctor Name",
                Degree: "Please fill Degree",
                RegNo: "Please fill Registration No",
                Speciality: "Please fill Speciality",
                HD_HospitalDeptMasterId: "Please select Investigation Dept.",
                Gender: "Please select Gender",
                PhNo: "Please fill Phone No",
                MobNo: {
                    required: "Please fill Mobile No",
                    digits: "Only digits allow",
                    minlength: "Minimum length should be 12",
                    maxlength: "Maximum length should be 15"
                    //min: 999999999
                },//"Please fill Mobile No",
               
                IPDVisitFees: "Please fill IPD fees",
                OPDVisitFees: "Please fill OPD fees",
                DoctorType: "Please fill Doctor Type",
                Address: "Please fill Address",
                //UserName: "Please enter UserName",
                //Password: "Please enter Password"
            }
        });
    }

    function Save() {
        if (!formElem.valid()) {
            return false;
        }
        var _data = formElem.serialize();
        $.ajax({
            type: "POST",
            url: URLList.SaveRecord,
            data: _data,
            async: false,
            success: function (data) {
                if (data != null && data != undefined && data.IsSuccess == true) {
                    $("#alrtmainDiv").addClass("alert alert-close alert-success");
                    $("#alrtSub").addClass("bg-green alert-icon");
                    $("#alrtI").addClass(" glyph-icon icon-check");
                    $("#alrtmainDiv").show();
                    $("#alrtP").html(data.Message);
                    $(".form-control").val('');

                }
                else {
                    $("#alrtmainDiv").addClass("alert alert-close alert-danger");
                    $("#alrtSub").addClass("bg-red alert-icon");
                    $("#alrtI").addClass(" glyph-icon icon-times");
                    $("#alrtmainDiv").show();

                    $("#alrtP").html(data.Message);

                }
            },
            error: function (data) {
                $("#alrtmainDiv").addClass("alert alert-close alert-danger");
                $("#alrtSub").addClass("bg-red alert-icon");
                $("#alrtI").addClass(" glyph-icon icon-times");
                $("#alrtmainDiv").show();
                $("#alrtP").html("Process Not Complete");

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
            global: {
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
                $('#Id').val(data["DM_Id"]);
                $('#DoctorName').val(data["DM_DoctorName"]);
                $('#RoomNo').val(data["DM_RoomNo"]);
                
                $('#Degree').val(data["DM_Degree"]);
                $('#RegNo').val(data["DM_RegNo"]);
                $('#Speciality').val(data["DM_Speciality"]);
                $('#HD_HospitalDeptMasterId').val(data["DM_HD_HospitalDeptMasterId"]);
                $('#Gender').val(data["DM_Gender"]);
                $('#PhNo').val(data["DM_PhNo"]);
                $('#MobNo').val(data["DM_MobNo"]);
                $('#Email').val(data["DM_Email"]);
                $('#IPDVisitFees').val(data["DM_IPDVisitFees"]);
                $('#OPDVisitFees').val(data["DM_OPDVisitFees"]);
                $('#OTFees').val(data["DM_OTFees"]);
                $('#DoctorType').val(data["DM_DoctorType"]);
                $('#Address').val(data["DM_Address"]);
                $('#Anaesthetist').val(data["DM_Anaesthetist"]);
                //$('#UserName').val(data["DM_UserName"]);
                //$('#Password').val(data["DM_Password"]);
            },
            error: function (data) {
                alert("Process Not Sucess");
            }
        });
        return false;

    }
});