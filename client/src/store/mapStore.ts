import { create } from 'zustand';
import { initialNodes } from '../components/TempDatabase/nodeDB';
import { initialEdges } from '../components/TempDatabase/edgeDB';
import { addEdge, applyNodeChanges, applyEdgeChanges, type EdgeChange, type NodeChange, type Connection } from '@xyflow/react';
import { type AppState, type AppNode} from '../assets/types';

const useStore = create<AppState>((set, get) => ({
    nodes: [] as AppNode[],
    edges: [],
    onNodesChange: (changes: NodeChange<AppNode>[]) => {
        set({
            nodes: applyNodeChanges<AppNode>(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges)
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges) 
        });
    },
    setNodes: (updater) => {
        if (typeof updater === 'function') {
            set((state): Partial<AppState> => ({nodes: updater(state.nodes)}));
        } else {
            set({ nodes: updater });
        }
    },
    setEdges: (updater) => {
        if (typeof updater === 'function') {
            set((state): Partial<AppState> => ({edges: updater(state.edges) }));
        } else {
            set({ edges: updater });
        }
    },
}))

export default useStore;
