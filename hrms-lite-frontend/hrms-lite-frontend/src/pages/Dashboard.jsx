import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../services/api";

export default function Dashboard({ setActive, setTodayStatus }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      <StatCard
        title="Total Employees"
        value={stats.total_employees}
        onClick={() => setActive("Employees")}
      />

      <StatCard
        title="Present Today"
        value={stats.present_today}
        onClick={() => {
          setTodayStatus("Present");
          setActive("TodayAttendance");
        }}
      />

      <StatCard
        title="Absent Today"
        value={stats.absent_today}
        onClick={() => {
          setTodayStatus("Absent");
          setActive("TodayAttendance");
        }}
      />

      <StatCard
        title="This Month %"
        value={`${Math.round(
          (stats.present_today / stats.total_employees) * 100
        )}%`}
      />
    </div>
  );
}
