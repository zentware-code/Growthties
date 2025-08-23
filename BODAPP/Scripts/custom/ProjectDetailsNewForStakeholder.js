var UserLogoList = '';
var SMMLogoList = '';
var AcivityList = '';
var EntId='';
var Id = 0;
var TaskList='';
var AvailBudgte=0;
var AvailBudgteTask=0;
var AvailBudgteSMME=0;
let shouldPreventChange = true;
"use strict";
var GlobData = [];
let counter = 1;

!(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    ////console.log(path);
    localStorage.setItem('href', path);
})();


function retrivePermission(projectId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectPermissionForStakeholder',
            param1: 'PSP_StakeHolderId',
            param1Value: parseInt($('#hdnUserMainId').val()),
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
        //beforeSend: function () {
        //    LoaderStart("#project-manage-div");
        //},
        //complete: function () {
        //    LoaderEnd("#project-manage-div");
        //},
        success: function (data) {
            data = JSON.parse(data)
            if (data.length > 0) {

                if (data[0].PSP_Task == 'true') {
                    $("#btnTask").removeClass('hideDivProjectDet');
                    $("#btnTask").addClass('showDivProjectDet');
                } else {
                    $("#btnTask").removeClass('showDivProjectDet');
                    $("#btnTask").addClass('hideDivProjectDet');
                }

                if (data[0].PSP_Activity == 'true') {
                    $("#btnAct").removeClass('hideDivProjectDet');
                    $("#btnAct").addClass('showDivProjectDet');
                   
                } else {
                    $("#btnAct").removeClass('showDivProjectDet');
                    $("#btnAct").addClass('hideDivProjectDet');
                   
                }

                if (data[0].PSP_Budget == 'true') {
                    $("#btnBudget").removeClass('hideDivProjectDet');
                    $("#btnBudget").addClass('showDivProjectDet');
                    
                } else {
                    $("#btnBudget").removeClass('showDivProjectDet');
                    $("#btnBudget").addClass('hideDivProjectDet');
                   
                }

                if (data[0].PSP_File == 'true') {
                    $(".btnFile").removeClass('hideDivProjectDet');
                    $(".btnFile").addClass('showDivProjectDet');
                } else {
                    $(".btnFile").removeClass('showDivProjectDet');
                    $(".btnFile").addClass('hideDivProjectDet');
                }

            } else {
               // $('#checkboxTask, #checkboxActivity, #checkboxBudget, #checkboxAll, #checkboxFile').prop('checked', false);
                $("#btnTask, #btnAct, #btnBudget, #btnEdit").hide();
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops..",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}


$(document).ready(function () {
    Id = getParameterByName('Id');
    var Type = getParameterByName('Type');
    if(Type=="SMME")
    {
        $("#btnEdit").css("visibility", "hidden");
        $("#btnBudget").css("visibility", "hidden");
        $("#oparation").css("visibility", "hidden");
        $("#btnAsgnPpl").css("visibility", "hidden");
        $("#btnExpenditure").css("visibility", "hidden");
        $("#btnBranches").css("visibility", "hidden");
    }
    if ($("#hdnUserType").val() == "EnrUser") {
        $("#btnUsers").css("visibility", "hidden");
    }
   
    if (Id > 0) {
        retrive(Id)
        fnSmmeForProject(Id)
        BindGrid(Id,'');
         fnAcitiityList(Id);

    }
    $('tr.header').click(function(){
        $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
    });

    //DropdownBinder.DDLData = {
    //    tableName: "BudgetType_BT",
    //    Text: 'BT_Type',
    //    Value: 'BT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlBudgetType");
    //DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundType");
    //DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundTypeAct");
    //DropdownBinder.Execute();


    //DropdownBinder.DDLData = {
    //    tableName: "CreateActivity_CA",
    //    Text: 'CA_ActivityName',
    //    Value: 'CA_Id',
    //    ColumnName:'CA_ProjectId',
    //    PId:Id

    //};
    //DropdownBinder.DDLElem =  $('#ddlActivity');
    //DropdownBinder.Execute();


    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundTypeTask");
    //DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "TaskDeatils_TD",
    //    Text: 'TD_TaskName',
    //    Value: 'TD_Id',
    //    ColumnName:'TD_ProjectId',
    //    PId:Id

    //};
    //DropdownBinder.DDLElem =  $('#ddlTask');
    //DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "FundType_FT",
    //    Text: 'FT_Type',
    //    Value: 'FT_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlFundTypeSMME");
    //DropdownBinder.Execute();


    //DropdownBinderJoin.DDLData = {
    //    tableName1: "ProjectWiseSmme_PSM",
    //    tableName2: "SMMERegistration_SMME",
    //    Text: 'SMME_CompanyName',
    //    Value: 'PSM_SmmeId',
    //    ColumnName1:'SMME_Id',
    //    ColumnName:'PSM_SmmeId',
    //    Param:'PSM_ProjectId',
    //    PId:Id
    //};
    //DropdownBinderJoin.DDLElem = $("#ddlSMME");
    //DropdownBinderJoin.Execute();


    retrivePermission(Id);
    ProjectWiseUser(Id)

});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: parseInt(id),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {

            $('#progress').html('');
            data = JSON.parse(data);
            //console.log('data fjdfd- ', data)

            $('#hdnEnterPriseid').val(data[0].PD_EnterpriseId);
            $('#pName').text(data[0].PD_ProjectName);
            $('#pCreated').html(data[0].ENR_CompanyName);
            $('#pStart').html(data[0].PD_DurationFromDate);
            $('#pEnd').html(data[0].PD_DurationToDate);
            $('#pDesc').html(data[0].PD_Description);
            $('#hdnBudget').val(data[0].PD_Budget);
            $('#totalBranches').text(data[0].BranchCount);

            $('#ulBnch').html(data[0].Branch);
            if(data[0].Status>0)
            {
                $('#spnProgressPer').html(data[0].Status);
                $('#progress').append('<div class="progress-bar" role="progressbar" style="width:'+data[0].Status+'%;" aria-valuenow="'+data[0].Status+'" aria-valuemin="0" aria-valuemax="100"></div></div>')
           
            }
            else{
                $('#spnProgressPer').html(0);
                $('#progress').append('<div class="progress-bar" role="progressbar" style="width:0%;" aria-valuenow="'+data[0].Status+'" aria-valuemin="0" aria-valuemax="100"></div></div>')
           
            }
           
             
          //  checkForBudget();
                
            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); // Slight delay if needed
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
function SaveBudgetForProject() {
   
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            PD_Id: Id,
            PD_BudgetType: $('#ddlBudgetType').val(),
            PD_Budget: $('#txtBudget').val(),
            TransactionType : "UpdateBudget",
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                $('#hdnBudget').val($('#txtBudget').val());
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {
       
                    if (result.isConfirmed) {
               $('#backDropModal').modal('hide');
            }
            
        
        });
               
}
else {
                Swal.fire({
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

}
},
error: function (data) {
          

    Swal.fire({
        title: 'Oops...',
        text: "Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});

}
function fnAcitiityList(id) {

    let r, t;
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectList',
            param1: 'CA_ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'CreateActivity_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#activityCard");
        //},
        //complete: function () {
        //    LoaderEnd("#activityCard");
        //},
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            AcivityList = '';
            if (count > 0 )
            {
                $.each(data, function (i, v) {
                   
                    AcivityList = AcivityList +'<li class="d-flex mb-3 pb-1"> <div class="chart-progress me-3" data-color="'+["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '" data-series="'+v.Status+'" data-progress_variant="true"></div><div class="row w-100 align-items-center"><div class="col-9"><div class="me-2"><h6 class="mb-2">'+v.CA_ActivityName+'</h6><small>'+v.TotalTask+' Tasks</small></div></div><div class="col-3 text-end"><a href="/Project/TaskList?Id='+v.CA_ProjectId+'&CAId='+v.CA_Id+'" class="btn btn-sm btn-icon btn-label-secondary"><i class="ti ti-chevron-right scaleX-n1-rtl"></i></a></div></div></li>';
                });
              
            }
            
            else {
               
                AcivityList='<div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div>';
            }
       
            $('#ulActivity').append(AcivityList+'<li class="text-center"><a href="/Project/CreateActivityList?Id='+id+'">View all acitivies</a></li>');
            var n,
     s = document.querySelectorAll(".chart-progress"),
     a =
         (s &&
             s.forEach(function (e) {
                 var t = config.colors[e.dataset.color],
                     a = e.dataset.series,
                     s = e.dataset.progress_variant,
                     t =
                         ((t = t),
                         (a = a),
                         {
                             chart: { height: "true" == (s = s) ? 58 : 53, width: "true" == s ? 58 : 43, type: "radialBar" },
                             plotOptions: {
                                 radialBar: {
                                     hollow: { size: "true" == s ? "45%" : "33%" },
                                     dataLabels: { show: "true" == s, value: { offsetY: -10, fontSize: "15px", fontWeight: 500, fontFamily: "Public Sans", color: r } },
                                     track: { background: config.colors_label.secondary },
                                 },
                             },
                             stroke: { lineCap: "round" },
                             colors: [t],
                             grid: { padding: { top: "true" == s ? -12 : -15, bottom: "true" == s ? -17 : -15, left: "true" == s ? -17 : -5, right: -15 } },
                             series: [a],
                             labels: "true" == s ? [""] : ["Progress"],
                         });
                 new ApexCharts(e, t).render();
             }));

            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); // Slight delay if needed
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


function fnSmmeForProject(id) {

    $('#divSmmE').html('');
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseSMMELogoDetails',
            param1: 'PD_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#divSmmE");
        //},
        //complete: function () {
        //    LoaderEnd("#divSmmE");
        //},
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
            if (count > 0 && count == 1)
            {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
                $('#divSmmE').append(SMMLogoList);
            }
            else if (count > 0 && count >1)
            {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
             //   $('#divSmmE').append(SMMLogoList+'<div class="avatar me-2"><span class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip" data-bs-placement="bottom" title="3 more">+3</span></div>');
                $('#divSmmE').append('<div><ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1 open-smm-modal" data-id="' + id + '">' + SMMLogoList + '</ul></div>');
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" ><span class="badge bg-label-danger">No SMME Found</span></div>';
                $('#divSmmE').append(SMMLogoList);
            }

         
            counter++;
            if (counter == 4) {
                setTimeout(() => {
                    console.log('counter: ' + counter);
                    LoaderEnd("#pBudgetblock");
                    counter = 1;
                }, 50); // Slight delay if needed
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
function fnSmmeForTask(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseSMMELogo',
            param1: 'TD_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'TaskDetails_USP'
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
            UserLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {

                    UserLogoList = UserLogoList + v.UM_ProfilePic;

                });
            }
            else {
                UserLogoList = '<div class="d-flex align-items-center" ><span class="badge bg-label-danger">No User Found</span></div>';
            }
         
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


function ShowAllSMME() {
    $("#ulSmmeList").html('');
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseSMMEForEntrp',
            param1: 'EnterpriseId',
            param1Value: parseInt($('#hdnEnterPriseid').val()),
            param2: 'PD_Id',
            param2Value:parseInt($('#hdnProject').val()),
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
                var logo="";
                var index = i + 1;
                if(v.SMME_Logo=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span style="color: white !important;" class="avatar-initial rounded-circle bg- '+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.SMME_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.SMME_CompanyName +'</h6><span>'+ v.SMME_PrimaryContactEmail +'</span></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar  me-2">  <img src="'+ v.SMME_Logo +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.SMME_CompanyName +'</h6><span>'+ v.SMME_PrimaryContactEmail +'</span></div></div>';

                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulSmmeList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.SMME_Id + ")'></div>");
               
            });

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
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
            PSM_EnterpriseId:parseInt($("#hdnEnterPriseid").val()),
            PSM_SmmeId: SmmeId,
            PSM_ProjectId: parseInt($('#hdnProject').val())

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
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                fnSmmeForProject(parseInt($('#hdnProject').val()));
            }
            else {

                Swal.fire({
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

function BindGrid(Id,CAId) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectList',
            param1: 'TD_ProjectId',
            param1Value: Id,
            param2: 'TD_ActivityId',
            param2Value: CAId,
            StoreProcedure: 'TaskDetails_USP'
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#pBudgetblock");
        },
        //complete: function () {
        //    LoaderEnd("#datatable-example");
        //},
        success: function (data, status) {
            data = JSON.parse(data);
            
            let t, a, s;
            s = (isDarkStyle ? ((t = config.colors_dark.borderColor), (a = config.colors_dark.bodyBg), config.colors_dark) : ((t = config.colors.borderColor), (a = config.colors.bodyBg), config.colors)).headingColor;
            var e,
                n = $("#datatable-example"),
               
                r = "/Stakeholder/TaskProgressEnterprise?Mode=V&Id=";
            //v = "/Account/SMMESettings_company?M=E&Id=";
            //w = "/Account/SMMESettings_legalentity?M=E&Id=";
            //x = "/Account/SMMESettings_financial?M=E&Id=";
            //o = { 1: { title: "Pending", class: "bg-label-warning" }, 2: { title: "Active", class: "bg-label-success" }, 3: { title: "Inactive", class: "bg-label-secondary" } };
    
            n.length &&
                (e = n.DataTable({
                    data:data,
                    columns: [  { data: "TD_TaskName" }, { data: "PD_Project" }, { data: "Logo" }, { data: "status" }],                       
                    columnDefs: [
                    
                {
                    targets: 0,
                     
                    render: function (e, t, a, s) {
                        var n = a.TD_TaskName,
                            i = a.CA_ActivityName,
                            u = a.TD_Id,
                            o = a.Logo;
                        return (
                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar me-3">' +
                            (o
                                ? '<img src="' + a.Logo + '" alt="Avatar" class="rounded-circle">'
                                : '<span class="avatar-initial rounded-circle bg-label-' +
                                  ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                  '">' +
                                  (o = (((o = (n = a.TD_TaskName).match(/\b\w/g) || []).shift() || "") + (o.pop() || "")).toUpperCase()) +
                                  "</span>") +
                            '</div></div><div class="d-flex flex-column"><a href="' +
                            r + u +
                            '" class="text-body text-truncate"><span class="fw-medium">' +
                            n +
                            '</span></a><small class="text-muted">' +
                            i +
                            "</small></div></div>"
                        );
                    },
                },
                   {
                       targets: 2,
                       orderable: !1,
                       searchable: !1,
                       render: function (e, t, a, r) {
                           //var array = retriveSMME(a.BA_Id);
                           fnSmmeForTask(a.TD_Id);
                           return '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1 open-smm-modal" data-id="' + a.PD_Id + '">' + SMMLogoList + '</ul>';
                       },
                   },
                {
                    targets: 3,
                    render: function (e, t, a, s) {
                        // Strip HTML from TD_Status if necessary
                        var statusText = $("<div>").html(a.TD_Status).text().trim();

                        // Set progress to 100% if Completed
                        var progressValue = statusText === "Completed" ? 100 : parseInt(a.Status) || 0;

                        return (
                            '<div class="d-flex align-items-center">' +
                                '<div class="progress w-100 me-3" style="height: 6px;">' +
                                    '<div class="progress-bar" style="width: ' + progressValue + '%;" aria-valuenow="' + progressValue + '" aria-valuemin="0" aria-valuemax="100"></div>' +
                                '</div>' +
                                '<span>' + progressValue + '%</span>' +
                            '</div>'
                        );
                    },
                },
            
                    ],
                    lengthMenu: [5, 10, 30, 75, 100],
     
                    order: [[1, "desc"]],
                    dom:
                        '<"row me-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                    language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search.." },
                    buttons: [],
                
                })),
            $(".datatables-users tbody").on("click", ".delete-record", function () {
                e.row($(this).parents("tr")).remove().draw();
            }),
             setTimeout(() => {
                 $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");

                 //      counter++;
                 //if (counter == 4) {
                 LoaderEnd("#pBudgetblock");
                 //    counter = 1;
                 //}
             }, 300);
            LoaderEnd("#pBudgetblock");
},
error: function (xhr, textStatus, errorThrown) {
    alert('request failed');
}
})
}
function retriveprojectbudget(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PD_Id',
            param1Value: parseInt(id),
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
            //data = JSON.parse(data);
    
            $('#txtBudget').val(data["PD_Budget"]);
            $('#ddlBudgetType').val(data["PD_BudgetType"]).change();
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function validateQTY(t) {
    var QTY = $(t).closest('tr').find('td:eq(9)').text();

    if (parseInt($(t).val()) == '' || isNaN(parseInt($(t).val()))) {
       
        Swal.fire({
            title: 'Oops...',
            text: 'Quantity should not be blank',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
   
    var rate = $(t).closest('tr').find('td:eq(5)').text();
    var qtyr = $(t).closest('tr').find("td:eq(6) input[type='text']").val();
    var camt = parseFloat(parseInt(qtyr) * parseFloat(rate)).toFixed(2);
    $(t).closest('tr').find('td:eq(7)').text(camt);
    //var
    totalsum();
       
       
}
function CalculateAmt() {
    $('#txtTotalAmnt').val((
         isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val()))
                                             *
         (isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val()))
         );
}
function AddBudget()

{   
    $('#totalBdgt').val($('#hdnBudget').val());
    
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblBudget");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var i=(rows.length-1);
    tr = $('<tr/>');
                    

    tr.append("<td><select id='ddlFundTypeTbl_"+i+"' name='ddlFundTypeTbl_"+i+"' class='select2 form-select ddlFundTypeTbl' data-allow-clear='true'></select></td>");
    tr.append("<td><input type='text' value =" + $('#txtDesc').val() + "      class='form-control' name='txtDesc_"+i+"' id='txtDesc_"+i+"' ></td>");
    tr.append("<td><input type='text' value =" + $('#txtQty').val() + "    class='form-control' name='txtQty_"+i+"' id='txtQty_"+i+"' onkeyup='cellAmntChngeForBudget(this)'></td>");
    tr.append("<td><input type='text' value =" + $('#txtAmnt').val() + "    class='form-control' name='txtAmnt_"+i+"' id='txtAmnt_"+i+"' onkeyup='cellAmntChngeForBudget(this)'></td>");
                 
    tr.append("<td><input type='text' value =" +  $('#txtTotalAmnt').val() + "  name='txtTotalAmnt_"+i+"' id='txtTotalAmnt_"+i+"' class='form-control' disabled></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClick(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");

  
    

    $('#tblBudget tbody').append(tr);
    
    var drp = $('#ddlFundTypeTbl_'+i+'');
    drp.length &&
        drp.each(function () {
            var drp = $(this);
            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
        });
    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem =  $('#ddlFundTypeTbl_'+i+'');
    DropdownBinder.Execute();

    $('#ddlFundTypeTbl_'+i+'').val($('#ddlFundType').val()).change();
    
    $('#ddlFundType').val(0).change();
    $('.txtModal').val('');
    
}
function deleteconfirmBoxClick(rowNo) {
    Swal.fire({
        title: "Do you want to Delete this Setup?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: !0,
        confirmButtonText: "Yes, Do it!",
        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then((result) => {
       
        if (result.isConfirmed) {
            $(rowNo).closest('tr').remove();


}
});
}

function SaveBudgetDetailsForProject() {
    var tblBudget = document.getElementById("tblBudget");
    var totalAmntTabl=0;
    var BudgetArr = [];
    for (var i = 1; i <= $('#tblBudget tbody tr').length; i++) {
       

        BudgetArr.push({
            PBD_FundName: parseInt($('#ddlFundTypeTbl_'+i+'').val()),
            PBD_Desc: $('#txtDesc_'+i+'').val(),
            PBD_Qty: parseInt($('#txtQty_'+i+'').val()),
            PBD_Amount: parseFloat($('#txtAmnt_'+i+'').val()),
            PBD_TotalAmount: parseFloat($('#txtTotalAmnt_'+i+'').val()),
               
        });
        totalAmntTabl=totalAmntTabl+parseFloat($('#txtTotalAmnt_'+i+'').val());
    }
    if(totalAmntTabl<parseFloat($('#totalBdgt').val()))
    {
        Swal.fire({
            title: 'Oops...',
            text: "Please Add More  Fund!",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        }).then((result) => {
       
            if (result.isConfirmed) {
     $('#exLargeModal').modal('hide');
               
                
    }
        
});
return false;
}


if(totalAmntTabl>parseFloat($('#totalBdgt').val()))
{
    Swal.fire({
        title: 'Oops...',
        text: "Total Budget Exceed"+parseFloat($('#totalBdgt').val()),
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    }).then((result) => {
       
        if (result.isConfirmed) {
 $('#exLargeModal').modal('hide');
               
                
}
        
});
return false;
}

var _data = JSON.stringify({
    entity: {
        list: BudgetArr,
        PBD_ProjectId:Id
    }
}); 
$.ajax({
    type: "POST",
    url: '/ScriptJson/InsertUpdateProjectBudget',
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
            }).then((result) => {
       
                if (result.isConfirmed) {
           $('#exLargeModal').modal('hide');
               
                
        }
        
    });
               
}
else {
    Swal.fire({
        title: 'Oops...',
        text: data.Message,
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
},
error: function (data) {
          

    Swal.fire({
        title: 'Oops...',
        text:"Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});

}

function retriveProjectBudgetDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectBudgetDetails_USP'
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
            $('#totalBdgt').val($('#hdnBudget').val());
            $('#tblBudget tbody').html('');
            var tr;
            for (var i = 0; i < data.length; i++) {
                tr = $('<tr/>');

                tr.append("<td><select id='ddlFundTypeTbl_"+(i+1)+"' name='ddlFundTypeTbl_"+(i+1)+"' class='select2 form-select ddlFundTypeTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input type='text' value =" + data[i].PBD_Desc + "      class='form-control' name='txtDesc_"+(i+1)+"' id='txtDesc_"+(i+1)+"' ></td>");
                tr.append("<td><input type='text' value =" + data[i].PBD_Qty + "    class='form-control' name='txtQty_"+(i+1)+"' id='txtQty_"+(i+1)+"' onkeyup='cellAmntChngeForBudget(this)'></td>");
                tr.append("<td><input type='text' value =" + data[i].PBD_Amount + "    class='form-control' name='txtAmnt_"+(i+1)+"' id='txtAmnt_"+(i+1)+"'  onkeyup='cellAmntChngeForBudget(this)' ></td>");
                 
                tr.append("<td><input type='text' value =" +  data[i].PBD_TotalAmount + "  name='txtTotalAmnt_"+(i+1)+"' id='txtTotalAmnt_"+(i+1)+"' class='form-control' disabled></td>");
                tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClick(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");

  
  
                $('#tblBudget tbody').append(tr);
    
                var drp = $('#ddlFundTypeTbl_'+(i+1)+'');
                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });
                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem =  $('#ddlFundTypeTbl_'+(i+1)+'');
                DropdownBinder.Execute();

                $('#ddlFundTypeTbl_'+(i+1)+'').val(data[i].PBD_FundName).change();
    
                $('#ddlFundType').val(0).change();
                $('.txtModal').val('');
             
              
            }
            

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}


//////////////////////////////////////////////////////////////////////-Activity Budget-//////////////////////////////////////////////////////

function SaveBudgetDistribution()
{ 
    
    var ArrActivity = [];
    var ArrTask = [];
    for (var i = 1; i <= $('#tblActivity tbody tr.header').length; i++) {
        if(($('#childAcitivity'+i+'').val())>0)
        {
           

            ArrActivity.push({
                AWB_Budget: $('#childAcitivity'+i+'').val(),
                AWB_ActivityId: $('#childAcitivityId'+i+'').val(),

            });
        }
        for (var j = 1; j <= $('#tblActivity tbody tr.childrowcls'+i+'').length; j++) {
          

            ArrTask.push({
                TWB_Budget: $('#childTask'+i+j+'').val(),
                TWB_TaskId: $('#childTaskId'+i+j+'').val(),

            });
        }
      
   
    }
    var total=0;
    $('#tblActivity tbody tr').each(function(i, row) {
        $(this).find('input.activity').each(function() {
            
            total=total+parseInt($(this).val());
          
        })
    });
    if(total>parseInt($('#hdnBudget').val()))
    {
        Swal.fire({
            title: 'Oops...',
            text: "Budget Cannot Be Greater Than "+parseInt($('#hdnBudget').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

    }

    else{


        var _data = JSON.stringify({
            entity: {
                ActivityList: ArrActivity,
                TaskList: ArrTask,
                ProjectId: Id,
               
            }
        });
        $.ajax({
            type: "POST",
            url: '/ScriptJson/InsertUpdateBudgetAllocation',
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
                    }).then((result) => {
       
                        if (result.isConfirmed) {
                   $('#modalBudgDistribution').modal('hide');
                    $('#tblActivity tbody').html('');
                }
            
        
            });
               
    }
else {
                Swal.fire({
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

}
},
error: function (data) {
          

    Swal.fire({
        title: 'Oops...',
        text:"Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});

    }
}


function cellAmntChngeForBudget(t) {
  


    var amnt = $(t).closest('tr').find("td:eq(3) input[type='text']").val();
    var qty = $(t).closest('tr').find("td:eq(2) input[type='text']").val();
    var total = isNaN(parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2))==false? parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2):0;
    $(t).closest('tr').find("td:eq(4) input[type='text']").val(total);
    //var
   
       
       
}

function AddActivityBudget()

{   
    if(  parseFloat($('#txtAvailableFund').val())<parseFloat($('#txtAcitivityAmnt').val()))
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Please Enter Amount Less Than '+parseFloat($('#txtAvailableFund').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtAcitivityAmnt').val(0);
        return false;
    }

    
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblActivity");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var i=(rows.length);
    tr = $('<tr/>');
                    
    tr.append("<td><select id='ddlActTbl_"+i+"' name='ddlActTbl_"+i+"' class='select2 form-select ddlActTbl' data-allow-clear='true'></select></td>");
    tr.append("<td><select id='ddlFundTypeActTbl_"+i+"' name='ddlFundTypeActTbl_"+i+"' class='select2 form-select ddlFundTypeActTbl"+$('#ddlFundTypeAct').val()+"' data-allow-clear='true'></select></td>");
    tr.append("<td><input type='text' value =" + $('#txtAcitivityAmnt').val() + "    class='form-control tblActFund"+$('#ddlFundTypeAct').val()+"' name='txtAmntAct_"+i+"' id='txtAmntAct_"+i+"' onkeyup='cellAmntChngeForActivityBudget(this)' ></td>");
                 
    tr.append("<td><input type='hidden'   name='hdnAvailAmnt_"+i+"' id='hdnAvailAmnt_"+i+"' class='hdnAvailAmntTbl"+$('#ddlFundTypeAct').val()+"' ><input type='text'   name='txtAvailAmnt_"+i+"' id='txtAvailAmnt_"+i+"' class='form-control txtAvailAmntTbl"+$('#ddlFundTypeAct').val()+"' disabled></td>");


  
    

    $('#tblActivity tbody').append(tr);
    $('.txtAvailAmntTbl'+$('#ddlFundTypeAct').val()+'').val($('#txtAvailableFund').val());
    $('.hdnAvailAmntTbl'+$('#ddlFundTypeAct').val()+'').val($('#txtAvailableFund').val());
    AvailBudgte=$('#txtAvailableFund').val();

    var drp = $('#ddlFundTypeActTbl_'+i+'');
    var drpAct = $('#ddlActTbl_'+i+'');
    drp.length &&
        drp.each(function () {
            var drp = $(this);
            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
        });

    drpAct.length &&
       drpAct.each(function () {
           var drpAct = $(this);
           drpAct.wrap('<div class="position-relative"></div>'), drpAct.select2({ placeholder: "Select A Activity", dropdownParent: drpAct.parent() });
       });



    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem =  $('#ddlFundTypeActTbl_'+i+'');
    DropdownBinder.Execute();


    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName:'CA_ProjectId',
        PId:Id

    };
    DropdownBinder.DDLElem =  $('#ddlActTbl_'+i+'');
    DropdownBinder.Execute();



    $('#ddlFundTypeActTbl_'+i+'').val($('#ddlFundTypeAct').val()).change();
   
    $('#ddlFundTypeAct').val(0).change();

    
    $('#ddlActTbl_'+i+'').val($('#ddlActivity').val()).change();
    
    $('#ddlActivity').val(0).change();
    $('.txtModal').val('');
  
}
$('#ddlFundTypeAct').on('change', function() {
    if(this.value>0)
    {
        fundWiseAVailBudget(this.value);
  
    }
});
function fundWiseAVailBudget(fundtype) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),

            StoreProcedure: 'ProjectBudgetDetails_USP'
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
           
            var totalallocatMoney=0;
            var table = document.getElementById("tblActivity");
            var rows = table.getElementsByTagName("tr")
            if(rows.length>1)
            {
                $('#tblActivity tbody tr').each(function(i, row) {
                    $(this).find('select.ddlFundTypeActTbl'+fundtype).each(function() {
                   
                        totalallocatMoney=totalallocatMoney+parseInt($(".tblActFund"+fundtype).val());
                      
                    })
                });
            }
             AvailBudgte=(data[0].PBD_AvailbleBudget-totalallocatMoney);
            $('#txtAvailableFund').val((data[0].PBD_AvailbleBudget-totalallocatMoney));
            $('.txtAvailAmntTbl'+fundtype).val((data[0].PBD_AvailbleBudget-totalallocatMoney));

            ////console.log('availbe '+AvailBudgte);
            ////console.log('total '+totalallocatMoney);
            ////console.log('db '+data[0].PBD_AvailbleBudget);
                    },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
function cellAmntChngeForActivityBudget(t) {
  
    //console.log(t.className);

    var AvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='text']").val();
    var hdnAvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='hidden']").val();
    var Amnt = $(t).closest('tr').find("td:eq(2) input[type='text']").val();
    if(Amnt>(Amnt+AvailBudgte))
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Amount Should Be Less Than '  +(Amnt+AvailBudgte),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    
    //var
   
  //  $(t).closest('tr').find("td:eq(3) input[type='text']").val(AvailBudgte-Amnt);
       
}

function cellAmntForActivityBudget(t) {
  


    var AcitivityAmnt = t.value;
    var AvailableFund = $("#txtAvailableFund").val();
  
    if(AcitivityAmnt>AvailableFund)
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Amount Should Be Less Than '  +AcitivityAmnt,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    var Calculation=isNaN(AvailBudgte-AcitivityAmnt)==true?0:(AvailBudgte-AcitivityAmnt);
    $("#txtAvailableFund").val(Calculation);
    //var
   
       
       
}



function SaveBudgetDetailsForActivity() {
    var tblBudget = document.getElementById("tblBudget");
    var totalAmntTabl=0;
    var ActBudgetArr = [];
    for (var i = 1; i <= $('#tblActivity tbody tr').length; i++) {
       

        ActBudgetArr.push({
            AWB_Budget: parseFloat($('#txtAmntAct_'+i+'').val()),
            AWB_ActivityId: parseInt($('#ddlActTbl_'+i+'').val()),
          
            AWB_FundTypeId: parseInt($('#ddlFundTypeActTbl_'+i+'').val()),
            
          
               
        });
      
    }




var _data = JSON.stringify({
    entity: {
        ActivityList: ActBudgetArr,
        ProjectId:Id
    }
}); 
$.ajax({
    type: "POST",
    url: '/ScriptJson/InsertUpdateBudgetAllocationForActivity',
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
            }).then((result) => {
       
                if (result.isConfirmed) {
           $('#modalBudgAcitivity').modal('hide');
               
                
        }
        
    });
               
}
else {
    Swal.fire({
        title: 'Oops...',
        text: data.Message,
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
},
error: function (data) {
          

    Swal.fire({
        title: 'Oops...',
        text: "Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});

}

function retriveActivityBudgetDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAcitivityWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'BudgetAllocation_USP'
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
            $('#tblActivity tbody').html('');
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblActivity");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;
               
                tr = $('<tr/>');
                    
                tr.append("<td><select id='ddlActTbl_"+(i+1)+"' name='ddlActTbl_"+(i+1)+"' class='select2 form-select ddlActTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><select id='ddlFundTypeActTbl_"+(i+1)+"' name='ddlFundTypeActTbl_"+(i+1)+"' class='select2 form-select ddlFundTypeActTbl"+data[i].AWB_FundTypeId+"' data-allow-clear='true'></select></td>");
                tr.append("<td><input type='text' value =" + data[i].AWB_Budget + "    class='form-control tblActFund"+data[i].AWB_FundTypeId+"' name='txtAmntAct_"+(i+1)+"' id='txtAmntAct_"+(i+1)+"' onkeyup='cellAmntChngeForActivityBudget(this)' ></td>");
                 
                tr.append("<td><input type='hidden'   name='hdnAvailAmnt_"+(i+1)+"' id='hdnAvailAmnt_"+(i+1)+"' class='hdnAvailAmntTbl"+data[i].AWB_FundTypeId+"' ><input type='text'   name='txtAvailAmnt_"+(i+1)+"' id='txtAvailAmnt_"+(i+1)+"' class='form-control txtAvailAmntTbl"+data[i].AWB_FundTypeId+"' disabled></td>");


  
    

                $('#tblActivity tbody').append(tr);
                $('.txtAvailAmntTbl'+data[i].AWB_FundTypeId+'').val(data[i].PBD_AvailbleBudget);
                $('.hdnAvailAmntTbl'+data[i].AWB_FundTypeId+'').val(data[i].PBD_AvailbleBudget);
                AvailBudgte=data[i].PBD_AvailbleBudget;

                var drp = $('#ddlFundTypeActTbl_'+(i+1)+'');
                var drpAct = $('#ddlActTbl_'+(i+1)+'');
                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });

                drpAct.length &&
                   drpAct.each(function () {
                       var drpAct = $(this);
                       drpAct.wrap('<div class="position-relative"></div>'), drpAct.select2({ placeholder: "Select A Activity", dropdownParent: drpAct.parent() });
                   });



                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem =  $('#ddlFundTypeActTbl_'+(i+1)+'');
                DropdownBinder.Execute();


                DropdownBinder.DDLData = {
                    tableName: "CreateActivity_CA",
                    Text: 'CA_ActivityName',
                    Value: 'CA_Id',
                    ColumnName:'CA_ProjectId',
                    PId:Id

                };
                DropdownBinder.DDLElem =  $('#ddlActTbl_'+(i+1)+'');
                DropdownBinder.Execute();



                $('#ddlFundTypeActTbl_'+(i+1)+'').val(data[i].AWB_FundTypeId).change();
   
                $('#ddlFundTypeAct').val(0).change();

    
                $('#ddlActTbl_'+(i+1)+'').val(data[i].AWB_ActivityId).change();
    
                $('#ddlActivity').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgAcitivity').modal('show');
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

/////////////////////////////////////////////////////////////////////////////TaskWiseBudget///////////////////////////////////////////////////


function AddTaskBudget()

{   
    if(  parseFloat($('#txtAvailableFundTask').val())<parseFloat($('#txtTaskAmnt').val()))
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Please Enter Amount Less Than '+parseFloat($('#txtAvailableFundTask').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtTaskAmnt').val(0);
        return false;
    }

    
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblTask");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var i=(rows.length);
    tr = $('<tr/>');
                    
    tr.append("<td><select id='ddlTaskTbl_"+i+"' name='ddlTaskTbl_"+i+"' class='select2 form-select ddlTaskTbl' data-allow-clear='true'></select></td>");
    tr.append("<td><select id='ddlFundTypeTaskTbl_"+i+"' name='ddlFundTypeTaskTbl_"+i+"' class='select2 form-select ddlFundTypeTaskTbl"+$('#ddlFundTypeTask').val()+"' data-allow-clear='true'></select></td>");
    tr.append("<td><input type='text' value =" + $('#txtTaskAmnt').val() + "    class='form-control tblTaskFund"+$('#ddlFundTypeTask').val()+"' name='txtAmntTask_"+i+"' id='txtAmntTask_"+i+"' onkeyup='cellAmntChngeForTaskBudget(this)' ></td>");
                 
    tr.append("<td><input type='hidden'   name='hdnAvailTaskAmnt_"+i+"' id='hdnAvailTaskAmnt_"+i+"' class='hdnAvailTaskAmntTbl"+$('#ddlFundTypeTask').val()+"' ><input type='text'   name='txtAvailTaskAmnt_"+i+"' id='txtAvailTaskAmnt_"+i+"' class='form-control txtAvailTaskAmntTbl"+$('#ddlFundTypeTask').val()+"' disabled></td>");


  
    

    $('#tblTask tbody').append(tr);
    $('.txtAvailTaskAmntTbl'+$('#ddlFundTypeTask').val()+'').val($('#txtAvailableFundTask').val());
    $('.hdnAvailTaskAmntTbl'+$('#ddlFundTypeTask').val()+'').val($('#txtAvailableFundTask').val());
    AvailBudgteTask=$('#txtAvailableFundTask').val();

    var drp = $('#ddlFundTypeActTbl_'+i+'');
    var drpTask = $('#ddlTaskTbl_'+i+'');
    drp.length &&
        drp.each(function () {
            var drp = $(this);
            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
        });

    drpTask.length &&
       drpTask.each(function () {
           var drpTask = $(this);
           drpTask.wrap('<div class="position-relative"></div>'), drpTask.select2({ placeholder: "Select A Task", dropdownParent: drpTask.parent() });
       });



    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem =  $('#ddlFundTypeTaskTbl_'+i+'');
    DropdownBinder.Execute();


    DropdownBinder.DDLData = {
        tableName: "TaskDeatils_TD",
        Text: 'TD_TaskName',
        Value: 'TD_Id',
        ColumnName:'TD_ProjectId',
        PId:Id

    };
    DropdownBinder.DDLElem =  $('#ddlTaskTbl_'+i+'');
    DropdownBinder.Execute();



    $('#ddlFundTypeTaskTbl_'+i+'').val($('#ddlFundTypeTask').val()).change();
   
    $('#ddlFundTypeTask').val(0).change();

    
    $('#ddlTaskTbl_'+i+'').val($('#ddlTask').val()).change();
    
    $('#ddlTask').val(0).change();
    $('.txtModal').val('');
  
}
$('#ddlFundTypeTask').on('change', function() {
    if(this.value>0)
    {
        fundWiseAvailBudgetTask(this.value);
  
    }
});



function fundWiseAvailBudgetTask(fundtype) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),

            StoreProcedure: 'ProjectBudgetDetails_USP'
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
           
            var totalallocatMoney=0;
            var table = document.getElementById("tblTask");
            var rows = table.getElementsByTagName("tr")
            if(rows.length>1)
            {
                $('#tblTask tbody tr').each(function(i, row) {
                    $(this).find('select.ddlFundTypeTaskTbl'+fundtype).each(function() {
                   
                        totalallocatMoney=totalallocatMoney+parseInt($(".tblTaskFund"+fundtype).val());
                      
                    })
                });
            }
            AvailBudgteTask=(data[0].PBD_AvailbleBudget-totalallocatMoney);
            $('#txtAvailableFundTask').val((data[0].PBD_AvailbleBudget-totalallocatMoney));
            $('.txtAvailTaskAmntTbl'+fundtype).val((data[0].PBD_AvailbleBudget-totalallocatMoney));

            ////console.log('availbe '+AvailBudgte);
            ////console.log('total '+totalallocatMoney);
            ////console.log('db '+data[0].PBD_AvailbleBudget);
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function cellAmntForTaskBudget(t) {
  


    var TaskAmnt = t.value;
    var AvailableFund = $("#txtAvailableFundTask").val();
  
    if(TaskAmnt>AvailBudgteTask)
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Amount Should Be Less Than '  +AvailBudgteTask,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    var Calculation=isNaN(AvailBudgteTask-TaskAmnt)==true?0:(AvailBudgteTask-TaskAmnt);
    $("#txtAvailableFundTask").val(Calculation);
    //var
   
       
       
}
function cellAmntChngeForTaskBudget(t) {
  
    //console.log(t.className);

    var AvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='text']").val();
    var hdnAvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='hidden']").val();
    var Amnt = $(t).closest('tr').find("td:eq(2) input[type='text']").val();
    if(Amnt>(Amnt+AvailBudgteTask))
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Amount Should Be Less Than '  +(Amnt+AvailBudgteTask),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    
    //var
   
    //  $(t).closest('tr').find("td:eq(3) input[type='text']").val(AvailBudgte-Amnt);
       
}


function SaveBudgetDetailsForTask() {
   
    var totalAmntTabl=0;
    var TaskBudgetArr = [];
    for (var i = 1; i <= $('#tblTask tbody tr').length; i++) {
       

        TaskBudgetArr.push({
            TWB_Budget: parseFloat($('#txtAmntTask_'+i+'').val()),
            TWB_TaskId: parseInt($('#ddlTaskTbl_'+i+'').val()),
          
            TWB_BudgetDistId: parseInt($('#ddlFundTypeTaskTbl_'+i+'').val()),
            
          
               
        });
      
    }




    var _data = JSON.stringify({
        entity: {
            TaskList: TaskBudgetArr,
            ProjectId:Id
        }
    }); 
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForTask',
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
                }).then((result) => {
       
                    if (result.isConfirmed) {
               $('#modalBudgTask').modal('hide');
               
                
            }
        
        });
               
}
else {
    Swal.fire({
        title: 'Oops...',
        text: data.Message,
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
},
error: function (data) {
          

    Swal.fire({
        title: 'Oops...',
        text: "Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});

}



function retriveTaskBudgetDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'BudgetAllocation_USP'
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
            $('#tblTask tbody').html('');
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblTask");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;
               
                tr = $('<tr/>');
                    
                tr.append("<td><select id='ddlTaskTbl_"+(i+1)+"' name='ddlTaskTbl_"+(i+1)+"' class='select2 form-select ddlTaskTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><select id='ddlFundTypeTaskTbl_"+(i+1)+"' name='ddlFundTypeTaskTbl_"+(i+1)+"' class='select2 form-select ddlFundTypeTaskTbl"+data[i].TWB_BudgetDistId+"' data-allow-clear='true'></select></td>");
                tr.append("<td><input type='text' value =" + data[i].TWB_Budget + "    class='form-control tblTaskFund"+data[i].TWB_BudgetDistId+"' name='txtAmntTask_"+(i+1)+"' id='txtAmntTask_"+(i+1)+"' onkeyup='cellAmntChngeForTaskBudget(this)' ></td>");
                 
                tr.append("<td><input type='hidden'   name='hdnAvailTaskAmnt_"+(i+1)+"' id='hdnAvailTaskAmnt_"+(i+1)+"' class='hdnAvailTaskAmntTbl"+data[i].TWB_BudgetDistId+"' ><input type='text'   name='txtAvailTaskAmnt_"+(i+1)+"' id='txtAvailTaskAmnt_"+(i+1)+"' class='form-control txtAvailTaskAmntTbl"+data[i].TWB_BudgetDistId+"' disabled></td>");


  
    

                $('#tblTask tbody').append(tr);
                $('.txtAvailTaskAmntTbl'+data[i].TWB_BudgetDistId+'').val(data[i].PBD_AvailbleBudget);
                $('.hdnAvailTaskAmntTbl'+data[i].TWB_BudgetDistId+'').val(data[i].PBD_AvailbleBudget);
                AvailBudgteTask=data[i].PBD_AvailbleBudget;

                var drp = $('#ddlFundTypeTaskTbl_'+(i+1)+'');
                var drpTask = $('#ddlTaskTbl_'+(i+1)+'');
                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });

                drpTask.length &&
                   drpTask.each(function () {
                       var drpTask = $(this);
                       drpTask.wrap('<div class="position-relative"></div>'), drpTask.select2({ placeholder: "Select A Task", dropdownParent: drpTask.parent() });
                   });



                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem =  $('#ddlFundTypeTaskTbl_'+(i+1)+'');
                DropdownBinder.Execute();


                DropdownBinder.DDLData = {
                    tableName: "TaskDeatils_TD",
                    Text: 'TD_TaskName',
                    Value: 'TD_Id',
                    ColumnName:'TD_ProjectId',
                    PId:Id

                };
                DropdownBinder.DDLElem =  $('#ddlTaskTbl_'+(i+1)+'');
                DropdownBinder.Execute();



                $('#ddlFundTypeTaskTbl_'+(i+1)+'').val(data[i].TWB_BudgetDistId).change();
   
                $('#ddlFundTypeTask').val(0).change();

    
                $('#ddlTaskTbl_'+(i+1)+'').val(data[i].TWB_TaskId).change();
    
                $('#ddlTask').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgTask').modal('show');
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}



//////////////////////////////////////////////////////////////////////////////////Budget For SMME//////////////////////////////////////////////////////////////////////////////


$('#ddlFundTypeSMME').on('change', function() {
    if(this.value>0)
    {
        fundWiseAvailBudgetSMME(this.value);
  
    }
});



function fundWiseAvailBudgetSMME(fundtype) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),

            StoreProcedure: 'ProjectBudgetDetails_USP'
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
           
            var totalallocatMoney=0;
            var table = document.getElementById("tblSMME");
            var rows = table.getElementsByTagName("tr")
            if(rows.length>1)
            {
                $('#tblSMME tbody tr').each(function(i, row) {
                    $(this).find('select.ddlFundTypeSMMETbl'+fundtype).each(function() {
                   
                        totalallocatMoney=totalallocatMoney+parseInt($(".tblSMMEFund"+fundtype).val());
                      
                    })
                });
            }
            AvailBudgteSMME=(data[0].PBD_AvailbleBudget-totalallocatMoney);
            $('#txtAvailableFundSMME').val((data[0].PBD_AvailbleBudget-totalallocatMoney));
            $('.txtAvailSMMEAmntTbl'+fundtype).val((data[0].PBD_AvailbleBudget-totalallocatMoney));

            ////console.log('availbe '+AvailBudgte);
            ////console.log('total '+totalallocatMoney);
            ////console.log('db '+data[0].PBD_AvailbleBudget);
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function cellAmntForSMMEBudget(t) {
  


    var SMMEAmnt = t.value;
    var AvailableFund = $("#txtAvailableFundSMME").val();
  
    if(SMMEAmnt>AvailBudgteSMME)
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Amount Should Be Less Than '  +AvailBudgteSMME,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    var Calculation=isNaN(AvailBudgteSMME-SMMEAmnt)==true?0:(AvailBudgteSMME-SMMEAmnt);
    $("#txtAvailableFundSMME").val(Calculation);
    //var
   
       
       
}



function AddSMMEBudget()

{   
    if(  parseFloat($('#txtAvailableFundSMME').val())<parseFloat($('#txtSMMEAmnt').val()))
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Please Enter Amount Less Than '+parseFloat($('#txtAvailableFundSMME').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtSMMEAmnt').val(0);
        return false;
    }

    
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblSMME");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var m=(rows.length);
    tr = $('<tr/>');
               
    tr.append("<td> <select id='ddlSMMETbl_"+m+"' name='ddlSMMETbl_"+m+"' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
    tr.append("<td><select id='ddlFundTypeSMMETbl_"+m+"' name='ddlFundTypeSMMETbl_"+m+"' class='select2 form-select ddlFundTypeSMMETbl"+$('#ddlFundTypeSMME').val()+"' data-allow-clear='true'></select></td>");
    tr.append("<td><input type='text' value =" + $('#txtSMMEAmnt').val() + "    class='form-control tblSMMEFund"+$('#ddlFundTypeSMME').val()+"' name='txtAmntSMME_"+m+"' id='txtAmntSMME_"+m+"' onkeyup='cellAmntChngeForSMMEBudget(this)' ></td>");
                 
    tr.append("<td><input type='hidden'   name='hdnAvailSMMEAmnt_"+m+"' id='hdnAvailSMMEAmnt_"+m+"' class='hdnAvailSMMEAmntTbl"+$('#ddlFundTypeSMME').val()+"' ><input type='text'   name='txtAvailSMMEAmnt_"+m+"' id='txtAvailSMMEAmnt_"+m+"' class='form-control txtAvailSMMEAmntTbl"+$('#ddlFundTypeSMME').val()+"' disabled></td>");


    $('#tblSMME tbody').append(tr);



    var drp = $('#ddlFundTypeSMMETbl_'+m+'');
    var drpSmme = $('#ddlSMMETbl_'+m+'');
   
    drp.length &&
        drp.each(function () {
            var drp = $(this);
            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
        });

   

       
    drpSmme.length &&
        drpSmme.each(function () {
            var drpSmme = $(this);
            drpSmme.wrap('<div class="position-relative"></div>'), drpSmme.select2({ placeholder: "Select A SMME", dropdownParent: drpSmme.parent() });
        });

    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem =  $('#ddlFundTypeSMMETbl_'+m+'');
    DropdownBinder.Execute();


    DropdownBinderJoin.DDLData = {
        tableName1: "ProjectWiseSmme_PSM",
        tableName2: "SMMERegistration_SMME",
        Text: 'SMME_CompanyName',
        Value: 'PSM_SmmeId',
        ColumnName1:'SMME_Id',
        ColumnName:'PSM_SmmeId',
        Param:'PSM_ProjectId',
        PId:Id
    };
    DropdownBinderJoin.DDLElem = $('#ddlSMMETbl_'+m+'');
    DropdownBinderJoin.Execute();





$('.txtAvailSMMEAmntTbl'+$('#ddlFundTypeSMME').val()+'').val($('#txtAvailableFundSMME').val());
$('.hdnAvailSMMEAmntTbl'+$('#ddlFundTypeSMME').val()+'').val($('#txtAvailableFundSMME').val());
AvailBudgteSMME=$('#txtAvailableFundSMME').val();

 
    $('#ddlFundTypeSMMETbl_'+m+'').val($('#ddlFundTypeSMME').val()).change();
    $('#ddlSMMETbl_'+m+'').val($('#ddlSMME').val()).change();
    $('#ddlFundTypeSMME').val(0).change();
    $('#ddlSMME').val(0).change();
  
    $('.txtModal').val('');
  
}

function cellAmntChngeForSMMEBudget(t) {
  
   

    var AvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='text']").val();
    var hdnAvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='hidden']").val();
    var Amnt = $(t).closest('tr').find("td:eq(2) input[type='text']").val();
    if(Amnt>(Amnt+AvailBudgteSMME))
    {
        Swal.fire({
            title: 'Oops...',
            text: 'Amount Should Be Less Than '  +(Amnt+AvailBudgteSMME),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    
    //var
   
    //  $(t).closest('tr').find("td:eq(3) input[type='text']").val(AvailBudgte-Amnt);
       
}


function SaveBudgetDetailsForSMME() {
   
    var totalAmntTabl=0;
    var SMMEBudgetArr = [];
    for (var i = 1; i <= $('#tblSMME tbody tr').length; i++) {
       

        SMMEBudgetArr.push({
            SWB_Budget: parseFloat($('#txtAmntSMME_'+i+'').val()),
            SWB_SMMEId: parseInt($('#ddlSMMETbl_'+i+'').val()),
          
            SWB_FundTypeId: parseInt($('#ddlFundTypeSMMETbl_'+i+'').val()),
             
        });
      
    }




    var _data = JSON.stringify({
        entity: {
            SMMEWiseBudgetList: SMMEBudgetArr,
            ProjectId:Id
        }
    }); 
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForSMME',
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
                }).then((result) => {
       
                    if (result.isConfirmed) {
               $('#modalBudgSMME').modal('hide');
               
                
            }
        
        });
               
}
else {
    Swal.fire({
        title: 'Oops...',
        text: data.Message,
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
},
error: function (data) {
          

    Swal.fire({
        title: 'Oops...',
        text: "Process Not Complete",
        icon: "error",
        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        buttonsStyling: !1
    });

}
});

}



function retriveSMMEBudgetDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'BudgetAllocation_USP'
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
            //console.log(data);
            $('#tblSMME tbody').html('');
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblSMME");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;
               
                tr = $('<tr/>');
                    
                tr.append("<td><select id='ddlSMMETbl_"+(i+1)+"' name='ddlSMMETbl_"+(i+1)+"' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
                tr.append("<td><select id='ddlFundTypeSMMETbl_"+(i+1)+"' name='ddlFundTypeSMMETbl_"+(i+1)+"' class='select2 form-select ddlFundTypeSMMETbl"+data[i].SWB_FundTypeId+"' data-allow-clear='true'></select></td>");
                tr.append("<td><input type='text' value =" + data[i].SWB_Budget + "    class='form-control tblSMMEFund"+data[i].SWB_FundTypeId+"' name='txtAmntSMME_"+(i+1)+"' id='txtAmntSMME_"+(i+1)+"' onkeyup='cellAmntChngeForSMMEBudget(this)' ></td>");
                 
                tr.append("<td><input type='hidden'   name='hdnAvailSMMEAmnt_"+(i+1)+"' id='hdnAvailSMMEAmnt_"+(i+1)+"' class='hdnAvailSMMEAmntTbl"+data[i].SWB_FundTypeId+"' ><input type='text'   name='txtAvailSMMEAmnt_"+(i+1)+"' id='txtAvailSMMEAmnt_"+(i+1)+"' class='form-control txtAvailSMMEAmntTbl"+data[i].SWB_FundTypeId+"' disabled></td>");


  
    

                $('#tblSMME tbody').append(tr);
                $('.txtAvailSMMEAmntTbl'+data[i].SWB_FundTypeId+'').val(data[i].PBD_AvailbleBudget);
                $('.hdnAvailSMMEAmntTbl'+data[i].SWB_FundTypeId+'').val(data[i].PBD_AvailbleBudget);
                AvailBudgteSMME=data[i].PBD_AvailbleBudget;

                var drp = $('#ddlFundTypeSMMETbl_'+(i+1)+'');
                var drpSMME = $('#ddlSMMETbl_'+(i+1)+'');
                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });

                drpSMME.length &&
                   drpSMME.each(function () {
                       var drpSMME = $(this);
                       drpSMME.wrap('<div class="position-relative"></div>'), drpSMME.select2({ placeholder: "Select A SMME", dropdownParent: drpSMME.parent() });
                   });



                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem =  $('#ddlFundTypeSMMETbl_'+(i+1)+'');
                DropdownBinder.Execute();


               
                DropdownBinderJoin.DDLData = {
                    tableName1: "ProjectWiseSmme_PSM",
                    tableName2: "SMMERegistration_SMME",
                    Text: 'SMME_CompanyName',
                    Value: 'PSM_SmmeId',
                    ColumnName1:'SMME_Id',
                    ColumnName:'PSM_SmmeId',
                    Param:'PSM_ProjectId',
                    PId:Id
                };
                DropdownBinderJoin.DDLElem = $('#ddlSMMETbl_'+(i+1)+'');
                DropdownBinderJoin.Execute();


                $('#ddlFundTypeSMMETbl_'+(i+1)+'').val(data[i].SWB_FundTypeId).change();
   
                $('#ddlFundTypeSMME').val(0).change();

    
                $('#ddlSMMETbl_'+(i+1)+'').val(data[i].SWB_SMMEId).change();
    
                $('#ddlSMME').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgSMME').modal('show');
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

//function ProjectWiseBranchList(Id) {
//    $("#ulBranchList").html("");
//    var _data = JSON.stringify({
//        global: {
//            TransactionType: 'SelectAllBranchOfProject',
//            param1: 'PD_Id',
//            param1Value: parseInt(Id),
//            StoreProcedure: 'ProjectDetails_USP'
//        }
//    });

//    $.ajax({
//        type: "POST",
//        url: URLList.GetList,
//        contentType: "application/json; charset=utf-8",
//        data: _data,
//        dataType: "json",
//        success: function (data) {
//            data = JSON.parse(data);
//            //console.log('This is Enterprise List: ', data);

//            // Set total branch count
//            $('#totalBranches').val(data.totalBranchCount);

//            // Loop through the data
//            $.each(data, function (i, v) {
//                var index = i + 1;

//                // Append branch name and email in a single row
//                $("#branchNameList").append(
//                    "<div class='d-flex mb-3'>" +  // Ensure items align in a row
//                        "<div class='d-flex justify-content-between w-100'>" +
//                            "<div class='d-flex ms-1 me-3'>" +  // Flex container for horizontal alignment
//                                "<h6 class='mb-0'>" + v.BD_Name + "</h6>" +  // Name on the left
//                            "</div>" +
//                        "</div>" +
//                    "</div>"
//                );
//            });
//        },

//        error: function (data) {
//            Swal.fire({
//                title: "Oops...",
//                text: 'Process Not Complete',
//                icon: "error",
//                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//                buttonsStyling: !1
//            });
//        }
//    });
//    return false;
//}


function BranchListForAssign() {
    $("#ulBranchList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllBranchForAssignToSMMEInProjectDash',
            param1: 'UM_MainID',
            param1Value: parseInt($('#hdnUserMainId').val()),
            param2: 'PD_Id',
            param2Value: parseInt(Id),
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

            // //console.log('This is Branch : ',data);

            var count = data.length;
            var isenable = 0;
            $.each(data, function (i, v) {
                var index = i + 1;

                $("#ulBranchList").append(
                     "<li class='d-flex flex-wrap mb-3'>" +
                         "<div class='d-flex justify-content-between w-100'>" +
                            //  Avatar section
                             "<div class='d-flex align-items-center'>" +
                                 "<div class='avatar me-2'>" +
                                     "<img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'>" +
                                 "</div>" +
                                 "<div class='ms-1 me-3'>" +
                                     "<h6 class='mb-0'>" + v.BD_Name + "</h6>" +
                                     "<span class='d-block text-muted'>" + v.BD_Email + "</span>" +  // Added d-block to ensure span breaks to next line
                                 "</div>" +
                             "</div>" +
                             // Checkbox section
                             "<div class='form-check form-switch align-self-center'>" +  // Align checkbox vertically in the center
                                 "<input class='float-end form-check-input' type='checkbox' " + (v.IsAssigned ? 'checked="checked"' : '') + " id='chkId_" + index + "' onclick='AssignBranch(" + index + ", " + v.BD_Id + ")' " + v.BranchStatus + ">" +
                             "</div>" +
                         "</div>" +
                     "</li>"
                 );
            });
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
    return false;
}

function AssignBranch(index, BD_Id) {
    var Transaction = "";

    if ($('#chkId_' + index).is(':checked')) {
        Transaction = "AssignProjectToBranch";
    } else {
        Transaction = "UnAssignProjectToBranch";
    }

    var _data = JSON.stringify({
        entity: {
            BWP_ProjectId: parseInt(Id),
            BD_Id: BD_Id,
            TransactionType: Transaction
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToBranch',
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
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}


$('#btnBranches').on('click', function () {
    BranchListForAssign();
});


$('#btnBudget').on('click', function () {
    redirectBudget();
});

$('#btnExpenditure').on('click', function () {
    //redirectBudget();
    redirectExpendi();
});

function redirectBudget() {
    var url = "/StakeHolder/ProjectBudgetDashboard?Id=" + $('#hdnProject').val() + "&ENR_Id=" + $('#hdnEnterPriseid').val();
    window.location.href = url;
}

function redirectExpendi() {
    var url = "/StakeHolder/ProjectFundExpenditure?Id=" + $('#hdnProject').val() + "&ENR_Id=" + $('#hdnEnterPriseid').val();
    window.location.href = url;
}


function ShowAllSMMEClkLogo() {

    $("#ulSmmeListClkLogog").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseSMMEForEntrpForDash',
            param1: 'PD_Id',
            param1Value: parseInt(Id),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#ModalLoad");
        },
        complete: function () {
            LoaderEnd("#ModalLoad");
        },
        success: function (data) {
            data = JSON.parse(data);

            var count = data.length;
            $.each(data, function (i, v) {
                var logo = "";
                var a = v.SMME_CompanyName;
                var b = v.SMME_PrimaryContactEmail;
                var index = i + 1;
                if (v.SMME_Logo == "") {
                    logo = '<a href="/Stakeholder/SMMEProfile_Dashboard?Id=' + v.SMME_Id + '"><div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.SMME_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div></a>';
                }
                else {
                    logo = '<a href="/Stakeholder/SMMEProfile_Dashboard?Id=' + v.SMME_Id + '"><div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.SMME_Logo + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }

                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                //$("#ulSmmeList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.SMME_Id + ",\''" + a + "'\',\''" + b + "'\")'></div>");
                $("#ulSmmeListClkLogog").append("<li class='d-flex flex-wrap mb-3'>" + logo
                     +
                "</li>");

            });
            //// retriveProject(PdId);
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
    return false;

}


function ProjectWiseUser(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllUserByProject',
            param1: 'UWP_ProjectId',
            param1Value: parseInt(Id),
            StoreProcedure: 'UserMaster_USP',
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#enterpriseUserTable");
        //},
        //complete: function () {
        //    LoaderEnd("#enterpriseUserTable");
        //},
        success: function (data) {
            data = JSON.parse(data);

            var tableBody = $("#enterpriseUserTable tbody");
            tableBody.empty(); // Clear previous data

            if (data.length === 0) {
                tableBody.append("<tr><td colspan='7' class='text-center'>No users found.</td></tr>");
                return;
            }

            $.each(data, function (i, item) {
                var profilePic = item.UM_ProfilePic;
                var prefix = item.UM_Prefix;
                var name = item.UM_Name;
                var email = item.UM_EmailId;
                var contact = item.UM_ContactNo || "";
                var role = item.UM_SubRole || "";
                var company = item.EnterpriseName || "";
                var uid = item.UM_Id;
                var parentId = item.UM_ParentId;
                var userType = item.UWP_UserType;
                var enrId = item.ENR_Id;
                var smmeId = item.SMME_Id;
                var UType = item.UserType

                var initials = "";
                var nameMatches = name.match(/\b\w/g);
                if (nameMatches && nameMatches.length > 0) {
                    initials = (nameMatches.shift() || "") + (nameMatches.pop() || "");
                    initials = initials.toUpperCase();
                }

                var colorClasses = ["success", "danger", "warning", "info", "primary", "secondary"];
                var randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

                var avatar = profilePic
                    ? "<img src='" + profilePic + "' alt='Avatar' class='rounded-circle' width='32' height='32' />"
                    : "<span class='avatar-initial rounded-circle bg-label-" + randomColor + "'>" + prefix + "</span>";

                var nameHtml =
                    "<div class='d-flex align-items-center'>" +
                        "<div class='avatar me-2'>" + avatar + "</div>" +
                        "<div class='ms-1'>" +
                            "<p class='mb-0 fw-bold'>" + name + "</p>" +
                            "<span class='text-secondary'>" + email + "</span>" +
                        "</div>" +
                    "</div>";

                var companyLink = "#"; // default for AdminUser or unknown types

                if (UType === "EnrUser") {
                    companyLink = "/Enterprise/EnterpriseProfieView_Profiles?Id=" + enrId;
                } else if (UType === "SMMEUser") {
                    companyLink = "/SMME/SMMEProfile_Dashboard?Id=" + smmeId;
                }

                // company as clickable HTML
                var companyHtml = "<a href='" + companyLink + "' target='_blank'>" + company + "</a>";


                var rowHtml =
                    "<tr>" +
                        "<td>" + nameHtml + "</td>" +
                        "<td>" + contact + "</td>" +
                        "<td>" + role + "</td>" +
                        "<td>" + companyHtml + "</td>" +
                        "<td>" + email + "</td>" +
                        "<td>" + userType + "</td>" +
                    "</tr>";

                tableBody.append(rowHtml);
            });
        },
        error: function () {
            alert("Failed to fetch data.");
        }
    });
}





