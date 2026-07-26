import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { AppNode, WorkflowNodeData } from '@/components/nodes';
import nodesConfig from '@/components/nodes';
import type { NodeRecommendation } from '@/data/genre-guides';
import { formatPatchField } from '@/data/genre-guides';

type ApplyRecommendationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation: NodeRecommendation;
  targetNode: AppNode;
  onConfirm: () => void;
};

function getChangedFields(
  patch: Partial<WorkflowNodeData>,
  currentData: Record<string, unknown>,
): Array<{ label: string; from: string; to: string }> {
  return Object.entries(patch)
    .map(([key, value]) => {
      const formatted = formatPatchField(key, value);
      if (!formatted) return null;
      const current = currentData[key];
      const from = current === undefined ? '(none)' : String(current);
      return { label: formatted.label, from, to: formatted.value };
    })
    .filter((f): f is { label: string; from: string; to: string } => f !== null && f.from !== f.to);
}

export function ApplyRecommendationDialog({
  open,
  onOpenChange,
  recommendation,
  targetNode,
  onConfirm,
}: ApplyRecommendationDialogProps) {
  const changes = getChangedFields(
    recommendation.patch,
    targetNode.data as Record<string, unknown>,
  );
  const nodeTitle = targetNode.data.title || (nodesConfig[recommendation.nodeType]?.title ?? recommendation.nodeType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Apply "{recommendation.title}"</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          This will change on <span className="font-medium text-foreground">{nodeTitle}</span>:
        </div>
        <ul className="text-sm space-y-1">
          {changes.map((c) => (
            <li key={c.label} className="flex gap-2">
              <span className="text-xs text-muted-foreground">{c.label}:</span>
              <span className="text-muted-foreground line-through">{c.from}</span>
              <span>→</span>
              <span className="font-medium">{c.to}</span>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
