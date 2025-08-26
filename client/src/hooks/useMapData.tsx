

import { useCallback, useMemo, useState, useRef } from 'react';
import {
  type Edge, 
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from '@xyflow/react';
import useStore from '../store/mapStore';
import { v4 as uuidv4 } from 'uuid';
import { type AppNode, type ResizeNodeProps } from '../assets/types';
import axios from 'axios';
import ResizeNode from '../components/ReactFlowComponents/ResizeNode';

export const useDataMap = () => {
    const setNodes = useStore((state) => state.setNodes);
    const nodes: AppNode[] = useStore((state) => state.nodes);
    const setEdges = useStore((state) => state.setEdges)
    const edges: Edge[] = useStore((state) => state.edges);
    const onNodesChange: OnNodesChange<AppNode> = useStore((state) => state.onNodesChange);
    const onEdgesChange: OnEdgesChange = useStore((state) => state.onEdgesChange);
    const onConnect: OnConnect = useStore((state) => state.onConnect);
    const [activeNode, setActiveNode] = useState<AppNode | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [currTerm, setCurrTerm] = useState<string>('');
    
    const handleAddTerm = async (): Promise<void> => {
            const id = uuidv4();
            const node: AppNode = {
                id,
                type: 'default',
                position: {x: window.innerWidth / 2, y: window.innerHeight / 2},
                data: {label: currTerm, note: ""},
                style:{
                    height: 60, 
                    width: 180, 
                },
            }
            setNodes((nodeSnapshot: AppNode[]) => ([...nodeSnapshot, node]));
            setCurrTerm('');
            await axios.post("http://localhost:5173/user/nodes", [node]);
        };
    
    const handleUpdateNodeLabel = useCallback((nodeid: string, term: string): void => {
        if (!nodeid) return;
        try {
            const existNode = nodes.some((node) => node.id === nodeid);
            if(!existNode) {
                throw new Error("Current id does not match any existing node");
            }
            setNodes(nodes.map((node)=>(node.id===nodeid?{...node, data:{...node.data, label: term}}: node)));
            console.log(`${nodeid} has succesfully been updated`);
            setCurrTerm(term);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            };
            };
        }, [nodes, setNodes]);

    const nodeTypes = useMemo(() => ({
        ResizeNode: (nodeProp: ResizeNodeProps) =>
            <ResizeNode {...nodeProp} handleUpdateNodeLabel={handleUpdateNodeLabel} />
        }), 
        [handleUpdateNodeLabel]
    );

      const handleFocusInput = () => {
        inputRef.current?.focus();
    }

    const handleSelectAll = useCallback((): void => {
        setNodes((nodeSnapshot) => {
            const updatedNode = nodeSnapshot.map((node: AppNode)=>({...node, selected:true}));
            return updatedNode;
            }
        );
    }, [setNodes]);

    const handleUnselect = (): void => {
        setNodes((prevNodes) => 
            prevNodes.map((node: AppNode)=>({...node, selected: false}))
        )
    }
    const handleNodeClick = useCallback((_:React.MouseEvent, currNode: AppNode) => {
        setNodes((nodeSnapshot)=>nodeSnapshot.map((node: AppNode) => (node.id === currNode.id? {...node, type:'ResizeNode'}: {...node, type: 'default'})));
        setActiveNode(currNode);
        setCurrTerm(currNode.data.label);
        handleFocusInput();
        }, [setActiveNode, setNodes, setCurrTerm], 
    )

    const handlePaneClick = useCallback(() => {
        setNodes((nodeSnapshot)=>nodeSnapshot.map((node)=>({...node, selected:false, type:'default'})));
        setActiveNode(null);
        setCurrTerm('');
        }, [setActiveNode, setNodes, setCurrTerm],
    )

    
    return {
        handleAddTerm, 
        handleUpdateNodeLabel,
        nodeTypes,
        currTerm,
        setCurrTerm,
        setNodes,
        nodes,
        setEdges,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        activeNode,
        setActiveNode,
        handleSelectAll,
        handleUnselect,
        handleNodeClick,
        handlePaneClick,
        
    };
};
