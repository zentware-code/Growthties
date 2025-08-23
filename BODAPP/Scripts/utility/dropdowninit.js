"use strict";
$(function () {

    //var e = $(".ddlCategory");
    //var f = $(".ddlBusinessType");
   dropId.length &&
       dropId.each(function () {
            var e = $(this);
           e.wrap('<div class="position-relative"></div>'),e.select2({ placeholder: title, dropdownParent:e.parent() });
        });
});