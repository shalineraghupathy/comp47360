package com.calendar.service.calendarservice.service;

import com.calendar.service.calendarservice.entity.Event;
import com.calendar.service.calendarservice.repository.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class EventService {

    @Autowired
    private EventMapper eventMapper;

    public List<Event> findAll() {
        return eventMapper.findAll();
    }

    public void saveEvents(Set<Event> events) {
        eventMapper.insertEvents(events);
    }

    public List<Event> findEventByIds(List<String> ids) {
        return eventMapper.findEventByIds(ids);
    }

}
