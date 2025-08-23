
var colorRGB = $('#hdnThemeColor').val();
var colorHex = $('#hdncolorHex').val();
var themeMode = 'core';
var themeStyle = '/Content/assets/vendor/css/rtl/theme-default.css'
function SetThemeColor(hex, rgb) {
    colorHex = hex;
    colorRGB = rgb;
}
function SetThemeMode(mode) {

    let themeStyleLink = document.querySelector('#themeStyleLink');
    if (mode == 'core-dark') {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-dark.css';
    } else if (mode == 'core') {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default.css';
    } else  {
        themeStyleLink = '/Content/assets/vendor/css/rtl/theme-default-semi-dark.css';
    }
    themeMode = mode;
    themeStyle = themeStyleLink;
}
let fnCustomThemeColorSwitcher = () => {
    let customOptionIcon = document.querySelectorAll('.custom-option-icon input');
    //const currentTheme = localStorage.getItem('theme') || '#00ff00';
    //const currentRGB = localStorage.getItem('themeRGB') || '#00ff00';
    customOptionIcon.forEach(color => {
        color.addEventListener('click', () => {

            let dataColor = color.getAttribute('data-color');
            let dataRGB = color.getAttribute('data-rgb');
            //localStorage.setItem('theme', dataColor);
            // localStorage.setItem('themeRGB', dataRGB);
            if (typeof ($('#hdnTheamLink').val()) != "undefined") {
                if ($('#hdnCoreLink').val() == '/Content/assets/vendor/css/rtl/core.css') {
                    themeMode = 'core';
                } else if ($('#hdnCoreLink').val() == '/Content/assets/vendor/css/rtl/core-dark.css') {
                    themeMode = 'core-dark';
                }else  {
                    themeMode = 'core-semi-dark';
                }
            }
            else {
                themeMode = 'core';
            }

            //if ($('#hdnTheamLink').val() == '/Content/assets/vendor/css/rtl/theme-default.css') {
            //    themeMode = 'core';
            //} else {
            //    themeMode = 'core-dark';
            //}
            if (typeof ($('#hdnTheamLink').val()) != "undefined") {
                themeStyle = $('#hdnTheamLink').val();
            }
            else {
                themeStyle = '/Content/assets/vendor/css/rtl/theme-default.css';
            }
           
            changeThemeStyle(colorHex, colorRGB, themeMode, themeStyle);
            //document.querySelector(':root').style.setProperty('--default-primary-hex', dataColor);
            //document.querySelector(':root').style.setProperty('--default-primary-rgb', dataRGB);
        })
    });
    //document.querySelector(':root').style.setProperty('--default-primary-hex', currentTheme);
    //document.querySelector(':root').style.setProperty('--default-primary-rgb', currentRGB);
};
let fnCustomThemeModeSwitcher = () => {
    let themeDefault = document.querySelector('#themeModeLight');
    let themeDark = document.querySelector('#themeModeDark');
    let customOptionIconMode = document.querySelectorAll('.custom-option-icon-mode input');
    let navThemeMode = document.querySelectorAll('.dropdown-styles a');
    let themeModeStyleLink = document.querySelector('#themeModeLink');
    let themeMode = localStorage.getItem('themeMode') || 'core';
    fnThemeMode = (themeMode) => {
        themeModeStyleLink.setAttribute('href', `/Content/assets/vendor/css/rtl/${themeMode}.css`);
    }
    customOptionIconMode.forEach(mode => {
        mode.addEventListener('click', () => {
            let dataMode = mode.getAttribute('data-mode');
            alert(element + " " + dataMode + " " + rgb+" "+ hex)
           // changeTheme(element, dataMode, rgb, hex)
            //let dataThemeMode = mode.getAttribute('data-theme-mode');
            //fnThemeMode(dataMode);
            //let html = document.querySelector("html");
            //html.setAttribute("data-theme-mode", dataThemeMode);
            //localStorage.setItem('themeMode', dataMode);
        })
    });
    //dataMode == themeMode;
    fnThemeMode(themeMode);
}
$(document).ready(function () {
    fnCustomThemeColorSwitcher();
    
    //fnCustomThemeModeSwitcher();
})