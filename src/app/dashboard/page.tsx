"use client";

import { useState, useEffect } from "react";
import ApplicationFilter from "../composants/actionMasse";
import ApplicationsList from "@/app/composants/applicationsList";
import {Application} from "@prisma/client";


export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);


    useEffect(() => {
        (async function fetchApplications() {
            setIsLoading(true);
            try {
                const res = await fetch("/api/applications");
                const data: Application[] = await res.json();
                setApplications(data);
            } catch (error) {
                console.error("Erreur fetch applications", error);
            } finally {
                setIsLoading(false);
            }
        })();


    }, []);

  return (
      <div className="flex flex-col">
          <section className="text-white ">
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
                  onChangeStatus={() => console.log("Changer status")}
                  selectedCount={0} />
          </section>
          <section className="">
              <ApplicationsList applications={applications} isLoading={isLoading}  />
          </section>
      </div>

  );
}
