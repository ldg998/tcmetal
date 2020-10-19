/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',// 수정,추가 판단용
    check2: 'Y',
    send_data: {},// 조회시 data 담는 용도
    readonly: [],// 설정시 해당 name의 readonly 옵션
    auth: {}     // 권한 체크 후 권한 data 담는 용도
};

////////////////////////////시작 함수/////////////////////////////////////
// $(function(){}); DOM이 로드되었을때 실행  / ONLOAD처럼 페이지 완료가 되자마자 동작하는 함수
$(document).ready(function () {
    msg_get();      // 메세지 설정
    jqGrid_main(); // main 그리드 생성
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]')); //그리드 리 사이즈
    /*----모달----*/
    modal_start1(); // 모달1 시작 함수
    authcheck();    // 권한 체크
    selectBox();
    jqgridPagerIcons(); // 그리드 아이콘 설정 맨 하단으로
    datepickerInput();
    //  get_btn(1);// 페이지 load 동시에 그리드 조회

});


////////////////////////////클릭 함수/////////////////////////////////////
//모달 확인 조회 btn
function test() {

    // $("#addDialog").dialog('open'); // 모달 열기
    // jqGridResize("#mes_modal_grid" , $('#mes_modal_grid').closest('[class*="col-"]'));
}

// 조회 버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    $("#mes_grid").setGridParam({ // 그리드 조회
        // URL -> RESTCONTROLLER 호출
        url: '/wmsInvoiceGet',
        // JSON 데이터 형식으로
        datatype: "json",
        // PAGE는 받은 파라미터로 설정
        page: page,
        // 매개변수 전달
        postData: main_data.send_data
        // trigger 그리드 reload 실행 / 해당이벤트를 강제발생시키는 개념
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add != "N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거
        main_data.check = 'I'; // 저장인지 체크
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1); // 경고메세지 출력
    }
}

// 그리드 내용 더블 클릭 시 실행
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit != "N") {
        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

        main_data.check = jqgrid_data.iu_check;
        $("input[name=req_no]").val(jqgrid_data.req_no);

        if (jqgrid_data.iu_check === 'I') {
            $("#modal_select1").val(jqgrid_data.supp_code).trigger("change");
            $("#addDialog").dialog('open');
        } else {
            main_data.check2 = 'N'
            $("#modal_select1").val(jqgrid_data.supp_code).trigger("change");
            ccn_ajax('/wmsInvoiceOneGet', {keyword2: jqgrid_data.req_no}).then(function (data) { // user의 하나 출력
                modal_edits('.modal_value', [], data); // response 값 출력
                select_makes_base("#modal_select2", "/invoiceRptNameGet", "rpt_name", "rpt_name", {keyword: data.supp_code}, "N").then(function (data2) {
                    $("#modal_select2").val(data.rpt_name).trigger("change");
                    select_makes_base("#modal_select3", "/invoiceTransGet", "trans_code", "trans_name", {
                        keyword: data.supp_code,
                        keyword2: data.rpt_name
                    }, "N").then(function (data3) {
                        $("#modal_select3").val(data.trans_code).trigger("change");
                        main_data.check2 = 'Y';
                        $("#addDialog").dialog('open');
                    });
                });
            });
        }


        // main_data.check = 'U'; // 수정인지 체크
        // ccn_ajax('/sysPartNameOneGet', {keyword: jqgrid_data.part_name_code}).then(function (data) { // user의 하나 출력
        //     modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
        //     $("#addDialog").dialog('open'); //모달창열기
        // });
    } else {
        alert(msg_object.TBMES_A003.msg_name1); //경고메세지 출력
    }
}

var agent = navigator.userAgent.toLowerCase();

function invoice_btn() {

    var ids = $("#mes_grid").getGridParam('selrow');
    // console.log(ids)
    if (ids === null) {
        alert("데이터를 선택해주세요.");
    } else {
        var mes_data = $('#mes_grid').jqGrid('getRowData', ids);
        if (mes_data.rpt_name === "" && mes_data.user_name === ""){
            alert("인보이스를 먼저 작성 해주세요.");
        } else {
            ccn_ajax("/crmInvoicePackingGet",{keyword:mes_data.req_no}).then(function (data) {
                // console.log(data);
                pdfMake.fonts = {
                    hangul: {
                        normal: "malgun.ttf",
                        bold: "malgunbd.ttf",
                        italics: "malgun.ttf",
                        bolditalics: "malgun.ttf"
                    }
                };
                var img = new Image();
                img.setAttribute('crossOrigin', 'anonymous'); //디렉토리 이미지를 뛰워주기위함
                img.src = data.ci.signed_file// 디렉토리 이미지를 뛰워주기위함

                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = this.width;
                    canvas.height = this.height;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0);

                    var dataURL = canvas.toDataURL("image/png");





                    var margin = [23, 0, 0, 0]

              var body1 =  {
                        alignment: 'justify',
                            columns: [
                        [
                            {
                                style: 'nomal',
                                table: {
                                    widths: ['109.5%'], heights: [100], body: [
                                        [
                                            {
                                                text: 'Seller  \n '+data.ci.notice1,
                                                border: [true, true, false, false]
                                            },

                                        ]
                                    ]
                                }
                            },
                            {
                                style: 'nomal',
                                table: {
                                    widths: ['109.5%'], heights: [100], body: [
                                        [
                                            {
                                                text: 'Consignee  \n '+data.ci.notice2,
                                                border: [true, true, false, false]
                                            },

                                        ]
                                    ]
                                }
                            },
                            {
                                style: 'nomal',
                                table: {
                                    widths: ['109.5%'], heights: [50], body: [
                                        [
                                            {
                                                text: 'Departure  Date  : \n ' + data.ci.item4,
                                                border: [true, true, false, false]
                                            },

                                        ]
                                    ]
                                }
                            },
                            {
                                style: 'nomal',
                                table: {
                                    widths: ['109.5%'], heights: [16], body: [
                                        [
                                            {
                                                text: 'Vessel/VOY.: '+data.ci.notice4,
                                                border: [true, true, false, false]
                                            },

                                        ]

                                    ]
                                }
                            },
                            {
                                style: 'nomal',
                                table: {
                                    widths: ['109.5%'], heights: [12], body: [
                                        [
                                            {
                                                text: 'From              BUSAN, KOREA',
                                                border: [true, false, false, false]
                                            },

                                        ]

                                    ]
                                }
                            },
                            {
                                style: 'nomal',
                                table: {
                                    widths: ['109.5%'], heights: [12], body: [
                                        [
                                            {
                                                text: 'TO                       YOKOHAMA  , JAPAN',
                                                border: [true, true, false, true]
                                            },

                                        ]

                                    ]
                                }
                            },



                        ], //1번컬럼 종료

                        [// 2번컬럼
                            {
                                style: 'nomal',
                                margin: margin,
                                table: {
                                    widths: ['*'], heights: [50], body: [
                                        [
                                            {
                                                text: 'No. & Date  of  Invoice\n '+ data.ci.item1,
                                                border: [true, true, true, false]
                                            },

                                        ]
                                    ]
                                }
                            },
                            {  // 2번컬럼
                                style: 'nomal',
                                margin: margin,
                                table: {

                                    widths: ['*'], heights: [30], body: [
                                        [
                                            {text: 'No. & Date of  L/C\n' + data.ci.item2, border: [true, true, true, false]},

                                        ]
                                    ]
                                }
                            },
                            {  // 2번컬럼
                                style: 'nomal',
                                margin: margin,
                                table: {

                                    widths: ['*'], heights: [30], body: [
                                        [
                                            {text: 'L/C  Issuing  Bank\n' + data.ci.item3, border: [true, true, true, false]},

                                        ]
                                    ]
                                }
                            },
                            {  // 2번컬럼
                                style: 'nomal',
                                margin: margin,
                                table: {

                                    widths: ['*'], heights: [134], body: [
                                        [
                                            {
                                                text: 'Buyer NOTIFY \n ' +data.ci.notice3,
                                                border: [true, true, true, false]
                                            },

                                        ]
                                    ]
                                }
                            },
                            {  // 2번컬럼
                                style: 'nomal',
                                margin: margin,
                                table: {

                                    widths: ['*'], heights: [52], body: [
                                        [
                                            {
                                                text: 'Terms of Delivery and Payment\n'+data.ci.notice5,
                                                border: [true, true, true, true]
                                            },

                                        ]
                                    ]
                                }
                            }

                        ]
                    ]
                    } //2번째 몸통






                    var body2 = {
                        style: 'nomal',
                            table: {
                        widths: [15, 45, 60, 150, 50, 60,10, 10, 60,10],
                            body: [
                            border_all_false([{text: ''}, {text: ''}, {text: ''}, {text: 'Description of Goods'}, {text: ''}, {text: 'Unit price'}, {text: ''}, {text: ''}, {text: 'Amount'}, {text: ''}]),
                            border_all_false([{text: 'No'}, {text: 'P/O No'}, {text: 'D/#'}, {text: ''}, {text: 'Quantity'}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''}]),
                            border_all_false([{text: ''}, {text: ''}, {text: ''}, {text: 'Parts for Machine Tools'}, {text: ''}, {text: "("+data.cis[0].currency_name+")"}, {text: ''}, {text: ''}, {text: "("+data.cis[0].currency_name+")"}, {text: ''}])
                        ],//end body
                    }
                    } //테이블 그리기 테이블표 해더




                    var body3List = [];
                    var qty_sum = 0;
                    var unit_cost_sum = 0;
                    var price_amount_sum = 0;
                    body3List.push(border_all_false([{text: '0'}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''}, {text: ''}]))
                    data.cis.forEach(function (cis) {
                        body3List.push( border_all_false([{text: cis.seq}, {text: cis.po_no}, {text: cis.part_code}, {text: cis.part_kind +" "+cis.part_name}, {text: cis.qty +" "+ (cis.qty > 1 ? 'PCS' : "PC")}, {alignment: 'right',text: (cis.unit_cost+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}, {text: cis.currency_name}, {text: ''}, {alignment: 'right',text: (cis.price_amount+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",") }, {text: cis.currency_name}]))
                        qty_sum = qty_sum + cis.qty;
                        unit_cost_sum = unit_cost_sum + cis.unit_cost;
                        price_amount_sum = price_amount_sum + cis.price_amount;
                    });



                    body3List.push( [{text: '', border: [false, true, false, false]}, {
                        text: '',
                        border: [false, true, false, false]
                    }, {text: '', border: [false, true, false, false]}, {
                        text: '',
                        border: [false, true, false, false]
                    }, {text:  qty_sum +" "+ (qty_sum > 1 ? 'PCS' : "PC"), border: [false, true, false, false],bold: true}, {
                        alignment: 'right',bold: true,
                        text: (unit_cost_sum+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",") ,
                        border: [false, true, false, false]
                    }, {
                        text: data.cis[0].currency_name,bold: true,
                        border: [false, true, false, false]
                    }, {text: '', border: [false, true, false, false]}, {
                        alignment: 'right',bold: true,
                        text: (price_amount_sum+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        border: [false, true, false, false]
                    }, {
                        text: data.cis[0].currency_name,bold: true,
                        border: [false, true, false, false]
                    }
                    ])


                    var body3 =  {
                        style: 'nomal',
                            table: {
                        widths: [15, 45, 60, 150, 50, '*',10, 10, '*',10],
                            heights: [15, 15, 15, 15, 15, 15, 15, 15, 15,15,15],
                            body: body3List,//end body
                    }
                    } //테이블 그리기 바디
                    var body4 = {
                        columns: [
                            [{
                                margin: [2, 50, 2, 0],
                                text: data.ci.notice6,

                                style: 'foot'
                            }],

                            [{ //컬럼1 옆에 정렬
                                style: 'title',
                                margin: [40, 30, 0, 0],
                                table: {
                                    heights: ['*'],
                                    widths: ['*'],

                                    body: [[{
                                        border: [false, false, false, false],
                                        image: dataURL,
                                        width: 210,
                                        height: 130,
                                        padding: [0.5, 0.5, 0.5, 0.5]
                                    }]]
                                }
                            }]
                        ]
                    }

                    var documentDefinition = {
                        content: [
                            {
                                margin: [0, -40, 0, 0],
                                padding: [10, 10, 10, 10],
                                table: {
                                    heights: [30],
                                    widths: ['*'],
                                    body: [
                                        [
                                            {
                                                border: [false, false, false, false],
                                                text: [
                                                    {text: '  COMMERCIAL  INVOICE  ', fontSize: 30},
                                                ],
                                                //italics: true,
                                                bold: true,
                                                style: 'header'

                                            },

                                        ]
                                    ]
                                },
                            },// 인보이스 제목
                            body1,
                            body2,
                            body3,
                            // body4

                        ],
                        //하단의 현재페이지 / 페이지 수 넣기
                        footer: function (currentPage, pageCount) {
                            return {
                                columns: [
                                    [{
                                        margin: [30, 0, 2, 0],
                                        text: data.ci.notice6,

                                        style: 'foot'
                                    }],

                                    [{ //컬럼1 옆에 정렬
                                        style: 'title2',
                                        margin: [60, 0, 0, 20],
                                        table: {
                                            heights: ['*'],
                                            widths: ['*'],

                                            body: [[{
                                                border: [false, false, false, false],
                                                image: dataURL,
                                                width: 210,
                                                height: 130,
                                                padding: [0.5, 0.5, 0.5, 0.5]
                                            }]]
                                        }
                                    }]
                                ]
                            };

                        },
        //필요한 스타일 정의하기
                        styles: {
                            style_test: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 0],
                                alignment: 'center', font: 'hangul'
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15], font: 'hangul'
                            },
                            header: {
                                alignment: 'center',
                                font: 'hangul'
                            },
                            title: {bold: true, fontSize: 11, alignment: 'center'},
                            title2: {bold: true, fontSize: 11},
                            nomal: {fontSize: 9},
                            nomal2: {fontSize: 9,bold: true,},
                            table_style: {border: [false, false, false, false]},
                            foot: {
                                // bold: true,
                                fontSize: 10,
                                font: 'hangul'

                            }
                        },

        // 페이지 크기 용지의 크기 사이즈 넣기 또는 특정 사이즈 넣기 { width: number, height: number }
                        pageSize: 'A4',
                        pageMargins: [ 30, 40, 30, 150 ],
                        /* 페이지 방향 portrait : 가로 , landscape : 세로 */
                        pageOrientation: 'portrait',
                        defaultStyle: {
                            font: 'hangul'
                        }
                    };

                    var pdf_name = 'pdf파일 만들기.pdf'; // pdf 만들 파일의 이름
                    if (agent.indexOf("chrome") != -1) {
                        pdfMake.createPdf(documentDefinition).open();
                    } else {
                        pdfMake.createPdf(documentDefinition).download();
                    }
                }
            });
        }
    }
}


function packing_list_btn() {
    var ids = $("#mes_grid").getGridParam('selrow');
    // console.log(ids)
    if (ids === null) {
        alert("데이터를 선택해주세요.");
    } else {
        var mes_data = $('#mes_grid').jqGrid('getRowData', ids);
        if (mes_data.rpt_name === "" && mes_data.user_name === ""){
            alert("인보이스를 먼저 작성 해주세요.");
        } else {
            ccn_ajax("/crmInvoicePackingGet",{keyword:mes_data.req_no}).then(function (data) {
                // console.log(data);


                pdfMake.fonts = {
                    hangul: {
                        normal: "malgun.ttf",
                        bold: "malgunbd.ttf",
                        italics: "malgun.ttf",
                        bolditalics: "malgun.ttf"
                    }
                };
                var img = new Image();
                img.setAttribute('crossOrigin', 'anonymous'); //디렉토리 이미지를 뛰워주기위함
                img.src = data.ci.signed_file// 디렉토리 이미지를 뛰워주기위함

                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = this.width;
                    canvas.height = this.height;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0);

                    var dataURL = canvas.toDataURL("image/png");

                    var margin = [23, 0, 0, 0]
                    var margin2 = [0, 0, 100, 0]
                    var margin3 = [0, 0, 0, 0]


                    var body1 = {
                        alignment: 'justify',
                        columns: [
                            [
                                {
                                    style: 'nomal',
                                    table: {
                                        widths: ['109.5%'], heights: [70], body: [
                                            [
                                                {
                                                    text: 'Seller \n '+data.ci.notice1,
                                                    border: [true, true, false, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {
                                    style: 'nomal',
                                    table: {
                                        widths: ['109.5%'], heights: [70], body: [
                                            [
                                                {
                                                    text: 'Consignee \n'+data.ci.notice2,
                                                    border: [true, true, false, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {
                                    style: 'nomal',
                                    table: {
                                        widths: ['109.5%'], heights: [46.4], body: [
                                            [
                                                {
                                                    text: 'Departure  Date :  \n ' + data.ci.item4,
                                                    border: [true, true, false, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {
                                    style: 'nomal',
                                    table: {
                                        widths: ['109.5%'], heights: [12.7], body: [
                                            [
                                                {
                                                    text: 'Vessel/VOY.: '+data.ci.notice4,
                                                    border: [true, true, false, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {
                                    style: 'nomal',
                                    table: {
                                        widths: ['109.5%'], heights: [10], body: [
                                            [
                                                {
                                                    text: 'From              BUSAN, KOREA',
                                                    border: [true, false, false, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {
                                    style: 'nomal',
                                    table: {
                                        widths: ['109.5%'], heights: [10], body: [
                                            [
                                                {
                                                    text: 'To                 YOKOHAMA , JAPAN',
                                                    border: [true, true, false, true]
                                                },

                                            ]
                                        ]
                                    }
                                },



                            ], //1번컬럼 종료

                            [// 2번컬럼
                                {
                                    style: 'nomal',
                                    margin: margin,
                                    table: {
                                        widths: ['*'], heights: [30], body: [
                                            [
                                                {
                                                    text: 'No. & Date  of  Invoice\n' + data.ci.item1,
                                                    border: [true, true, true, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {  // 2번컬럼
                                    style: 'nomal',
                                    margin: margin,
                                    table: {

                                        widths: ['*'], heights: [20], body: [
                                            [
                                                {text: 'No. & Date of  L/C\n' + data.ci.item2, border: [true, true, true, false]},

                                            ]
                                        ]
                                    }
                                },
                                {  // 2번컬럼
                                    style: 'nomal',
                                    margin: margin,
                                    table: {

                                        widths: ['*'], heights: [30], body: [
                                            [
                                                {text: 'L/C  Issuing  Bank\n' + data.ci.item3, border: [true, true, true, false]},

                                            ]
                                        ]
                                    }
                                },
                                {  // 2번컬럼
                                    style: 'nomal',
                                    margin: margin,
                                    table: {

                                        widths: ['*'], heights: [99], body: [
                                            [
                                                {
                                                    text: 'Buyer NOTIFY \n ' +data.ci.notice3,
                                                    border: [true, true, true, false]
                                                },

                                            ]
                                        ]
                                    }
                                },
                                {  // 2번컬럼
                                    style: 'nomal',
                                    margin: margin,
                                    table: {

                                        widths: ['*'], heights: [46], body: [
                                            [
                                                {
                                                    text: 'Terms of Delivery and Payment \n'+data.ci.notice5,
                                                    border: [true, true, true, true]
                                                },

                                            ]
                                        ]
                                    }
                                }

                            ]
                        ]
                    }
                   var body2= {
                        style: 'nomal',
                            table: {
                        widths: [80, 40, 90, 40, 70, 70, 70],
                            body: [
                            border_all_false([{text: 'Shipping Marks'}, {text: ''}, {text: 'Description of Goods'}, {text: 'Quantity'}, {text: 'SIZE(cm)/BOX'}, {text: '  Net Weight'}, {text: 'Gross Weight'}]),
                            border_all_false([{text: ''}, {text: ''}, {text: ' Parts for Machine Tools'}, {text: ''}, {text: '( W * L * H )'}, {text: ''}, {text: ''}]),
                        ],//end body
                    }

                    } //테이블 그리기 테이블표 해더
                    var markList = [];
                    for(var i = 1 ; i<=5 ; i++){
                        markList.push({
                            width: 60,
                            fontSize: 7,
                            margin:[0,0,0,15],
                            style: 'nomal',
                            text: data.ci["mark"+i]
                        })
                    }

                    var body3List = [];
                    var qty_sum = 0;
                    var part_weight_sum = 0;
                    var gross_weight_sum = 0;
                    data.cis1.forEach(function (cis) {
                        body3List.push(  border_all_false([{text: cis.seq}, {text: cis.part_code+" "+cis.part_kind+"\n  "+cis.part_name}, {text: cis.qty +" "+ (cis.qty > 1 ? 'PCS' : "PC")}, {text: cis.part_size}, {alignment: 'right',text: (cis.part_weight_sum+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}, {text: 'KGS'}, {alignment: 'right',text: (cis.gross_weight_sum+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}, {text: 'KGS'}]))
                        qty_sum = qty_sum + cis.qty;
                        part_weight_sum = part_weight_sum + cis.part_weight_sum;
                        gross_weight_sum = gross_weight_sum + cis.gross_weight_sum;
                    });

                    body3List.push( [{bold: true, text: '', border: [false, true, false, false]},
                        {bold: true, text: '', border: [false, true, false, false]},
                        {
                            bold: true,
                            text: qty_sum +" "+ (qty_sum > 1 ? 'PCS' : "PC"),
                            border: [false, true, false, false]
                        },
                        {bold: true, text: '', border: [false, true, false, false]},
                        {
                            alignment: 'right',
                            bold: true,
                            text: (part_weight_sum+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                            border: [false, true, false, false]
                        },
                        {
                            bold: true,
                            text: 'KGS',
                            border: [false, true, false, false]
                        },
                        {
                            alignment: 'right',
                            bold: true,
                            text: (gross_weight_sum+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                            border: [false, true, false, false]
                        },
                        {
                            bold: true,
                            text: 'KGS',
                            border: [false, true, false, false]
                        },
                       ])

                    var body3 = {
                        columns: [

                            {
                                width: '20%',
                                margin: margin3,
                                alignment: 'justify',
                                columns: [
                                    markList
                                ]
                            }, //테이블 그리기 바디


                            {
                                width: '*',
                                alignment: 'justify',
                                columns: [
                                    {
                                        style: 'nomal',
                                        margin: margin2,
                                        table: {
                                            widths: [10, 120, 30, 50, 48,17, 48,17],
                                            heights: [0, 0, 0, 0, 0, 0, 0, 0],
                                            body: body3List,//end body
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                    var body4List = [];

                    body4List.push(border_all_false([{bold: true,text:  'P/O NO'}, {text: ''}, {text: ''}]))
                    data.cis.forEach(function (cis) {
                        body4List.push( border_all_false([{text: cis.po_no}, {text: cis.part_code+ " "+cis.part_kind +" "+cis.part_name}, {text: cis.qty +" "+ (cis.qty > 1 ? 'PCS' : "PC")}]))
                    });



                    var body4 = {
                        style: 'nomal',
                        table: {
                            widths: [60, 150, 60],
                            heights: [0, 0, 0],
                            body: body4List,//end body
                        }
                    }
                // , //테이블 그리기 바디
                //
                //
                //     {
                //         columns: [
                //
                //             [{
                //                 margin: [2, 100, 2, 0],
                //                 text: 'TUE-100 COLUMN     1PC      K023802\n TUE-100 COLUMN     1PC      K023802\n TUE-100 COLUMN     1PC      K023802\n TUE-100 COLUMN     1PC      K023802\n TUE-100 COLUMN     1PC      K023802\n TUE-100 COLUMN     1PC      K023802\n TUE-100 COLUMN     1PC      K023802\n',
                //
                //                 style: 'nomal2'
                //             }],
                //
                //             [{ //컬럼1 옆에 정렬
                //                 style: 'title',
                //                 margin: [60, 100, 0, 0],
                //                 table: {
                //                     heights: ['*'],
                //                     widths: ['*'],
                //
                //                     body: [[{
                //                         border: [false, false, false, false],
                //                         image: dataURL,
                //                         width: 160,
                //                         height: 90,
                //                         padding: [0.5, 0.5, 0.5, 0.5]
                //                     }]]
                //                 }
                //             }]
                //         ]
                //     }


                    var documentDefinition = {
                        content: [
                            {
                                margin: [0, -40, 0, 0],
                                padding: [10, 10, 10, 10],
                                table: {
                                    heights: [30],
                                    widths: ['*'],
                                    body: [
                                        [
                                            {
                                                border: [false, false, false, false],
                                                text: [
                                                    {text: '  PACKING LIST  ', fontSize: 25},
                                                ],
                                                //italics: true,
                                                bold: true,
                                                style: 'header'

                                            },

                                        ]
                                    ]
                                },
                            },// 인보이스 제목
                            body1,
                            body2,
                            body3,
                            body4
                            //2번째 몸통




                        ],
                        //하단의 현재페이지 / 페이지 수 넣기
                        footer: function (currentPage, pageCount) {
                            return {
                                columns: [
                                    [{
                                        margin: [30, 0, 2, 0],
                                        text: '',

                                        style: 'foot'
                                    }],

                                    [{ //컬럼1 옆에 정렬
                                        style: 'title2',
                                        margin: [60, 0, 0, 20],
                                        table: {
                                            heights: ['*'],
                                            widths: ['*'],

                                            body: [[{
                                                border: [false, false, false, false],
                                                image: dataURL,
                                                width: 210,
                                                height: 130,
                                                padding: [0.5, 0.5, 0.5, 0.5]
                                            }]]
                                        }
                                    }]
                                ]
                            };

                        },
//필요한 스타일 정의하기
                        styles: {
                            style_test: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 0],
                                alignment: 'center', font: 'hangul'
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15], font: 'hangul'
                            },
                            header: {
                                alignment: 'center',
                                font: 'hangul'
                            },
                            title: {bold: true, fontSize: 11, alignment: 'center'},
                            nomal: {fontSize: 8},
                            nomal2: {fontSize: 9},
                            table_style: {border: [false, false, false, false]},
                            foot: {
                                bold: true,
                                fontSize: 10,
                                font: 'hangul'

                            }
                        },

// 페이지 크기 용지의 크기 사이즈 넣기 또는 특정 사이즈 넣기 { width: number, height: number }
                        pageSize: 'A4',
                        pageMargins: [ 30, 40, 30, 150 ],
                        /* 페이지 방향 portrait : 가로 , landscape : 세로 */
                        pageOrientation: 'portrait',
                        defaultStyle: {
                            font: 'hangul'
                        }
                    };

                    var pdf_name = 'pdf파일 만들기.pdf'; // pdf 만들 파일의 이름
                    if (agent.indexOf("chrome") != -1) {
                        pdfMake.createPdf(documentDefinition).open();
                    } else {
                        pdfMake.createPdf(documentDefinition).download();
                    }
                }
            });
            }
        }
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_A003"); //수정권한없음
}

//권한체크
function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsInvoice"}).then(function (data) {
        main_data.auth = data;
    });
}

//jqGrid 설정
function jqGrid_main() {
    $("#mes_grid").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames: ['rownum', '출고일자', '출시번호', '수주번호', '업체', '업체', 'check', 'PO', '기종', '품번', '품명', '단중', '수량', 'INVOICE', '운송수단', '등록자', '등록일시'],// grid 헤더 설정
        colModel: [// grid row 의 설정할 데이터 설정
            {name: 'rownum', index: 'rownum', key: true, sortable: false, width: 100, fixed: true, hidden: true},// key 지정시 grid에서 rowid 데이터 추출시 해당 데이터로 추출
            {
                name: 'work_date',
                index: 'work_date',
                sortable: false,
                width: 90,
                fixed: true,
                formatter: formmatterDate2
            }, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name: 'req_no', index: 'req_no', sortable: false, width: 120, fixed: true}, // sortable 사용시 그리드 헤더 자체 정렬 기능 설정
            {name: 'ord_no', index: 'ord_no', sortable: false, width: 120, fixed: true},// fixed 사용시 해당 그리드 너비 고정값 사용 여부 설정
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 130, fixed: true},
            {name: 'supp_code', index: 'supp_code', sortable: false, width: 150, fixed: true, hidden: true},
            {name: 'iu_check', index: 'iu_check', sortable: false, width: 150, fixed: true, hidden: true},
            {name: 'po_no', index: 'po_no', sortable: false, width: 130, fixed: true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 110, fixed: true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 130, fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 190, fixed: true},
            {
                name: 'part_weight',
                index: 'part_weight',
                sortable: false,
                width: 90,
                fixed: true,
                align: 'right',
                formatter: 'integer'
            },
            {name: 'qty', index: 'qty', sortable: false, width: 90, fixed: true, align: 'right', formatter: 'integer'},
            {name: 'rpt_name', index: 'rpt_name', sortable: false, width: 130, fixed: true},
            {name: 'trans_name', index: 'trans_name', sortable: false, width: 80, fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 60, fixed: true},
            {
                name: 'update_date',
                index: 'update_date',
                sortable: false,
                width: 140,
                fixed: true,
                formatter: formmatterDate
            }
        ],
        caption: "인보이스 관리 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        height: 600, // 그리드 세로 길이 설정
        pager: '#mes_grid_pager',// pager 연결
        rowNum: 100, // 1페이지당 데이터 수
        rowList: [100, 200, 300, 400], // 페이지당 데이터 수 설정
        viewrecords: true, // 그리드 하단 현재 컬럼/총컬럼 수 명시

        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete: function () {// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }
    }).navGrid("#mes_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    select_makes_sub("#supp_select", "/suppAllGet", "supp_code", "supp_name", {
        keyword: 'Y',
        keyword2: 'CORP_TYPE2'
    }, "Y")
}

function border_all_false(boardList) {
    var border = [false, false, false, false];
    var list = {}
    boardList.forEach(function (body) {
        body.border = border
    });

    return boardList;
}