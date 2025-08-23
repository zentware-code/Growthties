/// <reference path="F:\OfficeProject\BusinessOnDemand\BOD_Phase1\BOD22_03_2024\BOD\BODAPP\Views/Job/TeamBuildingList.cshtml" />
/// <reference path="F:\OfficeProject\BusinessOnDemand\BOD_Phase1\BOD22_03_2024\BOD\BODAPP\Views/Job/TeamBuildingList.cshtml" />
/// <reference path="F:\OfficeProject\BusinessOnDemand\BOD_Phase1\BOD22_03_2024\BOD\BODAPP\Views/Job/TeamBuildingList.cshtml" />
"use strict";
var GlobData=[];
$(document).ready(function () {

    var Id = getParameterByName('Id');

    if (Id != '') {
        retrive(Id);
    }

});
//Get Data From URL   
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function DropdownData() {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAllSMMEUserForSelect',
            param1: 'SMME_Id',

            StoreProcedure: 'SMMERegistration_USP',

        }
    });
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data, status) {
            GlobData = JSON.parse(data);
            

        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    })
}
!(function () {
    DropdownData();
    var a = document.querySelector("#TagifyBasic"),
        a = (new Tagify(a), document.querySelector("#TagifyReadonly")),
        a = (new Tagify(a), document.querySelector("#TagifyCustomInlineSuggestion")),
        e = document.querySelector("#TagifyCustomListSuggestion"),
        t = [
          
        ],
        a =
            (new Tagify(a, { whitelist: t, maxTags: 10, dropdown: { maxItems: 20, classname: "tags-inline", enabled: 0, closeOnSelect: !1 } }),
            new Tagify(e, { whitelist: t, maxTags: 10, dropdown: { maxItems: 20, classname: "", enabled: 0, closeOnSelect: !1 } }),
            document.querySelector("#TagifyUserList"));
    let i = new Tagify(a, {
        tagTextProp: "name",
        enforceWhitelist: !0,
        skipInvalid: !0,
        dropdown: { closeOnSelect: !1, enabled: 0, classname: "users-list", searchKeys: ["name", "email"] },
        templates: {
            tag: function (a) {
                return `
                <tag title="${a.title || a.email}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
      class="${this.settings.classNames.tag} ${a.class || ""}"
      ${this.getAttributes(a)}
                >
                  <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
                  <div>
                    <div class='tagify__tag__avatar-wrap'>
                    <div class="avatar avatar-xs me-2">
            <span class="avatar-initial bg-warning">${a.prefix}</span>
          </div>
                      //<img onerror="this.style.visibility='hidden'" src="${a.avatar}">
                    </div>
                    <span class='tagify__tag-text'>${a.name}</span>
                  </div>
                </tag>
  `;
            },
            dropdownItem: function (a) {
                //              return `<div  ${this.getAttributes(a)}class='tagify__dropdown__item align-items-center ${a.class || ""}'tabindex="0"role="option">
                //             ${
                //                  a.avatar
                //                      ? `<div style="height:100%;margin:0;display:none;" class='tagify_dropdownitem_avatar-wrap'><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-success m-0 p-0">pi</span></div></div>`
                //                  : ""
                //    }
                //              <p class='fw-medium text-danger' style='height:0;'>${a.name}</p>
                //                  <p>${a.email}</p>
                //            </div>
                //`;
                //          },


                return `<div ${this.getAttributes(a)}
      class='tagify__dropdown__item align-items-center ${a.class || ""}'
      tabindex="0"
                role="option"
              >
                ${
                    a.avatar
                        ? `<div class='tagify__dropdown__item__avatar-wrap'>
                        <div class="avatar me-2"><span class="avatar-initial rounded-circle bg-success">${a.avatar}</span></div>
                    //<img onerror="this.style.visibility='hidden'" src="${a.avatar}">
                  </div>`
                    : ""
                }
                <div class="fw-medium">${a.name}</div>
                <span>${a.email}</span>
              </div>
    `;
            },
        },
        whitelist: 
          
        GlobData,
    });
    i.on("dropdown:select", function (a) {
        a.detail.elm.classList.contains(i.settings.classNames.dropdownItem + "__addAll") && i.dropdown.selectAll();
    }).on("edit:start", function ({ detail: { tag: a, data: e } }) {
        i.setTagTextNode(a, `${e.name} <${e.email}>`);
    });
  
})();

$('#btnSave').click(function(){
    SaveRecord();
})
function SaveRecord() {
    if ($('#TagifyUserList').val() != "") {
        var jsonArray = JSON.parse($('#TagifyUserList').val());

        var normalArray = jsonArray.map(function (obj) {
            return obj.value;
        });
    }

    var _data = JSON.stringify({
        entity: {
            BT_Id: $('#hdnId').val(),
            BT_TeamName: $.trim($('#txtTeamName').val()),
            BT_Description: $('#txtDescription').val(),
            BuildTeamUserList: normalArray,
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
function retrive(id) {

    var _data = JSON.stringify({
        global: {
            TransactionType: "SelectEdit",
            param1: "BT_Id",
            param1Value: parseInt(id),
            param2: "BT_SMMEId",
            param2Value: parseInt($('#hdnSmmeId').val()),
            StoreProcedure: "BuildTeam_USP"
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetTeamUserData",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);

            $('#hdnId').val(data["BT_Id"]);
            $('#txtTeamName').val(data["BT_TeamName"]);
            $('#txtDescription').val(data["BT_Description"]);
           
            var quesDetai = data.BuildTeamUserList.join(",");
            $('#TagifyUserList').val(quesDetai).change();
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
    return false;

}
$("#btnCancelRedirect").on("click", function () {
    //fnCancelRedirect();
    window.location.href = "/SMME/TeamBuildingList";
});