import { useState } from 'react';
import PropTypes from 'prop-types';

function AddReceptionistForm({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReceptionist = {
      id: Date.now(),
      name,
      email,
      phone,
      joinDate: new Date().toISOString().split('T')[0]
    };
    onAdd(newReceptionist);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Add Receptionist</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Add</button>
      </div>
    </form>
  );
}

AddReceptionistForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddReceptionistForm;
