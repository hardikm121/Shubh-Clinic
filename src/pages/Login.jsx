import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockUsers = {
      'doc@gmail.com': {
        id: 101,
        name: 'Dr. Ramesh Kumar',
        role: 'doctor',
        email: 'doc@gmail.com',
        password: 'doc123'
      },
      'rec@gmail.com': {
        id: 102,
        name: 'Priya Sharma',
        role: 'receptionist',
        email: 'rec@gmail.com',
        password: 'rec123'
      },
      'pat@gmail.com': {
        id: 103,
        name: 'Rahul Mehta',
        role: 'patient',
        email: 'pat@gmail.com',
        password: 'pat123'
      }
    };
    mockUsers["upsc@gmail.com"]={
      id:104,
      name: 'ups',
      role: 'patient',
      email: 'upsc@gmail.com',
      password: 'upsc123'
    };
    const user = mockUsers[formData.email];

    if (user && formData.password === user.password) {
      login(user);
      toast.success('Login successful!');

      switch (user.role) {
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'receptionist':
          navigate('/receptionist-dashboard');
          break;
        case 'patient':
          navigate('/patient-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6 shadow-md rounded-xl border">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="input-field w-full p-2 border rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="input-field w-full p-2 border rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full bg-blue-600 text-white p-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
