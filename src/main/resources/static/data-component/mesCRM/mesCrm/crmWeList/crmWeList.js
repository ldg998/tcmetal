/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var save_rowid;

var main_data = {
    check: 'I',
    supp_check: 'A',
    send_data: {},
    readonly:[],
    auth:{},
    change: 'Y',
    check2:'Y',

};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    jqGridResize("#mes_grid2", $('#mes_grid2').closest('[class*="col-"]'));
    datepickerInput();
    datepickerInput_modal1();
    modal_start1();
    enterKey();
    authcheck();
    jqgridPagerIcons();
     get_btn(1);


});

////////////////////////////클릭 함수/////////////////////////////////////

function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/\-/g, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/\-/g, '');

    $("#mes_grid").setGridParam({
        url: "/crmWeList",
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

    $("#mes_grid2").jqGrid('clearGridData');// 그리드 삭제 및 업데이트
}



function add_btn() {
    if(main_data.auth.check_add != "N") {
        main_data.check = 'I'; // 저장인지 체크

        $('#mes_modal1_grid1').jqGrid('clearGridData');
        modal_reset('.modal_value',[]);

        datepicker_makes('#datepicker3',0);
        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
} // end add_btn

function crmWeListOneGet_btn(page,rowid){

    $("#mes_grid2").setGridParam({
        url: "/crmWeOneGet",
        datatype: "json",
        page: page,
        postData: {we_no:rowid}
    }).trigger("reloadGrid");

}


function pdfMake_btn2() {
    var ids = $("#mes_grid").getGridParam('selarrrow').slice(); //선택한 그리드로우

    if (ids.length === 0) {  // 선택여부
        alert("데이터를 선택해주세요");
        return false;
    } else if (ids.length > 1) { //초과선택여부
        alert("하나의 데이터를 선택해주세요");
        return false;
    } else {

        ccn_ajax('/crmWeListOneGet', {we_no:ids[0]}).then(function (data) {

            var list2 =[];
            var pdfBody=[];

            data.forEach(function (jdata,i) {
                pdfBody.push(
                 [ {text: jdata.seq, italics: true, },
                    {text: jdata.part_name, italics: true},
                    {text: jdata.spec, italics: true},
                    {text: jdata.qty, italics: true},
                    {text: jdata.unit_name, italics: true},
                    {text: integer(jdata.price), italics: true, style: 'right'},
                    {text: integer(jdata.amount), italics: true, style: 'right'},
                    {text: jdata.remark2, italics: true}]
                );

            })

           for(var i = pdfBody.length; i < 14;i++){
               pdfBody.push(
                   [ {text:  i+1, italics: true, },
                       {text: '', italics: true},
                       {text: '', italics: true},
                       {text: '', italics: true},
                       {text: '', italics: true},
                       {text: '', italics: true, style: 'right'},
                       {text: '', italics: true, style: 'right'},
                       {text: '', italics: true}]
               );
           }




        pdfMake.fonts = {
            hangul: {
                normal: "malgun.ttf",
                bold: "malgunbd.ttf",
                italics: "malgun.ttf",
                bolditalics: "malgun.ttf"
            }
        };
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = "/ui-component/assets/images/main/pdf.PNG"//

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);

            var dataURL = canvas.toDataURL("image/png");


            var topList = {
                content: [
                    {text: '견  적  서', style: 'head'},
                    { // 해더
                        margin: [0, 5],
                        alignment: 'justify',
                        columns: [
                            [
                                {
                                    style: 'title',
                                    table: {widths: [38, '*', 0, 0], body: [[{text: '견적일'}, {text:formmatterDate3(data[0].work_date) }]]}
                                },
                                {
                                    style: 'title',
                                    table: {widths: [38, '*', 30, 0, 0], body: [['수 신 :',data[0].supp_name, '귀 중']]}
                                },
                                {style: 'nomal', table: {widths: ['*', 0, 0], body: [['거래에 감사드리오며 아래와 같이 견적합니다.']]}},
                                {style: 'title', table: {widths: [38, '*', 0, 0], body: [['참 조:',data[0].reference +'님 귀하 ']]}},
                                {
                                    style: 'title',
                                    table: {
                                        widths: [38, '*', 28, '*', 0, 0],
                                        body: [['TEL:', {text: data[0].tel, style: '8'}, 'FAX:', {text:data[0].fax, style: '8'}]]
                                    }
                                },
                                {text: '※ 방음문. 방음시창. 특수문. 전문제작 및 시공\n ※ 방화방음문 시험성적서 보유', style: 'red'},
                            ],
                            {
                                style: 'title', table: {
                                    heights: ['*'],
                                    widths: ['*'],
                                    body: [[{
                                        image: dataURL,
                                        width: 260,
                                        height: 140,
                                        padding: [0.5, 0.5, 0.5, 0.5]
                                    }]]

                                }
                            }


                            // {image: 'sampleImage.jpg', margin:[0,1,0,1], width: 220, height: 125}

                        ],//end 컬럼
                    },    //end 해더
                    {
                        style: 'title',

                        table: {
                            widths: [45, 180, 35, '*'],
                            body: [[{text: '공 사 명: ', border: [false, false, false, false]},
                                {text: data[0].work_name, border: [false, false, false, false],alignment: 'left'},
                                {text: '작성: ', border: [false, false, false, false], alignment: 'right'},
                                {text: '박경자실장(010-4274-6578)', border: [false, false, false, false], alignment: 'left'}]
                            ]

                        }
                    },

                    // style 부분에 정의된 style_test 적용해보기 및 한글 꺠짐 테스트


                    {
                        style: 'table_style',
                        table: {
                            widths: [20, 120, 70, 20, 20, 50, 60, '*'],
                            body: [
                                [{text: '번호'},
                                    {text: '품명'},
                                    {text: '규격'},
                                    {text: '수량'},
                                    {text: '단위'},
                                    {text: '단가'},
                                    {text: '금액'},
                                    {text: '비고'}
                                ]

                            ],//end body

                        }, layout: {
                            fillColor: function (rowIndex, node, columnIndex) {
                                return (rowIndex % 1 === 0) ? '#FFD400' : null;
                            }
                        },
                    }, //테이블 그리기
                    {
                        style: 'table_style',
                        table: {
                            widths: [20, 120, 70, 20, 20, 50, 60, '*'],
                            heights: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                            body: pdfBody
                        }
                    },//테이블 그리기

                    {
                        style: 'table_style',
                        table: {
                            widths: [20, 120, 70, 20, 20, 50, 60, '*'],
                            style: 'title',
                            body: [['', '소 계', '', '', '', '', {text: integer(data[0].subtotal_amount), style: 'right'}, '']]
                        },
                    },

                    {
                        style: 'table_style',
                        table: {
                            widths: [20, 120, 70, 20, 20, 50, 60, '*'],
                            style: 'title', body: [['', 'VAT', '', '', '', '', {text: integer(data[0].vat_amount), style: 'right'}, '']]
                        },

                    },

                    {
                        style: 'table_style',
                        table: {
                            widths: [20, 120, 70, 20, 20, 50, 60, '*'],
                            style: 'title',
                            body: [['', '합 계', '', '', '', '', {text: integer(data[0].total_amount), style: 'right'}, '']]
                        }
                    },


                    { margin: [2,10,2,0],

                        text: data[0].remark, style: 'foot'}


                        ],//end 몸통
//하단의 현재페이지 / 페이지 수 넣기
                footer: function (currentPage, pageCount) {
                    return {
                        margin: 10,
                        columns: [{
                            fontSize: 9,
                            text: [
                                {
                                    text: '' + currentPage.toString() + ' of ' +
                                        pageCount,
                                }
                            ],
                            alignment: 'center'
                        }]
                    };
                },
//필요한 스타일 정의하기
                styles: {
                    head: {
                        fontSize: 20,
                        bold: true,
                        alignment: 'center',
                        font: 'hangul',
                        decoration: 'underline',
                        lineHeight: 1.5
                    },
                    table_style: {
                        fontSize: 9,
                        alignment: 'center',
                        font: 'hangul',
                    },
                    foot: {
                        bold: true,
                        fontSize: 10,
                        font: 'hangul'

                    },
                    red: {
                        color: 'red', fontSize: 9.5
                    },
                    right: {alignment: 'right'},
                    title: {bold: true, fontSize: 11, alignment: 'center'},
                    8: {fontSize: 8, bold: true}
                    , nomal: {fontSize: 10}
                },

// 페이지 크기 용지의 크기 사이즈 넣기 또는 특정 사이즈 넣기 { width: number, height: number }
                pageSize: 'A4',
                /* 페이지 방향 portrait : 가로 , landscape : 세로 */
                pageOrientation: 'portrait',
                defaultStyle: {
                    font: 'hangul'
                }
            };
            var pdf_name = 'test.pdf'; // pdf 만들 파일의 이름
            pdfMake.createPdf(topList).open();
        }
        }); // end ajax
    }//end else
}// end pdf

function update_btn(rowid) {
    if(main_data.auth.check_add != "N") {
    main_data.check = 'U';
    ccn_ajax("/crmWeListOneGet", {we_no: rowid}).then(function (data) {

        var dataValue = {
            we_no: rowid,
            work_date: formmatterDate2(data[0].work_date),
            supp_name: data[0].supp_name,
            reference: data[0].reference,
            tel: data[0].tel,
            fax: data[0].fax,
            work_name: data[0].work_name,
            remark: data[0].remark
        };
        modal_edits('.modal_value', [], dataValue);

        $("#mes_modal1_grid1").setGridParam({
            url: "/crmWeListOneGet",
            datatype: "json",
            postData: {we_no: rowid}
        }).trigger("reloadGrid");

        $("#addDialog").dialog('open');
        jqGridResize2("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));

    });

    }
}

function delete_btn() {
    if(main_data.auth.check_add != "N") {
        if (confirm("선택하신 데이터를 삭제하시겠습니까?")) {
            var ids = $("#mes_grid").getGridParam('selarrrow').slice(); //선택한 그리드로우
            var gu5 = String.fromCharCode(5); //아스키코드 char5 담아추기
            wrapWindowByMask2();

            ccn_ajax("/crmWeDelete", {we_no: ids.join(gu5)}).then(function (data) {

                $("#mes_grid").jqGrid('clearGridData');// 그리드 삭제 및 업데이트
                $("#mes_grid2").jqGrid('clearGridData');// 그리드 삭제 및 업데이트
                closeWindowByMask(); //마스크 해제
            });
        }
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

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}


function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlan"}).then(function (data) {
        main_data.auth = data;
    });
}


function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        multiselect: true,
        colNames: ['견적일','견적서번호','수신','참조','TEL','FAX','공사명','소계','VAT','합계'],
        colModel: [
            {name: 'work_date', index: 'work_date', sortable: false, width: 150,fixed: true,formatter:formmatterDate2},
            {name: 'we_no',  key:true,index: 'we_no', sortable: false, width: 150,fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150,fixed: true},
            {name: 'reference', index: 'reference', sortable: false, width: 150,fixed: true},
            {name: 'tel', index: 'tel', sortable: false, width: 150,fixed: true},
            {name: 'fax', index: 'fax', sortable: false, width: 150,fixed: true},
            {name: 'work_name', index: 'work_name', sortable: false, width: 150,fixed: true},
            {name: 'subtotal_amount', index: 'subtotal_amount', sortable: false, width: 150,fixed: true,formatter: 'integer',align: 'right'},
            {name: 'vat_amount', index: 'vat_amount', sortable: false, width: 150,fixed: true,formatter: 'integer',align: 'right'},
            {name: 'total_amount', index: 'total_amount', sortable: false, width: 150,fixed: true,formatter: 'integer',align: 'right'},


        ],
        caption: "견적서관리 | MES",
        autowidth: true,
        height: 243,
        pager: '#mes_grid_pager',
        rowList: [100, 200, 300, 500, 1000],
        rowNum: 100,
        viewrecords: true,
        onCellSelect: function (rowid, icol, cellcontent, e) {
            crmWeListOneGet_btn(1,rowid);
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid); //선택한 로우 에 data를 넣고
            if (data.status === '1') { //상태 구분
                main_data.check2 = 'N';
            } else {
                main_data.check2 = 'Y';
            }
            update_btn(rowid); //업데이트 버튼 실행
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
            $("table#SuppSearchGrid tr.jqgfirstrow").css("height","1px");
        },
        beforeSelectRow: function (rowid, e) {   // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            $myGrid.setRowData(save_rowid, false, {background: "#FFFFFF"});
            save_rowid = rowid;
            $myGrid.setRowData(rowid, false, {background: "rgb(190, 220, 260)"});
            return (cm[i].name === 'cb');
        }

    });

    $('#mes_grid2').jqGrid({
        mtype: 'POST',
        datatype: "local",
        caption: "견적서관리 | MES",
        colNames: ['seq','품명','규격','수량','단위','단가','비고'],
        colModel: [
            {name: 'seq', index: 'seq',hidden:true,key:true, width: 185, sortable: false,fixed:true},
            {name: 'part_name', index: 'part_name', width: 185, sortable: false,fixed:true},
            {name: 'spec', index: 'spec', width: 150, sortable: false,fixed:true},
            {name: 'qty', index: 'qty', width: 150, sortable: false,fixed:true,formatter: 'integer'},
            {name: 'unit_name', index: 'unit_name', width: 160, sortable: false,fixed:true},
            {name: 'price', index: 'price', width: 160, sortable: false,fixed:true,formatter: 'integer'},
            {name: 'remark2', index: 'remark2', width: 160, sortable: false,fixed:true}

        ],
        autowidth: true,
        viewrecords: true,
        height: 194,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: '#mes_grid2_pager',

        loadComplete:function(){
            if ($("#mes_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_grid2 tr.jqgfirstrow").css("height", "1px");
            else
                $("table#mes_grid2 tr.jqgfirstrow").css("height", "0px");
        }

    });
}



function integer(String) { //스트링 숫자를 integer 처럼 바꿔줌 하지만 String 임
    return String.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 엔터키를 통한 저장버튼 활성화
function enterKey() {
    $(document).on("keypress",'.enterKey',function (e) {
        if (e.which == 13){
            get_btn(1);
        }
    });

}
