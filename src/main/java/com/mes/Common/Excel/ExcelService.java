package com.mes.Common.Excel;

import com.mes.Common.Excel.Action.ExcelFunction;
import com.mes.Common.Excel.DTO.Excel;
import com.mes.Common.Excel.Util.MakeBody;
import com.mes.Common.Excel.Util.MakeHeader;
import com.mes.Mapper.Excel.ExcelMapper;
import com.mes.mesCrm.Orders.DTO.CRM_ORD_RECP;
import com.mes.mesCrm.Orders.DTO.CRM_SHIPPING;
import com.mes.mesManager.Master.DTO.SYSSupp;
import com.mes.mesQms.Import.DTO.QMS_RECV_SUB;
import com.mes.mesQms.Middle.DTO.QMS_PROD;
import com.mes.mesQms.Shipment.DTO.QMS_PROD_SUB;
import com.mes.mesScm.InOut.DTO.SCM_IN_SUB;
import com.mes.mesScm.InOut.DTO.SCM_IO;
import com.mes.mesScm.InOut.DTO.SCM_OUT;
import com.mes.mesScm.Order.DTO.SCM_IN_ORD_SUB;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_REV_LIST;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_DAY;
import com.mes.mesScm.Stock.DTO.SCM_STOCK_SUM_MONTH;
import com.mes.mesWms.InOut.DTO.WMS_IN_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_ORD_SUB;
import com.mes.mesWms.InOut.DTO.WMS_OUT_SUB;
import com.mes.mesWms.Stock.DTO.WMS_STOCK;
import com.mes.mesWms.Stock.DTO.WMS_STOCK_REV;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
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
            if (excel.getName().equals("qmsAssyList")) {
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
                }else if (excel.getName().equals("scmOrderList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("발주현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("발주현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_IN_ORD_SUB> list = excelMapper.scmOrderDbList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }else if (excel.getName().equals("scmInList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재입고현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_IN_SUB> list = excelMapper.scmInDbList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }

            else if (excel.getName().equals("scmOutListGet")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재출고현황", "UTF-8");

                // DataTransfer [s]

                List<SCM_OUT> list = excelMapper.scmOutDbListGet(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }

            else if (excel.getName().equals("scmIOList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재입출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재입출고현황", "UTF-8");
                // DataTransfer [s]
                List<SCM_IO> list = excelMapper.scmIODbList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }else if (excel.getName().equals("scmStockSumDayList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재재고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재재고현황", "UTF-8");
                // DataTransfer [s]
                List<SCM_STOCK_SUM_DAY> list = excelMapper.scmStockSumDayDbList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }

            else if (excel.getName().equals("scmStockSumMonthList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재재고월원장");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재재고월원장", "UTF-8");
                // DataTransfer [s]
                List<SCM_STOCK_SUM_MONTH> list = excelMapper.scmStockSumMonthList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }
                else if (excel.getName().equals("scmStockRevList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재재고조정");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재재고조정", "UTF-8");
                // DataTransfer [s]
                List<SCM_STOCK_REV> list = excelMapper.scmStockRevDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.scmStockRev_Body(list);
                    int index = makeHeader.scmStockRev_Header().length;
                    String[] data = makeHeader.scmStockRev_Header();
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
            }
                else if (excel.getName().equals("scmStockRevListList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("자재재고조정현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("자재재고조정현황", "UTF-8");
                // DataTransfer [s]
                List<SCM_STOCK_REV_LIST> list = excelMapper.scmStockRevListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.scmStockRevListList_Body(list);
                    int index = makeHeader.scmStockRevListList_Header().length;
                    String[] data = makeHeader.scmStockRevListList_Header();
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
            }
            else if (excel.getName().equals("wmsInList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품입고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품입고현황", "UTF-8");
                // DataTransfer [s]
                List<WMS_IN_SUB> list = excelMapper.wmsInDbList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }
            else if (excel.getName().equals("wmsOutListList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품출고현황", "UTF-8");
                // DataTransfer [s]
                List<WMS_OUT_SUB> list = excelMapper.wmsOutListDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.wmsOutListList_Body(list);
                    int index = makeHeader.wmsOutListList_Header().length;
                    String[] data = makeHeader.wmsOutListList_Header();
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
            }
            else if (excel.getName().equals("wmsOutReady")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품미출고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품미출고현황", "UTF-8");
                // DataTransfer [s]
                List<WMS_OUT_ORD_SUB> list = excelMapper.wmsOutReadyDbList(excel);
                if (!list.isEmpty()) {
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
                } else {
                    response(response, sxssfWorkbook, excelName, "fail", null);
                }
            }
                else if (excel.getName().equals("wmsStockSumList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품재고현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품재고현황", "UTF-8");
                // DataTransfer [s]
                List<WMS_STOCK> list = excelMapper.wmsStockSumDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.wmsStockSumList_Body(list);
                    int index = makeHeader.wmsStockSumList_Header().length;
                    String[] data = makeHeader.wmsStockSumList_Header();
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
            }

                else if (excel.getName().equals("wmsStockSumMonthList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품재고월원장");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품재고월원장", "UTF-8");
                // DataTransfer [s]
                List<WMS_STOCK> list = excelMapper.wmsStockSumMonthDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.wmsStockSumMonthList_Body(list);
                    int index = makeHeader.wmsStockSumMonthList_Header().length;
                    String[] data = makeHeader.wmsStockSumMonthList_Header();
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
            }

                else if (excel.getName().equals("wmsStockRevList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("제품재고조정현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("제품재고조정현황", "UTF-8");
                // DataTransfer [s]
                List<WMS_STOCK_REV> list = excelMapper.wmsStockRevDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.wmsStockRevList_Body(list);
                    int index = makeHeader.wmsStockRevList_Header().length;
                    String[] data = makeHeader.wmsStockRevList_Header();
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
            }

                else if (excel.getName().equals("crmPerform")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("실적현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("실적현황", "UTF-8");
                // DataTransfer [s]
                List<CRM_ORD_RECP> list = excelMapper.crmPerformDbList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.crmPerform_Body(list);
                    int index = makeHeader.crmPerform_Header().length;
                    String[] data = makeHeader.crmPerform_Header();
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
            }
                else if (excel.getName().equals("crmShipping")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("운송비용현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("운송비용현황", "UTF-8");
                // DataTransfer [s]
                List<CRM_SHIPPING> list = excelMapper.crmShippingList(excel);
                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.crmShipping_Body(list);
                    int index = makeHeader.crmShipping_Header().length;
                    String[] data = makeHeader.crmShipping_Header();
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
            }
                else if (excel.getName().equals("qmsRecvListList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("수입검사현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("수입검사현황", "UTF-8");
                // DataTransfer [s]
                List<QMS_RECV_SUB> list = excelMapper.qmsRecvListDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsRecvListList_Body(list);
                    int index = makeHeader.qmsRecvListList_Header().length;
                    String[] data = makeHeader.qmsRecvListList_Header();
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
            }
                else if (excel.getName().equals("qmsRecvErrorListList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("수입검사불량현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("수입검사불량현황", "UTF-8");
                // DataTransfer [s]
                List<QMS_RECV_SUB> list = excelMapper.qmsRecvErrorListDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsRecvErrorListList_Body(list);
                    int index = makeHeader.qmsRecvErrorListList_Header().length;
                    String[] data = makeHeader.qmsRecvErrorListList_Header();
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
            }
                else if (excel.getName().equals("qmsProdMiddleList")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("중간검사현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("중간검사현황", "UTF-8");
                // DataTransfer [s]
                List<QMS_PROD> list = excelMapper.qmsProdMiddleDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsProdMiddleList_Body(list);
                    int index = makeHeader.qmsProdMiddleList_Header().length;
                    String[] data = makeHeader.qmsProdMiddleList_Header();
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
            }
                else if (excel.getName().equals("qmsProdMiddleList2")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("중간검사조치기록");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("중간검사조치기록", "UTF-8");
                // DataTransfer [s]
                List<QMS_PROD> list = excelMapper.qmsProdMiddleDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsProdMiddleList2_Body(list);
                    int index = makeHeader.qmsProdMiddleList2_Header().length;
                    String[] data = makeHeader.qmsProdMiddleList2_Header();
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
            }
                else if (excel.getName().equals("qmsProdMiddleList3")) {
                // 시트 생성
                Sheet sheet = sxssfWorkbook.createSheet("중간검사불량현황");
                // 파일 이름 생성 <한글이 깨지기 때문에 인코딩 필수>
                excelName = URLEncoder.encode("중간검사불량현황", "UTF-8");
                // DataTransfer [s]
                List<QMS_PROD> list = excelMapper.qmsProdMiddleDbList(excel);

                if (!list.isEmpty()) {
                    List<List<Object>> rows = makeBody.qmsProdMiddleList3_Body(list);
                    int index = makeHeader.qmsProdMiddleList3_Header().length;
                    String[] data = makeHeader.qmsProdMiddleList3_Header();
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
            }






            else if (excel.getName().equals("sysSupp")) {
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

//    public List<sysBPart> ExcelUploadReader(Excel excel) throws IOException, InvalidFormatException {
//        OPCPackage opcPackage = OPCPackage.open(excel.getFiles().getInputStream());
//        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(opcPackage);
//        Upload upload = new Upload();
//        XSSFRow row = null;
//        XSSFCell cell = null;
//        XSSFSheet sheet = null;
//        return upload.sysBPartListData(xssfWorkbook, sheet, row, cell);
//    }

//    public String excel_upload(Excel excel, HttpServletRequest req) throws IOException, InvalidFormatException {
//        OPCPackage opcPackage = OPCPackage.open(excel.getFiles().getInputStream());
//        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(opcPackage);
//        Upload upload = new Upload();
//        XSSFRow row = null;
//        XSSFCell cell = null;
//        XSSFSheet sheet = null;
//        List<sysBPart> list = upload.sysBPartSetListData(xssfWorkbook, sheet, row, cell, req);
//        try {
//            for (sysBPart vo : list) {
//                excelMapper.sysBPartSetListData(vo);
//            }
//            return "업로드가 완료되었습니다.";
//        } catch (Exception e) {
//            return " 중복된 키 값이 포함되어있습니다. \n 엑셀 데이터를 확인 후 재업로드 해주세요.";
//        }
//    }
}

