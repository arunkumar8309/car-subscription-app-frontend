import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // For interactions like clicking

import { getSubscriptionDetails } from './../api/apiService'; // Assuming this API service is correct
import { useParams } from 'react-router-dom';

// Define color coding for events
const getColorByType = (type) => {
  switch (type) {
    case 'interior':
      return '#FF9F00'; // Color for interior cleaning
    case 'exterior':
      return '#00A3E0'; // Color for exterior cleaning
    case 'completed':
      return '#4CAF50'; // Color for completed cleaning
    default:
      return '#CCC'; // Default color
  }
};

const CalendarView = () => {
  const { userId } = useParams(); // Fetch user ID from URL parameters
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if(userId){
    const fetchUserDetails = async () => {
      try {
        const response = await getSubscriptionDetails(userId);
        
        // Map the services data to create event objects
        setEvents(response.data.services.map(service => ({
          title: `${service.type === 'Interior Cleaning' ? 'Interior Cleaning' : 'Exterior Cleaning'}`,
          start: service.date,
          color: getColorByType(service.type),
          allDay: false // Ensure the event shows up as time-specific, not all-day
        })));
      } catch (error) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }

  }, [userId]);

  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  if (loading) return <p className="text-center"></p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">User's Subscription Calendar</h2>
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" // Default view
          timeZone="Asia/Kolkata" // Set time zone to Kolkata (IST)
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true // Ensures AM/PM format
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short' // Adds AM/PM format to the event times
          }}
          events={events}
          dateClick={handleDateClick} // Handle date clicks
          eventContent={renderEventContent} // Custom rendering of event content
          // This callback allows you to access the calendar view and modify it
          datesSet={(dateInfo) => {
            const { start, end } = dateInfo.view;
            // Optionally add logic to modify or filter dates, if needed
          }}
        />
      </div>
    </div>
  );
};

// Custom render function to improve event text visibility
const renderEventContent = (eventInfo) => {
  return (
    <div className="text-xs font-semibold text-gray-800 dark:text-white">
      {eventInfo.event.title}
    </div>
  );
};

export default CalendarView;
