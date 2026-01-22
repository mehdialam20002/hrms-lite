import { useEffect, useState } from "react";
import api from "../services/api";

export default function AttendanceMonthView() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const selectedEmployee = employees.find(
    (e) => e.id === Number(empId)
  );

  const fetchData = async () => {
    if (!empId) return;
    const res = await api.get(`/attendance/${empId}`);
    setRecords(res.data);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Attendance Records</h3>

      <div className="flex gap-3 mb-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setEmpId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name} ({e.employee_id})
            </option>
          ))}
        </select>

        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Fetch
        </button>
      </div>

      {selectedEmployee && (
        <p className="mb-2 text-gray-600">
          <strong>Employee:</strong> {selectedEmployee.full_name} (
          {selectedEmployee.employee_id})
        </p>
      )}

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="text-center">
              <td>{r.date}</td>
              <td
                className={
                  r.status === "Present"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
