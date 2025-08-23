
function Submit(o,smme_id) {


    if ($(o).val() == 0) {
        $(o).val(1);
        SaveRecords($('#hdnEnrId').val(),smme_id,'Insert')
    }
    else {
        SaveRecords($('#hdnEnrId').val(), smme_id, 'Delete')
    }


}




function SaveRecords(EnterpriseId, Smme_Id, Transactiontype) {

    var _data = JSON.stringify({
        entity: {
     
            Transactiontype: Transactiontype,

            EWS_EnterpriseId: parseInt(EnterpriseId),
            EWS_SMME_Id: parseInt(Smme_Id),

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertDeleteEnterpriseWiseSMME',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //alert("Record saved successfully...");
                //Id = data.Id;
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
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

