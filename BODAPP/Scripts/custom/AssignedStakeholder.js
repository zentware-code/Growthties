$(document).ready(function () {
    SelectMyStakeholder();
});

function SelectMyStakeholder() {

    var _data = JSON.stringify({
        global: {
          //  TransactionType: "SelectAssignedStakeholders",
            TransactionType: "SelectAssignedStakeholders",
            param1: 'ENR_Id',
            param1Value: parseInt($('#hdnEntrId').val()),
            StoreProcedure: "EnterpriseRegistration_USP"
        }
    });


    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data, status) {
            data = JSON.parse(data);
            //console.log("data : ",data);

            if (Array.isArray(data) && data.length > 0) {

                var content = '';

                for (var i = 0; i < data.length; i++) {
                    var stakeholder = data[i];
                    var defaultLogo = '../Content/assets/img/avatars/default_companyphoto.png';
                    //console.log('ghfdddd', stakeholder)

                    content += '<div class="col-xl-4 col-lg-6 col-md-6">' +
                                   '<div class="card">' +
                                       '<div class="card-body text-center">' +
                                           //'<div class="avatar mx-auto avatar-lg my-3" style="width:6rem!important;height:6rem!important;">' +
                                           //    '<span class="avatar-initial rounded-circle bg-"></span>' +
                                           //'</div>' +
                                           '<div class="mx-auto my-3">' +
                                               '<img src="' + (stakeholder.ENR_CompanyLogo === 'NO' ? defaultLogo : stakeholder.ENR_CompanyLogo) + '" alt="Avatar Image" class=""  style="width:150px; height:auto;display:block;margin:auto"/>' +
                                           '</div>' +
                                           '<h5 class="mb-1 card-title">' + stakeholder.ENR_CompanyName + '</h5>' +
                                           '<span class="pb-1">' + stakeholder.ENR_PrimaryContactEmail + '</span>' +
                                           '<div class="d-flex align-items-center justify-content-around my-3 py-1">' +
                                               '<div>' +
                                                   '<h6 class="mb-0">Projects: <span id="txtProjects_' + stakeholder.id + '">' + stakeholder.TotalProject + '</span></h6>' +
                                               '</div>' +
                                               '<div>' +
                                                   '<h6 class="mb-0">Activities: <span id="txtActivities_' + stakeholder.id + '">' + stakeholder.TotalActivity + '</span></h6>' +
                                               '</div>' +
                                           '</div>' +
                                           '<div class="d-flex align-items-center justify-content-around my-3 py-1">' +
                                               '<div>' +
                                                   '<h6 class="mb-0">Tasks: <span id="txtTasks_' + stakeholder.id + '">' + stakeholder.TotalTask + '</span></h6>' +
                                               '</div>' +
                                               '<div>' +
                                                   '<h6 class="mb-0">Jobs: <span id="txtJobs_' + stakeholder.id + '">' + stakeholder.TotalJob + '</span></h6>' +
                                               '</div>' +
                                           '</div>' +
                                           '<div class="d-flex align-items-center justify-content-around my-3 py-1">' +
                                               '<div>' +
                                                   '<h6 class="mb-0">Assessments: <span id="txtTasks_' + stakeholder.id + '">' + stakeholder.TotalAssessment + '</span></h6>' +
                                               '</div>' +
                                               '<div>' +
                                                   '<h6 class="mb-0">MSMEs: <span id="txtJobs_' + stakeholder.id + '">' + stakeholder.TotalSMME + '</span></h6>' +
                                               '</div>' +
                                           '</div>' +
                                           //'<div class="d-flex align-items-center justify-content-center">' +
                                           //    '<a href="/Stakeholder/StakeHolderDashboard?Id='+ stakeholder.ENR_Id +'" target="_blank" class="btn btn-primary d-flex align-items-center me-3"><i class="ti-xs me-1 ti ti-user-check me-1"></i>View</a>' +
                                           //'</div>' +
                                       '</div>' +
                                   '</div>' +
                               '</div>';
                }

                
                $('#stakeholder-container').html(content);
            } else {
               
                $('#stakeholder-container').html('<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Oops..',
                text: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}
