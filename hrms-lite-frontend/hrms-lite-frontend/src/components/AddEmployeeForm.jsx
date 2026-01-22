import { useState } from "react";
import api from "../services/api";

export default function AddEmployeeForm({ onAdded }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

 const submit = async (e) => {
  e.preventDefault();

  if (
    !form.employee_id ||
    !form.full_name ||
    !form.email ||
    !form.department
  ) {
    alert("All fields are required");
    return;
  }

  try {
    await api.post("/employees", form);

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });

    onAdded();
    alert("Employee added successfully");
  } catch (err) {
    if (err.response && err.response.data?.detail) {
      alert(err.response.data.detail); // 👈 REAL reason
    } else {
      alert("Failed to add employee");
    }
  }
};


  return (
    <div className="bg-white rounded-lg shadow p-5 mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

      <form className="grid grid-cols-4 gap-4" onSubmit={submit}>
        <input
          type="text"
          placeholder="Employee ID (EMP001)"
          className="border p-2 rounded"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Department"
          className="border p-2 rounded"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />

        <div className="col-span-4 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}
