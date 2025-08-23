var btnStatus = '';
var PageStatus = '';
var Id = 0;
var MId = 0;
var Type = "";
var elem = document.getElementById("progress-bar");
var width = 1;
var interval = 0;
let percentValue = 0,
   progressBar = $('.progress-bar');




function retriveDescription(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAssessmentCategoryDesc',
            param1: 'CategoryId',
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
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            var divSegment = '';
            $('#comnyLogo').attr('src', data[0].ENR_CompanyLogo);
            if (data[0].AC_Description!="") {
                $("#description").append(data[0].AC_Description);
               

            }
            else {
                $("#descriptionDiv").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Desrirption Found</h3><br></div></div></div>');
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
        async:false,
        success: function (data) {
            data = JSON.parse(data);
            var divSegment = '';
            if (data.length > 0) {
                //console.log(data);
                $.each(data, function (i, v) {
                    var active = '';

                    var area = '';
                    var show = '';

                    var QsList = '';
                   
                    divSegment = '<div id="seg_'+ v.BAD_SegmentId+'"><div class="col-md-12 mt-2" style="border-bottom:1px solid rgba(0,0,0,0.5);" ><h4 class="font-weight-600" style="margin-bottom:10px;">' + v.SegmentName + '</h4></div></div>';
                   
                    $("#segment").append(divSegment);
                    retriveQuestion('#seg_' + v.BAD_SegmentId + '', v.BAD_SegmentId, id);
                        //retriveQuestion('#tbl_' + v.BAD_SegSlNo + '  tbody', v.BAD_SegmentId, id);


                   // }
                    //else {

                    //    //retriveQuestion('#tbl_' + v.BAD_SegSlNo + '  tbody', v.BAD_SegmentId, id);
                    //}
                });

                //var uls = $("#accordionExample").find("ul.list-group-flush");
               

            }
            else
            {
                $("#segment").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
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
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            var QsList = '<div class="col-md-12" style="border-bottom:1px solid rgba(0,0,0,0.5);"><div class="card-body p-0">';
            
            $.each(data, function (index, elem) {
                index = index + 1;
                QsList =QsList+ elem.QuestionName;
            });

            $(accdrinid).append(QsList+'</div></div>');


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
        retriveDescription(Id)
        retriveSegment(BAId);
        var x = $(".select2");
        x.length &&
            x.each(function () {
                var x = $(this);
                x.wrap('<div class="position-relative"></div>'), x.select2({ placeholder: "Select", dropdownParent: x.parent() });
            });
    }
     $('#btnPost').prop('disabled', true);
});




$('#uploadFile').on('change', function () {
    if ($(this).val()) {
        progressBarr();
        $('#btnPost').prop('disabled', false)
    } else {
        $('#btnPost').prop('disabled', true)
    }
});
//$('#btnPost').click(function () {
//    UploadDoc('uploadFile');
//})

function startBar() {
    if (percentValue < 100) {
        percentValue += 20;
    }
    progressBar.css("width", percentValue + "%").html(percentValue + "%");
}

function frame() {
    if (width >= 100) {
        clearInterval(interval);
    } else {
        width++;
        elem.style.width = width + '%';
        //SaveRecordForProgressButton(Id, MId, PageStatus);
    }
}

function progressBarr() {
    //resetProgressBar();

    interval = setInterval(startBar, 100);
}

function resetProgressBar() {
    width = 1;
    clearInterval(interval)
    elem.style.width = width + '%';
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

function FileUpload(input) {
    var file = $('#uploadFile');
    var fileInput = $('#uploadFile')[0].files[0];

    var size = bytesToSize(800000);

    if (fileInput.size > 800000) {

        Swal.fire({
            title: 'File size is more then ' + size + 'b',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    else {
        if ($('#uploadFile').prop('files') && $('#uploadFile').prop('files')[0]) {

            var fileDir = new FileReader();
            fileDir.readAsDataURL($('#uploadFile').prop('files')[0]);


            pathFl = $('#uploadFile').val().substring(12);
            pathStringFl = '/Upload/' + pathFl;
            var hdnFilePath = pathStringFl;
            $('#hdnupload').val(hdnFilePath);

            //UploadDoc('uploadFile');// this code call on button clik
        }

    }
}


 // Function to extract query parameters from URL
    function getQueryParam(param) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the `Id` and `BAId` values from the URL
    let id = getQueryParam("Id");
    let baid = getQueryParam("BAId");

    // Handle the button click to call the UploadDoc function
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("btnPost").addEventListener("click", function () {
            UploadDoc("uploadFile"); // Call the function with the file input ID
        });
    });


function UploadDoc(upload) {
    timer = setInterval(startBar, 500);
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
   
    // Append the extracted Id and BAId to FormData
    formData.append("Id", id);
    formData.append("BAId", baid);

    $.ajax({

        type: "POST",
        url: '/ScriptJson/AssessmentAnswerUpload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function () {
            progressBarr();
        },
        success: function () {

            clearInterval(timer);
        }
    }).done(function (data) {
        if (data != null && data != undefined && data.IsSuccess == true && data.Id > 0) {
            Swal.fire({
                title: "Assessment data saved successfully..!",
                icon: "success",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                text: "Your File Upload successfully",
                buttonsStyling: !1
            });
           window.location.reload();
          // window.location.href = "/Assessment/ViewAssessment";
          window.location.href ="/Assessment/AssessmnetWiseSMMEByAdmin?AId="+id+"&BAId="+baid;
        }
        else {
            Swal.fire({
                title: 'Error!',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                text: data.Message,
                buttonsStyling: !1
            });

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        //console.log("Request Failed: " + err);
    });
}