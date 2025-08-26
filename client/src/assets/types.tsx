    import {
    type Edge,
    type Node,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
    type NodeTypes,
    type NodeProps,
    } from '@xyflow/react';

    export interface MyCanvasProp {
        // nodes: Node[],
        nodes: AppNode[],
        edges: Edge[],
        nodeTypes: NodeTypes | undefined,
        handleNodeClick: (_:React.MouseEvent, currNode: AppNode)=>void,
        handlePaneClick: ()=>void,
        onNodesChange: OnNodesChange<AppNode>,
        onEdgesChange: OnEdgesChange,
        onConnect: OnConnect,
    }

    export type NodeData = {
            label: string,
            note: string
        }

    export type ResizeNodeData = Node<NodeData, 'ResizeNode'>;

    export type ResizeNode = Node<NodeData, 'ResizeNode'> & {
        style: {
            height: number;
            width: number;
        };
    };
    export type DefaultNode = Node<NodeData, 'default'> & {
        style: {
            height: number;
            width: number;
        };
    };

    export type AppNode = ResizeNode | DefaultNode;

    export type AppState = {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (updater: AppNode[] | ((nodes: AppNode[]) => AppNode[])) => void
    setEdges: (updater: Edge[] | ((edges: Edge[]) => Edge[])) => void;
    };

    export interface ResizeNodeProps extends NodeProps<AppNode> {
        handleUpdateNodeLabel: (nodeId: string, newLabel: string) => void;
    }

    export interface MySidebarProps {
        inputRef?:React.RefObject<HTMLInputElement|null>,
        nodes: AppNode[],
        currTerm: string,
        setCurrTerm: React.Dispatch<React.SetStateAction<string>>,
        handleAddTerm: () => void,
        handleSelectAll: () => void,
        activeNode: AppNode|null,
        handleUnselect: () => void,
        handleEditNotes: (id: string) => void,
    }
    export interface MapEditorProps {
        setIsEditNote: React.Dispatch<React.SetStateAction<boolean>>;
    }

    export type RawNode = {id: number, uuid: string, type: string, position_x: number, position_y: number, label: string, note: string, style_height: number, style_width: string};
