

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { href: "/dashboard", label: "📋 Candidatures" },
  { href: "/dashboard/shortlist", label: "⭐ Shortlist" },
    { href: "#", label: " ⚙️ Paramètres" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64   border-r  border-slate-500 bg-slate-900">
      <div className=" flex flex-col items-center gap-3 p-6 border-b border-slate-500 ">
        <div className="text-xl font-bold text-blue-600"><Image src={"/logo_i4steam.svg"} width={150} height={150} alt={"logo"}/></div>
        <p className="text-sm  text-white">Admin Dashboard</p>
      </div>
      <nav className="p-4 space-y-2 ">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-lg px-4 py-2 text-slate-100 ${
              pathname === link.href
                ? "  bg-blue-500 text-black font-medium"
                : "text-gray-700 hover:bg-slate-400 hover:text-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
