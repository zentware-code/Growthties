
!function () {
    retriveSMMEDashboardData();
    retriveProjectList();
    retriveSMMEUserDetails();
}();

function retriveSMMEDashboardData() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEDashBoard',
            param1: 'SMMEId',
            param1Value: parseInt($('#hdnSMMEId').val()),
            StoreProcedure: 'SMMEDashBoard_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetSMMEDashboardData',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#smmedashboardLoading");
        },
        complete: function () {
            LoaderEnd("#smmedashboardLoading");
        },
        success: function (data) {
            // Parse the first object from the array
            //var data = response[0];
            console.log("MSMEData- ", data);

            $('#totalProject').text(data.TotalProject);
            $('#totalTask').text(data.TotalTask);
            $('#totalActivity').text(data.TotalActivity);
            $('#totalAssessment').text(data.TotalAssesment);
            // Correctly render the badge as HTML
            $('#SMMEVerificationStatus').html(data.SMMEVerificationStatus);

            // Set values in HTML
            if (data.PendingAssessment > 0) {
                // Show dimmed overlay behind popup
                document.getElementById("pageFadeOverlay").style.display = "block";
                // Correctly render the badge as HTML
                //$('#SMMEVerificationStatus').html(data.SMMEVerificationStatus);

                Swal.fire({
                    title: '<div style="font-size: 28px; font-weight: 700; margin-bottom: 15px;">Welcome!</div>',
                    html:
                      '<div style="font-size: 15px; color: #444; margin-bottom: 10px;">' +
                        'Before you get started, please take a moment to complete the <b>Mandatory Questionnaire</b>' +
                      '</div>' +
                      '<div style="font-size: 15px; color: #444; margin-bottom: 10px;">' +
                        'This helps us ensure everything is in place for your full participation.' +
                      '</div>' +
                      '<div style="font-weight: 700; font-size: 15px; margin-bottom: 10px;">It only takes a few minutes</div>' +
                      '<div style="font-size: 14px; color: #444;">🖇️ You may be asked to upload supporting documents</div>',
                    showConfirmButton: true,
                    confirmButtonText: 'CLICK BELOW TO BEGIN',
                    customClass: {
                        popup: 'swal2-popup-custom',
                        confirmButton: 'btn btn-warning waves-effect waves-light'
                    },
                    buttonsStyling: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(function (result) {
                    document.getElementById("pageFadeOverlay").style.display = "none";
                    if (result.isConfirmed) {
                        getValue(110);
                        window.location.href = '/Assessment/AllAssessmentListForSMME';
                    }
                });
            } else {
                $('#totalProject').text(data.TotalProject);
                $('#totalTask').text(data.TotalTask);
                $('#totalActivity').text(data.TotalActivity);
                $('#totalAssessment').text(data.TotalAssesment);
                // Correctly render the badge as HTML
                $('#SMMEVerificationStatus').html(data.SMMEVerificationStatus);
            }



        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
    return false;
}

function retriveProjectList() {
    if ($("#hdnUserType").val() == "SMMEUser") {
        var postData = JSON.stringify({
            global: {
                TransactionType: 'SelectProjectsListForSMMEDashboardForAssignedUser',
                param1: 'SMMEId',
                param1Value: parseInt($('#hdnSMMEId').val()),
                param2: 'UWP_UserId',
                param2Value: parseInt($('#hdnUserId').val()),
                StoreProcedure: 'SMMEDashBoard_USP'
            }
        });
    } else {
        var postData = JSON.stringify({
            global: {
                TransactionType: "SelectProjectsListForSMMEDashboard",
                param1: 'SMMEId',
                param1Value: parseInt($('#hdnSMMEId').val()),
                StoreProcedure: "SMMEDashBoard_USP"
            }
        });
    }

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
                        { data: "LeaderName" },   // leader
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
                                               '<span class="text-truncate fw-medium"><a style="width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;" href="/Project/ProjectDetailsNew?Id=' + Pd_Id + '&Role=smme" onclick="getValue(102)">' + name + '</a></span>' +
                                               '<small class="text-truncate text-muted" style="width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + date + '</small>' +
                                           '</div>' +
                                       '</div>';
                            }
                        },
                        {
                            targets: 3,
                            render: function (data, type, row) {
                                var LeaderName = row.LeaderName || "";
                                return '<div class="d-flex align-items-center">' +
                                           '<span style="width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;">' + LeaderName + '</span>' +
                                       '</div>';
                            }
                        },
                           {
                               targets: 4,
                               orderable: false,
                               searchable: false,
                               render: function (data, type, row) {
                                   // Check if SMMELogoList is null or empty
                                   var logoList = row.SMMELogoList;
                                   if (!logoList) {
                                       logoList = ' ';
                                   }
                                   var html = '<div class="d-flex align-items-center avatar-group mb-0 mt-1">';
                                   html += '<div class="avatar avatar-sm me-1">' +
                                               '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1  open-smm-modal" data-id="' + row.PD_Id + '">' + logoList + '</ul>' +
                                           '</div>';
                                   html += '</div>';
                                   return html;
                               }

                           },

                        {
                            targets: 5,
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
                            targets: 6,
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
                                               '<a href="/Project/ProjectDetailsNew?Id=' + Pd_Id + '&Role=smme" class="dropdown-item" onclick="getValue(102)">View</a>' +
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

function retriveSMMEUserDetails() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllSMMEUserForDashboard',
            param1: 'SMMEId',
            param1Value: parseInt($('#hdnSMMEId').val()),
            StoreProcedure: "SMMEDashBoard_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#datatable-example");
        },
        complete: function () {
            LoaderEnd("#datatable-example");
        },
        success: function (data, status) {
            console.log('Received data:', data);  // Log the data for debugging
            var data = JSON.parse(data);
            // Check if the response is an array
            if (Array.isArray(data) && data.length > 0) {
                var userHtml = '';

                // Loop through the user data and build HTML using string concatenation
                data.forEach(function (user) {
                    userHtml += '<ul class="timeline timeline-advance mb-2 pb-1">' +
                        '<li class="timeline-item ps-4 border-left-dashed">' +
                            '<span class="timeline-indicator timeline-indicator-success">' +
                                '<i class="ti ti-circle-check"></i>' +
                            '</span>' +
                            '<div class="timeline-event ps-0 pb-0">' +
                                '<div class="timeline-header">' +
                                    '<small class="text-success text-uppercase fw-medium">USER</small>' +
                                '</div>' +
                                '<h6 class="mb-0">' + user.UM_Name + '</h6>' +
                                '<p class="text-muted mb-0 text-nowrap">' + user.UM_EmailId + '</p>' +
                            '</div>' +
                        '</li>' +
                        '<li class="timeline-item ps-4 border-transparent">' +
                            '<span class="timeline-indicator timeline-indicator-primary">' +
                                '<i class="ti ti-map-pin"></i>' +
                            '</span>' +
                            '<div class="timeline-event ps-0 pb-0">' +
                                '<div class="timeline-header">' +
                                    '<small class="text-primary text-uppercase fw-medium">Contact Number</small>' +
                                '</div>' +
                                '<p class="text-muted mb-0 text-nowrap">' + user.UM_ContactNo + '</p>' +
                            '</div>' +
                        '</li>' +
                        //'<li class="timeline-item ps-4 border-transparent">' +
                        //    '<span class="timeline-indicator timeline-indicator-primary">' +
                        //        '<i class="ti ti-email"></i>' +
                        //    '</span>' +
                        //    '<div class="timeline-event ps-0 pb-0">' +
                        //        '<div class="timeline-header">' +
                        //            '<small class="text-primary text-uppercase fw-medium">Email</small>' +
                        //        '</div>' +
                        //        '<p class="text-muted mb-0 text-nowrap">' + user.UM_EmailId + '</p>' +
                        //    '</div>' +
                        //'</li>' +
                    '</ul>';
                });

                // Insert the generated HTML into the target div
                $('#navs-justified-new').html(userHtml);
            } else if (data && data.length === 0) {
                // If data is an empty array, show a message
                $('#navs-justified-new').html('<p>No users found.</p>');
            } else {
                // Improved error handling
                $('#navs-justified-new').html(
                    '<div class="alert alert-danger" role="alert">' +
                    '<strong>Error:</strong> Invalid data received. The expected response format is an array of user objects. ' +
                    'Please check the structure of the response or contact support if the issue persists.' +
                    '</div>'
                );
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // Handle the AJAX error
            alert('Request failed: ' + errorThrown);
        }
    });
}
