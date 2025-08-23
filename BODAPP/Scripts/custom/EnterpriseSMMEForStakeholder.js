
$(document).ready(function () {

    //var mode = $('#hdnMode').val();
    retriveEnterprise();
    //fnProjectForEnterprise();

});


function retriveEnterprise() {

    var _data = JSON.stringify({
        global: {
            TransactionType: "Select",
            Param: "ENR_Id",
          
            StoreProcedure: "EnterpriseRegistration_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        beforeSend: function () {
            LoaderStart("#smmeDivs");
        },
        complete: function () {
            LoaderEnd("#smmeDivs");
        },
        success: function (data) {

            $('#spnHeadName').text(data["ENR_CompanyName"]);
            $('#spnHeadRole').text(data["UM_SubRole"]);
            $('#spnCity').text(data["PM_Province"]);
            $('#spnDate').text(data["ENR_CreatedDate"]);
            
            //if (data["ENR_Logo"] == "NO") {
            //    //$('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
                
            //    $('#dvPic').html('<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"> <span class="avatar-initial  bg-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '>' + data["ENR_PreFix"] + '</span></div>');
            //    //<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img">
            //    //         <span class="avatar-initial  bg-@list[index]">@Model.ENR_Prefix</span>
            //    //     </div>
            //}
            //else {


            //    $('#prfpicIMG').attr('src', data["ENR_Logo"]);
            //}

        },
        error: function (data) {
            alert("Process Not Sucess");
        }
    });
    return false;

}