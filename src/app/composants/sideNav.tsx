

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "📋 Candidatures" },
  { href: "/dashboard/shortlist", label: "⭐ Shortlist" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64   border-r  border-slate-500 bg-slate-800">
      <div className="p-6 border-b border-slate-500 ">
        <h1 className="text-xl font-bold text-blue-600">AI4STEAM</h1>
        <p className="text-sm text-white">Admin Dashboard</p>
      </div>
      <nav className="p-4 space-y-2 ">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-lg px-4 py-2 text-white ${
              pathname === link.href
                ? "  bg-blue-500 text-black font-medium"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
