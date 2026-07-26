import { useCallback, useState, useMemo } from 'react';
import { Play, Pause, Trash, NotebookText, Sparkles } from 'lucide-react';

import {
  NodeHeaderTitle,
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderAction,
  NodeHeaderIcon,
} from '@/components/node-header';
import { WorkflowNodeData, AppNodeType } from '@/components/nodes/';
import nodesConfig from '@/components/nodes/';
import { useWorkflowRunner } from '@/hooks/use-workflow-runner';
import { iconMapping } from '@/data/icon-mapping';
import { BaseNode } from '@/components/base-node';
import { useAppStore } from '@/store/app-store';
import { useStrudelStore } from '@/store/strudel-store';
import PatternPopup from '@/components/pattern-popup';
import { BaseHandle } from '@/components/base-handle';
import { Position } from '@xyflow/react';
import { findConnectedComponents } from '@/lib/graph-utils';
import { getRecommendationsForNodeType, getGuideForGenre } from '@/data/genre-guides';
import { NodeRecommendationCard } from '@/components/node-recommendation-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function WorkflowNode({
  id,
  data,
  type,
  children,
}: {
  id: string;
  data: WorkflowNodeData;
  type?: AppNodeType;
  children?: React.ReactNode;
}) {
  const { forceEvaluate } = useWorkflowRunner();
  const [show, setShow] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(data?.title || '');

  const { removeNode, edges, nodes, updateNodeData } = useAppStore(
    (state) => state
  );
  const selectedGenre = useStrudelStore((state) => state.selectedGenre);
  const nodeState = useAppStore((state) => state.nodes.find((n) => n.id === id))
    ?.data?.state;

  const isPaused = nodeState === 'paused';

  const handleDoubleClick = () => {
    setEditTitle(data?.title || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed) {
      updateNodeData(id, { title: trimmed });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  // Determine if this node is an instrument based on its type
  const isInstrument = type
    ? nodesConfig[type]?.category === 'Instruments'
    : false;

  // Check if there are style recommendations for this node type
  const hasRecommendations =
    selectedGenre && type
      ? getRecommendationsForNodeType(selectedGenre, type).length > 0
      : false;

  // Find all connected nodes for this group using findConnectedComponents
  const { connectedNodeIds } = useMemo(() => {
    const allComponents = findConnectedComponents(nodes, edges);
    const connectedComponent = allComponents.find((component) =>
      component.includes(id)
    ) || [id];
    const nodeIds = new Set(connectedComponent);
    return { connectedNodeIds: nodeIds };
  }, [nodes, edges, id]);

  const onPlay = useCallback(() => {
    connectedNodeIds.forEach((nodeId) => {
      updateNodeData(nodeId, { state: 'running' });
    });
    forceEvaluate();
  }, [forceEvaluate, connectedNodeIds, updateNodeData]);

  const onPause = useCallback(() => {
    connectedNodeIds.forEach((nodeId) => {
      updateNodeData(nodeId, { state: 'paused' });
    });
    forceEvaluate();
  }, [forceEvaluate, connectedNodeIds, updateNodeData]);

  const onDelete = useCallback(() => {
    removeNode(id);
  }, [id, removeNode]);

  const IconComponent = data?.icon ? iconMapping[data.icon] : undefined;

  return (
    <BaseNode>
      <BaseHandle position={Position.Top} type="target" />
      <BaseHandle position={Position.Bottom} type="source" />
      <NodeHeader>
        <NodeHeaderIcon>
          {IconComponent ? <IconComponent aria-label={data?.icon} /> : null}
        </NodeHeaderIcon>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 font-semibold bg-transparent border-none outline-none text-sm user-select-none"
            autoFocus
          />
        ) : (
          <NodeHeaderTitle onDoubleClick={handleDoubleClick}>
            {data?.title}
          </NodeHeaderTitle>
        )}
        <NodeHeaderActions>
          {isInstrument && (
            <NodeHeaderAction
              onClick={isPaused ? onPlay : onPause}
              label={isPaused ? 'Resume group' : 'Pause group'}
              variant={isPaused ? 'default' : 'ghost'}
            >
              {isPaused ? <Play /> : <Pause />}
            </NodeHeaderAction>
          )}
          <NodeHeaderAction
            label="Pattern Preview"
            onClick={() => setShow(!show)}
          >
            <NotebookText />
          </NodeHeaderAction>
          {hasRecommendations && type && (
            <Popover open={suggestionsOpen} onOpenChange={setSuggestionsOpen}>
              <PopoverTrigger asChild>
                <NodeHeaderAction
                  label="Style suggestions"
                  onClick={() => setSuggestionsOpen(!suggestionsOpen)}
                >
                  <Sparkles />
                </NodeHeaderAction>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2" align="end" side="bottom">
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-medium text-muted-foreground px-1">
                    {getGuideForGenre(selectedGenre!)?.label} suggestions
                  </div>
                  {getRecommendationsForNodeType(selectedGenre!, type).map((rec) => (
                    <NodeRecommendationCard
                      key={rec.id}
                      recommendation={rec}
                      nodes={nodes}
                      compact
                      onApply={(nodeId) => {
                        updateNodeData(nodeId, rec.patch as Record<string, unknown>);
                        setSuggestionsOpen(false);
                      }}
                      onAdd={() => setSuggestionsOpen(false)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          <NodeHeaderAction
            onClick={onDelete}
            variant="ghost"
            label="Delete node"
          >
            <Trash />
          </NodeHeaderAction>
        </NodeHeaderActions>
      </NodeHeader>
      {children}
      {show && <PatternPopup id={id} />}
    </BaseNode>
  );
}

export default WorkflowNode;
