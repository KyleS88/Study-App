import {memo} from 'react'
import { Handle, Position, NodeResizer } from '@xyflow/react'
import {type Node, type NodeProps} from '@xyflow/react'
//Resize node based if node is selected
//**Come back and refactor to not incorporate react flow */
type ResizeNodeData = Node<{label: string}, 'string||number'>
const ResizeNode = ({ data }:NodeProps<ResizeNodeData> ) => {
    
    return(
        <>
            <NodeResizer minWidth={30} minHeight={20} />
            <Handle type='target' position={Position.Left} />
            <div style={{padding: 10 }}>{data.label}</div>
            <Handle type='source' position={Position.Right} />
        </>
    )
}
export default memo(ResizeNode)