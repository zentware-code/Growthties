function LoaderStart(divId)
{
    $(divId).block({ message: '<div class="spinner-border text-primary" role="status"></div>', css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
}
function LoaderEnd(divId) {
    //$(divId).block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.1e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    $(divId).unblock();
}