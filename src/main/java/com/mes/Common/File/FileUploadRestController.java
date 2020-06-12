package com.mes.Common.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class FileUploadRestController {
    @Autowired
    private FileUploadService fileUploadService;

//    @RequestMapping(value = "/uploadFiles" , method = RequestMethod.POST)
//    public Message uploadFiles(MultipartHttpServletRequest mtfRequest){
//        return fileUploadService.uploadFiles(mtfRequest);
//    }

    @RequestMapping(value = "/googleChartTest", method = RequestMethod.POST)
    public Map<String, Double> googleChartTest(){
        Map<String, Double> a = new HashMap<>();
        a.put("2019-01", 22.3);
        a.put("2019-02", 17.8);
        a.put("2019-03", 32.9);
        a.put("2019-04", 8.1);
        a.put("2019-05", 26.9);
        a.put("2019-06", 24.8);
        a.put("2019-07", 14.9);
        a.put("2019-08", 16.6);
        a.put("2019-09", 33.3);
        a.put("2019-10", 11.4);
        a.put("2019-11", 9.6);
        a.put("2019-12", 20.9);

        return a;
    }
}
