package com.calendar.service.calendarservice.controller;

import com.calendar.service.calendarservice.entity.Event;
import com.calendar.service.calendarservice.service.DailyEventService;
import com.calendar.service.calendarservice.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private DailyEventService dailyEventService;

    @GetMapping
    public Map<LocalDate, List<Event>> getEventsByDates(
            @RequestParam("dates") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<LocalDate> dates) {
        return dailyEventService.getEventsByDates(dates);
    }
}
