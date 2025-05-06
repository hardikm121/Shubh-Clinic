import { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import PropTypes from 'prop-types'; 
import 'react-calendar/dist/Calendar.css';

function AppointmentCalendar({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()}
          className="rounded-lg border-none shadow-sm"
        />
      </div>
      <style>{`
        .calendar-wrapper :global(.react-calendar) {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .calendar-wrapper :global(.react-calendar__tile--active) {
          background: #0ea5e9;
          color: white;
        }
        .calendar-wrapper :global(.react-calendar__tile--now) {
          background: #e0f2fe;
        }
      `}</style>
    </div>
  );
}

AppointmentCalendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
};

export default AppointmentCalendar;
