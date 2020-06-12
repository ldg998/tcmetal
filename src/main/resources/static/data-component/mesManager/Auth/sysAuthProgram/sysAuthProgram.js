/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    send_data: {},// 조회시 data 담는 용도
    send_data_post: {},// 추가 삭제 시 기존 조회 조건 data를 담는 용도
    readonly: [],// 설정시 해당 name의 readonly 옵션
    auth:{}// 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    authcheck(); // 권한 체크
    msg_get(); // 메세지 설정
    selectBox(); // selectBox select2 설정

    /*----그리드----*/
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid" , $('#mes_grid').closest('[class*="col-"]')); //그리드 resize
    jqGridResize("#mes_grid2" , $('#mes_grid2').closest('[class*="col-"]')); //그리드 resize
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
});


////////////////////////////클릭 함수/////////////////////////////////////
// 조회 버튼
function get_btn() {
    main_data.send_data_post = main_data.send_data; // 수정 삭제시 다시 조회하기 위한 데이터저장
    $("#mes_grid2").setGridParam({ // 그리드 조회
        url: '/sysAuthProgramGet',
        datatype: "json",
        treedatatype : 'json',
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 수정 삭제 시 호출 하는 조회
function get_btn_post() {
    $("#mes_grid2").setGridParam({ // 그리드 조회
        url: '/sysAuthProgramGet',
        treedatatype : 'json',
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

// 권한그룹명 에 맞는 업무 분류 호출을 위한 유효성 검사
function main_select_change(e) {
    if (main_data.send_data.keyword == null || main_data.send_data.keyword == "" ) {
        alert("권한그룹명을 선택해주세요");
    }else {
        main_data.send_data.keyword2 = e.value;
        get_btn();
    }
}

// 권한그룹명에 맞는 업무분류 데이터를 추가
// 우측 그리드 에서 설정한 체크 데이터를 저장한다.
function check_add_btn(object) {
    if (main_data.auth.check_edit !="N") { // 유효성 검사
         if (main_data.send_data.keyword == null) {
             alert("권한그룹명을 선택해주세요");
         } else {
             if (confirm("저장하겠습니까?")) {
                var ids2 = $("#mes_grid2").getRowData();
                var get;
                var add;
                var edit;
                var del;

                $(".itmchk").each(function (i) {
                    get = $(".itmchk").eq(i).attr("checked");
                    add = $(".itmchk2").eq(i).attr("checked");
                    edit = $(".itmchk3").eq(i).attr("checked");
                    del = $(".itmchk4").eq(i).attr("checked");

                    if (typeof get == "undefined") {
                        ids2[i].check_get = "N"
                    }else {
                        ids2[i].check_get = "Y"
                    }

                    if (typeof add == "undefined") {
                        ids2[i].check_add = "N"
                    }else {
                        ids2[i].check_add = "Y"
                    }

                    if (typeof edit == "undefined") {
                        ids2[i].check_edit = "N"
                    }else {
                        ids2[i].check_edit = "Y"
                    }

                    if (typeof del == "undefined") {
                        ids2[i].check_del = "N"
                    }else {
                        ids2[i].check_del = "Y"
                    }
                });

                callback(function () {
                    $.ajax({
                        url: "/sysAuthProgramAdd",
                        data: JSON.stringify(ids2),
                        type: 'POST',
                        async: true,
                        contentType: 'application/json',
                        dataType: "json",
                        success: function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                get_btn_post();
                            }
                        },
                        error: function () {
                            alert("저장실패");
                        }
                    });
                })
            }
        }
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

////////////////////////////호출 함수/////////////////////////////////////
// 메세지 받아오는 함수
function msg_get() {
    msgGet_auth("TBMES_A003");
}
// 권한 체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "sysAuthProgram"}).then(function (data) {
        main_data.auth = data;
    });
}
// selectBox select2 설정
function selectBox() {
    select_makes("#code_group", "/menuAllGet", "menu_code", "menu_name");

}
// jqGrid 설정
function jqGrid_main() {
    // 좌측 그리드 설정
    $("#mes_grid").jqGrid({
        url: "/sysAuthAllGet",
        datatype: "json",
        mtype: 'POST',
        colNames: ['권한그룹코드', '권한그룹명'],
        colModel: [
            {name: 'auth_code', index: 'auth_code', key: true, sortable: false, hidden: true},
            {name: 'auth_name', index: 'auth_name', align: 'center', sortable: false},
        ],
        caption: "권한그룹별 프로그램관리 | MES",
        autowidth: true,
        height: 620,
        jsonReader: {cell: ""},
        viewrecords: true,
        onCellSelect: function (rowid, iRow, iCol, e) {
            main_data.send_data = value_return(".condition_main");
            main_data.send_data.keyword = rowid;
            get_btn();
        },
    });
    // 우측 그리드 설정
    $("#mes_grid2").jqGrid({
        url:"/sysAuthProgramList",
        datatype: "json",
        treedatatype:"local",
        mtype: 'POST',
        colNames: ['권한', '부모', '레벨', '메뉴코드', '메뉴', '조회', '추가', '수정', '삭제'],
        colModel: [
            {name: 'auth_code', index: 'auth_code', sortable: false, hidden: true, width: 380},
            {
                name: 'parent_menu_code',
                index: 'parent_menu_code',
                sortable: false,
                hidden: true,
                width: 380
            },
            {name: 'level', index: 'level', sortable: false, hidden: true, width: 380},
            {name: 'menu_code', index: 'menu_code', key: true, hidden: true, sortable: false, width: 380},
            {name: 'menu_name', index: 'menu_name', formatter: cell, sortable: false, width: 500},
            {
                name: 'check_get',
                index: 'check_get',
                sortable: false,
                align: 'center',
                width: 380,
                formatter: function (cellvalue, options, rowObject) {
                    var result= "<input type='checkbox' class='itmchk' checked>";
                    if (cellvalue == "N") {
                        result = result.replace("checked", "");
                    }
                    return result;
                },
            },
            {
                name: 'check_add',
                index: 'check_add',
                sortable: false,
                align: 'center',
                width: 380,
                formatter: function (cellvalue, options, rowObject) {
                    var result= "<input type='checkbox' class='itmchk2' checked>";
                    if (cellvalue == "N") {
                        result = result.replace("checked", "");
                    }
                    return result;
                }
            },
            {
                name: 'check_edit',
                index: 'check_edit',
                sortable: false,
                align: 'center',
                width: 380,
                formatter: function (cellvalue, options, rowObject) {
                    var result= "<input type='checkbox' class='itmchk3' checked>";
                    if (cellvalue == "N") {
                        result = result.replace("checked", "");
                    }
                    return result;
                }
            },
            {
                name: 'check_del',
                index: 'check_del',
                sortable: false,
                align: 'center',
                width: 380,
                formatter: function (cellvalue, options, rowObject) {
                    var result= "<input type='checkbox' class='itmchk4' checked>";
                    if (cellvalue == "N") {
                        result = result.replace("checked", "");
                    }
                    return result;
                }
            },
        ],
        caption: "권한그룹별 프로그램관리 | MES",
        autowidth: true,
        height: 620,
        jsonReader: {cell: ""},
        treeGridModel: 'adjacency', // Adjacency 모델 방식 트리 구조 이용
        treeGrid: true, // treeGrid 사용
        ExpandColumn: 'menu_name', // 해당 컬럼에 tree 설정
        ExpandColClick: true, //  트리그리드에서 확장된 열의 텍스트를 클릭하면 축소/확대된다.(정확하게 아이콘을 클릭하지 않아도됨)
        tree_root_level: 0, // root 결정
        treeReader: {
            level_field:"level", // 이 필드는 요소의 계층구조의 레벨을 정의한다. 일반적으로 root요소는 0이며, 첫번째 자식은 1이다.
            parent_id_field:"parent_menu_code", // 레코드에 parent_id_field 라는 id를 가진 부모가 있는지 여부를 나타낸다.
            leaf_field:"leaf", // 이 필드는 그리드의 leaf(마지막) 요소인것을 정의한다
            expanded_field:"expanded" // 로딩중에 요소(element)를 확장할지 결정한
        },
        beforeSelectRow: function (rowid, e) {
            // 체크박스 설정 시 하위뎁스 설정 및 최상위 체크시 하위 해제 조회 없앨시 추가수정삭제 권한 해제
            // 체크박스 설정 총 옵션
            var $this = $(this),
                isLeafName = $this.jqGrid("getGridParam", "treeReader").leaf_field,
                localIdName = $this.jqGrid("getGridParam", "localReader").id,
                localData,
                state,
                setChechedStateOfChildrenItems = function (children) {
                    $.each(children, function () {
                        if (state) {
                            $("#" + this[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                        }else {
                            $("#" + this[localIdName] + " input.itmchk").prop("checked", state).removeAttr("checked");
                            $("#" + this[localIdName] + " input.itmchk2").prop("checked", state).removeAttr("checked");
                            $("#" + this[localIdName] + " input.itmchk3").prop("checked", state).removeAttr("checked");
                            $("#" + this[localIdName] + " input.itmchk4").prop("checked", state).removeAttr("checked");
                        }
                        if (!this[isLeafName]) {
                            setChechedStateOfChildrenItems($this.jqGrid("getNodeChildren", this));
                        }
                    });
                };
                setChechedStateOfParentItems = function (parent) {
                    if (state) {
                        $("#" + parent[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems($this.jqGrid("getNodeParent", parent));
                        }
                    }else {
                        setChechedStateOfParentItems_2(parent);
                    }
                };

                setChechedStateOfParentItems_2 = function (parent) {
                    var chileren = $this.jqGrid("getNodeChildren", parent);
                    var check;
                    var index = 0;
                    chileren.forEach(function (t) {
                        check = $("#" + t[localIdName] + " input.itmchk").attr("checked");
                        if (typeof check !== "undefined" ) {
                            index++;
                        }
                    });
                    if (index === 0){
                        $("#" + parent[localIdName] + " input.itmchk").prop("checked", state).removeAttr("checked");
                        $("#" + parent[localIdName] + " input.itmchk2").prop("checked", state).removeAttr("checked");
                        $("#" + parent[localIdName] + " input.itmchk3").prop("checked", state).removeAttr("checked");
                        $("#" + parent[localIdName] + " input.itmchk4").prop("checked", state).removeAttr("checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems_2($this.jqGrid("getNodeParent", parent));
                        }
                    }
                };

                if (e.target.nodeName === "INPUT" && $(e.target).hasClass("itmchk")) {
                    state = $(e.target).prop("checked");
                    localData = $this.jqGrid("getLocalRow", rowid);
                    if (!state) {
                        $(e.target).prop("checked", state).removeAttr("checked");
                        $(e.target).parent().parent().find(".itmchk2").prop("checked", state).removeAttr("checked");
                        $(e.target).parent().parent().find(".itmchk3").prop("checked", state).removeAttr("checked");
                        $(e.target).parent().parent().find(".itmchk4").prop("checked", state).removeAttr("checked");
                    }else {
                        $(e.target).prop("checked", state).attr("checked","checked");
                    }
                    setChechedStateOfChildrenItems($this.jqGrid("getNodeChildren", localData), state);
                    if (localData.level !== 1 ) {
                        setChechedStateOfParentItems($this.jqGrid("getNodeParent", localData), state);
                    }
                }

                setChechedStateOfChildrenItems2 = function (children) {
                    $.each(children, function () {
                        if (state) {
                            $("#" + this[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                            $("#" + this[localIdName] + " input.itmchk2").prop("checked", state).attr("checked","checked");
                        }else {
                            $("#" + this[localIdName] + " input.itmchk2").prop("checked", state).removeAttr("checked");
                        }
                        if (!this[isLeafName]) {
                            setChechedStateOfChildrenItems2($this.jqGrid("getNodeChildren", this));
                        }
                    });
                };

                setChechedStateOfParentItems2 = function (parent) {
                    if (state) {
                        $("#" + parent[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                        $("#" + parent[localIdName] + " input.itmchk2").prop("checked", state).attr("checked","checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems2($this.jqGrid("getNodeParent", parent));
                        }
                    }else {
                        setChechedStateOfParentItems2_2(parent);
                    }
                };

                setChechedStateOfParentItems2_2 = function (parent) {
                    var chileren = $this.jqGrid("getNodeChildren", parent);
                    var check;
                    var index = 0;
                    chileren.forEach(function (t) {
                        check = $("#" + t[localIdName] + " input.itmchk2").attr("checked");
                        if (typeof check !== "undefined" ) {
                            index++;
                        }
                    });
                    if (index === 0){
                        $("#" + parent[localIdName] + " input.itmchk2").prop("checked", state).removeAttr("checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems2_2($this.jqGrid("getNodeParent", parent));
                        }
                    }
                };

                if (e.target.nodeName === "INPUT" && $(e.target).hasClass("itmchk2")) {
                    state = $(e.target).prop("checked");
                    localData = $this.jqGrid("getLocalRow", rowid);
                    if (state) {
                        $(e.target).prop("checked", state).attr("checked","checked");
                        $(e.target).parent().parent().find(".itmchk").prop("checked", state).attr("checked","checked");
                    }else {
                        $(e.target).prop("checked", state).removeAttr("checked");
                    }
                    setChechedStateOfChildrenItems2($this.jqGrid("getNodeChildren", localData), state);
                    if (localData.level !== 1 ) {
                        setChechedStateOfParentItems2($this.jqGrid("getNodeParent", localData), state);
                    }
                }

                setChechedStateOfChildrenItems3 = function (children) {
                    $.each(children, function () {
                        if (state) {
                            $("#" + this[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                            $("#" + this[localIdName] + " input.itmchk3").prop("checked", state).attr("checked","checked");
                        }else {
                            $("#" + this[localIdName] + " input.itmchk3").prop("checked", state).removeAttr("checked");
                        }
                        if (!this[isLeafName]) {
                            setChechedStateOfChildrenItems3($this.jqGrid("getNodeChildren", this));
                        }
                    });
                };

                setChechedStateOfParentItems3 = function (parent) {
                    if (state) {
                            $("#" + parent[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                            $("#" + parent[localIdName] + " input.itmchk3").prop("checked", state).attr("checked","checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems3($this.jqGrid("getNodeParent", parent));
                        }
                    }else {
                        setChechedStateOfParentItems3_2(parent);
                    }
                };
                setChechedStateOfParentItems3_2 = function (parent) {
                    var chileren = $this.jqGrid("getNodeChildren", parent);
                    var check;
                    var index = 0;
                    chileren.forEach(function (t) {
                        check = $("#" + t[localIdName] + " input.itmchk3").attr("checked");
                        if (typeof check !== "undefined" ) {
                            index++;
                        }
                    });
                    if (index === 0){
                        $("#" + parent[localIdName] + " input.itmchk3").prop("checked", state).removeAttr("checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems3_2($this.jqGrid("getNodeParent", parent));
                        }
                    }
                };

                if (e.target.nodeName === "INPUT" && $(e.target).hasClass("itmchk3")) {
                    state = $(e.target).prop("checked");
                    localData = $this.jqGrid("getLocalRow", rowid);
                    if (state) {
                        $(e.target).prop("checked", state).attr("checked","checked");
                        $(e.target).parent().parent().find(".itmchk").prop("checked", state).attr("checked","checked");
                    }else {
                        $(e.target).prop("checked", state).removeAttr("checked");
                    }
                    setChechedStateOfChildrenItems3($this.jqGrid("getNodeChildren", localData), state);
                    if (localData.level !== 1 ) {
                        setChechedStateOfParentItems3($this.jqGrid("getNodeParent", localData), state);
                    }
                }

                setChechedStateOfChildrenItems4 = function (children) {
                    $.each(children, function () {
                        if (state) {
                            $("#" + this[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                            $("#" + this[localIdName] + " input.itmchk4").prop("checked", state).attr("checked","checked");
                        }else {
                            $("#" + this[localIdName] + " input.itmchk4").prop("checked", state).removeAttr("checked");
                        }
                        if (!this[isLeafName]) {
                            setChechedStateOfChildrenItems4($this.jqGrid("getNodeChildren", this));
                        }
                    });
                };

                setChechedStateOfParentItems4 = function (parent) {
                    if (state) {
                        $("#" + parent[localIdName] + " input.itmchk").prop("checked", state).attr("checked","checked");
                        $("#" + parent[localIdName] + " input.itmchk4").prop("checked", state).attr("checked","checked");
                        if (parent.level !== 1) {
                            setChechedStateOfParentItems4($this.jqGrid("getNodeParent", parent));
                        }

                    }else {
                        setChechedStateOfParentItems4_2(parent);
                    }
                };

                setChechedStateOfParentItems4_2 = function (parent) {
                        var chileren = $this.jqGrid("getNodeChildren", parent);
                        var check;
                        var index = 0;
                         chileren.forEach(function (t) {
                            check = $("#" + t[localIdName] + " input.itmchk4").attr("checked");
                            if (typeof check !== "undefined" ) {
                                index++;
                            }
                        });
                        if (index === 0){
                            $("#" + parent[localIdName] + " input.itmchk4").prop("checked", state).removeAttr("checked");
                            if (parent.level !== 1) {
                                setChechedStateOfParentItems4_2($this.jqGrid("getNodeParent", parent));
                            }
                        }
                };

                if (e.target.nodeName === "INPUT" && $(e.target).hasClass("itmchk4")) {
                    state = $(e.target).prop("checked");
                    localData = $this.jqGrid("getLocalRow", rowid);
                    if (state) {
                        $(e.target).prop("checked", state).attr("checked","checked");
                        $(e.target).parent().parent().find(".itmchk").prop("checked", state).attr("checked","checked");
                    }else {
                        $(e.target).prop("checked", state).removeAttr("checked");
                    }
                    setChechedStateOfChildrenItems4($this.jqGrid("getNodeChildren", localData), state);
                    if (localData.level !== 1 ) {
                        setChechedStateOfParentItems4($this.jqGrid("getNodeParent", localData), state);
                    }
                }
            },
        loadComplete: function(data){
            var ids = $("#mes_grid2").getDataIDs();
            var rowData;
            $.each(
                ids,function(idx,rowId){
                    rowData=$("#mes_grid2").getRowData(rowId);
                    if(rowData.level === '1'){
                        $("#mes_grid2").setRowData(rowId,false,{background: 'rgb(178, 197, 251)'});
                    }
                    else if(rowData.level === '2'){
                        $("#mes_grid2").setRowData(rowId,false,{background: 'rgb(227, 228, 228)'});
                    }
                }
            );
        },
    });
}

// depth 에 따른 여백을 통해 tree구조처럼 보이게 명확한 설정
function cell(cellvalue, options, rowObject) {
    if (rowObject.level === 1) {
        return '<img src="/ui-component/assets/images/icon/folder.png" style="max-width: 17px;" />' + cellvalue;
    } else if (rowObject.level === 2) {
        return '	<img src="/ui-component/assets/images/icon/folder.png" style="max-width: 17px;" />' + cellvalue;
    } else if (rowObject.level === 3) {
        return '		<img src="/ui-component/assets/images/icon/File.png" style="max-width: 17px;" />' + cellvalue;
    }
}
