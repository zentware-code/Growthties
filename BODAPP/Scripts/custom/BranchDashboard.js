/**
 * BranchDashboard (cleaned)
 * - Modern syntax, readable comments, smaller surface area
 * - Original function names kept (external calls rely on them)
 * - Organization: bootstrap → helpers → init → API → renderers → actions
 * Dependencies: jQuery, ApexCharts, SweetAlert2, project LoaderStart/End (optional)
 */

// ───────────────────────────────────────────────────────────────────────────────
// bootstrap
// ───────────────────────────────────────────────────────────────────────────────
(() => {
  // Read query args once, share across file
  window.BId = getParameterByName('BId');
  window.EnrId = getParameterByName('EnrId');

  // Kick off page when we have a BranchId
  if (BId) {
    BranchDataRetrive();
    retriveCount();
  }

  // Mount static donut once (demo/placeholder)
  const donutMount = document.querySelector('#donutChartNew');
  if (donutMount) {
    const colors = themeColors();
    const chart = new ApexCharts(donutMount, {
      chart: { height: 390, type: 'donut', toolbar: { show: false }, foreColor: colors.text },
      labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
      series: [42, 7, 25, 25],
      colors: [colors.ok, colors.red, colors.amber, colors.blue],
      stroke: { show: false },
      dataLabels: {
        enabled: true,
        formatter: (v) => parseInt(v, 10) + '%',
        style: { fontSize: '12px' }
      },
      legend: {
        show: true, position: 'bottom',
        markers: { offsetX: -3 },
        itemMargin: { vertical: 3, horizontal: 10 },
        labels: { colors: colors.muted, useSeriesColors: false }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '72%',
            labels: {
              show: true,
              name: { fontSize: '2rem', fontFamily: 'Public Sans' },
              value: { fontSize: '1.2rem', color: colors.muted, fontFamily: 'Public Sans',
                formatter: (v) => parseInt(v, 10) + '%' },
              total: {
                show: true, fontSize: '1.5rem', color: colors.text, label: 'Operational',
                formatter: (w) => parseInt(w.globals.series?.[0] || 0, 10) + '%'
              }
            }
          }
        }
      },
      responsive: [
        { breakpoint: 992, options: { chart: { height: 380 } } },
        { breakpoint: 576, options: { chart: { height: 320 } } },
        { breakpoint: 420, options: { chart: { height: 280 }, legend: { show: false } } },
        { breakpoint: 360, options: { chart: { height: 250 }, legend: { show: false } } }
      ]
    });
    chart.render();
  }

  // Load charts fed by API
  retriveMonthWiseMSMECount();
  retriveAreaWiseMSME();
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

// Theming hooks (reads CSS variables with fallbacks)
function themeColors() {
  const get = (v, fb) => (getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fb);
  return {
    muted: get('--muted', '#9ca3af'),
    text:  get('--text',  '#e5e7eb'),
    ok:    '#22c55e',
    blue:  '#3b82f6',
    amber: '#f59e0b',
    red:   '#ef4444'
  };
}

// ───────────────────────────────────────────────────────────────────────────────
// init (none; bootstrap block triggers initial sequence)
// ───────────────────────────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────────────────────────
// API
// ───────────────────────────────────────────────────────────────────────────────
function retriveMonthWiseMSMECount() {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'selectMonthWiseMSMEData',
      param1: 'BranchId',
      param1Value: parseInt(BId),
      StoreProcedure: 'BranchDashBoard_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      const rows = JSON.parse(data);
      const months = rows.map(r => r.Month);
      const counts = rows.map(r => parseInt(r.SMME_Count, 10));
      initEarningCharts(months, counts);
      initSmmeLastYearChart(counts);
    },
    error: function () {
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

function retriveAreaWiseMSME() {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'SelectAreaWiseMSMECount',
      param1: 'BranchId',
      param1Value: parseInt(BId),
      StoreProcedure: 'BranchDashBoard_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      const rows = JSON.parse(data);
      renderAreaWisePieChart(
        rows.map(x => x.BWA_AreaName),
        rows.map(x => parseInt(x.MSMECount, 10))
      );
    },
    error: function () {
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

function retriveCount() {
  const payload = JSON.stringify({
    global: {
      TransactionType: 'selectCountBranchData',
      param1: 'BranchId',
      param1Value: parseInt(BId),
      StoreProcedure: 'BranchDashBoard_USP'
    }
  });

  $.ajax({
    type: 'POST',
    url: '/ScriptJson/GetGlobalMasterTransaction',
    contentType: 'application/json; charset=utf-8',
    data: payload,
    dataType: 'json',
    success: function (data) {
      const d = JSON.parse(data);
      const row = d?.[0] || {};
      $('#totalArea').text(row.TotalArea || 0);
      $('#totalSMME').text(row.TotalSMME || 0);
      $('#totalUser').text(row.TotalUser || 0);
      $('#totalProject').text(row.TotalProject || 0);
      $('#thisMonthAddedSMME').text(row.TotalAddedSMMEInThisMonth || 0);
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
    url: '/ScriptJson/GetGlobalMasterTransaction',
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
      Swal.fire({
        title: 'Process Not Successful',
        icon: 'error',
        customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
        buttonsStyling: false
      });
    }
  });

  return false;
}

// ───────────────────────────────────────────────────────────────────────────────
// renderers
// ───────────────────────────────────────────────────────────────────────────────
function initSmmeLastYearChart(seriesData) {
  const el = document.querySelector('#smmeLastYear');
  if (!el) return;

  const colors = themeColors();
  new ApexCharts(el, {
    chart: { height: 78, type: 'area', parentHeightOffset: 0, toolbar: { show: false }, sparkline: { enabled: true } },
    markers: { colors: 'transparent', strokeColors: 'transparent' },
    grid: { show: false },
    colors: ['#22c55e'],
    fill: { type: 'gradient', gradient: { shade: 'light', shadeIntensity: 0.8, opacityFrom: 0.6, opacityTo: 0.25 } },
    dataLabels: { enabled: false },
    stroke: { width: 2, curve: 'smooth' },
    series: [{ data: seriesData }],
    xaxis: { show: true, lines: { show: false }, labels: { show: false }, stroke: { width: 0 }, axisBorder: { show: false } },
    yaxis: { stroke: { width: 0 }, show: false },
    tooltip: { enabled: false }
  }).render();
}

function initEarningCharts(xAxisdata, yAxisdata) {
  // Column chart
  const weeklyEl = document.querySelector('#weeklyEarningReports');
  if (weeklyEl) {
    const colors = themeColors();
    new ApexCharts(weeklyEl, {
      chart: { height: 202, parentHeightOffset: 0, type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { barHeight: '60%', columnWidth: '38%', startingShape: 'rounded', endingShape: 'rounded', borderRadius: 4, distributed: true } },
      grid: { show: false, padding: { top: -30, bottom: 0, left: -10, right: -10 } },
      colors: [colors.ok, colors.ok, colors.ok, colors.ok, '#22c55e', colors.ok, colors.ok],
      dataLabels: { enabled: false },
      series: [{ data: yAxisdata }],
      legend: { show: false },
      xaxis: { categories: xAxisdata, axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: colors.muted, fontSize: '13px', fontFamily: 'Public Sans' } } },
      yaxis: { labels: { show: false } },
      tooltip: { enabled: false }
    }).render();
  }

  // Stacked bar chart
  const totalEl = document.querySelector('#totalEarningChart');
  if (totalEl) {
    new ApexCharts(totalEl, {
      series: [
        { name: 'Earning', data: [15, 10, 20, 8, 12, 18, 12, 5] },
        { name: 'Expense', data: [-7, -10, -7, -12, -6, -9, -5, -8] }
      ],
      chart: { height: 230, parentHeightOffset: 0, stacked: true, type: 'bar', toolbar: { show: false } },
      tooltip: { enabled: false },
      legend: { show: false },
      plotOptions: { bar: { horizontal: false, columnWidth: '18%', borderRadius: 5, startingShape: 'rounded', endingShape: 'rounded' } },
      colors: ['#3b82f6', '#817D8D'],
      dataLabels: { enabled: false },
      grid: { show: false, padding: { top: -40, bottom: -20, left: -10, right: -2 } },
      xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
      yaxis: { labels: { show: false } }
    }).render();
  }
}

let areaPieChart = null;
function renderAreaWisePieChart(labels, series) {
  if (areaPieChart) areaPieChart.destroy();
  const colors = themeColors();
  areaPieChart = new ApexCharts(document.querySelector('#piChartNew'), {
    chart: { type: 'pie', height: 380, toolbar: { show: false }, foreColor: colors.text },
    labels, series,
    colors: [colors.ok, colors.red, colors.amber, colors.blue, '#8b5cf6', '#10b981', '#f97316'],
    stroke: { show: false },
    dataLabels: { enabled: true, formatter: (v) => parseInt(v, 10) + '%', style: { fontSize: '12px' } },
    legend: { show: true, position: 'bottom', markers: { offsetX: -3 }, itemMargin: { vertical: 3, horizontal: 10 },
      labels: { colors: colors.muted, useSeriesColors: false } },
    responsive: [
      { breakpoint: 576, options: { chart: { height: 320 } } },
      { breakpoint: 420, options: { chart: { height: 280 }, legend: { show: false } } }
    ]
  });
  areaPieChart.render();
}

// ───────────────────────────────────────────────────────────────────────────────
// actions (routing)
// ───────────────────────────────────────────────────────────────────────────────
$('.nav-link').filter(function () { return $(this).text().trim() === 'Projects'; })
  .on('click', function () { window.location.href = `/Enterprise/BranchWiseProject?BId=${BId}&EnrId=${EnrId}`; });

$('.nav-link').filter(function () { return $(this).text().trim() === 'User Lists'; })
  .on('click', function () { window.location.href = `/Enterprise/BranchWiseUser?BId=${BId}&EnrId=${EnrId}`; });

$('.nav-link').filter(function () { return $(this).text().trim() === 'Areas'; })
  .on('click', function () { window.location.href = `/Enterprise/BranchWiseArea?BId=${BId}&EnrId=${EnrId}`; });
