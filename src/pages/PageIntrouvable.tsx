import { Link } from "react-router-dom";

export function PageIntrouvable() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-6xl font-bold text-slate-300">404</p>
      <p className="text-xl text-slate-700">Cette page n'existe pas.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
