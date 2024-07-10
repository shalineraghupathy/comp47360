package com.calendar.service.calendarservice.entity;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
public class Event {
    private String id;
    private String title;
    private String category;
    private String labels;
    private LocalDateTime startLocal;
    private LocalDateTime endLocal;
    private double longitude;
    private double latitude;
    private String address;
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
