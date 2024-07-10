import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US"; // Import locale from date-fns
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./eventscalender.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Culinary Arts Summer Academy",
    start: new Date(2024, 6, 8, 9, 30),
    end: new Date(2024, 6, 8, 12, 30),
    allDay: false,
  },
  {
    title: "TY Summer Camp for Girls",
    start: new Date(2024, 6, 8, 10, 30),
    end: new Date(2024, 6, 8, 13, 30),
    allDay: false,
  },
  {
    title: "Recruitment Webinars for CDNTs",
    start: new Date(2024, 6, 9),
    end: new Date(2024, 6, 9),
    allDay: true,
  },
  // Add more events as needed
];

const EventsCalendar: React.FC = () => {
  return (
    <div className="events-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default EventsCalendar;
