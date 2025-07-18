import { ReactFlow, Background, Controls} from '@xyflow/react';
import { type Node, type Edge, type OnConnect, type OnNodesChange, type OnEdgesChange, type NodeTypes, } from '@xyflow/react';
import '../styles/MapEditor.css'

interface MyCanvasProp {
    nodes: Node[],
    edges: Edge[],
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    onConnect: OnConnect,
    nodeTypes: NodeTypes,
    handleNodeClick: (_:React.MouseEvent, currNode: Node)=>void,
    handlePaneClick: ()=>void,
}

function MapCanvas(props: MyCanvasProp) {
  return (
    <div className='rf-map'>
            <ReactFlow 
                nodes={props.nodes}
                edges={props.edges}
                onNodesChange={props.onNodesChange}
                onEdgesChange={props.onEdgesChange}
                onConnect={props.onConnect}
                nodeTypes={props.nodeTypes}
                onNodeClick={props.handleNodeClick}
                onPaneClick={props.handlePaneClick}
                fitView> 
                <Background />
                <Controls />
            </ReactFlow>
        </div>
  )
}

export default MapCanvas