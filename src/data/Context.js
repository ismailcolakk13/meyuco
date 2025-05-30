import { createContext, useContext } from "react";


export const EtkinliklerContext = createContext();
export const UserContext = createContext();

export const useEtkinlikler = () => useContext(EtkinliklerContext);
export const useUserContext = () => useContext(UserContext);