import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadharNo: '',
    age: '',
    gender: '',
    appointmentDate: '',
    appointmentTime: '',
    assignedDoctor: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.aadharNo.length !== 12) {
      toast.error('Aadhar number must be 12 digits');
      return;
    }

    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      toast.error('Enter a valid 10-digit phone number');
      return;
    }

    if (formData.age < 0 || formData.age > 120) {
      toast.error('Enter a valid age (0-120)');
      return;
    }

    toast.success('Patient registered successfully!');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">New Patient Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              pattern="[A-Za-z\s]+"
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              maxLength="10"
              pattern="\d{10}"
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
            <input
              type="text"
              maxLength="12"
              pattern="\d{12}"
              className="input-field"
              value={formData.aadharNo}
              onChange={(e) => setFormData({...formData, aadharNo: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              min="0"
              max="120"
              className="input-field"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="input-field"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="date"
              className="input-field"
              min={new Date().toISOString().split("T")[0]}
              value={formData.appointmentDate}
              onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
            <input
              type="time"
              className="input-field"
              value={formData.appointmentTime}
              onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned Doctor</label>
            <input
              type="text"
              className="input-field"
              value={formData.assignedDoctor}
              onChange={(e) => setFormData({...formData, assignedDoctor: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
