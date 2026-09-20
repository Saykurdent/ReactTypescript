import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { Bouton } from "../composants/Bouton";

export function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const { connecter } = useAuth();
  const naviguer = useNavigate();

  const gererEnvoi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudo.trim()) return;
    connecter(pseudo.trim());
    naviguer("/");
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-900">Connexion</h1>

      <form onSubmit={gererEnvoi} noValidate className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1">
          <label htmlFor="pseudo" className="text-sm font-medium text-slate-700">
            Pseudo
          </label>
          <input
            id="pseudo"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Votre pseudo"
            className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <Bouton type="submit" libelle="Se connecter" desactive={!pseudo.trim()} />
      </form>
    </div>
  );
}
