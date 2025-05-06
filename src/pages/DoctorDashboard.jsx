import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import { MdDashboard } from "react-icons/md";
import { format } from 'date-fns';
import {
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css';

function DoctorDashboard() {
  const { appointments, addAppointment } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    type: ''
  });

  const location = useLocation();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    addAppointment({
      ...newAppointment,
      status: 'upcoming'
    });
    setShowAppointmentModal(false);
    setNewAppointment({
      patientName: '',
      date: '',
      time: '',
      type: ''
    });
    toast.success('Appointment added successfully');
  };

  const filteredAppointments = appointments.filter(
    app => app.date === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <div className="flex space-x-4">
          <Link
              to="/doctor-dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <MdDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="patients"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Patient List
            </Link>
            <Link
              to="receptionists"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Receptionist List
            </Link>
            <Link
              to="appointments"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              All Appointments
            </Link>
          </div>
        </div>

        {location.pathname === '/doctor-dashboard' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
                <button
                  onClick={() => setShowAppointmentModal(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  New Appointment
                </button>
              </div>
              <div className="space-y-4">
                {filteredAppointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">{appointment.time} - {appointment.type}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'upcoming'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
                {filteredAppointments.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No appointments for this date
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Calendar</h2>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="w-full border-none"
              />
            </div>
          </div>
        )}

        <Outlet />

        {/* New Appointment Modal */}
        {showAppointmentModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">New Appointment</h2>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={newAppointment.patientName}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, patientName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={newAppointment.type}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, type: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="General">General</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    Add Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
