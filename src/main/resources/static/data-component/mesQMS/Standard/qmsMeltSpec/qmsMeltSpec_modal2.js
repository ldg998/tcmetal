var lastsel2;
var saverow2 = 0;
var savecol2 = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2(); // 모달 생성

    jqGrid_main_modal2();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn2() {
    $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var add_data = value_return(".modal_value2");
    var jdata = $("#mes_modal_grid3").getRowData();
    add_data.check = main_data.check;
    var ids = $("#mes_grid").getGridParam('selarrrow');

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

        var list3 = [];
        var idsdata = {};
        for (var i = 0 ; i < ids.length; i++){
            idsdata = $('#mes_grid').jqGrid('getRowData', ids[i]);
            list3.push(idsdata.supp_code + gu4 + idsdata.part_kind + gu4 + idsdata.part_code);
        }


        callback(function () {
                    var text = msg_object.TBMES_Q002.msg_name1;
                    if (main_data.check === "U") {
                        text = msg_object.TBMES_Q003.msg_name1;
                    }
                     // console.log(list);
                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.melt_sub = list.join(gu5);
                        add_data.melt_sub2 = list3.join(gu5);
                        // console.log(add_data.melt_sub);
                        // console.log(add_data.melt_sub2);
                        ccn_ajax("/qmsMeltSpecAllAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                $('#mes_grid').trigger("reloadGrid");
                                }
                            }
                            $('#mes_modal_grid3').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#addDialog2").dialog('close');
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




function modal_make2() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog2").dialog({
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
                    addUdate_btn2();
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

function jqGrid_main_modal2() {


        $("#mes_modal_grid3").jqGrid({
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
                                        $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);
                                        return false;
                                    }
                                    $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);


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
                                    $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);
                                    return false;
                                }
                                $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);

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
                                        $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);
                                        return false;
                                    }
                                    $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);


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
                                    $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);
                                    return false;
                                }
                                $("#mes_modal_grid3").jqGrid("saveCell", saverow2, savecol2);

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
                                $("#mes_add_grid2").jqGrid("saveCell",saverow2, savecol2);
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
                lastsel2 = id;
                saverow2 = IRow;
                savecol2 = ICol;
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
