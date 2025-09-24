"use client";

import { useState } from "react";
import ApplicationFilter from "../composants/fonction";
type Application = {
  id: string;
  name: string;
  email: string;
  status: string;
  submittedAt: string;
};

const sampleData: Application[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "SUBMITTED",
    submittedAt: "2025-09-20",
  },
  {
    id: "2",
    name: "Jane Roe",
    email: "jane@example.com",
    status: "ACCEPTED",
    submittedAt: "2025-09-19",
  },
  {
    id: "3",
    name: "Alex Smith",
    email: "alex@example.com",
    status: "REJECTED",
    submittedAt: "2025-09-18",
  },
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");


  const filteredData = sampleData.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || app.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  return (
    <div className="text-white ">
    <ApplicationFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onSearch={() => console.log("je suis un zombie")}
        onShortlist={() => console.log("Shortlist")}
        onAccept={() => console.log("Accept")}
        onReject={() => console.log("Reject")}
        onExportCSV={() => console.log("Export CSV")}
      />
     

    
      
    </div>
  );
}
