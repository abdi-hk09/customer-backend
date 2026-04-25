import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ customerId, token, onClose, onOrderAdded }) => {
  const [formData, setFormData] = useState({ item_name: '', price: '', status: 'pending' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/orders', {
        ...formData,
        customer_id: customerId,
        price: parseFloat(formData.price)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onOrderAdded();
      onClose();
    } catch (error) {
      console.error('Add order error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <h4>Add Order</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Item Name"
          value={formData.item_name}
          onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Price (e.g. 29.99)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Order'}
          </button>
          <button type="button" className="btn btn-danger" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;