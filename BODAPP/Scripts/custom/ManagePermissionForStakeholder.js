var formElem = document.getElementById("formPermission");
var SMMLogoList = '';
var Id = 0;


$(document).ready(function () {
    Id = getParameterByName('Id');
 
    showEnterpriseList(Id);
    fnProjectForAdmin(Id)
});

function fnProjectForAdmin(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllProjectById',
            param1: 'PD_Id',
            param1Value: Id,
            StoreProcedure: 'ProjectDetails_USP'
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

                fnSmmeForEnterprise(Id);
                $("#snglProjectDiv").append("<div class=''><div class='card' style='min-height:365px;height:100%;'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5><div class='client-info ellipsisWrap' id='dvEnterprise'><span class=fw-medium>Enterprise: </span><span class=text-primary>" + v.ENR_CompanyName + "</span></div></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 badge bg-label-info me-auto px-3 py-2 rounded'><h6 class='mb-0 text-info'> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class=' fw-normal text-success'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class=' fw-normal text-danger'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class=' fw-normal text-warning'>0/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'><ul class='d-flex align-items-center avatar-group list-unstyled mb-0 mt-1 z-2'>" + SMMLogoList + "</ul></div><div class=ms-auto></div></div></div></div></div>");
                //if (M == 'E') {
                //    $('#dvEnterprise').css('display', 'none');
                //}
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



//*************retrive currency************
function formatNumber(value) {
    let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
    const [integerPart, decimalPart] = number.split('.');

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedInteger + '.' + (decimalPart || '00');
}

$(document).on('click', '.permissionBtn', function() {
    var StakeHolderId = $(this).data('id');
    var projectId = Id;
    //  $('.permission').prop('checked', true);
    
    $("#stakeHolderId").val(StakeHolderId); 
    retrivePermission(StakeHolderId, projectId);
});

function showEnterpriseList(PdId) {
    ProjId=PdId;
    //alert(PdId);
    $("#ulEnterpriseList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseStakeHolder',
          
            param1: 'PD_Id',
            param1Value: parseInt(PdId),
            StoreProcedure: 'ProjectDetails_USP'
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

            //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable=0;
            $.each(data, function (i, v) {
                
                var logo="";
                var index = i + 1;
                var projectId = ProjId;

                //console.log('Project ID : ',projectId);

                var companyName = '<span class="company-name" data-id="'+ v.ENR_Id +'">'+ v.ENR_CompanyName +'</span>';

                if(v.ENR_Logo=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.ENR_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">' + companyName + '<input type="hidden" data-Pid="'+projectId+'"></h6><span>'+ v.ENR_PrimaryContactEmail +'</span></div><div></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.ENR_Logo +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + companyName + '</h6><span>'+ v.ENR_PrimaryContactEmail +'</span></div></div>';
                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulEnterpriseList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'></div><div><button type='button' class='btn permissionBtn' data-id='"+ v.ENR_Id +"'><i class='ti ti-edit'></i></button></div>");
                //  <input class='float-end form-check-input enr'type=checkbox " + v.IsChked + "  " + v.IsEnabled + " id='chkId_" + index + "' onclick='AssignStakeholder(" + PdId + "," + v.ENR_Id + ",this)'>
               
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

$(document).on('click', '#btnSave', function () {
    SaveRecord(Id);
});

document.getElementById('checkboxAll').addEventListener('change', function() {
        const checked = this.checked;
        document.getElementById('checkboxTask').checked = checked;
        document.getElementById('checkboxActivity').checked = checked;
        document.getElementById('checkboxFile').checked = checked;
        document.getElementById('checkboxBudget').checked = checked;
    });

    const checkboxes = {
        PSP_ALL: document.getElementById('checkboxAll'),
        PSP_Task: document.getElementById('checkboxTask'),
        PSP_Activity: document.getElementById('checkboxActivity'),
        PSP_Budget: document.getElementById('checkboxBudget'),
        PSP_Flies: document.getElementById('checkboxFile')
    };

function SaveRecord(Id) {

    Object.values(checkboxes).forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                const allChecked = Object.values(checkboxes).every(function(cb) {
                    return cb.checked;
                });
                checkboxes.PSP_ALL.checked = allChecked;
            });
        });
    
    var _data = JSON.stringify({
        entity: {
            PSP_StakeHolderId: parseInt($("#stakeHolderId").val()),
            PSP_ProjectId: parseInt(Id),
            PSP_ALL: checkboxes.PSP_ALL.checked,
            PSP_Task: checkboxes.PSP_Task.checked, 
            PSP_Activity: checkboxes.PSP_Activity.checked,
            PSP_Budget: checkboxes.PSP_Budget.checked,
            PSP_Flies: checkboxes.PSP_Flies.checked
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/ManagePermissionForStakeholder',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            if (data && data.IsSuccess) {
                Swal.fire({
                    title: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                window.location.reload();
            } else {
                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

function retrivePermission(StakeHolderId, projectId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectPermissionForStakeholder',
            param1: 'PSP_StakeHolderId',
            param1Value: parseInt(StakeHolderId),
            param2: 'PSP_ProjectId',
            param2Value: parseInt(projectId),
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
            data=JSON.parse(data)
            //console.log('Received Data: ', data);
            if (data.length > 0) {
                $('#checkboxTask').prop('checked', data[0].PSP_Task === 'true');
                $('#checkboxActivity').prop('checked', data[0].PSP_Activity === 'true');
                $('#checkboxBudget').prop('checked', data[0].PSP_Budget === 'true');
                $('#checkboxAll').prop('checked', data[0].PSP_ALL === 'true');
                $('#checkboxFile').prop('checked', data[0].PSP_Flies === 'true');

            } else {
                // If no data, uncheck all
                $('#checkboxTask, #checkboxActivity, #checkboxBudget, #checkboxAll, #checkboxFile').prop('checked', false);
            }
            $('#stakeHolderPermissionModal').modal('show');
        },
 
        //    if(data!=[]){
        //        $('#checkboxTask').prop('checked', data[0].PSP_Task);
        //        $('#checkboxActivity').prop('checked',data[0].PSP_Activity);
        //        $('#checkboxBudget').prop('checked', data[0].PSP_Budget);
        //        $('#checkboxAll').prop('checked', data[0].PSP_ALL);
        //        $('#checkboxFile').prop('checked', data[0].PSP_Flies);
        //    }

        error: function () {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}



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