$(document).ready(function () {
    $("#btnSend").html('Send Reset Link');
});

function validateEmailOnChange() {
    const emailField = document.getElementById('email');
    const email = emailField.value;
    const emailError = document.getElementById('email-error');
    const btnSend = document.getElementById('btnSend');
    const btnBack = document.getElementById('btnBack');

    // Email pattern to validate the email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Check if the email is valid
    if (!email || !emailPattern.test(email)) {
        emailError.style.display = 'block';
        emailField.style.borderColor = 'red';
        btnSend.disabled = true; // Disable the button if the email is invalid or empty
        btnBack.disabled = false;
    } else {
        emailError.style.display = 'none';
        emailField.style.borderColor = 'green';
        btnSend.disabled = false; // Enable the button if the email is valid
        btnBack.disabled = true;
    }
}


//function SendMail() {
//    $('#btnSend').prop('disabled', true);
//    $("#btnSend").html('Please Wait.....');
//    var _data = JSON.stringify({
//        User: {
//            UM_EmailId: $('#email').val()
//        }
//    });

//    $.ajax({
//        type: "POST",
//       // url: "/ScriptJson/GetEmailExists",
//        url: "/ScriptJson/GetEmailExistsByTemplate",
//        data: _data,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            if (data != null && data.IsSuccess === true) {
//                //console.log('data---',data)
//                Swal.fire({
//                    title: data.Message,
//                    icon: "success",
//                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                    buttonsStyling: !1
//                });
//                $("#btnSend").html('Send Reset Link');
//                $('#btnSend').removeAttr('disabled');
//               // window.location = '/Account/EnterpriseLogin';
//            } else {
//                Swal.fire({
//                    title: "Email does not exist, try another email..!",
//                    icon: "warning",
//                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                    buttonsStyling: !1
//                });
//                setTimeout(function () {
//                    window.location.reload();
//                }, 2000);
//            }
//        },
//        error: function () {
//            Swal.fire({
//                title: "Process not complete",
//                icon: "error",
//                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                buttonsStyling: !1
//            });
//        }
//    });
//}




// General function to trigger email actions
function SendMail(email, action) {
    $('#btnSend').prop('disabled', true);  
    $("#btnSend").html('Please Wait.....');  

    var _data = JSON.stringify({
        emailcontent: {
            UM_Login: email,  
        },
        Action: action, 
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",  
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.IsSuccess === true) {
              //  //console.log('data---', data);
                Swal.fire({
                    title: "Good Job..",
                    text: data.Message,  
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                $("#btnSend").html('Send Reset Link');  
                $('#btnSend').removeAttr('disabled');
                $('#btnSend').prop('disabled', true);
                $('.inputEmpty').val('');
            } else {
                Swal.fire({
                    title: "Oops..",
                    text: "Email does not exist, try another email..!",  
                    icon: "warning",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                setTimeout(function () {
                    window.location.reload(); 
                }, 2000);
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops..",
                text: "Process not complete",  
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}


$('#btnSend').click(function () {
    var email = $('#email').val();
    var action = 'passwordreset';
    SendMail(email, action);  
});