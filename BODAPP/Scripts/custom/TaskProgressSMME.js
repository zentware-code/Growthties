var btnStatus='';
var PageStatus = '';
var Mode = '';
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
function progressBarr() {
  //resetProgressBar();

  interval = setInterval(startBar, 100);

 
 
}

function resetProgressBar() {
  width = 1;
  clearInterval(interval)
  elem.style.width = width + '%';
}


$(document).ready(function () {
    
    
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
     Type = getParameterByName('Type');
     Mode = getParameterByName('Mode');
    if (Id != '') {
        fnProgressdataForSmme(Id);
		fnTaskProgressforButton(Id);
		
    }
    
    
});

$('#btnPost').click(function () {
   
    if (document.getElementById("uploadFile").files.length == 0) {
       
        SaveRecordForProgressButton(Id, MId, PageStatus)
    }
    else {
        FileUpload();
      
    }
});


function SaveRecordForProgress(Id,Status) {
	var TP_TaskStatusCode=1;
if(Status=="Open")
{
	TP_TaskStatusCode=1;
}
else if(Status=="Progress")
{
	TP_TaskStatusCode=2;
}
else if(Status=="Completed")
{
	TP_TaskStatusCode=3;
}
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            TP_TaskId: Id,
            TP_UserType: 'SMME',
            TP_TaskStatus: Status,
			TP_TaskStatusCode:parseInt(TP_TaskStatusCode),
			
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
                fnTaskProgressforButton(Id);
                fnProgressdataForSmme(Id,Status);
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

function SaveRecordForProgressButton(Id, Status) {
	var TP_TaskStatusCode=1;
		if(Status=="Open")
		{
			TP_TaskStatusCode=1;
		}
		else if(Status=="Progress")
		{
			TP_TaskStatusCode=2;
		}
		else if(Status=="Completed")
		{
			TP_TaskStatusCode=3;
		}
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            TP_TaskId: Id,
            TP_UserType: 'SMME',
            TP_TaskStatus: Status,
			TP_Comments:$('#txtPost').val(),
			TP_TaskStatusCode:parseInt(TP_TaskStatusCode),
			TP_Upload: $('#hdnupload').val(),
			
        }
    });
    $.ajax({

        type: "POST",
        url: '/ScriptJson/InsertRecordForTaskProgressComment',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {

                $('#txtPost').val(''),
                $("#ulProgress").html('');
                fnTaskProgressforButton(Id);
                fnProgressdataForSmme(Id, Status);


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

function fnTaskProgressforButton(Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskProgressforButton',
            param1: 'TP_TaskId',
            param1Value: parseInt(Id),
      
            StoreProcedure: 'TaskProgress_USP'
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
            $("#divStatusChng").html('');
            if (MId > 0)
            {
                $("#divStatusChng").append('<button class="" id="btnStatusChng" style="padding:5px 15px;" onclick="SaveRecordForProgress(' + Id + ', \'' + data[0].BtnStatus + '\');"></button>');


            }
            else {
                $("#divStatusChng").append('<button class="" id="btnStatusChng" style="padding:5px 15px;" onclick="SaveRecordForProgress(' + Id + ', \'' + data[0].BtnStatus + '\');"></button>');

            }
            
           

            if (data[0].TP_TaskStatus == "Open") {
                    $("#btnStatusChng").html('');
				   $("#btnStatusChng").addClass('btn btn-outline-primary my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Start Task');
					btnStatus='Progress'
					PageStatus=data[0].TP_TaskStatus;
                }
            if (data[0].TP_TaskStatus == "Progress") {
                    $("#btnStatusChng").html('');
				    $("#btnStatusChng").removeClass('');
					$("#btnStatusChng").addClass('btn btn-outline-warning my-3 my-sm-0 waves-effect');
					$("#btnStatusChng").html('Mark As Completed');
					btnStatus='Completed'
					PageStatus=data[0].TP_TaskStatus;
                }

            if (data[0].TP_TaskStatus == "Completed") {
                    $("#btnStatusChng").html('');
					$("#btnStatusChng").removeClass('');
					$("#btnStatusChng").addClass('btn btn-outline-success my-3 my-sm-0 waves-effect');
                    $("#btnStatusChng").html('Completed');
                    $("#btnStatusChng").prop('disabled', true);
                    $('#uploadFile').attr('disabled', 'disabled');
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


function fnProgressdataForSmme(Id) {
   
    var hdnTaskTitle = $('#hdnTaskTitle').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskProgressforSmme',
            param1: 'TP_TaskId',
            param1Value: parseInt(Id),
      
            StoreProcedure: 'TaskProgress_USP'
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

            if (Mode == 'V') {
                $('.viewmd').hide();
            }
           
			if(count==0)
			{
				SaveRecordForProgress(Id, 'Open')
			}
			  
			$.each(data, function (i, v) {
               
            if (v.TP_TaskStatus == "Open")

            {

                $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-primary"><span class="timeline-indicator-advanced timeline-indicator-primary"><i class="scaleX-n1-rtl ti rounded-circle ti-send"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - Activity - ' + v.ActivityName + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Task/Job Status</span> <i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i> <span>' + hdnTaskTitle + '</span></div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div>' + v.TPC_Upload + '<span class="badge bg-primary">Open</span></div>');
               
			  
			
			}
            if (v.TP_TaskStatus == "Progress" && v.IsComment == 0) {
   
                $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - Started by ' + v.UM_Name + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + hdnTaskTitle + '</span><i class="scaleX-n1-rtl ti mx-3 ti-arrow-right"></i><span> Job In Progress</span>  </div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div>' + v.TPC_Upload + '<span class="badge bg-warning">Progress</span></div>');
             
			}
			  if (v.TP_TaskStatus == "Progress" && v.IsComment == 1) {
   
			      $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-warning"><span class="timeline-indicator-advanced timeline-indicator-warning"><i class="ti ti-bell rounded-circle"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' -  Commented by ' + v.UM_Name + '</h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>' + v.TPC_Comment + '</span>  </div><div><span>' + v.TP_TaskUpdateTime + '</span></div></div>' + v.TPC_Upload + '<span class="badge bg-warning">Progress</span></div>');
             
			}
			 if (v.TP_TaskStatus == "Completed") {
			  
			     $("#ulProgress").append('<li class="border-left-dashed pb-4 timeline-item timeline-item-success"><span class="timeline-indicator-advanced timeline-indicator-success"><i class="ti ti-brush rounded-circle scaleX-n1-rtl"></i></span><div class=timeline-event><div class="border-bottom mb-3 timeline-header"><input type="hidden" id="hdnStatus" value=' + v.TP_TaskStatus + ' /><h6 class=mb-0>' + v.TD_TaskName + ' - Work Completed </h6><span class=text-muted>' + v.TP_UpdateDate + '</span></div><div class="d-flex flex-wrap justify-content-between mb-2"><div class="d-flex align-items-center"><span>Engineer Completed Work For ' + hdnTaskTitle + '</span></i> </div><div><span>' + v.TP_TaskUpdateTime + '</span></div>' + v.TPC_Upload + '</div></div>');
               
			 }
			  if(v.TD_Status=="Completed")
				{
					 $('.btnStatus').prop('disabled', true);
			  }

			

});
			if (Mode == 'V') {
			    $('.viewmd').hide();
			}

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
    
    var size = bytesToSize(700000);

  


        if (fileInput.size > 700000) {

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
    
        SaveRecordForProgressButton(Id, PageStatus);
    //console.log(response);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    //console.log("Request Failed: " + err);
  });
}


