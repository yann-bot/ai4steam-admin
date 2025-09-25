import React from "react";
import {Application} from '@prisma/client';

type ApplicationListProps = {
   applications: Application[];
   isLoading: boolean;
   onRowClick?: (applicationsId: string) => void;
   selectedIds?: string[];
}


const ApplicationList: React.FC<ApplicationListProps> = ({applications, onRowClick, selectedIds, isLoading})  => {
    if (isLoading) {
        return (
            <div className="overflow-y-auto max-h-screen ">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-800 sticky top-0 text-slate-100">
                        <th className="p-2 border-b w-6">
                            <input
                                type="checkbox"
                                checked={selectedIds?.length === applications.length && applications.length > 0}
                                onChange={() => {
                                    // à gérer dans le parent si besoin
                                }}
                            />
                        </th>
                        <th className="text-left p-2 border-b">Nom</th>
                        <th className="text-left p-2 border-b">Statut</th>
                        <th className="text-left p-2 border-b">Date de soumission</th>
                        <th className="text-left p-2 border-b">Ville</th>
                    </tr>
                    </thead>
                    <tbody className="space-y-2">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <tr key={i} className="bg-white rounded shadow-sm">
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds?.length === applications.length && applications.length > 0}
                                    onChange={() => {
                                        // à gérer dans le parent si besoin
                                    }}
                                />
                            </td>
                            <td className="p-2">
                                <div className="bg-gray-300 h-6 rounded animate-pulse w-full"></div>
                            </td>
                            <td className="p-2">
                                <div className="bg-gray-300 h-6 rounded animate-pulse w-full"></div>
                            </td>
                            <td className="p-2">
                                <div className="bg-gray-300 h-6 rounded animate-pulse w-full"></div>
                            </td>
                            <td className="p-2">
                                <div className="bg-gray-300 h-6 rounded animate-pulse w-full"></div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }



    return (
        <div className="overflow-y-auto max-h-screen ">
            <table className="w-full border-collapse">
                <thead className="">
                <tr>
                    <th className="p-2 w-6">
                        <input
                            type="checkbox"
                            checked={selectedIds?.length === applications.length && applications.length > 0}
                            onChange={() => {console.log("Checking for application list")}}
                        />
                    </th>
                    <th className="text-left  pl-5">NOM</th>
                    <th className="text-left  pl-5">STATUT</th>
                    <th className="text-left  pl-5">DATE DE SOUMISSIOM</th>
                    <th className="text-left  pl-5">VILLE</th>
                </tr>
                </thead>

                <tbody>
                {
                    applications.map((app: Application)  => (
                        <tr  key={app.id} onClick={() => onRowClick?.(app.id)} className="cursor-pointer hover:bg-slate-900">
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds?.includes(app.id)}
                                    onChange={(e) => e.stopPropagation()}
                                />
                            </td>
                            <td className="text-left p-2 border-b">{app.firstName.toUpperCase()} {app.lastName.toUpperCase()}</td>
                            <td className="text-left p-2 border-b">{app.status.toUpperCase()}</td>
                            <td className="text-left p-2 border-b">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : '-'}</td>
                            <td className="text-left p-2 border-b">{app.city ? app.city.toUpperCase() : "-"}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

    )

}


export default  ApplicationList;