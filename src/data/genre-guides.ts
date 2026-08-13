import type { AppNodeType, WorkflowNodeData } from '@/components/nodes';

export type Role =
  | 'rhythm'
  | 'bass'
  | 'harmony'
  | 'melody'
  | 'movement'
  | 'space'
  | 'variation';

export type Level = 'essential' | 'expansion' | 'variation';

export type NodeRecommendation = {
  id: string;
  nodeType: AppNodeType;
  role: Role;
  level: Level;
  title: string;
  description: string;
  patch: Partial<WorkflowNodeData>;
  suggestedAfter?: AppNodeType[];
};

export type GenreGuide = {
  id: string;
  label: string;
  bpm: number;
  summary: string;
  recommendations: NodeRecommendation[];
};

const b16 = (pattern: string): boolean[] =>
  pattern.split('').map((c) => c === 'X');

export const GENRE_GUIDES: GenreGuide[] = [
  {
    id: 'progressive-house',
    label: 'Progressive House',
    bpm: 126,
    summary:
      'Progressive groove, melodic and spacious for long evolutions.',
    recommendations: [
      // ── beat-machine-node (3) ──
      {
        id: 'ph-beat-foundation',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'House foundation',
        description: 'Kick 4x4, clap on 2 and 4, offbeat closed hat.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'cp', pattern: b16('....X.......X...') },
            { instrument: 'hh', pattern: b16('..X...X...X...X.') },
          ],
        },
      },
      {
        id: 'ph-beat-minimal',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'expansion',
        title: 'Minimal groove',
        description: 'Sparse kick and hat, percussive feel for breakdowns.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X.......X.......') },
            { instrument: 'hh', pattern: b16('..X...X...X...X.') },
            { instrument: 'rim', pattern: b16('....X.......X.') },
          ],
        },
      },
      {
        id: 'ph-beat-buildup',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'variation',
        title: 'Build-up pattern',
        description: 'Kick only, building energy for transitions.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'bd', pattern: b16('XX..XX..XX..XX..') },
          ],
        },
      },

      // ── pad-node (3) ──
      {
        id: 'ph-pad-wide',
        nodeType: 'pad-node',
        role: 'harmony',
        level: 'essential',
        title: 'Wide chords',
        description:
          'Major 9th chords, octave 4, chord mode for spacious feel.',
        patch: {
          selectedKey: 'F',
          selectedScaleType: 'major',
          octave: 4,
          mode: 'chord',
          steps: 8,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ph-pad-ambient',
        nodeType: 'pad-node',
        role: 'harmony',
        level: 'expansion',
        title: 'Ambient pad',
        description:
          'Major 7th, slow attack, long release, octave 3 for depth.',
        patch: {
          selectedKey: 'C',
          selectedScaleType: 'major',
          octave: 3,
          mode: 'chord',
          steps: 4,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ph-pad-stab',
        nodeType: 'pad-node',
        role: 'harmony',
        level: 'variation',
        title: 'Stab chords',
        description: 'Shorter rhythmic notes, octave 5 for brightness.',
        patch: {
          selectedKey: 'F',
          selectedScaleType: 'major',
          octave: 5,
          mode: 'arp',
          steps: 8,
        },
        suggestedAfter: ['synth-select-node'],
      },

      // ── synth-select-node (3) ──
      {
        id: 'ph-synth-pluck',
        nodeType: 'synth-select-node',
        role: 'bass',
        level: 'essential',
        title: 'Pluck bass',
        description: 'Percussive bass timbre for groove.',
        patch: { sound: 'bass2' },
      },
      {
        id: 'ph-synth-warm',
        nodeType: 'synth-select-node',
        role: 'harmony',
        level: 'expansion',
        title: 'Warm pad',
        description: 'Soft pad sound for harmonic layers.',
        patch: { sound: 'sine' },
      },
      {
        id: 'ph-synth-lead',
        nodeType: 'synth-select-node',
        role: 'melody',
        level: 'variation',
        title: 'Lead synth',
        description: 'Bright lead for melodic hooks.',
        patch: { sound: 'saw' },
      },

      // ── arpeggiator-node (2) ──
      {
        id: 'ph-arp-evolving',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'expansion',
        title: 'Evolving pattern',
        description: 'Up-Down, 2 octaves, major scale, slow movement.',
        patch: {
          selectedPattern: 'up-down',
          selectedKey: 'F',
          selectedChordType: 'major',
          octave: 4,
          octaveRange: 2,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ph-arp-rhythmic',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'variation',
        title: 'Rhythmic arp',
        description: 'Inside-Out, 1 octave, faster pattern for energy.',
        patch: {
          selectedPattern: 'inside-out',
          selectedKey: 'C',
          selectedChordType: 'major',
          octave: 4,
          octaveRange: 1,
        },
        suggestedAfter: ['synth-select-node'],
      },

      // ── chord-node (2) ──
      {
        id: 'ph-chord-progression',
        nodeType: 'chord-node',
        role: 'harmony',
        level: 'expansion',
        title: 'I-IV-vi-V',
        description:
          'Classic major progression, triad complexity, degrees I IV V vi.',
        patch: {
          selectedKey: 'F',
          scaleType: 'major',
          chordComplexity: 'triad',
          octave: 4,
          pressedKeys: [0, 3, 5, 4],
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ph-chord-jazz',
        nodeType: 'chord-node',
        role: 'harmony',
        level: 'variation',
        title: 'ii-V-I',
        description:
          'Jazz-influenced progression, seventh complexity for sophistication.',
        patch: {
          selectedKey: 'C',
          scaleType: 'major',
          chordComplexity: 'seventh',
          octave: 4,
          pressedKeys: [1, 4, 0],
        },
        suggestedAfter: ['synth-select-node'],
      },

      // ── room-node (2) ──
      {
        id: 'ph-room-spacious',
        nodeType: 'room-node',
        role: 'space',
        level: 'expansion',
        title: 'Spacious reverb',
        description: 'Large room, long fade, wide dimension.',
        patch: {
          room: '0.7',
          roomsize: '8',
          roomfade: '5',
          roomdim: '15000',
        },
        suggestedAfter: ['pad-node', 'chord-node'],
      },
      {
        id: 'ph-room-tight',
        nodeType: 'room-node',
        role: 'space',
        level: 'variation',
        title: 'Tight room',
        description: 'Small room, short fade, intimate feel.',
        patch: {
          room: '0.4',
          roomsize: '3',
          roomfade: '1',
          roomdim: '8000',
        },
        suggestedAfter: ['pad-node', 'chord-node'],
      },

      // ── late-node (2) ──
      {
        id: 'ph-late-subtle',
        nodeType: 'late-node',
        role: 'movement',
        level: 'expansion',
        title: 'Subtle movement',
        description: 'Small offset with alternating pattern for groove.',
        patch: {
          lateOffsetId: 'small',
          lateOffset: '0.05',
          latePatternId: 'alternating',
          latePattern: '[0 0.05]*2',
        },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },
      {
        id: 'ph-late-rhythmic',
        nodeType: 'late-node',
        role: 'movement',
        level: 'variation',
        title: 'Rhythmic delay',
        description: 'Triplet pattern with medium offset for swing.',
        patch: {
          lateOffsetId: 'medium',
          lateOffset: '0.1',
          latePatternId: 'triplet',
          latePattern: '[0 0.1 0.1]',
        },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },

      // ── adsr-node (2) ──
      {
        id: 'ph-adsr-soft',
        nodeType: 'adsr-node',
        role: 'movement',
        level: 'expansion',
        title: 'Soft envelope',
        description:
          'Slow attack, medium decay, high sustain, long release.',
        patch: {
          attack: '0.4',
          decay: '0.5',
          sustain: '0.7',
          release: '0.8',
        },
        suggestedAfter: ['pad-node', 'synth-select-node'],
      },
      {
        id: 'ph-adsr-pluck',
        nodeType: 'adsr-node',
        role: 'movement',
        level: 'variation',
        title: 'Pluck envelope',
        description:
          'Fast attack, short decay, medium sustain, quick release.',
        patch: {
          attack: '0.01',
          decay: '0.2',
          sustain: '0.4',
          release: '0.15',
        },
        suggestedAfter: ['synth-select-node', 'arpeggiator-node'],
      },

      // ── lpf-node (2) ──
      {
        id: 'ph-lpf-sweep',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'expansion',
        title: 'Filter sweep',
        description: 'Low cutoff, low resonance for gradual opens.',
        patch: { lpf: '800 1' },
        suggestedAfter: ['pad-node', 'synth-select-node'],
      },
      {
        id: 'ph-lpf-resonant',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'variation',
        title: 'Resonant sweep',
        description: 'Higher resonance for dynamic movement.',
        patch: { lpf: '1200 3' },
        suggestedAfter: ['pad-node', 'synth-select-node'],
      },

      // ── pan-node (2) ──
      {
        id: 'ph-pan-spread',
        nodeType: 'pan-node',
        role: 'space',
        level: 'expansion',
        title: 'Stereo spread',
        description: 'Slow panning movement for width.',
        patch: { pan: '0.3' },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },
      {
        id: 'ph-pan-rhythmic',
        nodeType: 'pan-node',
        role: 'space',
        level: 'variation',
        title: 'Rhythmic pan',
        description: 'Faster panning for movement.',
        patch: { pan: '0.7' },
        suggestedAfter: ['arpeggiator-node', 'pad-node'],
      },

      // ── mask-node (2) ──
      {
        id: 'ph-mask-gating',
        nodeType: 'mask-node',
        role: 'variation',
        level: 'variation',
        title: 'Rhythmic gating',
        description: 'Half pattern, always probability, for breakdowns.',
        patch: {
          maskPatternId: 'half',
          maskProbabilityId: 'always',
        },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },
      {
        id: 'ph-mask-syncopated',
        nodeType: 'mask-node',
        role: 'variation',
        level: 'variation',
        title: 'Syncopated mask',
        description: 'Alternate pattern, sometimes probability.',
        patch: {
          maskPatternId: 'alternate',
          maskProbabilityId: 'sometimes',
        },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },

      // ── phaser-node (2) ──
      {
        id: 'ph-phaser-hat',
        nodeType: 'phaser-node',
        role: 'movement',
        level: 'variation',
        title: 'Hat movement',
        description: 'Slow speed, low depth, subtle texture on hats.',
        patch: { phaser: '1', phaserdepth: '0.2' },
        suggestedAfter: ['beat-machine-node'],
      },
      {
        id: 'ph-phaser-pad',
        nodeType: 'phaser-node',
        role: 'movement',
        level: 'variation',
        title: 'Pad texture',
        description: 'Medium speed, medium depth for evolving pads.',
        patch: { phaser: '3', phaserdepth: '0.5' },
        suggestedAfter: ['pad-node'],
      },

      // ── jux-node (2) ──
      {
        id: 'ph-jux-width',
        nodeType: 'jux-node',
        role: 'space',
        level: 'variation',
        title: 'Width effect',
        description: 'Reverse on right channel for stereo interest.',
        patch: { jux: 'rev' },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },
      {
        id: 'ph-jux-contrast',
        nodeType: 'jux-node',
        role: 'space',
        level: 'variation',
        title: 'Contrast',
        description: 'Press on right channel for dynamic variation.',
        patch: { jux: 'press' },
        suggestedAfter: ['pad-node', 'arpeggiator-node'],
      },

      // ── gain-node (2) ──
      {
        id: 'ph-gain-boost',
        nodeType: 'gain-node',
        role: 'movement',
        level: 'variation',
        title: 'Dynamic control',
        description: 'Slight boost for chorus sections.',
        patch: { gain: '1.3' },
      },
      {
        id: 'ph-gain-duck',
        nodeType: 'gain-node',
        role: 'movement',
        level: 'variation',
        title: 'Volume duck',
        description: 'Lower gain for breakdowns.',
        patch: { gain: '0.7' },
      },

      // ── Inspired by tracks ──
      // Âme - "Rej" (125 BPM, D♭ minor)
      {
        id: 'ph-beat-rej-style',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'Rej-style groove',
        description: 'Kick + bouncy bassline + electronic maracas panned right. Inspired by Âme "Rej" (125 BPM).',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'rim', pattern: b16('..X...X...X...X.') },
          ],
          bank: 'RolandTR909',
        },
      },
      {
        id: 'ph-arp-rej-arpeggio',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'expansion',
        title: 'Rej arpeggio',
        description: 'Arpeggiated synth, D♭ minor, evolving pattern. Inspired by Âme "Rej".',
        patch: {
          selectedPattern: 'up-down',
          selectedKey: 'C#',
          selectedChordType: 'minor',
          octave: 4,
          octaveRange: 2,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ph-pan-rej-stereo',
        nodeType: 'pan-node',
        role: 'space',
        level: 'variation',
        title: 'Rej stereo spread',
        description: 'Stereo panning, maracas right / shakers left. Inspired by Âme "Rej".',
        patch: { pan: '0.5' },
        suggestedAfter: ['beat-machine-node'],
      },

      // Catz 'n Dogz - "Modern Romance" (128 BPM, G minor)
      {
        id: 'ph-beat-modern-romance',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'Modern Romance beat',
        description: 'Thundering kick, heavy snare+clap, congas, shakers. Inspired by Catz \'n Dogz "Modern Romance" (128 BPM).',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'sd', pattern: b16('....X.......X...') },
            { instrument: 'hh', pattern: b16('..X...X...X...X.') },
            { instrument: 'rim', pattern: b16('X.X.X.X.X.X.X.X.') },
          ],
        },
      },
      {
        id: 'ph-synth-fm-bass',
        nodeType: 'synth-select-node',
        role: 'bass',
        level: 'expansion',
        title: 'FM bass pattern',
        description: 'FM bass, 3-note climbing pattern. Inspired by Catz \'n Dogz "Modern Romance".',
        patch: { sound: 'moog' },
      },
      {
        id: 'ph-pad-modern-violins',
        nodeType: 'pad-node',
        role: 'harmony',
        level: 'variation',
        title: 'Modern violins pad',
        description: 'Violin-like pad, G minor, sampled texture. Inspired by Catz \'n Dogz "Modern Romance".',
        patch: {
          selectedKey: 'G',
          selectedScaleType: 'minor',
          octave: 4,
          mode: 'chord',
          steps: 8,
        },
        suggestedAfter: ['synth-select-node'],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ACID TECHNO
  // ═══════════════════════════════════════════
  {
    id: 'acid-techno',
    label: 'Acid Techno',
    bpm: 135,
    summary: 'Aggressive 303 sound, driving beat and darkness.',
    recommendations: [
      // ── beat-machine-node (3) ──
      {
        id: 'at-beat-driving',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'Driving beat',
        description: 'Hard kick 4x4, tight clap, fast hats.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'cp', pattern: b16('....X.......X...') },
            { instrument: 'hh', pattern: b16('.X.X.X.X.X.X.X.X') },
          ],
        },
      },
      {
        id: 'at-beat-industrial',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'expansion',
        title: 'Industrial beat',
        description: 'Distorted kick, metallic percussion.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'sd', pattern: b16('....X.......X...') },
            { instrument: 'hh', pattern: b16('X.X.X.X.X.X.X.X.') },
          ],
        },
      },
      {
        id: 'at-beat-breakdown',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'variation',
        title: 'Breakdown',
        description: 'Sparse pattern, kick only for tension.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X.......X.......') },
          ],
        },
      },

      // ── arpeggiator-node (3) ──
      {
        id: 'at-arp-303',
        nodeType: 'arpeggiator-node',
        role: 'bass',
        level: 'essential',
        title: '303 squelch',
        description: 'Inside-Out, 2 octaves, minor, A key.',
        patch: {
          selectedPattern: 'inside-out',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 3,
          octaveRange: 2,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-arp-dark',
        nodeType: 'arpeggiator-node',
        role: 'bass',
        level: 'expansion',
        title: 'Dark pattern',
        description: 'Down-Up, 1 octave, minor, D key.',
        patch: {
          selectedPattern: 'down-up',
          selectedKey: 'D',
          selectedChordType: 'minor',
          octave: 3,
          octaveRange: 1,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-arp-aggressive',
        nodeType: 'arpeggiator-node',
        role: 'bass',
        level: 'variation',
        title: 'Aggressive arp',
        description: 'Outside-In, 3 octaves, chromatic feel.',
        patch: {
          selectedPattern: 'outside-in',
          selectedKey: 'C',
          selectedChordType: 'minor',
          octave: 3,
          octaveRange: 3,
        },
        suggestedAfter: ['synth-select-node'],
      },

      // ── fm-node (3) ──
      {
        id: 'at-fm-bass',
        nodeType: 'fm-node',
        role: 'bass',
        level: 'essential',
        title: 'Aggressive bass',
        description: 'FM modulation for metallic bass tones.',
        patch: { fm: '3.5' },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-fm-metallic',
        nodeType: 'fm-node',
        role: 'bass',
        level: 'expansion',
        title: 'Metallic texture',
        description: 'Higher FM for industrial character.',
        patch: { fm: '5' },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-fm-subtle',
        nodeType: 'fm-node',
        role: 'bass',
        level: 'variation',
        title: 'Subtle modulation',
        description: 'Low FM for underlying movement.',
        patch: { fm: '1.5' },
        suggestedAfter: ['synth-select-node'],
      },

      // ── distort-node (3) ──
      {
        id: 'at-distort-harsh',
        nodeType: 'distort-node',
        role: 'variation',
        level: 'expansion',
        title: 'Harsh edge',
        description: 'Medium distortion for aggressive character.',
        patch: { distort: '1.2' },
        suggestedAfter: ['synth-select-node', 'arpeggiator-node'],
      },
      {
        id: 'at-distort-saturation',
        nodeType: 'distort-node',
        role: 'variation',
        level: 'variation',
        title: 'Light saturation',
        description: 'Low distortion for warmth.',
        patch: { distort: '0.6' },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-distort-extreme',
        nodeType: 'distort-node',
        role: 'variation',
        level: 'variation',
        title: 'Extreme',
        description: 'High distortion for maximum aggression.',
        patch: { distort: '2' },
        suggestedAfter: ['synth-select-node'],
      },

      // ── lpf-node (3) ──
      {
        id: 'at-lpf-resonant',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'expansion',
        title: 'Resonant sweep',
        description: 'High resonance, dynamic cutoff for 303 feel.',
        patch: { lpf: '1500 6' },
        suggestedAfter: ['arpeggiator-node', 'fm-node'],
      },
      {
        id: 'at-lpf-dark',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'variation',
        title: 'Dark filter',
        description: 'Low cutoff, high resonance for darkness.',
        patch: { lpf: '500 5' },
        suggestedAfter: ['arpeggiator-node', 'fm-node'],
      },
      {
        id: 'at-lpf-sweep',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'variation',
        title: 'Sweep pattern',
        description: 'Automated cutoff movement.',
        patch: { lpf: '2000 4' },
        suggestedAfter: ['arpeggiator-node', 'fm-node'],
      },

      // ── mask-node (2) ──
      {
        id: 'at-mask-gating',
        nodeType: 'mask-node',
        role: 'variation',
        level: 'expansion',
        title: 'Rhythmic gating',
        description: 'Syncopated pattern, often probability.',
        patch: {
          maskPatternId: 'syncopated',
          maskProbabilityId: 'often',
        },
        suggestedAfter: ['arpeggiator-node'],
      },
      {
        id: 'at-mask-industrial',
        nodeType: 'mask-node',
        role: 'variation',
        level: 'variation',
        title: 'Industrial mask',
        description: 'Complex pattern, sometimes probability.',
        patch: {
          maskPatternId: 'complex',
          maskProbabilityId: 'sometimes',
        },
        suggestedAfter: ['beat-machine-node'],
      },

      // ── postgain-node (2) ──
      {
        id: 'at-postgain-boost',
        nodeType: 'postgain-node',
        role: 'movement',
        level: 'expansion',
        title: 'Level control',
        description: 'Boost after distortion to compensate.',
        patch: { postgain: '1.8' },
        suggestedAfter: ['distort-node'],
      },
      {
        id: 'at-postgain-cleanup',
        nodeType: 'postgain-node',
        role: 'movement',
        level: 'variation',
        title: 'Clean up',
        description: 'Lower gain after heavy processing.',
        patch: { postgain: '0.8' },
        suggestedAfter: ['distort-node'],
      },

      // ── late-node (2) ──
      {
        id: 'at-late-industrial',
        nodeType: 'late-node',
        role: 'space',
        level: 'expansion',
        title: 'Industrial delay',
        description: 'Medium offset, constant pattern.',
        patch: {
          lateOffsetId: 'medium',
          lateOffset: '0.1',
          latePatternId: 'constant',
          latePattern: '0.1',
        },
        suggestedAfter: ['arpeggiator-node'],
      },
      {
        id: 'at-late-echo',
        nodeType: 'late-node',
        role: 'space',
        level: 'variation',
        title: 'Rhythmic echo',
        description: 'Swing pattern, larger offset.',
        patch: {
          lateOffsetId: 'large',
          lateOffset: '0.25',
          latePatternId: 'swing',
          latePattern: '[0 0.25]*2',
        },
        suggestedAfter: ['arpeggiator-node'],
      },

      // ── crush-node (2) ──
      {
        id: 'at-crush-gritty',
        nodeType: 'crush-node',
        role: 'variation',
        level: 'expansion',
        title: 'Lo-fi texture',
        description: 'Bit crush for gritty character.',
        patch: { crush: '6' },
        suggestedAfter: ['synth-select-node', 'arpeggiator-node'],
      },
      {
        id: 'at-crush-heavy',
        nodeType: 'crush-node',
        role: 'variation',
        level: 'variation',
        title: 'Heavy crush',
        description: 'Lower bits for maximum degradation.',
        patch: { crush: '3' },
        suggestedAfter: ['synth-select-node'],
      },

      // ── phaser-node (2) ──
      {
        id: 'at-phaser-sweep',
        nodeType: 'phaser-node',
        role: 'movement',
        level: 'variation',
        title: 'Sweeping texture',
        description: 'Medium speed, high depth.',
        patch: { phaser: '4', phaserdepth: '0.8' },
        suggestedAfter: ['arpeggiator-node', 'fm-node'],
      },
      {
        id: 'at-phaser-subtle',
        nodeType: 'phaser-node',
        role: 'movement',
        level: 'variation',
        title: 'Subtle movement',
        description: 'Slow speed, low depth.',
        patch: { phaser: '2', phaserdepth: '0.3' },
        suggestedAfter: ['arpeggiator-node'],
      },

      // ── room-node (2) ──
      {
        id: 'at-room-dark',
        nodeType: 'room-node',
        role: 'space',
        level: 'variation',
        title: 'Dark space',
        description: 'Small room, short fade, lowpass at 2000Hz.',
        patch: {
          room: '0.3',
          roomsize: '3',
          roomfade: '1',
          roomlp: '2000',
        },
        suggestedAfter: ['arpeggiator-node', 'beat-machine-node'],
      },
      {
        id: 'at-room-industrial',
        nodeType: 'room-node',
        role: 'space',
        level: 'variation',
        title: 'Industrial reverb',
        description: 'Medium room, metallic character.',
        patch: {
          room: '0.5',
          roomsize: '5',
          roomfade: '2',
          roomdim: '5000',
        },
        suggestedAfter: ['beat-machine-node'],
      },

      // ── jux-node (2) ──
      {
        id: 'at-jux-crush',
        nodeType: 'jux-node',
        role: 'space',
        level: 'variation',
        title: 'Contrast',
        description: 'Crush on right channel for stereo tension.',
        patch: { jux: 'crush' },
        suggestedAfter: ['arpeggiator-node'],
      },
      {
        id: 'at-jux-delay',
        nodeType: 'jux-node',
        role: 'space',
        level: 'variation',
        title: 'Width',
        description: 'Delay on right for spatial effect.',
        patch: { jux: 'delay' },
        suggestedAfter: ['arpeggiator-node'],
      },

      // ── gain-node (2) ──
      {
        id: 'at-gain-pump',
        nodeType: 'gain-node',
        role: 'movement',
        level: 'variation',
        title: 'Pumping',
        description: 'Rhythmic gain changes for energy.',
        patch: { gain: '1.5' },
      },
      {
        id: 'at-gain-impact',
        nodeType: 'gain-node',
        role: 'movement',
        level: 'variation',
        title: 'Impact',
        description: 'Sudden boost for transitions.',
        patch: { gain: '2' },
      },

      // ── Inspired by tracks ──
      // Jeff Mills - "The Bells" (137.52 BPM, A minor)
      {
        id: 'at-beat-bells-style',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'The Bells beat',
        description: 'Overdriven TR-909 kick, open hats full decay, claps with delay. Inspired by Jeff Mills "The Bells" (137.52 BPM).',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'oh', pattern: b16('.X.X.X.X.X.X.X.X') },
            { instrument: 'cp', pattern: b16('....X.......X...') },
          ],
          bank: 'RolandTR909',
        },
      },
      {
        id: 'at-arp-bells-motif',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'expansion',
        title: 'Bells motif',
        description: 'Simple back and forth pattern, A minor, dual layer synth. Inspired by Jeff Mills "The Bells".',
        patch: {
          selectedPattern: 'up-down',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 4,
          octaveRange: 1,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-synth-bells-layer',
        nodeType: 'synth-select-node',
        role: 'melody',
        level: 'variation',
        title: 'Bell synth layer',
        description: 'Bell-like pluck, short decay for percussive melody. Inspired by Jeff Mills "The Bells".',
        patch: { sound: 'pluck' },
      },

      // Joey Beltram - "Energy Flash" (123 BPM, A♭ major)
      {
        id: 'at-beat-energy-flash',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'Energy Flash beat',
        description: 'TR-909 kick, 16th note closed hats, offbeat open hats, TR-707 rimshot. Inspired by Joey Beltram "Energy Flash" (123 BPM).',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'hh', pattern: b16('X.X.X.X.X.X.X.X.') },
            { instrument: 'oh', pattern: b16('..X...X...X...X.') },
            { instrument: 'rim', pattern: b16('....X.......X...') },
          ],
          bank: 'RolandTR909',
        },
      },
      {
        id: 'at-lpf-energy-bass',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'expansion',
        title: 'Energy bass filter',
        description: 'Resonant filter sweep on subby bass. Inspired by Joey Beltram "Energy Flash".',
        patch: { lpf: '400 6' },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-synth-energy-bass',
        nodeType: 'synth-select-node',
        role: 'bass',
        level: 'variation',
        title: 'Energy sub bass',
        description: 'Subby bass, A♭ root note, heavy and relentless. Inspired by Joey Beltram "Energy Flash".',
        patch: { sound: 'bass2' },
      },

      // Daft Punk - "Da Funk" (acid technique, 129 BPM)
      {
        id: 'at-arp-acid-style',
        nodeType: 'arpeggiator-node',
        role: 'bass',
        level: 'essential',
        title: 'Acid bassline',
        description: 'Sawtooth acid line, A minor, up-down pattern. Inspired by Phuture "Acid Trax" and Daft Punk "Da Funk" technique (129 BPM).',
        patch: {
          selectedPattern: 'up-down',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 3,
          octaveRange: 1,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'at-lpf-acid-squelch',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'expansion',
        title: 'Acid squelch',
        description: 'Low cutoff, high resonance, filter modulation for classic 303 sound. Inspired by TB-303 acid technique.',
        patch: { lpf: '600 8' },
        suggestedAfter: ['arpeggiator-node'],
      },
      {
        id: 'at-late-acid-delay',
        nodeType: 'late-node',
        role: 'space',
        level: 'variation',
        title: 'Acid delay',
        description: 'Dotted 8th note delay for chasing notes. Inspired by TB-303 acid technique.',
        patch: {
          lateOffsetId: 'medium',
          lateOffset: '0.15',
          latePatternId: 'constant',
          latePattern: '0.15',
        },
        suggestedAfter: ['arpeggiator-node'],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // UPLIFTING TRANCE
  // ═══════════════════════════════════════════
  {
    id: 'uplifting-trance',
    label: 'Uplifting Trance',
    bpm: 140,
    summary: 'Epic energy, wide chords and emotional builds.',
    recommendations: [
      // ── beat-machine-node (3) ──
      {
        id: 'ut-beat-driving',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'essential',
        title: 'Driving trance beat',
        description: 'Punchy kick, layered claps, energetic hats.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'cp', pattern: b16('....X.......X...') },
            { instrument: 'hh', pattern: b16('.X.X.X.X.X.X.X.X') },
          ],
        },
      },
      {
        id: 'ut-beat-anthem',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'expansion',
        title: 'Anthem beat',
        description: 'Bigger kick, layered percussion.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X...X...X...X...') },
            { instrument: 'cp', pattern: b16('....X.......X...') },
            { instrument: 'hh', pattern: b16('X.X.X.X.X.X.X.X.') },
          ],
        },
      },
      {
        id: 'ut-beat-breakdown',
        nodeType: 'beat-machine-node',
        role: 'rhythm',
        level: 'variation',
        title: 'Breakdown',
        description: 'Minimal beat, atmospheric.',
        patch: {
          steps: 16,
          rows: [
            { instrument: 'bd', pattern: b16('X.......X.......') },
            { instrument: 'hh', pattern: b16('..X...X...X...X.') },
          ],
        },
      },

      // ── chord-node (3) ──
      {
        id: 'ut-chord-emotional',
        nodeType: 'chord-node',
        role: 'harmony',
        level: 'essential',
        title: 'Emotional progression',
        description: 'Minor scale, 9th complexity, degrees i VI III VII.',
        patch: {
          selectedKey: 'A',
          scaleType: 'minor',
          chordComplexity: 'ninth',
          octave: 4,
          pressedKeys: [0, 5, 2, 6],
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-chord-uplifting',
        nodeType: 'chord-node',
        role: 'harmony',
        level: 'expansion',
        title: 'Uplifting',
        description: 'Major scale, seventh complexity, degrees I V vi IV.',
        patch: {
          selectedKey: 'A',
          scaleType: 'major',
          chordComplexity: 'seventh',
          octave: 4,
          pressedKeys: [0, 4, 5, 3],
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-chord-dark',
        nodeType: 'chord-node',
        role: 'harmony',
        level: 'variation',
        title: 'Dark progression',
        description: 'Minor scale, triad, degrees i iv VI V.',
        patch: {
          selectedKey: 'A',
          scaleType: 'minor',
          chordComplexity: 'triad',
          octave: 4,
          pressedKeys: [0, 3, 5, 4],
        },
        suggestedAfter: ['synth-select-node'],
      },

      // ── synth-select-node (3) ──
      {
        id: 'ut-synth-supersaw',
        nodeType: 'synth-select-node',
        role: 'melody',
        level: 'essential',
        title: 'Supersaw lead',
        description: 'Bright saw stack for anthem melodies.',
        patch: { sound: 'saw' },
      },
      {
        id: 'ut-synth-pad',
        nodeType: 'synth-select-node',
        role: 'harmony',
        level: 'expansion',
        title: 'Pad layer',
        description: 'Soft pad for harmonic support.',
        patch: { sound: 'sine' },
      },
      {
        id: 'ut-synth-pluck',
        nodeType: 'synth-select-node',
        role: 'melody',
        level: 'variation',
        title: 'Pluck lead',
        description: 'Percussive lead for rhythmic melodies.',
        patch: { sound: 'pluck' },
      },

      // ── room-node (3) ──
      {
        id: 'ut-room-hall',
        nodeType: 'room-node',
        role: 'space',
        level: 'expansion',
        title: 'Large hall',
        description: 'Big room size, long fade, wide dimension.',
        patch: {
          room: '0.9',
          roomsize: '10',
          roomfade: '8',
          roomdim: '18000',
        },
        suggestedAfter: ['chord-node', 'pad-node'],
      },
      {
        id: 'ut-room-bright',
        nodeType: 'room-node',
        role: 'space',
        level: 'variation',
        title: 'Bright hall',
        description: 'Large room, bright character.',
        patch: {
          room: '0.8',
          roomsize: '8',
          roomfade: '6',
          roomlp: '15000',
          roomdim: '16000',
        },
        suggestedAfter: ['chord-node'],
      },
      {
        id: 'ut-room-tight',
        nodeType: 'room-node',
        role: 'space',
        level: 'variation',
        title: 'Tight space',
        description: 'Small room, intimate feel for breakdowns.',
        patch: {
          room: '0.3',
          roomsize: '2',
          roomfade: '1',
          roomdim: '5000',
        },
        suggestedAfter: ['pad-node'],
      },

      // ── late-node (3) ──
      {
        id: 'ut-late-throws',
        nodeType: 'late-node',
        role: 'space',
        level: 'expansion',
        title: 'Delay throws',
        description: 'Half second offset, alternating pattern.',
        patch: {
          lateOffsetId: 'half',
          lateOffset: '0.5',
          latePatternId: 'alternating',
          latePattern: '[0 0.5]*2',
        },
        suggestedAfter: ['synth-select-node', 'chord-node'],
      },
      {
        id: 'ut-late-rhythmic',
        nodeType: 'late-node',
        role: 'space',
        level: 'variation',
        title: 'Rhythmic delay',
        description: 'Triplet pattern for movement.',
        patch: {
          lateOffsetId: 'medium',
          lateOffset: '0.1',
          latePatternId: 'triplet',
          latePattern: '[0 0.1 0.1]',
        },
        suggestedAfter: ['arpeggiator-node'],
      },
      {
        id: 'ut-late-subtle',
        nodeType: 'late-node',
        role: 'space',
        level: 'variation',
        title: 'Subtle echo',
        description: 'Small offset, constant pattern.',
        patch: {
          lateOffsetId: 'small',
          lateOffset: '0.05',
          latePatternId: 'constant',
          latePattern: '0.05',
        },
        suggestedAfter: ['pad-node'],
      },

      // ── arpeggiator-node (3) ──
      {
        id: 'ut-arp-rising',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'expansion',
        title: 'Rising tension',
        description: 'Up-Down, 3 octaves, minor, building energy.',
        patch: {
          selectedPattern: 'up-down',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 3,
          octaveRange: 3,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-arp-fast',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'variation',
        title: 'Fast arp',
        description: 'Up pattern, 2 octaves, energetic.',
        patch: {
          selectedPattern: 'up',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 4,
          octaveRange: 2,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-arp-sparse',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'variation',
        title: 'Sparse motif',
        description: 'Outside-In, 1 octave, minimal.',
        patch: {
          selectedPattern: 'outside-in',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 4,
          octaveRange: 1,
        },
        suggestedAfter: ['synth-select-node'],
      },

      // ── adsr-node (3) ──
      {
        id: 'ut-adsr-long',
        nodeType: 'adsr-node',
        role: 'movement',
        level: 'expansion',
        title: 'Long pad envelope',
        description:
          'Slow attack, long decay, high sustain, very long release.',
        patch: {
          attack: '0.6',
          decay: '0.8',
          sustain: '0.75',
          release: '1.5',
        },
        suggestedAfter: ['pad-node', 'synth-select-node'],
      },
      {
        id: 'ut-adsr-pluck',
        nodeType: 'adsr-node',
        role: 'movement',
        level: 'variation',
        title: 'Pluck envelope',
        description: 'Fast attack, short decay, medium sustain.',
        patch: {
          attack: '0.01',
          decay: '0.15',
          sustain: '0.3',
          release: '0.2',
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-adsr-swell',
        nodeType: 'adsr-node',
        role: 'movement',
        level: 'variation',
        title: 'Swell',
        description: 'Very slow attack, long release for pads.',
        patch: {
          attack: '1.0',
          decay: '0.5',
          sustain: '0.8',
          release: '1.2',
        },
        suggestedAfter: ['pad-node'],
      },

      // ── lpf-node (3) ──
      {
        id: 'ut-lpf-sweep',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'expansion',
        title: 'Filter sweeps',
        description: 'Resonant sweep for breakdowns and builds.',
        patch: { lpf: '1000 4' },
        suggestedAfter: ['synth-select-node', 'chord-node'],
      },
      {
        id: 'ut-lpf-bright',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'variation',
        title: 'Bright open',
        description: 'High cutoff, low resonance for clarity.',
        patch: { lpf: '4000 1' },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-lpf-dark',
        nodeType: 'lpf-node',
        role: 'movement',
        level: 'variation',
        title: 'Dark sweep',
        description: 'Low cutoff, high resonance for drama.',
        patch: { lpf: '400 5' },
        suggestedAfter: ['chord-node', 'pad-node'],
      },

      // ── pan-node (2) ──
      {
        id: 'ut-pan-wide',
        nodeType: 'pan-node',
        role: 'space',
        level: 'expansion',
        title: 'Wide stereo',
        description: 'Slow pan for immersive width.',
        patch: { pan: '0.3' },
        suggestedAfter: ['pad-node', 'chord-node'],
      },
      {
        id: 'ut-pan-rhythmic',
        nodeType: 'pan-node',
        role: 'space',
        level: 'variation',
        title: 'Rhythmic pan',
        description: 'Faster movement for energy.',
        patch: { pan: '0.7' },
        suggestedAfter: ['arpeggiator-node'],
      },

      // ── distort-node (2) ──
      {
        id: 'ut-distort-edge',
        nodeType: 'distort-node',
        role: 'variation',
        level: 'variation',
        title: 'Lead edge',
        description: 'Light distortion for cutting lead.',
        patch: { distort: '0.6' },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-distort-warm',
        nodeType: 'distort-node',
        role: 'variation',
        level: 'variation',
        title: 'Warm saturation',
        description: 'Very light for character.',
        patch: { distort: '0.3' },
        suggestedAfter: ['synth-select-node'],
      },

      // ── mask-node (2) ──
      {
        id: 'ut-mask-sidechain',
        nodeType: 'mask-node',
        role: 'variation',
        level: 'variation',
        title: 'Sidechain pump',
        description: 'Half pattern, always probability, for ducking.',
        patch: {
          maskPatternId: 'half',
          maskProbabilityId: 'always',
        },
        suggestedAfter: ['chord-node', 'pad-node'],
      },
      {
        id: 'ut-mask-gate',
        nodeType: 'mask-node',
        role: 'variation',
        level: 'variation',
        title: 'Rhythmic gate',
        description: 'Syncopated pattern, sometimes probability.',
        patch: {
          maskPatternId: 'syncopated',
          maskProbabilityId: 'sometimes',
        },
        suggestedAfter: ['arpeggiator-node'],
      },

      // ── phaser-node (2) ──
      {
        id: 'ut-phaser-movement',
        nodeType: 'phaser-node',
        role: 'movement',
        level: 'variation',
        title: 'Movement',
        description: 'Slow speed, medium depth for evolving pads.',
        patch: { phaser: '2', phaserdepth: '0.5' },
        suggestedAfter: ['pad-node'],
      },
      {
        id: 'ut-phaser-subtle',
        nodeType: 'phaser-node',
        role: 'movement',
        level: 'variation',
        title: 'Subtle texture',
        description: 'Very slow, low depth.',
        patch: { phaser: '1', phaserdepth: '0.2' },
        suggestedAfter: ['pad-node'],
      },

      // ── Inspired by tracks ──
      // Supersaw technique for uplifting trance
      {
        id: 'ut-synth-supersaw-lead',
        nodeType: 'synth-select-node',
        role: 'melody',
        level: 'essential',
        title: 'Supersaw lead',
        description: 'Layered saw detuned, wide stereo for anthem melodies. Based on classic uplifting trance supersaw technique.',
        patch: { sound: 'saw' },
      },
      {
        id: 'ut-adsr-supersaw-env',
        nodeType: 'adsr-node',
        role: 'movement',
        level: 'expansion',
        title: 'Supersaw envelope',
        description: 'Slow attack (0.98), long release (3.80) for wide pad-like lead. Based on supersaw technique.',
        patch: {
          attack: '0.98',
          decay: '0.5',
          sustain: '0.7',
          release: '1.5',
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-room-supersaw-hall',
        nodeType: 'room-node',
        role: 'space',
        level: 'variation',
        title: 'Supersaw hall',
        description: 'Large hall reverb for drama and width. Based on uplifting trance production.',
        patch: {
          room: '0.9',
          roomsize: '10',
          roomfade: '8',
          roomdim: '18000',
        },
        suggestedAfter: ['synth-select-node'],
      },

      // General uplifting trance production
      {
        id: 'ut-chord-emotional-anthem',
        nodeType: 'chord-node',
        role: 'harmony',
        level: 'essential',
        title: 'Emotional anthem',
        description: 'A minor, ninth complexity, emotional progression for uplifting anthems.',
        patch: {
          selectedKey: 'A',
          scaleType: 'minor',
          chordComplexity: 'ninth',
          octave: 4,
          pressedKeys: [0, 5, 2, 6],
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-arp-anthem-rising',
        nodeType: 'arpeggiator-node',
        role: 'melody',
        level: 'expansion',
        title: 'Anthem rising arp',
        description: 'Up-down, A minor, 3 octaves for rising tension. Based on uplifting trance technique.',
        patch: {
          selectedPattern: 'up-down',
          selectedKey: 'A',
          selectedChordType: 'minor',
          octave: 3,
          octaveRange: 3,
        },
        suggestedAfter: ['synth-select-node'],
      },
      {
        id: 'ut-pad-anthem-wide',
        nodeType: 'pad-node',
        role: 'harmony',
        level: 'variation',
        title: 'Wide anthem pad',
        description: 'Wide pad, slow attack for epic background layers. Based on uplifting trance production.',
        patch: {
          selectedKey: 'A',
          selectedScaleType: 'minor',
          octave: 4,
          mode: 'chord',
          steps: 8,
        },
        suggestedAfter: ['synth-select-node'],
      },
    ],
  },
];

export const GENRE_GUIDE_MAP: Record<string, GenreGuide> = GENRE_GUIDES.reduce(
  (acc, guide) => {
    acc[guide.id] = guide;
    return acc;
  },
  {} as Record<string, GenreGuide>,
);

export function getGuideForGenre(genreId: string): GenreGuide | undefined {
  return GENRE_GUIDE_MAP[genreId];
}

export function getRecommendationsForGenre(
  genreId: string,
): NodeRecommendation[] {
  return GENRE_GUIDE_MAP[genreId]?.recommendations ?? [];
}

export function getRecommendationsForNodeType(
  genreId: string,
  nodeType: AppNodeType,
): NodeRecommendation[] {
  return getRecommendationsForGenre(genreId).filter(
    (r) => r.nodeType === nodeType,
  );
}

export function getRecommendationsByLevel(
  genreId: string,
  level: Level,
): NodeRecommendation[] {
  return getRecommendationsForGenre(genreId).filter((r) => r.level === level);
}

export const FIELD_LABELS: Record<string, string> = {
  selectedKey: 'Key',
  selectedScaleType: 'Scale',
  scaleType: 'Scale',
  selectedChordType: 'Chord type',
  selectedPattern: 'Pattern',
  octaveRange: 'Octave range',
  octave: 'Octave',
  chordComplexity: 'Complexity',
  mode: 'Mode',
  steps: 'Steps',
  sound: 'Sound',
  maskPatternId: 'Mask pattern',
  maskProbabilityId: 'Probability',
  lateOffsetId: 'Offset',
  latePatternId: 'Pattern type',
  phaserdepth: 'Depth',
  roomsize: 'Room size',
  roomfade: 'Fade',
  roomlp: 'Lowpass',
  roomdim: 'Dimension',
  attack: 'Attack',
  decay: 'Decay',
  sustain: 'Sustain',
  release: 'Release',
  gain: 'Gain',
  pan: 'Pan',
  lpf: 'LPF',
  distort: 'Distortion',
  crush: 'Crush',
  fm: 'FM',
  postgain: 'Post-gain',
  phaser: 'Speed',
  room: 'Room',
  jux: 'Jux',
};

export const DERIVED_FIELDS = new Set([
  'latePattern',
  'lateOffset',
  'maskPattern',
  'maskProbability',
  'plyMultiplier',
  'plyProbability',
  'rows',
  'pressedKeys',
]);

export function formatPatchField(
  key: string,
  value: unknown,
): { label: string; value: string } | null {
  if (DERIVED_FIELDS.has(key)) return null;

  const label = FIELD_LABELS[key] ?? key;
  const formattedValue = Array.isArray(value)
    ? value.join(', ')
    : String(value);

  return { label, value: formattedValue };
}
