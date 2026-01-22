export default function AttendanceTable({ employee, records }) {
  if (!employee) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Attendance Records</h2>
        <p className="text-sm text-gray-500">
          Employee:{" "}
          <span className="font-medium text-gray-800">
            {employee.name} (ID: {employee.id})
          </span>
        </p>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No attendance records found
        </div>
      ) : (
        <div className="overflow-hidden border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Day</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, index) => {
                const day = new Date(r.date).toLocaleDateString("en-US", {
                  weekday: "long",
                });

                return (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {r.date}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {day}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          r.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
