import SideNav from "../composants/sideNav";
import Header from "../composants/header";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SideNav />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 p-6 bg-slate-950">{children}</main>
      </div>
    </div>
  );
}
