
var seriseDataTask = [];
var seriseLblTask = [];

var seriseDataBEELevel = [];
var seriseLblBEELevel = [];

var seriseDataAssesment = [];
var seriseLblAssesment = [];
var TotalAssemnt;
var TotalTask;
var seriseDataProject = [];
var seriseLblProject = [];

var seriseLblFundType = [];

var seriseAllDataFund = [];
var seriseActivityWiseDataFund = [];

var seriseTaskWiseDataFund = [];
var seriseDataGenderGrp = [];
function retriveTaskDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTask',
            param1:'EnrId',
            param1Value: $('#hdnEnrId').val(),
                StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            var div = '';
            var tblFund = '';
          
            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < data.length; i++) {
                //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';
                seriseDataTask.push(data[i].TotalTask);
                seriseLblTask.push(data[i].Status);
               

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


function retriveAssesmentDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAssesment',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
           
            var div = '';
            var tblFund = '';

            TotalAssemnt = data[0].TotalAssesment;
            seriseDataAssesment.push(data[0].AllocatedAssesment);
            seriseDataAssesment.push(data[0].CompletedAssesment);
            seriseDataAssesment.push(data[0].TotalAssesment - (data[0].CompletedAssesment + data[0].AllocatedAssesment));
            seriseDataAssesment.push(data[0].AllocatedAssesment - (data[0].CompletedAssesment));
            seriseLblAssesment = ["Allocated", "Completed", "UnAllocated", "Pending"]
            //var count = (data.length > 4) ? 4 : data.length;
            //for (var i = 0; i < count; i++) {
            //    //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';
            //    seriseDataTask.push(data[i].TotalTask);
            //    seriseLblTask.push(data[i].Status);


            //}
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
function retriveBEELevelDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBEELevel',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
           
            var div = '';
            var tblFund = '';

            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < data.length; i++) {
                //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';
                seriseDataBEELevel.push(data[i].BEELevl);
                seriseLblBEELevel.push(data[i].BL_Level);


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

function retriveProjectDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAlocatedProject',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            var div = '';
            var tblFund = '';

         
            seriseDataProject.push(data[0].ProjectsLastYr);
            seriseDataProject.push(data[0].ProjectsLastMonth);
            seriseDataProject.push(data[0].TotalProjectsLastWeek);
            seriseLblProject = ["Year", "Month", "Week"]
            //var count = (data.length > 4) ? 4 : data.length;
            //for (var i = 0; i < count; i++) {
            //    //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';
            //    seriseDataTask.push(data[i].TotalTask);
            //    seriseLblTask.push(data[i].Status);


            //}
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

function retriveFundType() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectFundType',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            var div = '';
            var tblFund = '';

            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < data.length; i++) {
                //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';

                seriseLblFundType.push(data[i].FT_Type);


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
function retriveAllFundType() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllFundType',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            var div = '';
            var tblFund = '';

            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < data.length; i++) {
                //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';

                seriseAllDataFund.push(data[i].Amount);


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
function retriveActivityFundType() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectActivityWiseFundType',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            var div = '';
            var tblFund = '';

            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < data.length; i++) {
                //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';

                seriseActivityDataFund.push(data[i].Amount);


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
function retriveTaskFundType() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseFundType',
            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            var div = '';
            var tblFund = '';

            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < data.length; i++) {
                //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';

                seriseTaskDataFund.push(data[i].Amount);


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

function retriveAgeGroup() {

}
function retriveEmployeeGender() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectGenderGroup',

            param1: 'EnrId',
            param1Value: $('#hdnEnrId').val(),
            StoreProcedure: 'EnterpriseDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //console.log(data);
            var div = '';
            var tblFund = '';


            //div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';

            seriseDataGenderGrp.push(data[0].Male);
            seriseDataGenderGrp.push(data[0].Female);



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