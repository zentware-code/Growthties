var SMMLogoList = ''
$(document).ready(function () {

    //var mode = $('#hdnMode').val();
    retriveEnterprise();
    retriveBranch();

});

function fnSmmeForEnterprise(BDId) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBranchWiseSMMELogo',
            param1: 'BD_Id',
            param1Value: parseInt(BDId),
            StoreProcedure: 'BranchDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" >No SMME Found</div>';
            }

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

function retriveBranch() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectListForEnterprise',
            param1: 'BD_EnterpriseId',
            param1Value: $('#EnterpriseId').val(),
            StoreProcedure: 'BranchDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#brnch");
        },
        complete: function () {
            LoaderEnd("#brnch");
        },
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
           

                if (count > 0) {
                    //fnSmmeForEnterprise(v.BD_Id);
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class=card><div class=card-header><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=#>Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-3'><div class='d-flex align-items-center flex-wrap'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body border-top'><div class='d-flex align-items-center mb-3'>Task: <span class='text-body fw-normal'>0/0</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No SMME Found</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-edit ti-sm'></i> </a></div></div></div></div></div>");
                    $("#brnch").append('<div class="col-lg-6 col-md-6 col-xl-4"><div class=card><div class=card-body><div class="align-items-center d-flex mb-3"><a class="align-items-center d-flex"href=javascript:;><div class="me-2 avatar"><img alt=Avatar class=rounded-circle src=/Content/assets/img/icons/brands/react-label.png></div><div class="me-2 h5 mb-0 text-body"><span id=spnBranchName>' + v.BD_Name + '</span></div></a></div><ul class="list-unstyled mb-4 mt-3"><li class="align-items-center d-flex mb-3"><i class="text-heading ti ti-building-bank"></i><span class="text-heading fw-medium mx-2">Address:</span> <span id=spnAdress>' + v.BD_AddressLine1 + '</span><li class="align-items-center d-flex mb-3"><i class="text-heading ti ti-mail"></i><span class="text-heading fw-medium mx-2">Email:</span> <span id=spnEmail>' + v.BD_Email + '</span><li class="align-items-center d-flex mb-3"><i class="text-heading ti ti-map-pin"></i><span class="text-heading fw-medium mx-2">Province:</span> <span id=spnProvince>' + v.PM_Province + '</span><li class="align-items-center d-flex mb-3"><i class="text-heading ti ti-flag"></i><span class="text-heading fw-medium mx-2">City:</span> <span id=spnCity>' + v.BD_City + '</span><li class="align-items-center d-flex mb-3"><i class="text-heading ti ti-phone-call"></i><span class="text-heading fw-medium mx-2">Contact No:</span> <span id=spnContact>' + v.BD_ContactNumber + '</span></ul><div class="align-items-center d-flex pt-1"><div class="align-items-center d-flex"><ul class="align-items-center d-flex avatar-group list-unstyled mb-0">' + SMMLogoList + '</ul></div></div></div></div></div>');

                }

                else {
                    $("#brnch").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
                }


            });

            if (count == 0) {
                $("#brnch").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
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

function retriveEnterprise() {

    var _data = JSON.stringify({
        global: {
            TransactionType: "Select",
            Param: "ENR_Id",
          
            StoreProcedure: "EnterpriseRegistration_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {

            $('#spnHeadName').text(data["ENR_CompanyName"]);
            $('#spnHeadRole').text(data["UM_SubRole"]);
            $('#spnCity').text(data["PM_Province"]);
            $('#spnDate').text(data["ENR_CreatedDate"]);
            
            if (data["ENR_Logo"] == "NO") {
                $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
            }
            else {
                $('#prfpicIMG').attr('src', data["ENR_Logo"]);
            }

        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}