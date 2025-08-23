
$(document).ready(function () {
    var Id = getParameterByName('Id');
   
    retriveCustomer(Id);
    fnJobList(Id);

});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function retriveCustomer(Id) {

    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectForDetails",
            param1: "CD_Id",
            param1Value: parseInt(Id),
            StoreProcedure: "CustomerDetails_USP"
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
          //  fnCustForEnterprise(data["ENR_Id"]);
            $('#spnMail').text(data[0].CD_Email);
           
            $('#spnCity').text(data[0].PM_Province);
            $('#spnDate').text(data[0].CD_CreatedDate);
            $('#spnHeadName').text(data[0].CD_Name);
            
            $('#spnName').text(data[0].CD_Name);
            $('#spnType').text(data[0].CT_CustomerType);
            
            $('#spnContactNo').text(data[0].CD_ContactNumber);
            $('#spnEmail').text(data[0].CD_Email);

            $('#spnJob').text(data[0].TotalJobs);
            $('#spnSector').text(data[0].SM_SectorName);

            //$('#spnProjcct').text(data["TotalProject"]);
            //$('#spnJob').text(data["TotalJob"]);

            //if (data["ENR_Logo"] == "NO") {
            //    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
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

function fnJobList(Id) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllJobDeatils',
            param1: 'JD_CustomerId ',
            param1Value: parseInt(Id),
            param2: 'JD_EnterpriseId ',
            param2Value: parseInt($('#hdnEnrId').val()),
            StoreProcedure: 'JobDetails_USP',
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
            var count = data.length;
            var tbl = '';
            $.each(data, function (i, v) {
               if (count > 0) {
                   tbl = ' <tr><td><div class="d-flex justify-content-start align-items-center"><div class="me-3">' + v.SMME_Logo + '</div><div class="d-flex flex-column"><p class="mb-0 fw-medium">' + v.SMME_CompanyName + '</p><small class="text-muted">' + v.SMME_PrimaryContactEmail + '</small></div></div></td><td><div class="d-flex flex-column"><p class="mb-0 fw-medium">' + v.JD_JobName + '</p><small class="text-muted text-nowrap">' + v.JD_JobStartDate + '</small></div></td><td>' + v.JobStatusLbl + '</td><td><p class="mb-0 fw-medium">' + v.JD_Budget + '</p></td></tr>';
                   $("#tblJob tbody").append(tbl)

               }
                else {
                   tbl='<tr><div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div></tr>';
                }

            });
           
        },
        error: function (data) {
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