import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AppNode } from '@/components/nodes';
import nodesConfig from '@/components/nodes';
import type { NodeRecommendation } from '@/data/genre-guides';
import { formatPatchField } from '@/data/genre-guides';
import { ApplyRecommendationDialog } from '@/components/apply-recommendation-dialog';

type RecommendationState =
  | { type: 'add-node' }
  | { type: 'apply-single'; node: AppNode }
  | { type: 'fully-applied' }
  | {
      type: 'choose-node';
      nodes: Array<{ node: AppNode; applied: boolean }>;
    };

function getCategoryLabel(nodeType: string): string {
  const category = nodesConfig[nodeType as keyof typeof nodesConfig]?.category;
  if (!category) return '';
  if (category === 'Instruments') return 'Instrument';
  if (category === 'Synths') return 'Synth';
  if (category === 'Audio Effects' || category === 'Time Effects') return 'Effect';
  return category;
}

function getRecommendationState(
  recommendation: NodeRecommendation,
  nodes: AppNode[],
): RecommendationState {
  const matchingNodes = nodes.filter((n) => n.type === recommendation.nodeType);

  if (matchingNodes.length === 0) {
    return { type: 'add-node' };
  }

  const appliedNodes = matchingNodes.filter((node) =>
    Object.entries(recommendation.patch).every(([key, value]) => {
      const nodeValue = (node.data as Record<string, unknown>)[key];
      if (Array.isArray(value) && Array.isArray(nodeValue)) {
        return JSON.stringify(value) === JSON.stringify(nodeValue);
      }
      return nodeValue === value;
    }),
  );

  if (appliedNodes.length === matchingNodes.length) {
    return { type: 'fully-applied' };
  }

  if (matchingNodes.length === 1) {
    return { type: 'apply-single', node: matchingNodes[0] };
  }

  return {
    type: 'choose-node',
    nodes: matchingNodes.map((node) => ({
      node,
      applied: appliedNodes.includes(node),
    })),
  };
}

type NodeRecommendationCardProps = {
  recommendation: NodeRecommendation;
  nodes: AppNode[];
  compact?: boolean;
  onApply: (nodeId: string) => void;
  onAdd: () => void;
};

export function NodeRecommendationCard({
  recommendation,
  nodes,
  compact = false,
  onApply,
  onAdd,
}: NodeRecommendationCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetNode, setTargetNode] = useState<AppNode | null>(null);
  const state = getRecommendationState(recommendation, nodes);
  const nodeTitle =
    nodesConfig[recommendation.nodeType]?.title ?? recommendation.nodeType;

  const handleApply = (node: AppNode) => {
    const hasExistingData = Object.keys(recommendation.patch).some((key) => {
      const value = (node.data as Record<string, unknown>)[key];
      return value !== undefined && value !== null && value !== '';
    });

    if (hasExistingData) {
      setTargetNode(node);
      setDialogOpen(true);
    } else {
      onApply(node.id);
    }
  };

  const handleCTA = () => {
    if (state.type === 'add-node') {
      onAdd();
    } else if (state.type === 'apply-single') {
      handleApply(state.node);
    }
  };

  if (compact) {
    return (
      <>
        <div className="flex items-center justify-between gap-2 p-2 rounded border">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">
              {recommendation.title}
            </div>
          </div>
          {state.type === 'fully-applied' ? (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Check className="w-3 h-3" />
              Applied
            </div>
          ) : state.type === 'apply-single' ? (
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleApply(state.node)}>
              Apply
            </Button>
          ) : state.type === 'choose-node' ? (
            <Select onValueChange={(nodeId) => {
              const found = state.nodes.find((n) => n.node.id === nodeId);
              if (found) handleApply(found.node);
            }}>
              <SelectTrigger className="w-24 h-7 text-xs">
                <SelectValue placeholder="Choose..." />
              </SelectTrigger>
              <SelectContent>
                {state.nodes.map(({ node, applied }) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.data.title || nodeTitle} {applied && '✓'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
        {targetNode && (
          <ApplyRecommendationDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            recommendation={recommendation}
            targetNode={targetNode}
            onConfirm={() => onApply(targetNode.id)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 p-3 rounded border bg-card">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{recommendation.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                {getCategoryLabel(recommendation.nodeType)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {recommendation.description}
            </div>
          </div>
          {state.type === 'fully-applied' && (
            <div className="flex items-center gap-1 text-xs text-green-600 whitespace-nowrap">
              <Check className="w-3 h-3" />
              Applied
            </div>
          )}
        </div>

        {recommendation.suggestedAfter && recommendation.suggestedAfter.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Best with:{' '}
            {recommendation.suggestedAfter
              .map((type) => nodesConfig[type]?.title ?? type)
              .join(', ')}
          </div>
        )}

        <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
          {Object.entries(recommendation.patch)
            .map(([key, value]) => formatPatchField(key, value))
            .filter(Boolean)
            .map((field) => (
              <span key={field!.label}>
                <span className="text-foreground">{field!.label}:</span>{' '}
                {field!.value}
              </span>
            ))}
        </div>

        {state.type !== 'fully-applied' && (
          <div className="flex gap-2 mt-1">
            {state.type === 'add-node' && (
              <Button size="sm" className="w-full text-xs" onClick={handleCTA}>
                Add {nodeTitle}
              </Button>
            )}
            {state.type === 'apply-single' && (
              <Button size="sm" className="w-full text-xs" onClick={handleCTA}>
                Apply to {state.node.data.title || nodeTitle}
              </Button>
            )}
            {state.type === 'choose-node' && (
              <Select onValueChange={(nodeId) => {
                const found = state.nodes.find((n) => n.node.id === nodeId);
                if (found) handleApply(found.node);
              }}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue placeholder="Apply to..." />
                </SelectTrigger>
                <SelectContent>
                  {state.nodes.map(({ node, applied }) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.data.title || nodeTitle} {applied && '✓'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>
      {targetNode && (
        <ApplyRecommendationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          recommendation={recommendation}
          targetNode={targetNode}
          onConfirm={() => onApply(targetNode.id)}
        />
      )}
    </>
  );
}
