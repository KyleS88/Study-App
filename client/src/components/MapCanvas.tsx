import { ReactFlow, Background, Controls} from '@xyflow/react';
import '../styles/MapEditor.css'
import '../store/mapStore'
import { type MyCanvasProp } from '../assets/types';

const MapCanvas: React.FC<MyCanvasProp> = (props) => {

  return (
    <div className='rf-map'>
            <ReactFlow 
                nodes = { props.nodes }
                edges = { props.edges}
                onNodesChange = { props.onNodesChange }
                onEdgesChange = { props.onEdgesChange }
                onConnect = { props.onConnect }
                nodeTypes = { props.nodeTypes }
                edgeTypes={ props.edgeTypes}
                onNodeClick = { props.handleNodeClick }
                onEdgeClick={ props.handleEdgeClick }
                onPaneClick = { props.handlePaneClick }
                onNodesDelete={ props.onNodesDelete }
                fitView >  
                <Background />
                <Controls />
            </ReactFlow>
        </div>
  )
}

export default MapCanvas