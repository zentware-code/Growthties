
var Id = 0;
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
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            data = JSON.parse(data);
            // Clear previous list content
            $("#ulSmmeListClkLogog").html("");

            // Check if data is empty
            if (!data || data.length == 0) {
                $("#ulSmmeListClkLogog").append(
                    "<li class='text-center text-muted'>No MSME Associated</li>"
                );
                return; // Stop further execution
            }

            var count = data.length;
            $.each(data, function (i, v) {
                var logo = "";
                var a = v.SMME_CompanyName;
                var b = v.SMME_PrimaryContactEmail;
                var index = i + 1;
                if (v.SMME_Logo == "") {
                    logo = '<a href="/SMME/SMMEProfile_Dashboard?Id=' + v.SMME_Id + '"><div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.SMME_Prefix + '</span> </div><div class="ms-1"><p class="mb-0 fw-bold">' + v.SMME_CompanyName + '</p><span class="text-secondary">' + v.SMME_PrimaryContactEmail + '</span></div></div></a>';
                }
                else {
                    logo = '<a href="/SMME/SMMEProfile_Dashboard?Id=' + v.SMME_Id + '"><div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.SMME_Logo + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><p class="mb-0 fw-bold">' + v.SMME_CompanyName + '</p><span class="text-secondary">' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }
                $("#ulSmmeListClkLogog").append("<li class='d-flex flex-wrap mb-3'>" + logo
                     +
                "</li>");
            });

                

        },
        error: function (data) {
                LoaderEnd(".loader-sectionenr");

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


$(document).on('click', '.open-smm-modal', function () {
    // Get PD_Id from data attribute
    Id = $(this).data('id');

    // Open modal
    $('#shareShowProjectWiseSMME').modal('show');

    // Call your function
    ShowAllSMMEClkLogo();
});