var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    datepickerInput();
    jqGrid_main_modal();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var add_data = value_return(".modal_value");
    var jdata = $("#mes_modal_grid2").getRowData();
    add_data.check = main_data.check;


    if (jdata.length > 0) {
        var list = [];
        var list2 = [];
        jdata.forEach(function (data, j) {
            if (data.seq !== '' && data.seq > 0) {
                list.push(data.seq+gu4 + data.chem_name +gu4 + data.range1 + gu4 + data.range2 + gu4 + data.remark);
            } else {
                list2.push(data.seq);
            }
        });
        callback(function () {
                    var text = msg_object.TBMES_Q002.msg_name1;
                    if (main_data.check === "U") {
                        text = msg_object.TBMES_Q003.msg_name1;
                    }
                     console.log(list);
                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.melt_sub = list.join(gu5);

                        ccn_ajax("/qmsMeltSpecAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                $('#mes_grid').trigger("reloadGrid");
                                }
                            }
                            $('#mes_modal_grid2').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert(msg_object.TBMES_E008.msg_name1);
                        });
                    }


        });
    } else {
        alert("저장 목록을 넣어주세요");
    }



}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}



function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 700, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog('close');
                }
            }
        ]
    })
}

function jqGrid_main_modal() {


        $("#mes_modal_grid2").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        caption: "용해규격관리 | MES",
        mtype: 'POST',// post 방식 데이터 전달
        colNames : ['','성분','표줌함량(%)부터','표준함량(%)까지','주의사항'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'seq',index:'seq',sortable: false,fixed: true,hidden:true},
            {name:'chem_name',index:'chem_name',sortable: false,width:110,fixed: true},

            {name:'range1',index:'range1',sortable: false,width:125,fixed: true,align:'right',formatter:'number',editable: true,
                editoptions: {
                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {

                                if (e.target.value === '0.00'){
                                    e.target.value = '';
                                }
                                $(e.target).attr('autocomplete', 'off');

                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);


                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },

            {name:'range2',index:'range2',sortable: false,width:125,fixed: true,align:'right',formatter:'number', editable: true,
                editoptions: {
                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0'){
                                    e.target.value = '';
                                }
                                $(e.target).attr('autocomplete', 'off');
                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);


                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }},

            {name:'remark',index:'remark',sortable: false,width:125,fixed: true,editable: true,
                editoptions: {
                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if(main_data.status === 'Y') {
                                    $(e.target).prop('readonly',true);
                                }else {
                                    $(e.target).prop('readonly',false);
                                }

                                $(e.target).attr('autocomplete','off');
                            }
                        },
                        {
                            type: 'focusout',
                            fn: function() {
                                $("#mes_add_grid2").jqGrid("saveCell",saverow, savecol);
                            }
                        }
                    ]
                }}
        ],

        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 260, // 그리드 세로 길이 설정
            cellEdit: true,
            cellsubmit: 'clientArray',
            beforeEditCell: function (id, name, val, IRow, ICol) {
                lastsel = id;
                saverow = IRow;
                savecol = ICol;
            },

        // beforeSelectRow: function (rowid, e) { },
        // ondblClickRow: function (rowid, iRow, iCol, e) { },
        loadComplete:function(){// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    })//.navGrid("mes_modal_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정

}
function datepickerInput() {

    datepicker_makes("#datepicker", 0);
}