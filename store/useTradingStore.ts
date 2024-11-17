import { create } from "zustand";

interface SymbolStore {
  symbol: string;
  setSymbol: (newSymbol: string) => void;
}

export const useSymbolStore = create<SymbolStore>((set) => ({
  symbol: "", 
  setSymbol: (newSymbol) => set({ symbol: newSymbol }),
}));