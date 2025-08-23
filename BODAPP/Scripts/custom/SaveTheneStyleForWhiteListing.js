
var colorRGB = '';
var colorHex = '';
var themeMode = 'core';
var themeStyle = '/Content/assets/vendor/css/rtl/theme-default.css';

function SetThemeMode(mode,element) {
    let lightImg = document.querySelector('#lightIMG');
    let darkImg = document.querySelector('#darkIMG');
    let semidarkImg = document.querySelector('#semidarkIMG');


    

    let themeStyleLink = document.querySelector('#themeStyleLink');
    if (mode == 'core') {
        
        lightImg.classList.add("active");
        darkImg.classList.remove("active");
        semidarkImg.classList.remove("active");
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default.css';

    } else if (mode == 'core-dark') {
        lightImg.classList.remove("active");
        darkImg.classList.add("active");
        semidarkImg.classList.remove("active");

        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-dark.css';

    } else {
        lightImg.classList.remove("active");
        darkImg.classList.remove("active");
        semidarkImg.classList.add("active");
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-semi-dark.css';
    }
    themeMode = mode;
    themeStyle = themeStyleLink;
}
function SetThemeColor(hex, rgb) {
    colorHex = hex;
    colorRGB = rgb;
}

function changeTheme(element,mode,hex,rgb) {
    let themeStyleLink = document.querySelector('#themeStyleLink');
    if (mode == 'core') {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default.css';
    } else {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-dark.css';
    }
    themeMode = mode;
    themeStyle = themeStyleLink;
    var _data = JSON.stringify({
        User: {
            ThemeStyle: 'light-style',
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
                    title: "Theme Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location.reload();

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
    var _data = JSON.stringify({
                User: {
                    ThemeColor: rgb,
                    ThemeStyle: 'light-style',
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
                //var path = window.location.pathname;
                //path = path.replace(/\/$/, "");
                //path = decodeURIComponent(path);
                //if (path != '/Enterprise/EnterpriseProfileComplete/') {
                //    Swal.fire({
                //        title: "Good Job",
                //        text: "Theme Changes Successfully!",
                //        icon: "success",
                //        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //        buttonsStyling: !1
                //    });
                //    window.location.reload();
                //}
                

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
                text: "Process Not Complete",
                title: 'OOPS!..',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });
}

