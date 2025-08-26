"use client";

import React, { useState } from "react";
import "./page.css";

type Item = {
  id: number;
  name: string;
  email: string;
};

export default function CrudPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editId !== null) {
      setItems(
        items.map((item) =>
          item.id === editId ? { ...item, name, email } : item
        )
      );
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), name, email }]);
    }

    setName("");
    setEmail("");
  };

  const handleEdit = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setName(item.name);
      setEmail(item.email);
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-75">
        <h1 className="text-center mb-4">Static CRUD Example</h1>

        <form onSubmit={handleSubmit} className="row g-2 mb-4">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4 d-grid">
            <button type="submit" className="btn btn-primary">
              {editId !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>

        {/* Table */}
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-muted">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
