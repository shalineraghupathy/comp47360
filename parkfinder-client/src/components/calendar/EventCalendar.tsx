import { useState, useEffect } from "react";
import axios from "axios";

type Event = {
  id: string;
  title: string;
  category: string;
  labels: string[];
  startLocal: string;
  endLocal: string;
  longitude: number;
  latitude: number;
  address: string;
  description: string;
};

type EventsByDate = {
  [key: string]: Event[];
};

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventsByDate>({});
  const today = new Date();
  const maxWeeksForward = 4;
  const maxWeeksBackward = 1;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return [...Array(7)].map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const fetchEvents = async (dates: Date[]) => {
    try {
      const eventsData: EventsByDate = {};
      for (const date of dates) {
        const formattedDate = formatDate(date);
        const response = await axios.get(
          `http://localhost:8080/events?dates=${formattedDate}`,
          { withCredentials: true }
        );
        eventsData[formattedDate] = response.data[formattedDate] || [];
      }
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const weekDates = getWeekDates(currentDate);
    fetchEvents(weekDates);
  }, [currentDate]);

  const updateCalendar = (newDate: Date) => {
    setCurrentDate(new Date(newDate));
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    updateCalendar(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    updateCalendar(newDate);
  };

  const weeksFromToday = Math.floor(
    (currentDate - today) / (7 * 24 * 60 * 60 * 1000)
  );
  const prevWeekDisabled = weeksFromToday <= -maxWeeksBackward;
  const nextWeekDisabled = weeksFromToday >= maxWeeksForward;

  return (
    <div>
      <div id="day-container">
        {getWeekDates(currentDate).map((date) => (
          <div
            key={date}
            className={`day ${
              date.toDateString() === today.toDateString() ? "today" : ""
            }`}
          >
            <h3>{getDayName(date)}</h3>
            <h2>{formatDate(date)}</h2>
            {events[formatDate(date)]?.map((event) => (
              <div key={event.id} className="event">
                <h4>{event.title}</h4>
                <p>Category: {event.category}</p>
                <p>Start: {event.startLocal}</p>
                <p>End: {event.endLocal}</p>
                <p>Address: {event.address}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        id="prev-week"
        onClick={handlePrevWeek}
        disabled={prevWeekDisabled}
      >
        Previous Week
      </button>
      <button
        id="next-week"
        onClick={handleNextWeek}
        disabled={nextWeekDisabled}
      >
        Next Week
      </button>
    </div>
  );
};

export default EventCalendar;
