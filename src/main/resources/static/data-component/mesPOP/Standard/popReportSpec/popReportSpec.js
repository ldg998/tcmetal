/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    send_data_post: {},
    readonly:[],
    auth:{},
    change: 'Y'
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    selectBox();
    modal_start1();
    modal_start2();
    authcheck();
    jqgridPagerIcons();
    get_btn(1);

});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data_post = main_data.send_data;
    $("#mes_grid").setGridParam({
        url: "/popReportSpecGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {

    $("#mes_grid").setGridParam({
        url: "/popReportSpecGet",
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}


// function delete_btn() {
//     if(main_data.auth.check_del != "N") {
//         var gu5 = String.fromCharCode(5);
//         var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
//         if (ids.length === 0) {
//             alert("삭제하는 데이터를 선택해주세요");
//         } else {
//             if (confirm("삭제하겠습니까?")) {
//                 main_data.check = 'D';
//                 wrapWindowByMask2();
//
//                 ccn_ajax("/crmOrderRecpDel", {keyword: ids.join(gu5)}).then(function (data) {
//                     if (data.result === 'NG') {
//                         alert(data.message);
//                     } else {
//                         get_btn_post($("#mes_grid").getGridParam('page'));
//                     }
//                     closeWindowByMask();
//                 }).catch(function (err) {
//                     closeWindowByMask();
//                     console.error(err); // Error 출력
//                 });
//             }
//         }
//     } else {
//         alert("삭제권한이 없습니다.");
//     }
// }


function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        $("#image_modal").val("");
        delcheck = 0;

        main_data.check = 'U'; // 수정인지 체크

        var send_data = {};

        send_data.keyword = jqgrid_data.prod_type;
        send_data.keyword2 = jqgrid_data.prod_code;


        ccn_ajax('/popReportSpecOneGet', send_data).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            if(data.image === "" || data.image === null){
                $("#image_seach_btn").text("찾기");
            } else {
                $("#image_seach_btn").text("완료");
            }


            $("#addDialog").dialog('open');
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}




function select_change1(value) {
    if (value !== ""){
        select_makes_base('#prod_select_main', "/sysProdAllGet","prod_code" ,"prod_name",{keyword:value},'Y').then(function (){

        });
    } else {
        $('#prod_select_main').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#prod_select_main').append(option);
        $('#prod_select_main').select2();
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A003");
}

function selectBox() {
   select_makes_base("#prod_type_select_main", "/sysProdTypeAllGet", "prod_type", "prod_type_name",{keyword:''},'Y').then(function (data) {
       $('#prod_select_main').empty();
       var option = $("<option></option>").text('전체').val('');
       $('#prod_select_main').append(option);
       $('#prod_select_main').select2();
   });
}





function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popReportSpec"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['rownum','제품구분','제품구분코드','제품명','제품코드','이미지','등록자','등록일시'],
        colModel: [
            {name: 'rownum', index: 'rownum', sortable: false,hidden:true , key:true, width: 150,fixed: true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 150,fixed: true},
            {name: 'prod_type', index: 'prod_type', sortable: false,hidden:true, width: 150,fixed: true},
            {name: 'prod_name', index: 'prod_name', width: 150, sortable: false,fixed: true},
            {name: 'prod_code', index: 'prod_code', width: 150, sortable: false,hidden:true,fixed: true},
            {name: 'image', index: 'image', width: 150, sortable: false,fixed: true,formatter:image_formatter},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150,fixed: true},
            {name: 'update_date', index: 'update_date', sortable: false, width: 150,formatter:formmatterDate,fixed: true},

        ],
        caption: "작업의뢰서설정 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        //multiselect: true,
        // beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
        //     var $myGrid = $(this),
        //         i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
        //         cm = $myGrid.jqGrid('getGridParam', 'colModel');
        //     return (cm[i].name === 'cb');
        // },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        }
    });
}


function image_formatter(cellvalue, options, rowObject) {
    if (cellvalue !== "" &&  cellvalue !== null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='image_show(\"" + rowObject.image + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 보기</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}


function image_show(value) {
    var image1= value.split("/");
    var index1 = image1.length;
    $("#addDialog2_image").attr("src","/uploadFile/popReportSpec/"+image1[index1-1]);

    $("#addDialog2").dialog('open');
}