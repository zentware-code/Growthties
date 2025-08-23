

function SaveRecords() {
    var _data = JSON.stringify({
        User: {
           UM_CurrentPassword: $.trim($('#currentPassword').val()),
           UM_NewPassword: $.trim($('#newPassword').val()),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/ResetPassword",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
               // SendMail()
                if (data.Id > 0)
                {
                    Swal.fire({
                        title: "Successful..!",
                        text: data.Message,
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (data.Id == 1) {
                                window.location = '/Account/EnterpriseLogin';
                            } else if (data.Id == 2) {
                                window.location = '/Account/SMMELogin';
                            } else if (data.Id == 3) {
                                window.location = '/Account/EnterpriseLogin';
                            } else if (data.Id == 4) {
                                window.location = '/Account/AdminLogin';
                            } else if (data.Id == 5) {
                                window.location = '/Account/SMMELogin';
                            } else {
                                window.location = '/Account/AdminLogin';
                            }
                          ///  window.location.href = "/Account/AdminUserLogin";
                        }
                    });
                }
                else
                {
                    Swal.fire({
                        title: "Oops..!",
                        text: data.Message,
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    });

                }
             
            } else {
                //var Email = $('#txtUserEmail').val();
                //var Phone = $('#txtContact').val();

                //var titleText = '';
                //if (data.Id == -1) {
                //    titleText = '"' + Email + '"' + " this email already exists..!";
                //} else if (data.Id == -2) {
                //    titleText = '"' + Phone + '"' + " this phone number already exists..!";
                //} else {
                //    titleText = data.Message;
                //}
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });
}

