"use client";

import { useState } from "react";
import ApplicationFilter from "../composants/actionMasse";
type Application = {
  id: string;
  name: string;
  email: string;
  status: string;
  submittedAt: string;
};


export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");



  return (
    <div className="text-white ">
        <ApplicationFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onSearch={() => console.log("Recherche")}
            onShortlist={() => console.log("Shortlist")}
            onAccept={() => console.log("Accept")}
            onReject={() => console.log("Reject")}
            onExportCSV={() => console.log("Export CSV")}
            onChangeStatus={(newStatus: string) => console.log("Changer status")}
            selectedCount={0} />
    </div>
  );
}
