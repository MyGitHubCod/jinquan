
/**
 * Created by Arterli on 2015/11/8.
 */
"use strict";
var oTable;
$(function () {

    oTable = initTable();
    $('#register #btn').on('click', function () {
        $('#register').parsley().validate();
        if (true === $('#register').parsley().isValid()) {
            _addFun();
        }
        return false;
    });

});
// datatable
function initTable() {
    var table = $('[data-ride="datatables"]').DataTable({
        "bProcessing": true,
        "bDestory": true,
        "serverSide": true,
        "bFilter": false,
        "bSort": false,
        paging: false,
        "ordering": false,
        "info": false,
        "ajax":{
            "url":"/admin/menu/getlist",
        },

       "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",

        "aoColumnDefs": [
            {
                "mRender": function (data, type, row) {
                        return '<a href="javascript:void(0);" class="text-info-lter"  onclick="_getlist('+row.id+')">'+data+'</a>';

                }, "bSortable": false, "aTargets": [2]
            },
            {
                "mRender": function (data, type, row) {

                    if(data==1){
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(0,'+row.id+',2)"><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>';
                    }else{
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(1,'+row.id+',2)"><i class="fa fa-check text-success text"></i><i class="fa fa-times text-danger text-active"></i></a>';

                    }
                }, "bSortable": false, "aTargets": [7]
            },
            {
                "mRender": function (data, type, row) {
                    if(data==1){
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(0,'+row.id+',1)"><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>';
                    }else{
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(1,'+row.id+',1)"><i class="fa fa-check text-success text"></i><i class="fa fa-times text-danger text-active"></i></a>';

                    }
                }, "bSortable": false, "aTargets": [8]
            },
            {
                "mRender": function (data, type, row) {
                    var url1 = "/admin/menu/edit/?id=" + data;
                    //var url2 = "/admin/uuu/roledel/id/"+data;
                    return '<a class="btn btn-default btn-xs" data-bjax="" data-target="#bjax-target"  href=' + url1 + ' onclick="_editBn()">??????</a> ' +
                        '<a class="btn btn-default btn-xs roledel" href="javascript:void(0);" onclick="_deleteFun(' + data + ')">??????</a>';
                }, "bSortable": false, "aTargets": [9]
            },
            {
                "mRender": function (data, type, row) {

                    return '<label class="checkbox m-n i-checks"><input type="checkbox" name="post[]"><i></i></label>';
                },
                'bSortable': false,
                "aTargets": [0]
            },

        ],
        "aoColumns": [
            {"mData": ""},
            {"mData": "id"},
            {"mData": "title"},
            {"mData": "up_title"},
            {"mData": "group"},
            {"mData": "url"},
            {"mData": "sort"},
            {"mData": "is_dev"},
            {"mData": "hide"},
            {"mData": "id"}
        ],
        language: {
            "sProcessing": "?????????...",
            "sLengthMenu": "?????? _MENU_ ?????????",
            "sZeroRecords": "??????????????????",
            "sInfo": "????????? _START_ ??? _END_ ??????????????? _TOTAL_ ???",
            "sInfoEmpty": "????????? 0 ??? 0 ??????????????? 0 ???",
            "sInfoFiltered": "(??? _MAX_ ???????????????)",
            "sInfoPostFix": "",
            "sSearch": "??????:",
            "sUrl": "",
            "sEmptyTable": "??????????????????",
            "sLoadingRecords": "?????????...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "??????",
                "sPrevious": "??????",
                "sNext": "??????",
                "sLast": "??????"
            },
            "oAria": {
                "sSortAscending": ": ?????????????????????",
                "sSortDescending": ": ?????????????????????"
            }
        }
    });
    return table;
};
/**
 * ???????????????
 */
function _getlist(pid){
    oTable.ajax.url( '/admin/menu/getlist/?pid='+pid ).load(function(e){
        if(e.breadcrumb){
            var nav = []
            var html;
            var n=e.breadcrumb.length;
            e.breadcrumb.forEach(function(v,k){
                if(k+1 == n){
                    html='<li class="active text-xs">'+v.title+'</li>'
                }else{
                    html='<li><a href="javascript:void(0);" onclick="_getlist('+v.id+')">'+v.title+'</a></li>'
                }

                nav.push(html);
            })
            }
        //console.log(nav.join(""));
       $('.breadcrumb').html('<li><a href="javascript:void(0);" onclick="_getlist(0)"><i class="fa fa-list-ul"></i> ????????????</a></li>'+nav.join(""));
    });
}
/**
 * ????????????
 * @private
 */
function _editBn() {
    $("#bjax-target").addClass("show");
}



/**
 * ??????
 * @param id
 * @private
 */
function _deleteFun(id) {
    swal({
            title: "??????????",
            text: "????????????????????????????????????!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "??????!",
            cancelButtonText: "??????!",
            closeOnConfirm: false
        },
        function(){
    $.ajax({
        url: "/admin/menu/delete",
        data: {"id": id},
        type: "post",
        success: function (backdata) {
            if (backdata) {
                oTable.ajax.reload();
                swal("????????????!", "????????????????????????.", "success");
            } else {
                alert("????????????");
            }
        }, error: function (error) {
            console.log(error);
        }
    });
        });
}

/**
 * ????????????
 */
function resetFrom() {
    $('form').each(function (index) {
        $('form')[index].reset();
    });
}
/**
 * ??????????????????
 */
function _chsta(status,id,key){
    $.ajax({
        url:"/admin/menu/chsta",
        data:{status:status,id:id,key:key},
        success:function(res){
            if(res){
                oTable.ajax.reload();
                toastr.success('?????????????????????')
            }else{
                toastr.error("?????????????????????");
            }
        }
    })


}

/*
 add this plug in
 // you can call the below function to reload the table with current state
 Datatables????????????
 oTable.fnReloadAjax(oTable.fnSettings());
 */
$.fn.dataTableExt.oApi.fnReloadAjax = function (oSettings) {
//oSettings.sAjaxSource = sNewSource;
    this.fnClearTable(this);
    this.oApi._fnProcessingDisplay(oSettings, true);
    var that = this;

    $.getJSON(oSettings.sAjaxSource, null, function (json) {
        /* Got the data - add it to the table */
        for (var i = 0; i < json.aaData.length; i++) {
            that.oApi._fnAddData(oSettings, json.aaData[i]);
        }
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        that.fnDraw(that);
        that.oApi._fnProcessingDisplay(oSettings, false);
    });
}

