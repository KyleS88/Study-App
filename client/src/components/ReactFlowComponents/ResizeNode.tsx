import {memo, useEffect, useState} from 'react'
import { Handle, Position, NodeResizer} from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import {type ResizeNodeProps} from '../../assets/types';

const ResizeNode: React.FC<ResizeNodeProps> = ( { id, data, selected, handleUpdateNodeLabel, width, height } ) => {
    const [dragStatus, setDragStatus] = useState<string>("drag");
    const [localLabel, setLocalLabel] = useState<string>(data.label);
    useEffect(()=>{setLocalLabel(data.label)}, [data.label]);
    return(
        <>
            <NodeResizer minWidth={60} minHeight={40} isVisible={selected} />
            <Handle type='target' position={Position.Top} />
            <div>
                <textarea 
                    className = {`resize-node-textarea ${dragStatus}`}
                    name = 'resize-node-textarea'
                    onClick = {() => setDragStatus("nodrag")}   
                    onMouseLeave = {() => setDragStatus("drag")}   
                    value = {localLabel} 
                    onChange = {(e)=>{handleUpdateNodeLabel(id, e.target.value);}} 
                    autoFocus = {selected} 
                    style = {{width: width? width.toString()+'px':'180px', height: height? height.toString()+'px':'60px'}} />
            </div>
            <Handle type='source' position={Position.Bottom} />
        </>
    )
}
export default memo(ResizeNode)