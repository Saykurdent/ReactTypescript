export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export type InscriptionEnregistree =
  Omit<Inscription, "motDePasse" | "confirmation"> & { id: number };

export type Erreurs = Partial<Record<keyof Inscription, string>>;

export const valeursInitiales: Inscription = {
  prenom: "",
  email: "",
  motDePasse: "",
  confirmation: "",
  cgv: false,
};

const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function valider(donnees: Inscription): Erreurs {
  const erreurs: Erreurs = {};

  if (donnees.prenom.trim().length < 2) {
    erreurs.prenom = "le prénom doit contenir au moins 2 caractères.";
  }

  if (!formatEmail.test(donnees.email)) {
    erreurs.email = "l'adresse email n'est pas valide.";
  }

  if (donnees.motDePasse.length < 8) {
    erreurs.motDePasse = "le mot de passe doit contenir au moins 8 caractères.";
  }

  if (donnees.confirmation !== donnees.motDePasse) {
    erreurs.confirmation = "les mots de passe ne correspondent pas.";
  }

  if (!donnees.cgv) {
    erreurs.cgv = "vous devez accepter les conditions.";
  }

  return erreurs;
}
