function SendSMS() {
  
    var _data = JSON.stringify({
        data: {

            TransactionType: 'SelectForSMS',
            param1: 'ST_SMSCategoryId',
            param1Value: parseInt(DataList.SMSCategory),
            paramString: DataList.ContactNo,
            StoreProcedure: 'SMSTemplate_USP',

            paramString3: DataList.name,
            paramString2: DataList.RegNo,
            paramString4: DataList.DateTime,
            //paramString4: DataList.area,
            //paramString5: DataList.contact_no,
            //paramString6: DataList.complaint,
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/SendSMSGlobal",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            window.location.reload();

        },
        error: function (data) {

        }
    });
    return false;

}
