var formElem = document.getElementById("formEnterpriseUser");
var form=$('#setUPForm');
var Upload = 0;
$(function () {
    var e = $(".ddlQuestionType");

    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Option Type", dropdownParent: e.parent() });
        });

    FormValidation.formValidation(formElem, {
        fields: {
            txtQuestion: {
                validators: {
                    notEmpty: {
                        message: "Please enter Question"
                    }
                }
            },
            ddlQuestionType: {
                validators: {
                    notEmpty: {
                        message: "Please Select Option Type"
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
}),

$(document).ready(function () {

    $('#btnOptionlist').prop("disabled", true);
    var Id = getParameterByName('Id');

    if (Id != '') {
        retrive(Id);
    }

    $('#ddlQuestionType').change(function () {
        if ($('#ddlQuestionType').val() == 'TextBox' || $('#ddlQuestionType').val() == 'TextArea') {

            $('#btnOptionlist').prop("disabled", true);
        }
        else {
            $('#btnOptionlist').prop("disabled", false);
        }
    })

});
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//$("#btnSubmit").click(function () {
//    SaveRecord();

//});
function fnOptionListValid() {
    let valNum = 0;
    var QuesOpt = $('#ddlQuestionType option:selected').text();
   
    var quenArr = $('#QuestionList').val();
    if (quenArr != "") {
        valNum = JSON.parse(quenArr).length;
    }
    if (($('#btnOptionlist').prop('disabled') === false) && ($('#QuestionList').val() == "")) {
        Swal.fire({
            title: "Oops...",
            text: "Please enter atleast one Option",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    if (($('#btnOptionlist').prop('disabled') === false) && (($('#ddlQuestionType').val() == "SingleSelect") || ($('#ddlQuestionType').val() == "MultiSelect")) && valNum < 2) {
        Swal.fire({
            title: "Oops...",
            text: "Please enter atleast two Option for " + QuesOpt + "",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    return true;
}
function SaveRecord() {
    if (fnOptionListValid() == true) {

        if ($('#QuestionList').val() != "") {
            var jsonArray = JSON.parse($('#QuestionList').val());

            var normalArray = jsonArray.map(function (obj) {
                return obj.value;
            });
        }

        var _data = JSON.stringify({
            entity: {
                QN_Id: $('#Id').val(),
                QN_Question: $.trim($('#txtQuestion').val()),
                QN_QuestionType: $('#ddlQuestionType').val(),
                QN_IsUpload:Upload,
                QuestionDetailsList: normalArray,
            }
        });
        $.ajax({
            type: "POST",
            url: URLList.SaveRecord,
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null && data != undefined && data.IsSuccess == true && data.Id > 0) {
                    Swal.fire({
                        title: "Successful..!",
                        text: "Question Saved successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    }).then(function () {
                        //$('#formAccountSettings').trigger("reset");
                        window.location.href = '/Assessment/QuestionSetupList';
                    });
                    

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
    
}


function retrive(id) {

    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            Param1: globalData.Param,
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
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            //data = JSON.parse(data);

            $('#Id').val(data["QN_Id"]);
            $('#txtQuestion').val(data["QN_Question"]);
            $('#ddlQuestionType').val(data["QN_QuestionType"]).change();

            var quesDetai = data.QuestionDetailsList.join(",");
            $('#QuestionList').val(quesDetai).change();
          

            if (data["QN_IsUpload"] == 0) {
                $('#rdoIsUpload').val(0);
                Upload = 0;
                $("#rdoIsUpload").prop("checked", false);
            }
            else {
                $('#rdoIsUpload').val(1);
                Upload = 1;
                $("#rdoIsUpload").prop("checked", true);
            }
        },
        error: function (data) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops..',
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;

}



function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
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
            window.location.href = "/Assessment/QuestionSetupList";
        });

    });
}
function fnUpload(o)
{
    if ($(o).val() == 0) {
        $(o).val(1);
        Upload = 1;
    }
    else {
        $(o).val(0);
        Upload = 0;
    }
}

$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});