"use client";

import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // ⚡ Loader

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = { email: "", password: "" };
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;

        setIsLoading(true); // ⚡ Début du chargement

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });
        setFormData({ email: "", password: "" });
        setIsLoading(false); // ⚡ Fin du chargement

        if (res?.error) {
            try {
                const parsed = JSON.parse(res.error);
                setServerError(parsed.message || "Erreur inconnue");
            } catch {
                setServerError(res.error);
            }
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <main className="flex flex-col h-screen items-center justify-center w-full bg-slate-950">
            <section className="bg-slate-900 flex flex-col items-center rounded-xl justify-center gap-5 border border-slate-800 pt-15 pb-15 p-15">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div>
                        <Image src={"/logo_i4steam.svg"} width={150} height={150} alt={"logo"} />
                    </div>
                    <h1 className="text-2xl font-bold font-mono">Connexion</h1>
                    <p className="font-sans">Réservé aux administrateurs</p>
                </div>

                <form className="flex flex-col gap-5 justify-center items-center w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-sans">Adresse email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="contact@gmail.com"
                            className="border bg-slate-950 border-slate-800 rounded-xl pl-3 p-2 w-90"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-sans">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="mot de passe"
                            className="border bg-slate-950 border-slate-800 rounded-xl pl-3 p-2 w-full"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>


                    <div className="w-full">
                        <button
                            type="submit"
                            disabled={isLoading} // ⚡ désactive le bouton pendant le chargement
                            className="bg-slate-100 w-full rounded-2xl pt-2 pb-2 text-slate-900 hover:bg-slate-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    {/* ⚡ Spinner */}
                                    <span className="w-5 h-5 border-2 border-t-slate-900 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></span>
                                    Connexion en cours...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                    </div>
                </form>
            </section>
            <section> {serverError && <p className="text-red-500 text-sm">{serverError}</p>}</section>
        </main>
    );
}
