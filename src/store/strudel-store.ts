import { create } from 'zustand';

type StrudelStore = {
  pattern: string;
  cpm: string;
  bpc: string;
  selectedGenre: string | null;
  setPattern: (pattern: string) => void;
  setCpm: (cpm: string) => void;
  setBpc: (bpc: string) => void;
  setSelectedGenre: (genre: string | null) => void;
};

export const useStrudelStore = create<StrudelStore>((set) => ({
  pattern: '',
  cpm: '120',
  bpc: '4',
  selectedGenre: null,
  setPattern: (pattern) => set({ pattern }),
  setCpm: (cpm) => set({ cpm }),
  setBpc: (bpc) => set({ bpc }),
  setSelectedGenre: (selectedGenre) => set({ selectedGenre }),
}));
