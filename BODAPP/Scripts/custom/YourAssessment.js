
$(document).ready(function () {

    //retrive();
    fnTypeWiseAssessment();

});
function fnTypeWiseAssessment() {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTypeWiseAssessment',
            Param: 'BA_Id',
            param1: 'TypeId',
            param1Value: 2,
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
                if (index < count)
                {
                    line="<div class='line'><i class='ti ti-chevron-right'></i></div>";
                }
               
                $("#dvStep").append("<div class='step "+active+"' data-target='#Segment_" + v.BA_QuestionSegmentId + "'><button type='button' class='step-trigger'><span class='bs-stepper-circle'>" + index + "</span><span class='bs-stepper-label'><span class='bs-stepper-title'>" + v.Segment + "</span><span class='bs-stepper-subtitle'>Contact Information</span></span></button></div>"+line+"");
                
                fnTypeSegmentWiseAssessment(2, v.BA_QuestionSegmentId,active)

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
function fnTypeSegmentWiseAssessment(TypeId,SegmentId,active) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSegmentWiseAssessment',
            Param: 'BA_Id',
            param1: 'TypeId',
            param2: 'SegmentId',
            param1Value: TypeId,
            param2Value: SegmentId,
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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

            $("#dvStepDetails").append("<div id='Segment_" + SegmentId + "' class='content " + active + "'><br><div class='row g-3'><div class='col-sm-6'><label class='form-label' for='multiStepsUsername'>Name</label><input type='text' name='txtContactName' id='txtContactName' class='form-control' placeholder='johndoe'> <input type='hidden' id='hdnId' name='hdnId'></div><div class='col-12 d-flex justify-content-between mt-4'><button class='btn btn-label-secondary btn-prev' disabled='disabled'><i class='ti ti-arrow-left ti-xs me-sm-1 me-0'></i><span class='align-middle d-sm-inline-block d-none'>Previous</span></button><button class='btn btn-primary btn-next'><span class='align-middle d-sm-inline-block d-none me-sm-1 me-0'>Next</span><i class='ti ti-arrow-right ti-xs'></i></button></div></div></div>");

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



