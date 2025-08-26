import '@xyflow/react/dist/style.css';
import { useCallback,  useEffect } from 'react';
import '../styles/MapEditor.css';
import MapCanvas from './MapCanvas';
import MapSidebar from './MapSidebar';
import { type AppEdge, type RawEdge, type AppNode, type MapEditorProps, type RawNode} from '../assets/types';
import axios from 'axios';
import { useDataMap, apiUrl } from '../hooks/useMapData';
const MapEditor: React.FC<MapEditorProps> = ({ setIsEditNote }) => {
    //Functions and variables from map hook
    const { handleEdgeClick, onNodesDelete, handleSelectAll, handleUnselect, handleNodeClick, handlePaneClick, handleAddTerm, nodeTypes, currTerm, setCurrTerm, setNodes, nodes, setEdges, edges, onNodesChange, onEdgesChange, onConnect, currentNode, setCurrentNode, edgeTypes } = useDataMap();
    //handle get on startup
    useEffect((): void => {
        console.log(apiUrl);
        axios.get(`${apiUrl}user/nodes`).then((res) => {
            const rawNodesData: RawNode[] = res.data;
            const formatedNodes: AppNode[] = rawNodesData.map((rawNode: RawNode) => (
                {
                    id: String(rawNode.uuid),
                    type: rawNode.type as 'ResizeNode',
                    position: {
                        x: Number(rawNode.position_x), 
                        y: Number(rawNode.position_y)
                    },
                    data: { label: String(rawNode.label), note: String(rawNode.note), userId: String(rawNode.user_id)},
                    style: {
                        height: Number(rawNode.style_height),
                        width: Number(rawNode.style_width)
                    }
                } as AppNode
            ));
            setNodes(formatedNodes);
        })
        axios.get(`${apiUrl}user/edges`).then((res) => {
            const rawEdgeData: RawEdge[] = res.data;
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
    }, [setNodes, setEdges]);
    
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
            edgeTypes={edgeTypes}
            handleNodeClick={handleNodeClick}
            handleEdgeClick={handleEdgeClick}
            handlePaneClick={handlePaneClick} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect} 
            onNodesDelete={onNodesDelete} />
        <MapSidebar 
            handleUnselect={handleUnselect}
            nodes={nodes}
            currTerm={currTerm}
            setCurrTerm={setCurrTerm}
            handleAddTerm={handleAddTerm}
            handleSelectAll={handleSelectAll} 
            handleEditNotes={handleEditNotes} />
    </div>

    )
}
export default MapEditor;
