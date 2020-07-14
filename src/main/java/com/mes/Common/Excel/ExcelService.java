package com.mes.Common.Excel;

import com.mes.Common.Excel.Action.ExcelFunction;
import com.mes.Common.Excel.DTO.Excel;
import com.mes.Common.Excel.Util.MakeBody;
import com.mes.Common.Excel.Util.MakeHeader;
import com.mes.Common.Excel.Util.Upload;
import com.mes.Mapper.Excel.ExcelMapper;
import com.mes.mesCrm.mesCrm.DTO.CRM_OUT_SUB;
import com.mes.mesCrm.mesCrm.DTO.CRM_PLAN;
import com.mes.mesManager.Master.DTO.SYSSupp;
import com.mes.mesOut.mesOut.DTO.OUTS_IN_SUB;
import com.mes.mesOut.mesOut.DTO.OUTS_IO_CD;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_BCR;
import com.mes.mesOut.mesOut.DTO.OUTS_OUT_SUB;
import com.mes.mesPop.Pop.DTO.POP_PLAN;
import com.mes.mesQms.Import.DTO.QMS_RECV_NG_SUM;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesQms.Interim.DTO.QMS_ASSY_NG_SUM;
import com.mes.mesQms.Shipment.DTO.QMS_PROD_SUB;
import com.mes.mesScm.InOut.DTO.*;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Order.DTO.SCM_REQ_ORD;
import com.mes.mesScm.Standard.DTO.SYS_PART_PRICE;
import com.mes.mesScm.Standard.DTO.sysBPart;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_LIST;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_MONTH;
import com.mes.mesTpm.Error.DTO.tpmMachineError;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

/**
 * <pre>
 *     ExcelService
 *     엑셀 업로드, 다운로드를 처리하는 서비스 클래스
 * </pre>
 *
 * @author 김재일
 * @version 1.0
 * @see ExcelFunction
 * @since 2019-11-27
 **/
@Service
@Slf4j
@Transactional
public class ExcelService extends ExcelFunction {
    @Autowired
    private ExcelMapper excelMapper;

    /**
     * <pre>
     *     엑셀 시트 생성 함수
     *     전달받은 파라미터를 응용하여 데이터 시트를 생성한다.
     * </pre>
     *
     * @param response SXSSFWorkBook
     * @param excel    파라미터 DTO
     * @throws IOException
     **/
    public void ExcelDownload(HttpServletRequest req, HttpServletResponse response, Excel excel) throws IOException {
        // 생성자 선언
        SXSSFWorkbook sxssfWorkbook = new SXSSFWorkbook(100);
        MakeHeader makeHeader = new MakeHeader();
        MakeBody makeBody = new MakeBody();


        // 전역변수 선언
        Row row = null;
        Cell cell = null;
        String excelName = null;
        int rowNo = 0;
        int i = 0;
        int v = 0;

        try {
            // 파라미터 데이터로 해당 로직 처리
            if (excel.getName().equals("sysBPart")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재정보");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재정보", "UTF-8");

                // DataTransfer [s]
                List<sysBPart> list = excelMapper.testDbList();
                List<List<Object>> rows = makeBody.sysBPart_Body(list);
                int index = makeHeader.sysBPart_Header().length;
                String[] data = makeHeader.sysBPart_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("sysPartPrice")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재단가관리");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재단가관리", "UTF-8");

                // DataTransfer [s]

                List<SYS_PART_PRICE> list = excelMapper.sysPartPriceDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.sysPartPrice_Body(list);
                    int index = makeHeader.sysPartPrice_Header().length;
                    String[] data = makeHeader.sysPartPrice_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("qmsAssyList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("중간검사현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("중간검사현황", "UTF-8");

                // DataTransfer [s]

                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsAssyList_Body(list);
                    int index = makeHeader.qmsAssyList_Header().length;
                    String[] data = makeHeader.qmsAssyList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("qmsAssyErrorMan")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("중간검사부적합");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("중간검사부적합", "UTF-8");

                // DataTransfer [s]

                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsAssyList_Body(list);
                    int index = makeHeader.qmsAssyList_Header().length;
                    String[] data = makeHeader.qmsAssyList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("qmsAssyErrorList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("중간검사불량현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("중간검사불량현황", "UTF-8");
                // DataTransfer [s]
                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                List<QMS_ASSY_NG_SUM> list2 = excelMapper.qmsAssyErrorListSumGetDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsAssyList_Body(list);
                    int index = makeHeader.qmsAssyList_Header().length;
                    String[] data = makeHeader.qmsAssyList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
//                if (!list2.isEmpty()) {
//                    List<List<Object>> rows = makeBody.qmsAssyErrorListSumGet_Body(list2);
//                    int index2 = makeHeader.qmsAssyErrorListSumGet_Header().length;
//                    String[] data2 = makeHeader.qmsAssyErrorListSumGet_Header();
//                    // DataTransfer [e]
//
//                    // (MakeHeader) 헤더 생성
//                    row = sheet.createRow(rowNo++);
//                    row.setHeight((short) 512);
//                    for (i = 0; index2 > i; i++) {
//                        sheet.setColumnWidth((short) i, (short) 7000);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data2[i]);
//                    }
//
//                    // (MakeBody) 바디 생성
//                    for (i = 0; list2.size() > i; i++) {
//                        row = sheet.createRow(rowNo++);
//                        for (v = 0; rows.get(i).size() > v; v++) {
//                            cell = row.createCell(v);
//                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
//                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
//                        }
//                    }
//                } else {
//                    response(response, sxssfWorkbook, excelName, "fail", null);
//                }


            } else if (excel.getName().equals("qmsOutsList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("외주입고검사현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("외주입고검사현황", "UTF-8");

                // DataTransfer [s]

                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsOutsList_Body(list);
                    int index = makeHeader.qmsOutsList_Header().length;
                    String[] data = makeHeader.qmsOutsList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("qmsOutsErrorMan")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("외주검사부적합등록");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("외주검사부적합등록", "UTF-8");

                // DataTransfer [s]

                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsOutsList_Body(list);
                    int index = makeHeader.qmsOutsList_Header().length;
                    String[] data = makeHeader.qmsOutsList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("qmsQutsErrorList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("외주입고검사불량현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("외주입고검사불량현황", "UTF-8");

                // DataTransfer [s]

                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                List<QMS_ASSY_NG_SUM> list2 = excelMapper.qmsAssyErrorListSumGetDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsOutsList_Body(list);
                    int index = makeHeader.qmsOutsList_Header().length;
                    String[] data = makeHeader.qmsOutsList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }// list 2
//                if (!list2.isEmpty()) {
//                    List<List<Object>> rows = makeBody.qmsAssyErrorListSumGet_Body(list2);
//                    int index2 = makeHeader.qmsAssyErrorListSumGet_Header().length;
//                    String[] data2 = makeHeader.qmsAssyErrorListSumGet_Header();
//                    // DataTransfer [e]
//
//                    // (MakeHeader) 헤더 생성
//                    row = sheet.createRow(rowNo++);
//                    row.setHeight((short) 512);
//                    for (i = 0; index2 > i; i++) {
//                        sheet.setColumnWidth((short) i, (short) 7000);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data2[i]);
//                    }
//
//                    // (MakeBody) 바디 생성
//                    for (i = 0; list2.size() > i; i++) {
//                        row = sheet.createRow(rowNo++);
//                        for (v = 0; rows.get(i).size() > v; v++) {
//                            cell = row.createCell(v);
//                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
//                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
//                        }
//                    }
//                } else {
//                    response(response, sxssfWorkbook, excelName, "fail", null);
//                }
            } else if (excel.getName().equals("qmsProdErrorList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("최종검사불량현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("최종검사불량현황", "UTF-8");

                // DataTransfer [s]
                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                List<QMS_ASSY_NG_SUM> list2 = excelMapper.qmsAssyErrorListSumGetDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsAssyList_Body(list);
                    int index = makeHeader.qmsAssyList_Header().length;
                    String[] data = makeHeader.qmsAssyList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
//                if (!list2.isEmpty()) {
//                    List<List<Object>> rows = makeBody.qmsAssyErrorListSumGet_Body(list2);
//                    int index2 = makeHeader.qmsAssyErrorListSumGet_Header().length;
//                    String[] data2 = makeHeader.qmsAssyErrorListSumGet_Header();
//                    // DataTransfer [e]
//
//                    // (MakeHeader) 헤더 생성
//                    row = sheet.createRow(rowNo++);
//                    row.setHeight((short) 512);
//                    for (i = 0; index2 > i; i++) {
//                        sheet.setColumnWidth((short) i, (short) 7000);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data2[i]);
//                    }
//
//                    // (MakeBody) 바디 생성
//                    for (i = 0; list2.size() > i; i++) {
//                        row = sheet.createRow(rowNo++);
//                        for (v = 0; rows.get(i).size() > v; v++) {
//                            cell = row.createCell(v);
//                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
//                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
//                        }
//                    }
//                } else {
//                    response(response, sxssfWorkbook, excelName, "fail", null);
//                }


            } else if (excel.getName().equals("qmsRecvErrorList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("수입검사불량현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("수입검사불량현황", "UTF-8");

                // DataTransfer [s]

                List<QMS_RECV_SUB> list = excelMapper.qmsRecvErrorDbList(excel);
                List<QMS_RECV_NG_SUM> list2 = excelMapper.qmsRecvErrorListSumGetDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsRecvError_Body(list);
                    int index = makeHeader.qmsRecvError_Header().length;
                    String[] data = makeHeader.qmsRecvError_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }// list 2
//                if (!list2.isEmpty()) { //qmsRecvErrorListSumGetDbList
//                    List<List<Object>> rows = makeBody.qmsRecvErrorListSum_Body(list2);
//                    int index2 = makeHeader.qmsRecvErrorListSum_Header().length;
//                    String[] data2 = makeHeader.qmsRecvErrorListSum_Header();
//                    // DataTransfer [e]
//
//                    // (MakeHeader) 헤더 생성
//                    row = sheet.createRow(rowNo++);
//                    row.setHeight((short) 512);
//                    for (i = 0; index2 > i; i++) {
//                        sheet.setColumnWidth((short) i, (short) 7000);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data2[i]);
//                    }
//
//                    // (MakeBody) 바디 생성
//                    for (i = 0; list2.size() > i; i++) {
//                        row = sheet.createRow(rowNo++);
//                        for (v = 0; rows.get(i).size() > v; v++) {
//                            cell = row.createCell(v);
//                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
//                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
//                        }
//                    }
//                } else {
//                    response(response, sxssfWorkbook, excelName, "fail", null);
//                }


            } else if (excel.getName().equals("scmOrderList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("발주현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("발주현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_IN_ORD_SUB> list = excelMapper.scmOrderListDbList(excel);

                List<List<Object>> rows = makeBody.scmOrderList_Body(list);
                int index = makeHeader.scmOrderList_Header().length;
                String[] data = makeHeader.scmOrderList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmIOList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재입출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재입출고현황", "UTF-8");

                // DataTransfer [s]
                List<SCM_IO> list = excelMapper.scmIOListDbList(excel);

                List<List<Object>> rows = makeBody.scmIOList_Body(list);
                int index = makeHeader.scmIOList_Header().length;
                String[] data = makeHeader.scmIOList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmReqOrder")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("구매요청현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("구매요청현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_REQ_ORD> list = excelMapper.scmReqOrderDbList(excel);
                List<List<Object>> rows = makeBody.scmReqOrder_Body(list);
                int index = makeHeader.scmReqOrder_Header().length;
                String[] data = makeHeader.scmReqOrder_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmInList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("입고현황", "UTF-8");

                // DataTransfer [s]
                List<SCM_IN> list = excelMapper.scmInListGetDbList(excel);
                List<List<Object>> rows = makeBody.scmInList_Body(list);
                int index = makeHeader.scmInList_Header().length;
                String[] data = makeHeader.scmInList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmOutList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("출고현황", "UTF-8");

                // DataTransfer [s]
                List<SCM_OUT> list = excelMapper.scmOutListGetDbList(excel);
                List<List<Object>> rows = makeBody.scmOutList_Body(list);
                int index = makeHeader.scmOutList_Header().length;
                String[] data = makeHeader.scmOutList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmOutListGet")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("출고현황", "UTF-8");

                // DataTransfer [s]
                List<SCM_OUT> list = excelMapper.scmOutListGetDbList(excel);
                List<List<Object>> rows = makeBody.scmOutList_Body(list);
                int index = makeHeader.scmOutList_Header().length;
                String[] data = makeHeader.scmOutList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            }else if (excel.getName().equals("scmStockRetList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재반출현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재반출현황", "UTF-8");

                // DataTransfer [s]

                System.out.println(excel);
                List<SCM_STOCK_RET_SUB> list = excelMapper.scmStockRetListDbList(excel);
                System.out.println(list.size());
                List<List<Object>> rows = makeBody.scmStockRetList_Body(list);
                int index = makeHeader.scmStockRetList_Header().length;
                String[] data = makeHeader.scmStockRetList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmInLineList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("재입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("재입고현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_REIN_SUB> list = excelMapper.scmInLineListDbList(excel);
                List<List<Object>> rows = makeBody.scmInLineList_Body(list);
                int index = makeHeader.scmInLineList_Header().length;
                String[] data = makeHeader.scmInLineList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmStockList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("재고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("재고현황", "UTF-8");

                // DataTransfer [s]
                List<SCM_STOCK_LIST> list = excelMapper.scmStockListDbList(excel);
                List<List<Object>> rows = makeBody.scmStockList_Body(list);
                int index = makeHeader.scmStockList_Header().length;
                String[] data = makeHeader.scmStockList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmStockSumDay")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재일원장");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재일원장", "UTF-8");

                // DataTransfer [s]
                List<SCM_STOCK_SUM_DAY> list = excelMapper.scmStockSumDayListDbList(excel);
                List<List<Object>> rows = makeBody.scmStockSumDayList_Body(list);
                int index = makeHeader.scmStockSumDayList_Header().length;
                String[] data = makeHeader.scmStockSumDayList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmStockSumMonth")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재월원장");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재월원장", "UTF-8");

                // DataTransfer [s]
                List<SCM_STOCK_SUM_MONTH> list = excelMapper.scmStockSumMonthListDbList(excel);
                List<List<Object>> rows = makeBody.scmStockSumMonthList_Body(list);
                int index = makeHeader.scmStockSumMonthList_Header().length;
                String[] data = makeHeader.scmStockSumMonthList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("wmsInList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("입고현황", "UTF-8");

                // DataTransfer [s]

                List<WMS_IN_SUB> list = excelMapper.wmsInListDbList(excel);
                List<List<Object>> rows = makeBody.wmsInList_Body(list);
                int index = makeHeader.wmsInList_Header().length;
                String[] data = makeHeader.wmsInList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("wmsOutList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품출고현황", "UTF-8");

                // DataTransfer [s]

                List<WMS_OUT_SUB> list = excelMapper.wmsOutListDbList(excel);
                List<List<Object>> rows = makeBody.wmsOutList_Body(list);
                int index = makeHeader.wmsOutList_Header().length;
                String[] data = makeHeader.wmsOutList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("wmsStock")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("재고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("재고현황", "UTF-8");

                // DataTransfer [s]

                List<WMS_STOCK> list = excelMapper.wmsStockDbList(excel);
                List<List<Object>> rows = makeBody.wmsStockList_Body(list);
                int index = makeHeader.wmsStockList_Header().length;
                String[] data = makeHeader.wmsStockList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("wmsStockIOSumDay")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품일원장");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품일원장", "UTF-8");

                // DataTransfer [s]

                List<WMS_STOCK> list = excelMapper.wmsStockIOSumDayDbList(excel);
                List<List<Object>> rows = makeBody.wmsStockIOSumDayList_Body(list);
                int index = makeHeader.wmsStockIOSumDayList_Header().length;
                String[] data = makeHeader.wmsStockIOSumDayList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("wmsStockIOSumMonth")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품월원장");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품월원장", "UTF-8");

                // DataTransfer [s]

                List<WMS_STOCK> list = excelMapper.wmsStockIOSumMonthDbList(excel);
                List<List<Object>> rows = makeBody.wmsStockIOSumMonthList_Body(list);
                int index = makeHeader.wmsStockIOSumMonthList_Header().length;
                String[] data = makeHeader.wmsStockIOSumMonthList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("wmsOutReady")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품미출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품미출고현황", "UTF-8");

                // DataTransfer [s]

                List<WMS_OUT_ORD_SUB> list = excelMapper.wmsOutReadyDbList(excel);
                List<List<Object>> rows = makeBody.wmsOutReady_Body(list);
                int index = makeHeader.wmsOutReady_Header().length;
                String[] data = makeHeader.wmsOutReady_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("crmPlan")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("계획관리");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("계획관리", "UTF-8");

                // DataTransfer [s]

                List<CRM_PLAN> list = excelMapper.crmPlanDbList(excel);
                List<List<Object>> rows = makeBody.crmPlan_Body(list);
                System.out.println(excel.getRow1());
                System.out.println(excel.getRow1().equals("1"));

                if (excel.getRow1().equals("1")) {
                    int index = makeHeader.crmPlan_Header1().length;
                    String[] data = makeHeader.crmPlan_Header1();

                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }
                } else if (excel.getRow1().equals("2")) {
                    int index = makeHeader.crmPlan_Header2().length;
                    String[] data = makeHeader.crmPlan_Header2();

                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }
                } else if (excel.getRow1().equals("3")) {
                    int index = makeHeader.crmPlan_Header3().length;
                    String[] data = makeHeader.crmPlan_Header3();

                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }
                } else if (excel.getRow1().equals("4")) {
                    int index = makeHeader.crmPlan_Header4().length;
                    String[] data = makeHeader.crmPlan_Header4();

                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }
                }
                // DataTransfer [e]
                // (MakeHeader) 헤더 생성


                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("crmWorkList")) {
//                // 시트 생성
//                Sheet sheet = sxssfWorkbook.createSheet("실적현황");
//                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
//                excelName = URLEncoder.encode("실적현황","UTF-8");
//
//                // DataTransfer [s]
//
//                List<CRM_ORD_RECP> list = excelMapper.crmWorkListDbList(excel);
//                List<List<Object>> rows = makeBody.crmWorkList_Body(list);
//                int index = makeHeader.crmWorkList_Header().length;
//                String[] data = makeHeader.crmWorkList_Header();
//                // DataTransfer [e]
//
//                // (MakeHeader) 헤더 생성
//                row = sheet.createRow(rowNo++);
//                row.setHeight((short)512);
//                for(i=0; index > i; i++){
//                    if(i==8){
//                        sheet.setColumnWidth((short)i, (short)9500);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data[i]);
//                    }else {
//                        sheet.setColumnWidth((short)i, (short)7000);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data[i]);
//                    }
//                }
//
//                // (MakeBody) 바디 생성
//                for (i=0; list.size()>i; i++) {
//                    row = sheet.createRow(rowNo++);
//                    for (v=0; rows.get(i).size() > v; v++) {
//                        cell = row.createCell(v);
//                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
//                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
//                    }
//                }
            } else if (excel.getName().equals("crmProdOrder")) {
                // 시트 생성
//                Sheet sheet = sxssfWorkbook.createSheet("구매생산지시");
//                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
//                excelName = URLEncoder.encode("구매생산지시","UTF-8");
//
//                // DataTransfer [s]
//
//                List<CRM_ORD_RECP> list = excelMapper.crmProdOrderDbList(excel);
//                List<List<Object>> rows = makeBody.crmProdOrder_Body(list);
//                int index = makeHeader.crmProdOrder_Header().length;
//                String[] data = makeHeader.crmProdOrder_Header();
//                // DataTransfer [e]
//
//                // (MakeHeader) 헤더 생성
//                row = sheet.createRow(rowNo++);
//                row.setHeight((short)512);
//                for(i=0; index > i; i++){
//                    if(i==8){
//                        sheet.setColumnWidth((short)i, (short)9500);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data[i]);
//                    }else {
//                        sheet.setColumnWidth((short) i, (short) 7000);
//                        cell = row.createCell(i);
//                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
//                        cell.setCellValue(data[i]);
//                    }
//                }
//
//                // (MakeBody) 바디 생성
//                for (i=0; list.size()>i; i++) {
//                    row = sheet.createRow(rowNo++);
//                    for (v=0; rows.get(i).size() > v; v++) {
//                        cell = row.createCell(v);
//                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
//                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
//                    }
//                }
            } else if (excel.getName().equals("crmOutList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("출하실적");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("출하실적", "UTF-8");

                // DataTransfer [s]

                List<CRM_OUT_SUB> list = excelMapper.crmOutListDbList(excel);
                List<List<Object>> rows = makeBody.crmOutList_Body(list);
                int index = makeHeader.crmOutList_Header().length;
                String[] data = makeHeader.crmOutList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("qmsRecvList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("수입검사현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("수입검사현황", "UTF-8");

                // DataTransfer [s]

                List<QMS_RECV_SUB> list = excelMapper.qmsRecvDbList(excel);
                List<List<Object>> rows = makeBody.qmsRecvList_Body(list);
                int index = makeHeader.qmsRecvList_Header().length;
                String[] data = makeHeader.qmsRecvList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("qmsRecvErrorMan")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("수입검사부적합");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("수입검사부적합", "UTF-8");

                // DataTransfer [s]

                List<QMS_RECV_SUB> list = excelMapper.qmsRecvErrorManDbList(excel);
                List<List<Object>> rows = makeBody.qmsRecvErrorMan_Body(list);
                int index = makeHeader.qmsRecvErrorMan_Body_Header().length;
                String[] data = makeHeader.qmsRecvErrorMan_Body_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("qmsProdList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("최종검사현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("최종검사현황", "UTF-8");

                // DataTransfer [s]
                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsAssyList_Body(list);
                    int index = makeHeader.qmsAssyList_Header().length;
                    String[] data = makeHeader.qmsAssyList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("qmsProdErrorMan")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("최종검사부적합");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("최종검사부적합", "UTF-8");

                // DataTransfer [s]
                List<QMS_PROD_SUB> list = excelMapper.qmsAssyListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsAssyList_Body(list);
                    int index = makeHeader.qmsAssyList_Header().length;
                    String[] data = makeHeader.qmsAssyList_Header();
                    // DataTransfer [e]

                    // (MakeHeader) 헤더 생성
                    row = sheet.createRow(rowNo++);
                    row.setHeight((short) 512);
                    for (i = 0; index > i; i++) {
                        sheet.setColumnWidth((short) i, (short) 7000);
                        cell = row.createCell(i);
                        cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                        cell.setCellValue(data[i]);
                    }

                    // (MakeBody) 바디 생성
                    for (i = 0; list.size() > i; i++) {
                        row = sheet.createRow(rowNo++);
                        for (v = 0; rows.get(i).size() > v; v++) {
                            cell = row.createCell(v);
                            cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                            cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                        }
                    }
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            } else if (excel.getName().equals("outsOutList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("외주출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("외주출고현황", "UTF-8");

                // DataTransfer [s]

                List<OUTS_OUT_SUB> list = excelMapper.outsOutDbList(excel);
                List<List<Object>> rows = makeBody.outsOutList_Body(list);
                int index = makeHeader.outsOutList_Header().length;
                String[] data = makeHeader.outsOutList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("outsInList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("외주입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("외주입고현황", "UTF-8");

                // DataTransfer [s]

                List<OUTS_IN_SUB> list = excelMapper.outsInDbList(excel);
                List<List<Object>> rows = makeBody.outsInList_Body(list);
                int index = makeHeader.outsInList_Header().length;
                String[] data = makeHeader.outsInList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("outsInReady")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("반제품미입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("반제품미입고현황", "UTF-8");

                // DataTransfer [s]

                List<OUTS_OUT_BCR> list = excelMapper.outsInReadyDbList(excel);
                List<List<Object>> rows = makeBody.outsInReady_Body(list);
                int index = makeHeader.outsInReady_Header().length;
                String[] data = makeHeader.outsInReady_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("tpmMachineError")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("사후보전관리");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("사후보전관리", "UTF-8");

                // DataTransfer [s]

                List<tpmMachineError> list = excelMapper.tpmMachineErrorDbList(excel);
                List<List<Object>> rows = makeBody.tpmMachineError_Body(list);
                int index = makeHeader.tpmMachineError_Header().length;
                String[] data = makeHeader.tpmMachineError_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("scmStockRevList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("재고조정현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("재고조정현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_STOCK_REV_LIST> list = excelMapper.scmStockRevListDbList(excel);
                List<List<Object>> rows = makeBody.scmStockRevList_Body(list);
                int index = makeHeader.scmStockRevList_Header().length;
                String[] data = makeHeader.scmStockRevList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("outsInReadyGet")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("미입고관리");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("미입고관리", "UTF-8");

                // DataTransfer [s]
                List<OUTS_IO_CD> list = excelMapper.outsInReadyGetDbList(excel);
                List<List<Object>> rows = makeBody.outsInReadyGet_Body(list);
                int index = makeHeader.outsInReadyGet_Header().length;
                String[] data = makeHeader.outsInReadyGet_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("outsIOList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("외주입출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("외주입출고현황", "UTF-8");

                // DataTransfer [s]
                List<OUTS_IO_CD> list = excelMapper.outsIOListDbList(excel);
                List<List<Object>> rows = makeBody.outsIOList_Body(list);
                int index = makeHeader.outsIOList_Header().length;
                String[] data = makeHeader.outsIOList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("popPlanList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("생산계획현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("생산계획현황", "UTF-8");

                // DataTransfer [s]
                List<POP_PLAN> list = excelMapper.popPlanListDbList(excel);
                List<List<Object>> rows = makeBody.popPlanList_Body(list);
                int index = makeHeader.popPlanList_Header().length;
                String[] data = makeHeader.popPlanList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            } else if (excel.getName().equals("sysSupp")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("업체등록");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("업체등록", "UTF-8");

                // DataTransfer [s]
                List<SYSSupp> list = excelMapper.sysSuppListDbList(excel);
                List<List<Object>> rows = makeBody.sysSuppList_Body(list);
                int index = makeHeader.sysSuppList_Header().length;
                String[] data = makeHeader.sysSuppList_Header();
                // DataTransfer [e]

                // (MakeHeader) 헤더 생성
                row = sheet.createRow(rowNo++);
                row.setHeight((short) 512);
                for (i = 0; index > i; i++) {
                    sheet.setColumnWidth((short) i, (short) 7000);
                    cell = row.createCell(i);
                    cell.setCellStyle(setHeadStyle(sxssfWorkbook));
                    cell.setCellValue(data[i]);
                }

                // (MakeBody) 바디 생성
                for (i = 0; list.size() > i; i++) {
                    row = sheet.createRow(rowNo++);
                    for (v = 0; rows.get(i).size() > v; v++) {
                        cell = row.createCell(v);
                        cell.setCellStyle(setBodyStyle(sxssfWorkbook));
                        cell.setCellValue(String.valueOf(rows.get(i).get(v)));
                    }
                }
            }
            response(response, sxssfWorkbook, excelName, "ok", null);
        } catch (Exception e) {
            response(response, sxssfWorkbook, excelName, "fail", null);
        } finally {
            try {
                sxssfWorkbook.close();
            } catch (Exception ignore) {
            }
        }
    }

    public List<sysBPart> ExcelUploadReader(Excel excel) throws IOException, InvalidFormatException {
        OPCPackage opcPackage = OPCPackage.open(excel.getFiles().getInputStream());
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(opcPackage);
        Upload upload = new Upload();
        XSSFRow row = null;
        XSSFCell cell = null;
        XSSFSheet sheet = null;
        return upload.sysBPartListData(xssfWorkbook, sheet, row, cell);
    }

    public String excel_upload(Excel excel, HttpServletRequest req) throws IOException, InvalidFormatException {
        OPCPackage opcPackage = OPCPackage.open(excel.getFiles().getInputStream());
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(opcPackage);
        Upload upload = new Upload();
        XSSFRow row = null;
        XSSFCell cell = null;
        XSSFSheet sheet = null;
        List<sysBPart> list = upload.sysBPartSetListData(xssfWorkbook, sheet, row, cell, req);
        try {
            for (sysBPart vo : list) {
                excelMapper.sysBPartSetListData(vo);
            }
            return "업로드가 완료되었습니다.";
        } catch (Exception e) {
            return " 중복된 키 값이 포함되어있습니다. \n 엑셀 데이터를 확인 후 재업로드 해주세요.";
        }
    }
}

