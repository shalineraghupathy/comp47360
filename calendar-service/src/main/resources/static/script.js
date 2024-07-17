document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('day-container');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');

    const today = new Date();
    let currentDate = new Date();
    const maxWeeksForward = 4;
    const maxWeeksBackward = 1;

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getWeekDates(date) {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        return [...Array(7)].map((_, i) => {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            return d;
        });
    }

    function getDayName(date) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    function renderCalendar(dates) {
        calendar.innerHTML = '';
        dates.forEach(date => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            if (date.toDateString() === today.toDateString()) {
                dayDiv.classList.add('today');
            }
            dayDiv.innerHTML = `
                <h3>${getDayName(date)}</h3>
                <h2>${formatDate(date)}</h2>`;
            calendar.appendChild(dayDiv);

            fetch(`/events?dates=${formatDate(date)}`)
                .then(response => response.json())
                .then(events => {
                    events[formatDate(date)].forEach(event => {
                        const eventDiv = document.createElement('div');
                        eventDiv.className = 'event';
                        eventDiv.innerHTML = `
                            <h4>${event.title}</h4>
                            <p>Category: ${event.category}</p>
                            <p>Start: ${event.startLocal}</p>
                            <p>End: ${event.endLocal}</p>
                            <p>Address: ${event.address}</p>
                        `;
                        dayDiv.appendChild(eventDiv);
                    });
                })
                .catch(error => console.error('Error fetching events:', error));
        });
    }

    function updateCalendar() {
        const weekDates = getWeekDates(new Date(currentDate));
        renderCalendar(weekDates);

        const weeksFromToday = Math.floor((currentDate - today) / (7 * 24 * 60 * 60 * 1000));

        prevWeekButton.disabled = weeksFromToday <= -maxWeeksBackward;
        nextWeekButton.disabled = weeksFromToday >= maxWeeksForward;
    }

    prevWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        updateCalendar();
    });

    nextWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        updateCalendar();
    });

    updateCalendar();
});
