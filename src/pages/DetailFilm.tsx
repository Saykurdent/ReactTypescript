import { useParams } from "react-router-dom";
import type { FilmDetailOmdb } from "../lib/omdb";
import { afficheDisponible, urlDetail } from "../lib/omdb";
import { useFetch } from "../hooks/useFetch";
import { useFavoris } from "../contextes/FavorisContext";
import { Badge } from "../composants/Badge";
import { Bouton } from "../composants/Bouton";

export function DetailFilm() {
  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(id ? urlDetail(id) : null);
  const { favoris, dispatch } = useFavoris();

  if (!id) return <p className="text-red-600">Identifiant manquant.</p>;
  if (chargement) return <p className="text-slate-500">Chargement…</p>;
  if (erreur) return <p className="text-red-600">{erreur}</p>;
  if (!donnees || donnees.Response === "False") {
    return <p className="text-slate-500">Film introuvable.</p>;
  }

  const film = donnees;
  const estFavori = favoris.some((f) => f.imdbID === film.imdbID);

  const basculerFavori = () => {
    if (estFavori) {
      dispatch({ type: "retirer", id: film.imdbID });
    } else {
      dispatch({ type: "ajouter", film });
    }
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
      {afficheDisponible(film.Poster) ? (
        <img
          src={film.Poster}
          alt={`Affiche de ${film.Title}`}
          className="w-full rounded-lg object-cover md:w-64 md:self-start"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-slate-100 text-slate-400 md:w-64">
          Pas d'affiche
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-3xl font-bold text-slate-900">{film.Title}</h1>

        <div className="flex flex-wrap gap-2">
          <Badge texte={film.Year} ton="neutre" />
          <Badge texte={film.Runtime} ton="neutre" />
          {film.Genre.split(", ").map((g) => (
            <Badge key={g} texte={g} ton="info" />
          ))}
        </div>

        <p className="text-slate-700">{film.Plot}</p>

        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="font-medium text-slate-500">Réalisateur</dt>
          <dd className="text-slate-900">{film.Director}</dd>
          <dt className="font-medium text-slate-500">Acteurs</dt>
          <dd className="text-slate-900">{film.Actors}</dd>
          <dt className="font-medium text-slate-500">Note IMDb</dt>
          <dd className="text-slate-900">{film.imdbRating}/10</dd>
        </dl>

        <Bouton
          libelle={estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
          variante={estFavori ? "danger" : "primaire"}
          onClick={basculerFavori}
        />
      </div>
    </div>
  );
}
