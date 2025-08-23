var btnStatus='';
var PageStatus='';
 var Id =0;
 var MId =0;
 var Type = "";

 let percentValue = 0,
    progressBar = $('.progress-bar');

 function startBar() {
     if (percentValue < 100) {
         percentValue += 20;

     }
     progressBar.css("width", percentValue + "%").html(percentValue + "%");
 }

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
function progressBarr(progress) {
  //resetProgressBar();

  interval = setInterval(startBar, 100);

 
 
}

function resetProgressBar() {
  width = 1;
  clearInterval(interval)
  elem.style.width = width + '%';
}


$(document).ready(function () {
   
    //     const uploadFile = document.getElementById('uploadFile');

    //const fileChosen = document.getElementById('file-chosen');

    //uploadFile.addEventListener('change', function () {
    //    fileChosen.textContent = this.files[0].name
    //});

    
    $("#txtPost").keyup(function () {
            //Reference the Button.
        var btnPost = $("#btnPost");
 
            //Verify the TextBox value.
            if ($(this).val().trim() != "") {
                //Enable the TextBox when TextBox has value.
                btnPost.removeAttr("disabled");
            } else {
                //Disable the TextBox when TextBox is empty.
                btnPost.attr("disabled", "disabled");
            }
        });



     Id = getParameterByName('Id');
     MId = getParameterByName('MId');
     Type = getParameterByName('Type');
    if (Id != '') {
        
      
        fnProgressdataForSmme(Id, MId);
		  fnJobProgressforButton(Id, MId);
		 
     
    }
    
});

$('#btnPost').click(function () {
   
   
        SaveRecordForProgressButton(Id, MId, PageStatus)
    //}
    //else {
    //    FileUpload();
      
    //}
});


function SaveRecordForProgress(Id, MId,Status) {
	var JP_JobStatusCode=1;
if(Status=="Open")
{
	JP_JobStatusCode=1;
}
else if(Status=="Progress")
{
	JP_JobStatusCode=2;
}
else if(Status=="Completed")
{
	JP_JobStatusCode=3;
}
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            JP_JobId: Id,
            JP_JobChildId: MId,
            JP_UserType: 'SMME',
            JP_JobStatus: Status,
			JP_JobStatusCode:parseInt(JP_JobStatusCode),
			JP_JobType: Type
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                

                $("#ulProgress").html('');
                fnJobProgressforButton(Id, MId);
                fnProgressdataForSmme(Id, MId,Status);
            }
            else {
              

            }
            
        },
        error: function (data) {


            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function SaveRecordForProgressButton(Id, MId, Status) {
	var JP_JobStatusCode=1;
		if(Status=="Open")
		{
			JP_JobStatusCode=1;
		}
		else if(Status=="Progress")
		{
			JP_JobStatusCode=2;
		}
		else if(Status=="Completed")
		{
			JP_JobStatusCode=3;
		}
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            JP_JobId: Id,
            JP_JobChildId: MId,
            JP_UserType: 'SMME',
            JP_JobStatus: Status,
			JP_Comments:$('#txtPost').val(),
			JP_JobStatusCode:parseInt(JP_JobStatusCode),
			JP_Upload: $('#hdnupload').val(),
			
        }
    });
    $.ajax({

        type: "POST",
        url: '/ScriptJson/InsertRecordForProgressComment',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {

                $('#txtPost').val(''),
                $("#ulProgress").html('');
                fnJobProgressforButton(Id, MId);
                fnProgressdataForSmme(Id, MId, Status);
                $('#hdnupload').val('');
                resetProgressBar();
            }
            else {


            }

        },
        error: function (data) {


            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function fnJobProgressforButton(Id, MId) {
 

 
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectJobProgressforButton',
            param1: 'JP_JobId',
            param1Value: parseInt(Id),
            param2: 'JP_JobChildId',
            param2Value: parseInt(MId),
            StoreProcedure: 'JobProgress_USP'
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
            $("#divStatusChng").html('');
            if (MId > 0)
            {
                $("#divStatusChng").append('<a style="display:none !important" class="btn btn-sm btn-outline-primary text-primary me-2" id="btnInvoice"  href=/Job/JobInvoice?Id=' + Id + '&MId=' + MId + '&Type='+Type+'><span class="fa-solid fa-file-invoice me-1"></span>Generate Invoice</a><button class="" id="btnStatusChng" style="padding:5px 15px;" onclick="SaveRecordForProgress(' + Id + ', ' + MId + ', \'' + data[0].BtnStatus + '\');"></button>');
                if (data[0].JP_JobStatus == "Open") {
              
                    $("#btnStatusChng").html('');
                    $("#btnStatusChng").addClass('btn btn-outline-primary my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Start Job');
                    btnStatus = 'Progress'
                    PageStatus = data[0].JP_JobStatus;
                }
                if (data[0].JP_JobStatus == "Progress") {
              
                    $("#btnStatusChng").html('');
                    $("#btnStatusChng").removeClass('');
                    $("#btnStatusChng").addClass('btn btn-outline-warning my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Mark As Completed');
                    btnStatus = 'Completed'
                    PageStatus = data[0].JP_JobStatus;
                }

                if (data[0].JP_JobStatus == "Completed") {
                    if (data[0].IsInvoice<=0)
                    {
                        $("#btnInvoice").css('display', 'block');
                    }
                   
                    $("#btnStatusChng").html('');
                    $("#btnStatusChng").removeClass('');
                    $("#btnStatusChng").addClass('btn btn-outline-success my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Completed');
                    $("#btnStatusChng").prop('disabled', true);
                    //$('#uploadFile').attr('disabled', 'disabled');
                }

            }
            else {
                $("#divStatusChng").append('<a style="display:none !important" class="btn btn-sm btn-outline-primary text-primary me-2" id="btnInvoice" href=/Job/JobInvoice?Id=' + Id + '><span class="fa-solid fa-file-invoice me-1"></span>Generate Invoice</a><button class="" id="btnStatusChng" style="padding:5px 15px;" onclick="SaveRecordForProgress(' + Id + ', ' + parseInt(MId) + ', \'' + data[0].BtnStatus + '\');"></button>');
                if (data[0].JP_JobStatus == "Open") {
              
                    $("#btnStatusChng").html('');
				   $("#btnStatusChng").addClass('btn btn-outline-primary my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Start Job');
					btnStatus='Progress'
					PageStatus=data[0].JP_JobStatus;
                }
                if (data[0].JP_JobStatus == "Progress") {
            
                    $("#btnStatusChng").html('');
				    $("#btnStatusChng").removeClass('');
					$("#btnStatusChng").addClass('btn btn-outline-warning my-3 my-sm-0 waves-effect');
					$("#btnStatusChng").html('Mark As Completed');
					btnStatus='Completed'
					PageStatus=data[0].JP_JobStatus;
                }

                if (data[0].JP_JobStatus == "Completed") {
                    if (data[0].IsInvoice <= 0) {
                        $("#btnInvoice").css('display', 'block');
                    }
                    $("#btnStatusChng").html('');
					$("#btnStatusChng").removeClass('');
					$("#btnStatusChng").addClass('btn btn-outline-success my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Completed');
                    $("#btnStatusChng").prop('disabled', true);
                    //$('#uploadFile').attr('disabled', 'disabled');
                }
            }
            
           

          
               

           

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


function fnProgressdataForSmme(Id, MId) {
   
    var hdnJobTitle=$('#hdnJobTitle').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectJobProgressforSmme',
            param1: 'JP_JobId',
            param1Value: parseInt(Id),
            param2: 'JP_JobChildId',
            param2Value: parseInt(MId),
            StoreProcedure: 'JobProgress_USP'
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
            var count = data.length;
           
			if(count==0)
			{
				SaveRecordForProgress(Id, MId, 'Open')
			}
			  
			$.each(data, function (i, v) {
               
            if (v.JP_JobStatus == "Open")

            {

                $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Assigned by ' + v.ENR_CompanyName + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Visit Name </span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i> <span>' + hdnJobTitle + '</span></div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '<span class="badge bg-primary">Open</span></div>');
               
			   
			   
			  
			
			}
            if (v.JP_JobStatus == "Progress" && v.IsComment == 0) {
   
                $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + hdnJobTitle + '</span><i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span> Job In Progress</span>  </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '<span class="badge bg-warning">Progress</span></div>');
             
			}
			  if (v.JP_JobStatus == "Progress" && v.IsComment == 1) {
   
			      $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' -  Commented by ' + v.UM_Name + '</h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + v.JPC_Comment + '</span>  </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '<span class="badge bg-warning">Progress</span></div>');
             
			}
			  if (v.JP_JobStatus == "Completed" && v.IsComment == 0) {
			  
			     $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Work Completed </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Completed Work For ' + hdnJobTitle + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '</div>');
               
			  }
			  if (v.JP_JobStatus == "Completed" && v.IsComment == 1) {

			      $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.JP_JobStatus + ' /><h6 class=mb-0>' + v.JD_JobName + ' - Work Completed </h6><span class=text-muted>' + v.JP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + v.JPC_Comment + '</span></i> </div><div><span>' + v.JP_JobUpdateTime + '</span></div></div>' + v.JPC_Upload + '</div>');

			  }
			  if(v.JD_Status=="Completed")
				{
					 $('.btnStatus').prop('disabled', true);
			  }

			

});
            
			$('#btnstatusUplaod').hide();
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
function FileUpload(input) {
    var file = $('#uploadFile');
    var fileInput = $('#uploadFile')[0].files[0];
    
    var size = bytesToSize(200000);

  


        if (fileInput.size > 200000) {

            Swal.fire({
                title: 'File size is more then ' + size + 'b',
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
    
        //SaveRecordForProgressButton(Id, MId, PageStatus);
    //console.log(response);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    //console.log("Request Failed: " + err);
  });
}


