package com.mes.Common.Excel.Action;

import com.mes.Common.Interceptor.Session;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

/** *
 * <pre>
 *     ExcelFunction
 *     엑셀 생성 및 읽기 실행 시 호출되는 함수
 * </pre>
 * @author 김재일
 * @since 2019-11-27
 * @version 1.0
 * **/
public class ExcelFunction {
    /** *
     * <pre>
     *     날짜생성 함수
     * </pre>
     * **/
    public String getDate(){
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd_ss");
        String date = format.format(now);
        return date;
    }

    /** *
     * <pre>
     *     output 세팅
     *     excel 확장자 및 파일 이름 설정한다.
     * </pre>
     * @param response          HttpServlet
     * @param sxssfWorkbook     SXSSFWorkBook
     * @param excelName         엑셀 파일 이름
     * @param result            실행 구분자
     * @param out               OutputStream
     * **/
    public void response(HttpServletResponse response, SXSSFWorkbook sxssfWorkbook, String excelName, String result, OutputStream out)throws IOException {
        if (result.equals("ok")) {
            response.setContentType("ms-vnd/excel");
            response.setHeader("Set-Cookie", "fileDownload=true; path=/");
            response.setHeader("Content-Disposition", "attachment;filename=" + excelName + "_" + getDate() + ".xlsx");
            sxssfWorkbook.write(response.getOutputStream());
            sxssfWorkbook.close();
        } else if (result.equals("fail")) {
            try {
                out = response.getOutputStream();
                byte[] data = new String("Excel 생성 중 에러가 발생하였습니다.").getBytes();
                out.write(data, 0, data.length);
            } catch (Exception ignore) {
                ignore.printStackTrace();
            } finally {
                if (out != null)
                    try {
                        out.close();
                    } catch (Exception ignore) {
                    }
            }
        }
    }

    /** *
     * <pre>
     *     Header Cell 스타일 세팅
     *     생성된 Excel Header 부분 스타일을 지정한다.
     * </pre>
     * @param sxssfWorkbook     SXSSFWorkBook
     * **/
    public CellStyle setHeadStyle(SXSSFWorkbook sxssfWorkbook){
        CellStyle headStyle = sxssfWorkbook.createCellStyle();
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);
        headStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.LIME.getIndex());
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headStyle.setAlignment(HorizontalAlignment.CENTER);
        headStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        return headStyle;
    }

    /** *
     * <pre>
     *     Body Cell 스타일 세팅
     *     생성된 Excel Header 부분 스타일을 지정한다.
     * </pre>
     * @param sxssfWorkbook     SXSSFWorkBook
     * **/
    public CellStyle setBodyStyle(SXSSFWorkbook sxssfWorkbook){
        CellStyle bodyStyle = sxssfWorkbook.createCellStyle();
        bodyStyle.setBorderTop(BorderStyle.THIN);
        bodyStyle.setBorderBottom(BorderStyle.THIN);
        bodyStyle.setBorderLeft(BorderStyle.THIN);
        bodyStyle.setBorderRight(BorderStyle.THIN);
        bodyStyle.setAlignment(HorizontalAlignment.RIGHT);
        return bodyStyle;
    }


    public Session getSessionData(HttpServletRequest req)
    {
        return (Session) req.getSession().getAttribute("userData");
    }
}
