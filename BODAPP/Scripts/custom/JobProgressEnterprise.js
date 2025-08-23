
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function () {
    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 9e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
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
            TransactionType: 'SelectJobProgressforEnterprise',
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
                //SaveRecordForProgress(Id, MId, 'Accepted')
            }
            //console.log(data);
            $.each(data, function (i, v) {

                if (v.JP_JobStatus == "Open") {

                    //$("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Start Job For</span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i> <span>' + hdnJobTitle + '</span></div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '<span class="badge bg-primary">Open</span></div>');
                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class=" flex-wrap justify-content-between mb-2"><div class="d-flex justify-content-between align-items-center"><div><span>Start Job For</span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span>' + hdnJobTitle + '</span></div><div><span>' + v.JP_JobUpdateTime + '</span></div></div></div><div class="justify-content-between">' + v.JPC_Upload + '</div><span class="badge bg-primary mt-2">Open</span></div>');
                    




                }
                if (v.JP_JobStatus == "Progress" && v.IsComment == 0) {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - On Progress by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + hdnJobTitle + '</span><i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span> Job In Progress</span>  </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div><span class="badge bg-warning">Progress</span>' + v.JPC_Upload + '</div>');

                }
                if (v.JP_JobStatus == "Progress" && v.IsComment == 1) {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' -  Commented by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + v.JPC_Comment + '</span>  </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '<span class="badge bg-warning">Progress</span></div>');

                }
                if (v.JP_JobStatus == "Completed" && v.IsComment == 0) {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Work Completed </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Completed Work For ' + hdnJobTitle + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '</div>');

                }
                if (v.JP_JobStatus == "Completed" && v.IsComment == 1) {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Work Completed </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + v.JPC_Comment + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '</div>');

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
function SaveUpdateReq(JPC_Id, JPC_JobId, JPC_JobChildId) {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            JPC_Id: JPC_Id,
            JP_JobId: JPC_JobId,
            JP_JobChildId: JPC_JobChildId,
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/UpdateUploadStatus",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //Swal.fire({
                //    title: "Your changes were saved successfully!",
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});
                location.reload();
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