package com.mes.Common.Excel;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.Excel.DTO.Excel;
import com.mes.mesScm.Standard.DTO.sysBPart;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

/** *
 * <pre>
 *     ExcelService
 *     엑셀 업로드, 다운로드를 처리하는 RESTful 클래스
 * </pre>
 * @author 김재일
 * @since 2019-11-27
 * @version 1.0
 * **/
@RestController
@Slf4j
public class ExcelRestController {
    @Autowired
    private ExcelService excelService;

    @RequestMapping("excel_upload")
    public String excel_upload(Excel excel, HttpServletRequest req) throws IOException, InvalidFormatException {
        return excelService.excel_upload(excel, req);
    }

    @RequestMapping("excel_uploadReader")
    public List<sysBPart> excel_uploadReader(Excel excel) throws IOException, InvalidFormatException {
        return excelService.ExcelUploadReader(excel);
    }
}
