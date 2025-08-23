
function ChangePassword() {
    var url = new URL(window.location.href);
    var email = url.searchParams.get('email');

    if (email) {
        var decodedEmail = atob(email);
    } else {
        //console.log('Email parameter not found in the URL.');
    }

    var _data = JSON.stringify({
        User: {
            UM_EmailId: $.trim(decodedEmail),
            UM_Password: $.trim($('#confirm-password').val()),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/UpdatePassword",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",           
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Do you want to Login?",
                    icon: "warning",
                    showCancelButton: !0,
                    confirmButtonText: "Yes",
                    customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
                    buttonsStyling: !1,
                }).then((result) => {
                        if (result.isConfirmed) {
                            if (data.Id == 1)
                            {
                                window.location = '/Account/EnterpriseLogin';
                            }else if (data.Id == 2) {
                                window.location = '/Account/SMMELogin';
                            }else if (data.Id == 3) {
                                window.location = '/Account/EnterpriseUserLogin';
                            }else if (data.Id == 4) {
                                window.location = '/Account/AdminUserLogin';
                            }else {
                                window.location = '/Account/AdminLogin';
                            }
                        }
                    });


                    //.then((result) => {
                    //if (result.isConfirmed) {
                        //if (data.Id == 1)
                        //{
                        //    window.location = '/Account/EnterpriseLogin';
                        //}else if (data.Id == 2) {
                        //    window.location = '/Account/SMMELogin';
                        //}else if (data.Id == 3) {
                        //    window.location = '/Account/EnterpriseUserLogin';
                        //}else if (data.Id == 4) {
                        //    window.location = '/Account/AdminUserLogin';
                        //}
                        ////else if (data.Id == 5) {
                        ////    window.location = '/Account/SMMEUserLogin';
                        ////}
                        //else {
                        //    window.location = '/Account/AdminLogin';
                        //}
                    
                    //}

                    //else if (result.isDenied) {
           
                    //}
                //});
            }
            else {
                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const passwordMessageField = document.getElementById('pass-msg');
    const confirmPasswordMessageField = document.getElementById('confirmpass-msg');
    const submitButton = document.getElementById('btnSubmit');

    // Function to validate password length
    function validatePassword() {
        const password = passwordField.value;

        if (password.length < 6) {
            passwordField.style.borderColor = 'red';
            passwordMessageField.textContent = 'Password must be more than 6 characters';
            passwordMessageField.style.color = '#ff4c51';
        } else {
            passwordField.style.borderColor = 'green';
            passwordMessageField.textContent = '';
        }

        checkPasswordMatch(); // Check password match whenever password changes
    }

    // Function to validate confirm password and check match
    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordField.value;

        if (confirmPassword.length < 6) {
            confirmPasswordField.style.borderColor = 'red';
            confirmPasswordMessageField.textContent = 'Confirm password must be more than 6 characters';
            confirmPasswordMessageField.style.color = '#ff4c51';
        } else {
            confirmPasswordField.style.borderColor = 'green';
            confirmPasswordMessageField.textContent = '';
        }

        checkPasswordMatch(); // Check password match whenever confirm password changes
    }

    // Function to check if passwords match and enable submit button
    function checkPasswordMatch() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        if (confirmPassword === password && password.length >= 6 && confirmPassword.length >= 6) {
            confirmPasswordMessageField.textContent = 'Passwords match';
            confirmPasswordMessageField.style.color = 'green';
            submitButton.disabled = false; // Enable the submit button
        } else {
            confirmPasswordMessageField.textContent = 'Confirm password does not match';
            confirmPasswordMessageField.style.color = 'red';
            submitButton.disabled = true; // Disable the submit button
        }
    }

    // Event listeners for input fields
    passwordField.addEventListener('input', validatePassword);
    confirmPasswordField.addEventListener('input', validateConfirmPassword);

});


//document.addEventListener('DOMContentLoaded', function () {
//    const passwordField = document.getElementById('password');
//    const confirmPasswordField = document.getElementById('confirm-password');
//    const passwordMessageField = document.getElementById('pass-msg');
//    const confirmPasswordMessageField = document.getElementById('confirmpass-msg');
//    const submitButton = document.getElementById('btnSubmit');

//    function validatePassword() {
//        const password = passwordField.value;

//        if (password.length < 6) {
//            passwordField.style.borderColor = 'red';
//            passwordMessageField.textContent = 'Password must be more than 6 characters';
//            passwordMessageField.style.color = '#ff4c51';
//        } else {
//            passwordField.style.borderColor = 'green';
//            passwordMessageField.textContent = '';
//        }
//    }

//    function validateConfirmPassword() {
//        const password = passwordField.value;
//        const confirmPassword = confirmPasswordField.value;

//        if (confirmPassword.length < 6) {
//            confirmPasswordField.style.borderColor = 'red';
//            confirmPasswordMessageField.textContent = 'Confirm password must be more than 6 characters';
//            confirmPasswordMessageField.style.color = '#ff4c51';
//        } else {
//            confirmPasswordField.style.borderColor = 'green';
//            confirmPasswordMessageField.textContent = '';
//        }

//        if (confirmPassword === password && confirmPassword.length >= 6) {
//            confirmPasswordMessageField.textContent = 'Passwords match';
//            confirmPasswordMessageField.style.color = 'green';
//        } else if (confirmPassword !== password && confirmPassword.length >= 6) {
//            confirmPasswordMessageField.textContent = 'Confirm password does not match';
//            confirmPasswordMessageField.style.color = 'red';
//        }
//    }

//    passwordField.addEventListener('input', validatePassword);
//    confirmPasswordField.addEventListener('input', validateConfirmPassword);
//});




