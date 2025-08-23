function retriveAssessment(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEProfileDashBoardAssessment',
            param1: 'SmmeId',
            param1Value: parseInt(Id),  /// parseInt($('#hdnSmmeId').val()),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#accordionExample");
        },
        complete: function () {
            LoaderEnd("#accordionExample");
        },
        success: function (data) {
            data = JSON.parse(data);

            if (data.length == 0) {
                $('#accordionExample').append('<h3 class="text-bold text-mutated text-center">Data Not Found</h3>');
            }

            console.log("Assessments",data);
            $.each(data, function (i, v) {
                var active = '';

                var area = '';
                var show = '';

                var QsList = '';
                //var SegmentId=$('#ddlSegment').val();
                //var SegmentName=$('#ddlSegment option:selected').text();



                if ($("#accordionExample .accordionItemcls_" + v.AAS_Assessment_Id).length == 0) {
                    $("#accordionExample div").removeClass("active");
                    $("#accordionExample div").removeClass("show");
                    $('#accordionExample, .accordion-button').removeAttr('aria-expanded');
                    active = 'active';
                    area = 'aria-expanded="true"';
                    show = 'show';
                    var ul = '<div class="table-responsive text-nowrap"><table class="table" id="tbl_' + v.AAS_Assessment_Id + '"><thead><tr><th>Sl No.</th><th>Question</th><th>Answer</th><th style="text-align:center">File</th></tr></thead><tbody class="table-border-bottom-0"></tbody></table></div>';

                    $("#accordionExample").append('<div class="card accordionItemcls_' + v.AAS_Assessment_Id + ' accordion-item ' + active + '" id="accordionItem_' + v.AAS_Assessment_Id + '"><h2 class="accordion-header" id="headingOne_' + v.AAS_Assessment_Id + '"><input type="hidden" id="hdnSeg_' + v.AAS_Assessment_Id + '" value="' + v.AAS_Assessment_Id + '"/><button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion_' + v.AAS_Assessment_Id + '" ' + area + ' aria-controls="accordion_' + v.AAS_Assessment_Id + '">' + v.AC_Category + '</button></h2><div id="accordion_' + v.AAS_Assessment_Id + '" class="accordion-collapse collapse ' + show + '" data-bs-parent="#accordionExample"><div class="accordion-body"> ' + ul + '</div></div></div>');
                    retriveQuestionAnsware('#tbl_' + v.AAS_Assessment_Id + '  tbody', v.AAS_BA_Id, Id);

                }
                else {
                      retriveQuestionAnsware('#tbl_' + v.AAS_Assessment_Id + '  tbody', v.AAS_Assessment_Id, Id);
                }
            });

            var uls = $("#accordionExample").find("ul.list-group-flush");
            $.each(uls, function (i, item) {
                var id = item.id;


                document.getElementById(id) && Sortable.create(document.getElementById(id), { animation: 150, group: "handleList", handle: ".drag-handle" });
            });
            uls = '';


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

function retriveQuestionAnsware(accdrinid, BA_Id,SmmeId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEDashboardAssessmentWiseQuestionAnswares',
            param1: 'BA_Id',
            param1Value: parseInt(BA_Id),
            param2: 'SmmeId',
            param2Value: parseInt(SmmeId),      // $('#hdnSmmeId').val()
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

            console.log("Show data QnA- ", data);

            var QsList = '';

            $.each(data, function (index, elem) {
                index = index + 1;
                var answerContent = elem.ASA_Answer.split(',').slice(1).join(', ');

                var downloadButton = '';
                if (elem.ASA_File !== "") {
                    downloadButton = '<button class="" onclick="window.location.href=\'' + elem.ASA_File + '\'" style="cursor:pointer;border-style: none;background: none;"  ><i class="ti ti-download mx-2 ti-sm text-warning"></i></button>';
                }
                QsList += ' <tr><td style="width:10%">' + index + '</td><td style="width:30%">' + elem.QN_Question + '</td><td>' + answerContent + '</td><td style="text-align: center;">' + downloadButton + '</td></tr>';
            });

            $(accdrinid).append(QsList);
        },




        //success: function (data) {
        //    data = JSON.parse(data);

        //    console.log("Show data", data);

        //    var QsList = '';

        //    $.each(data, function (index, elem) {
        //        index = index + 1;

        //        // Check if ASA_File is not empty
        //        var answerContent = elem.ASA_Answer.split(',').slice(1).join(', '); // Default answer without the first comma value

        //        if (elem.ASA_File !== "") {
        //            // If ASA_File is not empty, make the answer clickable to download the file
        //            answerContent = '<a href="' + elem.ASA_File + '" download style="cursor:pointer;">' + answerContent + '</a>';
        //        }

        //        // Add the row to the table
        //        QsList += ' <tr><td style="width:10%">' + elem.BAD_Slno + '</td><td style="width:30%">' + elem.QN_Question + '</td><td>' + answerContent + '</td></tr>';
        //    });

        //    $(accdrinid).append(QsList);
        //},



        //success: function (data) {
        //    data = JSON.parse(data);

        //    console.log("Show data", data);

        //    var QsList = '';
           
        //    $.each(data, function (index, elem) {
        //        index = index + 1;
        //        QsList = QsList + ' <tr><td style="width:10%">' + elem.BAD_Slno + '</td><td style="width:30%">' + elem.QN_Question + '</td><td>' + elem.ASA_Answer.split(',').slice(1) + '</td></tr>';
        //    });

        //    $(accdrinid).append(QsList);


        //},
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
    
   
    var Id = getParameterByName('Id');
    var Mode = getParameterByName('Mode');
    var BAId = getParameterByName('BAId');
    //if (Id != '' && Mode == 'E') {
       
    //    retriveAssessment(BAId);
    //}
    if (Id != '') {
        retriveAssessment(Id);
    }
});
