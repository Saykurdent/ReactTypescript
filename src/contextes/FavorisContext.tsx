import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { FilmOmdb } from "../lib/omdb";

type ActionFavoris =
  | { type: "ajouter"; film: FilmOmdb }
  | { type: "retirer"; id: string }
  | { type: "vider" };

function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case "ajouter":
      if (etat.some((f) => f.imdbID === action.film.imdbID)) return etat;
      return [...etat, action.film];
    case "retirer":
      return etat.filter((f) => f.imdbID !== action.id);
    case "vider":
      return [];
  }
}

interface FavorisContexte {
  favoris: FilmOmdb[];
  dispatch: React.Dispatch<ActionFavoris>;
}

const Contexte = createContext<FavorisContexte | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(reducerFavoris, []);

  return (
    <Contexte.Provider value={{ favoris, dispatch }}>
      {children}
    </Contexte.Provider>
  );
}

export function useFavoris(): FavorisContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useFavoris doit être utilisé dans un <FavorisProvider>");
  }
  return contexte;
}
