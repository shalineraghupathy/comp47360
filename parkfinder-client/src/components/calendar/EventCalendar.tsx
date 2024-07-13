import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import "./EventCalendar.css";
import CustomFooter from "../home/CustomFooter";

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

  const formatDateForDisplay = (date: Date) => {
    const month = date.toLocaleString("default", { month: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} ${month}`;
  };

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
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
          `http://34.245.187.188:8084/events?dates=${formattedDate}`,
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
    (currentDate.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  const prevWeekDisabled = weeksFromToday <= -maxWeeksBackward;
  const nextWeekDisabled = weeksFromToday >= maxWeeksForward;

  const getCategoryColor = (category: string): string => {
    if (category.includes("concert")) {
      return "#8ab17d";
    } else if (category.includes("community")) {
      return "#2a9d8f";
    } else if (category.includes("conference")) {
      return "#e76f51";
    } else if (category.includes("expo")) {
      return "#6a994e";
    } else if (category.includes("performing-arts")) {
      return "#c05761";
    } else if (category.includes("festival")) {
      return "#c05761";
    } else if (category.includes("sport")) {
      return "#e9c46a";
    } else {
      return "black";
    }
  };

  const changeCatName = (category: string): string => {
    if (category.includes("concert")) {
      return "Concert";
    } else if (category.includes("community")) {
      return "Community";
    } else if (category.includes("conference")) {
      return "Conference";
    } else if (category.includes("expo")) {
      return "Expo";
    } else if (category.includes("performing-arts")) {
      return "Performing Arts";
    } else if (category.includes("festival")) {
      return "Festival";
    } else if (category.includes("sport")) {
      return "Sports";
    } else {
      return "General";
    }
  };

  return (
    <div className="cal-page">
      <Container className="text-center my-4">
        <Row className="align-items-center">
          <Col xs={6} className="text-start">
            <span className="event-heading">
              <i
                className="fa fa-calendar-o"
                aria-hidden="true"
                style={{ marginRight: "1rem" }}
              ></i>
              Events at Central Park
            </span>
          </Col>
          <Col xs={6} className="text-end">
            <Button
              variant="success"
              onClick={handlePrevWeek}
              disabled={prevWeekDisabled}
              size="sm"
              className="rounded-circle me-1"
            >
              <FaChevronLeft />
            </Button>
            <span className="mx-2 week-of">
              Week of {formatDateForDisplay(getWeekDates(currentDate)[0])} -{" "}
              {formatDateForDisplay(getWeekDates(currentDate)[6])}
            </span>
            <Button
              variant="success"
              onClick={handleNextWeek}
              disabled={nextWeekDisabled}
              size="sm"
              className="rounded-circle ms-1"
            >
              <FaChevronRight />
            </Button>
          </Col>
        </Row>
      </Container>
      <div id="day-container">
        {getWeekDates(currentDate).map((date) => (
          <div
            key={date.toDateString()}
            className={`day ${
              date.toDateString() === today.toDateString() ? "today" : ""
            }`}
          >
            <p className="day-name">{getDayName(date)}</p>
            <p className="date-per-day">{formatDateForDisplay(date)}</p>
            {events[formatDate(date)]?.map((event) => (
              <OverlayTrigger
                key={event.id}
                placement="bottom"
                overlay={<Tooltip>{changeCatName(event.category)}</Tooltip>}
              >
                <div
                  key={event.id}
                  className="event"
                  style={{
                    borderTop: `5px solid ${getCategoryColor(event.category)}`,
                  }}
                >
                  <h4>{event.title}</h4>
                  <p style={{ color: "seagreen" }}>
                    {formatTime(event.startLocal)}- {formatTime(event.endLocal)}
                  </p>
                  <p className="address" style={{ fontSize: "0.7rem" }}>
                    {event.address}
                  </p>
                </div>
              </OverlayTrigger>
            ))}
          </div>
        ))}
      </div>
      <CustomFooter />
    </div>
  );
};

export default EventCalendar;
