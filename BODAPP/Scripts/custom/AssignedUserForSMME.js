var userType = '';
var pdId = 0;
var smmeId = 0;
var selectedUsers = []
var userId = 0;
var mainId = 0;


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function () {
    var userTypehdn = $("#hdnUserType").val();
    pdId = getParameterByName('Id');

    if (pdId > 0) {
        var smmeTabTriggerEl = document.querySelector('[data-bs-target="#navs-pills-justified-smmeuser"]');
        var smmeTab = new bootstrap.Tab(smmeTabTriggerEl);
        smmeTab.show();

        retrieveSMMEUsers();
    }

    $('[data-bs-target="#navs-pills-justified-smmeuser"]').on('shown.bs.tab', function () {
        retrieveSMMEUsers();
    });
});


function retrieveSMMEUsers() {
    userType = 'SMMEUser';
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEUsers',
            param1: 'UWP_ProjectId',
            param1Value: parseInt(pdId),
            param4: 'UWP_UserType',
            paramString4: userType,
            StoreProcedure: 'UserWiseProject_USP'
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
            //console.log("Fetched data:", data);

            var userListHtml = '';
            if (!data || data.length === 0) {
                userListHtml = '<div class="text-center text-muted py-3">No data found.</div>';
            } else {
                $.each(data, function (index, elem) {
                    index = index + 1;

                    // User's full name and email
                    var name = elem.UM_FirstName + ' ' + elem.UM_LastName;
                    var email = elem.UM_EmailId;

                    // Profile picture or initials
                    var avatarHtml = '';
                    var initials = elem.UM_Prefix; /// (elem.UM_FirstName.charAt(0) + elem.UM_LastName.charAt(0)).toUpperCase();
                    var randomColor = ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(Math.random() * 6)];

                    if (elem.UM_ProfilePic != "NO") {
                        avatarHtml = '<img src="' + elem.UM_ProfilePic + '" alt="Avatar" class="rounded-circle">';
                    } else {
                        avatarHtml = '<span class="avatar-initial rounded-circle bg-label-' + randomColor + '">' + initials + '</span>';
                    }

                    // Construct the HTML for the user card
                    userListHtml += '<div class="d-flex justify-content-between align-items-center left border-bottom mb-3">' +
                        '<div class="d-flex justify-content-start align-items-center user-name">' +
                            '<div class="avatar-wrapper">' +
                                '<div class="avatar me-3">' + avatarHtml + '</div>' +
                            '</div>' +
                            '<div class="d-flex flex-column">' +
                                '<a href="#" class="text-heading text-truncate">' +
                                    '<span class="fw-medium">' + name + '</span>' +
                                '</a>' +
                                '<small class="text-muted">' + email + '</small>' +
                            '</div>' +
                        '</div>' +
                        '<div class="ms-3">' +
                            '<input type="checkbox" class="form-check-input selectItem" ' + (elem.IsChecked === 'checked' ? 'checked' : '') + ' value="' + elem.UM_Id + '" id="defaultCheck' + index + '" /><input type="hidden" class="form-input selectItem" value="' + elem.UM_ParentId + '" />' +
                        '</div>' +
                    '</div>';
                });

            }

            // Inject into container
            $('#smmeuserListContainer').html(userListHtml);
        },
        error: function () {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}


function SaveRecords() {
    // Collect selected users (checkboxes that are checked)
    selectedUsers = [];
    selectedUsers = collectSelectedUsers();

    // Check if any users are selected
    if (selectedUsers.length === 0) {
        Swal.fire({
            title: "Oops...",
            text: "No users selected!",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });
        return;
    }

    if (userType == "SMMEUser") {
        var _data = JSON.stringify({
            entity: {
                UWP_ProjectId: parseInt(pdId),
                UWP_UserType: userType,
                UserList: selectedUsers
            }
        });
    } else if (userType == "EnrUser") {
        var _data = JSON.stringify({
            entity: {
                UWP_ProjectId: parseInt(pdId),
                UWP_UserType: userType,
                UserList: selectedUsers
            }
        });
    } else {
        var _data = JSON.stringify({
            entity: {
                UWP_ProjectId: parseInt(pdId),
                UWP_UserType: userType,
                UserList: selectedUsers
            }
        });
    }

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUserWiseProject',  // Correct URL for saving data
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess === true) {
                selectedUsers = []; // Clear the list
                userId = 0;
                mainId = 0;

                Swal.fire({
                    title: "Successful..!",
                    text: "Users saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (userType === 'SMMEUser') {
                            retrieveSMMEUsers();
                        }
                        // Optionally: window.location.reload();
                    }
                });

            } else {
                Swal.fire({
                    title: "Oops...",
                    text: data.Message || 'An error occurred while saving the data.',
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}


function collectSelectedUsers() {
    selectedUsers = [];

    // Determine container based on userType
    var containerId = '';
    if (userType === 'AdminUser') {
        containerId = '#userListContainer';
    } else if (userType === 'EnrUser') {
        containerId = '#enruserListContainer';
    } else if (userType === 'SMMEUser') {
        containerId = '#smmeuserListContainer';
    }

    // Find only checked checkboxes inside the correct container
    $(containerId + ' .selectItem:checked').each(function () {
        var userId = $(this).val();
        var mainId = $(this).siblings("input[type='hidden']").val();

        selectedUsers.push({
            UWP_UserId: userId,
            UWP_MainId: mainId
        });
    });

    return selectedUsers;
}



$("#submitBtn").on('click', function () {
    SaveRecords();
});

function retriveEnrId(pdId, callback) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectDetails',
            param1: 'PD_Id',
            param1Value: parseInt(pdId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            $('#hdnEnterpriseid').val(data[0].PD_EnterpriseId);

            // Call the callback when done
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function () {
            Swal.fire({
                title: 'Oops...',
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}
