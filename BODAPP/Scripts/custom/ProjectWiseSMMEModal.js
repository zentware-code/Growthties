/**
 * ProjectWiseSMMEModal (cleaned)
 * - Keep function names & behavior
 * - Organization: helpers → API → actions
 * Dependencies: jQuery, Bootstrap Modal, SweetAlert2, LoaderStart/End (optional)
 */

// ───────────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────────
function randomBgClass() {
  const classes = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
  return classes[Math.floor(Math.random() * classes.length)];
}

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
var Id = 0;
function ShowAllSMMEClkLogo() {
  $('#ulSmmeListClkLogog').html('');

  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectEnterpriseWiseSMMEForEntrpForDash',
      param1: 'PD_Id',
      param1Value: parseInt(Id),
      StoreProcedure: 'ProjectDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    beforeSend: function () { LoaderStart('.loader-sectionenr'); },
    complete: function () { LoaderEnd('.loader-sectionenr'); },
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      $('#ulSmmeListClkLogog').empty();

      if (!rows.length) {
        $('#ulSmmeListClkLogog').append("<li class='text-center text-muted'>No MSME Associated</li>");
        return;
      }

      rows.forEach(v => {
        const href = `/SMME/SMMEProfile_Dashboard?Id=${v.SMME_Id}`;
        const avatar = v.SMME_Logo
          ? `<div class="avatar me-2"><img src="${v.SMME_Logo}" alt="Avatar" class="rounded-circle"></div>`
          : `<div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-${randomBgClass()}">${v.SMME_Prefix || ''}</span></div>`;

        $('#ulSmmeListClkLogog').append(
          `<li class='d-flex flex-wrap mb-3'>
            <a href="${href}" class="d-flex flex-grow-1 text-decoration-none">
              ${avatar}
              <div class="ms-1">
                <p class="mb-0 fw-bold">${v.SMME_CompanyName || ''}</p>
                <span class="text-secondary">${v.SMME_PrimaryContactEmail || ''}</span>
              </div>
            </a>
          </li>`
        );
      });
    },
    error: function () {
      LoaderEnd('.loader-sectionenr');
      Swal.fire({
        title: 'Oops...',
        text: 'Process Not Complete',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
    }
  });
  return false;
}

// ───────────────────────────────────────────────────────────────────────────────
// actions
// ───────────────────────────────────────────────────────────────────────────────
$(document).on('click', '.open-smm-modal', function () {
  Id = $(this).data('id');          // PD_Id
  $('#shareShowProjectWiseSMME').modal('show');
  ShowAllSMMEClkLogo();
});
