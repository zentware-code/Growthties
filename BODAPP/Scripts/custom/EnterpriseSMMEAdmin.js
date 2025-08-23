
$(document).ready(function () {
    SetMenu();
    //var mode = $('#hdnMode').val();
    retriveEnterprise();
    //fnProjectForEnterprise();

});


function retriveEnterprise() {

    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectForProfile",
            param1: "ENR_Id",
            param1Value: $('#hdnEntrId').val(),
            StoreProcedure: "EnterpriseRegistration_USP"
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
        complete: function () {
            LoaderEnd(".loader-sectionenr");
        },
        success: function (data) {
            data = JSON.parse(data);
            $('#spnHeadName').text(data[0].ENR_CompanyName);
            $('#spnHeadRole').text(data[0].UM_SubRole);
            $('#spnCity').text(data[0].PM_Province);
            $('#spnDate').text(data[0].ENR_CreatedDate);
            
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

//var Id = $('#smmeId').val();
//function redirectToSMMEProfil(Id)
//{
//    window.location.href='/SMME/SMMEProfile?Id='+Id;
//}