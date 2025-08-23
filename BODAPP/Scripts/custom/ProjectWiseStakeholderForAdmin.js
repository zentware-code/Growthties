var SMMELogoList = '';
$(document).ready(function () {
    //$("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 10e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
    fnProjectForAdmin();
    //$("#Loading").ajaxStart(function () {
    //    $(this).show();
    //});

    //$("#Loading").ajaxStop(function () {
    //    $(this).hide();
    //});
});
//$(document).ajaxStart(function () {
//    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

//});
//$(document).ajaxComplete(function () {
//    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3,css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

//});


function fnProjectForAdmin() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllProject',
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function (data) {
            $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

        },
        complete: function (data) {
            $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

        },
        success: function (data) {
            data = JSON.parse(data);

            //console.log('console data:', data);

            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
                if (count > 0) {
                    $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body' href='/Project/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap' ><span class='fw-medium'>Enterprise: </span><span class='text-primary'>" + v.ENR_CompanyName + "</span></div></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/ProjectDetails?Id=" + v.PD_Id + ">Edit</a></li><li><a class=dropdown-item href=/Project/CreateActivity?Id=" + v.PD_Id + "&M=E>Create Activity</a></li><li><button class=dropdown-item onclick=TaskBoard(" + v.PD_Id + ")>Task Board</button></li><li><a class=dropdown-item href=/Home/ManagePermissionForStakeholder?Id=" + v.PD_Id + ">Manage Permission</a></li><li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>" + v.Status + "% Completed</small><button class='btn btn-sm btn-primary py-1' data-bs-target='#asignShareholder' data-bs-toggle='modal' onclick='showEnterpriseList("+v.PD_Id+ ");'>Assign</button></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:" + v.Status + "% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1' style='min-height: 40px;'><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1'>" + v.StakeHolderLogoList + "</ul></div><div class='ms-auto'></div></div></div></div></div>");

                }
                else {
                    $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
                }


            });
            if (count == 0) {
                $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
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

function fnProjectForAdminDetails(TypeId, SegmentId, active) {


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

function ShowAllSMME(id, PdId) {

    EntId = id;
    ProjId = PdId;
    $("#ulSmmeList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseSMME',
            param1: 'EnterpriseId',
            param2: 'PD_Id',
            param1Value: parseInt(id),
            param2Value: parseInt(PdId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            var count = data.length;
            $.each(data, function (i, v) {
                var logo = "";
                var index = i + 1;
                if (v.SMME_Logo == "") {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.SMME_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }
                else {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.SMME_Logo + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';

                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulSmmeList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.SMME_Id + ")'></div>");

            });

        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function TaskBoard(Id) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskForKanban',
            param1: 'TD_ProjectId',
            param1Value: 21,
            StoreProcedure: 'TaskDetails_USP'
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

            var kanbanArray = [];
            for (var ix = 1; ix < data.length; ix++) {
                kanbanArray.push({
                    id: data[ix].id,
                    title: data[ix].title,
                    item: JSON.parse(data[ix].item),

                });
            }
       
          
            //Cookies.set('calender', arrayJobList);
            //localStorage.setItem('kanban', data);
            localStorage.setItem('kanban', JSON.stringify(data));
            window.location.href = '/Project/TaskBoard?='+Id
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

function AssignProject(index, SmmeId) {
    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {

        TransactionType = 'Insert';
    } else {

        TransactionType = 'Update';
    }

    var _data = JSON.stringify({
        entity: {

            TransactionType: TransactionType,
            PSM_EnterpriseId: EntId,
            PSM_SmmeId: SmmeId,
            PSM_ProjectId: ProjId

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToSMME',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Changes Successfully done!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

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
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}


//*************retrive currency*******
function formatNumber(value) {
    let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
    const [integerPart, decimalPart] = number.split('.');

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedInteger + '.' + (decimalPart || '00');
}


function showEnterpriseList(PdId) {

 
    ProjId=PdId;
    //alert(PdId);
    $("#ulEnterpriseList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseForStakeholderForAdmin',
          
            param1: 'PD_Id',
            param1Value: parseInt(PdId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
          var isenable=0;
            $.each(data, function (i, v) {
                
                var logo="";
                var index = i + 1;
                if(v.ENR_Logo=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.ENR_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.ENR_CompanyName +'</h6><span>'+ v.ENR_PrimaryContactEmail +'</span></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.ENR_Logo +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.ENR_CompanyName +'</h6><span>'+ v.ENR_PrimaryContactEmail +'</span></div></div>';

                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulEnterpriseList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input enr'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignStakeholder("+ index +"," + PdId + "," + v.ENR_Id + ")'></div>");
               
            });
            $(".enr").find("checkbox").each(function(){
                if ($(this).prop('checked')==true){ 
                  isenable=1
                }
            });
            if(isenable==0)
            {
                $('.enr').prop('disabled',false);
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


function AssignStakeholder( index, PdId, ENR_Id) {
    //var TransactionType = 'UpdateStakeholder';
    //if($(chk).is(':checked'))
    //{$('.enr').prop('disabled',true);
    //    $(chk).prop('disabled',false);
     
    //}
    //else
    //{
    //    $('.enr').prop('disabled',false);
    //    ENR_Id=0;
    //}

    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {

        TransactionType = 'InsertStakeHolder';
    } else {

        TransactionType = 'UpdateStakeHolder';
    }
    
   

    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            PWS_ProjectId: PdId,
            PWS_StakeholderId:ENR_Id
            //PD_Id: ProjId,
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToStakeholder',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Changes Successfully done!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

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
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}


//function ManagePermission(PD_Id){

//}

