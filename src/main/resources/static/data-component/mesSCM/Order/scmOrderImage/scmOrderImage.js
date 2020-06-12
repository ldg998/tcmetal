/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I', // 수정,추가 판단용
    readonly: ['dept_code'], // 설정시 해당 name의 readonly 옵션
    auth:{},// 권한체크 후 권한 data 담는 용도
    delCheck:0
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get(); //메세지설정
    authcheck(); // 권한설정
    modal_start1(); //모달시작

    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    /*----모달----*/
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
    get_btn(1); // 그리드 조회
});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn(page) {
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/scmOrderImageGet',
        datatype: "json",
        page: page
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        readURLRemove(); //사진 첨부 삭제및 초기화
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1); //오류메세지 출력
    }
}

// 그리드 더블 클릭 시 발동
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        readURLRemove(); //초기 이미지 url 비워주고
        main_data.delCheck = 0; // delCheck 값 0으로 초기화
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/scmOrderImageOneGet', {keyword: jqgrid_data.img_code}).then(function (data) { // user의 하나 출력
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            if(data.file1 !== '' && data.file1 !== null) {
                var dataname =  data.file1.split('/');
                $('#img-text').remove();
                $('#img').attr('src',"/uploadFile/"+dataname[dataname.length-2]+"/"+dataname[dataname.length-1]); //이미지 주소지 할당
                $('#img').show(); //표시
            }
            return data;

        });

        $("#addDialog").dialog('open'); //모달 오픈
    } else {
        alert(msg_object.TBMES_A003.msg_name1); //오류메세지 출력
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5); //아스키코드 char5 = |
        var gu4 = String.fromCharCode(4); //아스키코드 char4 =「
        var ids = $("#mes_grid").getGridParam('selarrrow'); // 체크된 그리드 로우

        if (ids.length === 0) {  // 체크 객체 여부
            alert(msg_object.TBMES_A004.msg_name1);//오류 메세지 출력
        } else {
            var list = [];
            var jdata = {};

            for(var i=0;i<ids.length;i++){ //체크 된 수만큼 반복
                jdata =  $('#mes_grid').jqGrid('getRowData', ids[i]); // 해당 ids 에 데이터 를 jdata 에담아주고
                list.push(jdata.file1); //뿌려준다
            }

            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D'; //삭제 부여
                wrapWindowByMask2(); //마스크 온
                ccn_ajax("/scmOrderImageDel", {keyword: ids.join(gu5)+gu4+list.join(gu5)}).then(function (data) {
                    // 프로시져에서 아스키코드를 기준으로 조회
                    if (data.result === 'NG') { // 프로시져 메세지ng 라면
                        alert(data.message); // 오류메세지 출력
                    } else {
                        get_btn($("#mes_grid").getGridParam('page'));//페이지 재조회
                    }
                    closeWindowByMask(); //마스크 오프
                }).catch(function (err) {
                    closeWindowByMask(); //마스크 오프
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1); // 오류메세지 출력
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A001");// 추가권한 없음
    msgGet_auth("TBMES_A002");// 삭제권한 없음
    msgGet_auth("TBMES_A003");// 수정한권한 없음
    msgGet_auth("TBMES_A004");// 삭제 데이터 선택 요청
    msgGet_auth("TBMES_A005");// 삭제여부
    msgGet_auth("TBMES_Q014");// 엑셀다운여부
}

function authcheck() { //권한체크
    ccn_ajax("/menuAuthGet", {keyword: "scmOrderImage"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() { //메인그리드설정
    $("#mes_grid").jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames : ['양식코드','양식명','등록자','등록일시','file1'],
        colModel : [
            {name:'img_code',index:'img_code',sortable: false,key:true,fixed:true,width:100},
            {name:'img_name',index:'img_name',sortable: false,fixed:true,width:150},
            {name:'user_name',index:'user_name',sortable: false,fixed:true,width:150},
            {name:'update_date',index:'update_date',sortable: false,formatter:formmatterDate,fixed:true,width:150},
            {name:'file1',index:'file1',sortable: false,hidden:true}
        ],
        caption: "발주이미지관리 | MES",
        autowidth: true,
        height: 600,
        pager: '#mes_grid_pager',
        jsonReader: {cell: ""},
        rowNum: 100,
        rowList: [100, 200, 300, 400],
        viewrecords: true,
        multiselect: true,
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



