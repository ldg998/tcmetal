/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    readonly: ['dept_code'], // 설정시 해당 name의 readonly 옵션
    auth:{} // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck();
    msg_get();
    selectBox();
    datepickerInput();
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수

    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로

});

////////////////////////////클릭 함수/////////////////////////////////////

// 조회 버튼
function get_btn(page) {
    var data = value_return('.condition_main');

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/outsErrorGet',
        datatype: "json",
        page: page,
        postData :data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I'; // 수정인지 체크
        modal_reset('.modal_value',['lot_no'])
        $("#select_modal1").prop("disabled", false).trigger("change");//셀렉트박스 잠금으로 체인지
        $("#select_modal2").prop("disabled", false).trigger("change");//셀렉트박스 잠금으로 체인지
        disabled_tf(["#modal_select1","#modal_select2","#modal_select3","#part_weight"],"N");
        datepickerInput_modal();
        $("#addDialog").dialog('open'); // 모달 열기

    }
}

// 그리는 더블 클릭 시 실행 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크


        jqgrid_data.part_weight = integer(jqgrid_data.part_weight);
        disabled_tf(["#modal_select1","#modal_select2","#modal_select3","#part_weight"],"Y");
        modal_edits('.modal_value',['ng_no','lot_no'], jqgrid_data) // response 값 출력
        select_makes_base("#modal_select2","/outsSelectGet","part_kind","part_kind",{keyword:'Y',keyword2:jqgrid_data.supp_code,keyword3:'',keyword4:''},"N").then(function (data) {
            $("#modal_select2").val(jqgrid_data.part_kind).trigger("change");
            select_makes_base("#modal_select3", "/outsSelectGet", "part_code", "part_name", {keyword:'Y',keyword2:jqgrid_data.supp_code,keyword3:jqgrid_data.part_kind,keyword4:''}, "N").then(function (data) {
                $("#modal_select3").val(jqgrid_data.part_code).trigger("change");

                ccn_ajax('/outsSelectGet', {keyword: 'Y', keyword2: $("#modal_select1").val(), keyword3: $("#modal_select2").val(), keyword4: $("#modal_select3").val()}).then(function (data) {
                    $("input[name=part_code]").val(data[0].part_code);
                    $("input[name=part_weight]").val((data[0].part_weight + "").replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                    $("#addDialog").dialog('open');
                })


            });
        })

    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {

    if(main_data.auth.check_del != "N") {  //권한체크
        var gu5 = String.fromCharCode(5); //아스키코드 5 담기
        var gu4 = String.fromCharCode(4); //아스키코드 4 담기
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우

        var list =[];

        for(var i=0;i<ids.length;i++){
            var data = $('#mes_grid').jqGrid('getRowData', ids[i]);
            list.push(data.ng_no+ gu4 +data.supp_code + gu4 + data.part_code + gu4 + data.part_kind);
        }

        if (ids.length === 0) {      //선택여부 체크  선택이안되어 0이라면
            alert(msg_object.TBMES_A004.msg_name1); // 경고메세지 출력
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) { //시행 여부메세지 출력
                console.log(list.join(gu5));

                main_data.check = 'D'; // 삭제권한 부여
                wrapWindowByMask2();  //마스크로 덥고 삭제 진행동안 다른작업 방지하기
                ccn_ajax("/outsErrorDel", {keyword:list.join(gu5)}).then(function (data) { // 체크된 그리드 로우에 아스키코드를 넣어 1|2|3| 이런식으로 데이터전달
                    if (data.result === 'NG') { // 프로시져 결과가 NG로 넘어왔을 경우
                        alert(data.message);   //해당 오류메세지 출력
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
                    }
                    closeWindowByMask(); //마스크 종료
                }).catch(function (err) { //에러발생시
                    closeWindowByMask(); // 마스크종료
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);// 권한 이 없을 경우 해당 메세지 출력
    }

}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "outsError"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['','','','','불량등록일자','업체','기종','품번','품명','단중','제품LOT','불량유형','수정','폐기','등록','등록일시'],
        colModel : [
            {name:'result_code2',index:'result_code2',sortable: false,fixed: true,hidden:true},
            {name:'result_code3',index:'result_code3',sortable: false,fixed: true,hidden:true},
            {name:'ng_no',index:'ng_no',sortable: false,fixed: true,hidden:true,key: true},
            {name:'supp_code',index:'supp_code',sortable: false,fixed: true,hidden:true},
            {name:'work_date',index:'work_date' ,sortable: false,width:100,fixed: true,formatter:formmatterDate2},
            {name:'supp_name',index:'supp_name',sortable: false,width:100,fixed: true},
            {name:'part_kind',index:'part_kind',sortable: false,width:100,fixed: true},
            {name:'part_code',index:'part_code',sortable: false,width:150,fixed: true},
            {name:'part_name',index:'part_name',sortable: false,width:100,fixed: true},
            {name:'part_weight',index:'part_weight',sortable: false,width:150,fixed: true,align: 'right', formatter: 'integer'},
            {name:'lot_no',index:'lot_no',sortable: false,width:100,fixed: true},
            {name:'qc_result_name',index:'qc_result_name',sortable: false,width:80,fixed: true},
            {name:'result_code2_name',index:'result_code2_name',sortable: false,width:150,fixed: true},
            {name:'result_code3_name',index:'result_code3_name',sortable: false,width:150,fixed: true},
            {name:'user_name',index:'user_name',sortable: false,width:100,fixed: true},
            {name:'create_date',index:'create_date',formatter:formmatterDate,sortable: false,width:180,fixed: true}
        ],
        multiselect: true,
        caption: "외주불량 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        jsonReader: {cell: ""},
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});
}

function selectBox() {
    $('#select1').select2();
    select_makes_base("#main_select3","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'},"");

}
function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}
