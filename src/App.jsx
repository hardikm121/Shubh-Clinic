import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import ReceptionistDashboard from './pages/ReceptionistDashboard.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import PatientList from './pages/PatientList.jsx';
import ReceptionistList from './pages/ReceptionistList.jsx';
import AppointmentList from './pages/AppointmentList.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/doctor-dashboard"
                element={
                  <PrivateRoute role="doctor">
                    <DoctorDashboard />
                  </PrivateRoute>
                }
              >
                <Route path="patients" element={<PatientList />} />
                <Route path="receptionists" element={<ReceptionistList />} />
                <Route path="appointments" element={<AppointmentList />} />
              </Route>

              <Route
                path="/receptionist-dashboard"
                element={
                  <PrivateRoute role="receptionist">
                    <ReceptionistDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/patient-dashboard"
                element={
                  <PrivateRoute role="patient">
                    <PatientDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
