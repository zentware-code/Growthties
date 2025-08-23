/**
 * ChildPageMenuForEnterprise (cleaned)
 * - Modern syntax, comments, smaller surface area
 * - Kept original function names to avoid breaking external calls
 * - Organized by: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, SweetAlert2, project uses localStorage keys: href, menuId
 */

// ───────────────────────────────────────────────────────────────────────────────
// bootstrap
// ───────────────────────────────────────────────────────────────────────────────
$(document).ready(function () {
  retriveMenuForChild();
});

// ───────────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────────
function getCurentFileName() { // keep original name
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf('/') + 1);
}

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
function retriveMenuForChild() {
  const currentFileName = getCurentFileName();

  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectParentIdForChildForEnt',
      param1: 'MenuURL',
      paramString: currentFileName,
      param2: 'RootMenu',
      paramString2: localStorage.getItem('href'),
      StoreProcedure: 'Menu_SP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransactionSingle1',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      try {
        const rows = typeof data === 'string' ? JSON.parse(data) : data;
        if (Array.isArray(rows) && rows.length > 0) SetMenu(rows[0].RootMenu);
      } catch (e) {
        console.error('Menu parse error', e);
      }
    },
    error: function () {
      Swal.fire({
        title: 'Process Not Complete',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
    }
  });
  return false;
}

// ───────────────────────────────────────────────────────────────────────────────
// actions / renderers
// ───────────────────────────────────────────────────────────────────────────────
function SetMenu(href) {
  const menuId = localStorage.getItem('menuId');
  const rootHref = localStorage.getItem('href');

  $('#menu-right-mini-' + menuId + ' ul li.sbmnu a').each(function () {
    const $a = $(this);

    if (typeof rootHref !== 'undefined' && rootHref == href) {
      if ($a.attr('href') == href) {
        $a.closest('li').addClass('selected');

        if ($a.closest('li').hasClass('navmenu')) {
          const id = 'mini-' + menuId;

          document.querySelectorAll('.mini-nav .mini-nav-item').forEach((el) => el.classList.remove('selected'));
          this.classList.add('selected');

          document.querySelectorAll('.sidebarmenu nav').forEach((nav) => nav.classList.remove('d-block'));
          const menuEl = document.getElementById('menu-right-' + id);
          if (menuEl) menuEl.classList.add('d-block');

          $a.closest('li').addClass('selected');
          $('#mini-' + menuId).addClass('selected active');
          $a.addClass('active');
          document.body.setAttribute('data-sidebartype', 'full');
          $('#main-wrapper').removeClass('show-sidebar');
          $('li#' + id).addClass('selected');
        }
      }
    } else {
      $a.closest('li').removeClass('selected');
      $a.removeClass('active');
      document.body.setAttribute('data-sidebartype', 'mini-sidebar');
      $('#main-wrapper').addClass('show-sidebar');
    }
  });
}
