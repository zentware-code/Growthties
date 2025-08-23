var rgb = $('#hdnThemeColor').val();
var hex = $('#hdncolorHex').val();
var themeModeStyle = 'light-style'

function changeTheme(element,mode,rgb,hex) {
    let themeStyleLink = document.querySelector('#themeStyleLink');
    if (mode == 'core-dark') {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-dark.css';
        themeModeStyle = 'dark-style';
    } else if (mode == 'core') {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default.css';
        themeModeStyle = 'light-style';
    } else  {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-semi-dark.css';
        themeModeStyle = 'light-style';
    }
    themeMode = mode;
    themeStyle = themeStyleLink;
    
    var _data = JSON.stringify({
        User: {
            ThemeStyle: themeModeStyle,
            ThemeColor: rgb,
            CustomCSSLink: hex,
            TheamLink: themeStyle,
            CoreLink: "/Content/assets/vendor/css/rtl/" + themeMode + ".css",
            
        }
    });
    $.ajax({
        url: '/ScriptJson/ChangeThemeStyle', 
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: _data,
        dataType: 'json',
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Theme Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
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

//function changeThemeStyle(selectedTheme, themestyle, themecolor) {
//    //var selectedTheme = $(element).data("theme");
//    if (selectedTheme == "light") {
//        var _data = JSON.stringify({
//            User: {
//                ThemeColor : themecolor,
//                ThemeStyle: "light-style",
//                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
//                CoreLink: "/Content/assets/vendor/css/rtl/core.css",
                
//            }
//        });
//    } else if (selectedTheme == "dark") {
//        var _data = JSON.stringify({
//            User: {
//                ThemeColor: themecolor,
//                ThemeStyle: "dark",
//                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
//                CoreLink: "/Content/assets/vendor/css/rtl/core-dark.css",
                
//            }
//        });
//    } else if (selectedTheme == "semidark") {
//        var _data = JSON.stringify({
//            User: {
//                ThemeColor: themecolor,
//                ThemeStyle: "semi-dark light-style",
//                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
//                CoreLink: "/Content/assets/vendor/css/rtl/core.css",
//                CustomCSSLink: "/Content/assets/css/demo-dark.css",
//            }
//        });
//    }


//    $.ajax({
//        url: '/ScriptJson/ChangeThemeStyle',
//        type: 'POST',
//        contentType: 'application/json; charset=utf-8',
//        data: _data,
//        dataType: 'json',
//        success: function (data) {
//            if (data != null && data != undefined && data.IsSuccess == true) {
//                //Swal.fire({
//                //    title: "Theme Changes Successfully!",
//                //    icon: "success",
//                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                //    buttonsStyling: !1
//                //});
//                //window.location.reload();

//            }
//            else {
//                Swal.fire({
//                    title: data.Message,
//                    icon: "error",
//                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                    buttonsStyling: !1
//                });

//            }
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
//}




function changeThemeStyle(hex, rgb, mode, themeStyle) {
    if (mode == 'core-dark') {
        var themeModeStyle = 'dark-style'
    } else {
        var themeModeStyle = 'light-style'
    }
    var _data = JSON.stringify({
                User: {
                    ThemeColor: rgb,
                    ThemeStyle: themeModeStyle,
                    TheamLink: themeStyle,
                    CoreLink: "/Content/assets/vendor/css/rtl/" + mode + ".css",
                    CustomCSSLink: hex,
                }
            });
    $.ajax({
        url: '/ScriptJson/ChangeThemeStyle',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: _data,
        dataType: 'json',
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                var path = window.location.pathname;
                path = path.replace(/\/$/, "");
                path = decodeURIComponent(path);
                if (path != '/Enterprise/EnterpriseProfileComplete/') {
                    Swal.fire({
                        title: "Good Job",
                        text: "Theme Changes Successfully!",
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } 
            }
            else {
                Swal.fire({
                    title:'OOPS!..',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'OOPS!..',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });
}

