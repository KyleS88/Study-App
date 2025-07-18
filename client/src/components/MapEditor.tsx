import { applyEdgeChanges, applyNodeChanges, addEdge} from '@xyflow/react';
import { type Node, type Edge, type OnConnect, type OnNodesChange, type OnEdgesChange} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {v4 as uuidv4} from 'uuid';
import {useCallback, useState, useRef} from 'react';
import '../styles/MapEditor.css';
import {initialEdges} from './TempDatabase/edgeDB';
import {initialNodes} from './TempDatabase/nodeDB';
import MapCanvas from './MapCanvas';
import {NodeTypes} from './ReactFlowComponents/NodeTypes';
import MapSidebar from './MapSidebar';

const MapEditor = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [currTerm, setCurrTerm] = useState<string>('');
    const [activeNodeId, setActiveNodeId] = useState<string|null>(null);
    const [editTermValue, setEditTermValue] = useState<string|null>(null);
    const editTermInputRef = useRef<HTMLInputElement>(null);

    const handleFocusInput = () => {
        editTermInputRef.current?.focus();
    }

    //move these in another file in the future
    const onNodesChange: OnNodesChange = useCallback(
        (changes):void=>setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes):void=>setEdges((edgeSnapshot) => applyEdgeChanges(changes, edgeSnapshot)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback( 
        (connection):void=>setEdges((edgeSnapshot) => addEdge(connection, edgeSnapshot)), 
        [setEdges], 
    );

    const handleAddTerm = ():void => {
        const id = uuidv4();
        const node: Node = {
            id,
            position: {x: window.innerWidth/2, y: window.innerHeight/2},
            data: {label: currTerm},
            type: 'default',
            style:{
                height: 60, 
                width: 180, 
            },
        }
        setNodes(nodeSnapshot => [...nodeSnapshot, node]);
        setCurrTerm('');
    };

    const handleSelectAll = useCallback(():void => {
        setNodes((nodeSnapshot) => {
            const updatedNode = nodeSnapshot.map(node=>({...node, selected:true}));
            return updatedNode;
            }
        );
    }, [setNodes]);


    const handleNodeClick = (_:React.MouseEvent, currNode: Node):void => {
        setNodes((nodeSnapshot)=>nodeSnapshot.map((node)=>node.selected? {...node,type:'ResizeNode'}: {...node,type:'default'}));
        setActiveNodeId(currNode.id);
        setEditTermValue(currNode.data.label as string);
        handleFocusInput();
        console.log(activeNodeId)
    }
    const handlePaneClick = ():void => {
        setNodes((nodeSnapshot)=>nodeSnapshot.map((node)=>({...node, selected:false, type:'default'})));
        setActiveNodeId(null);
        setEditTermValue(null);
    }

    const handleUpdateNodeTerm = (nodeid: string, term:string):void => {
        if (!nodeid) return;
        try {
            const existNode = nodes.some((node) => node.id === nodeid);
            if(!existNode) {
                throw new Error("Current id does not match any existing node");
            }
            setNodes(nodes.map((node)=>(node.id===nodeid?{...node, data:{...node.data, label:term}}:node)));
            console.log(`${nodeid} has succesfully been updated`);
            setEditTermValue(term);
            
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
    }
    return (
    <div className='map-editor'>      
        <MapCanvas 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={NodeTypes} 
            handleNodeClick={handleNodeClick}
            handlePaneClick={handlePaneClick} />
        <MapSidebar 
            editTermInputRef={editTermInputRef}
            handleUpdateNodeTerm = {handleUpdateNodeTerm}
            nodes={nodes}
            currTerm={currTerm}
            setCurrTerm={setCurrTerm}
            handleAddTerm={handleAddTerm}
            handleSelectAll={handleSelectAll} 
            activeNodeId={activeNodeId} 
            editTermValue={editTermValue} />
    </div>


    )
}
export default MapEditor;