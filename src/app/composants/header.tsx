"use client";
import {useSession, signOut} from "next-auth/react"

export default function Header() {

    const {data: session} = useSession();

    const getInitial = (email: string) => {
        if (!email) return "?";
        return email[0].toUpperCase();
    };


  return (
    <header className="flex justify-between items-center border-b border-slate-500 bg-slate-900 shadow px-6 py-6 ">
      <h2 className="text-lg font-semibold text-white"> Bienvenue sur votre Tableau de bord</h2>
      <div className="flex items-center space-x-4">
          {
              session?.user?.email && (
                  <span className="text-white p-2  rounded-full w-10 text-center  border border-slate-100 ">{getInitial(session.user.email)}</span>
              )
          }
        <button  onClick={() => signOut({callbackUrl: "/"})} className="bg-slate-700 rounded-2xl px-3 py-1 text-slate-100 border border-slate-500 hover:bg-slate-500">Déconnexion</button>
      </div>
    </header>
  );
}
