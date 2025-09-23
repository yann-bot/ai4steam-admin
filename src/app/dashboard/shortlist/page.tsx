



"use client";

import { useState } from "react";

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
    status: "SHORTLISTED",
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
    status: "SHORTLISTED",
    submittedAt: "2025-09-18",
  },
];

export default function ShortlistPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ✅ Ne garder que les SHORTLISTED
  const filteredData = sampleData.filter(
    (app) =>
      app.status === "SHORTLISTED" &&
      (app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase()))
  );

  // ✅ Vérifie si tout est sélectionné
  const allSelected =
    filteredData.length > 0 &&
    filteredData.every((app) => selectedIds.includes(app.id));

  // ✅ Toggle "select all"
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((app) => app.id));
    }
  };

  // ✅ Toggle une seule candidature
  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">Candidatures Shortlistées</h1>

    </div>
  );
}
