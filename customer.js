import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';
import CustomerDetail from './CustomerDetail';

const Customers = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(res.data);
    } catch (error) {
      console.error('Customers error:', error);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading customers...</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>👥 Customers ({customers.length})</h2>
        <button className="btn" onClick={() => setShowForm(true)}>
          + Add Customer
        </button>
      </div>

      {showForm && (
        <CustomerForm 
          token={token} 
          onClose={() => setShowForm(false)}
          onCustomerAdded={fetchCustomers}
        />
      )}

      <div className="grid">
        {customers.map(customer => (
          <div key={customer.id} className="customer-item">
            <div>
              <h3>{customer.name}</h3>
              <p>📱 {customer.phone}</p>
              <p>{customer.notes}</p>
            </div>
            <button 
              className="btn"
              onClick={() => setSelectedCustomer(customer)}
            >
              View Orders
            </button>
          </div>
        ))}
      </div>

      {selectedCustomer && (
        <CustomerDetail 
          customer={selectedCustomer}
          token={token}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;