var lastsel;
var saverow = 0;

var savecol = 0;

var popReportCheck = 'N';
var delcheck = 0;


////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    selectBox_modal1();
    datepickerInput_modal1();
    modal_make1();

    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "darkred");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    });

    jqGrid_modal1();
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function addUdate_btn() {
    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);

    var jdata = $("#mes_modal1_grid1").getRowData();


    var add_data = value_return(".modal_value");
    add_data.plan_date = add_data.plan_date.replace(/[^0-9]/g,'');
    add_data.part_name1=$("#part_name1").text();
    add_data.part_name2=$("#part_name2").text();
    add_data.part_name3=$("#part_name3").text();
    add_data.part_name4=$("#part_name4").text();
    add_data.part_name5=$("#part_name5").text();
    add_data.part_name6=$("#part_name6").text();
    add_data.part_name7=$("#part_name7").text();
    add_data.part_name8=$("#part_name8").text();
    add_data.part_name9=$("#part_name9").text();
    add_data.part_name10=$("#part_name10").text();

    var list = [];
    var list2 = [];
    var sum = 0;
    if (jdata.length > 0) {

        jdata.forEach(function (data, i) {
            if (
                data.width !== '0' && data.height !== '0'
            ) {
                list.push(data.width + gu4 + data.height + gu4 + data.length + gu4 + data.cycle_qty + gu4 + data.door_sill + gu4 + data.door_sill_spec1 + gu4 + data.door_sill_spec2 + gu4 + data.door_sill_size + gu4 + data.gap);

            } else {
                list2.push(i + 1);
            }
        });

        if (list2.length > 0) {
            alert(list2[0] + "번째를 다시 확인해주세요");
        } else {

            if (effectiveness1(add_data)) {
                var text = msg_object.TBMES_Q002.msg_name1;
                if (main_data.check === "U") {
                    text = msg_object.TBMES_Q003.msg_name1;
                }

                if (confirm(text)) {
                    add_data.keyword = main_data.check;
                    add_data.keyword2 = list.join(gu5);
                    ccn_ajax("/popPlanAdd", add_data).then(function (data) {
                        if (data.result === 'NG') {
                            alert(data.message);
                        } else {
                            // if (main_data.check === "I") {
                            //     get_btn(1);
                            // } else {
                            //     get_btn_post($("#mes_grid").getGridParam('page'));
                            // }
                            $('#mes_grid2').trigger("reloadGrid");

                        }
                        $('#mes_modal1_grid1').jqGrid('clearGridData');
                        closeWindowByMask();
                        $("#addDialog").dialog('close');
                    }).catch(function (err) {
                        closeWindowByMask();
                        alert(msg_object.TBMES_E008.msg_name1);
                    });

                }
            }
        }

    }  else {
        alert("저장 목록을 넣어주세요");
    }

}

function image_change(value) {
    if (value !== ""){
        var reg = /(.*?)\.(jpg|jpeg|png|gif|bmp|PNG)$/;

        if(!value.match(reg)) {
            alert("해당 파일은 이미지 파일이 아닙니다.");
            $("#image_seach_btn").text("찾기");
            $("#image_modal").val("");
        } else {
            $("#image_seach_btn").text("완료");
        }
    }
}

function image_del() {
    $("#image_seach_btn").text("찾기");
    $("#image_modal").val("");
    delcheck = 1;
}

function select_modal_change1(value) {
    if (value !== ""){
        if (main_data.check2 === 'Y') {
            select_makes_base('#prod_code_modal1_select', "/sysProdAllGet","prod_code" ,"prod_name",{keyword:value},'N').then(function (){
                $('#prod_code_modal1_select').val('').trigger("change");
            });
        }
    } else {
        $('#prod_code_modal1_select').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#prod_code_modal1_select').append(option);
        $('#prod_code_modal1_select').select2();

        $("#part_name_code_modal1_select").val("").trigger("change");
        $("#route_code_modal1_select").val("").trigger("change");
        part_name_reset();
        popReportCheck = 'N';
    }
}


function select_modal_change2(value) {
    if (value !== ""){
        if (main_data.check2 === 'Y') {
        var send_data = {};

        send_data.keyword = $("#prod_type_modal1_select").val();
        send_data.keyword2 = value;


        ccn_ajax('/popReportSpecOneGet', send_data).then(function (data) { // user의 하나 출력
            $("#part_name_code_modal1_select").val(data.part_name_code).trigger("change");
            $("#route_code_modal1_select").val(data.route_code).trigger("change");
            $("#bcr_contents").val(data.remark);
            part_name_value_change(data);
            popReportCheck = 'Y';


        }).catch(function () {
            $("#part_name_code_modal1_select").val("").trigger("change");
            $("#route_code_modal1_select").val("").trigger("change");
            part_name_reset();
            popReportCheck = 'N';
        });
        }
    } else {
        $("#part_name_code_modal1_select").val("").trigger("change");
        $("#route_code_modal1_select").val("").trigger("change");
        part_name_reset();
        popReportCheck = 'N';
    }
}



////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function part_name_value_change(data) {
    $("#part_name1").text(data.part_name1);
    if (data.part_name1 === null || data.part_name1 === ""){
        $("select[name=part_code1]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code1]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code1", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code1},'N');

    }
    $("#part_name2").text(data.part_name2);
    if (data.part_name2 === null || data.part_name2 === ""){
        $("select[name=part_code2]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code2]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code2", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code2},'N');
    }
    $("#part_name3").text(data.part_name3);
    if (data.part_name3 === null || data.part_name3 === ""){
        $("select[name=part_code3]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code3]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code3", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code3},'N');
    }
    $("#part_name4").text(data.part_name4);
    if (data.part_name4 === null || data.part_name4 === ""){
        $("select[name=part_code4]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code4]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code4", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code4},'N');
    }
    $("#part_name5").text(data.part_name5);
    if (data.part_name5 === null || data.part_name5 === ""){
        $("select[name=part_code5]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code5]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code5", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code5},'N');
    }
    $("#part_name6").text(data.part_name6);
    if (data.part_name6 === null || data.part_name6 === ""){
        $("select[name=part_code6]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code6]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code6", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code6},'N');
    }
    $("#part_name7").text(data.part_name7);
    if (data.part_name7 === null || data.part_name7 === ""){
        $("select[name=part_code7]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code7]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code7", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code7},'N');
    }
    $("#part_name8").text(data.part_name8);
    if (data.part_name8 === null || data.part_name8 === ""){
        $("select[name=part_code8]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code8]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code8", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code8},'N');
    }
    $("#part_name9").text(data.part_name9);
    if (data.part_name9 === null || data.part_name9 === ""){
        $("select[name=part_code9]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code9]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code9", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code9},'N');
    }
    $("#part_name10").text(data.part_name10);
    if (data.part_name10 === null || data.part_name10 === ""){
        $("select[name=part_code10]").prop("disabled",true).trigger('change');
    }else {
        $("select[name=part_code10]").prop("disabled",false).trigger('change');
        select_makes_base("#part_code10", "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data.part_name_code10},'N');
    }
}


function part_name_value_change_update(data) {


    for (var i = 1 ; i<=10; i++){
        $("#part_name"+i).text(data["part_name"+i]);
        if (data["part_name"+i] === null || data["part_name"+i] === ""){
            $("select[name=part_code"+i+"]").prop("disabled",true).trigger('change');
        }else {
            $("select[name=part_code"+i+"]").prop("disabled",false).trigger('change');
            select_makes_base2("#part_code"+i, "/sysPartNamePartAllGet", "part_code", "spec",{keyword:data["part_name_code"+i],num:i},'N')
                .then(function (data2) {

                    $("#part_code"+data2.num).val(data["part_code"+data2.num]).trigger("change");
                });

        }
    }



}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
}


function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.prod_type === '') {
        alert("제품구분을 선택해주세요");
        return false;
    } else if (modal_objact.prod_code === '') {
        alert("제품명을 선택해주세요");
        return false;
    } else if (modal_objact.part_name_code === '') {
        alert("자재를 선택해주세요");
        return false;
    } else if (modal_objact.route_code === '') {
        alert("라우팅을 선택해주세요");
        return false;
    } else {
        return true;
    }
    //return true;
}


function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        autoOpen: false,
        resizable: true,
        buttons: [
            {
                text: "저장",
                'id': "addUdate_btn",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: "취소",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
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
    });


}

function selectBox_modal1() {
    select_makes_base("#prod_type_modal1_select", "/sysProdTypeAllGet", "prod_type", "prod_type_name",{keyword:''},'N').then(function (data) {
        $('#prod_code_modal1_select').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#prod_code_modal1_select').append(option);
        $('#prod_code_modal1_select').select2();
    });
    select_makes_base("#part_name_code_modal1_select", "/sysPartNameAllGet", "part_name_code", "part_name",{},'N').then(function (data) {});
    select_makes_base("#route_code_modal1_select", "/popRouteGroupAllGet", "route_code", "route_name",{},'N').then(function (data) {});
    $("#prod_type1_modal1_select").select2();

    $("#part_code1").select2();
    $("#part_code2").select2();
    $("#part_code3").select2();
    $("#part_code4").select2();
    $("#part_code5").select2();
    $("#part_code6").select2();
    $("#part_code7").select2();
    $("#part_code8").select2();
    $("#part_code9").select2();
    $("#part_code10").select2();
}



function modal1_rowAdd() {
    var reccount = $("#mes_modal1_grid1").getGridParam("reccount");
    var seq = 1;
    if (reccount >= 15){
        alert("15개 까지 등록 할수 있습니다.");
    } else {
        if (reccount !== 0){
            seq = reccount+1;
        }
        var add_data = {
            seq:seq,
            width:0,
            height:0,
            length:0,
            cycle_qty:0,
            door_sill:'0',
            door_sill_spec1:0,
            door_sill_spec2:0,
            door_sill_size:0,
            gap:0,
        }
        $('#mes_modal1_grid1').jqGrid("resetSelection");
        $("#mes_modal1_grid1").jqGrid("addRowData", seq, add_data, 'last'); // 마지막 행에 Row 추가
        $("#mes_modal1_grid1").closest(".ui-jqgrid-bdiv").scrollTop($("#mes_modal1_grid1").css("height").replace(/px/g, ""));
    }

}


function modal1_rowDel() {
    var reccount = $("#mes_modal1_grid1").getGridParam("reccount");

    $("#mes_modal1_grid1").jqGrid("delRowData", reccount);
    $('#mes_modal1_grid1').jqGrid("resetSelection");



}


function jqGrid_modal1() {
    $("#mes_modal1_grid1").jqGrid({
        mtype: 'POST',
        datatype: "local",
        ajaxSelectOptions: { cache: false, type: 'POST' },
        caption: "생산계획관리 | MES",
        colNames: ['순번','가로','세로','깊이','생산수량','하부씰','턱실규격1','턱식규격2','하부씰크기','갭'],
        colModel: [
            {name: 'seq', index: 'seq',key:true,  sortable: false},
            {name: 'width', index: 'width', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'height', index: 'height', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'length', index: 'length', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'cycle_qty', index: 'cycle_qty', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'door_sill', index: 'door_sill', sortable: false,
                editable: true,                                       // 수정가능 여부
                formatter: 'select',                                 // SELECT 포매터
                edittype: 'select',                                    // EDIT타입 : SELECT
                editoptions: {
                    value: "0:없음;1:턱실;2:일반실",             // EDIT옵션(SELECT, INPUT, CHECKBOX등 옵션 상이함)
                    dataEvents: [{
                        type: 'change',
                        fn: function (e) {                // 값 : this.value || e.target.val()

                            $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                        },
                    },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }
                    ]


                }
            },
            {name: 'door_sill_spec1', index: 'door_sill_spec1', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'door_sill_spec2', index: 'door_sill_spec3', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'door_sill_size', index: 'door_sill_size', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },
            {name: 'gap', index: 'gap', sortable: false, align: 'right',formatter:'integer',
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
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);


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
                                    $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);

                            }
                        }

                    ]
                }
            },

        ],

        autowidth: true,
        height: 310,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            // var data = $('#mes_modal1_grid1').jqGrid('getRowData', rowid);
            //
            // if (isNaN(data.plan_qty)) {
            //     alert("숫자만 입력가능합니다.");
            //     data.plan_qty = data.plan_qty.replace(/[^0-9]/g, '');
            //     $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', data.plan_qty);
            //
            //     if(parseInt(data.plan_qty) <= 0) {
            //         alert("계획량이 0보다 커야합니다.");
            //         $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', '');
            //         $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //         return false;
            //     }else {
            //         $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //     }
            //     return false;
            // }else if(parseInt(data.plan_qty) <= 0) {
            //     alert("계획량이 0보다 커야합니다.");
            //     $('#mes_modal1_grid1').jqGrid('setCell', rowid, 'plan_qty', '');
            //     $("#mes_modal1_grid1").jqGrid("saveCell", saverow, savecol);
            //     return false;
            // }





        },

    });

}