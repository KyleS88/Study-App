import type { AppEdge, AppNode, RawEdge, RawNode } from "../types/types";
import { apiUrl } from './useMapData';
import axios from 'axios';
import { useDataMap } from './useMapData';
import { useCallback } from "react";
const useGetApp = () => {
    const { setNodes, setEdges, userID } = useDataMap();
    const startUp = useCallback(() => {
        axios.get(`${apiUrl}user/edges/${userID}`).then((res) => {
            const rawEdgeData: RawEdge[] = res.data.edges;
            const formatedEdges: AppEdge[] = rawEdgeData.map((rawEdge: RawEdge) => (
                {
                    id: String(rawEdge.id),
                    source: String(rawEdge.source),
                    target: String(rawEdge.target),
                    type: 'EditEdge',
                    data: {
                        label: "Edit Note",
                        note: String(rawEdge.note),
                        userId: String(rawEdge.userId),
                    },
                }
            ));
            setEdges(formatedEdges);
        });
        axios.get(`${apiUrl}user/nodes/${userID}`).then((res) => {
            const rawNodesData: RawNode[] = res.data.nodes;
            const formatedNodes: AppNode[] = rawNodesData.map((rawNode: RawNode) => (
                {
                    id: String(rawNode.uuid),
                    type: rawNode.type as 'ResizeNode',
                    position: {
                        x: Number(rawNode.position_x), 
                        y: Number(rawNode.position_y)
                    },
                    data: { 
                        label: String(rawNode.label), 
                        note: String(rawNode.note), 
                        userId: String(rawNode.user_id),
                    },
                    style: {
                        height: Number(rawNode.style_height),
                        width: Number(rawNode.style_width)
                    }
                } as AppNode
            ));
            setNodes(formatedNodes);
        })
}, [setEdges, setNodes, userID])
  return {
    startUp,
  }
}

export default useGetApp


