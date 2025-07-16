import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge} from '@xyflow/react';
import { type Node, type Edge, type OnConnect, type OnNodesChange, type OnEdgesChange} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {v4 as uuidv4} from 'uuid'
import {useCallback, useState} from 'react'
import '../styles/MapEditor.css'
import {initialEdges} from './ReactFlowComponents/edgeDB'
import {initialNodes} from './ReactFlowComponents/nodeDB' 
import ResizeNode from './ReactFlowComponents/ResizeNode'

const MapEditor = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)
    const [currTerm, setCurrTerm] = useState<string>('')
    //move these in another file in the future
    const onNodesChange: OnNodesChange = useCallback(
        (changes)=>setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes)=>setEdges((edgeSnapshot) => applyEdgeChanges(changes, edgeSnapshot)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback( 
        (connection) => setEdges((edgeSnapshot) => addEdge(connection, edgeSnapshot)), 
        [setEdges], 
    );


    //
    type myNodeType = {
        id : string,
        position: {x:number, y:number},
        data: {label: string, setNodes?: React.Dispatch<React.SetStateAction<Node[]>>},
        type: string,
        selected: boolean
        style:{height:number, width:number}
    }
    const handleAddTerm = ():void => {
        const id = uuidv4();
        const node: myNodeType = {
            id,
            position: {x: window.length/2, y: window.length/2},
            data: {label: currTerm.toString()},
            type:'null',
            selected:false,
            style:{height:60, width:180}
        }
        setNodes(nodeSnapshot=>[...nodeSnapshot, node])
        setCurrTerm('')
    }

    const handleSelectAll = useCallback(() => {
        setNodes((nodeSnapshot)=>{
            const updatedNode = nodeSnapshot.map(node=>({...node, selected:true}));
            return updatedNode;
            }
        );
    }, [setNodes]);

    const handleNodeClick = ():void => (
        setNodes((nodeSnapshot)=>nodeSnapshot.map((node)=>node.selected? {...node,type:'ResizeNode'}: {...node,type:'null'}))
    )
    const handlePaneClick = ():void => {
        setNodes((nodeSnapshot)=>nodeSnapshot.map((node)=>({...node, selected:false, type:'null'})))
    }

    const nodeType = {
    ResizeNode,
    }
    return (
    <div className='map-editor'>      
        <div className='rf-map'>
            <ReactFlow 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeType}
                onNodeClick={handleNodeClick}
                onPaneClick={handlePaneClick}
                fitView> 
                <Background />
                <Controls />
            </ReactFlow>
        </div>
        <div className='rf-ui'>
            <form onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor="term-input">Term:</label>
                <input 
                    type="text" 
                    id="term-input" 
                    name='term-input' 
                    placeholder='e.g. Cells' 
                    value={currTerm}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                    setCurrTerm(e.target.value)
                    }
                />
                <button id='rf-add-term-btn' onClick={handleAddTerm}>Add Term</button>
                <button id='rf-select-all' onClick={handleSelectAll}>Select All</button>
            </form>
        </div>
    </div>


    )
}
export default MapEditor;