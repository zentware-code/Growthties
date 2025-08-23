function retriveSegment(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildSegmentForSpecificSMME',
            param1: 'BA_Id',
            param1Value: parseInt(id),
            param2: 'SmmeId',
            param2Value: $('#hdnSmmeId').val(),
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
            LoaderStart("#responses-div");
        },
        //complete: function () {
        //    LoaderEnd("#datatable-example");
        //},
        success: function (data) {
            data = JSON.parse(data);

            //console.log(data);
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
                    var ul = '<div class="table-responsive text-nowrap"><table class="table" id="tbl_' + v.BAD_SegSlNo + '"><thead><tr><th>Sl No.</th><th>Question</th><th>RESPONSE</th><th style="text-align:center">FILE UPLOAD</th></tr></thead><tbody class="table-border-bottom-0"></tbody></table></div>';

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
            TransactionType: 'SelectBuildQuestionForSpecificSMME',
            param1: 'SegmentId',
            param1Value: parseInt(SegentId),
            param2: 'BA_Id',
            param2Value: parseInt(BA_Id),
            param3: 'SmmeId',
            param3Value: parseInt($('#hdnSmmeId').val()),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#datatable-example");
        //},
        complete: function () {
            LoaderEnd("#responses-div");
        },
        success: function (data) {
            data = JSON.parse(data);

           // console.log("Show data", data);

            var QsList = '';

            $.each(data, function (index, elem) {
                index = index + 1;
                var answerContent = elem.ASA_Answer.split(',').slice(1).join(', ');

                var downloadButton = '';
                if (elem.ASA_File !== "") {
                    downloadButton = '<button onclick="previewFile(\'' + elem.ASA_File + '\')" style="cursor:pointer; border: none; background: none; margin-right: 0px;">' +
                            '<i class="ti ti-eye mx-0 ti-sm text-warning"></i>' +
                        '</button>' +
                        '<a href="' + elem.ASA_File + '" target="_blank" style="cursor:pointer; border-style: none; background: none;">' +
                                     '<i class="ti ti-download mx-2 ti-sm text-warning"></i></a>';
                }
                QsList += ' <tr><td style="width:10%">' + elem.BAD_Slno + '</td><td style="width:30%">' + elem.QN_Question + '</td><td>' + answerContent + '</td><td style="text-align: center;">' + downloadButton + '</td></tr>';
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
    //setTimeout(function () {
      //  $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    //}, 25000);
   
    var Id = getParameterByName('Id');
    var Mode = getParameterByName('Mode');
    var BAId = getParameterByName('BAId');
    //if (Id != '' && Mode == 'E') {
       
    //    retriveSegment(BAId);
    //}
    if (BAId != '') {

        retriveSegment(BAId);
    }
});


function previewFile(fileUrl) {
    const extension = fileUrl.split('.').pop().toLowerCase();
    let previewHtml = '';

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
        previewHtml = '<img src="' + fileUrl + '" style="width:100%; height:500px; object-fit:cover; border-radius:0;" />';
    } else if (extension === 'pdf') {
        previewHtml = '<iframe src="' + fileUrl + '" style="width:100%; height:500px; border:none;"></iframe>';
    } else {
        previewHtml = '<iframe src="' + fileUrl + '" style="width:100%; height:500px; border:none;"></iframe>' +
                      '<p style="margin-top:10px; color:#888;">Preview may not be supported for this file type.</p>';
    }

    Swal.fire({
        title: '', // remove default title
        html:
            '<div style="text-align: left; font-size: 18px; font-weight: 600; color: #555; padding-bottom: 10px;">File Preview</div>' +
            previewHtml,
        width: 800,
        padding: '1rem',
        customClass: {
            popup: 'no-radius'
        },
        showCloseButton: true,
        showConfirmButton: false
    });
}
