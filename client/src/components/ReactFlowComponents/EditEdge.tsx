import type {  EditEdgeProps } from "../../assets/types";
import {
  getBezierPath,
  EdgeLabelRenderer,
  useInternalNode,
} from '@xyflow/react';
import {getEdgeParams} from "../../hooks/utills";
import { memo } from "react";
import "../../styles/MapEditor.css"
// type SpecialPath = { p: string; cx: number; cy: number };
const EditEdge = ({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, style }: EditEdgeProps) => {

    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
    
    if (!sourceNode || !targetNode) {
        return null;
    }
    
    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
        sourceNode,
        targetNode,
    );
    
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    });
    
    return (
        <>
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            strokeWidth={5}
            markerEnd={markerEnd}
            style={style}
        />
            <EdgeLabelRenderer>
                <div
                className="button-edge__label nodrag nopan"
                style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: "all",
                zIndex: 1,
          }}
                >
                    <button className="button-edge__button">
                        Edit Note
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
        

    );
    }

export default memo(EditEdge);