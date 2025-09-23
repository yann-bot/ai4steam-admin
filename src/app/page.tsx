"use client"
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
  return (
       <main className="flex  h-screen items-center justify-center w-full bg-slate-950 ">
           <section className=" bg-slate-900 flex flex-col items-center rounded-xl justify-center gap-5  border border-slate-800 pt-15 pb-15  p-10 ">
               <div className="flex flex-col gap-3 items-center justify-center">
                   <h1 className="text-2xl font-bold">Connexion</h1>
                   <p>Reserve au administrateur</p>
               </div>
               <form className="flex flex-col gap-5 justify-center items-center " >
                   <div className="flex flex-col gap-1">
                       <label>Adresse email</label>
                       <input type='email' placeholder='contact@gmail.com' className="border  bg-slate-950 border-slate-800 rounded-xl pl-3 p-2 w-90 " />
                   </div>
                   <div className="flex flex-col gap-1">
                       <label>Mot de passe</label>
                       <input type='password' placeholder='mot de passe' className="border  bg-slate-950 border-slate-800 rounded-xl pl-3 p-2 w-90 " />
                   </div>
                   <div>
                       <button type="submit"  className="bg-slate-100 w-90 rounded-2xl pt-2 pb-2  text-slate-900  hover:bg-slate-200"> Se connecter</button>
                   </div>
               </form>

           </section>

       </main>
  );
}
