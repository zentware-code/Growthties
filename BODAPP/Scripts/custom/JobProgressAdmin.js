
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function () {

    var Id = getParameterByName('Id');
    var MId = getParameterByName('MId');
    if (Id != '') {
       
        fnProgressdataForSmme(Id, MId)
      

    }

});




function fnProgressdataForSmme(Id, MId) {

    var hdnJobTitle = $('#hdnJobTitle').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectJobProgressforSmme',
            param1: 'JP_JobId',
            param1Value: parseInt(Id),
            param2: 'JP_JobChildId',
            param2Value: parseInt(MId),
            StoreProcedure: 'JobProgress_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            if (count == 0) {
                SaveRecordForProgress(Id, MId, 'Accepted')
            }
            $.each(data, function (i, v) {
                if (v.JP_JobStatus == "Accepted") {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Start Job For</span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i> <span>' + hdnJobTitle + '</span></div><div><span>' + v.JP_JobUpdateTime + '</span></div></div><ul class="list-group list-group-flush"><li class="d-flex align-items-center border-top-0 flex-wrap justify-content-between list-group-item p-0"></ul></div>');
                }
                if (v.JP_JobStatus == "Progress") {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - On Progress by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + hdnJobTitle + '</span><i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span> Job In Progress</span>  </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div><ul class="list-group list-group-flush"><li class="d-flex align-items-center border-top-0 flex-wrap justify-content-between list-group-item p-0"></ul></div>');
                }
                if (v.JP_JobStatus == "Visited") {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-info"><span class="timeline-indicator-advanced timeline-indicator-info"><i class="ti ti-user-circle rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Engineer Visited </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Visited Customer location For ' + hdnJobTitle + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div><ul class="list-group list-group-flush"><li class="d-flex align-items-center border-top-0 flex-wrap justify-content-between list-group-item p-0"></ul></div>');
                }
                if (v.JP_JobStatus == "StartWork") {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-danger"><span class="timeline-indicator-advanced timeline-indicator-danger"><i class="ti ti-basket rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Engineer Started </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Started Work For ' + hdnJobTitle + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div><ul class="list-group list-group-flush"><li class="d-flex align-items-center border-top-0 flex-wrap justify-content-between list-group-item p-0"></ul></div>');
                }

                if (v.JP_JobStatus == "Completed") {
                    $('.btnStatus').prop('disabled', true);
                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Work Completed </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Completed Work For ' + hdnJobTitle + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div><ul class="list-group list-group-flush"><li class="d-flex align-items-center border-top-0 flex-wrap justify-content-between list-group-item p-0"></ul></div>');
                }

            });
           


        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
