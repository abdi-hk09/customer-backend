import React, { useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 🔴 IMPORTANT: Replace with your real Render URL if different
  const API_URL = "https://customer-backend-5.onrender.com";

  // Load customers
  useEffect(() => {
    fetch(`${API_URL}/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, []);

  // Add customer
  const addCustomer = async () => {
    if (!name || !phone) {
      alert("Please enter name and phone");
      return;
    }

    const res = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    });

    const newCustomer = await res.json();

    setCustomers([...customers, newCustomer]);
    setName("");
    setPhone("");
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    await fetch(`${API_URL}/customers/${id}`, {
      method: "DELETE",
    });

    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Customer Manager</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={addCustomer} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      <ul>
        {customers.map((c) => (
          <li key={c.id} style={{ marginBottom: "10px" }}>
            {c.name} - {c.phone}
            <button
              onClick={() => deleteCustomer(c.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;