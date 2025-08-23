/**
 * BranchWiseArea (cleaned)
 * - Keep function names; modern syntax; comments where helpful
 * - Organization: bootstrap → helpers → API → renderers → actions
 * Dependencies: jQuery, Bootstrap (Offcanvas), SweetAlert2, URLList.GetList, LoaderStart/End
 */

// ───────────────────────────────────────────────────────────────────────────────
// bootstrap
// ───────────────────────────────────────────────────────────────────────────────
$(document).ready(function () {
  window.BId = getParameterByName('BId');
  window.EnrId = getParameterByName('EnrId');
  if (BId) {
    BranchDataRetrive();
    BrancheWiseArea();
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────────
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function initialsFromName(fullName) {
  const matches = (fullName || '').match(/\b\w/g) || [];
  return ((matches.shift() || '') + (matches.pop() || '')).toUpperCase();
}

function randomBgClass() {
  const classes = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
  return classes[Math.floor(Math.random() * classes.length)];
}

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
function BrancheWiseArea() {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectBrancheWiseAreaList',
      param1: 'BD_Id',
      param1Value: parseInt(BId),
      param2: 'BD_EnterpriseId',
      param2Value: parseInt(EnrId),
      StoreProcedure: 'BranchDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    beforeSend: function () { LoaderStart('.loader-sectionenr'); },
    complete: function () { LoaderEnd('.loader-sectionenr'); },
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      $('#dvEnrList').empty();

      if (!rows.length) {
        $('#dvEnrList').append('<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>');
        return;
      }

      rows.forEach(v => {
        const card = [`
          <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="role-heading">
                    <h4 class="mb-1" style="width:245px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                      <i class="text-primary ti-xs ti ti-map-pin me-1 mb-2 p-0 fs-4"></i>${v.BWA_AreaName}
                    </h4>
                  </div>
                  <div class="dropdown z-2">
                    <button class="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown" type="button">
                      <i class="text-muted ti ti-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><button class="dropdown-item" data-bs-target="#asignAreaUser" data-bs-toggle="modal" onclick="showEnrUserList(${v.ENR_Id},${v.BWA_Id})"><i class="ti ti-users me-2"></i>Manage Users</button></li>
                      <li><a href="#" class="dropdown-item" title="View Users" onclick="ShowAllUser(${BId},${v.BWA_Id})" data-bs-dismiss="modal"><i class="ti ti-eye me-2"></i>View Users</a></li>
                      <li><a href="#" class="dropdown-item" title="View MSMEs" onclick="ShowAllSMME('${v.BWA_AreaName}')" data-bs-dismiss="modal"><i class="ti ti-eye me-2"></i>View MSMEs</a></li>
                    </ul>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <a href="#" title="View Users" onclick="ShowAllUser(${BId},${v.BWA_Id})" data-bs-dismiss="modal">
                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">${v.AreaWiseUserLogo || ''}</ul>
                  </a>
                  <div>
                    <span class="badge bg-label-warning">MSME</span>
                    <a title="View MSMEs" onclick="ShowAllSMME('${v.BWA_AreaName}')" data-bs-dismiss="modal">
                      <span class="badge bg-label-info">${v.MSMECount}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `].join('');
        $('#dvEnrList').append(card);
      });
    },
    error: function () {
      LoaderEnd('.loader-sectionenr');
      Swal.fire({ title: 'Process Not Success', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function BranchDataRetrive() {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectBranchData',
      param1: 'BD_Id',
      param1Value: parseInt(BId),
      StoreProcedure: 'BranchDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (response) {
      const data = typeof response === 'string' ? JSON.parse(response) : response;
      if (Array.isArray(data) && data.length) {
        const item = data[0];
        $('#spnanAvtar').text(item.BranchAvatar || '');
        $('#spnHeadName').text(item.BD_Name || '');
        $('#spnCity').text(item.BD_City || '');
        $('#spnHeadEmail').text(item.BD_Email || '');
        $('#spnHeadPhone').text(item.BD_ContactNumber || '');
      } else {
        $('#dvEnrList').html('<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>');
      }
    },
    error: function () {
      Swal.fire({ title: 'Process Not Successful', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });

  return false;
}

function showEnrUserList(enrId, areaId) {
  $('#ulSTUserList').html('');
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectEnterpriseUserForAreaTagging',
      param1: 'BD_EnterpriseId',
      param1Value: parseInt(enrId),
      param2: 'BWA_Id',
      param2Value: parseInt(areaId),
      StoreProcedure: 'BranchDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      let anyEnabled = false;

      rows.forEach((v, i) => {
        const idx = i + 1;
        const avatar = v.UM_ProfilePic
          ? `<div class="avatar me-2"><img src="${v.UM_ProfilePic}" alt="Avatar" class="rounded-circle"></div>`
          : `<div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-${randomBgClass()}">${v.UM_Prefix || initialsFromName(v.UM_Name)}</span></div>`;

        $('#ulSTUserList').append(
          `<li class='d-flex flex-wrap mb-3'>
            <div class="d-flex flex-grow-1">${avatar}<div class="ms-1"><h6 class="mb-0">${v.UM_Name}</h6><span>${v.UM_EmailId}</span></div></div>
            <div class='form-check form-switch'><input class='float-end form-check-input enr' type='checkbox' ${v.checked || ''} id='chkId_${idx}' onclick='AreaTagToEnrUser(${idx},${BId},${areaId},${v.UM_ParentId},${v.UM_Id})'></div>
          </li>`
        );
        if (v.checked) anyEnabled = true;
      });

      if (!anyEnabled) $('.enr').prop('disabled', false);
    },
    error: function () {
      Swal.fire({ title: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function AreaTagToEnrUser(index, BId, areaId, ENR_Id, UM_Id) {
  const Transaction = $('#chkId_' + index).is(':checked') ? 'InsertAreaTagToEnrUser' : 'UpdateAreaTagToEnrUser';
  const payload = JSON.stringify({
    payload: {
      BWAU_BranchId: parseInt(BId),
      BWAU_EnrId: parseInt(ENR_Id),
      BWAU_BWAId: parseInt(areaId),
      BWAU_UserId: parseInt(UM_Id),
      TransactionType: Transaction
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/InsertBranchWiseAreaEnrUser',
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

function ShowAllUser(enrId, areaId) {
  $('#ulUserList').html('');
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectArieaWiseAssiendUsers',
      param1: 'BD_EnterpriseId',
      param1Value: parseInt(enrId),
      param2: 'BWA_Id',
      param2Value: parseInt(areaId),
      StoreProcedure: 'BranchDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    beforeSend: function () { /* optionally LoaderStart*/ },
    complete: function () { /* optionally LoaderEnd*/ },
    success: function (data) {
      const rows = JSON.parse(data || '[]');

      const offcanvasElement = document.getElementById('setUPFormPopUp');
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      bsOffcanvas.show();

      if (!rows.length) {
        $('#ulUserList').append('<div class="card"><div class="layout-demo-wrapper"><div><h5>No Data Found</h5><br></div></div></div>');
        return;
      }

      rows.forEach(v => {
        const avatar = v.UM_ProfilePic
          ? `<div class="avatar me-2"><img src="${v.UM_ProfilePic}" alt="Avatar" class="rounded-circle"></div>`
          : `<div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-${randomBgClass()}">${v.UM_Prefix || initialsFromName(v.UM_Name)}</span></div>`;

        const link = `/Home/UserProfileDetails?Id=${v.UM_Id}`;
        $('#ulUserList').append(`
          <li class='d-flex flex-wrap mb-3'>
            <div class="d-flex flex-grow-1">
              ${avatar}
              <div class="ms-1">
                <h6 class="mb-0"><a class="text-primary" href="${link}">${v.UM_Name || ''}</a></h6>
                <span>${v.UM_EmailId || ''}</span>
              </div>
            </div>
          </li>`);
      });
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function ShowAllSMME(areaName) {
  $('#ulMSMEList').html('');
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectMSMEInthatArea',
      param2: 'SMME_City',
      paramString2: areaName,
      StoreProcedure: 'BranchDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      const rows = JSON.parse(data || '[]');

      const offcanvasElement = document.getElementById('setUPFormPopUpMSME');
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      bsOffcanvas.show();

      if (!rows.length) {
        $('#ulMSMEList').append('<div class="card"><div class="layout-demo-wrapper"><div><h5>No Data Found</h5><br></div></div></div>');
        return;
      }

      rows.forEach(v => {
        const logo = v.SMME_Logo
          ? `<div class="avatar me-2"><img src="${v.SMME_Logo}" alt="Avatar" class="rounded-circle"></div>`
          : `<div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-${randomBgClass()}">${v.UM_Prefix || initialsFromName(v.SMME_CompanyName)}</span></div>`;

        const msid = v.SMME_Id;
        $('#ulMSMEList').append(`
          <li class='d-flex flex-wrap mb-3'>
            <a class="d-flex flex-grow-1 text-decoration-none" href="/SMME/SMMEProfile_Dashboard?Id=${msid}">
              ${logo}
              <div class="ms-1">
                <h6 class="mb-0 text-primary">${v.SMME_CompanyName || ''}</h6>
                <span>${v.SMME_PrimaryContactEmail || ''}</span>
              </div>
            </a>
          </li>`);
      });
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

// ───────────────────────────────────────────────────────────────────────────────
// actions (routing)
// ───────────────────────────────────────────────────────────────────────────────
$('.nav-link').filter(function () { return $(this).text().trim() === 'Projects'; })
  .on('click', function () { window.location.href = `/Enterprise/BranchWiseProject?BId=${BId}&EnrId=${EnrId}`; });

$('.nav-link').filter(function () { return $(this).text().trim() === 'User Lists'; })
  .on('click', function () { window.location.href = `/Enterprise/BranchWiseUser?BId=${BId}&EnrId=${EnrId}`; });

$('.nav-link').filter(function () { return $(this).text().trim() === 'Dashboard'; })
  .on('click', function () { window.location.href = `/Enterprise/BranchDashboard?BId=${BId}&EnrId=${EnrId}`; });
