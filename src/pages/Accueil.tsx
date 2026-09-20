import { useState } from "react";
import { Link } from "react-router-dom";
import type { Inscription, InscriptionEnregistree } from "../lib/inscription";
import { FormulaireInscription } from "../composants/FormulaireInscription";
import { ListeInscriptions } from "../composants/ListeInscriptions";
import { ListeFilms } from "../composants/ListeFilms";
import { FILMS, filtrerParGenre, trierPar } from "../lib/utils";

const filmsParTitre = trierPar(FILMS, "titre");
const filmsComedie = filtrerParGenre(FILMS, "Comédie");

let prochainId = 1;

export function Accueil() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);

  const ajouter = (donnees: Inscription) => {
    setInscriptions((liste) => [
      { id: prochainId++, prenom: donnees.prenom, email: donnees.email, cgv: donnees.cgv },
      ...liste,
    ]);
  };

  const supprimer = (id: number) => {
    setInscriptions((liste) => liste.filter((i) => i.id !== id));
  };

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Bienvenue</h1>
        <p className="text-slate-500">
          Explorez le catalogue de films ou{" "}
          <Link to="/recherche" className="text-blue-600 hover:underline">
            lancez une recherche
          </Link>{" "}
          dans la base OMDB.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">Catalogue local</h2>
        <ListeFilms films={filmsParTitre} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">Genre : Comédie</h2>
        <ListeFilms films={filmsComedie} messageVide="Aucun film dans ce genre." />
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-900">Inscription</h2>
          <FormulaireInscription onInscription={ajouter} />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-900">Inscrits</h2>
          <ListeInscriptions inscriptions={inscriptions} onSuppression={supprimer} />
        </div>
      </section>
    </div>
  );
}
