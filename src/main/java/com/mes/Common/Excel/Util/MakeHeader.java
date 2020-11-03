package com.mes.Common.Excel.Util;

/** *
 * <pre>
 *     MakeHeader
 *     셀 헤더를 생성하는 클래스
 * </pre>
 * @author 김재일
 * @since 2019-11-27
 * @version 1.0
 * **/
public class MakeHeader {
    public String[] sysBPart_Header() {
        String[] data = {"품목구분", "품목코드", "품목명", "보관로케이션", "업체명", "규격", "단위", "L/T", "검사기준", "검사구분", "재고최대", "재고최소", "등록자", "수정일"};
        return data;
    }
  
    
    //발주현황
    public String[] scmOrderList_Header() {
        String[] data = {"발주일자", "발주번호", "업체명", "품번", "품명", "규격", "단위", "상태", "발주수량", "입고수량", "미입고"};
        return data;
    }

    

    
    
    public String[] qmsAssyList_Header() {
        String[] data={  "검사일자 ",  "검사번호 ",  "지시번호 ",  "현장 ",  "계획명 ", "검사항목 ", "검사결과 ", "불량유형 ", "불량상세 ", "조치구분 ", "부적합보고서 ", "개선조치 ", "검사자 ", "검사일시 "};
        return data;
    }

    public String[] sysSuppList_Header() {
        String[] data={"업체코드","업체명","대표자","업체명(영문)","사업자번호","전화번호","업태","팩스번호","종목","결재방법","주소","등록자","등록일"};
        return data;
    }

    public String[] scmInList_Header() {
        String[] data={"입고일자","전표번호","업체명","품번","품명","규격","입고수량","단위","검사구분","검사결과","등록자","등록일시"};
        return data;
    }

    public String[] scmOutList_Header() {
        String[] data={"출고일자","출고번호","품번","품명","규격","단위","출고수량","등록자","등록일시"};
        return data;
    }

    public String[] scmIOList_Header() {
        String[] data={"품번","품명","규격","단위","일자","수량","구분"};
        return data;
    }

    public String[] scmStockSumDayList_Header() {
        String[] data={"구분","품번","품명","규격","단위","전일재고","금일입고","금일출고","재고"};
        return data;
        
    }

    public String[] scmStockSumMonthList_Header() {

        String[] data={"구분","품번","품명","규격","단위","전월재고","금월입고","금월출고","재고"};
        return data;
    }

    public String[] scmStockRev_Header() {
        String[] data={"구분","품번","품명","규격","단위","재고량"};
        return data;
    }

    public String[] scmStockRevListList_Header() {
        String[] data={"조정일자","구분","품번","품명","규격","단위","조정전 재고","조정후 재고","조정사유","등록자","등록일시"};
        return data;
    }

    public String[] wmsInList_Header() {
        String[] data={"입고일자", "전표번호", "업체", "기종", "품명", "품번","단중", "제품LOT", "등록자", "등록일시"};
        return data;
    }

    public String[] wmsOutListList_Header() {

        String[] data={"출고일자", "출고전표", "업체","기종", "품명", "품번","단중","수량","중량","제품LOT","성적서","출고요청번호","생산일자","중간검사","출하검사","등록자","등록일시"};
        return data;
    }

    public String[] wmsOutReady_Header() {
        String[] data={"출고요청일자", "전표번호", "업체","기종", "품명", "품번","단중","수량","중량","등록자","수정일"};
        return data;
    }

    public String[] wmsStockSumList_Header() {
        String[] data={"업체", "기종", "품번","품명", "단중","수량","중량","수량","중량","수량","중량","수량","중량","수량","중량"};
        return data;
    }

    public String[] wmsStockSumMonthList_Header() {
        String[] data={"업체", "기종", "품번","품명", "단중","수량","중량","수량","중량","수량","중량","수량","중량","수량","중량"};
        return data;
    }

    public String[] wmsStockRevList_Header() {
        String[] data={"조정일자","조정번호","업체","기종","품명","품번","단중","조정전재고","조정후재고","등록자","등록일시"};
        return data;
    }

    public String[] crmPerform_Header() {
        String[] data={"수주일자","전표번호","업체","PO","기종","품번","품명","단중","화폐단위","단가","수량","총금액","납품(선적)1","납품(선적)2","납품(선적)3","납품(선적)4","납품(선적)5","납품(선적)6","납품(선적)7","납품(선적)8","납품(선적)9","납품(선적)10"};
        return data;
    }
    public String[] crmShipping_Header() {
        String[] data={"선적일자", "전표번호", "업체","운송수단", "해상운임","터미널 핸들링비용","환경","쇼링비","부두이용료","서류발급비","하역료","보험료","항만시설보안료","국내운송비","관세대행수수료","목재비1","목재비2","목재비3","순중량","운송단가","선적일자","등록자","등록일시"};
        return data;
    }

    public String[] qmsRecvListList_Header() {
        String[] data={"입고일자","전표번호","업체","구분","품번","품명","규격","단위","입고수량","검사수량","불량수량","불량유형","불량상세","조치구분","성적서","검사자","검사일시"};
        return data;

    }

    public String[] qmsRecvErrorListList_Header() {
       
        String[] data={ "입고일자","전표번호","업체", "품번", "품명", "규격", "단위", "검사등급", "입고수량","검사수량", "불량수량", "검사결과","불량내용","조치구분","검사자","검사일시"};
        return data;
    }

    public String[] qmsProdMiddleList_Header() {
        String[] data={"검사일자","검사번호","업체","기종","품번","품명","단중","제품LOT","검사결과","수정","폐기","부적합보고서","검사자","검사일시"};
        return data;
    }

    public String[] qmsProdMiddleList2_Header() {
        String[] data={ "검사일자","검사번호","업체","기종","품번","품명","단중","제품LOT","검사결과","수정","폐기","부적합보고서","검사자","검사일시"};
        return data;
    }

    public String[] qmsProdMiddleList3_Header() {
        String[] data={ "검사일자","검사번호","업체","기종","품번","품명","단중","제품LOT","검사결과","수정","폐기","부적합보고서","검사자","검사일시"};
        return data;
    }

    public String[] qmsProdErrorListList_Header() {
        String[] data={ "검사일자","검사번호","업체","기종","품번","품명","단중","제품LOT","경도1","경도2","경도3","검사결과","검사자","검사일시"};
        return data;
    }

    public String[] qmsMoldWashList_Header() {
        String[] data={ "일자","측정시간","측정값","작업자","측정시간","측정값","작업자","측정시간","측정값","작업자","측정시간","측정값","작업자"};
        return data;
    }

    public String[] popProdRangeList_Header() {
        String[] data={ "공정","업체","기종","품번","품명","단중","생산수량","중량"};
        return data;
    }

    public String[] popProdList1List_Header() {
        String[] data={"공정","업체","기종","품번","품명","단중","생산일자","생산수량"};
        return data;
    }

    public String[] popProdList2List_Header() {
        String[] data={"작업일자","공정","업체","기종","품번","품명","단중","지시수량","생산수량","등록자","등록일시"};
        return data;
    }

    public String[] popProdReport1List_Header() {
        String[] data={"생산지시일자","CHARGE","업체","기종","품번","품명","단중","수량","등록자","등록일시"};
        return data;
    }

    public String[] popSpectroList_Header() {
        String[] data={"계획일자","CHARGE","업체","기종","품명","단중","C","Si","Mn","P","S","Cr","Ni","Cu","Sn","작업자","등록일시"};
        return data;
    }

    public String[] outsInListList_Header() {
        String[] data={"입고일자","전표번호","외주업체","업체","기종","품번","품명","단중","수량","출장검사","등록자","입고일시"};
        return data;
    }

    public String[] outsIOList_Header() {
        String[] data={"외주업체","업체","기종","품번","품명","단중","일자","수량","구분"};
        return data;
    }

    public String[] outsStockSumAllList_Header() {
        String[] data={"외주업체","업체","기종","품번","품명","단중","전일재고","금일입고","금일출고","자체불량","재고"};
        return data;
    }

    public String[] outsStockSumMonthList_Header() {
        String[] data={"외주업체","업체","기종","품번","품명","단중","전월재고","금월입고","금월출고","자체불량","재고"};
        return data;
    }

    public String[] popProdLeadTimeList_Header() {
        String[] data={"생산지시일","생산완료일","공정","업체","기종","품번","품명","단중","중간검사","출하검사","LOT","리드타임","상태"};
        return data;
    }

    public String[] sysProdSum_Header() {
        String[] data={"업체","기종","품명","품번","단중","생산누계","기초재고","구분", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"};
        return data;
    }
}
