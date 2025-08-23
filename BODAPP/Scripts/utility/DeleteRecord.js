function DeleteRecords(tablename,ColName,param) {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        del: {
            tableName: $.trim(tablename),
            ColumnName: $.trim(ColName),
            param: $.trim(param),
          
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/GlobalDelete',
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
               var oTable = $('#datatable-example').DataTable();
                oTable.destroy();
                BindGrid();
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
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}