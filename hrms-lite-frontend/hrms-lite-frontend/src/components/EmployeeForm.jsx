import { useState } from "react";
import api from "../services/api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/employees", form);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Add Employee</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key.replace("_", " ").toUpperCase()}
            className="border p-2 rounded"
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}
      </div>
      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
        Add Employee
      </button>
    </form>
  );
}
