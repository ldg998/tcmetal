

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['code_value'],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    /*----모달----*/
    authcheck();
    modal_start1();
    modal_start2();
    jqgridPagerIcons(); // 그리드 아이콘 설정
    selectBox();

});

////////////////////////////클릭 함수//////////////////////////////////
function test(){
    $("#addDialog").dialog('open'); // 모달 열기
    jqGridResize("#mes_modal_grid" , $('#mes_modal_grid').closest('[class*="col-"]'));
    jqGridResize('#mes_modal_grid2', $('#mes_modal_grid2').closest('[class*="col-"]')); // 그리드 리사이즈

}

// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/qmsMeltSpecGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
      if (jqgrid_data.status == '등록'){
          main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
      }else {
          main_data.check = 'I';
      }

        var send_data = {};
        send_data.keyword = jqgrid_data.supp_code;
        send_data.keyword2 = 'M';
        send_data.part_kind = jqgrid_data.part_kind;
        send_data.part_code = jqgrid_data.part_code;
        ccn_ajax('/qmsMeltSpecOneGet',send_data).then(function (data) {
           var dataList={};
            if(data.length >0){
                    dataList.keyword =data[0].supp_code
                    dataList.part_kind=data[0].part_kind
                    dataList.part_code=data[0].part_code
                    dataList.keyword2 = 'S'
           modal_reset('.modal_value',main_data.readonly);
            modal_edits('.modal_value', main_data.readonly,data[0]); // response 값 출력
                $("#mes_modal_grid2").setGridParam({ // 그리드 조회
                    url: '/qmsMeltSpecOneGet',
                    datatype: "json",
                    postData: dataList
                }).trigger("reloadGrid");
            $("#addDialog").dialog('open');// 모달 열기
            jqGridResize("#mes_modal_grid2", $('#mes_modal_grid2').closest('[class*="col-"]'));

            }else {
                dataList.keyword2 = 'N'
                $("#mes_modal_grid2").jqGrid('clearGridData');
                modal_reset('.modal_value',main_data.readonly);
                modal_edits('.modal_value', main_data.readonly,jqgrid_data); // response 값 출력
                $("#mes_modal_grid2").setGridParam({ // 그리드 조회
                    url: '/qmsMeltSpecOneGet',
                    datatype: "json",
                    postData: dataList
                }).trigger("reloadGrid");
             $("#addDialog").dialog('open');// 모달 열기
             jqGridResize("#mes_modal_grid2", $('#mes_modal_grid2').closest('[class*="col-"]'));

            }
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

function all_update_btn() {
    if (main_data.auth.check_edit !="N") {
        var ids = $("#mes_grid").getGridParam('selarrrow');
        if (ids.length === 0) {
            alert("데이터를 선택해주세요");
        } else {
            var dataList = {};
            dataList.keyword = ''
            dataList.part_kind = ''
            dataList.part_code = ''
            dataList.keyword2 = 'N'
            $("#mes_modal_grid3").jqGrid('clearGridData');
            modal_reset('.modal_value2', main_data.readonly);
            // modal_edits('.modal_value', main_data.readonly,jqgrid_data); // response 값 출력
            $("#mes_modal_grid3").setGridParam({ // 그리드 조회
                url: '/qmsMeltSpecOneGet',
                datatype: "json",
                postData: dataList
            }).trigger("reloadGrid");
            $("#addDialog2").dialog('open');// 모달 열기
            jqGridResize("#mes_modal_grid3", $('#mes_modal_grid3').closest('[class*="col-"]'));
        }
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }

}


////////////////////////////호출 함수//////////////////////////////////
//호출함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsMeltSpec"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['','','업체','기종','품번','품명','단중','상태','등록자','수정일'],
        colModel: [
            {name: 'rownum', index: 'rownum',sortable: false,fixed: true,hidden:true,key:true},
            {name: 'supp_code', index: 'supp_code',sortable: false,fixed: true,hidden:true},
            {name: 'supp_name', index: 'supp_name',sortable: false, width: 130,fixed: true},
            {name: 'part_kind', index: 'part_kind',sortable: false, width: 110,fixed: true},
            {name: 'part_code', index: 'part_code',sortable: false, width: 130,fixed: true},
            {name: 'part_name', index: 'part_name',sortable: false, width: 190,fixed: true},
            {name: 'part_weight', index: 'part_weight',sortable: false, width: 100,fixed: true,align: 'right', formatter: 'integer'},
            {name: 'status', index: 'status',sortable: false, width: 70,fixed: true},
            {name: 'user_name', index: 'user_name',sortable: false, width: 60,fixed: true},
            {name: 'update_date', index: 'update_date',sortable: false, width: 140,fixed: true,formatter: formmatterDate}

        ],
        caption: "용해규격관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {            // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function selectBox() {
    $('#status').select2();
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    }
}
