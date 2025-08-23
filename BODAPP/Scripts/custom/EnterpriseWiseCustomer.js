
function Submit(o,cd_id) {


    if ($(o).val() == 0) {
        $(o).val(1);
        SaveRecords($('#hdnEnrId').val(), cd_id, 'AssignCustToEnterprise')
    }
    else {
        SaveRecords($('#hdnEnrId').val(), cd_id, 'UnAssignCustToEnterprise')
    }


}




function SaveRecords(EnterpriseId, cd_id, Transactiontype) {

    var _data = JSON.stringify({
        entity: {
     
            Transactiontype: Transactiontype,

            CD_EnterpriseId: parseInt(EnterpriseId),
            CD_Id: parseInt(cd_id),

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertDeleteEnterpriseWiseCust',
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

