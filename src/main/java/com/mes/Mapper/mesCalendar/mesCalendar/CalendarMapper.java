package com.mes.Mapper.mesCalendar.mesCalendar;

import com.mes.mesCalendar.mesCalendar.DTO.CALENDAR;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarMapper {

    List<CALENDAR> calendarList(CALENDAR calendar);
}
