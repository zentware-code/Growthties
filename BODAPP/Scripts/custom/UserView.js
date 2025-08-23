


$(document).ready(function () {

    retrive();
});

function retrive() {

    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectSingle",
            Param: "UM_Id",
            StoreProcedure: "UserMaster_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            $('#hdnUmId').val(data["UM_Id"]);
            $('#spnUmName').text(data["UM_Name"]);
            $('#spnSubRole').text(data["UM_SubRole"]);
            $('#spnUmlogin').text(data["UM_Name"]);
            $('#spnEmail').text(data["UM_EmailId"]);
            $('#spnStatus').text(data["UM_Active"]);
            $('#spnRole').text(data["UM_Role"]);
            $('#spnContact').text(data["UM_ContactNo"]);
            $('#hdnupload').val(data["UM_ProfilePic"]);
            var prfix = data["UM_Prefix"];
            if (data["UM_ProfilePic"] == 'NO') {

                var mySecondDiv = $("<div class='avatar avatar-xl'><span class='avatar-initial rounded-circle bg-info'>" + prfix + "</span></div>");
                $('#imgDiv').append(mySecondDiv);
            }
            else {
                $('#prfpicIMG').css('display','block');
                $('#prfpicIMG').attr('src', data["UM_ProfilePic"]);
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function fnModelData() {

    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectSingle",
            Param: "UM_Id",
            StoreProcedure: "UserMaster_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMaster",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            $('#hdnUmId').val(data["UM_Id"]);
            $('#modalEditUserName').val(data["UM_Name"]);
            $('#modalEditUserEmail').val(data["UM_EmailId"]);
            $("#modalEditUserStatus").val(data["UM_Active"]).change();
            $('#modalEditUserPhone').val(data["UM_ContactNo"]);
            $('#modalEditAddress').val(data["UM_Address"]);
        },
        error: function (data) {

            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
$("#btnSubmit").click(function () {
    SaveModelData();
});
//$("#btnUpdatePassword").click(function () {
//    UpdatePassword();
//});
function SaveModelData() {
   
    var _data = JSON.stringify({
        User: {
            UM_ID: $('#hdnUmId').val(),
            //UserLoginID: $('#LoginId').val(),
            UserName: $('#modalEditUserName').val(),
            UM_ContactNo: $('#modalEditUserPhone').val(),
            UM_EmailId: $('#modalEditUserEmail').val(),
            UM_Active: $('#modalEditUserStatus').val(),
            UM_Address: $('#modalEditAddress').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/UserMaster",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                $(".form-control").val('');
                $("#editUser .close").click();
                retrive();

            }
            else {

                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {

            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

}

function UpdatePassword() {

    var _data = JSON.stringify({
        User: {
            UM_ID: $('#hdnUmId').val(),
            Password: $('#newPassword').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/UserChangesPassword",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Password Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
            else {

                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {

            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

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
function ShowPreview(input) {

  
  
        var fileInput = $('#upload');
        var maxSize = fileInput.data('max-size');

        //var file, img;


        //if ((file=fileInput.get(0).files[0])) {
        //    img = new Image();
        //    img.onload = function () {
        //        alert(this.width + " " + this.height);
        //        if (this.width > 100) {
        //            Swal.fire({
        //                title: 'Image width must be within 100 ',
        //                icon: "error",
        //                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //                buttonsStyling: !1
        //            });
        //        }
        //        if (this.height > 100) {
        //            Swal.fire({
        //                title: 'Image height must be within 100 ',
        //                icon: "error",
        //                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //                buttonsStyling: !1
        //            });
        //        }
        //    };
        //    img.onerror = function () {


        //        Swal.fire({
        //            title: 'not a valid file: ' + file.type,
        //            icon: "error",
        //            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
        //            buttonsStyling: !1
        //        });
        //    };
        //    img.src = _URL.createObjectURL(file);


    //}

        var size = bytesToSize(maxSize);

        ////console.log(bytesToSize(234));

        if(fileInput.get(0).files.length){
            var fileSize = fileInput.get(0).files[0].size; // in bytes
           
            
            if(fileSize>maxSize){
             

                Swal.fire({
                    title: 'File size is more then ' + size + 'b',
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                return false;
            }

            else {
                if (input.files && input.files[0]) {
                    var ImageDir = new FileReader();
                    ImageDir.onload = function (e) {
                        $('#prfpicIMG').attr('src', e.target.result);
                        //$('#ProfileImage').val(e.target.result);
                    }

                    ImageDir.readAsDataURL(input.files[0]);

                    UploadDoc('upload');
                    pathFl = $('#upload').val().substring(12);
                    pathStringFl = '/Upload/' + pathFl;
                    var hdnImagePath = pathStringFl;
                    $('#hdnupload').val(hdnImagePath);
                }
            }
        }else{
           
            Swal.fire({
                title: 'choose any one image, please',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

    }
   
////For upload file into folder
function UploadDoc(upload) {
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
        success: function (response) {
            UpdatePhoto();
        }
    });
}

function UpdatePhoto() {

    var _data = JSON.stringify({
        User: {
            UM_ID: $('#hdnUmId').val(),
            UM_ProfilePic: $('#hdnupload').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/UserPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                $('#imgDiv').css('display', 'none');
                $('#prfpicIMG').css('display', 'block');
            }
            
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });

}