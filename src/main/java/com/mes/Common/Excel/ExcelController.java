package com.mes.Common.Excel;

import lombok.extern.slf4j.Slf4j;
import com.mes.Common.Excel.DTO.Excel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/** *
 * <pre>
 *     ExcelService
 *     엑셀 업로드, 다운로드를 처리하는 컨트롤러 클래스
 * </pre>
 * @author 김재일
 * @since 2019-11-27
 * @version 1.0
 * **/
@Controller
@Slf4j
public class ExcelController {
    @Autowired
    private ExcelService excelService;

    @RequestMapping(value = "/excel_download", method = RequestMethod.POST)
    public void excel_download(HttpServletRequest req, HttpServletResponse response, Excel excel) throws IOException {
        excelService.ExcelDownload(req, response, excel);
    }

}
