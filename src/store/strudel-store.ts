import { create } from 'zustand';

type StrudelStore = {
  pattern: string;
  cpm: string;
  bpc: string;
  genre: string;
  setPattern: (pattern: string) => void;
  setCpm: (cpm: string) => void;
  setBpc: (bpc: string) => void;
  setGenre: (genre: string) => void;
};

export const useStrudelStore = create<StrudelStore>((set) => ({
  pattern: '',
  cpm: '120',
  bpc: '4',
  genre: '',
  setPattern: (pattern) => set({ pattern }),
  setCpm: (cpm) => set({ cpm }),
  setBpc: (bpc) => set({ bpc }),
  setGenre: (genre) => set({ genre }),
}));
