package com.calendar.service.calendarservice.util;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DateUtils {

    public static LocalDate getDateFromNow(int i) {
        return LocalDate.now().plusDays(i);
    }

    public static List<LocalDate> getDatesFromNow(int start, int end) {
        List<LocalDate> dates = new ArrayList<>();
        for (int i = start; i <= end; i++) {
            dates.add(LocalDate.now().plusDays(i));
        }
        return dates;
    }

    public static LocalDate getMaxDate(LocalDate date1, LocalDate date2) {
        return date1.isAfter(date2) ? date1 : date2;
    }

    public static LocalDate getMinDate(LocalDate date1, LocalDate date2) {
        return date1.isAfter(date2) ? date2 : date1;
    }

    public static List<LocalDate> getDatesBetween(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> dates = new ArrayList<>();
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            dates.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }

        return dates;
    }
}
