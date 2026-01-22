import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployeeTable({ refresh }) {
  const [employees, setEmployees] = useState([]);

  const load = () => {
    api.get("/employees").then((res) => setEmployees(res.data));
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const remove = async (id) => {
    if (!confirm("Delete employee?")) return;
    await api.delete(`/employees/${id}`);
    load();
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Employee Directory</h2>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Email</th>
            <th className="p-3">Department</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, i) => (
            <tr
              key={e.id}
              className={`border-t hover:bg-gray-50 ${
                i % 2 ? "bg-gray-50/50" : ""
              }`}
            >
              <td className="p-3 font-medium">
                {e.full_name}
                <div className="text-xs text-gray-500">
                  ID: {e.employee_id}
                </div>
              </td>
              <td className="p-3">{e.email}</td>
              <td className="p-3">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {e.department}
                </span>
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => remove(e.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
