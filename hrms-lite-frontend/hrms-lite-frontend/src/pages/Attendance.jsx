import AttendanceMark from "../components/AttendanceMark";
import AttendanceMonthView from "../components/AttendanceMonthView";

export default function Attendance() {
  return (
    <div className="p-6 space-y-6">
      <AttendanceMark />
      <AttendanceMonthView />
      
    </div>
  );
}
