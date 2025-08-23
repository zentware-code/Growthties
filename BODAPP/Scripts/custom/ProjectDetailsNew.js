/**
 * ProjectDetailsNew (cleaned)
 * - Modern syntax, comments, smaller surface area
 * - Kept original function names to avoid breaking external calls
 * - Organized by: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, DataTables, ApexCharts, SweetAlert2, Select2, DropdownBinder, URLList endpoints
 */

// ───────────────────────────────────────────────────────────────────────────────
// bootstrap
// ───────────────────────────────────────────────────────────────────────────────
var UserLogoList = '';
var SMMLogoList = '';
var AcivityList = '';
var EntId = '';
var Id = 0;
var TaskList = '';
var AvailBudgte = 0;
var AvailBudgteTask = 0;
var AvailBudgteSMME = 0;
let shouldPreventChange = true;
'use strict';
var GlobData = [];
let counter = 1;
let Type = '';
var btnGlobalDisable = '';

(function () {
  let path = decodeURIComponent(window.location.pathname.replace(/\/$/, ''));
  localStorage.setItem('href', path);

  Id = getParameterByName('Id');
  Type = getParameterByName('Role');

  if (Type === 'smme') {
    $('#btnEdit,#btnBudget,#btnAsgnPpl,#btnExpenditure,#btnBranches,#btnAct,#btnTask').css('visibility', 'hidden');
  }

  if (Id > 0) {
    retrive(Id);
    fnSmmeForProject(Id);
    BindGrid(Id, '');
    fnAcitiityList(Id);
  }

  $('tr.header').on('click', function () {
    $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
  });

  retrivePermission(Id);
  ProjectWiseUser(Id);
})();

// ───────────────────────────────────────────────────────────────────────────────
// helpers
// ───────────────────────────────────────────────────────────────────────────────
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
function retrivePermission(projectId) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectPermissionForStakeholder',
      param1: 'PSP_StakeHolderId',
      param1Value: parseInt($('#hdnUserMainId').val()),
      param2: 'PSP_ProjectId',
      param2Value: parseInt(projectId),
      StoreProcedure: 'ProjectDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      if (rows.length > 0) {
        toggleVisibility('#btnTask', rows[0].PSP_Task === 'true');
        toggleVisibility('#btnAct', rows[0].PSP_Activity === 'true');
        toggleVisibility('#btnBudget', rows[0].PSP_Budget === 'true');
        toggleVisibility('.btnFile', rows[0].PSP_File === 'true');
      } else {
        $('#btnTask, #btnAct, #btnBudget, #btnEdit').hide();
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops..', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function toggleVisibility(selector, show) {
  const $el = $(selector);
  $el.toggleClass('showDivProjectDet', show);
  $el.toggleClass('hideDivProjectDet', !show);
}

function retrive(id) {
  const payload = JSON.stringify({
    global: {
      TransactionType: globalData.TransactionType,
      param1: globalData.param1,
      param1Value: parseInt(id),
      StoreProcedure: globalData.StoreProcedure
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
      if (!rows.length) return;

      $('#progress').html('');
      $('#hdnEnterPriseid').val(rows[0].PD_EnterpriseId);
      $('#pName').text(rows[0].PD_ProjectName);
      $('#pCreated').html(rows[0].ENR_CompanyName);
      $('#pStart').html(rows[0].PD_DurationFromDate);
      $('#pEnd').html(rows[0].PD_DurationToDate);
      $('#pDesc').html(rows[0].PD_Description);
      $('#hdnBudget').val(rows[0].PD_Budget);
      $('#totalBranches').text(rows[0].BranchCount);
      $('#ulBnch').html(rows[0].Branch);

      const status = parseInt(rows[0].Status || 0, 10);
      $('#spnProgressPer').html(status || 0);
      $('#progress').append(`<div class="progress-bar" role="progressbar" style="width:${status}%;"
          aria-valuenow="${status}" aria-valuemin="0" aria-valuemax="100"></div>`);

      if (status === 100) {
        $('#btnAsgnPpl, #btnBudget, #btnExpenditure, #btnBranches, #sourceVisits').prop('disabled', true);
        $('#btnAct, #btnTask, #btnEdit').addClass('disabled').removeAttr('href').css({ 'pointer-events': 'none', opacity: '0.6' });
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function SaveBudgetForProject() {
  const payload = JSON.stringify({
    entity: {
      PD_Id: Id,
      PD_BudgetType: $('#ddlBudgetType').val(),
      PD_Budget: $('#txtBudget').val(),
      TransactionType: 'UpdateBudget'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.SaveRecord,
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      if (data && data.IsSuccess) {
        $('#hdnBudget').val($('#txtBudget').val());
        Swal.fire({ title: 'Successful..!', text: 'Your changes were saved successfully!', icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false })
          .then((r) => { if (r.isConfirmed) $('#backDropModal').modal('hide'); });
      } else {
        Swal.fire({ title: 'Oops...', text: data.Message, icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
}

function fnAcitiityList(id) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectList',
      param1: 'CA_ProjectId',
      param1Value: parseInt(id),
      StoreProcedure: 'CreateActivity_USP'
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
      AcivityList = '';
      if (rows.length) {
        $.each(rows, function (i, v) {
          const ad = `/Project/ActivityDescription?Id=${v.PD_Id}&CAId=${v.CA_Id}`;
          const listUrl = `/Project/CreateActivityList?Id=${v.PD_Id}`;
          $('#viewAllActivitiesLink').attr('href', listUrl);
          AcivityList += `<li class="d-flex mb-3 pb-1">
            <div class="chart-progress me-3" data-color="${['success','danger','warning','info','primary','secondary'][Math.floor(6 * Math.random())]}" data-series="${v.Status}" data-progress_variant="true"></div>
            <div class="row w-100 align-items-center">
              <div class="col-9">
                <div class="me-2"><h6 class="mb-2"><a href="${ad}">${v.CA_ActivityName}</a></h6><small>${v.TotalTask} Tasks</small></div>
              </div>
              <div class="col-3 text-end">
                <a href="/Project/TaskList?Id=${v.CA_ProjectId}&CAId=${v.CA_Id}" class="btn btn-sm btn-icon btn-label-secondary"><i class="ti ti-chevron-right scaleX-n1-rtl"></i></a>
              </div>
            </div>
          </li>`;
        });
      } else {
        AcivityList = '<div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div>';
      }

      $('#ulActivity').append(AcivityList);

      const items = document.querySelectorAll('.chart-progress');
      items && items.forEach(function (el) {
        const color = config.colors[el.dataset.color];
        const series = el.dataset.series;
        const variant = el.dataset.progress_variant === 'true';
        const chartOpts = {
          chart: { height: variant ? 58 : 53, width: variant ? 58 : 43, type: 'radialBar' },
          plotOptions: {
            radialBar: {
              hollow: { size: variant ? '45%' : '33%' },
              dataLabels: { show: variant, value: { offsetY: -10, fontSize: '15px', fontWeight: 500, fontFamily: 'Public Sans' } },
              track: { background: config.colors_label.secondary }
            }
          },
          stroke: { lineCap: 'round' },
          colors: [color],
          grid: { padding: { top: variant ? -12 : -15, bottom: variant ? -17 : -15, left: variant ? -17 : -5, right: -15 } },
          series: [series],
          labels: variant ? [''] : ['Progress']
        };
        new ApexCharts(el, chartOpts).render();
      });
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Success', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function fnSmmeForProject(id) {
  $('#divSmmE').html('');
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectProjectWiseSMMELogoDetails',
      param1: 'PD_Id',
      param1Value: parseInt(id),
      StoreProcedure: 'ProjectDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    async: false,
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      SMMLogoList = '';

      if (rows.length === 1) {
        $.each(rows, function (i, v) { SMMLogoList += v.SMME_Logo; });
        $('#divSmmE').append(SMMLogoList);
      } else if (rows.length > 1) {
        $.each(rows, function (i, v) { SMMLogoList += v.SMME_Logo; });
        $('#divSmmE').append(`<div><ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1 open-smm-modal" data-id="${id}">${SMMLogoList}</ul></div>`);
      } else {
        SMMLogoList = '<div class="d-flex align-items-center"><span class="badge bg-label-danger">No SMME Found</span></div>';
        $('#divSmmE').append(SMMLogoList);
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Success', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

$('#clkLogo').on('click', function () { $('#shareProjectClkLogo').modal('show'); });

function fnSmmeForTask(id) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectTaskWiseSMMELogo',
      param1: 'TD_Id',
      param1Value: parseInt(id),
      StoreProcedure: 'TaskDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    async: false,
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      UserLogoList = rows.length ? rows.map(v => v.UM_ProfilePic).join('') : '<div class="d-flex align-items-center"><span class="badge bg-label-danger">No User Found</span></div>';
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Success', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function ShowAllSMME() {
  $('#ulSmmeList').html('');
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectEnterpriseWiseSMMEForEntrp',
      param1: 'EnterpriseId',
      param1Value: parseInt($('#hdnEnterPriseid').val()),
      param2: 'PD_Id',
      param2Value: parseInt($('#hdnProject').val()),
      StoreProcedure: 'ProjectDetails_USP'
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
      if (!(rows.length > 0)) {
        $('#ulSmmeList').append('<li class="text-center text-muted">No MSME Found</li>');
        return;
      }

      $.each(rows, function (i, v) {
        const logo = v.SMME_Logo
          ? `<div class="d-flex flex-grow-1"><div class="avatar me-2"><img src="${v.SMME_Logo}" alt="Avatar" class="rounded-circle"></div><div class="ms-1"><h6 class="mb-0">${v.SMME_CompanyName}</h6><span>${v.SMME_PrimaryContactEmail}</span></div></div>`
          : `<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-${['success','danger','warning','info','primary','secondary'][Math.floor(6 * Math.random())]}">${v.SMME_Prefix}</span></div><div class="ms-1"><h6 class="mb-0">${v.SMME_CompanyName}</h6><span>${v.SMME_PrimaryContactEmail}</span></div></div>`;
        $('#ulSmmeList').append(`<li class="d-flex flex-wrap mb-3">${logo}<div class="form-check form-switch"><input class="float-end form-check-input" type="checkbox" ${v.checked} id="chkId_${i + 1}" onclick="AssignProject(${i + 1},${v.SMME_Id})"></div>`);
      });
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function AssignProject(index, SmmeId) {
  const TransactionType = $('#chkId_' + index).is(':checked') ? 'Insert' : 'Update';
  const payload = JSON.stringify({
    entity: {
      TransactionType,
      PSM_EnterpriseId: parseInt($('#hdnEnterPriseid').val()),
      PSM_SmmeId: SmmeId,
      PSM_ProjectId: parseInt($('#hdnProject').val())
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/AssignProjectToSMME',
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      if (data && data.IsSuccess) {
        Swal.fire({ title: 'Successful..!',
          text: 'Your changes were saved successfully!',
          icon: 'success',
          customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
          buttonsStyling: false
        });
        fnSmmeForProject(parseInt($('#hdnProject').val()));
      } else {
        Swal.fire({ title: 'Oops...', text: data.Message, icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
}

function BindGrid(Id, CAId) {
  const EnterId = $('#EnrId').val();
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectList',
      param1: 'TD_ProjectId',
      param1Value: Id,
      param2: 'TD_ActivityId',
      param2Value: CAId,
      StoreProcedure: 'TaskDetails_USP'
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

      let TaskPrgrs = '/Project/TaskProgressAdmin';
      if (parseInt($('#EnrId').val()) > 0) TaskPrgrs = '/Project/TaskProgressEnterprise';
      else if (Type === 'smme' || (parseInt($('#SmmeId').val()) > 0)) TaskPrgrs = '/Project/TaskProgressSMME';

      const $tbl = $('#datatable-example');
      if (!$tbl.length) return;

      const dt = $tbl.DataTable({
        data: rows,
        columns: [{ data: 'TD_TaskName' }, { data: 'PD_Project' }, { data: 'Logo' }, { data: 'status' }],
        columnDefs: [
          {
            targets: 0,
            render: function (e, t, a, s) {
              const n = a.TD_TaskName;
              const i = a.CA_ActivityName;
              const o = a.Logo;
              const r = a.TD_Id;
              const ad = `/Project/ActivityDescription?Id=${a.PD_Id}&CAId=${a.CA_Id}`;
              const initials = ((n.match(/\b\w/g) || []).shift() || '') + ((n.match(/\b\w/g) || []).pop() || '');
              const avatar = o
                ? `<img src="${a.Logo}" alt="Avatar" class="rounded-circle">`
                : `<span class="avatar-initial rounded-circle bg-label-${['success','danger','warning','info','primary','secondary'][Math.floor(6 * Math.random())]}">${initials.toUpperCase()}</span>`;
              return `<div class="d-flex justify-content-start align-items-center user-name">
                <div class="avatar-wrapper"><div class="avatar me-3">${avatar}</div></div>
                <div class="d-flex flex-column">
                  <a href="${TaskPrgrs}?Mode=V&Id=${r}" class="text-body text-truncate"><span class="fw-medium">${n}</span></a>
                  <small class="text-muted"><a href="${ad}" style="width:25px;white-space:nowrap;overflow:hidden !important;text-overflow:ellipsis;">${i}</a></small>
                </div>
              </div>`;
            }
          },
          {
            targets: 1, orderable: false, searchable: false,
            render: function (e, t, a) {
              return `<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1" style="width:50px;white-space:nowrap;overflow:hidden !important;text-overflow:ellipsis;">${a.PD_ProjectName}</ul>`;
            }
          },
          {
            targets: 2, orderable: false, searchable: false,
            render: function (e, t, a) {
              fnSmmeForTask(a.TD_Id);
              return `<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1 open-smm-modal" data-id="${a.PD_Id}">${SMMLogoList}</ul>`;
            }
          },
          {
            targets: 3,
            render: function (e, t, a) {
              const isComplete = a.IsComplete === 'Completed';
              const progressValue = isComplete ? '100%' : a.status;
              const displayText = isComplete ? '100%' : a.status;
              return `<div class="d-flex align-items-center">
                <div class="progress w-100 me-3" style="height:6px;">
                  <div class="progress-bar" style="width:${progressValue};" aria-valuenow="${(progressValue+'').replace('%','')}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <span>${displayText}</span>
              </div>`;
            }
          }
        ],
        lengthMenu: [5, 10, 30, 75, 100],
        order: [[1, 'desc']],
        dom: '<\"row me-2\"<\"col-md-2\"<\"me-3\"l>><\"col-md-10\"<\"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0\"fB>>>t<\"row mx-2\"<\"col-sm-12 col-md-6\"i><\"col-sm-12 col-md-6\"p>>',
        language: { sLengthMenu: '_MENU_', search: '', searchPlaceholder: 'Search..' },
        buttons: []
      });

      setTimeout(() => {
        $('.dataTables_filter .form-control').removeClass('form-control-sm');
        $('.dataTables_length .form-select').removeClass('form-select-sm');
        LoaderEnd('#pBudgetblock');
      }, 300);
    },
    error: function () { alert('request failed'); }
  });
}

function retriveprojectbudget(id) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'Select',
      param1: 'PD_Id',
      param1Value: parseInt(id),
      StoreProcedure: 'ProjectDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetEntityMasterById,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      $('#txtBudget').val(data['PD_Budget']);
      $('#ddlBudgetType').val(data['PD_BudgetType']).change();
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

function validateQTY(t) {
  if (!parseInt($(t).val(), 10)) {
    Swal.fire({ title: 'Oops...', text: 'Quantity should not be blank', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    return false;
  }

  const rate = $(t).closest('tr').find('td:eq(5)').text();
  const qty = $(t).closest('tr').find('td:eq(6) input[type="text"]').val();
  const camt = parseFloat(parseInt(qty, 10) * parseFloat(rate)).toFixed(2);
  $(t).closest('tr').find('td:eq(7)').text(camt);
}

function CalculateAmt() {
  const amt = parseFloat($('#txtAmnt').val()) || 0;
  const qty = parseInt($('#txtQty').val(), 10) || 0;
  $('#txtTotalAmnt').val((amt * qty));
}

function AddBudget() {
  $('#totalBdgt').val($('#hdnBudget').val());

  const table = document.getElementById('tblBudget');
  const rows = table.getElementsByTagName('tr');
  const i = (rows.length - 1);
  const tr = $('<tr/>');

  tr.append(`<td><select id="ddlFundTypeTbl_${i}" name="ddlFundTypeTbl_${i}" class="select2 form-select ddlFundTypeTbl" data-allow-clear="true"></select></td>`);
  tr.append(`<td><input type="text" value="${$('#txtDesc').val()}" class="form-control" name="txtDesc_${i}" id="txtDesc_${i}" ></td>`);
  tr.append(`<td><input type="text" value="${$('#txtQty').val()}" class="form-control" name="txtQty_${i}" id="txtQty_${i}" onkeyup="cellAmntChngeForBudget(this)"></td>`);
  tr.append(`<td><input type="text" value="${$('#txtAmnt').val()}" class="form-control" name="txtAmnt_${i}" id="txtAmnt_${i}" onkeyup="cellAmntChngeForBudget(this)"></td>`);
  tr.append(`<td><input type="text" value="${$('#txtTotalAmnt').val()}" name="txtTotalAmnt_${i}" id="txtTotalAmnt_${i}" class="form-control" disabled></td>`);
  tr.append(`<td class="text-center"><a onclick="deleteconfirmBoxClick(this)" href="javascript:;" class="text-body"><i class="ti ti-trash me-2 ti-sm"></i></a></td>`);

  $('#tblBudget tbody').append(tr);

  const $drp = $(`#ddlFundTypeTbl_${i}`);
  if ($drp.length) {
    $drp.wrap('<div class="position-relative"></div>').select2({ placeholder: 'Select A Fund Type', dropdownParent: $drp.parent() });
  }
  DropdownBinder.DDLData = { tableName: 'FundType_FT', Text: 'FT_Type', Value: 'FT_Id' };
  DropdownBinder.DDLElem = $drp;
  DropdownBinder.Execute();

  $(`#ddlFundTypeTbl_${i}`).val($('#ddlFundType').val()).change();
  $('#ddlFundType').val(0).change();
  $('.txtModal').val('');
}

function deleteconfirmBoxClick(rowNo) {
  Swal.fire({
    title: 'Do you want to Delete this Setup?',
    text: "You won't be able to revert this!",
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Yes, Do it!',
    customClass: { confirmButton: 'btn btn-danger me-3 waves-effect waves-light', cancelButton: 'btn btn-label-secondary waves-effect waves-light' },
    buttonsStyling: false
  }).then((result) => { if (result.isConfirmed) $(rowNo).closest('tr').remove(); });
}

function SaveBudgetDetailsForProject() {
  const BudgetArr = [];
  let total = 0;
  for (let i = 1; i <= $('#tblBudget tbody tr').length; i++) {
    BudgetArr.push({
      PBD_FundName: parseInt($(`#ddlFundTypeTbl_${i}`).val()),
      PBD_Desc: $(`#txtDesc_${i}`).val(),
      PBD_Qty: parseInt($(`#txtQty_${i}`).val()),
      PBD_Amount: parseFloat($(`#txtAmnt_${i}`).val()),
      PBD_TotalAmount: parseFloat($(`#txtTotalAmnt_${i}`).val())
    });
    total += parseFloat($(`#txtTotalAmnt_${i}`).val());
  }

  if (total < parseFloat($('#totalBdgt').val())) {
    Swal.fire({ title: 'Oops...', text: 'Please Add More  Fund!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false })
      .then((r) => { if (r.isConfirmed) $('#exLargeModal').modal('hide'); });
    return false;
  }

  if (total > parseFloat($('#totalBdgt').val())) {
    Swal.fire({ title: 'Oops...', text: 'Total Budget Exceed' + parseFloat($('#totalBdgt').val()), icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false })
      .then((r) => { if (r.isConfirmed) $('#exLargeModal').modal('hide'); });
    return false;
  }

  const payload = JSON.stringify({ entity: { list: BudgetArr, PBD_ProjectId: Id } });
  $.ajax({
    type: 'POST',
    url: '/ScriptJson/InsertUpdateProjectBudget',
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      if (data && data.IsSuccess) {
        Swal.fire({ title: 'Successful..!', text: 'Your changes were saved successfully!', icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false })
          .then((r) => { if (r.isConfirmed) { $('#exLargeModal').modal('hide'); $('#tblActivity tbody').html(''); } });
      } else {
        Swal.fire({ title: 'Oops...', text: data.Message, icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
}

function retriveProjectBudgetDetails(id) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'Select',
      param1: 'PBD_ProjectId',
      param1Value: parseInt(id),
      StoreProcedure: 'ProjectBudgetDetails_USP'
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
      $('#totalBdgt').val($('#hdnBudget').val());
      $('#tblBudget tbody').html('');
      for (let i = 0; i < rows.length; i++) {
        const tr = $('<tr/>');
        tr.append(`<td><select id="ddlFundTypeTbl_${i + 1}" name="ddlFundTypeTbl_${i + 1}" class="select2 form-select ddlFundTypeTbl" data-allow-clear="true"></select></td>`);
        tr.append(`<td><input type="text" value="${rows[i].PBD_Desc}" class="form-control" name="txtDesc_${i + 1}" id="txtDesc_${i + 1}" ></td>`);
        tr.append(`<td><input type="text" value="${rows[i].PBD_Qty}" class="form-control" name="txtQty_${i + 1}" id="txtQty_${i + 1}" onkeyup="cellAmntChngeForBudget(this)"></td>`);
        tr.append(`<td><input type="text" value="${rows[i].PBD_Amount}" class="form-control" name="txtAmnt_${i + 1}" id="txtAmnt_${i + 1}" onkeyup="cellAmntChngeForBudget(this)"></td>`);
        tr.append(`<td><input type="text" value="${rows[i].PBD_TotalAmount}" name="txtTotalAmnt_${i + 1}" id="txtTotalAmnt_${i + 1}" class="form-control" disabled></td>`);
        tr.append(`<td class="text-center"><a onclick="deleteconfirmBoxClick(this)" href="javascript:;" class="text-body"><i class="ti ti-trash me-2 ti-sm"></i></a></td>`);
        $('#tblBudget tbody').append(tr);

        const $drp = $(`#ddlFundTypeTbl_${i + 1}`);
        if ($drp.length) {
          $drp.wrap('<div class="position-relative"></div>').select2({ placeholder: 'Select A Fund Type', dropdownParent: $drp.parent() });
        }
        DropdownBinder.DDLData = { tableName: 'FundType_FT', Text: 'FT_Type', Value: 'FT_Id' };
        DropdownBinder.DDLElem = $drp;
        DropdownBinder.Execute();
        $drp.val(rows[i].PBD_FundName).change();

        $('#ddlFundType').val(0).change();
        $('.txtModal').val('');
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

// Activity budget distribution
function SaveBudgetDistribution() {
  const ArrActivity = [];
  const ArrTask = [];

  for (let i = 1; i <= $('#tblActivity tbody tr.header').length; i++) {
    if (($('#childAcitivity' + i).val()) > 0) {
      ArrActivity.push({ AWB_Budget: $('#childAcitivity' + i).val(), AWB_ActivityId: $('#childAcitivityId' + i).val() });
    }
    for (let j = 1; j <= $('#tblActivity tbody tr.childrowcls' + i).length; j++) {
      ArrTask.push({ TWB_Budget: $('#childTask' + i + j).val(), TWB_TaskId: $('#childTaskId' + i + j).val() });
    }
  }

  let total = 0;
  $('#tblActivity tbody tr').each(function () {
    $(this).find('input.activity').each(function () { total += parseInt($(this).val(), 10); });
  });

  if (total > parseInt($('#hdnBudget').val(), 10)) {
    Swal.fire({ title: 'Oops...', text: 'Budget Cannot Be Greater Than ' + parseInt($('#hdnBudget').val(), 10), icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    return;
  }

  const payload = JSON.stringify({ entity: { ActivityList: ArrActivity, TaskList: ArrTask, ProjectId: Id } });
  $.ajax({
    type: 'POST',
    url: '/ScriptJson/InsertUpdateBudgetAllocation',
    data: payload,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      if (data && data.IsSuccess) {
        Swal.fire({ title: 'Successful..!', text: 'Your changes were saved successfully!', icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false })
          .then((r) => { if (r.isConfirmed) { $('#modalBudgDistribution').modal('hide'); $('#tblActivity tbody').html(''); } });
      } else {
        Swal.fire({ title: 'Oops...', text: data.Message, icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
      }
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Complete', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
}

function cellAmntChngeForBudget(t) {
  const amnt = $(t).closest('tr').find('td:eq(3) input[type="text"]').val();
  const qty = $(t).closest('tr').find('td:eq(2) input[type="text"]').val();
  const total = isNaN(parseFloat(parseInt(qty, 10) * parseFloat(amnt)).toFixed(2)) ? 0 : parseFloat(parseInt(qty, 10) * parseFloat(amnt)).toFixed(2);
  $(t).closest('tr').find('td:eq(4) input[type="text"]').val(total);
}

function AddActivityBudget() {
  if (parseFloat($('#txtAvailableFund').val()) < parseFloat($('#txtAcitivityAmnt').val())) {
    Swal.fire({ title: 'Oops...', text: 'Please Enter Amount Less Than ' + parseFloat($('#txtAvailableFund').val()), icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    $('#txtAcitivityAmnt').val(0);
    return false;
  }

  const table = document.getElementById('tblActivity');
  const rows = table.getElementsByTagName('tr');
  const i = rows.length;
  const tr = $('<tr/>');

  tr.append(`<td><select id="ddlActTbl_${i}" name="ddlActTbl_${i}" class="select2 form-select ddlActTbl" data-allow-clear="true"></select></td>`);
  tr.append(`<td><select id="ddlFundTypeActTbl_${i}" name="ddlFundTypeActTbl_${i}" class="select2 form-select ddlFundTypeActTbl${$('#ddlFundTypeAct').val()}" data-allow-clear="true"></select></td>`);
  tr.append(`<td><input type="text" value="${$('#txtAcitivityAmnt').val()}" class="form-control tblActFund${$('#ddlFundTypeAct').val()}" name="txtAmntAct_${i}" id="txtAmntAct_${i}" onkeyup="cellAmntChngeForActivityBudget(this)"></td>`);
  tr.append(`<td><input type="hidden" name="hdnAvailAmnt_${i}" id="hdnAvailAmnt_${i}" class="hdnAvailAmntTbl${$('#ddlFundTypeAct').val()}"><input type="text" name="txtAvailAmnt_${i}" id="txtAvailAmnt_${i}" class="form-control txtAvailAmntTbl${$('#ddlFundTypeAct').val()}" disabled></td>`);

  $('#tblActivity tbody').append(tr);
  $(`.txtAvailAmntTbl${$('#ddlFundTypeAct').val()}`).val($('#txtAvailableFund').val());
  $(`.hdnAvailAmntTbl${$('#ddlFundTypeAct').val()}`).val($('#txtAvailableFund').val());
  AvailBudgte = $('#txtAvailableFund').val();

  const $fund = $(`#ddlFundTypeActTbl_${i}`);
  const $act = $(`#ddlActTbl_${i}`);

  if ($fund.length) $fund.wrap('<div class="position-relative"></div>').select2({ placeholder: 'Select A Fund Type', dropdownParent: $fund.parent() });
  if ($act.length) $act.wrap('<div class="position-relative"></div>').select2({ placeholder: 'Select A Activity', dropdownParent: $act.parent() });

  DropdownBinder.DDLData = { tableName: 'FundType_FT', Text: 'FT_Type', Value: 'FT_Id' };
  DropdownBinder.DDLElem = $fund; DropdownBinder.Execute();

  DropdownBinder.DDLData = { tableName: 'CreateActivity_CA', Text: 'CA_ActivityName', Value: 'CA_Id', ColumnName: 'CA_ProjectId', PId: Id };
  DropdownBinder.DDLElem = $act; DropdownBinder.Execute();

  $(`#ddlFundTypeActTbl_${i}`).val($('#ddlFundTypeAct').val()).change();
  $('#ddlFundTypeAct').val(0).change();

  $(`#ddlActTbl_${i}`).val($('#ddlActivity').val()).change();
  $('#ddlActivity').val(0).change();
  $('.txtModal').val('');
}

$('#ddlFundTypeAct').on('change', function () { if (this.value > 0) fundWiseAVailBudget(this.value); });

function fundWiseAVailBudget(fundtype) {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'Select',
      param1: 'PBD_ProjectId',
      param1Value: parseInt(Id),
      param2: 'PBD_FundName',
      param2Value: parseInt(fundtype),
      StoreProcedure: 'ProjectBudgetDetails_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: URLList.GetList,
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    async: false,
    success: function (data) {
      const rows = JSON.parse(data || '[]');
      let totalAlloc = 0;
      const table = document.getElementById('tblActivity');
      const rowsEl = table.getElementsByTagName('tr');
      if (rowsEl.length > 1) {
        $('#tblActivity tbody tr').each(function () {
          $(this).find(`select.ddlFundTypeActTbl${fundtype}`).each(function () {
            totalAlloc += parseInt($(`.tblActFund${fundtype}`).val(), 10) || 0;
          });
        });
      }
      AvailBudgte = (rows[0].PBD_AvailbleBudget - totalAlloc);
      $('#txtAvailableFund').val(AvailBudgte);
      $(`.txtAvailAmntTbl${fundtype}`).val(AvailBudgte);
    },
    error: function () {
      Swal.fire({ title: 'Oops...', text: 'Process Not Success', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: false });
    }
  });
  return false;
}

// Placeholder to preserve original name (implementation in source file continues)
function cellAmntChngeForActivityBudget(t) {
  // Intentionally minimal here to keep compatibility; original source continues beyond provided snippet.
  // You can extend logic if needed similar to `cellAmntChngeForBudget`.
}
