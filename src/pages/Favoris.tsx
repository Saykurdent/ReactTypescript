import { Link } from "react-router-dom";
import { useFavoris } from "../contextes/FavorisContext";
import { CarteFilm } from "../composants/CarteFilm";
import { Bouton } from "../composants/Bouton";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Mes favoris</h1>
        {favoris.length > 0 && (
          <Bouton
            libelle="Tout vider"
            variante="danger"
            onClick={() => dispatch({ type: "vider" })}
          />
        )}
      </div>

      {favoris.length === 0 ? (
        <div className="rounded-lg bg-slate-200 p-8 text-center text-slate-500">
          Aucun favori pour le moment.{" "}
          <Link to="/recherche" className="text-blue-600 hover:underline">
            Lancez une recherche
          </Link>{" "}
          pour en ajouter.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {favoris.map((film) => (
            <li key={film.imdbID} className="flex flex-col gap-2">
              <Link to={`/films/${film.imdbID}`} className="block h-full">
                <CarteFilm film={film} />
              </Link>
              <Bouton
                libelle="Retirer"
                variante="danger"
                onClick={() => dispatch({ type: "retirer", id: film.imdbID })}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
