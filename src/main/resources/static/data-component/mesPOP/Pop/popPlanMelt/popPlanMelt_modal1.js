
var lastsel;
var saverow;
var savecol;


////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    jqGrid_main_modal();
    datepickerInput_modal();
    select_box_modal();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var add_data = value_return(".modal_value");

    var jdata = $("#mes_modal1_grid1").getRowData();
    var part_object = {supp_code:"",part_kind:"",part_code:""};
    var part_object2 = {supp_code:"",part_kind:"",part_code:""};
    var partCheck = "Y";
    if (jdata.length > 0) {
        var list = [];
        var list2 = [];
        jdata.forEach(function (data, j) {
            if (data.supp_code !== '' && data.supp_code !== ' ' && data.part_kind !== '' && data.part_kind !== ' ' && data.part_code !== '' && data.part_code !== ' ' && data.plan_qty > 0 && data.work_user_code !== '' && data.work_user_code !== ' ') {
                list.push(data.charge + gu4 +data.supp_code + gu4 + data.part_kind + gu4 + data.part_code +gu4 + data.part_weight + gu4 + data.plan_qty +gu4 + data.weight+ gu4 + data.mat_group+ gu4 + data.work_user_code);

            } else {
                list2.push(j+1);
            }


            part_object =  {supp_code:data.supp_code,part_kind:data.part_kind,part_code:data.part_code};
            for (var i = 1+j ; i < jdata.length; i++){
                part_object2 =  {supp_code:jdata[i].supp_code,part_kind:jdata[i].part_kind,part_code:jdata[i].part_code};
                if (JSON.stringify(part_object) === JSON.stringify(part_object2)) {
                    partCheck = "N";
                }
            }
        });
        callback(function () {
            if(list2.length > 0){
                alert(list2[0] + "번 다시 확인해주세요");
            }else if (partCheck === 'N') {
                alert("같은 제품이 있는지 확인해주세요");
            } else {
                // console.log(list.join(gu5));
                add_data.work_date = add_data.start_date;
                add_data.line_code = add_data.keyword2;
                add_data.keyword = main_data.check;
                add_data.keyword2 = list.join(gu5);


                var text = msg_object.TBMES_Q002.msg_name1;
                if (main_data.check === "U") {
                    text = msg_object.TBMES_Q003.msg_name1;
                }

                if (confirm(text)) {
                    wrapWindowByMask2();
                    ccn_ajax("/popPlanAdd2", add_data).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            if (main_data.check === "I") {
                                get_btn(1);
                            } else {
                                $('#mes_grid').trigger("reloadGrid"); //화면 리로딩
                            }
                            $("#addDialog").dialog('close');
                        }
                        closeWindowByMask();
                    }).catch(function (err) {
                        closeWindowByMask();
                        alert(msg_object.TBMES_E008.msg_name1);
                    });
                }
            }

        });
    } else {
        alert("저장 목록을 넣어주세요");
    }
}
function modal_close(){
    $("#addDialog").dialog("close");
}


function modal1_select_change1(value) {
    if (main_data.check2 === "Y"){
        if (value !== ""){
            select_makes_base("#modal1_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:value},'').then(function (data2) {

            });
            modal1_select_change2();
        }
    }
}

function modal1_select_change2() {
    if (main_data.check2 === "Y"){
        var jdata = $("#mes_modal1_grid1").getRowData();
        for (var i = 0; i <jdata.length; i++){
            $('#mes_modal1_grid1').jqGrid('setCell', jdata[i].seq, 'work_user_name', '선택안함');
            $('#mes_modal1_grid1').jqGrid('setCell', jdata[i].seq, 'work_user_code', ' ');
        }
    }
}

function makeNewRowId(jdata){ //그리드 rowid배열을 파라메터로 받는다
    var max = 0;
    for(var i=0; i<jdata.length; i++){
        if(max <= parseInt(jdata[i].seq)){
            max = parseInt(jdata[i].seq);
        }
    }
    return max + 1;
}

function modal1_rowAdd(rowId) {
    var reccount = $("#mes_modal1_grid1").getGridParam("reccount");
    var seq = 1;
    if (reccount !== 0){
        var jdata = $("#mes_modal1_grid1").getRowData();
        seq = makeNewRowId(jdata);
    }

    var add_data = {
        seq:seq,
        charge:"",
        supp_name:'선택안함',
        supp_code:'',
        part_kind_name:'선택안함',
        part_kind:'',
        part_name:'선택안함',
        part_code:'',
        plan_qty:'0',
        weight:'0',
        part_weight:'0',
        mat_group:'',
        work_user_name:'선택안함',
        work_user_code:'',
    }

    if (rowId !== ""){
        $("#mes_modal1_grid1").jqGrid("addRowData", seq, add_data, 'after',rowId); // 마지막 행에 Row 추가
    }else {
        $("#mes_modal1_grid1").jqGrid("addRowData", seq, add_data, 'last'); // 마지막 행에 Row 추가

    }

}

function modal1_rowDel(rowId) {
    var count =  $("#mes_modal1_grid1").getGridParam("reccount");
    if (count !== 1) {
        $("#mes_modal1_grid1").jqGrid("delRowData",rowId);
    }

    if (count === 1 && main_data.check === "U"){
        if (confirm(msg_object.TBMES_A005.msg_name1)) {
            var sendData = value_return(".modal_value");
            wrapWindowByMask2();
            ccn_ajax("/popPlanDel", {keyword:sendData.start_date,keyword2:sendData.keyword2}).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    $('#mes_grid').trigger('reloadGrid');
                    $("#addDialog").dialog("close");
                }
                closeWindowByMask();
            }).catch(function (err) {
                closeWindowByMask();
                console.error(err); // Error 출력
            });
        }
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
        width: 1100, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [],
        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;

                        if (typeof ui_dialog_interaction!="undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                }
                else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }
    })
}

function jqGrid_main_modal() {
    $("#mes_modal1_grid1").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        ajaxSelectOptions: { cache: false, type: 'POST' },
        colNames : ['seq','CHARGE','업체','supp_code','기종','part_kind','품명','part_code','단중','수량','중량','재질','작업자','work_user_code','삽입/삭제'],// grid 헤더 설정
        colModel : [// grid row 의 설정할 데이터 설정
            {name:'seq',index:'seq',sortable: false,width:110,fixed: true,key:true,hidden:true},
            {name:'charge',index:'charge',sortable: false,width:60,fixed: true, align: 'right',
                editable: true,
                editoptions: {
                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === ' '){
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
                                    var rowid = row.attr('id');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = '';
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(value === ''){
                                        e.target.value = '';
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = '';
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(value === ''){
                                    e.target.value = '';
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]
                }
            },
            {name:'supp_name',index:'supp_name',sortable: false,width:110,fixed: true,editable: true,                                       // 수정가능 여부
                // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"suppAllGet",
                    postData: function (rowid, value, cmName) {
                        var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                        return {keyword:'Y',keyword2:'CORP_TYPE2'}
                    },
                    buildSelect:setSelectCombo1,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                    },
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'supp_code', value);
                            if (value === ''){
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'supp_code', ' ');
                            }
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'supp_name', text);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind_name', '선택안함');
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind', ' ');
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_name', '선택안함');
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', ' ');
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', 0);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', 0);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'supp_code', value);
                                if (value === ''){
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'supp_code', ' ');
                                }
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'supp_name', text);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind_name', '선택안함');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind', ' ');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_name', '선택안함');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', ' ');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', 0);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', 0);

                            }
                        }
                    ]


                }
            },
            {name:'supp_code',index:'supp_code',sortable: false,width:110,fixed: true,hidden:true},
            {name:'part_kind_name',index:'part_kind_name',sortable: false,width:110,fixed: true,editable: true,                                       // 수정가능 여부
                // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"partKindGet",
                    postData: function (rowid, value, cmName) {
                        var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);

                        if (data.supp_code !== '' && data.supp_code !== ' '){
                            return {keyword:'Y',keyword2:data.supp_code}
                        } else {
                            return {keyword:'Y',keyword2:"ISNULL"}
                        }
                    },
                    buildSelect:setSelectCombo2,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                    },
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind', value);
                            if (value === ''){
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind', ' ');
                            }
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind_name', text);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_name', '선택안함');
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', ' ');
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', 0);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', 0);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind', value);
                                if (value === ''){
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind', ' ');
                                }
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_kind_name', text);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_name', '선택안함');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', ' ');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', 0);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', 0);

                            }
                        }
                    ]


                }
            },
            {name:'part_kind',index:'part_kind',sortable: false,width:110,fixed: true,hidden:true},
            {name:'part_name',index:'part_name',sortable: false,width:110,fixed: true,editable: true,                                       // 수정가능 여부
                // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"sysSpartAllGet",
                    postData: function (rowid, value, cmName) {
                        var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);

                        if (data.part_kind !== '' && data.part_kind !== ' '){
                            return {keyword:data.supp_code,keyword2:data.part_kind}
                        } else {
                            return {keyword:data.supp_code,keyword2:"ISNULL"}
                        }
                    },
                    buildSelect:setSelectCombo3,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                    },
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', value);
                            var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                            if (value === ''){
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', ' ');
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', 0);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', 0);
                            } else {
                                var send_data= {};
                                send_data.keyword = rowdata.supp_code;
                                send_data.keyword2 = rowdata.part_kind;
                                send_data.keyword3 = rowdata.part_code;
                                ccn_ajax('/sysSpartOneGet',  send_data).then(function (data) {
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', data.part_weight);
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', data.part_weight*rowdata.plan_qty);
                                });
                            }
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_name', text);



                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', value);
                                var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                if (value === ''){
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_code', ' ');
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', 0);
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', 0);
                                } else {
                                    var send_data= {};
                                    send_data.keyword = rowdata.supp_code;
                                    send_data.keyword2 = rowdata.part_kind;
                                    send_data.keyword3 = rowdata.part_code;
                                    ccn_ajax('/sysSpartOneGet',  send_data).then(function (data) {
                                        $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_weight', data.part_weight);
                                        $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', data.part_weight*rowdata.plan_qty);
                                    });
                                }
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'part_name', text);

                            }
                        }
                    ]


                }
            },
            {name:'part_code',index:'part_code',sortable: false,width:110,fixed: true,hidden:true},
            {name:'part_weight',index:'part_weight',sortable: false,width:110,fixed: true, align: 'right',formatter:'integer'},
            {name:'plan_qty',index:'plan_qty',sortable: false,width:110,fixed: true, align: 'right',formatter:'integer',
                editable: true,
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
                                    var rowid = row.attr('id');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = 0;
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                        $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', rowdata.part_weight*rowdata.plan_qty);
                                        return false;
                                    } else if(value === ''){
                                        e.target.value = 0;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', rowdata.part_weight*rowdata.plan_qty);
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = 0;
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', rowdata.part_weight*rowdata.plan_qty);
                                    return false;
                                } else if(value === ''){
                                    e.target.value = 0;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', rowdata.part_weight*rowdata.plan_qty);

                            }
                        }
                    ]
                }
            },
            {name:'weight',index:'weight',sortable: false,width:110,fixed: true, align: 'right',formatter:'integer'},
            {name:'mat_group',index:'mat_group',sortable: false,width:110,fixed: true,editable: true,
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
                                $("#mes_modal1_grid1").jqGrid("saveCell",saverow, savecol);
                            }
                        }
                    ]
                }
            },
            {name:'work_user_name',index:'work_user_name',sortable: false,width:80,fixed: true,editable: true,                                       // 수정가능 여부
                // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    dataUrl:"popLineUserAllGet",
                    postData: function (rowid, value, cmName) {
                        var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
                        return {keyword:$("#modal1_select2").val()}

                    },
                    buildSelect:setSelectCombo4,
                    dataInit: function ss(elem){

                        $(elem).css('height','18px');
                        $(elem).css('width','100%');

                    },
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            var row = $(e.target).closest('tr.jqgrow');
                            var rowid = row.attr('id');
                            var value = e.target.value;
                            var text = $(e.target).find("option:selected").text();
                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', value);
                            if (value === ''){
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', ' ');
                            }
                            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_name', text);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var rowid = row.attr('id');
                                var value = e.target.value;
                                var text = $(e.target).find("option:selected").text();
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', value);
                                if (value === ''){
                                    $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_code', ' ');
                                }
                                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'work_user_name', text);

                            }
                        }
                    ]


                }
            },
            {name:'work_user_code',index:'work_user_code',sortable: false,width:110,fixed: true,hidden:true},
            {name:'a',index:'a',sortable: false,width:110,fixed: true,formatter:addDel_formatter},
        ],
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        rownumbers: true,
        caption: "생산계획 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 250, // 그리드 세로 길이 설정
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            var rowdata = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
            if (rowdata.plan_qty === ""){
                $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', 0);
            }

            $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'weight', rowdata.part_weight*rowdata.plan_qty);

        },
        loadComplete:function(){// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).jqGrid('sortableRows', { update: function( e, html ){
            // 순서가 바뀌면 발생되는 event

    } });
}
function datepickerInput_modal() {

    datepicker_makes("#datepicker_modal1", 0);
}
function select_box_modal() {
    select_makes_base("#modal1_select1", "/sysLineGroupAllGet","code_value","code_name1",{keyword:'2'},'').then(function (data) {
        select_makes_base("#modal1_select2", "/syslineAllGroupGet","line_code","line_name",{keyword:data[0].code_value},'').then(function (data2) {

        });
    });
}

function addDel_formatter(cellvalue, options, rowObject) {

        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='modal1_rowAdd(\"" + rowObject.seq + "\");'>" +
            "<span><i class='fa fa-plus bigger-110 blue'></i>" +
            "<span> 삽입</span>" +
            "</span>" +
            "</a>"+
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' onclick='modal1_rowDel(\"" + rowObject.seq + "\");'>" +
            "<span><i class='fa fa-trash bigger-110 red'></i>" +
            "<span> 삭제</span>" +
            "</span>" +
            "</a>";

}
function setSelectCombo1(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="work_user_name">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].supp_code + '">' + data[idx].supp_name + '</option>';
    }
    result += '</select>';
    return result;
}

function setSelectCombo2(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="work_user_name">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].part_kind + '">' + data[idx].part_kind + '</option>';
    }
    result += '</select>';
    return result;
}

function setSelectCombo3(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="work_user_name">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].part_code + '">' + data[idx].part_name + '</option>';
    }
    result += '</select>';
    return result;
}

function setSelectCombo4(data) {
    data = jQuery.parseJSON(data);
    var result = '<select name="work_user_name">';
    result += '<option value="">' + '선택안함' + '</option>';
    for(var idx=0; idx < data.length; idx++) {
        result += '<option value="' + data[idx].user_code + '">' + data[idx].user_name + '</option>';
    }
    result += '</select>';
    return result;
}
