import { useState } from "react";
import api from "../services/api";

export default function AttendanceForm() {
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const submit = async (e) => {
    e.preventDefault();
  try {
  await api.post("/attendance", payload);
  alert("Attendance saved / updated successfully");
  fetchAttendance();
} catch (err) {
  alert("Failed to save attendance");
}

  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Mark Attendance</h2>

      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Employee ID"
          className="border p-2 rounded"
          value={data.employee_id}
          onChange={(e) =>
            setData({ ...data, employee_id: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={data.date}
          onChange={(e) =>
            setData({ ...data, date: e.target.value })
          }
        />

        <select
          className="border p-2 rounded"
          value={data.status}
          onChange={(e) =>
            setData({ ...data, status: e.target.value })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="bg-green-600 text-white px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
