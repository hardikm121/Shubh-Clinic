import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddPatientForm({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form); 
    toast.success('Patient added!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add Patient</h2>
      <input name="name" onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" required />
      <input name="age" type="number" onChange={handleChange} placeholder="Age" className="w-full border p-2 rounded" required />
      <input name="gender" onChange={handleChange} placeholder="Gender" className="w-full border p-2 rounded" required />
      <input name="bloodGroup" onChange={handleChange} placeholder="Blood Group" className="w-full border p-2 rounded" required />
      <input name="phone" onChange={handleChange} placeholder="Phone Number" className="w-full border p-2 rounded" required />
      <input name="email" onChange={handleChange} placeholder="Email Address" className="w-full border p-2 rounded" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
    </form>
  );
}

AddPatientForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
