var type;
var UserId;
var ModuleId;
var menuArr = [];
$(document).ready(function () {
    checked();

    UserId = getParameterByName('UserId'); //Get Data From URL QueryString 
    //ModuleId=getParameterByName('ModuleId');
})

//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).on('click', '#btnSave', function () {
    SaveRecord();
})

$('#selectAll').on('change', function () {
    var isChecked = $(this).is(':checked');

    $('.mainMenu').each(function () {
        $(this).prop('checked', isChecked);

        // get the 'mid' from the onclick attribute
        var mid = $(this).attr('onclick').match(/\d+/)[0];

        if (isChecked) {
            // enable and check related submenus
            $('input:checkbox[name=submenu_' + mid + ']').prop('checked', true).prop('disabled', false);
        } else {
            // uncheck and disable related submenus
            $('input:checkbox[name=submenu_' + mid + ']').prop('checked', false).prop('disabled', true);
        }
    });

    checked();
});

//function checked() {
//    //debugger;
//    var menuArr = [];
//    var isAnyChecked = $('.mainMenu:checked').length > 0;

//    $('#tblMenu tbody tr').each(function(i, row) {

//        $(this).find("input.mainMenu").each(function () {
//            //alert('fine');
//        if (this.checked) {
//            menuArr.push({ MenuId: parseInt(this.value) });
//        }
//    })
//    });

//    //$(this).find('input:checkbox[class=subMenu]').each(function () {
//    //    if (this.checked) {
//    //        menuArr.push({ MenuId: parseInt(this.value) });
//    //    }
//    //});
//    $('#btnSave').prop('disabled', !isAnyChecked);
   
//}

function checked() {
    var menuArr = [];
    //var isAnyChecked = false;
    var isAnyChecked = $('.mainMenu:checked').length > 0;

    $('#tblMenu tbody tr').each(function () {
        $(this).find("input.mainMenu").each(function () {
            if (this.checked) {
                isAnyChecked = true;
                menuArr.push({ MenuId: parseInt(this.value) });
            }
        });
    });

    // Enable or disable the submit button based on checkbox status
    $('#btnSave').prop('disabled', !isAnyChecked);
}


$(document).on('change', 'input.mainMenu', function () {
    checked();
});

function removeItem(array, item){
    for(var i in array){
        if(array[i].MenuId==item){
            array.splice(i,1);
            break;
        }
    }
}

function activateSubMenu(menu, mid) {
    if ($(menu).is(':checked')) {
        // $('submenu_' + mid).removeAttr('disabled');
        //'input:checkbox[class=mainMenu]'
        $('input:checkbox[name=submenu_' + mid + ']').removeAttr('disabled');
    }
    else {
        // $('submenu_' + mid).prop('checked', false).attr('disabled', 'disabled');
        $('input:checkbox[name=submenu_' + mid + ']').prop('checked', false).attr('disabled', 'disabled');
    }
}




function SaveRecord() {

    //var menuArr = [];
    $('#tblMenu tbody tr').each(function(i, row) {

        $(this).find("input.mainMenu").each(function () {
           
            if (this.checked) {
                menuArr.push({ MenuId: parseInt(this.value) });
            }
        })
    });

    $('#tblMenu tbody tr').each(function(i, row) {

        $(this).find("input.subMenu").each(function () {
           
            if (this.checked) {
                menuArr.push({ MenuId: parseInt(this.value) });
            }
        })
    });
   

    var _data = JSON.stringify({
        entity: {
            UserId: parseInt($("#User_ID").val()),
            Role: 'E',
            //UserName: $.trim($("#fullname").val()),
            status: $.trim($('#status').val()),
            mainmenuList: menuArr,
           
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateUser',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                $('#btnSave').prop('disabled', true);
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
       
                    if (result.isConfirmed) {
                        //$('#modalBudgSMME').modal('hide');
                        //if ($('#hdnRole').val() == "E") {
                        //    window.location.href = '/Enterprise/UserPermissionList';
                        //} else if ($('#hdnRole').val() == "A") {
                        //    window.location.href = '/Home/ViewAllEnterpriseUserForAdmin';
                        //}
                        
                
            }
        
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
        text: "Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});
}


//function retrive(id, mode) {

//    var _data = JSON.stringify({
//        global: {
//            TransactionType: globalData.TransactionType,
//            Param: globalData.Param,
//            paramValue: parseInt(id),
//            StoreProcedure: globalData.StoreProcedure
//        }
//    });

//    $.ajax({
//        type: "POST",
//        url: "/ScriptJson/GetGlobalMaster",
//        data: _data,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: function (data) {

//            $('#User_Id').val(data["UserID"]);
//            $('#fullname').val(data["UserName"]).siblings('label').addClass('active');
//            $('#username').val(data["UserLoginID"]).siblings('label').addClass('active');
//            $('#password').val(data["Password"]).siblings('label').addClass('active');
//            $('#status').val(data["status"]).change();



//            if (mode == 'v') {
//                $(document).find('input, textarea, select').attr('disabled', 'disabled');
//                $('#btnSave').attr('id', 'btnEdit').html('Edit');

//                $(document).on('click', '#btnEdit', function () {
//                    $(document).find('input, textarea, select').removeAttr('disabled');
//                    $('#btnEdit').attr('id', 'btnSave').html('Submit');
//                })
//            }
//        },
//        error: function (data) {
//            swal({
//                title: 'Process not completed',
//                icon: 'error'
//            })
//        }
//    });
//    return false;

//}

//$('#password, #confirm_password').on('keyup', function () {
//    if ($('#password').val() == $('#confirm_password').val()) {
//        $('#confirm_password').css('border-color', 'green');


//    } else
//        $('#confirm_password').css('border-color', 'red');

//});