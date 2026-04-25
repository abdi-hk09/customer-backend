import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';

const CustomerDetail = ({ customer, token, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [customer]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/customer/${customer.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Orders error:', error);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>📋 Orders for {customer.name}</h3>
        <button className="btn btn-danger" onClick={onClose}>Close</button>
      </div>
      
      <button className="btn" onClick={() => setShowOrderForm(true)} style={{ marginBottom: '20px' }}>
        + Add Order
      </button>

      {showOrderForm && (
        <OrderForm 
          customerId={customer.id}
          token={token}
          onClose={() => setShowOrderForm(false)}
          onOrderAdded={fetchOrders}
        />
      )}

      <div className="grid">
        {orders.map(order => (
          <div key={order.id} className="customer-item">
            <div>
              <h4>{order.item_name}</h4>
              <p>💰 ${order.price}</p>
              <p>{order.status === 'paid' ? '✅ Paid' : '⏳ Pending'}</p>
            </div>
            {order.status === 'pending' && (
              <button 
                className="btn"
                onClick={async () => {
                  await axios.put(`http://localhost:5000/api/orders/${order.id}`, 
                    { status: 'paid' }, 
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  fetchOrders();
                }}
              >
                Mark Paid
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetail;