package com.calendar.service.calendarservice.repository;

import com.calendar.service.calendarservice.entity.Event;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Set;

@Mapper
public interface EventMapper {

    List<Event> findAll();

    void insertEvents(@Param("events") Set<Event> events);

    List<Event> findEventByIds(@Param("ids") List<String> ids);
}
