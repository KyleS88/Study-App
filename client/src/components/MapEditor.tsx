import '@xyflow/react/dist/style.css';
import { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import '../styles/MapEditor.css';
import MapCanvas from './MapCanvas';
import MapSidebar from './MapSidebar';
import { type AppNode, type MapEditorProps} from '../assets/types';
import axios from 'axios';
import { useDataMap } from '../hooks/useMapData';
const MapEditor: React.FC<MapEditorProps> = ({ setIsEditNote }) => {
    //Functions and variables from map hook
    const { handleSelectAll, handleUnselect, handleNodeClick, handlePaneClick, handleAddTerm, nodeTypes, currTerm, setCurrTerm, setNodes, nodes, setEdges, edges, onNodesChange, onEdgesChange, onConnect, activeNode, setActiveNode} = useDataMap();


    //convert activeNodeId to selectedNodes
    const [nodesPatchQueue, setNodesPatchQueue] = useState<AppNode[]>([]);
    //**Fix Type of field here */
    const addToPatchNodeQueue = (item: AppNode): void => {
        const itemId = item.id;
        setNodesPatchQueue((prevPatch): AppNode[] => prevPatch.map(node => node.id === itemId? item: node));                                                                                                                                                                                
    };
    //handle get on startup
    // useEffect((): void => {
    //     axios.get("http://localhost:5173/user/nodes").then((res) => {
    //         const rawNodesData: RawNode[] = res.data;
    //         const formatedNodes: AppNode[] = rawNodesData.map((rawNode: RawNode) => (
    //             {
    //                 id: String(rawNode.uuid),
    //                 type: rawNode.type as 'ResizeNode' | 'default',
    //                 position: {
    //                     x: Number(rawNode.position_x), 
    //                     y: Number(rawNode.position_y)
    //                 },
    //                 data: { label: String(rawNode.label), note: String(rawNode.note)},
    //                 style: {
    //                     height: Number(rawNode.style_height),
    //                     width: Number(rawNode.style_width)
    //                 }
    //             } as AppNode
    //         ));
    //         setNodes(formatedNodes);
    //     })
    // }, [setNodes]);
    
    const handleEditNotes = useCallback((id: string) => {
        if (id === null) return;
        setIsEditNote((prev: boolean) => !prev)
        }, [setIsEditNote]
    )
  
    return (
    <div className='map-editor'>      
        <MapCanvas 
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes} 
            handleNodeClick={handleNodeClick}
            handlePaneClick={handlePaneClick} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect} />
        <MapSidebar 
            handleUnselect={handleUnselect}
            nodes={nodes}
            currTerm={currTerm}
            setCurrTerm={setCurrTerm}
            handleAddTerm={handleAddTerm}
            handleSelectAll={handleSelectAll} 
            activeNode={activeNode} 
            handleEditNotes={handleEditNotes} />
    </div>

    )
}
export default MapEditor;
