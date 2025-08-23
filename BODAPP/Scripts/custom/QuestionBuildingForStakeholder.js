"use strict";

var yourArray = [];
var QuesArr = [];
var QuestionArray = [];
var QuestionArrayValidate = [];
var QuestionArraySegmentWise = [];
var pageopen=0;
var acdrnhead=1;
var SegmentArray = [];
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    $('.btnsubmitfinal').prop( "disabled", true );
    $('#btnAdd').prop( "disabled", true );
   
    var x = $(".ddlCategory");
    var y = $(".ddlSegment");
    x.length &&
        x.each(function () {
            var x = $(this);
            x.wrap('<div class="position-relative"></div>'), x.select2({ placeholder: "Select A Category", dropdownParent: x.parent() });
        });
    y.length &&
       y.each(function () {
           var y = $(this);
           y.wrap('<div class="position-relative"></div>'), y.select2({ placeholder: "Select A Segment", dropdownParent: y.parent() });
       });
  
   

    var catId = getParameterByName('catId');
    var sigId = getParameterByName('sigId');

    if (catId != "") {
        $('#ddlCategory').val(catId).change();
        $('#ddlCategory').prop("disabled", true);
        
    }
    if (sigId != "") {
        $('#ddlSegment').val(sigId).change();
        $('#ddlSegment').prop("disabled", true);
    }
    var Id = getParameterByName('Id');
    var Mode = getParameterByName('Mode');
    var BAId = getParameterByName('BAId');
    if (BAId != '' &&Mode=='E') {
        $('.btnsubmitfinal').prop( "disabled", false );
       /// $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 9e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
        DropdownBinder.DDLData = {
            tableName: "AssessmentCategorySetUp_AC",
            Text: 'AC_Category',
            Value: 'AC_Id',
            ColumnName: 'AC_EnterpriseId',
            PId: parseInt($('#EnterpriseId').val()) > 0 ? parseInt($('#EnterpriseId').val()) : 0

        };
        DropdownBinder.DDLElem = $("#ddlCategory");
        DropdownBinder.Execute();


        DropdownBinder.DDLData = {
            tableName: "AssessmentSegmentSetUp_ASS",
            Text: 'ASS_Category',
            Value: 'ASS_Id',
            ColumnName: 'ASS_EnterpriseId',
            PId: parseInt($('#EnterpriseId').val()) > 0 ? parseInt($('#EnterpriseId').val()) : 0
        };
        DropdownBinder.DDLElem = $("#ddlSegment");
        DropdownBinder.Execute();
        retriveSegment(BAId);
        Bindgrid();
        $('#ddlCategory').val(Id);
        $('#ddlCategory').prop('disabled',true);
        $('#btnAdd').prop( "disabled", true );

 
    }
    else {
        $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 4e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })
        DropdownBinder.DDLData = {
            tableName: "AssessmentCategorySetUp_AC",
            Text: 'AC_Category',
            Value: 'AC_Id',
            ColumnName: 'AC_EnterpriseId',
            PId: parseInt($('#EnterpriseId').val()) > 0 ? parseInt($('#EnterpriseId').val()) : 0

        };
        DropdownBinder.DDLElem = $("#ddlCategory");
        DropdownBinder.Execute();


        DropdownBinder.DDLData = {
            tableName: "AssessmentSegmentSetUp_ASS",
            Text: 'ASS_Category',
            Value: 'ASS_Id',
            ColumnName: 'ASS_EnterpriseId',
            PId: parseInt($('#EnterpriseId').val()) > 0 ? parseInt($('#EnterpriseId').val()) : 0
        };
        DropdownBinder.DDLElem = $("#ddlSegment");
        DropdownBinder.Execute();
        //retriveDropDown();
        Bindgrid();
    }
});


function Bindgrid() {
    $('#tblQuestionBuild').DataTable().destroy();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectedQuestion',
            param1: 'BA_EnterpriseId',
            param1Value: $('#EnterpriseId').val(),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            if(QuestionArraySegmentWise.length>0)
            { 
                for(var i = 0; i <QuestionArraySegmentWise.length; i++)//see that I removed the $ preceeding the `for` keyword, it should not have been there
                {
                    ////console.log(arr);
                    const  objIndex = data.findIndex(obj => obj.QN_Id == QuestionArraySegmentWise[i]);
                data[objIndex].checked = "checked"
            }

           
            }

            let e, s, a;
            a = (isDarkStyle ? ((e = config.colors_dark.borderColor), (s = config.colors_dark.bodyBg), config.colors_dark) : ((e = config.colors.borderColor), (s = config.colors.bodyBg), config.colors)).headingColor;
            var t,
                n = $("#tblQuestionBuild");
    
            n.length &&
                ((t = n.DataTable({
                    data: data,
                    columns: [{ data: "QN_Question" }, { data: "QN_QuestionType" }],
                    columnDefs: [

                        {
                            className: "control",
                            searchable: !1,
                            orderable: !1,
                            targets: 0,

                            checkboxes: { selectAllRender: '<input type="checkbox" class="form-check-input chkall" onClick="setchkall(this)" value="0">' },
                            render: function (t, e, s, a) {
                                return '<input type="checkbox" id="chkGrid_'+ s.QN_Id +'" class="dt-checkboxes form-check-input selectval" ' + s.checked + ' onClick="get(this,' + s.QN_Id + ',\''+s.QN_Question+'\',\''+s.QN_QuestionType+'\')" value="' + s.checkedboxval + '" >';
                            },

                        },
                        {
                            targets: 1,

                            render: function (t, e, s, a) {

                                return "<span>" + s.QN_Question + "</span>";
                            },
                        },
                          {
                              targets: 2,

                              render: function (t, e, s, a) {

                                  return "<span>" + s.QN_QuestionType + "</span>";
                              },
                          },
                         //{
                         //    targets: 3,
                         //    visible: false,
                         //    orderable: !1,
                         //    searchable: !1,

                         //},
                    ],
                    order: [1, "asc"],
                    dom:
                        '<"card-header d-flex border-top rounded-0 flex-wrap py-2"<"me-5 ms-n2 pe-5"f><"d-flex justify-content-start justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex flex-column align-items-start align-items-md-center justify-content-sm-center mb-3 mb-md-0 pt-0 gap-4 gap-sm-0 flex-sm-row"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                    lengthMenu: [ 20, 50, 70, 100],
                    language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: "Search Question", info: "Displaying _START_ to _END_ of _TOTAL_ entries" },
                    buttons: [
                        
                    ],


                })),
                $(".dataTables_length").addClass("mt-2 mt-sm-0 mt-md-3 me-2"),
                $(".dt-buttons").addClass("d-flex flex-wrap")),

                setTimeout(() => {
                    $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
},
error: function (xhr, textStatus, errorThrown) {
    alert('request failed');
}
});

}
function chkallBySegment() {

   
      
        var oTable = $('#tblQuestionBuild').dataTable();
        var rowcollection = oTable.$(".selectval", { "page": "all" });
        QuesArr=[];
        rowcollection.each(function (index, elem) {
            var checkbox_value = $(elem).val();
            QuesArr.push({
                BAD_QuestionId: $(elem).val()
                        
            });

        });
    
    
            

}

function setchkall(o) {

    if ($(o).val() == 0) {
        $(o).val(1);
        $('.selectval').val(1);
        var oTable = $('#tblQuestionBuild').dataTable();
        var rowcollection = oTable.$(".selectval", { "page": "all" });
        QuesArr=[];
        rowcollection.each(function (index, elem) {
            var checkbox_value = $(elem).val();
            QuesArr.push({
                BAD_QuestionId: $(elem).val()
                        
            });

        });
    }
    else {
        $(o).val(0);
        $('.selectval').val(0);
        QuesArr=[];
    }
            

}

function appendSegment()

{      
    yourArray = [];
    var active='';
    
    var area='';
    var show='';
    //if(acdrnhead==1){
    
    //}
    $('.btnsubmitfinal').prop( "disabled", false );
    var QsList='';
    var SegmentId=$('#ddlSegment').val();
    var SegmentName=$('#ddlSegment option:selected').text();
    
    var oTable = $('#tblQuestionBuild').dataTable();
    var rowcollection = oTable.$(".selectval", { "page": "all" });
    rowcollection.each(function (index, elem) {
        var checkbox_value = $(elem).val();
        if (!yourArray.includes($(elem).val())) {
            yourArray.push($(elem).val());
        }
    });
    
    
    if ((checkArray(1, yourArray))=='Y' && $('#ddlCategory').val()>0) {
         
        if( $("#accordionExample .accordionItemcls_"+ SegmentId).length == 0) {
            $("#accordionExample div").removeClass("active");
            $("#accordionExample div").removeClass("show");
            $('#accordionExample, .accordion-button').removeAttr('aria-expanded');
            active='active';
            area='aria-expanded="true"';
            show='show';
            var ul='<ul class="list-group list-group-flush segm_'+SegmentId+'" id="handle-list-'+acdrnhead+'" ></ul>';

            $("#accordionExample").append('<div class="card accordionItemcls_'+SegmentId+' accordion-item '+active+'" id="accordionItem_'+acdrnhead+'"><h2 class="accordion-header" id="headingOne_'+acdrnhead+'"><input type="hidden" id="hdnSeg_'+acdrnhead+'" value="'+SegmentId+'"/><button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion_'+acdrnhead+'" '+area+' aria-controls="accordion_'+acdrnhead+'">'+SegmentName+'</button></h2><div id="accordion_'+acdrnhead+'" class="accordion-collapse collapse '+show+' accordionsegm_'+SegmentId+'" data-bs-parent="#accordionExample"><div class="accordion-body"> '+ul+'</div></div></div>');

            $.each(QuesArr, function (index, elem) {

                index=index+1;
                var ID_Del="#chkGrid_"+elem.BAD_QuestionId;
                QsList=QsList+'<li id="list_'+elem.BAD_QuestionId+'" class="px-0 list-group-item lh-1 d-flex justify-content-between align-items-center"><span class="d-flex justify-content-between align-items-center"><i class="drag-handle cursor-move ti ti-menu-2 align-text-bottom me-2"></i><span class="spnQs">'+elem.BAD_Question+'</span></span><input type="hidden" class="hdnQs" id="hdnQs_'+index+'" value="'+elem.BAD_QuestionId+'"/><input type="hidden" class="hdnQsOption" id="hdnQsOp_'+index+'" value="'+elem.BAD_QuestionOption+'"/><a href="javascript:;" onClick="deleteVal(\''+ID_Del+'\','+elem.BAD_QuestionId+','+SegmentId+')" class="text-body delete-record pl-4"><i class="ti ti-trash ti-sm mx-2"></i></a></li>';
                    
                
            });
            $("#handle-list-"+acdrnhead).append(QsList);
            QsList='';
            acdrnhead++;
        }
        else{
            $.each(QuesArr, function (index, elem) {
                index=$('.segm_'+SegmentId+' li').length+1;
                
                validateQsFinalBind(SegmentId,SegmentId)
                
                   
                if ((checkArray(elem.BAD_QuestionId, QuestionArrayValidate))=='Y' ) {
                    //console.log('Value exists in Array variable');
                } else {
                    var ID_Del='#chkGrid_'+elem.BAD_QuestionId;
                    QsList = QsList + '<li id="list_' + elem.BAD_QuestionId + '" class="px-0 list-group-item lh-1 d-flex justify-content-between align-items-center"><span class="d-flex justify-content-between align-items-center"><i class="drag-handle cursor-move ti ti-menu-2 align-text-bottom me-2"></i><span class="spnQs">' + elem.BAD_Question + '</span></span><input type="hidden" class="hdnQs" id="hdnQs_' + index + '" value="' + elem.BAD_QuestionId + '"/><input type="hidden" class="hdnQsOption" id="hdnQsOp_' + index + '" value="' + elem.BAD_QuestionOption + '"/><a href="javascript:;" onClick="deleteVal(\'' + ID_Del + '\',' + elem.BAD_QuestionId + ',' + SegmentId + ')" class="text-body delete-record pl-4"><i class="ti ti-trash ti-sm mx-2"></i></a></li>';
                }
                       
                        $(".segm_"+SegmentId).append(QsList);
                        QuestionArrayValidate=[];
                        QsList='';
                
            });

            
        }


    }

    else {
        Swal.fire({
            title: "Oops..!",
            text: "Please Check alteast one Question!",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
    }

    //$('#tblQuestionBuild').DataTable().clear().destroy();
    //Bindgrid();
     
    //chkAccordianBind();
    var uls = $("#accordionExample").find("ul.list-group-flush");
    $.each(uls, function(i, item) {
        var id = item.id;
        //var  l = document.getElementById(id);
    
             
                  
        document.getElementById(id) && Sortable.create(document.getElementById(id), { animation: 150, group: "handleList", handle: ".drag-handle" });
    });
    uls='';

     
    QuesArr=[]; 
}

function bindSegmentQs(segmentid,Slno)
{
    QuestionArraySegmentWise=[];

    ////$('#tblQspreviw tbody').html('');
    
    var slno=1;
    var slNoo=0;
    for(var j = 1; j <= $('.accordionsegm_'+Slno+' .accordion-body .segm_'+Slno+'').length; j++)
    {
        $('.segm_'+Slno+'').find('li').each(function(){
              
            var current = $(this);
                
            QuestionArraySegmentWise.push(current.children('.hdnQs').eq(0).val());
            slno++;
            slNoo++;
        });
    } 
    
   
           
   
   
}

function validateQsFinalBind(segmentid,Slno)
{
    QuestionArrayValidate=[];

    ////$('#tblQspreviw tbody').html('');
    
    var slno=1;
    var slNoo=0;
    for(var j = 1; j <= $('.accordionsegm_'+Slno+' .accordion-body .segm_'+Slno+'').length; j++)
    {
        $('.segm_'+Slno+'').find('li').each(function(){
              
            var current = $(this);
                
            QuestionArrayValidate.push(current.children('.hdnQs').eq(0).val());
            slno++;
            slNoo++;
        });
    } 
    
   
           
   
   
}

function removeItem(array, item){
    for(var i in array){
        if(array[i].BAD_QuestionId==item){
            array.splice(i,1);
            break;
        }
    }
}
function checkValue(value,arr){
    var status = 'N';
 
    for(var i=0; i<arr.length; i++){
        var name = arr[i];
        if(name == value){
            status = 'Y';
            break;
        }
    }

    return status;
}

function deleteVal(o, id, acdrnhead) {
      Swal.fire({
        title: "Do you want to Delete this Question?",
            text: "You won't be able to revert this!",
            icon: "error",
            showCancelButton: !0,
            confirmButtonText: "Yes, Do it!",
            customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
            buttonsStyling: !1,
    }).then((result) => {
       
            if (result.isConfirmed) {
                if ($(o).val() == 0) {
                    $(o).val(1);
                    $(o).prop("checked", true);
                }
                else {
                    $(o).val(0);
                    $(o).prop("checked", false);
                    $('.segm_' + acdrnhead + ' #list_' + id + '').remove();
                }
        }
    });


}
function get(o, id,Question,Option) {

   
    if ($(o).val() == 0) {
        $(o).val(1);
        if(QuesArr.length>0)
        {
            //for (var i=0; i < QuesArr.length; i++) {
            //    if (QuesArr[i].BAD_QuestionId === id) {
                    removeItem(QuesArr, id);
            //    }
            //}
        }
        //if (!QuesArr.includes(id)) {
        //////console.log(QuesArr[0].BAD_QuestionId)
        QuesArr.push({
            BAD_QuestionId: id,
            BAD_Question:Question,
            BAD_QuestionOption:Option
        });
        //}
    }
    else {
        if(QuesArr.length>0)
        {
            //for (var i=0; i < QuesArr.length; i++) {
            //    if (QuesArr[i].BAD_QuestionId === id) {
                    removeItem(QuesArr, id);
            //    }
            //}
        }
        $(o).val(0);
    }
   

}
//function Drgabe(id){

function showQsFinalBind(accdrinid,segmentid,Slno)
{
    QuestionArray=[];

    ////$('#tblQspreviw tbody').html('');
    
    var slno=1;
    var slNoo=0;
    for(var j = 1; j <= $('#accordion_'+Slno+' .accordion-body #handle-list-'+Slno+'').length; j++)
    {
        $('#handle-list-'+Slno+'').find('li').each(function(){
              
            var current = $(this);
                
            QuestionArray.push({
       
                    
                QsSlNo: slno,
                BAD_QuestionId: current.children('.hdnQs').eq(0).val(),
                BAD_Question: current.children('span').children('.spnQs').eq(0).text(),
                BAD_Option: current.children('.hdnQsOption').eq(0).val()
       
            });
            slno++;
            slNoo++;
        });
    } 
    
    var QsList='';
           
    $.each(QuestionArray, function (index, elem) {
        index=index+1;
        QsList=QsList+'<li class="list-group-item lh-1 d-flex justify-content-between align-items-center"><span class="d-flex justify-content-between align-items-center"></i><span class="spnQsPr">'+elem.BAD_Question+'</span></span><input type="hidden" class="hdnQsPr" id="hdnQsPr_'+index+'" value="'+elem.BAD_QuestionId+'"/><span  class="spnQsOptionPr" id="spnQsOpPr_'+elem.QsSlNo+'" />'+elem.BAD_Option+'</span></li>';
    });
    $(accdrinid).append(QsList);
           
    QsList=''; 
   
}
function showFinalBind()
{
    var active='';
    
    var area='';
    var show='';
    var slno=1;
    var slNoo=0;
    $('#accordionPreview').html('');
    for(var i = 1; i <= $("#accordionExample .accordion-item").length; i++)
    {
        SegmentArray.push({
       
            BAD_SegmentId:$('#accordionExample #accordionItem_'+i+' #hdnSeg_'+i+'').val(),
            BAD_Segment:$('#accordionExample #accordionItem_'+i+' h2').text(),
            QsSlNo: slno,
                  
       
        });
        slno++;
        slNoo++;
          
        
    }

    $.each(SegmentArray, function (i, v) {
        if( $("#accordionPreview .accordionPreviewcls_"+ v.BAD_SegmentId).length == 0) {
            $("#accordionPreview div").removeClass("active");
            $("#accordionPreview div").removeClass("show");
            $('#accordionPreview, .accordion-button').removeAttr('aria-expanded');
            active='active';
            area='aria-expanded="true"';
            show='show';
            var ul='<ul class="list-group list-group-flush" id="handle-listPrev-'+v.QsSlNo+'" ></ul>';

            $("#accordionPreview").append('<div class="card accordionPreviewcls_'+ v.BAD_SegmentId+' accordion-itemP '+active+'" id="accordionItemP_'+v.QsSlNo+'"><h2 class="accordion-header" id="headingOneP_'+v.QsSlNo+'"><input type="hidden" id="hdnSegP_'+v.QsSlNo+'" value="'+ v.BAD_SegmentId+'"/><button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionPrev_'+v.QsSlNo+'" '+area+' aria-controls="accordionPrev_'+v.QsSlNo+'">'+  v.BAD_Segment +'</button></h2><div id="accordionPrev_'+v.QsSlNo+'" class="accordion-collapse collapse '+show+'" data-bs-parent="#accordionPreview"><div class="accordion-body"> '+ul+'</div></div></div>');
            showQsFinalBind("#handle-listPrev-"+v.QsSlNo,v.BAD_SegmentId,v.QsSlNo); 
          
        }
        else{
            showQsFinalBind("#handle-listPrev-"+v.QsSlNo,v.BAD_SegmentId,v.QsSlNo); 
        }

    });
    SegmentArray=[];
    
}


$('#btnSubmit').click(function () {
 
    var finalQuestionArray = [];
 
    for(var i = 1; i <= $("#accordionExample .accordion-item").length; i++)
    {
        var slno=1;
        var slNoo=0;
        for(var j = 1; j <= $('#accordion_'+i+' .accordion-body #handle-list-'+i+'').length; j++)
        {
            $('#handle-list-'+i+'').find('li').each(function(){
                //slno= slno+$('#handle-list-'+i+' li').index();
                var current = $(this);
              
                finalQuestionArray.push({
                    BAD_SegSlNo:i,
                    BAD_SegmentId:$('#accordionExample #accordionItem_'+i+' #hdnSeg_'+i+'').val(),
                   
                    BAD_Slno: slno,
                    BAD_QuestionId: current.children('.hdnQs').eq(0).val(),

            
       
                });
                slno++;
                slNoo++;
            });
        } 
    }
    SaveRecords(finalQuestionArray);
    ////console.log(finalQuestionArray);
})

function fnCancelRedirect() {



    Swal.fire({
        title: "Do you want to change Assessment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Yes, Do it!",
            customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
            buttonsStyling: !1,
    }).then((result) => {
       
            if (result.isConfirmed) {
                $('#btnAdd').prop("disabled", true);
                $('#tblQuestionBuild').DataTable().clear().destroy();
                Bindgrid();

                $('#accordionExample').html("");
                //Swal.fire({
                //    title: "Deleted!",
                //    text: "Your file has been deleted.",
                //    icon: "success"
                //});
              
        }
    });
    //Swal.fire({
    //    title: "Do you want to change Assessment?",
    //    text: "You won't be able to revert this!",
    //    icon: "warning",
    //    showCancelButton: !0,
    //    confirmButtonText: "Yes, Do it!",
    //    customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
    //    buttonsStyling: !1,
    //}).then(function (t) {
    //    alert("hjtdfjyd");
    //    $('#btnAdd').prop("disabled", true);
    //    $('#tblQuestionBuild').DataTable().clear().destroy();
    //    Bindgrid();

    //    $('#accordionExample').html("");

    //});
    
}
$('#ddlCategory').on('change', function () {
    if (pageopen == 1) {
        fnCancelRedirect();
    }
    pageopen = 1;
   
   
});
$('#ddlSegment').on('change', function () {
    bindSegmentQs($(this).val(),$(this).val());

    $('#btnAdd').prop( "disabled", false );
    $('#tblQuestionBuild').DataTable().clear().destroy();
    Bindgrid();
    //Hot to remove the old "selected" attribute?
});
$('#btnPreview').on('click', function () {
    $('#hPrev').html("");
    showFinalBind();
    $('#hPrev').html('Preview For '+$('#ddlCategory option:selected').text());
});

function checkArray(value, array) {
    var status = 'N';

    for (var i = 0; i < array.length; i++) {
        var name = array[i];
        if (name == value) {
            status = 'Y';
            break;
        }
    }
    return status;
}
function SaveRecords(finalArray) {

    var _data = JSON.stringify({
        entity: {
           
            BA_QuestionTypeId: $('#ddlCategory').val(),
           
            BuildAssesmentDetailsList: finalArray,


        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertBuildQuestion',
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
                location.reload();
            }
            else {

                Swal.fire({
                    title: "Oops..!",
                    text: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
            
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

function retriveSegment(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildSegmentList',
            param1: 'BA_Id',
            param1Value: parseInt(id),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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


            $.each(data, function (i, v) {
                var active='';
    
                var area='';
                var show='';
           
                var QsList='';
                //var SegmentId=$('#ddlSegment').val();
                //var SegmentName=$('#ddlSegment option:selected').text();
    
            
       
                if( $("#accordionExample .accordionItemcls_"+ v.BAD_SegmentId).length == 0) {
                    $("#accordionExample div").removeClass("active");
                    $("#accordionExample div").removeClass("show");
                    $('#accordionExample, .accordion-button').removeAttr('aria-expanded');
                    active='active';
                    area='aria-expanded="true"';
                    show='show';
                    var ul='<ul class="list-group list-group-flush segm_'+ v.BAD_SegmentId+'" id="handle-list-'+v.BAD_SegSlNo+'" ></ul>';

                    $("#accordionExample").append('<div class="card accordionItemcls_'+ v.BAD_SegmentId+' accordion-item '+active+'" id="accordionItem_'+v.BAD_SegSlNo+'"><h2 class="accordion-header" id="headingOne_'+v.BAD_SegSlNo+'"><input type="hidden" id="hdnSeg_'+v.BAD_SegSlNo+'" value="'+ v.BAD_SegmentId+'"/><button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion_'+v.BAD_SegSlNo+'" '+area+' aria-controls="accordion_'+v.BAD_SegSlNo+'">'+  v.SegmentName +'</button></h2><div id="accordion_'+v.BAD_SegSlNo+'" class="accordion-collapse collapse  accordionsegm_'+ v.BAD_SegmentId+' '+show+'" data-bs-parent="#accordionExample"><div class="accordion-body"> '+ul+'</div></div></div>');
                    retriveQuestion("#handle-list-"+v.BAD_SegSlNo,v.BAD_SegmentId,id);
                    acdrnhead++;
          
                }
                else{
              
                    retriveQuestion("#handle-list-"+v.BAD_SegSlNo,v.BAD_SegmentId,id);
                }
            });

            var uls = $("#accordionExample").find("ul.list-group-flush");
            $.each(uls, function(i, item) {
                var id = item.id;
                
                  
                document.getElementById(id) && Sortable.create(document.getElementById(id), { animation: 150, group: "handleList", handle: ".drag-handle" });
            });
            uls='';

          
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
function retriveQuestion(accdrinid,SegmentId,BA_Id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildQuestionList',
            param1: 'SegmentId',
            param1Value: parseInt(SegmentId),
            param2: 'BA_Id',
            param2Value: parseInt(BA_Id),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            
            var QsList='';
           
            $.each(data, function (index, elem) {
                index=index+1;
                var ID_Del="#chkGrid_"+elem.BAD_QuestionId;
                QsList = QsList + '<li id="list_' + elem.BAD_QuestionId + '" class="px-0 list-group-item lh-1 d-flex justify-content-between align-items-center"><span class="d-flex justify-content-between align-items-center"><i class="drag-handle cursor-move ti ti-menu-2 align-text-bottom me-2"></i><span class="spnQs">' + elem.QN_Question + '</span></span><input type="hidden" class="hdnQs" id="hdnQs_' + index + '" value="' + elem.BAD_QuestionId + '"/><input type="hidden" class="hdnQsOption" id="hdnQsOp_' + elem.BAD_Slno + '" value="' + elem.BAD_QuestionOption + '"/><a href="javascript:;" onClick="deleteVal(\'' + ID_Del + '\',' + elem.BAD_QuestionId + ',' + SegmentId + ')" class="text-body delete-record pl-4"><i class="ti ti-trash ti-sm mx-2"></i></a></li>';
            });

            $(accdrinid).append(QsList);
           
           
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function retriveDropDown() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'BindDropDownForAssessmentCategory',
            param1: 'BA_EnterpriseId',
            param1Value: parseInt($('#EnterpriseId').val()) > 0 ? parseInt($('#EnterpriseId').val()) : 0,
            StoreProcedure: 'BuildAssessmentSetUp_USP'
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
            $.each(data, function (i, v) {
                $("#ddlCategory").append($("<option></option>").val(v.AC_Id).html(v.AC_Category));  
            });
            DropdownBinder.DDLData = {
                tableName: "AssessmentSegmentSetUp_ASS",
                Text: 'ASS_Category',
                Value: 'ASS_Id',
                ColumnName: 'ASS_EnterpriseId',
                PId: parseInt($('#EnterpriseId').val()) > 0 ? parseInt($('#EnterpriseId').val()) : 0
            };
            DropdownBinder.DDLElem = $("#ddlSegment");
            DropdownBinder.Execute();
        },
        error: function (data) {
            Swal.fire({
                title: "Oops..!",
                text: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

$('#btnPrvSubmit').click(function () {

    var finalQuestionArray = [];

    for (var i = 1; i <= $("#accordionExample .accordion-item").length; i++) {
        var slno = 1;
        var slNoo = 0;
        for (var j = 1; j <= $('#accordion_' + i + ' .accordion-body #handle-list-' + i + '').length; j++) {
            $('#handle-list-' + i + '').find('li').each(function () {
                //slno= slno+$('#handle-list-'+i+' li').index();
                var current = $(this);

                finalQuestionArray.push({
                    BAD_SegSlNo: i,
                    BAD_SegmentId: $('#accordionExample #accordionItem_' + i + ' #hdnSeg_' + i + '').val(),
                    BAD_Slno: slno,
                    BAD_QuestionId: current.children('.hdnQs').eq(0).val(),
                });
                slno++;
                slNoo++;
            });
        }
    }
    SaveRecords(finalQuestionArray);
    ////console.log(finalQuestionArray);
})