"use strict";
let direction = "ltr";
isRtl && (direction = "rtl"),
    document.addEventListener("DOMContentLoaded", function () {
        {
            const v = document.getElementById("calendar"),
                m = document.querySelector(".app-calendar-sidebar"),
                p = document.getElementById("addEventSidebar"),
                f = document.querySelector(".app-overlay"),
                g = { single: "danger", multiple: "success",maintenance: "warning " },
                h = document.querySelector(".offcanvas-title"),
                b = document.querySelector(".btn-toggle-sidebar"),
                y = document.querySelector('button[type="submit"]'),
                S = document.querySelector(".btn-delete-event"),
                L = document.querySelector(".btn-cancel"),
                E = document.querySelector("#eventTitle"),
                k = document.querySelector("#eventStartDate"),
                w = document.querySelector("#eventEndDate"),
                q = document.querySelector("#eventURL"),
                x = $("#eventLabel"),
                D = $("#eventGuests"),
                P = document.querySelector("#eventLocation"),
                M = document.querySelector("#eventDescription"),
                T = document.querySelector(".allDay-switch"),
                A = document.querySelector(".select-all"),
                F = [].slice.call(document.querySelectorAll(".input-filter")),
                Y = document.querySelector(".inline-calendar");
            let a,
                l = events,
                i = !1,
                e;
            const C = new bootstrap.Offcanvas(p);
            function t(e) {
                return e.id ? "<span class='badge badge-dot bg-" + $(e.element).data("label") + " me-2'> </span>" + e.text : e.text;
            }
            function n(e) {
                return e.id
                    ? "<div class='d-flex flex-wrap align-items-center'><div class='avatar avatar-xs me-2'><img src='" +
                          assetsPath +
                          "img/avatars/" +
                          $(e.element).data("avatar") +
                          "' alt='avatar' class='rounded-circle' /></div>" +
                          e.text +
                          "</div>"
                    : e.text;
            }
            var d, o;
            function s() {
                var e = document.querySelector(".fc-sidebarToggle-button");
                for (e.classList.remove("fc-button-primary"), e.classList.add("d-lg-none", "d-inline-block", "ps-0"); e.firstChild; ) e.firstChild.remove();
                e.setAttribute("data-bs-toggle", "sidebar"), e.setAttribute("data-overlay", ""), e.setAttribute("data-target", "#app-calendar-sidebar"), e.insertAdjacentHTML("beforeend", '<i class="ti ti-menu-2 ti-sm text-heading"></i>');
            }
            x.length &&
                x.wrap('<div class="position-relative"></div>').select2({
                    placeholder: "Select value",
                    dropdownParent: x.parent(),
                    templateResult: t,
                    templateSelection: t,
                    minimumResultsForSearch: -1,
                    escapeMarkup: function (e) {
                        return e;
                    },
                }),
                D.length &&
                    D.wrap('<div class="position-relative"></div>').select2({
                        placeholder: "Select value",
                        dropdownParent: D.parent(),
                        closeOnSelect: !1,
                        templateResult: n,
                        templateSelection: n,
                        escapeMarkup: function (e) {
                            return e;
                        },
                    }),
                k &&
                    (d = k.flatpickr({
                        enableTime: !0,
                        altFormat: "Y-m-dTH:i:S",
                        onReady: function (e, t, n) {
                            n.isMobile && n.mobileInput.setAttribute("step", null);
                        },
                    })),
                w &&
                    (o = w.flatpickr({
                        enableTime: !0,
                        altFormat: "Y-m-dTH:i:S",
                        onReady: function (e, t, n) {
                            n.isMobile && n.mobileInput.setAttribute("step", null);
                        },
                    })),
                Y && (e = Y.flatpickr({ monthSelectorType: "static", inline: !0 }));
            let r = new Calendar(v, {
                initialView: "dayGridMonth",
                events: function (e, t) {
                    let n = (function () {
                        let t = [],
                            e = [].slice.call(document.querySelectorAll(".input-filter:checked"));
                        return (
                            e.forEach((e) => {
                                t.push(e.getAttribute("data-value"));
                    }),
                            t
                        );
                })();
            t(
                l.filter(function (e) {
                    return n.includes(e.groupId.toLowerCase());
                })
            );
        },
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timegridPlugin],
        editable: !0,
        dragScroll: !0,
        dayMaxEvents: 2,
        eventResizableFromStart: !0,
        customButtons: { sidebarToggle: { text: "Sidebar" } },
        headerToolbar: { start: "sidebarToggle, prev,next, title", end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth" },
        direction: direction,
        initialDate: new Date(),
        navLinks: !0,
        eventClassNames: function ({ event: e }) {
                    return ["fc-event-" + g[e._def.groupId]];
    },
    dateClick: function (e) {
        e = moment(e.date).format("YYYY-MM-DD");
        u(), C.show(), h && (h.innerHTML = "Add Event"), (y.innerHTML = "Add"), y.classList.remove("btn-update-event"), y.classList.add("btn-add-event"), S.classList.add("d-none"), (k.value = e), (w.value = e);
    },
eventClick: function (e) {
    (e = e),
    (a = e.event).url && (e.jsEvent.preventDefault(), window.open(a.url, "_blank")),
        C.show(),
        h ;
  
    fnRetriveCustDetails(a.id);
  

},
datesSet: function () {
    s();
},
viewDidMount: function () {
    s();
},
});
r.render(), s();
var c = document.getElementById("eventForm");
function u() {
    (w.value = ""), (q.value = ""), (k.value = ""), (E.value = ""), (P.value = ""), (T.checked = !1), D.val("").trigger("change"), (M.value = "");
}
FormValidation.formValidation(c, {
    fields: {
        eventTitle: { validators: { notEmpty: { message: "Please enter event title " } } },
        eventStartDate: { validators: { notEmpty: { message: "Please enter start date " } } },
        eventEndDate: { validators: { notEmpty: { message: "Please enter end date " } } },
    },
    plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: "",
            rowSelector: function (e, t) {
                return ".mb-3";
            },
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        autoFocus: new FormValidation.plugins.AutoFocus(),
    },
})
    .on("core.form.valid", function () {
        i = !0;
    })
    .on("core.form.invalid", function () {
        i = !1;
    }),
    b &&
        b.addEventListener("click", (e) => {
            L.classList.remove("d-none");
}),

S.addEventListener("click", (e) => {
    var t;
(t = parseInt(a.id)),
    (l = l.filter(function (e) {
        return e.id != t;
    })),
    r.refetchEvents(),
    C.hide();
}),
p.addEventListener("hidden.bs.offcanvas", function () {
    u();
}),
//b.addEventListener("click", (e) => {
//    h && (h.innerHTML = "Add Event"), (y.innerHTML = "Add"), y.classList.remove("btn-update-event"), y.classList.add("btn-add-event"), S.classList.add("d-none"), m.classList.remove("show"), f.classList.remove("show");
//}),
A &&
    A.addEventListener("click", (e) => {
        e.currentTarget.checked ? document.querySelectorAll(".input-filter").forEach((e) => (e.checked = 1)) : document.querySelectorAll(".input-filter").forEach((e) => (e.checked = 0)), r.refetchEvents();
alert('Y');

}),
F &&
    F.forEach((e) => {
        e.addEventListener("click", () => {
            document.querySelectorAll(".input-filter:checked").length < document.querySelectorAll(".input-filter").length ? (A.checked = !1) : (A.checked = !0), r.refetchEvents();
});
}),
e.config.onChange.push(function (e) {
    r.changeView(r.view.type, moment(e[0]).format("YYYY-MM-DD")), s(), m.classList.remove("show"), f.classList.remove("show");
});
}
});

function fnRetriveCustDetails(jobid) {
    $("#dvJobDetails").html('');
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectJobCustDataForProgress',
            param1: 'JD_Id',
            param1Value: parseInt(jobid),
            param2: 'JD_VistType',
            paramString2: 'Single',
            StoreProcedure: 'JobDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //alert(data[0].CD_Name);

            $("#dvJobDetails").append("<small class='card-text text-uppercase'>Job Details</small><ul class='list-unstyled mb-4 mt-3'><li class='align-items-center d-flex mb-3'><i class='text-heading ti ti-user'></i><span class='text-heading fw-medium mx-2'>Job Name:</span> <span>"+data[0].JD_JobName+"</span><li class='align-items-center d-flex mb-3'><i class='text-heading ti ti-check'></i><span class='text-heading fw-medium mx-2'>Visit Type:</span> <span>"+data[0].JD_VistType+"</span><li class='align-items-center d-flex mb-3'><i class='text-heading ti ti-crown'></i><span class='text-heading fw-medium mx-2'>Start Date:</span> <span>"+data[0].JD_JobStartDate+"</span><li class='align-items-center d-flex mb-3'><i class='text-heading ti ti-flag'></i><span class='text-heading fw-medium mx-2'>End Date:</span> <span>"+data[0].JD_JobEndDate+"</span><li class='align-items-center d-flex mb-3'><i class='text-heading ti ti-file-description'></i><span class='text-heading fw-medium mx-2'>Job Category:</span> <span>"+data[0].JD_JobEndDate+"</span></ul><small class='card-text text-uppercase'>Customer Details</small><ul class='list-unstyled mb-4 mt-3'><li class='align-items-center d-flex mb-3'><i class='ti ti-phone-call'></i><span class='text-heading fw-medium mx-2'>Customer Name:</span> <span>"+data[0].CD_Name+"</span><li class='align-items-center d-flex mb-3'><i class='ti ti-phone-call'></i><span class='text-heading fw-medium mx-2'>Contact:</span> <span>"+data[0].CD_ContactNumber+"</span><li class='align-items-center d-flex mb-3'><i class='ti ti-brand-skype'></i><span class='text-heading fw-medium mx-2'>Address:</span> <span>"+data[0].CD_AddressLine1+"</span><li class='align-items-center d-flex mb-3'><i class='ti ti-mail'></i><span class='text-heading fw-medium mx-2'>Postal Code:</span> <span>"+data[0].CD_AddressLine1+"</span><li class='align-items-center d-flex mb-3'><i class='ti ti-mail'></i><span class='text-heading fw-medium mx-2'>Email:</span> <span>"+data[0].CD_AddressLine1+"</span></ul>");
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
    return false;

}