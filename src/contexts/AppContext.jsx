import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

// Custom hook to use the context
export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Avi Jain',
      date: '2025-03-20',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'General Checkup'
    },
    {
      id: 2,
      patientName: 'Elvish Yadav',
      date: '2025-03-20',
      time: '11:30 AM',
      status: 'upcoming',
      type: 'Follow-up'
    }
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Avi Jain',
      age: 35,
      gender: 'Male',
      contact: '9922553611',
      email: 'Avi@gmail.com',
      lastVisit: '2025-05-15',
      condition: 'Hypertension'
    },
    {
      id: 2,
      name: 'Elvish Yadav',
      age: 28,
      gender: 'Male',
      contact: '9985769485',
      email: 'elvish@gamil.com',
      lastVisit: '2025-05-18',
      condition: 'Diabetes'
    }
  ]);

  const [receptionists, setReceptionists] = useState([
    {
      id: 1,
      name: 'Pratyush Sahu',
      email: 'pratyush@gmail.com',
      phone: '9954875645',
      shift: 'Morning',
      joinDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Piyush Garg',
      email: 'piyush@gmail.com',
      phone: '9987457214',
      shift: 'Evening',
      joinDate: '2025-02-01'
    }
  ]);

  const addAppointment = (appointment) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now() }]);
  };

  const addPatient = (patient) => {
    setPatients(prev => [...prev, { ...patient, id: Date.now() }]);
  };

  const removePatient = (id) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
  };

  const addReceptionist = (receptionist) => {
    setReceptionists(prev => [...prev, { ...receptionist, id: Date.now() }]);
  };

  const removeReceptionist = (id) => {
    setReceptionists(prev => prev.filter(r => r.id !== id));
  };

  const value = {
    appointments,
    patients,
    receptionists,
    addAppointment,
    addPatient,
    removePatient,
    addReceptionist,
    removeReceptionist 
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
