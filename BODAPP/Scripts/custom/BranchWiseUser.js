var BId = '';
var EnrId = '';

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function () {
    BId = getParameterByName('BId');
    EnrId = getParameterByName('EnrId');

    if (BId != '') {
        BranchDataRetrive();
        //BrancheWiseArea();
        ShowAllUser()
    }
});
 
function BrancheWiseArea() {
    var _data = JSON.stringify({
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
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart(".loader-sectionenr");
        //},
        //complete: function () {
        //    LoaderEnd(".loader-sectionenr");
        //},
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                if (count > 0) {
                    //var Card = '<div class="col-xl-4 col-lg-6 col-md-6"><div class="card"><div class="card-body"><div class="d-flex justify-content-between"><ul id="ul_' + v.ENR_Id + '" class="list-unstyled d-flex align-items-center avatar-group mb-0"></ul></div><div class="d-flex justify-content-between align-items-end mt-1"><div class="role-heading"><h4 class="mb-1" style="width:245px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><i class="text-primary ti-xs ti ti-map-pin me-1 mb-2 p-0 fs-4"></i>' + v.BWA_AreaName + '</h4></div><div class="dropdown z-2"><button class="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown" type="button"><i class="text-muted ti ti-dots-vertical"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><button class="dropdown-item" data-bs-target="#asignAreaUser" data-bs-toggle="modal" onclick="showEnrUserList(' + v.ENR_Id + ',' + v.BWA_Id + ')"><i class="ti ti-users me-2"></i>Manage Users</button></li></ul></div></div><div class="d-flex justify-content-between"><ul id="ul_1" class="list-unstyled d-flex align-items-center avatar-group mb-0">' + v.AreaWiseUserLogo + '</ul></div></div></div></div>'
                    var Card = '<div class="col-xl-4 col-lg-6 col-md-6"><div class="card"><div class="card-body"><div class="d-flex justify-content-between"><div class="role-heading"><h4 class="mb-1" style="width:245px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><i class="text-primary ti-xs ti ti-map-pin me-1 mb-2 p-0 fs-4"></i>' + v.BWA_AreaName + '</h4></div><div class="dropdown z-2"><button class="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown" type="button"><i class="text-muted ti ti-dots-vertical"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><button class="dropdown-item" data-bs-target="#asignAreaUser" data-bs-toggle="modal" onclick="showEnrUserList(' + v.ENR_Id + ',' + v.BWA_Id + ')"><i class="ti ti-users me-2"></i>Manage Users</button></li><li><a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top" title="AssignUsers" onclick="ShowAllUser(' + BId + ',' + v.BWA_Id + ')" data-bs-dismiss="modal"><i class="ti ti-eye me-2"></i>View Users</a></li><li><a href="#" class="dropdown-item" data-toggle="tooltip" data-placement="top" title="AssignSMME" onclick="ShowAllSMME('+ '\'' + v.BWA_AreaName + '\'' + ')" data-bs-dismiss="modal"><i class="ti ti-eye me-2"></i>View MSMEs</a></li></ul></div></div><div class="d-flex justify-content-between"><ul id="ul_1" class="list-unstyled d-flex align-items-center avatar-group mb-0">' + v.AreaWiseUserLogo + '</ul><div><span class="badge bg-label-warning">MSME</span><span class="badge bg-label-info">' + v.MSMECount + '</span></div></div></div></div></div>';

                    $("#dvEnrList").append(Card);
                    var id = "ul_" + v.ENR_Id
                    //fnBindSMME(v.ENR_Id, id)
                }
                else
                {
                    $("#dvEnrList").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
                }
               
            });
            if (count == 0) {
                $("#dvEnrList").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
            }
        },
        error: function (data) {
                //LoaderEnd(".loader-sectionenr");
            
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

function BranchDataRetrive() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBranchData',
            param1: 'BD_Id',
            param1Value: parseInt(BId),
            StoreProcedure: 'BranchDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (response) {
            // Step 1: Parse the JSON string into an array
            var data = typeof response === 'string' ? JSON.parse(response) : response;

            // Step 2: Validate and extract first item
            if (Array.isArray(data) && data.length > 0) {
                var item = data[0];
                
                $('#spnanAvtar').text(item.BranchAvatar || '');
                $('#spnHeadName').text(item.BD_Name || '');
                $('#spnCity').text(item.BD_City || '');
                $('#spnHeadEmail').text(item.BD_Email || '');
                $('#spnHeadPhone').text(item.BD_ContactNumber || '');
            } else {
                // No data found
                $("#dvEnrList").html(
                    '<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>'
                );
            }
        },
        error: function () {
            Swal.fire({
                title: 'Process Not Successful',
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-primary waves-effect waves-light"
                },
                buttonsStyling: false
            });
        }
    });

    return false;
}

function showEnrUserList(enrId, areaId) {
    $("#ulSTUserList").html("");
    var _data = JSON.stringify({
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
        type: "POST",
        url: URLList.GetList,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart(".loader-sectionenr");
        //},
        //complete: function () {
        //    LoaderEnd(".loader-sectionenr");
        //},
        success: function (data) {
            data = JSON.parse(data);

            //console.log('This is Enterprise LIst : ',data);

            var count = data.length;
            var isenable = 0;
            $.each(data, function (i, v) {

                var logo = "";
                var index = i + 1;
                if (v.UM_ProfilePic == "") {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.UM_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0">' + v.UM_Name + '</h6><span>' + v.UM_EmailId + '</span></div></div>';
                }
                else {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.UM_ProfilePic + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + v.UM_Name + '</h6><span>' + v.UM_EmailId + '</span></div></div>';
                }
                $("#ulSTUserList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input enr'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AreaTagToEnrUser(" + index + "," + BId + "," + areaId + "," + v.UM_ParentId + "," + v.UM_Id + ")'></div>");

            });
            $(".enr").find("checkbox").each(function () {
                if ($(this).prop('checked') == true) {
                    isenable = 1
                }
            });
            if (isenable == 0) {
                $('.enr').prop('disabled', false);
            }
        },
        error: function (data) {
                //LoaderEnd(".loader-sectionenr");
          
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





function AreaTagToEnrUser(index, BId, areaId, ENR_Id, UM_Id) {
    var Transaction = "";
    if ($('#chkId_' + index).is(':checked')) {
        Transaction = "InsertAreaTagToEnrUser";
    } else {
        Transaction = "UpdateAreaTagToEnrUser";
    }

    var _data = JSON.stringify({
        payload: {
                BWAU_BranchId: parseInt(BId),
                BWAU_EnrId: parseInt(ENR_Id),
                BWAU_BWAId: parseInt(areaId),
                BWAU_UserId: parseInt(UM_Id),
                TransactionType: Transaction,
            }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertBranchWiseAreaEnrUser',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Successful..!",
                    text: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}



function ShowAllUser(enrId, areaId) {
    $("#ulUserList").html("");
    var _data = JSON.stringify({
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
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart(".loader-sectionenr");
        //},
        //complete: function () {
        //    LoaderEnd(".loader-sectionenr");
        //},
        success: function (data) {
            data = JSON.parse(data);
            //$('#setUPFormPopUp').addClass('show');
            //$('.btn-close').click(function () {
            //    $('#setUPFormPopUp').removeClass('show');
            //    //$('.form-control').val('');
            //});

            var offcanvasElement = document.getElementById('setUPFormPopUp');
            var bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
            bsOffcanvas.show();

            var count = data.length;
            $.each(data, function (i, v) {
               
                var logo = "";
                var index = i + 1;
                var udi = v.UM_Id;
                var link = '/Home/UserProfileDetails?Id=' + udi;
                if (v.UM_ProfilePic == "") {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.UM_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0"><a class="text-primary" href="' + link + '">' + v.UM_Name + '</a></h6><span>' + v.UM_EmailId + '</span></div></div>';
                }
                else {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.UM_ProfilePic + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0"><a class="text-primary" href="' + link + '">' + v.UM_Name + '</a></h6><span>' + v.UM_EmailId + '</span></div></div>';
                }
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'></div>");


                //var index = i + 1;
                //$("#ulUserList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.UM_Name + "</h6><p class='mb-0 text-muted'>Email: " + v.UM_EmailId + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignUsers(" + index + "," + v.UM_Id + "," + BD_Id + ")'></div></div></div>");

            });
            if (count == 0) {
                $("#ulUserList").append('<div class=card><div class=layout-demo-wrapper><div><h5>No Data Found</h5><br></div></div></div>');
            }

        },
        error: function (data) {
                //LoaderEnd(".loader-sectionenr");
            
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}




function ShowAllSMME(areaName) {
    $("#ulMSMEList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectMSMEInthatArea',
            param2: 'SMME_City',
            paramString2: areaName,
            //param2: 'BWA_Id',
            //param2Value: parseInt(areaId),
            StoreProcedure: 'BranchDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            var offcanvasElement = document.getElementById('setUPFormPopUpMSME');
            var bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
            bsOffcanvas.show();

            var count = data.length;
            $.each(data, function (i, v) {

                var logo = "";
                var index = i + 1;
                var msid = v.SMME_Id;
                if (v.SMME_Logo == "") {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.UM_Prefix + '</span> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }
                else {
                    logo = '<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="' + v.SMME_Logo + '" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">' + v.SMME_CompanyName + '</h6><span>' + v.SMME_PrimaryContactEmail + '</span></div></div>';
                }
                $("#ulMSMEList").append("<a href='/SMME/SMMEProfile_Dashboard?Id=" + msid + "'><li class='d-flex flex-wrap mb-3'>" + logo + "</a><div class='form-check form-switch'></div>");


                //var index = i + 1;
                //$("#ulMSMEList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.SMME_CompanyName + "</h6><p class='mb-0 text-muted'>Email: " + v.UM_EmailId + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' " + v.Ischecked + " id='chkId_" + index + "' onclick='AssignUsers(" + index + "," + v.UM_Id + "," + BD_Id + ")'></div></div></div>");

            });
            if (count == 0) {
                $("#ulMSMEList").append('<div class=card><div class=layout-demo-wrapper><div><h5>No Data Found</h5><br></div></div></div>');
            }

        },
        error: function (data) {
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;
}

$('.nav-link').filter(function () {
    return $(this).text().trim() === 'Projects';
}).on('click', function () {
    var url = "/Enterprise/BranchWiseProject?BId=" + BId + "&EnrId=" + EnrId;
    window.location.href = url;
});

$('.nav-link').filter(function () {
    return $(this).text().trim() === 'Areas';
}).on('click', function () {
    var url = "/Enterprise/BranchWiseArea?BId=" + BId + "&EnrId=" + EnrId;
    window.location.href = url;
});

$('.nav-link').filter(function () {
    return $(this).text().trim() === 'Dashboard';
}).on('click', function () {
    var url = "/Enterprise/BranchDashboard?BId=" + BId + "&EnrId=" + EnrId;
    window.location.href = url;
});


function ShowAllUser() {
    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBranchWiseUser',
            param1: 'BD_Id',
            param1Value: parseInt(BId),
            param2: 'BD_EnterpriseId',
            param2Value: parseInt(EnrId),
            StoreProcedure: 'BranchDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart(".loader-sectionenr");
        },
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            $("#ulUserList").empty(); // clear previous content

            if (count === 0) {
                $("#ulUserList").append(
                    '<div class="card"><div class="layout-demo-wrapper"><div><h3>No Data Found</h3><br></div></div></div>'
                );
                return;
            }

            $.each(data, function (i, user) {
                var name = user.UM_Name || '';
                var email = user.UM_EmailId || '';
                var profilePic = user.UM_ProfilePic;
                var initials = getInitials(name);
                var b = user.UM_Id;

                // Bootstrap-like background label classes
                var bgClasses = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
                var randomClass = bgClasses[Math.floor(Math.random() * bgClasses.length)];

                var avatarHtml = '';
                if (profilePic) {
                    avatarHtml =
                        '<img src="' +
                        profilePic +
                        '" alt="Avatar" class="rounded-circle" width="45" height="45">';
                } else {
                    avatarHtml =
                        '<span class="avatar-initial rounded-circle bg-label-' +
                        randomClass +
                        ' " ' +
                        'style="width: 45px; height: 45px; font-size: 16px;">' +
                        initials +
                        '</span>';
                }
                var link = '/Home/UserProfileDetails?Id=' + b;
                var cardHtml =
                    '<div class="col-xl-4 col-lg-6 col-md-6 mb-3">' +
                        '<div class="card">' +
                            '<div class="card-body">' +
                                '<div class="d-flex align-items-center">' +
                                    '<div class="avatar me-3">' +
                                        avatarHtml +
                                    '</div>' +
                                    '<div class="d-flex flex-column">' +
                                        '<a class="text-primary" href="' + link + '"><span class="fw-medium">' + name + '</span></a>' +
                                        '<small class="text-muted">' + email + '</small>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

                $("#ulUserList").append(cardHtml);
            });

            // Helper function to get initials
            function getInitials(fullName) {
                var matches = fullName.match(/\b\w/g) || [];
                return ((matches.shift() || '') + (matches.pop() || '')).toUpperCase();
            }
        },

        error: function (data) {
                LoaderEnd(".loader-sectionenr");
      
            Swal.fire({
                title: 'Oops...',
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
