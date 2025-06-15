import PortLogo from "@/components/PortLogo";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import React from "react";

export default function ResetPassword() {
    return (
        <div className="min-h-screen relative overflow-hidden font-['Inter']">
        {/* Arrière-plan maritime */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 63, 114, 0.85) 0%, rgba(73, 184, 241, 0.65) 100%), url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80')`,
            }}
        >
            {/* Overlay pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-br from-port-navy/20 via-transparent to-port-blue/20"></div>
        </div>

        {/* Particules flottantes pour un effet dynamique */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-port-blue/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 min-h-screen flex flex-col">
            {/* En-tête avec logo */}
            <header className="pt-8 pb-4 px-6">
            <div className="container mx-auto">
                <PortLogo />
            </div>
            </header>

            {/* Section centrale */}
            <main className="flex-1 flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-md space-y-8">
                {/* Message d'accueil */}
                <div
                className="text-center animate-fade-in"
                style={{ animationDelay: "0.2s" }}
                >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Bienvenue
                </h2>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
                    Plateforme de gestion des stages du
                    <span className="font-medium text-port-gold">
                    {" "}
                    Port Autonome de Cotonou
                    </span>
                </p>
                </div>

                {/* Formulaire de connexion */}
                <div style={{ animationDelay: "0.4s" }}>
                <ResetPasswordForm />
                </div>
            </div>
            </main>

            {/* Pied de page discret */}
            <footer className="pb-6 px-6">
            <div className="text-center">
                <p className="text-white/60 text-sm">
                © 2025 Port Autonome de Cotonou - Tous droits réservés
                </p>
            </div>
            </footer>
        </div>
        </div>
    );
}
