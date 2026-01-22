import { useState } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="p-6">
      <AddEmployeeForm onAdded={() => setRefresh((r) => r + 1)} />
      <EmployeeTable refresh={refresh} />
    </div>
  );
}
