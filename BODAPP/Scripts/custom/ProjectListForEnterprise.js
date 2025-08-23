/**
 * ProjectListForEnterprise (cleaned)
 * - Modern syntax, comments, smaller surface area
 * - Removed legacy/commented blocks
 * - Kept original function names to avoid breaking external calls
 * - Organized by: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, SweetAlert2, select2 (optional), DataTables (optional),
 *               project LoaderStart/End helpers, URLList.GetList endpoints.
 */

// ───────────────────────────────────────────────────────────────────────────────
// bootstrap
// ───────────────────────────────────────────────────────────────────────────────
$(document).ready(function () {
  // Persist current path for back-navigation/context
  const path = decodeURIComponent(window.location.pathname.replace(/\/$/, ''));
  localStorage.setItem('href', path);

  // Initial load
  ProjectListForEnterprise();
});

// ───────────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────────
function clearAndCloseSetupForm() {
  $('.form-control').val('');
  $('#setUPFormPopUp').removeClass('show');
}

// ───────────────────────────────────────────────────────────────────────────────
// init (UI utilities)
// ───────────────────────────────────────────────────────────────────────────────
function showDocument() {
  // Open offcanvas/panel
  $('#setUPFormPopUp').addClass('show');

  // Close handler
  $('.btn-close').off('click').on('click', clearAndCloseSetupForm);
}

// Reset button
$('#btnreset').off('click').on('click', clearAndCloseSetupForm);

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
/**
 * Load SMME logos for a given project and build `SMMLogoList` HTML string.
 * NOTE: Uses global var SMMLogoList to maintain compatibility.
 */
function fnSmmeForEnterprise(ProjectId) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectProjectWiseSMMELogo',
      param1: 'PD_Id',
      param1Value: parseInt(ProjectId, 10),
      StoreProcedure: 'ProjectDetails_USP'
    }
  });

  return $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: payload,
    async: false, // keep original behavior
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      // expose as global string (kept per original)
      window.SMMLogoList = '';

      rows.forEach(v => {
        const logo = (v && v.SMME_Logo || '').trim();
        if (logo) window.SMMLogoList += logo;
      });

      if (!window.SMMLogoList || !window.SMMLogoList.trim()) {
        window.SMMLogoList = '<div class="d-flex align-items-center">No MSME Found</div>';
      }
    },
    error: function () {
      Swal.fire({
        title: 'Oops..',
        text: 'Process Not Success',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
    }
  });
}

/**
 * Load projects card-list HTML for the enterprise/user.
 * Writes HTML into #dvproject.
 */
function ProjectListForEnterprise() {
  const isEnrUser = $('#hdnUserType').val() === 'EnrUser';
  const baseGlobal = {
    StoreProcedure: 'ProjectDetailsForDynamicSelect_USP'
  };

  const global = isEnrUser
    ? Object.assign({}, baseGlobal, {
        TransactionType: 'SelectProjectForEnterpriseForUser',
        param1: 'EnterpriseId',
        param1Value: parseInt($('#hdnEntrId').val(), 10),
        param2: 'UWP_UserId',
        param2Value: parseInt($('#hdnUserId').val(), 10)
      })
    : Object.assign({}, baseGlobal, {
        TransactionType: 'SelectProjectForEnterprise',
        param1: 'EnterpriseId',
        param1Value: parseInt($('#hdnEntrId').val(), 10)
      });

  const payload = JSON.stringify({ global });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetProjectDataDynamically',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: payload,
    beforeSend: function () { LoaderStart('.loader-sectionenr'); },
    complete: function () { LoaderEnd('.loader-sectionenr'); },
    success: function (data) {
      const $container = $('#dvproject').empty();
      if (data && data.OutPutId === 1 && data.OutPutString) {
        $container.append(data.OutPutString);
      } else {
        $container.append(`
          <div class="card">
            <div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div>
          </div>`);
      }
    },
    error: function (xhr, status, error) {
      LoaderEnd('.loader-sectionenr');
      Swal.fire({
        title: 'Oops..',
        text: 'Process Not Successful',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
      console.error('Error response:', xhr && xhr.responseText || error);
    }
  });
  return false;
}

/**
 * Mark a project as Completed.
 * Hides relevant menu items and reloads the page on success (kept original behavior).
 */
function ProjectCompleted(id) {
  const payload = JSON.stringify({ entity: { PD_Id: id } });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/UpdateProjectIsCompleted',
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      if (data && data.IsSuccess === true) {
        if (data.Id > 0) {
          Swal.fire({
            title: 'Good Job..',
            text: data.Message,
            icon: 'success',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
          });
          const projectId = data.Id;
          $(`.dropdown-item[onclick="ProjectCompleted(${projectId})"]`).hide();
          $(`.dropdown-item[href="/Project/CreateActivity?Id=${projectId}&M=E"]`).hide();
          window.location.reload();
        } else {
          Swal.fire({
            title: 'Oops..',
            text: 'This project already completed',
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
          });
        }
      } else {
        Swal.fire({
          title: 'Oops..',
          text: (data && data.Message) || 'Unexpected error occurred.',
          icon: 'error',
          customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
          buttonsStyling: false
        });
      }
    },
    error: function () {
      Swal.fire({
        title: 'Oops..',
        text: 'Process Not Complete',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
    }
  });
}
