import { createContext, useContext } from "react";


export const EtkinliklerContext = createContext();

export const useEtkinlikler = () => useContext(EtkinliklerContext);