var uId = '';
$(document).ready(function () {
    uId = getParameterByName('Id');
    retriveUserProfileData();
    retriveSMMEData();
});


function retriveSMMEData() {
    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectUserWiseSMMEList",
            param1: "UM_Id",
            param1Value: parseInt(uId),
            StoreProcedure: "BranchDetails_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            console.log("AJAX raw response:", data);

            // Check and parse data safely
            var smmeList = [];

            // In case it's a stringified JSON array (sometimes happens with ASP.NET)
            if (typeof data === "string") {
                try {
                    smmeList = JSON.parse(data);
                } catch (e) {
                    console.error("Failed to parse JSON", e);
                }
            } else if (Array.isArray(data)) {
                smmeList = data;
            } else if (data.d && Array.isArray(data.d)) {
                smmeList = data.d;
            }

            // Check again to be safe
            if (!Array.isArray(smmeList)) {
                $('#smmeDivs').html('<div class="card"><h3>Invalid Data Format</h3></div>');
                return;
            }

            var html = '';

            if (smmeList.length > 0) {
                $.each(smmeList, function (i, smmeval) {
                    var initialsColor = getRandomColor();

                    var logoHtml = '';
                    if (smmeval.SMME_Logo === "NO") {
                        logoHtml = '<div class="avatar avatar-lg my-3" style="width:6rem;height:6rem;">' +
                            '<span class="avatar-initial rounded-circle bg-' + initialsColor + '" style="display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:24px;">' +
                            smmeval.SMME_Prefix +
                            '</span>' +
                            '</div>';
                    } else {
                        logoHtml = '<div class="my-3" style="width:6rem;height:6rem;">' +
                            '<img src="' + smmeval.SMME_Logo + '" alt="Avatar Image" class="rounded-circle w-100 h-100" />' +
                            '</div>';
                    }

                    html += '<div class="col-xl-4 col-lg-6 col-md-6">' +
                        '<div class="card">' +
                        '<div class="card-header p-0 text-end pt-1 pe-1"></div>' +
                        '<div class="card-body text-center">' +
                        '<div class="d-flex align-items-center">' +
                        logoHtml +
                        '<div class="ms-4 text-start">' +
                        '<h5 class="card-title mb-1">' +
                        '<a href="/SMME/SMMEProfile?Id=' + smmeval.SMME_Id + '">' + smmeval.SMME_CompanyName + '</a>' +
                        '</h5>' +
                        '<p class="mb-1">' + smmeval.SMME_PrimaryContactEmail + '</p>' +
                        '</div>' +
                        '</div>' +
                        '<table class="tableDisplay table table-borderless text-center my-3">' +
                        '<tr>' +
                        '<th style="width:30%">Created:</th>' +
                        '<td>' + smmeval.SMME_CreatedDate + '</td>' +
                        '<th style="width:30%">Budget Allocated:</th>' +
                        '<td>R <span class="total-budget">' + smmeval.TotalBudgetAllocated + '</span></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Projects:</th>' +
                        '<td>' + smmeval.TotalCompletedProject + '/' + smmeval.TotalProject + '</td>' +
                        '<th>Assessments:</th>' +
                        '<td>' + smmeval.TotalCompletedAssessment + '/' + smmeval.TotalAssessment + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Activities:</th>' +
                        '<td>' + smmeval.TotalCompletedActivity + '/' + smmeval.TotalActivity + '</td>' +
                        '<th>Jobs:</th>' +
                        '<td>' + smmeval.TotalCompletedJob + '/' + smmeval.TotalJob + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>Tasks:</th>' +
                        '<td>' + smmeval.TotalCompletedTask + '/' + smmeval.TotalTask + '</td>' +
                        '<th>Team:</th>' +
                        '<td>' + smmeval.TotalTeam + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '<div class="d-flex">' +
                        '<a href="/Project/ProjectListToAssignSMMEFromEnterp" class="btn btn-primary flex-fill me-2" target="_blank">Assign Project</a>' +
                        '<a href="/Assessment/AllAssignAssessmnetByAdminForSingleSMME?Id=' + smmeval.SMME_Id + '" class="btn btn-primary flex-fill" target="_blank">Assessments</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                });
            } else {
                html = '<div class="card">' +
                    '<div class="layout-demo-wrapper">' +
                    '<div><h3>No Data Found</h3><br></div>' +
                    '</div>' +
                    '</div>';
            }

            $('#smmeDivs').html(html);
        },

        error: function (data) {
                LoaderEnd(".loader-sectionenr");
            
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

function getRandomColor() {
    var colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    return colors[Math.floor(Math.random() * colors.length)];
}




function retriveUserProfileData() {
    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectUserProfileProjectPageHeader",
            param1: "UM_Id",
            param1Value: parseInt(uId),
            StoreProcedure: "UserMaster_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            $('#spnHeadName').text(data[0].UM_Name);
            $('#spnHeadRole').text(data[0].UM_SubRole);
            $('#spnHeadBranch').text(data[0].BD_Name);
            $('#spnDate').text(data[0].UM_CreatedAt);

            if (data && data[0]) {
                const profilePic = data[0].UM_ProfilePic;
                const prefix = data[0].UM_Prefix || "";
                const fullName = data[0].UM_Name || "";

                const initials = (fullName.match(/\b\w/g) || [])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() || prefix.toUpperCase();

                const bgColors = ["primary", "secondary", "success", "danger", "warning", "info"];
                const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

                if (!profilePic || profilePic === "NO" || profilePic === "") {
                    $('#spnanAvtar').hide();
                    $('#spnanInitials')
                        .text(initials)
                        .show()
                        .parent()
                        .removeClass()
                        .addClass(`d-flex justify-content-center align-items-center bg-${randomColor} text-white fw-bold`)
                        .css({ width: '100%', height: '100px', fontSize: '33px' });
                } else {
                    $('#spnanInitials').hide();
                    $('#spnanAvtar').attr('src', profilePic).show();
                }
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


//var uId = $('#hdnId').val(); // Get user ID from hidden input

$('.nav-link').on('click', function () {
    var target = $(this).data('target');
    var url = "";

    if (target === "Profile") {
        url = "/Home/UserProfileDetails?Id=" + uId;
    } else if (target === "MSMEs") {
        //url = "/Home/UserWiseSMME?Id=" + uId;
        return;
    } else if (target === "Areas") {
        url = "/Home/UserWiseArea?Id=" + uId;
    } else if (target === "Projects") {
        url = "/Home/UserWiseProject?Id=" + uId;
    }

    if (url !== "") {
        window.location.href = url;
    }
});

