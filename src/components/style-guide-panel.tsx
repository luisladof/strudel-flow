import { useStrudelStore } from '@/store/strudel-store';
import { useAppStore } from '@/store/app-store';
import { useShallow } from 'zustand/react/shallow';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X } from 'lucide-react';
import {
  GENRE_GUIDES,
  getRecommendationsByLevel,
  getGuideForGenre,
  type Level,
} from '@/data/genre-guides';
import { NodeRecommendationCard } from '@/components/node-recommendation-card';
import { useIsMobile } from '@/hooks/use-mobile';

type StyleGuidePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const LEVELS: { value: Level; label: string }[] = [
  { value: 'essential', label: 'Essential' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'variation', label: 'Variation' },
];

function StyleGuideContent() {
  const { selectedGenre, setSelectedGenre, setCpm } = useStrudelStore(
    useShallow((s) => ({
      selectedGenre: s.selectedGenre,
      setSelectedGenre: s.setSelectedGenre,
      setCpm: s.setCpm,
    })),
  );
  const nodes = useAppStore((s) => s.nodes);
  const applyRecommendation = useAppStore((s) => s.applyRecommendation);
  const addRecommendedNode = useAppStore((s) => s.addRecommendedNode);

  const guide = selectedGenre ? getGuideForGenre(selectedGenre) : undefined;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Style Guide</h2>
      </div>

      <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
        <div className="flex flex-col gap-2">
          <Select
            value={selectedGenre ?? ''}
            onValueChange={(value) => setSelectedGenre(value || null)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a style..." />
            </SelectTrigger>
            <SelectContent>
              {GENRE_GUIDES.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {guide ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {guide.bpm} BPM
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setCpm(guide.bpm.toString())}
              >
                Use {guide.bpm} BPM
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">{guide.summary}</p>

            <Accordion
              type="multiple"
              defaultValue={['essential']}
              className="w-full"
            >
              {LEVELS.map(({ value, label }) => {
                const recs = getRecommendationsByLevel(guide.id, value);
                if (recs.length === 0) return null;
                return (
                  <AccordionItem key={value} value={value} className="border-none">
                    <AccordionTrigger className="text-sm font-medium py-2">
                      <div className="flex items-center justify-between w-full">
                        <span>{label}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {recs.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {recs.map((rec) => (
                          <NodeRecommendationCard
                            key={rec.id}
                            recommendation={rec}
                            nodes={nodes}
                            onApply={(nodeId) =>
                              applyRecommendation(nodeId, rec.patch)
                            }
                            onAdd={() => addRecommendedNode(rec.nodeType, rec.patch)}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            Choose a style to see recommendations.
          </p>
        )}
      </div>
    </div>
  );
}

export function StyleGuidePanel({ open, onOpenChange }: StyleGuidePanelProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[340px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Style Guide</SheetTitle>
          </SheetHeader>
          <StyleGuideContent />
        </SheetContent>
      </Sheet>
    );
  }

  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[380px] bg-background border-l shadow-lg z-50 flex flex-col">
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <StyleGuideContent />
    </div>
  );
}
