import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddAppointmentForm({ onClose, onAdd }) {
  const [form, setForm] = useState({
    patient: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form); // Pass data to parent
    toast.success('Appointment added!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">New Appointment</h2>
      <input name="patient" onChange={handleChange} placeholder="Patient Name" className="w-full border p-2 rounded" required />
      <input name="date" type="date" onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="time" type="time" onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="reason" onChange={handleChange} placeholder="Reason" className="w-full border p-2 rounded" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
    </form>
  );
}

AddAppointmentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
