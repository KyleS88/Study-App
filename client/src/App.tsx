import './styles/App.css'
import MapEditor from './components/MapEditor'
function App() {
  

//   interface node {
//     id : string,
//     position: {x:number, y:number},
//     data: {label: string}
//     type?: string
//   }

//   interface edges {
//     id:string,
//     source:string,
//     target: string,
//     type: string,
//     label?: string
//   }
//   const firstid = uuidv4()
//   const secondid = uuidv4()
  
//   const initialNodes:node[] = [{
//     id : firstid,
//     position: {x:0, y:0},
//     data: {label: 'yoyo'},
//     type: 'input'
//   }, {
//     id : secondid,
//     position: {x:100, y:100},
//     data: {label: 'smth to do'}
//   }, 
// ]
//   const initialEdges: edges[] = [{
//     id: firstid,
//     source: firstid,
//     target: secondid,
//     type: 'step',
//     label: 'connection'
//   }]
//   const [nodes, setNodes] = useState(initialNodes)
//   const [edges, setEdges] = useState([])

//   const onNodesChange = useCallback(
//   (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
//   [],
// );
// const onEdgesChange = useCallback(
//   (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
//   [],
// );

// const onConnect = useCallback(
//   (params)=> setEdges((edgesSnapshot)=> addEdge(params, edgesSnapshot)),
//   [],
// );
  return (
  <div>
    <MapEditor />
  </div>

    // <div style={{height:'100vh', width:'100%'}}>
    //   <ReactFlow 
    //   nodes={nodes} 
    //   edges={edges} 
    //   onNodesChange={onNodesChange}
    //   onEdgesChange={onEdgesChange}
    //   onConnect={onConnect}
    //   fitView>
    //     <Background />
    //     <Controls />
    //   </ReactFlow>
    // </div>
  )
}

export default App
