var formElem = document.getElementById("setUPForm");
var form=$('#setUPForm');
$(document).ready(function () {

    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#IndustryId");
    DropdownBinder.Execute();
});



(function () {

    var e = $("#IndustryId");


    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Industry Type", dropdownParent: e.parent() });
        });
   // var e = document.getElementById("setUPForm");
    FormValidation.formValidation(formElem, {
        fields: {
            EnterpriseType: {
                validators: {
                    notEmpty: {
                        message: "Please enter EnterpriseType"
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

        SaveRecord();
    });
})();


function SaveRecord() {

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
                });
                //location.reload();
                var oTable = $('#datatable-example').DataTable();
                oTable.destroy();
                //BindGrid();
                BindGridCustomize();

                if ($('#Id').val() == '') {
                    $("#setUPFormPopUp .close").click();
                } else {
                    $('#setUPFormPopUp').removeClass('show');
                }
                $('.form-control').val('');
                $('.select2').val('').change();
                
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


function retrive(id) {


    $('#setUPFormPopUp').addClass('show');
    $('.btn-close').click(function () {

        $('#setUPFormPopUp').removeClass('show');
        $('.form-control').val('');
    });

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
            //data = JSON.parse(data);
            $('#Id').val(data["ETM_Id"]);
            $('#EnterpriseType').val(data["ETM_EnterpriseType"]);
            $('#Description').val(data["ETM_Description"]);
            $('#IndustryId').val(data["ETM_IndustryId"]).change();;

        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}



