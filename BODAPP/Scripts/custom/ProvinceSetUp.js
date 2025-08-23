var formElem = document.getElementById("setUPForm");
var form=$('#setUPForm');

$(document).ready(function () {

    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#CountryId");
    DropdownBinder.Execute();
});



(function () {
    var c = $("#CountryId");


    c.length &&
        c.each(function () {
            var c = $(this);
            c.wrap('<div class="position-relative"></div>'), c.select2({ placeholder: "Select A Country", dropdownParent: c.parent() });
        });
   // var e = document.getElementById("setUPForm");
    FormValidation.formValidation(formElem, {
        fields: {
            CountryName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Country"
                    }
                }
            },
            Province: {
                validators: {
                    notEmpty: {
                        message: "Please enter Province"
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
            $('#Id').val(data["PM_Id"]);
            $('#Province').val(data["PM_Province"]);
            $('#Description').val(data["PM_Description"]);  
            $('#CountryId').val(data["PM_CountryId"]).change();;
        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}



