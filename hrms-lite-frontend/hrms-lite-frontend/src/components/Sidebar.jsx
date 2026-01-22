export default function Sidebar({ active, setActive }) {
  const menu = ["Dashboard", "Employees", "Attendance"];

  return (
    <div className="w-60 bg-blue-700 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">HRMS Lite</h1>

      {menu.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`block w-full text-left px-4 py-2 rounded mb-2 ${
            active === item ? "bg-blue-900" : "hover:bg-blue-600"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
