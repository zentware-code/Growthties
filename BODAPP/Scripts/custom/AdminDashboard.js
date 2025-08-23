var seriseDataTask = [];
var seriseLblTask = [];

var seriseDataBEELevel = [];
var seriseLblBEELevel = [];

var seriseDataAssesment = [];
var seriseLblAssesment = [];

var TotalAssemnt;
var seriseLblFundType = [];

var seriseAllDataFund = [];
var seriseActivityWiseDataFund = [];

var seriseTaskWiseDataFund = [];
var seriseDataGenderGrp = [];
var seriseTaskDataFund = [];
var seriseActivityDataFund = [];

$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    localStorage.setItem('href', path);
});

function retriveTaskDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTask',
            StoreProcedure: 'AdminDashboard_USP'
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
            for (var i = 0; i < data.length; i++) {
                seriseDataTask.push(data[i].TotalTask);
                seriseLblTask.push(data[i].Status);
            }
        },
        error: function () {
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
            StoreProcedure: 'AdminDashboard_USP'
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
            TotalAssemnt = data[0].TotalAssesment;
            seriseDataAssesment.push(data[0].AllocatedAssesment);
            seriseDataAssesment.push(data[0].CompletedAssesment);
            seriseDataAssesment.push(data[0].TotalAssesment - (data[0].CompletedAssesment + data[0].AllocatedAssesment));
            seriseDataAssesment.push(data[0].AllocatedAssesment - data[0].CompletedAssesment);
            seriseLblAssesment = ["Allocated", "Completed", "UnAllocated", "Pending"];
        },
        error: function () {
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
            StoreProcedure: 'AdminDashboard_USP'
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
            for (var i = 0; i < data.length; i++) {
                seriseDataBEELevel.push(data[i].BEELevl);
                seriseLblBEELevel.push(data[i].BL_Level);
            }
        },
        error: function () {
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
            StoreProcedure: 'AdminDashboard_USP'
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
            for (var i = 0; i < data.length; i++) {
                seriseLblFundType.push(data[i].FT_Type);
            }
        },
        error: function () {
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
            StoreProcedure: 'AdminDashboard_USP'
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
            for (var i = 0; i < data.length; i++) {
                seriseAllDataFund.push(data[i].Amount);
            }
        },
        error: function () {
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
            StoreProcedure: 'AdminDashboard_USP'
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
            for (var i = 0; i < data.length; i++) {
                seriseActivityDataFund.push(data[i].Amount);
            }
        },
        error: function () {
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
            StoreProcedure: 'AdminDashboard_USP'
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
            for (var i = 0; i < data.length; i++) {
                seriseTaskDataFund.push(data[i].Amount);
            }
        },
        error: function () {
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
    // Intentionally left blank
}

function retriveEmployeeGender() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectGenderGroup',
            StoreProcedure: 'AdminDashBoard_USP'
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
            seriseDataGenderGrp.push(data[0].Male);
            seriseDataGenderGrp.push(data[0].Female);
        },
        error: function () {
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

