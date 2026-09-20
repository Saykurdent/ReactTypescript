import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContexte {
  pseudo: string | null;
  connecter: (pseudo: string) => void;
  deconnecter: () => void;
}

const Contexte = createContext<AuthContexte | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [pseudo, setPseudo] = useState<string | null>(null);

  const connecter = (p: string) => setPseudo(p);
  const deconnecter = () => setPseudo(null);

  return (
    <Contexte.Provider value={{ pseudo, connecter, deconnecter }}>
      {children}
    </Contexte.Provider>
  );
}

export function useAuth(): AuthContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  }
  return contexte;
}
