"use client";

import React, { useState } from "react";

type ApplicationFilterProps = {
    search: string;
    setSearch: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    onShortlist: () => void;
    onAccept: () => void;
    onReject: () => void;
    onExportCSV: () => void;
    onSearch: () => void;
    onChangeStatus: (newStatus: string) => void;
    selectedCount: number;
};

const STATUSES = [
    "DRAFT",
    "SUBMITTED",
    "IN_REVIEW",
    "SHORTLISTED",
    "ACCEPTED",
    "WAITLISTED",
    "REJECTED",
];

const ApplicationFilter: React.FC<ApplicationFilterProps> = ({
                                                                 search,
                                                                 setSearch,
                                                                 statusFilter,
                                                                 setStatusFilter,
                                                                 onShortlist,
                                                                 onAccept,
                                                                 onReject,
                                                                 onExportCSV,
                                                                 onSearch,
                                                                 onChangeStatus,
                                                                 selectedCount,
                                                             }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [step, setStep] = useState<"choose" | "confirm">("choose"); // ✅ étape de la modale

    const handleConfirm = () => {
        if (selectedStatus) {
            onChangeStatus(selectedStatus);
            setShowModal(false);
            setSelectedStatus(null);
            setStep("choose");
        }
    };

    // ✅ Utilitaire pour gérer le style des boutons désactivés
    const buttonClass = (base: string, disabled: boolean) =>
        `${base} px-4 py-2 rounded ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
        }`;

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
                {/* Recherche */}
                <div className="flex gap-2 w-full md:w-auto flex-1">
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 rounded border text-white border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={onSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Rechercher
                    </button>
                </div>

                {/* Filtre statut */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full md:w-64 rounded border bg-black text-white border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ALL">Tous les statuts</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                {/* Actions de masse */}
                <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                        onClick={onShortlist}
                        disabled={selectedCount === 0}
                        className={buttonClass("bg-yellow-500 text-white", selectedCount === 0)}
                    >
                        Ajouter à la shortlist
                    </button>
                    <button
                        onClick={onAccept}
                        disabled={selectedCount === 0}
                        className={buttonClass("bg-green-500 text-white", selectedCount === 0)}
                    >
                        Accepter
                    </button>
                    <button
                        onClick={onReject}
                        disabled={selectedCount === 0}
                        className={buttonClass("bg-red-500 text-white", selectedCount === 0)}
                    >
                        Refuser
                    </button>
                    <button
                        onClick={onExportCSV}
                        disabled={selectedCount === 0}
                        className={buttonClass("bg-blue-500 text-white", selectedCount === 0)}
                    >
                        Export CSV
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        disabled={selectedCount === 0}
                        className={buttonClass("bg-purple-500 text-white", selectedCount === 0)}
                    >
                        Changer statut
                    </button>
                </div>
            </div>

            {/* Modale */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-slate-100 text-slate-700 p-6 rounded-lg shadow-lg w-96">
                        {step === "choose" && (
                            <>
                                <h2 className="text-lg font-bold mb-4">Changer le statut</h2>
                                <div className="flex flex-col gap-2">
                                    {STATUSES.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                setStep("confirm"); // ✅ passe à l'étape confirmation
                                            }}
                                            className={`px-4 py-2 rounded border ${
                                                selectedStatus === status
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </>
                        )}

                        {step === "confirm" && (
                            <>
                                <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                                <p>
                                    Êtes-vous sûr de vouloir changer le statut des{" "}
                                    <b>{selectedCount}</b> candidatures sélectionnées en{" "}
                                    <span className="font-bold text-blue-600">{selectedStatus}</span> ?
                                </p>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        onClick={() => {
                                            setStep("choose");
                                            setSelectedStatus(null);
                                        }}
                                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        Confirmer
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplicationFilter;
