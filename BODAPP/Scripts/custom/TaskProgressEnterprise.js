/**
 * TaskProgressEnterprise.clean.js
 * - Modern syntax, comments, smaller surface area
 * - Kept original function names to avoid breaking external calls
 * - Organized by: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, SweetAlert2 (Swal), URLList(GetList, SaveRecord), LoaderStart/End
 */

// ===============================
// bootstrap
// ===============================
let btnStatus = '';
let PageStatus = '';
let Mode = '';
let Id = 0;
let MId = 0;
let Type = '';

let percentValue = 0;
const progressBar = $('.progress-bar');

// For native progress element animation (legacy compatibility)
const elem = document.getElementById('progress-bar');
let width = 1;
let interval = 0;
let timer = 0; // used by UploadDoc()


// ===============================
// helpers
// ===============================
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/** Pretty byte-size (approx, 1000 base for UX) */
function bytesToSize(bytes) {
  const sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
  for (let i = 0; i < sizes.length; i++) {
    if (bytes <= 1024) return bytes + ' ' + sizes[i];
    bytes = parseInt(bytes / 1000, 10);
  }
  return bytes + ' P';
}

/** Map TP_TaskStatus → numeric code */
function statusCodeOf(status) {
  switch (status) {
    case 'Open': return 1;
    case 'Progress': return 2;
    case 'Completed': return 3;
    default: return 1;
  }
}

/** Shared error alert */
function showAjaxError(title = 'Process Not Complete') {
  Swal.fire({
    title,
    icon: 'error',
    customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
    buttonsStyling: !1
  });
}

/** Slim Ajax POST (JSON) */
function ajaxJson({ url, data, async = true, beforeSend, success, complete, error }) {
  $.ajax({
    type: 'POST',
    url,
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async,
    beforeSend,
    success,
    complete,
    error: error || function () { showAjaxError(); }
  });
}


// ===============================
// init
// ===============================
$(document).ready(function () {
  $('#section-block').block({
    message: '<div class="spinner-border text-primary" role="status"></div>',
    timeout: 9e3,
    css: { backgroundColor: 'transparent', border: '0' },
    overlayCSS: { backgroundColor: '#fff', opacity: .8 }
  });

  Id = getParameterByName('Id');
  Mode = getParameterByName('Mode');

  $('#txtPost').on('keyup', function () {
    const btnPost = $('#btnPost');
    $.trim($(this).val()) !== '' ? btnPost.removeAttr('disabled') : btnPost.attr('disabled', 'disabled');
  });

  if (Id !== '') {
    fnProgressdataForSmme(Id);
    fnTaskProgressforButton(Id);
  }
});


// ===============================
// API
// ===============================
function fnProgressdataForSmme(Id) {
  const hdnTaskTitle = $('#hdnTaskTitle').val();

  ajaxJson({
    url: URLList.GetList,
    data: {
      global: {
        TransactionType: 'SelectTaskProgressforSmme',
        param1: 'TP_TaskId',
        param1Value: parseInt(Id, 10),
        StoreProcedure: 'TaskProgress_USP'
      }
    },
    success: function (data) {
      data = JSON.parse(data || '[]');
      const count = data.length;

      if (Mode === 'V') $('.viewmd').hide();

      if (count === 0) {
        SaveRecordForProgress(Id, 'Open');
      }

      // render timeline
      const $ul = $('#ulProgress');
      data.forEach(v => {
        if (v.TP_TaskStatus === 'Open') {
          $ul.append(`
            <li class="border-left-dashed pb-4 timeline-item timeline-item-primary">
              <span class="timeline-indicator-advanced timeline-indicator-primary">
                <i class="scaleX-n1-rtl ti rounded-circle ti-send"></i>
              </span>
              <div class="timeline-event">
                <div class="border-bottom mb-3 timeline-header">
                  <input type="hidden" id="hdnStatus" value="${v.TP_TaskStatus}" />
                  <h6 class="mb-0">${v.TD_TaskName} - Activity - ${v.ActivityName}</h6>
                  <span class="text-muted">${v.TP_UpdateDate}</span>
                </div>
                <div class="d-flex flex-wrap justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <span>Task/Job Status</span>
                    <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i>
                    <span>${hdnTaskTitle}</span>
                  </div>
                  <div><span>${v.TP_TaskUpdateTime}</span></div>
                </div>
                ${v.TPC_Upload}
                <span class="badge bg-primary">Open</span>
              </div>
            </li>
          `);
        }

        if (v.TP_TaskStatus === 'Progress' && v.IsComment === 0) {
          $ul.append(`
            <li class="border-left-dashed pb-4 timeline-item timeline-item-warning">
              <span class="timeline-indicator-advanced timeline-indicator-warning">
                <i class="ti ti-bell rounded-circle"></i>
              </span>
              <div class="timeline-event">
                <div class="border-bottom mb-3 timeline-header">
                  <input type="hidden" id="hdnStatus" value="${v.TP_TaskStatus}" />
                  <h6 class="mb-0">${v.TD_TaskName} - Started by ${v.UM_Name}</h6>
                  <span class="text-muted">${v.TP_UpdateDate}</span>
                </div>
                <div class="d-flex flex-wrap justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <span>${hdnTaskTitle}</span>
                    <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i>
                    <span> Job In Progress</span>
                  </div>
                  <div><span>${v.TP_TaskUpdateTime}</span></div>
                </div>
                ${v.TPC_Upload}
                <span class="badge bg-warning">Progress</span>
              </div>
            </li>
          `);
        }

        if (v.TP_TaskStatus === 'Progress' && v.IsComment === 1) {
          $ul.append(`
            <li class="border-left-dashed pb-4 timeline-item timeline-item-warning">
              <span class="timeline-indicator-advanced timeline-indicator-warning">
                <i class="ti ti-bell rounded-circle"></i>
              </span>
              <div class="timeline-event">
                <div class="border-bottom mb-3 timeline-header">
                  <input type="hidden" id="hdnStatus" value="${v.TP_TaskStatus}" />
                  <h6 class="mb-0">${v.TD_TaskName} -  Commented by ${v.UM_Name}</h6>
                  <span class="text-muted">${v.TP_UpdateDate}</span>
                </div>
                <div class="d-flex flex-wrap justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <span>${v.TPC_Comment}</span>
                  </div>
                  <div><span>${v.TP_TaskUpdateTime}</span></div>
                </div>
                ${v.TPC_Upload}
                <span class="badge bg-warning">Progress</span>
              </div>
            </li>
          `);
        }

        if (v.TP_TaskStatus === 'Completed') {
          $ul.append(`
            <li class="border-left-dashed pb-4 timeline-item timeline-item-success">
              <span class="timeline-indicator-advanced timeline-indicator-success">
                <i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i>
              </span>
              <div class="timeline-event">
                <div class="border-bottom mb-3 timeline-header">
                  <input type="hidden" id="hdnStatus" value="${v.TP_TaskStatus}" />
                  <h6 class="mb-0">${v.TD_TaskName} - Work Completed</h6>
                  <span class="text-muted">${v.TP_UpdateDate}</span>
                </div>
                <div class="d-flex flex-wrap justify-content-between mb-2">
                  <div class="d-flex align-items-center">
                    <span>Engineer Completed Work For ${hdnTaskTitle}</span>
                  </div>
                  <div><span>${v.TP_TaskUpdateTime}</span></div>
                </div>
                ${v.TPC_Upload}
              </div>
            </li>
          `);
        }

        if (v.TD_Status === 'Completed') {
          $('.btnStatus').prop('disabled', true);
        }
      });

      if (Mode === 'V') $('.viewmd').hide();
      $('#btnstatusUplaod').hide();
    },
    error: function () {
      showAjaxError('Process Not Success');
    }
  });

  return false;
}


function SaveUpdateReq(TPC_Id, TPC_TaskId) {
  ajaxJson({
    url: '/ScriptJson/UpdateUploadTaskStatus',
    data: { entity: { TPC_Id, TP_TaskId: TPC_TaskId } },
    success: function (data) {
      if (data && data.IsSuccess) {
        location.reload();
      } else {
        Swal.fire({
          title: data?.Message || 'Update failed',
          icon: 'error',
          customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
          buttonsStyling: !1
        });
      }
    }
  });
}


function FileUpload() {
  const input = $('#uploadFile')[0]?.files?.[0];
  if (!input) return false;

  const size = bytesToSize(700000);
  if (input.size > 700000) {
    Swal.fire({
      title: 'File size is more then ' + size + 'b',
      icon: 'error',
      customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
      buttonsStyling: !1
    });
    return false;
  }

  const fileReader = new FileReader();
  fileReader.onload = function () {
    const fileName = $('#uploadFile').val().split('\\').pop();
    const hdnFilePath = '/Upload/' + fileName;
    $('#hdnupload').val(hdnFilePath);
    UploadDoc('uploadFile');
  };
  fileReader.readAsDataURL(input);
}


function UploadDoc(upload) {
  timer = setInterval(startBar, 500);

  const formData = new FormData();
  const input = document.getElementById(upload);
  const totalFiles = input.files.length;
  for (let i = 0; i < totalFiles; i++) {
    formData.append(upload, input.files[i]);
  }

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/Upload',
    data: formData,
    dataType: 'json',
    contentType: false,
    processData: false,
    async: false,
    beforeSend: function () { progressBarr(); },
    success: function () { clearInterval(timer); }
  }).done(function () {
    SaveRecordForProgressButton(Id, PageStatus);
  }).fail(function (jqxhr, textStatus, error) {
    // Optional: console.warn('Upload failed:', textStatus, error);
  });
}


function SaveRecordForProgressButton(Id, Status) {
  const _data = {
    entity: {
      TP_TaskId: Id,
      TP_UserType: 'SMME',
      TP_TaskStatus: Status,
      TP_Comments: $('#txtPost').val(),
      TP_TaskStatusCode: statusCodeOf(Status),
      TP_Upload: $('#hdnupload').val()
    }
  };

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/InsertRecordForTaskProgressComment',
    data: JSON.stringify(_data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: false,
    success: function (data) {
      if (data && data.IsSuccess) {
        $('#txtPost').val('');
        $('#ulProgress').html('');
        fnTaskProgressforButton(Id);
        fnProgressdataForSmme(Id, Status);
      } else {
        // no-op: keep UX consistent with legacy
      }
    },
    error: function () { showAjaxError(); }
  });
}


function SaveRecordForProgress(Id, Status) {
  const _data = {
    entity: {
      TP_TaskId: Id,
      TP_UserType: 'Enr',
      TP_TaskStatus: Status,
      TP_TaskStatusCode: statusCodeOf(Status)
    }
  };

  ajaxJson({
    url: URLList.SaveRecord,
    data: _data,
    success: function (data) {
      if (data && data.IsSuccess) {
        $('#ulProgress').html('');
        fnTaskProgressforButton(Id);
        fnProgressdataForSmme(Id, Status);
      }
    }
  });
}


function fnTaskProgressforButton(Id) {
  ajaxJson({
    url: URLList.GetList,
    data: {
      global: {
        TransactionType: 'SelectTaskProgressforButton',
        param1: 'TP_TaskId',
        param1Value: parseInt(Id, 10),
        StoreProcedure: 'TaskProgress_USP'
      }
    },
    beforeSend: function () { LoaderStart('.loader-sectionenr'); },
    complete: function () { LoaderEnd('.loader-sectionenr'); },
    success: function (data) {
      data = JSON.parse(data || '[]');

      $('#divStatusChng').html('');
      $('#divStatusChng').append(
        `<button class="" id="btnStatusChng" style="padding:5px 15px;" onclick="SaveRecordForProgress(${Id}, '${data[0].BtnStatus}');"></button>`
      );

      if (data[0].TP_TaskStatus === 'Open') {
        $('#btnStatusChng').removeClass().addClass('btn btn-outline-primary my-3 my-sm-0 waves-effect').html('Start Task');
        btnStatus = 'Progress';
        PageStatus = data[0].TP_TaskStatus;
      }

      if (data[0].TP_TaskStatus === 'Progress') {
        $('#btnStatusChng').removeClass().addClass('btn btn-outline-warning my-3 my-sm-0 waves-effect').html('Mark As Completed');
        btnStatus = 'Completed';
        PageStatus = data[0].TP_TaskStatus;
      }

      if (data[0].TP_TaskStatus === 'Completed') {
        $('#btnStatusChng').removeClass().addClass('btn btn-outline-success my-3 my-sm-0 waves-effect').html('Completed');
        $('#btnStatusChng').prop('disabled', true);
        $('#uploadFile').attr('disabled', 'disabled');
      }
    }
  });

  return false;
}


// ===============================
// renderers (progress bars)
// ===============================
function startBar() {
  if (percentValue < 100) percentValue += 20;
  progressBar.css('width', percentValue + '%').html(percentValue + '%');
}

function frame() {
  if (width >= 100) {
    clearInterval(interval);
  } else {
    width++;
    if (elem) elem.style.width = width + '%';
  }
}

function progressBarr() {
  interval = setInterval(startBar, 100);
}

function resetProgressBar() {
  width = 1;
  clearInterval(interval);
  if (elem) elem.style.width = width + '%';
}


// ===============================
// actions (events)
// ===============================
$('#btnPost').on('click', function () {
  if (document.getElementById('uploadFile').files.length === 0) {
    SaveRecordForProgressButton(Id, MId, PageStatus); // NOTE: legacy signature preserved
  } else {
    FileUpload();
  }
});
