$(document).ready(function () {

    BindGrid();
   

});

function BindGrid() {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: globalData.paramValue,
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
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
            data = JSON.parse(data);
            var oTable = $('#datatable-example').DataTable({
                data:data,
                columns:columnData,
                columnDefs: [
                  
                    {
                        targets: 2,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        responsivePriority: 3,
                        render: function (data,type,row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/SMME/TeamBuilding?Id=' + row.BT_Id + '" ><i class="ti ti-edit"></i></a><button class="btn btn-sm btn-icon"  data-bs-dismiss="modal" onclick="ShowAllUser(' + row.BT_Id + ')" ><i class="ti ti-users"></i></button></div>';
                        },
                    },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder:search },
                buttons: [
                   
                     
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                return "Details of " + e.data().SectorName;
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            })
            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),
       
        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}

function ShowAllUser(id) {

 
    $("#ulUserList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectALLSMMETeamUserList',
            param1: 'BT_Id',
            param1Value:id,
           
            StoreProcedure: 'BuildTeam_USP'
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
            $('#setUPFormPopUp').addClass('show');
            $('.btn-close').click(function () {

                $('#setUPFormPopUp').removeClass('show');
                //$('.form-control').val('');
            });
            var allDisbled='';
            var count = data.length;
            $.each(data, function (i, v) {
                if(v.BT_TeamLeader=="checked")
                {
                    allDisbled='No';
                  
                   
                }
                else {
                    if(allDisbled!="No")
                    {
                        allDisbled='Yes';
                    }
                  
                }

                var logo="";
                var index = i + 1;
                if(v.UM_ProfilePic=="NO")
                {
                    
                    logo='<div class="d-flex justify-content-between flex-grow-1"><div class="d-flex "><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.UM_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.UM_Name +'</h6><span>'+ v.UM_EmailId +'</span></div></div><div class="d-flex align-items-center col-3 justify-content-end"><div class="form-check form-switch"><input class="float-end form-check-input chkinput" type="checkbox" onclick="UpdateRecord('+ index + ','+v.BT_Id+','+v.BTU_UserId+')" id="chkId_'+ index + '" '+v.BT_TeamLeader+' '+v.TeamLeader+'></div></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.UM_ProfilePic +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.UM_Name +'</h6><span>'+ v.UM_EmailId +'</span></div><div class="d-flex align-items-center col-3 justify-content-end"><div class="form-check form-switch"><input class="float-end form-check-input chkinput" type="checkbox"  id="chkId_'+ index + '" '+v.BT_TeamLeader+' '+v.TeamLeader+'></div></div></div>';

                }
              
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulUserList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "</div>");
                if(allDisbled=='Yes')
                {
                    $('.chkinput').removeAttr("disabled");

                }
            });

        },
        error: function (data) {
            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function UpdateRecord(index,Id,Userid) {
    var userid;
    if ($('#chkId_' + index).is(':checked')) {

        $('.chkinput').attr("disabled", true);
        $('#chkId_' + index).removeAttr("disabled");
        userid = Userid;
    } else {

        $('.chkinput').removeAttr("disabled");
        userid = 0;
    }
    var _data = JSON.stringify({
        entity: {
            BT_Id: Id,
        
            BT_TeamLeader: userid,
            TransactionType : "UpdateTeamLeader"
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertTeamBuildingForSMME',
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
                }).then(function () {
                    //$('#formAccountSettings').trigger("reset");
                    //window.location.href = '/Assessment/QuestionSetupList';
                    window.location.href = "/SMME/TeamBuildingList";
                });
                    

            }
            else {
                Swal.fire({
                    title: "Oops...",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {

            Swal.fire({
                title: "Oops...",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    
}