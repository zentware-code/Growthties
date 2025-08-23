'use strict';
/**
 * BranchWiseSMMEModal (cleaned)
 * - Modern syntax (const/let, template strings, early-returns)
 * - Removed dead code and repeated DOM ops
 * - Kept original public API names for compatibility
 * - Organized by: constants → state → events → functions
 * Dependencies: jQuery, SweetAlert2, Bootstrap modal, project LoaderStart/End helpers.
 */

// ---------- constants ----------
const BADGE_COLORS = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];

// ---------- state ----------
let Id = 0; // kept for backward compatibility with existing calls

// ---------- events ----------
$(document).on('click', '.open-smm-modal', function () {
  // cache the branch id and open modal
  Id = Number($(this).data('id')) || 0;
  $('#shareShowProjectWiseSMME').modal('show');
  ShowAllSMMEClkLogo(); // use cached Id
});

// ---------- functions ----------

/**
 * Utility: get a random badge color class name
 */
const getRandomBadge = () => BADGE_COLORS[Math.floor(Math.random() * BADGE_COLORS.length)] || 'primary';

/**
 * Renders a single SMME list item (logo + text)
 */
const renderSmmeItem = v => {
  const company = v?.SMME_CompanyName ?? '-';
  const email = v?.SMME_PrimaryContactEmail ?? '';
  const href = `/SMME/SMMEProfile_Dashboard?Id=${v?.SMME_Id ?? 0}`;

  // logo block (image or initials)
  const logo = v?.SMME_Logo
    ? `<div class="avatar me-2">
         <img src="${v.SMME_Logo}" alt="Avatar" class="rounded-circle">
       </div>`
    : `<div class="avatar me-2">
         <span class="avatar-initial rounded-circle bg-label-${getRandomBadge()}">
           ${v?.SMME_Prefix ?? (company || 'NA').substring(0, 2).toUpperCase()}
         </span>
       </div>`;

  return `
    <li class="d-flex flex-wrap mb-3">
      <a class="d-flex flex-grow-1 align-items-center text-decoration-none" href="${href}">
        ${logo}
        <div class="ms-1">
          <p class="mb-0 fw-bold">${company}</p>
          <span class="text-secondary">${email}</span>
        </div>
      </a>
    </li>`;
};

/**
 * Loads & renders SMME list for current branch (Id)
 * Kept original name for compatibility.
 */
function ShowAllSMMEClkLogo() {
  const branchId = Number(Id) || 0;

  // clear list fast
  const $list = $('#ulSmmeListClkLogog').empty();

  // guard
  if (!branchId) return false;

  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectBranceWiseSMMEForEntrpForDashee',
      param1: 'BWP_BD_Id',
      param1Value: branchId,
      StoreProcedure: 'ProjectDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: payload,
    beforeSend: () => LoaderStart('.loader-sectionenr'),
    complete:   () => LoaderEnd('.loader-sectionenr'),
    success: (data) => {
      let list = [];
      try { list = JSON.parse(data) || []; } catch { list = []; }

      if (!list.length) {
        $list.append("<li class='text-center text-muted'>No MSME Associated</li>");
        return;
      }

      // build once, insert once
      const markup = list.map(renderSmmeItem).join('');
      $list.append(markup);
    },
    error: () => {
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
