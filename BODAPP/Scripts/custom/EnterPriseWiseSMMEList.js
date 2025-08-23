
$(document).ready(function () {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    // //console.log(path);
    localStorage.setItem('href', path);

    //retrive();
    fnBindEnterPrise();

});
function fnBindEnterPrise() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllEnterpriseWiseSMME',
            StoreProcedure: 'EnterpriseWiseSMME_USP'
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
            $.each(data, function (i, v) {
                var index = i + 1;
                if (count > 0) {
                    var Card = '<div class="col-xl-4 col-lg-6 col-md-6"><div class="card"><div class="card-body"><div class="d-flex justify-content-between"><h6 class="fw-normal mb-2">Total MSMEs: ' + v.TotalSMME + '</h6><ul id="ul_' + v.ENR_Id + '" class="list-unstyled d-flex align-items-center avatar-group mb-0"></ul></div><div class="d-flex justify-content-between align-items-end mt-1"><div class="role-heading"><h4 class="mb-1" style="width:245px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + v.ENR_CompanyName + '</h4><a href="/Home/EnterpriseProfieView_SMME?Id=' + v.ENR_Id + '"  class="role-edit-modal"><span>Show MSMEs</span></a></div><a href="/Enterprise/EnterpriseWiseSMME?M=E&Id=' + v.ENR_Id + '" class="text-muted"><i class="ti ti-edit ti-md"></i></a></div></div></div></div>'
                    $("#dvEnrList").append(Card);
                    var id = "ul_" + v.ENR_Id
                    fnBindSMME(v.ENR_Id, id)
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
function fnBindSMME(EnterpriseId,ulid) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllSMMEByEnterprise',
            
            param1: 'EWS_EnterpriseId',
          
            param1Value: EnterpriseId,
          
            StoreProcedure: 'EnterpriseWiseSMME_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        //beforeSend: function () {
        //    LoaderStart("#enr-card");
        //},
        //complete: function () {
        //    LoaderEnd("#enr-card");
        //},
        success: function (data) {
            data = JSON.parse(data);
            var Photo = '';
            var LI = '';
            $.each(data, function (i, v) {
                
                if (v.SMME_Logo == 'NO') {
                    Photo = '<div class="avatar avatar-sm me-2"><span class="avatar-initial rounded-circle bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + v.SMME_Prefix + '</span></div>'
                }
                else {
                    Photo = '<img class="rounded-circle" src="' + v.SMME_Logo + '" alt="Avatar">';
                }

                LI = LI + ' <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" title="Vinnie Mostowy" class="avatar avatar-sm pull-up">' + Photo + '</li>'
            });
            $("#" + ulid).append(LI)

            
           
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



