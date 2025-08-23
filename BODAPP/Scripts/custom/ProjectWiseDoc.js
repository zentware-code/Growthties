$(document).ready(function () {

    InitUI();
   

});
var ProjId=0;
var formElem = document.getElementById("setUPForm");
var form=$('#setUPForm');

(function () {
    // var e = document.getElementById("setUPForm");
    FormValidation.formValidation(formElem, {
        fields: {
            Name: {
                validators: {
                    notEmpty: {
                        message: "Please enter file name"
                    }
                }
            }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function (formElem, t) {
                    return ".mb-3";
                },
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', function () {

        SaveRecord();
    });
})();

function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseInt(bytes / 1000);
        }
    }
    return bytes + ' P';
}
function SaveRecord() {
    
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            PWD_ProjectId: parseInt(ProjId),
            PWD_DocumentDec:$('#Description').val(),
            PWD_DocumentName: $('#Name').val(),
            PWD_Document:  $('#hdnupload').val(),
            
			
        }
    });
    $.ajax({

        type: "POST",
        url: '/ScriptJson/InsertUpdateProjectWiseDocument',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {

                Swal.fire({
                    title: "Successful..!",
                    text: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location.href = '/Project/ProjectWiseDoc'
            }
            else {


            }

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

}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//For upload file into folder
function UploadDoc(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById('upload').files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            //M = getParameterByName('M');
            //if (M != 'A') {
            //    $('#dvAvatar').css('display', 'none');
            //    $('#dvImage').css('display', 'block');
            //    UpdatePhoto();
            //}

        }
    });
}
function show()
{
    //$(".add-new").trigger("click");
    $('#setUPFormPopUp').addClass('show');
    $('.btn-close').click(function () {
      
        $('#setUPFormPopUp').removeClass('show');
        $('.form-control').val('');
    });
    
}   
function InitUI() {
     ProjId = getParameterByName('Id');
     BindGrid(ProjId);
     retriveProject(ProjId);
}




function BindGrid(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: Id,
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data, status) {
            data = JSON.parse(data);
            var oTable = $('#datatable-doc').DataTable({
                data:data,
                columns:columnData,
                columnDefs: [
                  
                    {
                        targets: 2,
                        title: "Actions",
                        
                        responsivePriority: 3,
                        render: function (data,type,row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon" target="_blank" href="'+row.PWD_Document+'" ><i class="ti ti-download"></i></a></div>';
                        },
                    },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder:search },
                buttons: [
                    {
                        text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add </span>',
                        className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                        attr: { "data-bs-toggle": "offcanvas", "data-bs-target": popup, },
                    },
                     
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

let percentValue = 0,
   progressBar = $('.progress-bar');

function startBar() {
    if (percentValue < 100) {
        percentValue += 20;

    }
    progressBar.css("width", percentValue + "%").html(percentValue + "%");
}
var elem = document.getElementById("progress-bar");
var width = 1;
var interval=0;
function frame() {
    if (width >= 100) {
        clearInterval(interval);
    } else {
        width++;
        elem.style.width = width + '%';
        //SaveRecordForProgressButton(Id, MId, PageStatus);
    }
    
}
function progressBarr() {
    //resetProgressBar();
interval = setInterval(startBar, 100);

}

function resetProgressBar() {
    width = 1;
    clearInterval(interval)
    elem.style.width = width + '%';
}
function FileUpload(input) {
    var file = $('#uploadFile');
    var fileInput = $('#uploadFile')[0].files[0];
    var size = bytesToSize(200000);

    if (fileInput.size > 200000) {

        Swal.fire({
            title: "Oops...",
            text: 'File size is more then ' + size + 'b',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    else {
        if ($('#uploadFile').prop('files') && $('#uploadFile').prop('files')[0]) {
           
            var fileDir = new FileReader();
            fileDir.readAsDataURL($('#uploadFile').prop('files')[0]);

              
            pathFl = $('#uploadFile').val().substring(12);
            pathStringFl = '/Upload/' + pathFl;
            var hdnFilePath = pathStringFl;
            $('#hdnupload').val(hdnFilePath);

            UploadDoc('uploadFile');
        }
        
    } 
}

function UploadDoc(upload) {
    timer = setInterval(startBar, 500);
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({


      
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        beforeSend: function() {
            progressBarr();
        },
        success: function () {
          
           
            clearInterval(timer);
        }
    }).done(function (response) {
    
      
        //console.log(response);
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        //console.log("Request Failed: " + err);
    });
}


function retriveProject(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectDetails',
            param1: 'PD_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectDetails_USP'
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
            
            $('#pName').append('<span class="text-muted fw-light">Project /</span>'+data[0].PD_ProjectName);
           //  checkForBudget();
                
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