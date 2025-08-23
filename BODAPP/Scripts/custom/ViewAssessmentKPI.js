var BAId = 0;
var QuesArr = [];
function retriveSegment(id) {
    QuesArr = [];
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildSegmentListForKPIQuestion',
            param1: 'BA_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'AssessmentKPI_USP'
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
                    var ul = '<div class="table-responsive text-nowrap"><table class="table" id="tbl_' + v.BAD_SegSlNo + '"><thead><tr><th>Sl No.</th><th>Question</th><th style="text-align:center">SELECTED KPIs</th><th style="text-align:center">KPI Description</th></tr></thead><tbody class="table-border-bottom-0"></tbody></table></div>';

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

function retriveQuestion(accdrinid, SegmentId, BA_Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildQuestionListForKPIQuestion',
            param1: 'SegmentId',
            param1Value: parseInt(SegmentId),
            param2: 'BA_Id',
            param2Value: parseInt(BA_Id),
            StoreProcedure: 'AssessmentKPI_USP'
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
            LoaderEnd("#accordionExample");
        },
        success: function (data) {
            data = JSON.parse(data);

           // console.log("Show data", data);

            var QsList = '';

            $.each(data, function (index, elem) {
                index = index + 1;
                console.log("data-",elem)
                QsList += ' <tr><td style="width:10%">' + elem.BAD_Slno + '</td><td style="width:30%">' + elem.QN_Question + '</td><td style="text-align: center;"><input ' + elem.IsChecked + ' class="form-check-input" type="checkbox"  ' + elem.checked + ' value="" id="defaultCheck1" onClick="getQuestion(this,' + elem.BAD_QuestionId + ',\'' + SegmentId + '\',\'' + elem.BAD_Slno + '\')"/></td><td><input type="text" class="form-control" id="txtDesc_' + elem.BAD_QuestionId + '" value="' + elem.KPI_Description + '" maxlength="15" onchange="validateDescription(this, ' + elem.BAD_QuestionId + ')" /></td></tr>';

                if (elem.IsChecked == "checked")
                {
                    QuesArr.push({
                        KPI_SegmentId: SegmentId,
                        KPI_QuestionId: elem.BAD_QuestionId,
                        BAD_SegSlNo: elem.BAD_Slno,
                        KPI_Description: elem.KPI_Description
                    });
                }
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


function validateDescription(inputField, questionId) {
    var maxLength = 10;

    // Check if the length exceeds the max limit
    if ($(inputField).val().length > maxLength) {
        // Truncate the value to the maximum allowed length
       
        Swal.fire({
            title: "Oops...",
            text: "Description cannot exceed " + maxLength + " characters.",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        }).then((result) => {
            if (result.isConfirmed) {
                $(inputField).val($(inputField).val().substring(0, maxLength));
            }
        });
    }

    // Optionally, you could also update the QuesArr if necessary
    // Here we just log the new description to the console
   /// console.log("Updated description for Question ID " + questionId + ": " + $(inputField).val());
}


function getQuestion(o, Qsid, SegId,slNo) {
 
    if ($(o).val() == 0) {
        $(o).val(1);
        if (QuesArr.length > 0) {
            removeItem(QuesArr, Qsid,SegId);
        }
        QuesArr.push({
            KPI_SegmentId: SegId,
            KPI_QuestionId: Qsid,
            BAD_SegSlNo: slNo
           
        });
        console.log(QuesArr);
    }
    else {
        if (QuesArr.length > 0) {

            removeItem(QuesArr, Qsid, SegId);

        }
        $(o).val(0);
    }


}


$(document).on('change', 'input[type="text"]', function () {
    var questionId = $(this).attr('id').replace('txtDesc_', ''); // Get the questionId from the input's ID
    var newDescription = $(this).val(); // Get the new description entered by the user

    // Find the item in QuesArr and update the KPI_Description
    var question = QuesArr.find(q => q.KPI_QuestionId == questionId);
    if (question) {
        question.KPI_Description = newDescription;
    }
});

function removeItem(array, item,SegId) {
    for (var i in array) {
        if (array[i].KPI_QuestionId == item && array[i].KPI_SegmentId == SegId) {
            array.splice(i, 1);
            break;
        }
    }
}

function SaveRecords() {

    var _data = JSON.stringify({
        entity: {
            BA_Id: parseInt(BAId),
            BuildAssesmentDetailsList: QuesArr,
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertBuildKPIQuestion',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Question builded successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                QuesArr=[]
                ///location.reload();
            }
            else {
                Swal.fire({
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

$("#btnSaveAndNext").on('click', function () {
    SaveRecords();
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    //setTimeout(function () {
    //    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    //}, 25000);
   
    var Id = getParameterByName('Id');
    var Mode = getParameterByName('Mode');
    BAId = getParameterByName('BAId');
    //if (Id != '' && Mode == 'E') {
       
    //    retriveSegment(BAId);
    //}
    if (BAId != '') {
        retriveSegment(BAId);
    }
});
