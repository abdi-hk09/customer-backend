import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ token, onClose, onCustomerAdded }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/customers', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onCustomerAdded();
      onClose();
    } catch (error) {
      console.error('Add customer error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <h3>Add New Customer</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Customer Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <textarea
          className="input"
          placeholder="Notes"
          rows="3"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Customer'}
          </button>
          <button type="button" className="btn btn-danger" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;