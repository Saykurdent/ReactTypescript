import type { Film, StatutFilm } from "../lib/utils";
import type { TonBadge } from "./Badge";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import { Carte } from "./Carte";

export interface ListeFilmsProps {
  films: Film[];
  messageVide?: string;
  onSelection?: (film: Film) => void;
}

const statuts: Record<StatutFilm, { libelle: string; ton: TonBadge }> = {
  vu: { libelle: "Déjà vu", ton: "succes" },
  a_voir: { libelle: "À voir", ton: "info" },
  abandonne: { libelle: "Abandonné", ton: "neutre" },
};

export function ListeFilms({ films, messageVide, onSelection }: ListeFilmsProps) {
  if (films.length === 0) {
    return (
      <div className="rounded-lg bg-slate-200 p-8 text-center text-slate-500">
        {messageVide ?? "Aucun film à afficher."}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {films.map((film) => {
        const statut = statuts[film.statut];
        return (
          <li key={film.id}>
            <Carte
              titre={film.titre}
              sousTitre={`${film.annee} — ${film.note}/10`}
              actions={
                onSelection && (
                  <Bouton libelle="Détails" onClick={() => onSelection(film)} />
                )
              }
            >
              <div className="flex flex-wrap gap-1">
                <Badge texte={statut.libelle} ton={statut.ton} />
                {film.genres.map((genre) => (
                  <Badge key={genre} texte={genre} />
                ))}
              </div>
            </Carte>
          </li>
        );
      })}
    </ul>
  );
}
