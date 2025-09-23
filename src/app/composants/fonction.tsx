"use client";

import React from "react";

type ApplicationFilterProps = {
    search: string;
    setSearch: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    onShortlist: () => void;
    onAccept: () => void;
    onReject: () => void;
    onExportCSV: () => void;
    onSearch: () => void; // ✅ nouveau prop pour lancer la recherche
};

const ApplicationFilter: React.FC<ApplicationFilterProps> = ({search, setSearch, statusFilter, setStatusFilter, onShortlist, onAccept, onReject, onExportCSV, onSearch, }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
            {/* Recherche */}
            <div className="flex gap-2 w-full md:w-auto flex-1">
                <input type="text" placeholder="Rechercher par nom ou email..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded border text-white border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={onSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Rechercher
                </button>
            </div>

            {/* Filtre statut */}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-64 rounded border  bg-black  text-white border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="ALL">Tous les statuts</option>
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="WAITLISTED">Waitlisted</option>
                <option value="REJECTED">Rejected</option>
            </select>

            {/* Actions de masse */}
            <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={onShortlist} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Ajouter à la shortlist
                </button>
                <button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Accepter
                </button>
                <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Refuser
                </button>
                <button onClick={onExportCSV} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Export CSV
                </button>
            </div>
        </div>
    );
};

export default ApplicationFilter;
