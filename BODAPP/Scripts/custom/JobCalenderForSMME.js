var arrayJobList = [];

// function retrive() {
//    var _data = JSON.stringify({
//        global: {
//            TransactionType: 'ShowJobCalender',
//            param1: 'AJU_UserId',
           
//            StoreProcedure: 'JobDetails_USP'
//        }
//    });

//    $.ajax({
//        type: "POST",
//         url: "/ScriptJson/GetGlobalMasterTransaction",
//        contentType: "application/json; charset=utf-8",
//        data: _data,
//        dataType: "json",
//        success: function (data) {
//            data = JSON.parse(data);
           
//            arrayJobList = data;

//        },
//        error: function (data) {
//            Swal.fire({
//                title: "Process Not Complete",
//                icon: "error",
//                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                buttonsStyling: !1
//            });
//        }
//    });
//    return false;

//}