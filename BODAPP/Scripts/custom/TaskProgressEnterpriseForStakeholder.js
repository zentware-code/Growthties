var Mode = '';
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function () {
    //$("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 9e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    var Id = getParameterByName('Id');
    Mode = getParameterByName('Mode');
    if (Id != '') {
        fnProgressdataForSmme(Id)
    }

});


function fnProgressdataForSmme(Id) {

    var hdnTaskTitle = $('#hdnTaskTitle').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskProgressforEnterprise',
            param1: 'TP_TaskId',
            param1Value: parseInt(Id),
            StoreProcedure: 'TaskProgress_USP'
        }
    });
    
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#pageload");
        },
        complete: function () {
            LoaderEnd("#pageload");
        },
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            if (count == 0) {
                $("#ulProgress").append('<h3 class="text-center text-grey">Progress Not Found</h3>');
                //SaveRecordForProgress(Id, MId, 'Accepted')
            }

            if (Mode == 'V') {
                $('.viewmd').hide();
            }

          //  //console.log(data);
            $.each(data, function (i, v) {
                
                if (v.TP_TaskStatus == "Open") {

                    //$("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Start Job For</span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i> <span>' + hdnTaskTitle + '</span></div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div>' + v.TPC_Upload + '<span class="badge bg-primary">Open</span></div>');
                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class=" flex-wrap justify-content-between mb-2"><div class="d-flex justify-content-between align-items-center"><div><span>Start Task For</span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span>' + hdnTaskTitle + '</span></div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div></div><div class="justify-content-between">' + v.TPC_Upload + '</div><span class="badge bg-primary mt-2">Open</span></div>');
                    
                }
                if (v.TP_TaskStatus == "Progress" && v.IsComment == 0) {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - On Progress by ' + v.UM_Name + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + hdnTaskTitle + '</span><i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span> Job In Progress</span>  </div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div><span class="badge bg-warning">Progress</span>' + v.TPC_Upload + '</div>');

                }
                if (v.TP_TaskStatus == "Progress" && v.IsComment == 1) {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' -  Commented by ' + v.UM_Name + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + v.TPC_Comment + '</span>  </div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div>' + v.TPC_Upload + '<span class="badge bg-warning">Progress</span></div>');

                }
                if (v.TP_TaskStatus == "Completed") {

                    $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - Work Completed </h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Completed Work For ' + hdnTaskTitle + '</span></i> </div><div><span>' + v.TP_TaskUpdateTime + '</span></div>' + v.TPC_Upload + '</div></div>');

                }
                
                if (Mode == 'V') {
                    $('.viewmd').hide();
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
function SaveUpdateReq(TPC_Id, TPC_TaskId) {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            TPC_Id: TPC_Id,
            TP_TaskId: TPC_TaskId,
            
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/UpdateUploadTaskStatus",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //Swal.fire({
                //    title: "Your Save Changes Successfully!",
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