import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";
import { Bouton } from "./Bouton";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "font-bold text-blue-600" : "text-slate-600 hover:text-blue-600"
      }
    >
      {label}
    </NavLink>
  );
}

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <NavLink to="/" className="text-lg font-bold text-slate-900">
            CatalogueFilms
          </NavLink>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavItem to="/recherche" label="Recherche" />
            <NavItem
              to="/favoris"
              label={`Favoris${favoris.length > 0 ? ` (${favoris.length})` : ""}`}
            />
          </nav>

          <div className="flex items-center gap-3 text-sm">
            {pseudo ? (
              <>
                <span className="text-slate-600">Connecté : {pseudo}</span>
                <Bouton libelle="Déconnexion" variante="secondaire" onClick={deconnecter} />
              </>
            ) : (
              <NavLink
                to="/connexion"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-400">
        CatalogueFilms — React + TypeScript
      </footer>
    </div>
  );
}
