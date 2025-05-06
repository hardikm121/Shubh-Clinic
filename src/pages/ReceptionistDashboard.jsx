import { useState } from 'react';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patient: 'Rajesh Kumar', 
      date: '2025-04-10', 
      time: '10:00', 
      status: 'upcoming', 
      doctor: 'Dr. Sharma',
      aadharNo: '1234 5678 9012',
      symptoms: 'Fever and cold'
    },
    { 
      id: 2, 
      patient: 'Priya Patel', 
      date: '2025-04-01', 
      time: '14:30', 
      status: 'completed', 
      doctor: 'Dr. Gupta',
      aadharNo: '9876 5432 1098',
      symptoms: 'Regular checkup'
    }
  ]);

  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      email: 'rajesh@gmail.com', 
      phone: '+91 98765 43210',
      age: 35,
      gender: 'Male',
      bloodGroup: 'B+',
      problem: 'Fever and cold',
      assignedDoctor: 'Dr. Sharma',
      aadharNo: '1234 5678 9012',
      address: 'B-12, Sector 15, Noida, UP',
      emergencyContact: '+91 98765 43211',
      medicalHistory: 'Diabetes'
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      email: 'priya@gmail.com', 
      phone: '+91 87654 32109',
      age: 28,
      gender: 'Female',
      bloodGroup: 'O+',
      problem: 'Regular checkup',
      assignedDoctor: 'Dr. Gupta',
      aadharNo: '9876 5432 1098',
      address: '123, Krishna Colony, Pune, Maharashtra',
      emergencyContact: '+91 87654 32108',
      medicalHistory: 'None'
    }
  ]);

  const [doctors] = useState([
    { 
      id: 1, 
      name: 'Dr. Sharma', 
      specialization: 'General Medicine',
      qualification: 'MBBS, MD',
      regNo: 'MCI-1234'
    },
    { 
      id: 2, 
      name: 'Dr. Gupta', 
      specialization: 'Pediatrics',
      qualification: 'MBBS, MD, DNB',
      regNo: 'MCI-5678'
    },
    { 
      id: 3, 
      name: 'Dr. Verma', 
      specialization: 'Orthopedics',
      qualification: 'MBBS, MS',
      regNo: 'MCI-9012'
    }
  ]);

  const getMinTime = (appointmentDate) => {
  const currentDate = new Date();
  const selectedDate = new Date(appointmentDate);
  if (selectedDate.toDateString() === currentDate.toDateString()) {
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`; 
  }
  return "00:00";
};


  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showEditPatientModal, setShowEditPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    problem: '',
    assignedDoctor: '',
    appointmentDate: '',
    appointmentTime: '',
    aadharNo: '',
    address: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  const handleAddPatient = (e) => {
    e.preventDefault();
    const patientId = Date.now();
    const newPatientData = {
      id: patientId,
      ...newPatient
    };
    
    setPatients([...patients, newPatientData]);

    const newAppointment = {
      id: Date.now(),
      patient: newPatient.name,
      date: newPatient.appointmentDate,
      time: newPatient.appointmentTime,
      status: 'upcoming',
      doctor: newPatient.assignedDoctor,
      aadharNo: newPatient.aadharNo,
      symptoms: newPatient.problem
    };
    setAppointments([...appointments, newAppointment]);

    toast.success('Patient added successfully');
    setShowAddPatientModal(false);
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      bloodGroup: '',
      problem: '',
      assignedDoctor: '',
      appointmentDate: '',
      appointmentTime: '',
      aadharNo: '',
      address: '',
      emergencyContact: '',
      medicalHistory: ''
    });
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowEditPatientModal(true);
  };

  const handleUpdatePatient = (e) => {
    e.preventDefault();
    setPatients(patients.map(p => 
      p.id === selectedPatient.id ? selectedPatient : p
    ));
    toast.success('Patient information updated');
    setShowEditPatientModal(false);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    setAppointments(appointments.filter(a => a.patient !== patients.find(p => p.id === id)?.name));
    toast.success('Patient has been removed');
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.aadharNo.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome (Receptionist Dashboard)</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">List of patients</h2>
            <button
              onClick={() => setShowAddPatientModal(true)}
              className="btn-primary"
            >
              Add new patient
            </button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search patient (Name, Phone, Aadhaar)..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPatients.map(patient => (
              <div key={patient.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.phone}</p>
                    <p className="text-sm text-gray-600">Aadhar: {patient.aadharNo}</p>
                    <p className="text-sm text-gray-500">
                      Doctor: {patient.assignedDoctor}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPatient(patient)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
  <h2 className="text-xl font-semibold mb-4">Today&apos;s Appointments</h2>
  <div className="space-y-4">
    {appointments && appointments.length > 0 ? (
      appointments
        .filter(app => app.date === new Date().toISOString().split('T')[0])
        .map(appointment => (
          <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{appointment.patient}</p>
                <p className="text-sm text-gray-600">
                  Time: {appointment.time} | Doctor: {appointment.doctor}
                </p>
                <p className="text-sm text-gray-600">
                  Symptoms: {appointment.symptoms}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${
                appointment.status === 'upcoming'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </span>
            </div>
          </div>
        ))
    ) : (
      <p className="text-sm text-gray-500">No appointments found.</p>
    )}
  </div>
</div>
</div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add new Patient</h2>
            <form onSubmit={handleAddPatient} className="space-y-4">
            <div>
  <label className="block text-sm font-medium text-gray-700">Name</label>
  <input
    type="text"
    className="input-field"
    value={newPatient.name}
    onChange={(e) => {
      const onlyLetters = e.target.value.replace(/[0-9]/g, ""); 
      setNewPatient({ ...newPatient, name: onlyLetters });
    }}
    required
  />
</div>

              <div>
                   <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
  <input
    type="text"
    pattern="\d{12}"
    maxLength={12}
    title="Enter exactly 12 digits"
    className="input-field"
    placeholder="123456789012"
    value={newPatient.aadharNo}
    onChange={(e) => {
      const onlyDigits = e.target.value.replace(/\D/g, ""); 
      if (onlyDigits.length <= 12) {
        setNewPatient({ ...newPatient, aadharNo: onlyDigits });
      }
    }}
    required
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
  <input
    type="tel"
    className="input-field"
    placeholder="+91"
    value={newPatient.phone}
    onChange={(e) => {
      const phone = e.target.value.replace(/[^\d]/g, "").slice(0, 10); 
      setNewPatient({ ...newPatient, phone });
    }}
    maxLength="10"
    pattern="\d{10}" 
    required
  />
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  required
                />
              </div>
              <div>
  <label className="block text-sm font-medium text-gray-700">Age</label>
  <input
    type="number"
    className="input-field"
    value={newPatient.age}
    onChange={(e) => {
      const value = Math.max(0, Math.min(120, e.target.value)); // Ensure value is between 0 and 120
      setNewPatient({ ...newPatient, age: value });
    }}
    min="0"
    max="120"
    step="1" // Allow only integer values
    required
  />
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  className="input-field"
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  required
                >
                  <option value="">Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  className="input-field"
                  value={newPatient.bloodGroup}
                  onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                  required
                >
                  <option value="">Choose</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  className="input-field"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  required
                  rows="2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medical History</label>
                <textarea
                  className="input-field"
                  value={newPatient.medicalHistory}
                  onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                  rows="2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Symptoms/Problem</label>
                <textarea
                  className="input-field"
                  value={newPatient.problem}
                  onChange={(e) => setNewPatient({...newPatient, problem: e.target.value})}
                  required
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Choose Doctor</label>
                <select
                  className="input-field"
                  value={newPatient.assignedDoctor}
                  onChange={(e) => setNewPatient({...newPatient, assignedDoctor: e.target.value})}
                  required
                >
                  <option value="">Choose</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialization} ({doctor.qualification})
                    </option>
                  ))}
                </select>
              </div>
              <div>
  <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
  <input
    type="date"
    className="input-field"
    value={newPatient.appointmentDate}
    onChange={(e) => setNewPatient({...newPatient, appointmentDate: e.target.value})}
    min={new Date().toISOString().split("T")[0]} 
    required
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
  <input
    type="time"
    className="input-field"
    value={newPatient.appointmentTime}
    onChange={(e) => setNewPatient({...newPatient, appointmentTime: e.target.value})}
    min={getMinTime(newPatient.appointmentDate)}
    required
  />
</div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     {/* Edit Patient Modal */}
{showEditPatientModal && selectedPatient && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Update Patient Information</h2>
      <form onSubmit={handleUpdatePatient} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="input-field"
            value={selectedPatient.name}
            onChange={(e) => setSelectedPatient({...selectedPatient, name: e.target.value})}
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            className="input-field"
            value={selectedPatient.phone}
            onChange={(e) => setSelectedPatient({...selectedPatient, phone: e.target.value})}
            required
          />
        </div>

        {/* Change Doctor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Change Doctor</label>
          <select
            className="input-field"
            value={selectedPatient.assignedDoctor}
            onChange={(e) => setSelectedPatient({...selectedPatient, assignedDoctor: e.target.value})}
            required
          >
            <option value="">Choose</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
          <input
            type="date"
            className="input-field"
            value={selectedPatient.appointmentDate}
            onChange={(e) => setSelectedPatient({...selectedPatient, appointmentDate: e.target.value})}
            min={new Date().toISOString().split("T")[0]} // Restricts to today's date or future
            required
          />
        </div>

        {/* Appointment Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
          <input
            type="time"
            className="input-field"
            value={selectedPatient.appointmentTime}
            onChange={(e) => setSelectedPatient({...selectedPatient, appointmentTime: e.target.value})}
            min={getMinTime(selectedPatient.appointmentDate)} // Calculate min time based on selected date
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowEditPatientModal(false)}
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

export default ReceptionistDashboard;