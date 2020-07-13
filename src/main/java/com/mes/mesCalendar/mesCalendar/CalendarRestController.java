package com.mes.mesCalendar.mesCalendar;

import com.mes.mesCalendar.mesCalendar.DTO.CALENDAR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;


@RestController
public class CalendarRestController {
    @Autowired
    private CalendarService calendarService;

    @RequestMapping(value = "/calendarList", method = RequestMethod.POST)
    public List<CALENDAR> calendarList(HttpServletRequest req, CALENDAR calendar) {
        HashMap<String, Object> map = new HashMap();
        List<CALENDAR> list = calendarService.calendarList(req, calendar);
        map.put("data", list);
        return list;
    }



}
