import { useState, useEffect } from "react";

function Customers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState([]);

  // LOAD customers from backend
  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  // ADD customer to backend
  async function addCustomer() {
    if (name === "" || phone === "") return;

    await fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    });

    // reload list after adding
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));

    setName("");
    setPhone("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customers Page</h2>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={addCustomer}>Add Customer</button>
      </div>

      {/* LIST */}
      <h3>Customer List</h3>

      {customers.length === 0 ? (
        <p>No customers yet</p>
      ) : (
        customers.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px" }}>
            <b>{c.name}</b> - {c.phone}
          </div>
        ))
      )}
    </div>
  );
}

export default Customers;