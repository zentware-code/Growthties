var BAId = '';
var Id = '';
var AId = '';
var selectedAnswers = [];
var emailsendAction = '';
var AASS_IsVerified = '';

$(document).ready(function () {
    //setTimeout(function () {
    //  $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    //}, 25000);

    Id = getParameterByName('Id');
    AId = getParameterByName('AId');
    var Mode = getParameterByName('Mode');
    BAId = getParameterByName('BAId');
    //if (Id != '' && Mode == 'E') {

    //    retriveSegment(BAId);
    //}
    if (Id != '') {
        retriveSmmeDate(Id);
    }

    if (BAId != '') {
        retriveSegment(BAId);
        retriveSummery(BAId, Id);

        //setTimeout(function () {
        //    chking();
        //}, 5000);
       
    }
    $("#btnVerified").prop("disabled", true);

});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



function retriveSmmeDate(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEDetails',
            param1: 'SmmeId',
            param1Value: parseInt(Id),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            console.log('SmmeData data- ', data);

            data = JSON.parse(data);
            $('#hdnSmmeName').val(data[0].SMME_CompanyName);
            $('#hdnEmail').val(data[0].SMME_PrimaryContactEmail);
            $('#hdnPhoneNumber').val(data[0].SMME_PrimaryContactNo);
            
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
    $('#accordionExample').html('');
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
            //LoaderStart("#responses-div");
            LoaderStart(".layout-container");
            
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
                    var ul = '<div class="table-responsive text-nowrap"><table class="table" id="tbl_' + v.BAD_SegSlNo + '"><thead><tr><th>Sl No.</th><th>Question</th><th>RESPONSE</th><th style="text-align:center">FILE UPLOAD</th><th style="text-align:center">Action</th><th style="text-align:center">Note</th></tr></thead><tbody class="table-border-bottom-0"></tbody></table></div>';

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
    selectedAnswers = []; // Reset previous selections

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

        complete: function () {
            //LoaderEnd("#responses-div");
            LoaderEnd(".layout-container");
        },

        success: function (data) {
            data = JSON.parse(data);

            var QsList = '';
            var allVerified = true;

            if (!data || data.length === 0) {
                $(accdrinid).html('<div class="text-center p-3">No data found.</div>');
                return;
            }

            $.each(data, function (index, elem) {
                index = index + 1;

                var answerContent = elem.ASA_Answer.split(',').slice(1).join(', ');
                var downloadButton = '';
                var IsAnsBtn = '';
                var noteDisabled = '';

                if (elem.ASA_File !== "") {
                    downloadButton =
                        '<button onclick="previewFile(\'' + elem.ASA_File + '\')" style="cursor:pointer; border: none; background: none; margin-right: 0px;">' +
                            '<i class="ti ti-eye mx-0 ti-sm text-warning"></i>' +
                        '</button>' +
                        '<a href="' + elem.ASA_File + '" target="_blank" download style="cursor:pointer; border: none; background: none;">' +
                            '<i class="ti ti-download mx-0 ti-sm text-warning"></i>' +
                        '</a>';
                }

                var yesChecked = elem.ASA_AnswerType === "Yes" ? 'checked' : '';
                var noChecked = (elem.ASA_AnswerType === "No" || elem.ASA_AnswerType === " ") ? 'checked' : '';

                var yesDisabled = elem.ASA_AnswerType === "Yes" ? 'disabled' : '';
                var noDisabled = elem.ASA_AnswerType === "Yes" ? 'disabled' : '';
                noteDisabled = elem.ASA_AnswerType === "Yes" ? 'disabled' : '';

                if ((elem.AASS_IsVerified) == "Completed") {
                    $("#btnVerified").prop("disabled", true);
                    $("#btnNotVerified").prop("disabled", true);
                }

                var radioHTML =
                             '<div class="form-check form-check-success" id="radioGroup' + elem.ASA_Id + '">' +
                                 '<input class="form-check-input rdoYes" type="radio" name="answer' + elem.ASA_Id + '" value="Yes" id="yes' + elem.ASA_Id + '" ' + yesChecked + ' ' + yesDisabled + '>' +
                                 '<label class="form-check-label text-success me-2" for="yes' + elem.ASA_Id + '">Yes</label>' +
                             '</div>' +
                             '<div class="form-check form-check-danger">' +
                                 '<input class="form-check-input rdoNo" type="radio" name="answer' + elem.ASA_Id + '" value="No" id="no' + elem.ASA_Id + '" ' + noChecked + ' ' + noDisabled + '>' +
                                 '<label class="form-check-label text-danger" for="no' + elem.ASA_Id + '">No</label>' +
                             '</div>';


                IsAnsBtn = radioHTML;

                // Append current record to selectedAnswers (retrieved values)
                selectedAnswers.push({
                    ASA_SegmentId: elem.ASA_SegmentId,
                    ASA_QuestionId: elem.ASA_QuestionId,
                    ASA_Id: elem.ASA_Id,
                    ASA_AnswerType: elem.ASA_AnswerType,
                    ASA_Note: elem.ASA_Note
                });

                QsList += '<tr>' +
                    '<td style="width:10%">' + elem.BAD_Slno + '</td>' +
                    '<td style="width:30%">' + elem.QN_Question + '</td>' +
                    '<td>' + answerContent + '</td>' +
                    '<td style="text-align: center;">' + downloadButton + '</td>' +
                    '<td style="text-align: center; display: flex; justify-content: space-around; align-items: center;" class="mt-3 p-3">' + IsAnsBtn + '</td>' +
                    '<td style="text-align: center;">' +
                        '<input type="text" class="form-control noteInput" data-asa-id="' + elem.ASA_Id + '" placeholder="Note" value="' + elem.ASA_Note + '" ' + noteDisabled + ' />' +
                    '</td>' +
                    '</tr>';
            });

            $(accdrinid).html('<table class="table">' + QsList + '</table>');

            // Add event for radio buttons
            $('input[type="radio"]').on('change', function () {
                var $input = $(this);
                var asaId = parseInt($input.attr('name').replace('answer', ''));
                var selectedValue = $input.val();
                var noteValue = $input.closest('tr').find('.noteInput').val() || '';

                // Update selectedAnswers
                selectedAnswers = selectedAnswers.filter(item => item.ASA_Id !== asaId);
                selectedAnswers.push({
                    ASA_SegmentId: getSegmentIdByAsaId(asaId, data),
                    ASA_QuestionId: getQuestionIdByAsaId(asaId, data),
                    ASA_Id: asaId,
                    ASA_AnswerType: selectedValue,
                    ASA_Note: noteValue
                });

                console.log('Radio Changed:', selectedAnswers);
            });

            // Add event for Note input
            $('.noteInput').on('input', function () {
                var $input = $(this);
                var asaId = parseInt($input.data('asa-id'));
                var noteValue = $input.val();
                var existing = selectedAnswers.find(item => item.ASA_Id === asaId);

                // If exists, update note only
                if (existing) {
                    existing.ASA_Note = noteValue;
                } else {
                    // If not exist (edge case), add full data
                    var original = data.find(d => d.ASA_Id === asaId);
                    if (original) {
                        selectedAnswers.push({
                            ASA_SegmentId: original.ASA_SegmentId,
                            ASA_QuestionId: original.ASA_QuestionId,
                            ASA_Id: asaId,
                            ASA_AnswerType: original.ASA_AnswerType,
                            ASA_Note: noteValue
                        });
                    }
                }

                console.log('Note Changed:', selectedAnswers);
            });
        },

        error: function () {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });

    return false;
}

// Utility functions to find segment/question ID by ASA_Id from raw data
function getSegmentIdByAsaId(asaId, data) {
    var found = data.find(item => item.ASA_Id === asaId);
    return found ? found.ASA_SegmentId : null;
}

function getQuestionIdByAsaId(asaId, data) {
    var found = data.find(item => item.ASA_Id === asaId);
    return found ? found.ASA_QuestionId : null;
}


function reassignAssessment() {
    var _data = JSON.stringify({
        entity: {
            AAS_SMME_Id: Id,
            AAS_BA_Id: BAId,
            TransectionType: 'reAssignAssessment'
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignAssessmentToSMME',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //Swal.fire({
                //    title: "Successful..!",
                //    text: "Your changes were saved successfully!",
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});

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

function SaveRecords() {
  
    var hasError = false;
    var firstInvalidInput = null;

    // Clear previous red borders
    $('.noteInput').removeClass('input-error');

    // Validate "No" answers must have notes
    for (var i = 0; i < selectedAnswers.length; i++) {
        var ans = selectedAnswers[i];

        if (ans.ASA_AnswerType === "No" && $.trim(ans.ASA_Note) === "") {
            hasError = true;

            // Add red border to corresponding input
            var $input = $('.noteInput[data-asa-id="' + ans.ASA_Id + '"]');
            $input.addClass('input-error');

            if (!firstInvalidInput) {
                firstInvalidInput = $input;
            }
        }
    }

    if (hasError) {
        if (firstInvalidInput) {
            $('html, body').animate({
                scrollTop: firstInvalidInput.offset().top - 100
            }, 300);
        }

        Swal.fire({
            icon: 'warning',
            title: 'Note Required',
            text: 'Please fill in a note for each "No" answer before submitting.',
            confirmButtonText: 'OK',
            showCancelButton: false,
            showDenyButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });

        return false; // This stops execution
    }



    var _data = JSON.stringify({
        entity: {
            SelectedAnswerList: selectedAnswers,
            AASS_Summary: $('#txtSummary').val(),
            AASS_BAId: BAId,
            AASS_SMMEId: Id,
            AASS_IsVerified: AASS_IsVerified,
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateAnswerIsCurrect', // Assuming 'IsCurrect' was a typo
        data: _data,
        contentType: "application/json", // Important for JSON
        //beforeSend: function () {
        //    LoaderStart("#section-block"); // Optional loader
        //},
        success: function (data) {
            if (data && data.IsSuccess) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: {
                        confirmButton: "btn btn-primary waves-effect waves-light"
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                    LoaderStart("#section-block");
                        // Call your function here
                    SendWhatsApp();
                    SendMail();
                        // Optionally reload the page
                        window.location.href = "/Assessment/AssessmnetWiseSMMEByAdmin?AId=" + AId + "&BAId=" + BAId;

                    }
                });
            } else {
                Swal.fire({
                    title: "Oops...",
                    text: data.Message || "An error occurred.",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-primary waves-effect waves-light"
                    },
                    buttonsStyling: false
                });
            }
     

        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: 'Process not complete.',
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-primary waves-effect waves-light"
                },
                buttonsStyling: false
            });
        }
    });
}


//$(document).on('change', 'input[type=radio][value=No]', function (e) {
//    var groupId = $(this).attr('name').replace('answer', ''); // Extract ASA_Id
//    var noteInput = $('#radioGroup' + groupId).closest('tr').find('.noteInput');
//    var noteValue = $.trim(noteInput.val());

//    if (noteValue === '') {
//        // Block selection and show alert
//        e.preventDefault();
//        $(this).prop('checked', false); // Uncheck "No"

//        Swal.fire({
//            icon: 'warning',
//            title: 'Note Required',
//            text: 'Please fill in the note before selecting "No".',
//            confirmButtonText: 'OK'
//        });

//        return false;
//    }
//    chking();
//});

$(document).on('change', 'input[type=radio][value=No]', function (e) {
    chking();
});

$(document).on('change', 'input[type=radio][value=Yes]', function (e) {
    var groupId = $(this).attr('name').replace('answer', '');
    var $noteInput = $('#radioGroup' + groupId).closest('tr').find('.noteInput');

    // Remove red border if it exists
    $noteInput.removeClass('input-error');

    // Continue with your function
    chking();
});

$(document).on('input', '.noteInput', function () {
    if ($.trim($(this).val()) !== '') {
        $(this).removeClass('input-error');
    }
});


function chking() {
    if ($(".rdoNo:checked").length > 0) {

        $("#btnVerified").prop("disabled", true);
        $('#btnNotVerified').removeAttr('disabled');

    } else {
        $("#btnNotVerified").prop("disabled", true);
        $('#btnVerified').removeAttr('disabled');

    }
}

$('#btnVerified').on('click', function () {
    var hasUnanswered = false;
    var firstUnansweredGroup = null;

    // Remove previous error highlighting
    $('.radio-group').removeClass('radio-error');

    // Get all unique radio group names
    var checkedGroups = new Set();

    $('input[type="radio"]').each(function () {
        var name = $(this).attr('name');
        if (!checkedGroups.has(name)) {
            checkedGroups.add(name);

            if ($('input[name="' + name + '"]:checked').length === 0) {
                hasUnanswered = true;

                var $group = $(this).closest('.radio-group');
                $group.addClass('radio-error');

                if (firstUnansweredGroup === null && $group.length > 0) {
                    firstUnansweredGroup = $group;
                }
            }
        }
    });

    // If any unanswered, show alert
    if (hasUnanswered) {
        if (firstUnansweredGroup && firstUnansweredGroup.offset()) {
            $('html, body').animate({
                scrollTop: firstUnansweredGroup.offset().top - 100
            }, 300);
        }

        Swal.fire({
            icon: 'warning',
            title: 'Please attend all the question',
            text: 'Please check at least "Yes" or "No" for all questions.',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });

        return false;
    }


    emailsendAction = 'assessmentverified';
    AASS_IsVerified = 'Completed';
    SaveRecords();
});

$('#btnNotVerified').on('click', function () {
    var hasUnanswered = false;
    var firstUnansweredGroup = null;

    // Remove previous error highlighting
    $('.radio-group').removeClass('radio-error');

    // Get all unique radio group names
    var checkedGroups = new Set();

    $('input[type="radio"]').each(function () {
        var name = $(this).attr('name');
        if (!checkedGroups.has(name)) {
            checkedGroups.add(name);

            if ($('input[name="' + name + '"]:checked').length === 0) {
                hasUnanswered = true;

                var $group = $(this).closest('.radio-group');
                $group.addClass('radio-error');

                if (firstUnansweredGroup === null && $group.length > 0) {
                    firstUnansweredGroup = $group;
                }
            }
        }
    });

    // If any unanswered, show alert
    if (hasUnanswered) {
        if (firstUnansweredGroup && firstUnansweredGroup.offset()) {
            $('html, body').animate({
                scrollTop: firstUnansweredGroup.offset().top - 100
            }, 300);
        }

        Swal.fire({
            icon: 'warning',
            title: 'Please attend all the question',
            text: 'Please check at least "Yes" or "No" for all questions.',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });

        return false;
    }

    //If all questions are answered
    emailsendAction = 'assessmentnotverified';
    AASS_IsVerified = 'Not Verified';
    SaveRecords();
});


$(document).on('change', 'input[type=radio]', function () {
    var groupName = $(this).attr('name');
    $('input[name="' + groupName + '"]').closest('.radio-group').removeClass('radio-error');
});


function retriveSummery(baId, smmeId) {
    
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSummery',
            param1: 'BA_Id',
            param1Value: parseInt(baId),
            param2: 'SmmeId',
            param2Value: parseInt(smmeId),
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
            if(data.length > 0)
            {
            $('#txtSummary').val(data[0].AASS_Summary);
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



function SendMail() {
    //$('#btnUpdateNext').prop('disabled', true);
    //$("#btnUpdateNext").html('Please Wait.....');

    var action = emailsendAction;

    var _data = JSON.stringify({
        emailcontent: {
            CompanyName: $('#hdnSmmeName').val(),
            Email: $('#hdnEmail').val(),
            //Password: $('#txtContact').val().replace(/\s+/g, ''),
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      
        complete: function () {
            LoaderEnd("#section-block");   // Optional loader end
        },
        success: function (data) {
            //retriveSegment(BAId);
            //retriveSummery(BAId, Id)
        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}


$(document).on('input', '.noteInput', function () {
    var maxLength = 160;
    var noteText = $(this).val();

    if (noteText.length > maxLength) {
        // Trim the value to 160 characters
        $(this).val(noteText.substring(0, maxLength));

        Swal.fire({
            icon: 'warning',
            title: 'Note too long!',
            text: 'Note cannot exceed 160 characters.',
            confirmButtonText: 'OK',
            showCancelButton: false,
            showDenyButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });

        return false; // This stops execution

        //// Show SweetAlert
        //Swal.fire({
        //    icon: 'warning',
        //    title: 'Note too long!',
        //    text: 'Note cannot exceed 160 characters.',
        //    confirmButtonColor: '#d33'
        //});
    }
});



function SendWhatsApp() {
    // Get the raw contact number input (from South Africa)
    var rawNumber = $('#hdnPhoneNumber').val().trim().replace(/\s+/g, '');

    // Prepend South African country code (+27)
    //var phoneNumber = '%2B27' + rawNumber;
    var phoneNumber = '+27' + rawNumber;
    //var phoneNumber = '+91' + '9749276281';      ////  this is for self-test

    //var phoneNumber = '%2B918272904682';

    // Get other dynamic values
    var name = $('#hdnSmmeName').val();
  
    var bodyData = '';
    if (AASS_IsVerified == 'Completed') {
        // Build the message body
         bodyData = {
            template_name: "verified",
            broadcast_name: "Verified",
            parameters: [
                { name: "name", value: name },
            ]
        };
    } else if (AASS_IsVerified == 'Not Verified') {
        // Build the message body
         bodyData = {
            template_name: "notverified",
            broadcast_name: "Not-Verified",
            parameters: [
                { name: "name", value: name },
            ]
        };
    }

   


    // Set up request options
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODAxZmNkNS03ZmNiLTQ5OWUtYTYyNy05MGM1ZjJlYTczNzgiLCJ1bmlxdWVfbmFtZSI6Im9icmllbkBncm93dGh0aWVzLmNvLnphIiwibmFtZWlkIjoib2JyaWVuQGdyb3d0aHRpZXMuY28uemEiLCJlbWFpbCI6Im9icmllbkBncm93dGh0aWVzLmNvLnphIiwiYXV0aF90aW1lIjoiMDgvMDQvMjAyNSAxMjowMToxNiIsInRlbmFudF9pZCI6IjQ2NjU0NiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.eCxKQ6BrIwdad59qIdpFgLZ79BLB-wfsGDq-othRe3Q'
        },
        body: JSON.stringify(bodyData)
    };

    // Final API URL
    var url = 'https://live-mt-server.wati.io/466546/api/v1/sendTemplateMessage?whatsappNumber='+phoneNumber;

    // Send request
    fetch(url, options)
        .then(function (res) { return res.json(); })
        .then(function (res) { console.log(res); })
        .catch(function (err) { console.error(err); });
    //LoaderEnd("#msmeRegPageLoader");
}




