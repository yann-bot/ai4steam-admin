"use client"


import Image from "next/image";
import {useState} from "react";

export default function Home() {
     const [formData, setFormData] = useState({
         email: "",
         password: "",
     });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setFormData(
             {
                 ...formData,
                 [e.target.name]: e.target.value,
             }
         )
     }

     const validate = () => {
         const newErrors = {email: "", password: ""};
         let isValid = true;

         if (!/\S+@\S+\.\S+/.test(formData.email)) {
             newErrors.email = "L'email n'est pas valide.";
             isValid = false;
         }


         if (formData.password.length < 6) {
             newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
             isValid = false;
         }
         setErrors(newErrors);
         return isValid;
     }

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            alert("Formulaire valide ✅");
            console.log("Données envoyées :", formData);
        }
    };


    return (
       <main className="flex  h-screen items-center justify-center w-full bg-slate-950  ">
           <section className=" bg-slate-900 flex flex-col items-center rounded-xl justify-center gap-5  border border-slate-800 pt-15 pb-15  p-10 ">
               <div className="flex flex-col gap-3 items-center justify-center">
                   <div><Image src={"/logo_i4steam.svg"} width={150} height={150} alt={"logo"}/></div>
                   <h1 className={`text-2xl font-bold  font-mono `}>Connexion</h1>
                   <p className="font-sans">Reserve au administrateur</p>
               </div>
               <form className="flex flex-col gap-5 justify-center items-center "  onSubmit={handleSubmit}>
                   <div className="flex flex-col gap-1">
                       <label className="font-sans">Adresse email</label>
                       <input name='email' type='email' value={formData.email} onChange={handleChange} placeholder='contact@gmail.com' className="border  bg-slate-950 border-slate-800 rounded-xl pl-3 p-2 w-90 " />
                       {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                   </div>
                   <div className="flex flex-col gap-1">
                       <label className="font-sans">Mot de passe</label>
                       <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='mot de passe' className="border  bg-slate-950 border-slate-800 rounded-xl pl-3 p-2 w-90 " />
                       {errors.password && (<p className="text-red-500 text-sm">{errors.password}</p>)}
                   </div>
                   <div>
                       <button type="submit"  className="bg-slate-100 w-90 rounded-2xl pt-2 pb-2  text-slate-900  hover:bg-slate-200"> Se connecter</button>
                   </div>
               </form>
           </section>
       </main>
  );
}
