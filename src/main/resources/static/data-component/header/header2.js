var array =
    [
        {code: "", title: 'SOUND', sub: 'MES', name: 'HOME'},

        // 관리자 - 권한관리
        {code: "sysAuth", title: '관리자', sub: '권한관리', name: '권한그룹관리'},
        {code: "sysAuthProgram", title: '관리자', sub: '권한관리', name: '권한그룹별 프로그램관리'},

        //사용자관리
        {code: "sysDept", title: '관리자', sub: '사용자관리', name: '부서관리'},
        {code: "sysUser", title: '관리자', sub: '사용자관리', name: '사용자관리'},

        //마스터관리
        {code: "sysCommon", title: '관리자', sub: '마스터관리', name: '공통코드관리'},
        // {code: "sysUserSupp", title: '관리자', sub: '사용자관리', name: '협력사접속관리'},
        {code: "sysMsg", title: '관리자', sub: '마스터관리', name: '메세지관리'},
        {code: "sysBoard", title: '관리자', sub: '마스터관리', name: '게시판관리'},
        {code: "sysSupp", title: '관리자', sub: '마스터관리', name: '업체등록'},
        {code: "sysProdLine", title: '관리자', sub: '마스터관리', name: '라인정보'},
        {code: "sysCargo", title: '관리자', sub: '마스터관리', name: '창고관리'},
        // {code: "sysERate", title: '관리자', sub: '마스터관리', name: '환율관리'},
        // {code: "sysPassword", title: '관리자', sub: '마스터관리', name: '비밀번호변경'},
        // {code: "sysFavority", title: '관리자', sub: '마스터관리', name: '사용자화면설정'},
        // {code: "sysBOM", title: '관리자', sub: '마스터관리', name: 'BOM관리'},
        // {code: "sysBOMList", title: '관리자', sub: '마스터관리', name: 'BOM현황'},
        // {code: "sysPartNameGroup", title: '관리자', sub: 'BOM관리', name: '유형관리'},
        // {code: "sysPartNameGroup2", title: '관리자', sub: 'BOM관리', name: '제품군관리'},
        // {code: "sysSPart", title: '관리자', sub: 'BOM관리', name: '제품등록'},

        // 자재관리-기준정보
        {code: "sysPart", title: '자재관리', sub: '기준정보', name: '품목정보관리'},
        {code: "sysPartName", title: '관리자', sub: '기준정보', name: '품목명관리'},
        {code: "sysLoc", title: '자재관리', sub: '기준정보', name: '로케이션관리'},

        // {code: "sysPartPrice", title: '자재관리', sub: '기준정보', name: '자재단가관리'},
        // {code: "scmReqOrder", title: '자재관리', sub: '구매관리', name: '구매요청현황'},

        //발주관리
        {code: "scmOrder", title: '자재관리', sub: '발주관리', name: '발주등록'},
        {code: "scmOrderList", title: '자재관리', sub: '발주관리', name: '발주현황'},
        {code: "scmOrderImage", title: '자재관리', sub: '발주관리', name: '발주이미지관리'},

        //자재입출고
        {code: "scmIn", title: '자재관리', sub: '자재입출고', name: '입고등록'},
        {code: "scmInList", title: '자재관리', sub: '자재입출고', name: '입고현황'},
        {code: "scmInLineList", title: '자재관리', sub: '자재입출고', name: '재입고현황'},
        {code: "scmOutOrder", title: '자재관리', sub: '자재입출고', name: '출고요청'},
        {code: "scmOutList", title: '자재관리', sub: '자재입출고', name: '출고현황'},
        // {code: "scmStockRetList", title: '자재관리', sub: '자재입출고', name: '자재반출현황'},
        {code: "scmIOList", title: '자재관리', sub: '자재입출고', name: '자재입출고현황'},

        // {code: "scmHInList", title:'자재관리',sub:'반제품입출고',name:'반제품입고현황'},
        // {code: "scmHInReady", title:'자재관리',sub:'반제품입출고',name:'반제품입고대기현황'},
        // {code: "scmHOutList", title:'자재관리',sub:'반제품입출고',name:'반제품출고현황'},

        //재고관리
        {code: "scmStockList", title: '자재관리', sub: '재고관리', name: '재고현황'},
        {code: "scmStockSumDay", title: '자재관리', sub: '재고관리', name: '자재 일원장'},
        {code: "scmStockSumMonth", title: '자재관리', sub: '재고관리', name: '자재 월원장'},
        {code: "scmStockRev", title: '자재관리', sub: '재고관리', name: '재고조정'},
        {code: "scmStockRevList", title: '자재관리', sub: '재고관리', name: '재고조정현황'},

        // {code: "scmPartClose", title: '자재관리', sub: '매입마감', name: '마감처리'},
        // {code: "scmPartCloseSumList", title: '자재관리', sub: '매입마감', name: '마감현황'},
        // {code: "scmPartCloseCancel", title: '자재관리', sub: '자재입출고', name: '마감취소'},

        //영업관리
        {code: "crmOrderRecp", title: '영업관리', sub: '영업관리', name: '수주정보관리'},
        {code: "crmPlan", title: '영업관리', sub: '영업관리', name: '계획관리'},
        {code: "crmWorkList", title: '영업관리', sub: '영업관리', name: '실적관리'},
        {code: "crmMoney", title: '영업관리', sub: '영업관리', name: '수금관리'},
        {code: "crmWeList", title: '영업관리', sub: '영업관리', name: '견적서관리'},
        {code: "crmCalendar", title: '영업관리', sub: '영업관리', name: '납품일정표'},
        // {code: "crmProdOrder", title: '영업관리', sub: '영업관리', name: '구매생산요청'},
        // {code: "crmAssyCable", title: '영업관리', sub: '영업관리', name: '조립케이블 구성'},
        // {code: "crmOutList", title: '영업관리', sub: '영업관리', name: '출하실적'},

        //설비관리
        {code:"tpmMC", title:'설비관리',sub:'기준정보',name:'설비정보관리'},
        {code:"tpmMachineRegItem", title:'설비관리',sub:'예방점검',name:'예방점검항목관리'},
        {code:"tpmMachineRegCycle", title:'설비관리',sub:'예방점검',name:'예방점검주기설정'},
        {code:"tpmMachineRegComp", title:'설비관리',sub:'예방점검',name:'예방점검관리'},
        {code:"tpmMachineRegAlarm", title:'설비관리',sub:'예방점검',name:'예방점검알림설정'},
        {code:"tpmMachineError", title:'설비관리',sub:'사후보전',name:'사후보전관리'},


        //품질관리
        {code: "qmsTestItem", title: '품질관리', sub: '기준정보', name: '검사항목관리'},
        {code: "qmsTestStd", title: '품질관리', sub: '기준정보', name: '외경검사기준'},
        {code: "qmsErrorType", title: '품질관리', sub: '기준정보', name: '공정별불량유형관리'},

        {code: "qmsAssy", title: '품질관리', sub: '출하검사', name: '중간검사진행'},
        {code: "qmsAssyList", title: '품질관리', sub: '출하검사', name: '중간검사현황'},
        {code: "qmsAssyErrorMan", title: '품질관리', sub: '출하검사', name: '중간검사부적합'},
        {code: "qmsAssyErrorList", title: '품질관리', sub: '출하검사', name: '중간검사불량현황'},

        {code: "qmsProd", title: '품질관리', sub: '출하검사', name: '최종검사진행'},
        {code: "qmsProdList", title: '품질관리', sub: '출하검사', name: '최종검사현황'},
        {code: "qmsProdErrorMan", title: '품질관리', sub: '출하검사', name: '최종검사부적합'},
        {code: "qmsProdErrorList", title: '품질관리', sub: '출하검사', name: '최종검사불량현황'},


        {code: "qmsRecv", title: '품질관리', sub: '수입검사', name: '수입검사진행'},
        {code: "qmsRecvList", title: '품질관리', sub: '수입검사', name: '수입검사현황'},
        {code: "qmsRecvErrorMan", title: '품질관리', sub: '수입검사', name: '수입검사부적합'},
        {code: "qmsRecvErrorList", title: '품질관리', sub: '수입검사', name: '수입검사불량현황'},
        {code: "qmsRecvMRB", title: '품질관리', sub: '수입검사', name: '수입검사MRB관리'},

        {code:"qmsTestItem", title:'품질관리',sub:'기준정보',name:'검사항목관리'},
        {code:"qmsTestStd", title:'품질관리',sub:'기준정보',name:'외경검사기준'},
        {code:"qmsErrorType", title:'품질관리',sub:'기준정보',name:'공정별불량유형관리'},
        {code:"qmsRecv", title:'품질관리',sub:'수입검사',name:'수입검사진행'},
        {code:"qmsRecvList", title:'품질관리',sub:'수입검사',name:'수입검사현황'},
        {code:"qmsRecvErrorMan", title:'품질관리',sub:'수입검사',name:'수입검사부적합'},
        {code:"qmsRecvErrorList", title:'품질관리',sub:'수입검사',name:'수입검사부적합현황'},
        {code:"qmsRecvMRB",title:'품질관리',sub:'수입검사',name:'수입검사MRB관리'},

        {code: "qmsOutsList", title: '품질관리', sub: '외주검사', name: '외주입고검사현황'},
        {code: "qmsOutsErrorMan", title: '품질관리', sub: '외주검사', name: '외주입고검사부적합등록'},
        {code: "qmsOutsErrorList", title: '품질관리', sub: '외주검사', name: '외주입고검사불량현황'},

        // 생산관리
        {code:"popPlan1",title:'생산관리',sub:'생산관리',name:'생산계획등록(1단계)'},
        {code:"popPlan2",title:'생산관리',sub:'생산관리',name:'생산계획등록(2단계)'},
        {code:"popPlan3",title:'생산관리',sub:'생산관리',name:'생산지시등록(3단계)'},
        {code:"popPlanSub",title:'생산관리',sub:'생산관리',name:'생산계획등록(Sub)'},
        {code:"popPlanASSY",title:'생산관리',sub:'생산관리',name:'생산계획등록(ASSY)'},

        {code:"popSpec",title:'생산관리',sub:'기준정보',name:'설비조건'},

        {code:"popProdRange",title:'생산관리',sub:'생산현황',name:'기간별생산실적'},
        {code:"popProdList1",title:'생산관리',sub:'생산현황',name:'제품별생산실적'},
        {code:"popProdList2",title:'생산관리',sub:'생산현황',name:'공정별작업현황'},
        {code:"popPlanOrder",title:'생산관리',sub:'생산현황',name:'생산요청현황'},
        {code:"popMonitoring",title:'생산관리',sub:'생산현황',name:'생산모니터링'},
        {code:"popLot",title:'생산관리',sub:'생산현황',name:'LOT별원자재현황'},
        {code:"popErrList",title:'생산관리',sub:'생산현황',name:'부적합현황'},
        {code:"popProdReport",title:'생산관리',sub:'생산현황',name:'작업일보현황'},


        //출하관리
        {code:"wmsInList", title:'출하관리',sub:'입/출고 관리',name:'입고현황'},
        {code:"wmsOutOrder", title:'출하관리',sub:'입/출고 관리',name:'제품출고 지시'},
        {code:"wmsOutList", title:'출하관리',sub:'입/출고 관리',name:'제품출고 현황'},
        {code:"wmsOutReady", title:'출하관리',sub:'입/출고 관리',name:'제품 미출고 현황'},
        {code:"wmsStockList", title:'출하관리',sub:'재고관리',name:'제품재고현황'},

        {code:"wmsStock", title:'재고현황',sub:'재고관리',name:'재고현황'},
        {code:"wmsStockIOSumDay", title:'출하관리',sub:'재고관리',name:'제품 일원장'},
        {code:"wmsStockIOSumMonth", title:'출하관리',sub:'재고관리',name:'제품 월원장'},


        //생산관리
        {code:"popBcrForm", title:"생산관리",sub:"기준정보",name:"바코드양식"},
        {code:"popRoute", title:"생산관리",sub:"기준정보",name:"공정라우팅설정"},
        {code:"popLineUser",title:"생산관리",sub:"기준정보",name:"공정별작업자관리"},
        {code:"popReportSpec",title:'생산관리',sub:'기준정보',name:'작업의뢰서설정'},
        // {code:"popErrorType",title:"생산관리",sub:"기준정보",name:"공정별불량유형관리"},

        {code:"popProdPlan",title:"생산관리",sub:"생산관리",name:"작업지시관리"},
        {code:"popProdPlanManual",title:"생산관리",sub:"생산관리",name:"작업지시관리(수동)"},
        {code:"popPlan",title:"생산관리",sub:"생산관리",name:"생산계획관리"},
        {code:"popPlanList",title:"생산관리",sub:"생산관리",name:"생산계획현황"},
        {code:"popPlanCheck",title:"생산관리",sub:"생산관리",name:"생산계획검토"},

        {code:"popPC",title:"생산관리",sub:"디바이스관리",name:"컴퓨터관리"},
        {code:"popTerminal", title:"생산관리", sub:"디바이스관리", name:"공정마스터관리"},

        //외주관리
        {code:"outsIOList", title:"외주관리" , sub:"외주관리", name:"외주입출고현황"},
        {code:"outsInReady", title:"외주관리" , sub:"외주관리", name:"미입고관리"},

        //게시
        {code:"board", title:"게시판" , sub:"게시판", name:"게시판"},
    ];
var path = window.location.pathname.split("/").slice(1);
$(function () {
    wrapWindowByMask2();
    setTimeout(function () {
        closeWindowByMask()
    }, 300);
    // 엑티브 메뉴 nav
    for (var i = 0; array.length > i; i++) {
        if (array[i].code == path) {
            $('#sub-t-1').text(array[i].name);
            $('#sub-t-2').text(array[i].title);
            $('#sub-t-3').text(array[i].sub);
            $('#sub-t-4').text(array[i].name);
        }
    }

    $('#go_hpdk').click(function(){
        $.ajax({
            type: "POST",
            dataType : "jsonp",
            url: "http://tobesystem.co.kr/partners",
            data:
                {
                    site_code : $('#hstcd').val(),
                    user_code : $('#huscd').val(),
                    user_name : $('#husnm').val(),
                    url : "http://"+window.location.host
                },
            error: function (request,status,error) {
                if(request.status == 200){
                    var newTab = window.open('http://tobesystem.co.kr/h_index', '_blank');
                    newTab.focus();
                }else{
                    alert('헬프데스크 인증에 실패하였습니다.');
                }

            }
        });
    });




    password_modal_start();




    var filter = "win16|win32|win64|mac|macintel";
    if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
            $('select').on('select2:open', function(e) {
                $('.select2-search input').prop('focus',false);
            })
        }
    }




});
// var settime =  setInterval(function() {
//
//     if (getCookie('senUserData') == null){
//
//         alert('회원데이터가 존재하지않습니다.\n로그인페이지로 이동합니다.');
//
//         window.location.href = "logout";
//
//         clearTimeout(settime);
//
//
//     }
// },1000);

function  callback2(cb){
    return  cb();
}

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}


function logout() {
    if (confirm("로그아웃 하시겠습니까?")) {
        location.href = "logout";
    }
}



function password_add_btn() {
    modal_reset(".password_value", []);
    $("#passwordDialog").dialog('open');
}


function wrapWindowByMask2() {
    //화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskHeight2 = maskHeight / 2;
//      var maskWidth = $(document).width();
    var maskWidth = window.document.body.clientWidth;
    var maskWidth2 = maskWidth / 2;

    var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg = '';

    loadingImg += "<div id='loadingImg' style='position:absolute; left:" + (maskWidth2 - 45) + "px;top:40%; display:none; z-index:10000;'>";
    loadingImg += " <img src='/ui-component/imagesNew/loding/loding1.gif' style='max-width: 50px; max-height: 50px;'/>";
    loadingImg += "</div>";

    //화면에 레이어 추가
    $('body')
        .append(mask)
        .append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({
        'width': maskWidth
        , 'height': maskHeight
        , 'opacity': '0.3'
    });

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').show();
}

function closeWindowByMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();
}


function viewBoard(idx){
    $.ajax({
        url: '/validCode?idx='+idx,
        complete : function (e) {
            if(e.status == 200){
                $.ajax({
                    url: '/board?idx='+idx,
                    complete : function (e) {
                        if(e.status == 200){
                            location.href = '/board';
                        }
                    }
                });
            } else {alert('시스템 에러. 관리자에게 문의하세요.')}
        }
    });
}


var filter = "win16|win32|win64|mac|macintel";
var pmCheck = 'Y';
if ( navigator.platform ) {
    if ( filter.indexOf( navigator.platform.toLowerCase() ) >= 0 ) {
        pmCheck = 'Y';
    } else {
        pmCheck = 'N';
    }
}

var msg_object = {};

function msgGet_auth(keyword) {
    ccn_ajax("/msgGet", {keyword: keyword}).then(function (data) {
        msg_object[keyword] = data;
    });
}

function favorites_btn() {
    var path = window.location.pathname.split("/").slice(1);
    ccn_ajax("/sysMenuFavoritesAdd", {menu_code:path[0]}).then(function (data) {
        if(data.result === 'NG'){
            $(".favorites_star").attr('class','fa fa-star-o favorites_star');

        }else {
            $(".favorites_star").attr('class','fa fa-star favorites_star');
        }

        ccn_ajax("/sysMenuFavoritesGet", {}).then(function (data2) {
            $("#left_submenu").empty();
            for (var i  =0 ; i<data2.length; i++){
               $("#left_submenu").append(
               $(' <li class="'+(data2[i].menu_code == under_active ? "active" : "")  +'" >' +
                   '<a href="'+ data2[i].menu_code +'">'+ data2[i].menu_name +'</a>' +
                   '<b class="arrow"></b>'+
                   '</li>'));
           }

        });
    });

}
