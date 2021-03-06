

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['supp_code','part_kind','part_code'],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    /*----모달----*/
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
    modal_start1();
    selectBox();
});

////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼

function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성

    main_data.send_data.use_yn='';

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/sysSpartGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
    
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가

        datepicker_makes("#datepicker_modal1", 0); //모달 초기날짜 설정

        $('#supp_modal_select option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal1 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal2 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal3 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal4 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal5 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal6 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal7 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal8 option:eq(0)').prop("selected", true).trigger("change");
        $('#select_modal9 option:eq(0)').prop("selected", true).trigger("change");
        $("#supp_modal_select").prop("disabled",false).trigger("change");


        main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제

        var send_data = {};
        send_data.keyword = jqgrid_data.supp_code;
        send_data.keyword2 = jqgrid_data.part_kind;
        send_data.keyword3 = jqgrid_data.part_code;
        ccn_ajax('/sysSpartOneGet',  send_data).then(function (data) {
            data.startup_date = formmatterDate2(data.startup_date);
            modal_edits('.modal_value', main_data.readonly,data); // response 값 출력
            $("#supp_modal_select").prop("disabled",true).trigger("change");
            $("#addDialog").dialog('open');// 모달 열기


        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") { //권한체크
        var gu4 = String.fromCharCode(4);
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow');
        var keywords = [];
        var code_list;

        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                for(var i=0;i<ids.length;i++){
                    var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
                    keywords.push(data.supp_code+ gu4 +data.part_code+ gu4 +data.part_kind);
                }
                code_list=keywords.join(gu5);
                wrapWindowByMask2();
                ccn_ajax("/sysSPartDel", {keyword:code_list}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $("#mes_grid").trigger("reloadGrid");
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
    }
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();

        $('#part_code_select').empty();
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_code_select').append(option2);
        $('#part_code_select').select2();

    }
}

function select_change2(value) {
    if (value !== "") {
        select_makes_base("#part_code_select", "/sysSpartAllGet", "part_code", "part_name", {
            keyword: $("#supp_select").val(),
            keyword2: value
        }, "Y").then(function (data) {

        });
    } else {

        $('#part_code_select').empty();
        var option2 = $("<option></option>").text('전체').val('');
        $('#part_code_select').append(option2);
        $('#part_code_select').select2();
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
    ccn_ajax("/menuAuthGet", {keyword: "sysSPart"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['','','','업체','기종','품명','품명(한글)','품번','단중','사이즈','포장무게','단가','총금액','화폐단위','공정라우팅','외주(열처리)업체','사용유무','초도품생산일','목재1','목재2','목재3','출장검사','등록자','수정일시'],
        colModel: [
            {name: 'currency_code', index: 'currency_code',hidden:true,fixed: true},
            {name: 'rownum', index: 'rownum',hidden:true, width: 80,fixed: true,key:true},
            {name: 'supp_code', index: 'supp_code',hidden:true, width: 80,fixed: true},
            {name: 'supp_name', index: 'supp_name', width: 130,fixed: true},//업체
            {name: 'part_kind', index: 'part_kind', width: 110,fixed: true},//기종
            {name: 'part_name', index: 'part_name', width: 140,fixed: true},//품명
            {name: 'part_name2', index: 'part_name', width: 120,fixed: true},//품명
            {name: 'part_code', index: 'part_code', width: 120,fixed: true},//품번
            // {name: 'part_name2', index: 'part_name2', width: 120,fixed: true},//품명(생산지용)
            {name: 'part_weight', index: 'part_weight', width: 120,fixed: true,formatter: 'integer',align: 'right'},//단중
            {name: 'part_size', index: 'part_size', width: 90,fixed: true},//사이즈
            {name: 'gross_weight', index: 'gross_weight', width: 120,fixed: true,formatter: 'integer',align: 'right'},//포장무게
            {name: 'unit_cost', index: 'unit_cost', width: 80,fixed: true,formatter: 'integer',align: 'right'},//단가
            {name: 'total_cost', index: 'total_cost', width: 80,fixed: true,formatter: 'integer',align: 'right'},//단가
            {name: 'currency_type_name', index: 'currency_type_name', width: 50,fixed: true},//화폐단위
            {name: 'route_name', index: 'route_name', width: 120,fixed: true},//공정라우팅
            // {name: 'outs', index: 'outs', width: 120,fixed: true},//외주
            {name: 'outs_supp_name', index: 'outs_supp_name', width: 120,fixed: true},//외주(열처리)
            {name: 'use_yn', index: 'use_yn', width: 80,fixed: true},
            {name: 'startup_date', index: 'startup_date', width: 90,fixed: true,formatter:formmatterDate2},
            {name: 'wood_code1', index: 'wood_code1', width: 100,fixed: true},
            {name: 'wood_code2', index: 'wood_code2', width: 100,fixed: true},
            {name: 'wood_code3', index: 'wood_code3', width: 100,fixed: true},
            {name: 'outs_qc', index: 'outs_qc', width: 80,fixed: true},
            {name: 'user_name', index: 'user_name', width: 80,fixed: true},
            {name: 'update_date', index: 'update_date', width: 140,fixed: true,formatter:formmatterDate}

        ],
        caption: "제품품목 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        sortable: true,
        sortorder: 'desc',
        jsonReader: {cell: ""},
        
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
    select_makes_base("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
    });

    $('#part_code_select').select2();

    // select_makes_sub("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'',keyword2:''},"Y");
}
//
// function supp_select_change() {
// var supp_code = $('#supp_select').val();
//   if(supp_code == null || supp_code ==''){
//       $("select#part_kind_select option").remove()
//   } else {
// select_makes_sub("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'',keyword2:supp_code},"N");
//   }
// }