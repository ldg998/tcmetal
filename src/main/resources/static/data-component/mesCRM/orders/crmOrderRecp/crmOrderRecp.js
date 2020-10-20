/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    check2: 'Y',
    readonly: ['dept_code'], // 설정시 해당 name의 readonly 옵션
    auth:{} // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck();
    msg_get();
    datepickerInput();
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    selectBox();
    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로

});

////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/crmOrderRecpGet2',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}


// 조회 버튼
function get_end_date_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, ''); //가져온 날짜데이터 가공 2020-06-01 = 20200601

    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/crmOrderRecpEndDateGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        main_data.check = 'I'; // 수정인지 체크
        modal_reset(".modal_value", []);
        $("#modal_select1").val($("#supp_select").val()).trigger("change");
        disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"N");
        $("#addDialog").dialog('open'); // 모달 열기
    }
}

// 그리는 더블 클릭 시 실행 수정버튼
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        main_data.check2 = 'N'; // 수정인지 체크
        ccn_ajax('/crmOrderRecpOneGet', {keyword: jqgrid_data.ord_no}).then(function (data) { // user의 하나 출력
            disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"Y");
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            select_makes_base("#modal_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:data.supp_code},"N").then(function (data2) {
                $("#modal_select2").val(data.part_kind).trigger("change");
                select_makes_base("#modal_select3","/sysSpartAllGet","part_code","part_name",{keyword:data.supp_code,keyword2:data.part_kind},"N").then(function (data3) {
                    $("#modal_select3").val(data.part_code).trigger("change");
                    main_data.check2 = 'Y';
                    $("#addDialog").dialog('open');
                });
            });

        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if(status_ck(ids)) {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D';
                wrapWindowByMask2();
                ccn_ajax("/crmOrderRecpDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        $('#mes_grid').trigger("reloadGrid");
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }else {
                $('#mes_grid').jqGrid("resetSelection");    //그리드 전체 선택해제
                alert('수주완료된 데이터는 삭제할수 없습니다');
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
    }
}


//완료처리버튼
function complete_btn() {
    if (main_data.auth.check_edit != "N") {
        var gu5 = String.fromCharCode(5);             //아스키코드5
        var ids = $("#mes_grid").getGridParam('selarrrow'); //선택한 그리드 로우
        if (ids.length === 0) {                             //선택여부
            alert("완료처리하는 데이터를 선택해주세요");
        } else {
            if(status_ck(ids)) {
                if (confirm("완료처리 하시겠습니까?")) {           //시행여부
                    wrapWindowByMask2();                       //마스크 온
                    ccn_ajax("/crmOrderRecpComp", {keyword: ids.join(gu5)}).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            $('#mes_grid').trigger("reloadGrid"); //화면 리로딩
                        }
                        closeWindowByMask();                //마스크 오프
                    }).catch(function (err) {
                        closeWindowByMask();                //마스크 오프
                        console.error(err); // Error 출력
                    });
                }
            }else {
                alert('이미 수주가 완료된 데이터가 있습니다.');
            }
            $('#mes_grid').jqGrid("resetSelection");    //그리드 전체 선택해제
        }
    } else {
        alert(msg_object.TBMES_A003.msg_name1);         //오류메세지 출력
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
    ccn_ajax("/menuAuthGet", {keyword: "crmOrderRecp"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['','수주일자','전표번호','업체','상태','PO','기종','품번','품명','단중','단가','수량','중량','금액','납기일자','등록자','등록일시'],
        colModel : [
            {name:'status',index:'status',fixed: true,hidden:true},
            {name:'work_date',index:'work_date' ,width:90,fixed: true,formatter:formmatterDate2},
            {name:'ord_no',index:'ord_no',key: true,width:120,fixed: true},
            {name:'supp_name',index:'supp_name',width:130,fixed: true},
            {name:'status_name',index:'status_name',hidden:true, width:70,fixed: true},
            {name:'po_no',index:'po_no',width:120,fixed: true},
            {name:'part_kind',index:'part_kind',width:110,fixed: true},
            {name:'part_code',index:'part_code',width:130,fixed: true},
            {name:'part_name',index:'part_name',width:190,fixed: true},
            {name:'part_weight',index:'part_weight',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name:'unit_cost',index:'unit_cost',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name:'qty',index:'qty',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name:'weight',index:'weight',width:90,fixed: true, align: 'right',formatter:'integer'},
            {name: 'price_amount', index: 'price_amount', fixed: true, width: 90, align: 'right',formatter:'integer'},
            {name:'end_date',index:'end_date' ,width:90,fixed: true,formatter:formmatterDate2},
            {name: 'user_name', index: 'user_name',  width: 60,fixed:true},
            {name: 'update_date', index: 'update_date',  width: 140, formatter: formmatterDate,fixed:true}
        ],
        caption: "수주정보관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        jsonReader: {cell: ""},
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        multiselect: true,
        sortable: true,
        sortorder:"desc",
        forceClientSorting: true,
        navOptions: { reloadGridOptions: { fromServer: true } },
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

function datepickerInput() {
    datepicker_makes("#datepicker", -365);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_makes_base("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y").then(function (data) {
    });
}
function status_ck(ids){
    var ck = 0;
    var ck2 = true;
    ids.forEach(function (id) {
        var rowdata = $('#mes_grid').jqGrid('getRowData', id);// 해당 로우아이디 데이터 호출
       console.log(rowdata)
        if(rowdata.status == 1){
            ck++
        }
    })
   if(ck >0){
       ck2 = false;
   }

return ck2;
}