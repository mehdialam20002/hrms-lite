import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import TodayAttendanceList from "./components/TodayAttendanceList";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [todayStatus, setTodayStatus] = useState(null);

  const renderPage = () => {
    if (active === "Employees") return <Employees />;
    if (active === "Attendance") return <Attendance />;
    if (active === "TodayAttendance")
      return <TodayAttendanceList status={todayStatus} />;
    return (
      <Dashboard
        setActive={setActive}
        setTodayStatus={setTodayStatus}
      />
    );
  };

  return (
    <div className="flex">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 bg-gray-100 min-h-screen">
        {renderPage()}
      </div>
    </div>
  );
}
