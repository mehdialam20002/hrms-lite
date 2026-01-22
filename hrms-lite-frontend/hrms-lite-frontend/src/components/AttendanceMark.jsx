import { useEffect, useState } from "react";
import api from "../services/api";

export default function AttendanceMark() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const submit = async () => {
    if (!form.employee_id || !form.date) {
      alert("Select employee & date");
      return;
    }

    await api.post("/attendance", {
      employee_id: Number(form.employee_id),
      date: form.date,
      status: form.status,
    });

    alert("Attendance marked");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Mark Attendance</h3>

      <div className="grid grid-cols-4 gap-3">
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name} ({e.employee_id})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button
          onClick={submit}
          className="bg-green-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
