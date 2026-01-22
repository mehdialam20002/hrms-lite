export default function StatCard({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}
