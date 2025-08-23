
var step = 1;
var SegmntCount = 0;
var optionArray = [];
var allInputValArray = [];
var finalArray = [];
var fileArray = [];
var aasId = 0;



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//function UploadDoc(uploadId) {
//    var inputElement = document.getElementById(uploadId);

//    if (!inputElement) {
//        console.error("Upload input element not found for ID:", uploadId);
//        return;
//    }

//    var formData = new FormData();
//    var totalFiles = inputElement.files.length;

//    for (var i = 0; i < totalFiles; i++) {
//        formData.append(uploadId, inputElement.files[i]);
//    }

//    $.ajax({
//        type: "POST",
//        url: '/ScriptJson/UploadAssessment',
//        data: formData,
//        dataType: 'json',
//        contentType: false,
//        processData: false,
//        async: false,
//        success: function () {
//            // You can handle success here
//        }
//    }).done(function (response) {
//        // console.log(response);
//    }).fail(function (jqxhr, textStatus, error) {
//        var err = textStatus + ", " + error;
//        console.error("Request Failed: " + err);
//    });
//}

function UploadDoc(uploadId) {
    return new Promise(function (resolve, reject) {
        var inputElement = document.getElementById(uploadId);

        if (!inputElement) {
            console.error("Upload input element not found for ID:", uploadId);
            reject("Input not found");
            return;
        }

        var formData = new FormData();
        var totalFiles = inputElement.files.length;

        for (var i = 0; i < totalFiles; i++) {
            formData.append(uploadId, inputElement.files[i]);
        }

        $.ajax({
            type: "POST",
            url: '/ScriptJson/UploadAssessment',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                resolve(response);
            },
            error: function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.error("Request Failed: " + err);
                reject(err);
            }
        });
    });
}


function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseInt(bytes / 1000);
        }
    }
    return bytes + ' P';
}

//function FileUpload(input, id) {
//    var fileInput = input.files[0];
//    var size = bytesToSize(500000);

//    if (!fileInput) {
//        console.error("No file selected for ID:", id);
//        return;
//    }

//    if (fileInput.size > 500000) {
//        Swal.fire({
//            title: 'Oops..!',
//            text: 'File size is more than ' + size + 'b',
//            icon: "error",
//            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//            buttonsStyling: false
//        });
//        return false;
//    } else {
//        var uploadId = 'flie_' + id;

//        if (!document.getElementById(uploadId)) {
//            console.error("Upload field not found:", uploadId);
//            return;
//        }

//        UploadDoc(uploadId);
//        fileArray.push({ name: '/AssessmentUpload/' + fileInput.name, value: id });
//    }
//}

function FileUpload(input, id) {
    var fileInput = input.files[0];
    var size = bytesToSize(500000);

    if (!fileInput) {
        console.error("No file selected for ID:", id);
        return;
    }

    if (fileInput.size > 500000) {
        Swal.fire({
            title: 'Oops..!',
            text: 'File size is more than ' + size,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
        return false;
    }

    var uploadId = 'flie_' + id;
    var inputElement = document.getElementById(uploadId);

    if (!inputElement) {
        console.error("Upload field not found:", uploadId);
        return;
    }

    // Start upload and handle result
    UploadDoc(uploadId)
        .then(function () {
            // Add to array
            fileArray.push({ name: '/AssessmentUpload/' + fileInput.name, value: id });

            // ✅ Make border green
            inputElement.classList.remove('border-danger');
            inputElement.classList.add('border-success');

            // ✅ Show success alert
            Swal.fire({
                title: 'Upload Successful!',
                text: fileInput.name + ' has been uploaded.',
                icon: 'success',
                customClass: { confirmButton: "btn btn-success waves-effect waves-light" },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    inputElement.classList.add('border-success');
                }
            });
        })
        .catch(function (error) {
            Swal.fire({
                title: 'Upload Failed!',
                text: 'Error: ' + error,
                icon: 'error',
                customClass: { confirmButton: "btn btn-danger waves-effect waves-light" },
                buttonsStyling: false
            });
        });
}



let finalSubmit = () => {
    Swal.fire({
                title: "Are you sure you Want to Save?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonText: "Yes, Save it!",
                customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-secondary waves-effect waves-light" },
                buttonsStyling: false,
            }).then((result) => {

                if (result.isConfirmed) {
                    //Start Loader Here
                    LoaderStart("#section-block");
                    fnSaveData();

                }
            });
}
let getIds = () => {
 
    finalArray = [];
    var arr = [];
    $('.segCard').each(function (index) {
        
        var elementId = $(this).attr('id');
        console.log('Element at index ' + index + ' has ID: ' + elementId);
        $(elementId).each(function () {
            var hdnVal = $(elementId + " input").val();
            console.log('Hidden Input Value ' + hdnVal);
            
                arr.push({
                    ID: elementId,
                    VAL: hdnVal
                });
                
        })
        
    });
    console.log(arr)
    $.each(arr, function (index, value) {
        console.log("Index: " + index + ", Value: " + value);
        fnAllInputArray((value.ID).substring(1), value.VAL);
    });
    
    setTimeout(finalSubmit,500)
}
$(function () {
    aasId = getParameterByName('aasId');

    LoaderStart("#section-block");
    //$("#section-block").block({ message: '<div class="d-flex justify-content-center"> <p class="mb-0">Please wait loading your Assessment...</p> <div class="sk-wave m-0"><div class="sk-rect sk-wave-rect"></div><div class="sk-rect sk-wave-rect"></div><div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> </div></div>', timeout: 3e3, css: { backgroundColor: "transparent", color: "#fff", border: "0" }, overlayCSS: { opacity: .9 } })
    retriveAssement();
    retriveSummery()

});

//retriveSummery(BAId, Id)


function retriveSummery() {
    
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSummery',
            param1: 'BA_Id',
            param1Value: parseInt($('#hdnBaId').val()),
            param2: 'SmmeId',
            param2Value: parseInt($('#hdnSmmeId').val()),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });


    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#modal-div");
        //},
        //complete: function () {
        //    LoaderEnd("#modal-div");
        //},
        success: function (data) {
            console.log('txtSummary data- ', data);

            data = JSON.parse(data);
            if (data.length > 0 && data[0].AASS_Summary && data[0].AASS_Summary.trim() !== '') {
                $('#dvSumm').html(data[0].AASS_Summary);
                $('#summHide').show(); // Show it if summary exists
            } else {
                $('#summHide').hide(); // Hide the whole row if no summary
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




function retriveAssement() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildAssessmentListForSMME',
            param1: 'SmmeId',
            param1Value: parseInt($('#hdnSmmeId').val()),
            param2: 'AAS_Id',
            param2Value: parseInt(aasId),

            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            SegmntCount = 0;
            data = JSON.parse(data);
            console.log('retriveAssement', data);
            $('#hdnBaId').val(data[0].AAS_BA_Id);
            retriveSegment(data[0].AAS_BA_Id);


        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..!',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

//function getChkAndradiodata(o, value, count) {
//    if ($(o).val() == 0) {
//        $(o).val(1);
//    }
//    else {
//        $(o).val(0);
//    }
//}

function getChkAndradiodata(o, value, count) {
    const $input = $(o);
    //var cls = this.className;
    var theClass = o.className.split(' ');
    var clsName = theClass[1];
    $('.'+clsName).val('');
    if ($input.attr('type') === 'checkbox') {
        if ($input.prop('checked')) {
            $input.val(value);
        } else {
            $input.val('');
        }
    }

    // For radio, no toggle logic needed — just set value (already auto handled)
    if ($input.attr('type') === 'radio') {
         if ($input.prop('checked')) {
            $input.val(value);
        } else {
            $input.val('');
        }


        // this helps when value attribute might be replaced
    }
}


function retriveQuestionOption(QN_Id, QuestionOption, OptionId) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectQuestionOptionForSMMENew',
            param1: 'QN_Id',
            param1Value: parseInt(QN_Id),
            param2: 'QuestionOption',
            paramString2: QuestionOption,
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            var SingleSlct = '';
            data = JSON.parse(data);
            $(OptionId).append(data[0].AppendValue);
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..!',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function retriveSegment(Baid) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildSegmentListForSMME',
            param1: 'SmmeId',
            param1Value: parseInt($('#hdnSmmeId').val()),
            param2: 'BA_Id',
            param2Value: parseInt(Baid),
            param3: 'AAS_Id',
            param3Value: parseInt(aasId),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            SegmntCount = 0;
            data = JSON.parse(data);
            SegmntCount = data.length;

            console.log('retriveSegment:', SegmntCount);

            $.each(data, function (i, v) {
                var DvStep = '';
                var crdBdy = '';
                var active = '';

                var areaselect = false;
                var show = '';
                var dstepperblock = '';
                var QsList = '';
                i = i + 1;
                if (i == 1) {
                    active = 'active';
                    areaselect = true;
                    dstepperblock = 'dstepper-block';
                }
                //<div class="mt-3"><label for="" class="form-label">Asseaed</label><input class="form-control" placeholder="Type Your AAAAA"/></div>
                crdBdy = crdBdy + '<div class="card-body" id="Segdetails-' + v.BAD_SegSlNo + '"></div>'
                $("#segmentHeader").append('<div class="card p-3 col-12 mt-3 mx-auto w-50 segCard" id="#Segdetails-' + v.BAD_SegSlNo + '"><input type="hidden" class="sgemntId" value="' + v.BAD_SegmentId + '" id="SegDetls_' + v.BAD_SegmentId + '" name="SegDetls_' + v.BAD_SegmentId + '"><div class="btn btn-primary btn-sm d-flex waves-effect waves-light"><p class="card-title text-white mb-0">' + v.SegmentName + '</p></div>' + crdBdy + '</div>');

              
                if (i == v.BAD_SegSlNo) {
                    retriveQuestion("Segdetails-" + v.BAD_SegSlNo, v.BAD_SegmentId, v.BAD_BA_Id, v.BAD_SegSlNo);
                }
                $('#spnWizrd').text(v.AssessmentName);

                i++;

            });
            //alert('y');


        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..!',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}



function retriveQuestion(Segdetails, SegmentId, BA_Id, SlNo) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildQuestionListForSMME',
            param1: 'SegmentId',
            param1Value: parseInt(SegmentId),
            param2: 'BA_Id',
            param2Value: parseInt(BA_Id),
            param3: 'SmmeId',
            param3Value: parseInt($('#hdnSmmeId').val()),
            param4: 'AAS_Id',
            param4Value: parseInt(aasId),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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

            console.log("retriveQuestion", data);

            var QsList = '';
            var btnList = '';
            var valuesArray = [];
            $.each(data, function (index, elem) {
                index = index + 1;
                var option = '';
                var Ids = '';
                var chk = '';

                if (elem.BAD_QuestionOption == "TextBox") {
                    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label> <input class="form-control" id="qs_' + elem.BAD_QuestionId + '" name="qs_' + elem.BAD_QuestionId + '" placeholder="">' + elem.QN_IsUpload + '';
                }
                else if (elem.BAD_QuestionOption == "TextArea") {
                    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label> <textarea class="form-control" id="qs_' + elem.BAD_QuestionId + '" name="qs_' + elem.BAD_QuestionId + '" rows="3"></textarea>' + elem.QN_IsUpload + '';
                }
                else if (elem.BAD_QuestionOption == "SingleSelect") {
                    SingleSlct = '';
                    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label><div id="singlDv_' + elem.BAD_QuestionId + '"></div>' + elem.QN_IsUpload + '';
                    var Ids = '#singlDv_' + elem.BAD_QuestionId + '';
                }
                else if (elem.BAD_QuestionOption == "Drop-down") {
                    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label>   <select class="select2" id="qs_' + elem.BAD_QuestionId + '" name="qs_' + elem.BAD_QuestionId + '"><option label=" "></option> </select>' + elem.QN_IsUpload + '';
                    var Ids = '#qs_' + elem.BAD_QuestionId + '';
                }
                else if (elem.BAD_QuestionOption == "MultiSelect") {
                    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label><div id="singlDv_' + elem.BAD_QuestionId + '" name="singlDv_' + elem.BAD_QuestionId + '"></div>' + elem.QN_IsUpload + '';
                    var Ids = '#singlDv_' + elem.BAD_QuestionId + '';
                }

                if (elem.AppendData.includes('border-danger')) {
                    QsList += '<div class="col-sm-12 card p-3 border border-danger">' + elem.AppendData + '</div>';
                } else {
                    QsList += '<div class="col-sm-12 card p-3">' + elem.AppendData + '</div>';
                }


                var dvStep = document.getElementById($.trim(Segdetails));

                //var inputElementsheader = dvsegmentHeader.querySelectorAll('input[name]');
                var inputElements = dvStep.querySelectorAll('input[id]:not([type="hidden"],[type="file"])');
                var textareaElements = dvStep.querySelectorAll('textarea');
                var selectElements = dvStep.querySelectorAll('select');
                var fileElements = dvStep.querySelectorAll('input[type=file]');
                
                inputElements.forEach(input => {
                    const name = input.id;
                    const value = input.value;

                    valuesArray.push({ name, value, });

                });
                textareaElements.forEach(input => {
                    const name = input.name;
                    const value = input.value;
                    valuesArray.push({ name, value });
                });
                selectElements.forEach(function (select) {
                    valuesArray.push({ name: select.name, value: select.value });
                });
                //retriveQuestionOption(elem.BAD_QuestionId, elem.BAD_QuestionOption, Ids);
            });
            console.log("vv : " + valuesArray)

            var newArray = valuesArray.map(item => {
                if (item.name.includes('_')) {
                    var parts = item.name.split('_');
                    return { name: parts[1], value: item.value };
                }
                else
                {
                    return { name: item.name, value: item.value };
                }
            });

            console.log("vv : " + newArray)
        
            if (step == SegmntCount && step == SlNo) {
                btnList = '<button class="btn btn-success" id="btnsubmit" onclick="getIds()">Submit</button>'
                $("#" + Segdetails).append('<div class="content-header mb-3"></div><div class="g-3 row"><input type="hidden" id="hdnSegId_' + SegmentId + '" value="' + SegmentId + '"/> ' + QsList + '<div class="mt-3 col-12">' + btnList + '</div></div>');
                LoaderEnd("#section-block");
            } else {
                $("#" + Segdetails).append('<div class="content-header mb-3"></div><div class="g-3 row"><input type="hidden" id="hdnSegId_' + SegmentId + '" value="' + SegmentId + '"/>' + QsList + '<div class="mt-3 col-12">' + btnList + '</div></div>');
            }

            btnList = '';
            if (step > 1 && step == SegmntCount) {
                var e = $(".select2"),
            t = $(".selectpicker");
            t.length && t.selectpicker(),
                e.length &&
                    e.each(function () {
                        var e = $(this);
                        e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select value", dropdownParent: e.parent() });
                    });
                }
            QsList = '';
            btnList = '';
            step++;
            //$("#btn").html('');
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops..!',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}


function fnAllInputArray(divid, Segmentid) {
    var dvStep = document.getElementById($.trim(divid));
    var inputElements = dvStep.querySelectorAll('input[id]:not([type="hidden"],[type="file"])');
    var textareaElements = dvStep.querySelectorAll('textarea');
    var selectElements = dvStep.querySelectorAll('select');
    //var fileElements = dvStep.querySelectorAll('input[type=file"]');
    var fileElements = dvStep.querySelectorAll('input[type="file"]');

    const valuesArray = [];

    // Collect input values
    inputElements.forEach(input => {
        valuesArray.push({ name: input.id, value: input.value });
    });

    textareaElements.forEach(input => {
        valuesArray.push({ name: input.name, value: input.value });
    });

    selectElements.forEach(select => {
        valuesArray.push({ name: select.name, value: select.value });
    });

    // Handle file inputs
    fileElements.forEach(input => {
        if (input.files.length > 0) {
            let file = input.files[0];
            valuesArray.push({ name: input.id, file: file.name });
        }
    });

    // Normalize field names (remove prefix before `_`)
    var newArray = valuesArray.map(item => {
        if (item.name.includes('_')) {
            var parts = item.name.split('_');
            return { name: parts[1], value: item.value || "", file: item.file || "" };
        } else {
            return { name: item.name, value: item.value || "", file: item.file || "" };
        }
    });

    // Process values into finalArray
    newArray.forEach(v => {
        if (v.value !== "0" && v.value !== "" && v.name !== "") {
            let fileData = "";
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].value == v.name) {
                    fileData = fileArray[i].name;
                    break;
                }
            }

            let questionId = v.name;
            let answer = v.value;

            // Handle case with |
            if (v.name.includes('|')) {
                let splitquestion = v.name.split('|');
                answer = splitquestion[0];
                questionId = splitquestion[1];
                for (var i = 0; i < fileArray.length; i++) {
                    if (fileArray[i].value == questionId) {
                        fileData = fileArray[i].name;
                        break;
                    }
                }
            }

            // Remove duplicate if already exists
            finalArray = finalArray.filter(item =>
                !(item.ASA_QuestionId === questionId && item.ASA_SegmentId === Segmentid)
            );

            // Add new entry
            finalArray.push({
                ASA_QuestionId: questionId,
                ASA_Answer: answer,
                ASA_SegmentId: Segmentid,
                ASA_File: fileData
            });
        }
    });

    console.log(finalArray);
}



//function fnAllInputArray(divid, Segmentid) {
 
//    var dvsegmentHeader = document.getElementById('segmentHeader');
//    var dvStep = document.getElementById($.trim(divid));

//    //var inputElementsheader = dvsegmentHeader.querySelectorAll('input[name]');
//    var inputElements = dvStep.querySelectorAll('input[id]:not([type="hidden"],[type="file"])');
//    var textareaElements = dvStep.querySelectorAll('textarea');
//    var selectElements = dvStep.querySelectorAll('select');
//    var fileElements = dvStep.querySelectorAll('input[type=file]');
//    const valuesArray = [];


//    inputElements.forEach(input => {
//        const name = input.id;
//        const value = input.value;

//        valuesArray.push({ name, value, });

//    });
//    textareaElements.forEach(input => {
//        const name = input.name;
//        const value = input.value;

//        valuesArray.push({ name, value });
//    });
//    selectElements.forEach(function (select) {

//        valuesArray.push({ name: select.name, value: select.value });
//    });
//    if (fileElements.files) {
//        fileElements.forEach(input=> {
//            //deal with each input
//            let file = input.files[0];
//            const name = input.id;
//            const fileData = file.name;
//            //console.log(file);
//            valuesArray.push({ name: name, file: fileData });

//            //use file
//        });
//    }
//    //console.log(valuesArray)
//    var newArray = valuesArray.map(item => {
//        if (item.name.includes('_')) {
//            var parts = item.name.split('_');
//            return { name: parts[1], value: item.value };
//        }
//        else {
//            return { name: item.name, value: item.value };
//        }
//    });
//    //console.log(fileArray);
//    //var result = [];
//    $.each(newArray, function (i, v) {
//        var fileData = "";
//        if (v.value != "0" && v.value != "" && v.name != "") {
//            //$.each(fileArray, function (i, f) {
//            var fileData = "";


//            if (v.name.includes('|')) {
//                var splitquestion = v.name.split('|');

//                for (var i = 0; i < fileArray.length; i++) {
//                    if (fileArray[i].value == splitquestion[1]) {
//                        fileData = fileArray[i].name;
//                        break;
//                    }
//                }
//                //new Line Added
//                var matchingItems = $.grep(finalArray, function (item) {
//                    return item.ASA_QuestionId === splitquestion[1] && item.ASA_SegmentId === Segmentid;
//                });
//                if (matchingItems.length === 0) {
//                    finalArray.push({ ASA_QuestionId: splitquestion[1], ASA_Answer: splitquestion[0], ASA_SegmentId: Segmentid, ASA_File: fileData });
//                }
//                //new Line Enndedd
//                //finalArray.push({ ASA_QuestionId: splitquestion[1], ASA_Answer: splitquestion[0], ASA_SegmentId: Segmentid, ASA_File: fileData });
//            }
//            else {
//                for (var i = 0; i < fileArray.length; i++) {
//                    if (fileArray[i].value == v.name) {
//                        fileData = fileArray[i].name;
//                        break;
//                    }
//                }
//                //new Line Added
//                var matchingItems = $.grep(finalArray, function (item) {
//                    return item.ASA_QuestionId === v.name && item.ASA_SegmentId === Segmentid;
//                });
//                if (matchingItems.length === 0) {
//                    finalArray.push({ ASA_QuestionId: v.name, ASA_Answer: v.value, ASA_SegmentId: Segmentid, ASA_File: fileData });
//                }
//                //new Line Enndedd
//                //finalArray.push({ ASA_QuestionId: v.name, ASA_Answer: v.value, ASA_SegmentId: Segmentid, ASA_File: fileData });
//            }

//            //});
//        }
//    });
//    console.log(finalArray)
//    $.each(fileArray, function (i, v) {
//        //if (v.value != "0" && v.value != "" && v.name != "") {
//        //    if (v.name.includes('|')) {
//        //        var splitquestion = v.name.split('|');
//        //        finalArray.push({ ASA_QuestionId: splitquestion[1], ASA_Answer: splitquestion[0], ASA_SegmentId: Segmentid});
//        //    }
//        //    else {
//        //        finalArray.push({ ASA_QuestionId: v.name, ASA_Answer: v.value, ASA_SegmentId: Segmentid  });
//        //    }
//        //}
//    });


   
//}

function fnSaveData() {

    var _data = JSON.stringify({
        entity: {
            //ASM_Id: parseInt($('#hdnPresId').val()),
            ASM_SMME_Id: parseInt($('#hdnSmmeId').val()),
            ASM_BA_Id: parseInt($('#hdnBaId').val()),
            ASM_AssessmentTypeId: parseInt($('#hdnAssessId').val()),
            AssessmentAnswerList: finalArray,

        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/InsertUpdateAssessmentQuesDetails",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        //Loader End
            //success: function (data) {
            //    if (data != null && data != undefined && data.IsSuccess == true) {
            //        Swal.fire({
            //            title: 'Success!',
            //            text: data.Message,
            //            icon: "success",
            //            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            //            buttonsStyling: !1
            //        });
            //        window.location = "/Assessment/AllAssessmentListForSMME";
            //        // window.location = "/SMME/SMMEDashboard";
            //    }
            //    else {
            //        Swal.fire({
            //            title: 'Oops..!',
            //            text: data.Message,
            //            icon: "error",
            //            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            //            buttonsStyling: !1
            //        });
            //    }
        //},
        success: function (data) {
            LoaderEnd("#section-block");
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: 'Thank You!',
                    text: 'You have successfully completed the assessment questionnaire. Your submission is now under review and pending verification.',
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then(function () {
                    window.location = "/Assessment/AllAssessmentListForSMME";
                    // Or redirect to dashboard if needed:
                    // window.location = "/SMME/SMMEDashboard";
                });
            }
            else {
                Swal.fire({
                    title: 'Oops..!',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },

        error: function (data) {
            Swal.fire({
                title: 'Oops..!',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}
//$('#btnsubmit').click(function () {
//    fnAllInputArray();
//})
