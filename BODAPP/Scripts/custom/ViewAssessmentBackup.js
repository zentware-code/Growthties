function retriveSegment(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildSegmentList',
            param1: 'BA_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            if (data.length > 0) {

                $.each(data, function (i, v) {
                    var active = '';

                    var area = '';
                    var show = '';

                    var QsList = '';
                    //var SegmentId=$('#ddlSegment').val();
                    //var SegmentName=$('#ddlSegment option:selected').text();



                    if ($("#accordionExample .accordionItemcls_" + v.BAD_SegmentId).length == 0) {
                        $("#accordionExample div").removeClass("active");
                        $("#accordionExample div").removeClass("show");
                        $('#accordionExample, .accordion-button').removeAttr('aria-expanded');
                        active = 'active';
                        area = 'aria-expanded="true"';
                        show = 'show';
                        var ul = '<div class="table-responsive text-nowrap"><table class="table" id="tbl_' + v.BAD_SegSlNo + '"><thead><tr><th>Sl No.</th><th>Question</th><th>Option Type</th></tr></thead><tbody class="table-border-bottom-0"></tbody></table></div>';

                        $("#accordionExample").append('<div class="card accordionItemcls_' + v.BAD_SegmentId + ' accordion-item ' + active + '" id="accordionItem_' + v.BAD_SegSlNo + '"><h2 class="accordion-header" id="headingOne_' + v.BAD_SegSlNo + '"><input type="hidden" id="hdnSeg_' + v.BAD_SegSlNo + '" value="' + v.BAD_SegmentId + '"/><button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion_' + v.BAD_SegSlNo + '" ' + area + ' aria-controls="accordion_' + v.BAD_SegSlNo + '">' + v.SegmentName + '</button></h2><div id="accordion_' + v.BAD_SegSlNo + '" class="accordion-collapse collapse ' + show + '" data-bs-parent="#accordionExample"><div class="accordion-body"> ' + ul + '</div></div></div>');
                        retriveQuestion('#tbl_' + v.BAD_SegSlNo + '  tbody', v.BAD_SegmentId, id);


                    }
                    else {

                        retriveQuestion('#tbl_' + v.BAD_SegSlNo + '  tbody', v.BAD_SegmentId, id);
                    }
                });

                var uls = $("#accordionExample").find("ul.list-group-flush");
                $.each(uls, function (i, item) {
                    var id = item.id;


                    document.getElementById(id) && Sortable.create(document.getElementById(id), { animation: 150, group: "handleList", handle: ".drag-handle" });
                });
                uls = '';

            }
            else
            {
                $("#accordionExample").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
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
    return false;

}
function retriveQuestion(accdrinid, SegentId, BA_Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildQuestionList',
            param1: 'SegmentId',
            param1Value: parseInt(SegentId),
            param2: 'BA_Id',
            param2Value: parseInt(BA_Id),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            var QsList = '';
           
            $.each(data, function (index, elem) {
                index = index + 1;
                QsList = QsList + ' <tr><td >' + elem.BAD_Slno + '</td><td>' + elem.QN_Question + '</td><td>' + elem.BAD_QuestionOptionType + '' + elem.BAD_QuestionOption + '</td></tr>';
            });

            $(accdrinid).append(QsList);


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
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function () {
    //setTimeout(function () {
        $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    //}, 25000);
   
    var Id = getParameterByName('Id');
    var Mode = getParameterByName('Mode');
    var BAId = getParameterByName('BAId');
    if (Id != '' && Mode == 'E') {
       
        retriveSegment(BAId);
    }
});
