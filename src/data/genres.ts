export type GenreData = {
  bpmMin: number;
  bpmMax: number;
  keys: string[];
  scales: string[];
};

export type GenreEntry = {
  name: string;
  data: GenreData;
};

export const GENRES: GenreEntry[] = [
  { name: 'Acid House', data: { bpmMin: 120, bpmMax: 130, keys: ['C'], scales: ['minor'] } },
  { name: 'Acid Techno', data: { bpmMin: 130, bpmMax: 145, keys: ['C'], scales: ['minor'] } },
  { name: 'Acid Trance', data: { bpmMin: 135, bpmMax: 145, keys: ['A'], scales: ['minor'] } },
  { name: 'Ambient', data: { bpmMin: 60, bpmMax: 120, keys: ['C', 'F'], scales: ['lydian', 'major'] } },
  { name: 'Bass House', data: { bpmMin: 125, bpmMax: 130, keys: ['C', 'F'], scales: ['minor'] } },
  { name: 'Big Beat', data: { bpmMin: 120, bpmMax: 140, keys: ['C', 'F'], scales: ['major'] } },
  { name: 'Big Room House', data: { bpmMin: 126, bpmMax: 132, keys: ['C', 'E'], scales: ['major'] } },
  { name: 'Boom Bap', data: { bpmMin: 80, bpmMax: 100, keys: ['C', 'F'], scales: ['major'] } },
  { name: 'Brostep', data: { bpmMin: 140, bpmMax: 150, keys: ['C'], scales: ['minor'] } },
  { name: 'Chillout', data: { bpmMin: 80, bpmMax: 110, keys: ['C', 'F', 'G'], scales: ['major', 'minor'] } },
  { name: 'Classic Electro', data: { bpmMin: 120, bpmMax: 130, keys: ['C'], scales: ['minor'] } },
  { name: 'Dark Ambient', data: { bpmMin: 60, bpmMax: 120, keys: ['C'], scales: ['locrian'] } },
  { name: 'Dark Electro', data: { bpmMin: 130, bpmMax: 150, keys: ['C', 'D'], scales: ['locrian'] } },
  { name: 'Dark Techno', data: { bpmMin: 140, bpmMax: 160, keys: ['C', 'D'], scales: ['locrian'] } },
  { name: 'Dark Trance', data: { bpmMin: 140, bpmMax: 150, keys: ['A', 'C'], scales: ['locrian'] } },
  { name: 'Dancehall', data: { bpmMin: 80, bpmMax: 100, keys: ['C'], scales: ['major'] } },
  { name: 'Deep Dubstep', data: { bpmMin: 70, bpmMax: 90, keys: ['C'], scales: ['minor'] } },
  { name: 'Deep House', data: { bpmMin: 100, bpmMax: 124, keys: ['C', 'F', 'G'], scales: ['minor', 'dorian'] } },
  { name: 'Downtempo', data: { bpmMin: 80, bpmMax: 110, keys: ['C', 'F'], scales: ['minor', 'major'] } },
  { name: 'Drone', data: { bpmMin: 0, bpmMax: 0, keys: ['C'], scales: ['lydian'] } },
  { name: 'Dub Techno', data: { bpmMin: 120, bpmMax: 130, keys: ['C'], scales: ['minor'] } },
  { name: 'Dubstep', data: { bpmMin: 70, bpmMax: 90, keys: ['C', 'F'], scales: ['minor'] } },
  { name: 'EBM', data: { bpmMin: 120, bpmMax: 140, keys: ['C', 'D'], scales: ['minor'] } },
  { name: 'Electro House', data: { bpmMin: 125, bpmMax: 135, keys: ['C', 'F'], scales: ['minor'] } },
  { name: 'Frenchcore', data: { bpmMin: 180, bpmMax: 200, keys: ['C'], scales: ['minor'] } },
  { name: 'Future Bass', data: { bpmMin: 140, bpmMax: 160, keys: ['C', 'F'], scales: ['major', 'minor'] } },
  { name: 'Future House', data: { bpmMin: 120, bpmMax: 125, keys: ['C', 'F'], scales: ['minor'] } },
  { name: 'Gabber', data: { bpmMin: 160, bpmMax: 180, keys: ['C'], scales: ['minor'] } },
  { name: 'Glitch', data: { bpmMin: 70, bpmMax: 140, keys: ['C'], scales: ['minor'] } },
  { name: 'Glitch Hop', data: { bpmMin: 80, bpmMax: 120, keys: ['C'], scales: ['minor'] } },
  { name: 'Hard Techno', data: { bpmMin: 145, bpmMax: 160, keys: ['C', 'D'], scales: ['locrian'] } },
  { name: 'Hardcore', data: { bpmMin: 160, bpmMax: 200, keys: ['C'], scales: ['minor'] } },
  { name: 'Hardcore Techno', data: { bpmMin: 160, bpmMax: 200, keys: ['C'], scales: ['minor'] } },
  { name: 'Hardstyle', data: { bpmMin: 140, bpmMax: 160, keys: ['C'], scales: ['minor'] } },
  { name: 'IDM', data: { bpmMin: 120, bpmMax: 180, keys: ['C', 'D'], scales: ['minor', 'chromatic'] } },
  { name: 'Industrial', data: { bpmMin: 120, bpmMax: 160, keys: ['C', 'D'], scales: ['locrian'] } },
  { name: 'Industrial Techno', data: { bpmMin: 140, bpmMax: 160, keys: ['C', 'D'], scales: ['locrian'] } },
  { name: 'Jump Up', data: { bpmMin: 165, bpmMax: 175, keys: ['C'], scales: ['minor'] } },
  { name: 'Jungle', data: { bpmMin: 150, bpmMax: 180, keys: ['C'], scales: ['minor'] } },
  { name: 'Lo-fi Hip-Hop', data: { bpmMin: 70, bpmMax: 90, keys: ['C', 'F', 'G'], scales: ['major'] } },
  { name: 'Liquid DnB', data: { bpmMin: 160, bpmMax: 180, keys: ['C', 'D', 'F'], scales: ['minor', 'major'] } },
  { name: 'Minimal Techno', data: { bpmMin: 120, bpmMax: 130, keys: ['C', 'F'], scales: ['locrian'] } },
  { name: 'Modern Electro', data: { bpmMin: 125, bpmMax: 135, keys: ['C'], scales: ['minor'] } },
  { name: 'Neurofunk', data: { bpmMin: 160, bpmMax: 180, keys: ['C', 'D'], scales: ['minor'] } },
  { name: 'Noise', data: { bpmMin: 0, bpmMax: 0, keys: ['C'], scales: ['chromatic'] } },
  { name: 'Nu Skool Breakz', data: { bpmMin: 130, bpmMax: 150, keys: ['C', 'F'], scales: ['minor', 'major'] } },
  { name: 'Power Noise', data: { bpmMin: 120, bpmMax: 160, keys: ['C'], scales: ['locrian'] } },
  { name: 'Progressive House', data: { bpmMin: 120, bpmMax: 130, keys: ['C', 'F', 'G'], scales: ['major', 'dorian'] } },
  { name: 'Progressive Trance', data: { bpmMin: 130, bpmMax: 145, keys: ['A', 'C', 'E'], scales: ['minor'] } },
  { name: 'Psytrance', data: { bpmMin: 138, bpmMax: 145, keys: ['A', 'E'], scales: ['minor'] } },
  { name: 'Ragga Jungle', data: { bpmMin: 150, bpmMax: 180, keys: ['C'], scales: ['minor'] } },
  { name: 'Riddim', data: { bpmMin: 140, bpmMax: 160, keys: ['C'], scales: ['minor'] } },
  { name: 'Tech DnB', data: { bpmMin: 160, bpmMax: 180, keys: ['C', 'D'], scales: ['minor'] } },
  { name: 'Tech House', data: { bpmMin: 120, bpmMax: 130, keys: ['C', 'F'], scales: ['minor'] } },
  { name: 'Tech Trance', data: { bpmMin: 135, bpmMax: 145, keys: ['A', 'C'], scales: ['minor'] } },
  { name: 'Techno', data: { bpmMin: 125, bpmMax: 150, keys: ['C', 'D', 'F'], scales: ['minor', 'locrian'] } },
  { name: 'Trap', data: { bpmMin: 140, bpmMax: 160, keys: ['C', 'F', 'G'], scales: ['minor'] } },
  { name: 'Trap Metal', data: { bpmMin: 140, bpmMax: 180, keys: ['C'], scales: ['minor'] } },
  { name: 'Trip-Hop', data: { bpmMin: 80, bpmMax: 110, keys: ['C', 'F', 'G'], scales: ['minor'] } },
  { name: 'UK Dubstep', data: { bpmMin: 70, bpmMax: 90, keys: ['C'], scales: ['minor'] } },
  { name: 'Uplifting Trance', data: { bpmMin: 138, bpmMax: 145, keys: ['A', 'C', 'E'], scales: ['major', 'lydian'] } },
  { name: 'Vaporwave', data: { bpmMin: 70, bpmMax: 120, keys: ['C'], scales: ['minor'] } },
  { name: 'Vocal House', data: { bpmMin: 120, bpmMax: 128, keys: ['C', 'F'], scales: ['major'] } },
  { name: 'Vocal Trance', data: { bpmMin: 130, bpmMax: 145, keys: ['A', 'C', 'E'], scales: ['minor', 'major'] } },
  { name: 'Hypnotic Techno', data: { bpmMin: 125, bpmMax: 140, keys: ['C', 'F'], scales: ['locrian'] } },
].sort((a, b) => a.name.localeCompare(b.name));

export const GENRE_MAP: Record<string, GenreData> = GENRES.reduce(
  (acc, entry) => {
    acc[entry.name] = entry.data;
    return acc;
  },
  {} as Record<string, GenreData>
);

export function isBpmInRange(genre: string, bpm: number): boolean {
  const data = GENRE_MAP[genre];
  if (!data || data.bpmMin === 0 && data.bpmMax === 0) return true;
  return bpm >= data.bpmMin && bpm <= data.bpmMax;
}

export function isKeyMatch(genre: string, key: string): boolean {
  const data = GENRE_MAP[genre];
  if (!data) return false;
  return data.keys.includes(key);
}

export function isScaleMatch(genre: string, scale: string): boolean {
  const data = GENRE_MAP[genre];
  if (!data) return false;
  return data.scales.includes(scale);
}

export function getBpmRange(genre: string): string {
  const data = GENRE_MAP[genre];
  if (!data || (data.bpmMin === 0 && data.bpmMax === 0)) return 'N/A';
  return `${data.bpmMin}-${data.bpmMax}`;
}
