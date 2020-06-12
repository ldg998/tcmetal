package com.mes.mesCalendar.mesCalendar;

import com.mes.Mapper.mesCalendar.mesCalendar.CalendarMapper;
import com.mes.mesCalendar.mesCalendar.DTO.CALENDAR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class CalendarService {
    @Autowired
    private CalendarMapper calendarMapper;


    public List<CALENDAR> calendarList(HttpServletRequest req, CALENDAR calendar) {
        return calendarMapper.calendarList(calendar);
    }
}
