import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Customers from './Customers';

const Dashboard = ({ token, onLogout }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (error) {
      console.error('Dashboard error:', error);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>📊 Dashboard</h1>
          <button className="btn" onClick={onLogout}>Logout</button>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalCustomers || 0}</div>
            <div>Total Customers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalOrders || 0}</div>
            <div>Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingOrders || 0}</div>
            <div>Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${stats.totalRevenue?.toFixed(2) || 0}</div>
            <div>Revenue</div>
          </div>
        </div>
      </div>
      <Customers token={token} />
    </div>
  );
};

export default Dashboard;