var SMMLogoList = '';
"use strict";
let e, t, a, r, o;
! function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);

    retriveStakeholderDashboardData();
    retriveCount();

  
    o = isDarkStyle ? (e = config.colors_dark.cardColor, a = config.colors_dark.textMuted, t = config.colors_dark.headingColor, r = "dark", "#5E6692") : (e = config.colors.cardColor, a = config.colors.textMuted, t = config.colors.headingColor, r = "", "#817D8D");
    var s = document.querySelector("#swiper-with-pagination-cards"),
        s = (s && new Swiper(s, {
            loop: !0,
            autoplay: {
                delay: 2500,
                disableOnInteraction: !1
            },
            pagination: {
                clickable: !0,
                el: ".swiper-pagination"
            }
        }), document.querySelector("#revenueGenerated")),
        i = {
            chart: {
                height: 130,
                type: "area",
                parentHeightOffset: 0,
                toolbar: {
                    show: !1
                },
                sparkline: {
                    enabled: !0
                }
            },
            markers: {
                colors: "transparent",
                strokeColors: "transparent"
            },
            grid: {
                show: !1
            },
            colors: [config.colors.success],
            fill: {
                type: "gradient",
                gradient: {
                    shade: r,
                    shadeIntensity: .8,
                    opacityFrom: .6,
                    opacityTo: .1
                }
            },
            dataLabels: {
                enabled: !1
            },
            stroke: {
                width: 2,
                curve: "smooth"
            },
            series: [{
                data: [300, 350, 330, 380, 340, 400, 380]
            }],
            xaxis: {
                show: !0,
                lines: {
                    show: !1
                },
                labels: {
                    show: !1
                },
                stroke: {
                    width: 0
                },
                axisBorder: {
                    show: !1
                }
            },
            yaxis: {
                stroke: {
                    width: 0
                },
                show: !1
            },
            tooltip: {
                enabled: !1
            }
        },

        s = (null !== s && new ApexCharts(s, i).render(), document.querySelector("#weeklyEarningReports")),
        i = {
            chart: {
                height: 202,
                parentHeightOffset: 0,
                type: "bar",
                toolbar: {
                    show: !1
                }
            },
            plotOptions: {
                bar: {
                    barHeight: "60%",
                    columnWidth: "38%",
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadius: 4,
                    distributed: !0
                }
            },
            grid: {
                show: !1,
                padding: {
                    top: -30,
                    bottom: 0,
                    left: -10,
                    right: -10
                }
            },
            colors: [config.colors_label.primary, config.colors_label.primary, config.colors_label.primary, config.colors_label.primary, config.colors.primary, config.colors_label.primary, config.colors_label.primary],
            dataLabels: {
                enabled: !1
            },
            series: [{
                data: [40, 65, 50, 45, 90, 55, 70]
            }],
            legend: {
                show: !1
            },
            xaxis: {
                categories: ["Jan", "Feb", "March", "Apr", "June", "July", "Aug"],
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                labels: {
                    style: {
                        colors: a,
                        fontSize: "13px",
                        fontFamily: "Public Sans"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: !1
                }
            },
            tooltip: {
                enabled: !1
            },
            responsive: [{
                breakpoint: 1025,
                options: {
                    chart: {
                        height: 199
                    }
                }
            }]
        },

        s = (null !== s && new ApexCharts(s, i).render(), document.querySelector("#totalEarningChart")),
        i = {
            series: [{
                name: "Earning",
                data: [15, 10, 20, 8, 12, 18, 12, 5]
            }, {
                name: "Expense",
                data: [-7, -10, -7, -12, -6, -9, -5, -8]
            }],
            chart: {
                height: 230,
                parentHeightOffset: 0,
                stacked: !0,
                type: "bar",
                toolbar: {
                    show: !1
                }
            },
            tooltip: {
                enabled: !1
            },
            legend: {
                show: !1
            },
            plotOptions: {
                bar: {
                    horizontal: !1,
                    columnWidth: "18%",
                    borderRadius: 5,
                    startingShape: "rounded",
                    endingShape: "rounded"
                }
            },
            colors: [config.colors.primary, o],
            dataLabels: {
                enabled: !1
            },
            grid: {
                show: !1,
                padding: {
                    top: -40,
                    bottom: -20,
                    left: -10,
                    right: -2
                }
            },
            xaxis: {
                labels: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                axisBorder: {
                    show: !1
                }
            },
            yaxis: {
                labels: {
                    show: !1
                }
            },
            responsive: [{
                breakpoint: 1468,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "22%"
                        }
                    }
                }
            }, {
                breakpoint: 1197,
                options: {
                    chart: {
                        height: 228
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 8,
                            columnWidth: "26%"
                        }
                    }
                }
            }, {
                breakpoint: 783,
                options: {
                    chart: {
                        height: 232
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 6,
                            columnWidth: "28%"
                        }
                    }
                }
            }, {
                breakpoint: 589,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "16%"
                        }
                    }
                }
            }, {
                breakpoint: 520,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 6,
                            columnWidth: "18%"
                        }
                    }
                }
            }, {
                breakpoint: 426,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 5,
                            columnWidth: "20%"
                        }
                    }
                }
            }, {
                breakpoint: 381,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "24%"
                        }
                    }
                }
            }],
            states: {
                hover: {
                    filter: {
                        type: "none"
                    }
                },
                active: {
                    filter: {
                        type: "none"
                    }
                }
            }
        }

        
    retriveProjectList();
}();


let radialGrph = (divSelector, peram) => {
    //var completedAssessment = parseFloat($('#completedAssessment').val());
    //var radialData = peram.toFixed(2);
    //// Ensure `peram` is a valid number
    var radialData = (isNaN(peram) || peram === null) ? 0 : peram.toFixed(2);

    var options = {
        series: [parseFloat(radialData)],
        chart: {
            height: 145,
            sparkline: {
                enabled: true
            },
            parentHeightOffset: 0,
            type: "radialBar"
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    size: "65%"
                },
                track: {
                    strokeWidth: "45%"
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        fontSize: "22px",
                        fontWeight: 500,
                        offsetY: -5
                    }
                }
            }
        },
        grid: {
            show: false,
            padding: {
                bottom: 5
            }
        },
        stroke: {
            lineCap: "round"
        },
        labels: ["Progress"]
    };

    var chart = new ApexCharts(document.querySelector(divSelector), options);
    chart.render();
};

let budgetAllotionGraph = (divSelector, value) => {
   
    var optionsApex = {
        series: [parseFloat(value) || 0],
        labels: ["Total Allocated Budget"],
        chart: {
            height: 360,
            type: "radialBar"
        },
        plotOptions: {
            radialBar: {
                offsetY: 10,
                startAngle: -140,
                endAngle: 130,
                hollow: {
                    size: "65%"
                },
                track: {
                    background: e,
                    strokeWidth: "100%"
                },
                dataLabels: {
                    name: {
                        offsetY: -20,
                        color: a,
                        fontSize: "13px",
                        fontWeight: "400",
                        fontFamily: "Public Sans"
                    },
                    value: {
                        offsetY: 10,
                        color: t,
                        fontSize: "38px",
                        fontWeight: "500",
                        fontFamily: "Public Sans"
                    }
                }
            }
        },
        colors: [config.colors.primary],
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                shadeIntensity: .5,
                gradientToColors: [config.colors.primary],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: .6,
                stops: [30, 70, 100]
            }
        },
        stroke: {
            dashArray: 10
        },
        grid: {
            padding: {
                top: -20,
                bottom: 5
            }
        },
        states: {
            hover: {
                filter: {
                    type: "none"
                }
            },
            active: {
                filter: {
                    type: "none"
                }
            }
        },
        responsive: [
            {
                breakpoint: 1025,
                options: {
                    chart: {
                        height: 330
                    }
                }
            },
            {
                breakpoint: 769,
                options: {
                    chart: {
                        height: 280
                    }
                }
            }
        ]
    };
    var chart = new ApexCharts(document.querySelector(divSelector), optionsApex);
    chart.render();
};



function retriveProjectList() {
    var EnterId = document.getElementById("EntrId").value;
    var StakeholderId = document.getElementById("StakeHolderId").value;

    var TranType = '';
    if ($('#hdnStakeHolderType').val() == 'SU') {
        TranType = "SelectProjectsListDataForStakeholderDashboardUser";
    } else {
        TranType = "SelectProjectsListDataForStakeholderDashboard";
    }

    var postData = JSON.stringify({
        global: {
            TransactionType: TranType,
            param1: "EnterpriseId",
            //param1Value: parseInt(EnterId),
            param2: "StakeholderId",
            //param2Value: parseInt(StakeholderId),
            StoreProcedure: "ProjectDetails_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',  /// "GetGlobalMasterTransaction", "ScriptJson")
        contentType: "application/json; charset=utf-8",
        data: postData,
        dataType: "json",
        //complete: function () {
           
        //},
        success: function (res) {
            var data = JSON.parse(res);
            data = data.slice(0, 5); // ⬅️ Keep only top 5
            //console.log('projectListData',data)
            var table = $(".datatables-projects");

            if (table.length) {
                table.DataTable({
                    data: data,
                    destroy: true,
                    columns: [
                        { data: '' },               // control
                        { data: "PD_Id" },               // checkbox
                        { data: "PD_ProjectName" },     // name
                        //{ data: "LeaderName" },   // leader
                        { data: "SMMELogoList" },             // MSMEs (avatars)
                        { data: "Status" },           // status
                        { data: '' }                // actions
                    ],
                    columnDefs: [
                        {
                            className: "control",
                            targets: 0,
                            orderable: false,
                            searchable: false,
                            responsivePriority: 2,
                            render: function () {
                                return "";
                            }
                        },
                        {
                            targets: 1,
                            orderable: false,
                            searchable: false,
                            responsivePriority: 3,
                            render: function () {
                                return ' ';
                            }
                        },
                        {
                            targets: 2,
                            responsivePriority: 1,
                            render: function (data, type, row) {
                                var img = row.project_img;
                                var name = row.PD_ProjectName || "";
                                var Pd_Id = row.PD_Id;
                                var date = row.PD_Duration || "";
                                var initials = "";
                                
                                if (!img && name) {
                                    var matches = name.match(/\b\w/g);
                                    if (matches && matches.length >= 2) {
                                        initials = (matches[0] + matches[matches.length - 1]).toUpperCase();
                                    }
                                }

                                var avatar = img
                                    ? '<img src="' + assetsPath + 'img/icons/brands/' + img + '" alt="Avatar" class="rounded-circle">'
                                    : '<span class="avatar-initial rounded-circle bg-label-' +
                                      ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(Math.random() * 6)] +
                                      '">' + initials + '</span>';

                                return '<div class="d-flex justify-content-left align-items-center">' +
                                           '<div class="avatar-wrapper">' +
                                               '<div class="avatar me-2">' + avatar + '</div>' +
                                           '</div>' +
                                           '<div class="d-flex flex-column">' +
                                               '<span class="text-truncate fw-medium"><a style="width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;" href="/Stakeholder/ProjectDetailsNew?Id=' + Pd_Id + '">' + name + '</a></span>' +
                                               '<small class="text-truncate text-muted" style="width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + date + '</small>' +
                                           '</div>' +
                                       '</div>';
                                }
                            },
                           {
                               targets: 3,
                               orderable: false,
                               searchable: false,
                               render: function (data, type, row) {
                                   // Check if SMMELogoList is null or empty
                                   var logoList = row.SMMELogoList;
                                   if (!logoList) {
                                       logoList = 'No MSME Associated';
                                   }
                                   var html = '<div class="d-flex align-items-center avatar-group mb-0 mt-1">';
                                   html += '<div class="avatar avatar-sm me-1 mb-3">' +
                                               '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1 open-smm-modal" data-id="' + row.PD_Id + '">' + logoList + '</ul>' +
                                           '</div>';
                                   html += '</div>';
                                   return html;
                               }

                           },

                        {
                            targets: 4,
                            render: function (data, type, row) {
                                var status = row.Status || "0";
                                return '<div class="d-flex align-items-center">' +
                                           '<div class="progress w-100 me-3" style="height: 6px;">' +
                                               '<div class="progress-bar" style="width: ' + status + '%;" aria-valuenow="' + status + '%" aria-valuemin="0" aria-valuemax="100"></div>' +
                                           '</div>' +
                                           '<span>' + status + '%</span>' +
                                       '</div>';
                            }
                        },
                        {
                            targets: 5,
                            //orderable: false,
                            //searchable: false,
                            //title: "Actions",
                            render: function (data, type, row) {
                                var Pd_Id = row.PD_Id;
                                return '<div class="d-inline-block">' +
                                           '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                                               '<i class="ti ti-dots-vertical"></i>' +
                                           '</a>' +
                                           '<div class="dropdown-menu dropdown-menu-end m-0">' +
                                              '<a href="/Stakeholder/ProjectDetails?Id=' + Pd_Id + '" class="dropdown-item" onclick="return getValue(123);">Edit</a>' +
                                              '<a href="/Stakeholder/ProjectDetailsNew?Id=' + Pd_Id + '" class="dropdown-item" onclick="return getValue(123);">View</a>' +

                                           '</div>' +
                                       '</div>';
                            }
                        }
                    ],
                    order: [[2, "desc"]],
                    lengthMenu: [5, 10, 25, 50, 100],
                    displayLength: 5,
                    responsive: {
                        details: {
                            display: $.fn.dataTable.Responsive.display.modal({
                                header: function (row) {
                                    return 'Details of "' + row.data().project_name + '" Project';
                                }
                            }),
                            type: "column",
                            renderer: function (api, rowIdx, columns) {
                                var data = $.map(columns, function (col) {
                                    return col.title ?
                                        '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                            '<td>' + col.title + ':</td> <td>' + col.data + '</td>' +
                                        '</tr>' : '';
                                }).join('');

                                return data ? $('<table class="table"><tbody></tbody></table>').append(data) : false;
                            }
                        }
                    },
                    dom: '<"card-header pb-0 pt-sm-0"<"head-label text-center"><"d-flex justify-content-center justify-content-md-end"f>>' +
                         't<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
                });

                $("div.head-label").html('<h5 class="card-title mb-0">Projects</h5>');

                setTimeout(function () {
                    $(".dataTables_filter .form-control").removeClass("form-control-sm");
                    $(".dataTables_length .form-select").removeClass("form-select-sm");
                    LoaderEnd(".loader-section");
                }, 300);
            }
        },
        error: function () {
            alert("Request failed");
        }
    });
}


function retriveStakeholderDashboardData() {
    if ($('#hdnStakeHolderType').val() == 'SU') {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectEnterpriseDashBoardStakholderUser',
                param1: 'EnrId',
                param1Value: parseInt($('#EntrId').val()),
                param2: 'StakeHolderId',
                param2Value: parseInt($('#StakeHolderId').val()),
                //param3: 'UserId',
                //param3Value: parseInt($('#hdnStakeHolderUserId').val()),
                StoreProcedure: 'EnterpriseStakeHolderDashBoard_USP'
            }
        });
    } else if ($('#hdnStakeHolderType').val() == 'S') {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectEnterpriseDashBoard',
                param1: 'EnrId',
                param1Value: parseInt($('#EntrId').val()),
                param2: 'StakeHolderId',
                param2Value: parseInt($('#StakeHolderId').val()),
                StoreProcedure: 'EnterpriseStakeHolderDashBoard_USP'
            }
        });
    }

  

    

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetEnterpriseDashboardData',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            console.log("EnrData- ", data);
            $('.totalSMME').text(data.TotalSMME);
            $('#totalProject').text(data.TotalProject);
            $('#totalEmployee').text(data.TotalEmployee);
            $('#totalCust').text(data.TotalCust);

            $('#totalActiveSMME').text(data.TotalActiveSMME);
            $('#completedAssessment').text(data.CompletedAssessment);
            
            radialGrph('#expensesChart3', data.ActiveSMMEPercentage);
            radialGrph('#expensesChart4', data.CompletedAssessmentPercentage);
            budgetAllotionGraph('#supportTracker', data.AllocatedBudgetPercentage);
            //$('#allocatedBudget').val(data.AllocatedBudgetPercentage);
            //$('#activeSMMEPercentage').val(data.ActiveSMMEPercentage);
            $('#totalAssessment').text(data.TotalAssessment);
            $('#currentFinancialYear').text(data.CurrentFinancialYear);
            

            //$('#totalBudget').text(data.TotalBudget);
            formatToZAR(data.TotalBudget, '#spnTotalBudget');

            //$('#totalBudgetUpperCard').text(data.TotalBudget);
            formatToZAR(data.TotalBudget, '#spnTotalBudgetUpperCard');

            //$('#totalFundedBudget').text(data.TotalFundedBudget);
            formatToZAR(data.TotalFundedBudget, '#spnTotalFundedBudget');

            //$('#totalAllocatedBudget').text(data.TotalAllocatedBudget);
            formatToZAR(data.TotalAllocatedBudget, '#spnTotalAllocatedBudget');

            //$('#totalAvailableBudget').text(data.TotalAvailableBudget);
            formatToZAR(data.TotalAvailableBudget, '#spnTotalAvailableBudget');

            //$('#totalExpenditureBudget').text(data.TotalExpenditureBudget);
            formatToZAR(data.TotalExpenditureBudget, '#spnTotalExpenditureBudget');

            //$('#totalActivityWiseBudget').text(data.TotalActivityWiseBudget);
            formatToZAR(data.TotalActivityWiseBudget, '#spnTotalActivityWiseBudget');
            //$('#totalTaskWiseBudget').text(data.TotalTaskWiseBudget);
            formatToZAR(data.TotalTaskWiseBudget, '#spnTotalTaskWiseBudget');
            //$('#totalSMMEWiseBudget').text(data.TotalSMMEWiseBudget);
            formatToZAR(data.TotalSMMEWiseBudget, '#spnTotalSMMEWiseBudget');

            //$('#usersCreatedLastMonth').text(data.UsersCreatedLastMonth);
            //$('#assessmentsCreatedLastMonth').text(data.AssessmentsCreatedLastMonth);
            //$('#projectsCreatedLastMonth').text(data.ProjectsCreatedLastMonth);
            //$('#activitiesCreatedLastMonth').text(data.ActivitiesCreatedLastMonth);
            //$('#tasksCreatedLastMonth').text(data.TasksCreatedLastMonth);
            //$('#sMMEsCreatedLastMonth').text(data.SMMEsCreatedLastMonth);

           
            $('#totalProjects').text(data.totalProjects);
            $('#totalActivities').text(data.totalActivities);
            $('#totalTasks').text(data.totalTasks);
            $('#totalSMMEs').text(data.TotalSMME);
            
            $('#totalEntities').text((data.totalProjects) + (data.totalActivities) + (data.totalTasks) + (data.TotalSMME));

        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}



function retriveCount() {

    var _data = JSON.stringify({
        global: {
            TransactionType: "CountSMMEByStakeholder",
            param1: "ENR_Id",
            param2: 'SWS_StakeholderId',
            StoreProcedure: "SMMERegistration_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            $('#spnTotSmme').text(data[0].Total);
            $('#spnActiveSmme').text(data[0].Active);
            $('#spnDeactiveSmme').text(data[0].Deactive);
            $('#spnPendSmme').text(data[0].Pending);
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

