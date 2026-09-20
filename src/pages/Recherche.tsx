import { useState } from "react";
import { Link } from "react-router-dom";
import type { ReponseRecherche } from "../lib/omdb";
import { urlRecherche } from "../lib/omdb";
import { useDebounce, useFetch } from "../hooks/useFetch";
import { CarteFilm } from "../composants/CarteFilm";

export function Recherche() {
  const [terme, setTerme] = useState("");
  const termeDiffere = useDebounce(terme, 400);

  const url = termeDiffere.trim() ? urlRecherche(termeDiffere.trim()) : null;
  const { donnees, chargement, erreur } = useFetch<ReponseRecherche>(url);

  const films = donnees?.Response === "True" ? (donnees.Search ?? []) : [];
  const messageVide =
    donnees?.Response === "False" ? (donnees.Error ?? "Aucun résultat.") : null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-900">Recherche OMDB</h1>

      <input
        type="search"
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
        placeholder="Tapez un titre…"
        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {!termeDiffere.trim() && (
        <p className="text-slate-500">Tapez un titre pour lancer la recherche.</p>
      )}

      {termeDiffere.trim() && chargement && (
        <p className="text-slate-500">Chargement…</p>
      )}

      {termeDiffere.trim() && !chargement && erreur && (
        <p className="font-medium text-red-600">{erreur}</p>
      )}

      {termeDiffere.trim() && !chargement && !erreur && messageVide && (
        <p className="text-slate-500">
          Aucun film ne correspond à « {termeDiffere} ».
        </p>
      )}

      {films.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {films.map((film) => (
            <li key={film.imdbID}>
              <Link to={`/films/${film.imdbID}`} className="block h-full">
                <CarteFilm film={film} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
