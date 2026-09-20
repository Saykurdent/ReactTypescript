import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  erreur?: string;
  placeholder?: string;
}

export function ChampTexte({
  nom,
  label,
  valeur,
  onChange,
  type = "text",
  erreur,
  placeholder,
}: ChampTexteProps) {
  const bordure = erreur ? "border-red-500" : "border-slate-300";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={nom} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        value={valeur}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? `${nom}-erreur` : undefined}
        className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${bordure}`}
      />
      {erreur && (
        <p id={`${nom}-erreur`} className="text-sm text-red-600">
          {erreur}
        </p>
      )}
    </div>
  );
}
