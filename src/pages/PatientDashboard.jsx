import { useState } from 'react';
import toast from 'react-hot-toast';

function PatientDashboard() {
  const [profile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh@gmail.com',
    phone: '+91 98765 43210',
    age: 35,
    gender: 'Male',
    bloodGroup: 'B+',
    assignedDoctor: 'Dr. Sharma',
    aadharNo: '1234 5678 9012',
    address: 'B-12, Sector 15, Noida, UP',
    emergencyContact: '+91 98765 43211',
    medicalHistory: 'Diabetes'
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-04-10',
      time: '10:00',
      doctor: 'Dr. Sharma',
      status: 'upcoming',
      prescription: {
        id: 1,
        medications: [
          { name: 'Paracetamol', dosage: '1 tablet', frequency: 'Twice a day', duration: '5 days' },
          { name: 'Cetrizine', dosage: '1 tablet', frequency: 'Before bedtime', duration: '3 days' }
        ],
        notes: 'Take after food, get enough rest'
      }
    },
    {
      id: 2,
      date: '2025-04-02',
      time: '14:30',
      doctor: 'Dr. Gupta',
      status: 'completed',
      prescription: {
        id: 2,
        medications: [
          { name: 'Azithromycin', dosage: '1 tablet', frequency: 'Once a day', duration: '5 days' }
        ],
        notes: 'Avoid dairy products'
      }
    }
  ]);

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDateTime, setNewDateTime] = useState({ date: '', time: '' });

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.map(app =>
      app.id === id ? { ...app, status: 'cancelled' } : app
    ));
    toast.success('Appointment cancelled');
  };

  const handleRescheduleAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDateTime({ date: appointment.date, time: appointment.time });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setAppointments(appointments.map(app =>
      app.id === selectedAppointment.id
        ? { ...app, date: newDateTime.date, time: newDateTime.time }
        : app
    ));
    toast.success('Appointment rescheduled');
    setShowRescheduleModal(false);
  };

  const handleDownloadPrescription = (prescription) => {
    const prescriptionText = `
Prescription Details:
Date: ${new Date().toLocaleDateString()}

Medications:
${prescription.medications.map(med =>
      `- ${med.name}
   Dosage: ${med.dosage}
   Frequency: ${med.frequency}
   Duration: ${med.duration}`
    ).join('\n\n')}

Special Instructions: ${prescription.notes}
    `;

    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription_${prescription.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Prescription downloaded');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patient Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhar No.</p>
                <p className="font-medium">{profile.aadharNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{profile.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{profile.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">{profile.bloodGroup}</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{profile.address}</p>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">Doctor</p>
              <p className="font-medium">{profile.assignedDoctor}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">
                      Date: {appointment.date} | Time: {appointment.time}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
                      appointment.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status === 'upcoming' ? 'Upcoming' :
                        appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {appointment.status === 'upcoming' && (
                      <>
                        <button
                          onClick={() => handleRescheduleAppointment(appointment)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.prescription && (
                      <button
                        onClick={() => handleDownloadPrescription(appointment.prescription)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Download Prescription
                      </button>
                    )}
                  </div>
                </div>
                {appointment.prescription && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">Prescription</p>
                    <div className="space-y-2">
                      {appointment.prescription.medications.map((med, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">{med.name}</p>
                          <p className="text-gray-600">
                            {med.dosage} - {med.frequency} ({med.duration})
                          </p>
                        </div>
                      ))}
                      <p className="text-sm text-gray-600 mt-2">
                        Special Instructions: {appointment.prescription.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={newDateTime.date}
                  onChange={(e) => setNewDateTime({ ...newDateTime, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <input
                  type="time"
                  className="input-field"
                  value={newDateTime.time}
                  onChange={(e) => setNewDateTime({ ...newDateTime, time: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
