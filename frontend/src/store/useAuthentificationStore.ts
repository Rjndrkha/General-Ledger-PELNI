import create from "zustand";
import { IAuth } from "../interface/IAuth";

interface AuthState {
  authentification: IAuth;
  login: (auth: IAuth) => void;
}

export const useAuthentificationStore = create<AuthState>((set) => ({
  authentification: {
    username: "",
    password: "",
  },
  login: (auth: IAuth) => set({ authentification: auth }),
}));