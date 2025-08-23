/**
 * UserManagePermission (cleaned)
 * - Modern syntax, comments, smaller surface area
 * - Kept original function names to avoid breaking external calls
 * - Organized by: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, Bootstrap Tabs, SweetAlert2
 */

// ───────────────────────────────────────────────────────────────────────────────
// bootstrap
// ───────────────────────────────────────────────────────────────────────────────
var userType = '';
var pdId = '';
var smmeId = 0;
var selectedUsers = [];
var userId = 0;
var mainId = 0;

(function () {
  const userTypehdn = $('#hdnUserType').val();
  pdId = getParameterByName('Id');

  if (pdId > 0) {
    retriveEnrId(pdId, function () {
      if (userTypehdn === 'Enr' || userTypehdn === 'EnrUser') {
        $('.admUser').hide();
        const trigger = document.querySelector('[data-bs-target="#navs-pills-justified-enruser"]');
        bootstrap.Tab.getOrCreateInstance(trigger).show();
        retrieveEnterpriseUsers();
      } else {
        $('.admUser').show();
        retrieveAdminUsers();
      }
    });
  } else {
    if (userTypehdn === 'Enr' || userTypehdn === 'EnrUser') {
      $('.admUser').hide();
      const trigger = document.querySelector('[data-bs-target="#navs-pills-justified-enruser"]');
      bootstrap.Tab.getOrCreateInstance(trigger).show();
      retrieveEnterpriseUsers();
    } else {
      $('.admUser').show();
      retrieveAdminUsers();
    }
  }
})();

$('#adminUserCall').on('click', retrieveAdminUsers);
$('#enrUserCall').on('click', retrieveEnterpriseUsers);
$('#smmeUserCall').on('click', retrieveSMMEUsers);

// ───────────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────────
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function collectSelectedUsers() {
  const ids = [];
  $('#userListContainer input.selectItem:checkbox:checked, #enruserListContainer input.selectItem:checkbox:checked, #smmeuserListContainer input.selectItem:checkbox:checked')
    .each(function () {
      const userId = parseInt($(this).val(), 10);
      const parentId = parseInt($(this).next('input.selectItem[type="hidden"]').val(), 10);
      ids.push({ UM_Id: userId, UM_ParentId: parentId });
    });
  return ids;
}

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
function retrieveAdminUsers() {
  userType = 'AdminUser';
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectAllAdminUserForAssign',
      param1: 'UWP_MainId',
      param1Value: parseInt($('#hdnEnterpriseid').val()),
      param2: 'UWP_ProjectId',
      param2Value: parseInt(pdId),
      param4: 'UWP_UserType',
      paramString4: userType,
      StoreProcedure: 'UserWiseProject_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      data = JSON.parse(data);
      let html = '';
      if (!data || data.length === 0) {
        html = '<div class="text-center text-muted py-3">No data found.</div>';
      } else {
        $.each(data, function (index, elem) {
          const name = `${elem.UM_FirstName} ${elem.UM_LastName}`;
          const email = elem.UM_EmailId;
          const initials = (elem.UM_FirstName.charAt(0) + elem.UM_LastName.charAt(0)).toUpperCase();
          const color = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'][Math.floor(Math.random() * 6)];
          const avatar = elem.UM_ProfilePic
            ? `<img src="${elem.UM_ProfilePic}" alt="Avatar" class="rounded-circle">`
            : `<span class="avatar-initial rounded-circle bg-label-${color}">${initials}</span>`;

          html += `<div class="d-flex justify-content-between align-items-center left mb-3">
            <div class="d-flex justify-content-start align-items-center user-name">
              <div class="avatar-wrapper"><div class="avatar me-3">${avatar}</div></div>
              <div class="d-flex flex-column">
                <a href="#" class="text-heading text-truncate"><span class="fw-medium">${name}</span></a>
                <small class="text-muted">${email}</small>
              </div>
            </div>
            <div class="ms-3">
              <input type="checkbox" class="form-check-input selectItem" ${elem.IsChecked === 'checked' ? 'checked' : ''} value="${elem.UM_Id}" id="defaultCheck${index + 1}" />
              <input type="hidden" class="form-input selectItem" value="${elem.UM_ParentId}" />
            </div>
          </div>`;
        });
      }
      $('#userListContainer').html(html);
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

function retrieveEnterpriseUsers() {
  userType = 'EnrUser';
  const enterpriseId = parseInt($('#hdnEnterpriseid').val());
  const projectId = typeof pdId !== 'undefined' ? parseInt(pdId) : 0;

  if (isNaN(enterpriseId) || isNaN(projectId)) {
    Swal.fire({
      title: 'Error',
      text: 'Enterprise ID or Project ID is missing.',
      icon: 'warning',
      customClass: { confirmButton: 'btn btn-warning waves-effect waves-light' },
      buttonsStyling: false
    });
    return;
  }

  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectAllEnterpriseUserForAssign',
      param1: 'UWP_MainId',
      param1Value: enterpriseId,
      param2: 'UWP_ProjectId',
      param2Value: projectId,
      param4: 'UWP_UserType',
      paramString4: userType,
      StoreProcedure: 'UserWiseProject_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (response) {
      let data;
      try { data = typeof response === 'string' ? JSON.parse(response) : response; }
      catch (e) {
        Swal.fire({ title: 'Error', text: 'Failed to parse server response.', icon: 'error', customClass: { confirmButton: 'btn btn-danger waves-effect waves-light' }, buttonsStyling: false });
        return;
      }

      let html = '';
      if (!data || data.length === 0) {
        html = '<div class="text-center text-muted py-3">No data found.</div>';
      } else {
        const colors = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
        $.each(data, function (index, elem) {
          const name = elem.UM_Name || 'No Name';
          const email = elem.UM_EmailId || 'No Email';
          const initials = elem.UM_Prefix || '?';
          const color = colors[Math.floor(Math.random() * colors.length)];
          const avatar = (elem.UM_ProfilePic && elem.UM_ProfilePic !== 'NO')
            ? `<img src="${elem.UM_ProfilePic}" alt="Avatar" class="rounded-circle" style="width:40px;height:40px;">`
            : `<span class="avatar-initial rounded-circle bg-label-${color}">${initials}</span>`;
          const checked = elem.IsChecked === 'checked' ? 'checked' : '';

          html += `<div class="d-flex justify-content-between align-items-center left mb-3">
            <div class="d-flex justify-content-start align-items-center user-name">
              <div class="avatar-wrapper"><div class="avatar me-3">${avatar}</div></div>
              <div class="d-flex flex-column">
                <a href="#" class="text-heading text-truncate"><span class="fw-medium">${name}</span></a>
                <small class="text-muted">${email}</small>
              </div>
            </div>
            <div class="ms-3">
              <input type="checkbox" class="form-check-input selectItem" ${checked} value="${elem.UM_Id}" id="defaultCheck${index + 1}" />
              <input type="hidden" class="form-input selectItem" value="${elem.UM_ParentId}" />
            </div>
          </div>`;
        });
      }

      $('#enruserListContainer').html(html);
    },
    error: function () {
      Swal.fire({
        title: 'Oops...',
        text: 'Failed to retrieve user data.',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
    }
  });
}

function retrieveSMMEUsers() {
  userType = 'SMMEUser';
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectSMMEUsersForAssign',
      param1: 'UWP_ProjectId',
      param1Value: parseInt(pdId),
      param4: 'UWP_UserType',
      paramString4: userType,
      StoreProcedure: 'UserWiseProject_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      data = JSON.parse(data || '[]');

      let html = '';
      if (!data.length) {
        html = '<div class="text-center text-muted py-3">No data found.</div>';
      } else {
        $.each(data, function (index, elem) {
          const name = `${elem.UM_FirstName} ${elem.UM_LastName}`;
          const email = elem.UM_EmailId;
          const initials = elem.UM_Prefix;
          const color = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'][Math.floor(Math.random() * 6)];
          const avatar = (elem.UM_ProfilePic !== 'NO')
            ? `<img src="${elem.UM_ProfilePic}" alt="Avatar" class="rounded-circle">`
            : `<span class="avatar-initial rounded-circle bg-label-${color}">${initials}</span>`;

          html += `<div class="d-flex justify-content-between align-items-center left mb-3">
            <div class="d-flex justify-content-start align-items-center user-name">
              <div class="avatar-wrapper"><div class="avatar me-3">${avatar}</div></div>
              <div class="d-flex flex-column">
                <a href="#" class="text-heading text-truncate"><span class="fw-medium">${name}</span></a>
                <small class="text-muted">${email}</small>
              </div>
            </div>
            <div class="ms-3">
              <input type="checkbox" class="form-check-input selectItem" ${elem.IsChecked === 'checked' ? 'checked' : ''} value="${elem.UM_Id}" id="defaultCheck${index + 1}" />
              <input type="hidden" class="form-input selectItem" value="${elem.UM_ParentId}" />
            </div>
          </div>`;
        });
      }

      $('#smmeuserListContainer').html(html);
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

function SaveRecords() {
  selectedUsers = collectSelectedUsers();
  const payload = JSON.stringify({
    entity: {
      UWP_ProjectId: parseInt(pdId),
      UWP_UserType: userType,
      UserList: selectedUsers
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/InsertUserWiseProject',
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      if (data && data.IsSuccess) {
        Swal.fire({ title: 'Successful..!', text: 'Your changes were saved successfully!', icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
      } else {
        Swal.fire({ title: 'Oops...', text: (data && data.Message) || 'Unknown error', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
}
