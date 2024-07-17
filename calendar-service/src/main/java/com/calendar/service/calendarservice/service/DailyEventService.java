package com.calendar.service.calendarservice.service;

import com.calendar.service.calendarservice.entity.Event;
import com.calendar.service.calendarservice.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
public class DailyEventService {

    @Autowired
    private EventService eventService;

    private Map<LocalDate, List<String>> dailyEventIdMap = new HashMap<>();

    private Long lastRefreshTime = null;

    private final AtomicBoolean flag = new AtomicBoolean(false);

    public void refreshDailyEventIdMap() {

        if (!flag.compareAndSet(false, true)) return;
        try {
            dailyEventIdMap.clear();
            List<LocalDate> reservedDates = DateUtils.getDatesFromNow(-20, 36);
            reservedDates.forEach(date -> dailyEventIdMap.put(date, new ArrayList<>()));
            for (Event event : eventService.findAll()) {
                LocalDate startDate = DateUtils.getMaxDate(event.getStartLocal().toLocalDate(), reservedDates.get(0));
                LocalDate endDate = DateUtils.getMinDate(event.getEndLocal().toLocalDate(), reservedDates.get(reservedDates.size() - 1));
                DateUtils.getDatesBetween(startDate, endDate).forEach(date -> dailyEventIdMap.get(date).add(event.getId()));
            }
            lastRefreshTime = System.currentTimeMillis();
        } finally {
            flag.set(false);
        }

    }

    @Scheduled(fixedRate = 86400 * 1000)
    private void updateDailyEventIdMap() {

        if (!flag.compareAndSet(false, true)) return;

        try {
            if (lastRefreshTime == null) return;

            List<LocalDate> reservedDates = DateUtils.getDatesFromNow(-21, 21);
            dailyEventIdMap.keySet().forEach(date -> {
                if (date.isBefore(reservedDates.get(0))) {
                    dailyEventIdMap.remove(date);
                }
            });
            for (int i = reservedDates.size() - 1; i >= 0; i--) {
                if (!dailyEventIdMap.containsKey(reservedDates.get(i))) {
                    dailyEventIdMap.put(reservedDates.get(i), new ArrayList<>());
                    for (Event event : eventService.findAll()) {
                        if (!event.getStartLocal().toLocalDate().isAfter(reservedDates.get(i))
                                && !event.getEndLocal().toLocalDate().isBefore(reservedDates.get(i))) {
                            dailyEventIdMap.get(reservedDates.get(i)).add(event.getId());
                        }
                    }
                } else break;
            }}
        finally {
            flag.set(false);
        }
    }

    public Map<LocalDate, List<Event>> getEventsByDates(List<LocalDate> dates) {
        Map<LocalDate, List<Event>> map = new HashMap<>();
        Set<String> stringSet = new HashSet<>();
        for (LocalDate date : dates) {
            stringSet.addAll(dailyEventIdMap.get(date));
        }

        Map<String, Event> eventMap = eventService.findEventByIds(stringSet.stream().toList())
                .stream().collect(Collectors.toMap(Event::getId, e -> e));

        for (LocalDate date: dates) {
            map.put(date, dailyEventIdMap.get(date).stream().map(eventMap::get).toList());
        }
        return map;
    }
}
