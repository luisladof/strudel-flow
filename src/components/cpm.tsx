import { useStrudelStore } from '@/store/strudel-store';
import { useShallow } from 'zustand/react/shallow';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { GENRES, isBpmInRange, getBpmRange } from '@/data/genres';

export function CPM() {
  const { cpm, bpc, genre, setCpm, setBpc, setGenre } = useStrudelStore(
    useShallow((s) => ({
      cpm: s.cpm,
      bpc: s.bpc,
      genre: s.genre,
      setCpm: s.setCpm,
      setBpc: s.setBpc,
      setGenre: s.setGenre,
    }))
  );

  const bpm = parseInt(cpm) || 120;
  const beatsPerCycle = parseInt(bpc) || 4;
  const bpmInRange = isBpmInRange(genre, bpm);
  const bpmRange = getBpmRange(genre);

  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border min-w-48">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Genre
        </label>
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select genre..." />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((g) => (
              <SelectItem key={g.name} value={g.name}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2">
            <label className="text-base font-medium text-card-foreground">
              BPM: {bpm}
            </label>
            {genre && bpmRange !== 'N/A' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      bpmInRange
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-yellow-500/20 text-yellow-600'
                    }`}
                  >
                    {bpmInRange ? 'in range' : 'out of range'}
                  </span>
                </TooltipTrigger>
                <TooltipContent sideOffset={5}>
                  {bpmInRange
                    ? `${bpm} BPM is within ${genre} range`
                    : `${genre} typically uses ${bpmRange} BPM`}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Slider
            value={[bpm]}
            onValueChange={([v]) => setCpm(v.toString())}
            min={1}
            max={200}
            step={1}
            className="w-full pt-2"
          />
        </div>

        <div>
          <label className="text-base font-medium text-card-foreground pb-2">
            BPC: {beatsPerCycle}
          </label>
          <Slider
            value={[beatsPerCycle]}
            onValueChange={([v]) => setBpc(v.toString())}
            min={1}
            max={10}
            step={1}
            className="w-full pt-2"
          />
        </div>
      </div>
    </div>
  );
}
