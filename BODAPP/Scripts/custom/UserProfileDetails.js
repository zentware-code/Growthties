
var uId = '';

$(document).ready(function () {
    uId = getParameterByName('Id');
    retriveUserProfileData();
    retriveProjectList()
});

function retriveUserProfileData() {
    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectUserProfileDetails",
            param1: "UM_Id",
            param1Value: parseInt(uId),
            StoreProcedure: "UserMaster_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        //complete: function () {
        //    LoaderEnd(".loader-sectionenr");
        //},
        success: function (data) {
            data = JSON.parse(data);
            $('#spnHeadName').text(data[0].UM_Name);
            $('#spnHeadRole').text(data[0].UM_SubRole);
            $('#spnHeadBranch').text(data[0].BD_Name);
            $('#spnDate').text(data[0].UM_CreatedAt);
            $('#spnName').text(data[0].UM_Name);
            $('#spnBranch').text(data[0].BD_Name);
            $('#spnRole').text(data[0].UM_SubRole);
            $('#spnCountry').text(data[0].CM_CountryName);
            $('#spnUserId').text('No Id');
            $('#spnContactNo').text(data[0].UM_ContactNo);
            $('#spnEmail').text(data[0].UM_EmailId);
            $('#spnTown').text(data[0].ENR_City);
            

            if (data && data[0]) {
                const profilePic = data[0].UM_ProfilePic;
                const prefix = data[0].UM_Prefix || "";
                const fullName = data[0].UM_Name || "";

                const initials = (fullName.match(/\b\w/g) || [])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() || prefix.toUpperCase();

                const bgColors = ["primary", "secondary", "success", "danger", "warning", "info"];
                const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

                if (!profilePic || profilePic === "NO" || profilePic === "") {
                    $('#spnanAvtar').hide();
                    $('#spnanInitials')
                        .text(initials)
                        .show()
                        .parent()
                        .removeClass()
                       .addClass(`d-flex justify-content-center align-items-center  bg-${randomColor} text-white fw-bold`)
                       .css({ width: '100%', height: '100px', fontSize: '33px' });

                } else {
                    $('#spnanInitials').hide();
                    $('#spnanAvtar').attr('src', profilePic).show();
                }
            }



            //if ((data[0].UM_ProfilePic == "NO") || (data[0].UM_ProfilePic == " ")) {
            //    $('#spnanAvtar').attr('src', '/Content/assets/img/avatars/default_photo.png');
            //}
            //else {
            //    $('#spnanAvtar').attr('src', data[0].UM_Prefix);
            //}

        },
        error: function (data) {
                LoaderEnd(".loader-sectionenr");
            
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function retriveProjectList() {
    //if ($("#hdnUserType").val() == "SMMEUser") {
    //    var postData = JSON.stringify({
    //        global: {
    //            TransactionType: 'SelectProjectsListForSMMEDashboardForAssignedUser',
    //            param1: 'SMMEId',
    //            param1Value: parseInt($('#hdnSMMEId').val()),
    //            param2: 'UWP_UserId',
    //            param2Value: parseInt($('#hdnUserId').val()),
    //            StoreProcedure: 'SMMEDashBoard_USP'
    //        }
    //    });
    //} else {
        var postData = JSON.stringify({
            global: {
                TransactionType: "SelectUserWiseProjectForProfileDetails",
                param1: 'UWP_UserId',
                param1Value: parseInt(uId),
                StoreProcedure: "UserMaster_USP"
            }
        });
    //}

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',  /// "GetGlobalMasterTransaction", "ScriptJson")
        contentType: "application/json; charset=utf-8",
        data: postData,
        dataType: "json",
        //complete: function () {

        //},
        success: function (res) {
            LoaderEnd(".loader-sectionenr");

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
                                               '<span class="text-truncate fw-medium"><a style="width: 125px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;" href="/Project/ProjectDetailsNew?Id=' + Pd_Id + '">' + name + '</a></span>' +
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
                                               '<a href="/Project/ProjectDetailsNew?Id=' + Pd_Id + '" class="dropdown-item">View</a>' +
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
                LoaderEnd(".loader-sectionenr");
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}


var uId = $('#hdnId').val(); // Get user ID from hidden input

$('.nav-link').on('click', function () {
    var target = $(this).data('target');
    var url = "";

    if (target === "Profile") {
        url = "/Home/UserProfileDetails?Id=" + uId;
    } else if (target === "MSMEs") {
        url = "/Home/UserWiseSMME?Id=" + uId;
    } else if (target === "Areas") {
        url = "/Home/UserWiseArea?Id=" + uId;
    } else if (target === "Projects") {
        url = "/Home/UserWiseProject?Id=" + uId;
    }

    if (url !== "") {
        window.location.href = url;
    }
});


