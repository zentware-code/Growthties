var href='';
$(document).ready(function () {
   retriveMenuForChild();
 })

function getCurentFileName() { // Fixed the typo
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function retriveMenuForChild() {
    var currentFileName = getCurentFileName();
    //console.log(localStorage.getItem("href"));
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectParentIdForChildForStakeholder',
            param1: 'MenuURL',
            paramString: currentFileName, // Using the corrected function
            param2: 'RootMenu',
            paramString2: localStorage.getItem("href"),
            StoreProcedure: 'Menu_SP'
        }
    });

    ////console.log("Sending data: ", _data);

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransactionSingle1',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
           
                data = JSON.parse(data);
                if (data.length > 0) {
                    SetMenu(data[0].RootMenu);

            }  
        },
        error: function (data) {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}

function SetMenu(href)
{
    //var s = '/Enterprise/EnterpriseLists';
   
    $('#menu-right-mini-' + localStorage.getItem("menuId") + ' ul li.sbmnu a').each(function () {

        //alert(localStorage.getItem("href"));
        if (typeof localStorage.getItem("href") !== "undefined" && localStorage.getItem("href") == href) {
            //console.log('root-'+ href);
            if ($(this).attr('href') == href) {
                
                $(this).closest('li').addClass('selected');
                if ($(this).closest('li').hasClass('navmenu')) {
                    var id = 'mini-1';
                    //retriveMenuForChild();
                    //console.log(getCurentFileName());
                    //console.log(localStorage.getItem("menuId"));

                    id = 'mini-' + localStorage.getItem('menuId');



                    document.querySelectorAll('.mini-nav .mini-nav-item').forEach(function (navItem) {
                        navItem.classList.remove("selected");
                    });
                    this.classList.add("selected");
                    document.querySelectorAll(".sidebarmenu nav").forEach(function (nav) {
                        nav.classList.remove("d-block");
                    });

                    var menuElement = document.getElementById("menu-right-" + id);
                    if (menuElement) {
                        menuElement.classList.add("d-block");
                    } else {
                        console.warn("Element not found: " + "menu-right-" + id);
                    }

                    // document.getElementById("menu-right-" + id).classList.add("d-block");


                    $(this).closest('li').addClass('selected');
                    $('#mini-' + localStorage.getItem('menuId')).addClass('selected active');
                    $(this).addClass('active');
                    document.body.setAttribute("data-sidebartype", "full");
                    $('#main-wrapper').removeClass('show-sidebar');
                    $('li#' + id).addClass('selected');
                }
            }
        }
        else {
            $(this).closest('li').removeClass('selected');
            $(this).removeClass('active');
            document.body.setAttribute("data-sidebartype", "mini-sidebar");
            $('#main-wrapper').addClass('show-sidebar');

        }

    });

}

