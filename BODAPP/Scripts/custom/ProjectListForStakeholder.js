
$(document).ready(function () {
  
    //var path = window.location.pathname;
    //path = path.replace(/\/$/, "");
    //path = decodeURIComponent(path);
    //localStorage.setItem('href', path);

    fnProjectForEnterprise();

});

$('#btnreset').click(function () {
    $('.form-control').val('');
    $('#setUPFormPopUp').removeClass('show');
});

function fnSmmeForEnterprise(ProjectId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseSMMELogo',
            param1: 'PD_Id',
            param1Value: parseInt(ProjectId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
    
            if (count > 0) {
                $.each(data, function (i, v) {
                    if (v.SMME_Logo == null || v.SMME_Logo.trim() === '') {
                        // Skip this item and continue to the next
                        return true; // Equivalent to `continue` in jQuery's $.each
                    }
                    SMMLogoList += v.SMME_Logo;
                });

                // If still empty after filtering
                if (SMMLogoList.trim() === '') {
                    SMMLogoList = '<div class="d-flex align-items-center">No MSME Found</div>';
                }
            } else {
                SMMLogoList = '<div class="d-flex align-items-center">No MSME Found</div>';
            }
        },
        //success: function (data) {
        //    data = JSON.parse(data);
        //    var count = data.length;
        //    console.log(data);
        //    SMMLogoList = '';
        //    if (count > 0) {
        //        $.each(data, function (i, v) {

        //            SMMLogoList = SMMLogoList + v.SMME_Logo;

        //        });
        //    }
        //    else {
        //        SMMLogoList = '<div class="d-flex align-items-center" >No MSME Found</div>';
        //    }
            
        //},
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function fnProjectForEnterprise() {
    var TransactionType=''
    if($('#hdnStakeHolderType').val()=='SU')
    {
        TranType='SelectProjectForStakeholderUser';
    }
    else{
        TranType='SelectProjectForStakeholder';
    }
    var _data = JSON.stringify({
        global: {
            TransactionType: TranType,
            param1: 'EnterpriseId',
            param1Value: parseInt($('#hdnEntrId').val()),
            param2: 'PWS_StakeholderId',
            param2Value: parseInt($('#hdnStakeHolderId').val()),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });
    console.log(_data);
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".section-blockproject");
        },
        complete: function () {
            LoaderEnd(".section-blockproject");
        },
        success: function (data) {

        // console.log('This is Data:  ',data);

            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
              
                if (count > 0) {
                    if($('#hdnStakeHolderType').val()=='SU')
                    { 
                        $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3'><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'></div><div class='me-2 ms-1'><h5 class='mb-0'><a class='text-body stretched-link' onclick='getValue(123)' href='/Stakeholder/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5></div></div><div class='ms-auto'><div class='dropdown z-2'><button aria-expanded='false' class='btn dropdown-toggle hide-arrow p-0' data-bs-toggle='dropdown' type='button'><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class='dropdown-item' href='/Stakeholder/ProjectDetails?Id=" + v.PD_Id + "'>Edit</a></li>" + (v.IsCompleted == 1 ? '' : "<li " + v.VisibilityNone + " ><a class='dropdown-item' onclick='ProjectCompleted(" + v.PD_Id + ")'> Mark as Completed </a></li>") + "<li><a class='dropdown-item' href='/Stakeholder/CreateActivity?Id=" + v.PD_Id + "&M=E'>Create Activity</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class='mb-0' style='width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class='mb-0'>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class='mb-1'>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</p></div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class='mb-1'>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + v.Status + "' role='progressbar'></div></div><div class='d-flex align-items-center pt-1' style='min-height: 40px;'><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1  open-smm-modal' data-id='" + v.PD_Id + "'>" + v.SMMLogoList + "</ul></div></div></div></div>");
                    }
                    else
                    {
                        $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3'><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'></div><div class='me-2 ms-1'><h5 class='mb-0'><a class='text-body stretched-link' onclick='getValue(123)' href='/Stakeholder/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5></div></div><div class='ms-auto'><div class='dropdown z-2'><button aria-expanded='false' class='btn dropdown-toggle hide-arrow p-0' data-bs-toggle='dropdown' type='button'><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class='dropdown-item' href='/Stakeholder/ProjectDetails?Id=" + v.PD_Id + "'>Edit</a></li>" + (v.IsCompleted == 1 ? '' : "<li " + v.VisibilityNone + " ><a class='dropdown-item' onclick='ProjectCompleted(" + v.PD_Id + ")'> Mark as Completed </a></li>") + "<li><a class='dropdown-item' href='/Stakeholder/CreateActivity?Id=" + v.PD_Id + "&M=E'>Create Activity</a></li><li><a class='dropdown-item text-black' data-bs-target='#asignShareholderUser' data-bs-toggle='modal' onclick='showStackUserList(" + v.PD_Id + ");'>Tagging to User</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class='mb-0' style='width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class='mb-0'>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class='mb-1'>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</p></div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class='mb-1'>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='" + v.Status + "' role='progressbar'></div></div><div class='d-flex align-items-center pt-1' style='min-height: 40px;'><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1  open-smm-modal' data-id='" + v.PD_Id + "'>" + v.SMMLogoList + "</ul></div></div></div></div>");
                    }
                     
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
                title: "Oops..!",
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function ProjectCompleted(id) {
   
    var _data = JSON.stringify({
        entity: {
            PD_Id: id,
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/UpdateProjectIsCompleted',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
   // //console.log('gsjfcgsdjff',data)
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                    Swal.fire({
                        title: "Successful..!",
                        text: data.Message,
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    })
                } else {
                    
                    Swal.fire({
                        title: "Oops..!",
                        text: 'This project already completed',
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    });
                }
            } else {
               
                Swal.fire({
                    title: "Oops..!",
                    text: data.Message || "Unexpected error occurred.",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function (data) {
           
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

function showStackUserList(pdid) {
    $("#ulSTUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectStakeholderUserForProjectTagging',
            param2: 'ProjectId',
            param2Value: parseInt(pdid),
            param1: 'UM_MainID',
            //param2Value: parseInt($('#hdnStakeHolderId').val()),
            StoreProcedure: 'UserMaster_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".modal-body");
        },
        complete: function () {
            LoaderEnd(".modal-body");
        },
        success: function (data) {
            data = JSON.parse(data);

            //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable=0;
            $.each(data, function (i, v) {
                
                var logo="";
                var index = i + 1;
                if(v.UM_ProfilePic=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.UM_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.UM_Name +'</h6><span>'+ v.UM_EmailId +'</span></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.UM_ProfilePic +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.UM_Name +'</h6><span>'+ v.UM_EmailId +'</span></div></div>';

                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
               
                
                $("#ulSTUserList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input enr'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='UserTaggingForProject("+ index +"," + pdid + "," + v.ENR_Id + ","+v.UM_Id+")'></div>");
               
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

function UserTaggingForProject( index, pdid, ENR_Id, UM_Id) {
    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {
        TransactionType = 'InsertProjectTagToStUser';
    } else {
        TransactionType = 'UpdateProjectTagToStUser';
    }
    
    var _data = JSON.stringify({
        entity: {
            TransactionType: TransactionType,
            SUP_StakeholderId: parseInt(ENR_Id),
            SUP_ProjectId: parseInt(pdid),
            SUP_UserId: parseInt(UM_Id),
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/TaggingProjectToStakeholderUser',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
            else {

                Swal.fire({
                    title:'Oops..',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}
