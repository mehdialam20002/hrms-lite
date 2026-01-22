import { useEffect, useState } from "react";
import api from "../services/api";

export default function TodayAttendanceList({ status }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get(`/attendance/today?status=${status}`)
      .then((res) => setList(res.data));
  }, [status]);

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold mb-4">
        {status} Today
      </h2>

      {list.length === 0 && (
        <p className="text-gray-500">No records today.</p>
      )}

      {list.length > 0 && (
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {e.name}
                  <div className="text-xs text-gray-500">
                    ID: {e.employee_id}
                  </div>
                </td>
                <td className="p-3">{e.department}</td>
                <td
                  className={`p-3 font-semibold ${
                    e.status === "Present"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {e.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
