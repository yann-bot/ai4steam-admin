"use client";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-slate-800 shadow px-6 py-4">
      <h2 className="text-lg font-semibold text-white"> Bienvenue sur votre Tableau de bord</h2>
      <div className="flex items-center space-x-4">
        <span className="text-white rounded-full p-1 border border-slate-100 ">YO</span>
        <button className="bg-red-500 rounded-2xl px-3 py-1 text-white hover:bg-red-600">Déconnexion</button>
      </div>
    </header>
  );
}
