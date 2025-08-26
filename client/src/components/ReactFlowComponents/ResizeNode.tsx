import { memo, useEffect, useState, useCallback } from 'react'
import { Handle, Position, NodeResizer} from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import { type ResizeNodeProps } from '../../assets/types';
import { useDataMap } from '../../hooks/useMapData';
import useDebounce from '../../hooks/useDebounce';

const ResizeNode: React.FC<ResizeNodeProps> = ( { id, data, selected, handleUpdateNodeLabel, width, height, positionAbsoluteX, positionAbsoluteY } ) => {
    const { isNodeEditing, setIsNodeEditing, handleUpdateSize, setIsEdgeEditing} = useDataMap();
    const [dragStatus, setDragStatus] = useState<string>("drag");
    const [localLabel, setLocalLabel] = useState<string>(data.label);
    const handleUpdateSizeDebounce = useDebounce(handleUpdateSize, 500);
    useEffect(() => {
        handleUpdateSizeDebounce(id, width, height, positionAbsoluteX, positionAbsoluteY);
    }, [id, width, height, handleUpdateSizeDebounce, positionAbsoluteX, positionAbsoluteY]);
    const handleOnClick = (): void => {
        setDragStatus("nodrag");
    }
    //*Come back to this if you feel like critquing how dragging a default node should affect the current selected node
    useEffect(()=> {
        if (selected) {
            setIsEdgeEditing('clear', true);
            setIsNodeEditing(id, true);
        } else {setIsNodeEditing('clear', false)};
    }, [selected, setIsNodeEditing, setIsEdgeEditing, id]);
    const debounceUpdateLabel = useDebounce(handleUpdateNodeLabel, 500);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        debounceUpdateLabel(id, e.target.value);
        setLocalLabel(e.target.value);
    }, [id, debounceUpdateLabel]);

    const handleInputBlur = useCallback(() => {
        if (localLabel !== data.label) {
            handleUpdateNodeLabel(id, localLabel);
        }
    }, [id, localLabel, data.label, handleUpdateNodeLabel]);

    return(
        <>
            {
                isNodeEditing.includes(id) && <>
                <NodeResizer minWidth={ 60 } minHeight={ 40 } isVisible={selected} />
                <Handle type="source" position={Position.Top} id="a-out" />
                <Handle type="source" position={Position.Right} id="b-out" />
                <Handle type="source" position={Position.Bottom} id="c-out" />
                <Handle type="source" position={Position.Left} id="d-out" />
                <Handle type="target" position={Position.Top} id="a-in" />
                <Handle type="target" position={Position.Right} id="b-in" />
                <Handle type="target" position={Position.Bottom} id="c-in" />
                <Handle type="target" position={Position.Left} id="d-in" />
                <textarea 
                    className = { `resize-node-textarea ${dragStatus}` }
                    name = 'resize-node-textarea'
                    // ref={inputRef}
                    onClick = { handleOnClick }   
                    onMouseLeave = { () => setDragStatus("drag") }  
                    onBlur={ handleInputBlur } 
                    value = { localLabel } 
                    onChange = { (e) => handleInputChange(e)} 
                    autoFocus = { true } 
                    style = { {width: width? width.toString()+'px':'180px', height: height? height.toString()+'px':'60px', } } />

                </>
            }
            { 
                !isNodeEditing.includes(id) && <>
                    <div  
                        className = { `resize-node-default ${dragStatus}` }
                        onClick = { handleOnClick }   
                        onMouseLeave = { () => setDragStatus("drag") }   
                        style = { {width: width? width.toString()+'px':'180px', height: height? height.toString()+'px':'60px'} }
                    >
                       { data.label }
                    </div> 
                    <Handle type="source" position={Position.Top} id="a-out" />
                    <Handle type="source" position={Position.Right} id="b-out" />
                    <Handle type="source" position={Position.Bottom} id="c-out" />
                    <Handle type="source" position={Position.Left} id="d-out" />
                    <Handle type="target" position={Position.Top} id="a-in" />
                    <Handle type="target" position={Position.Right} id="b-in" />
                    <Handle type="target" position={Position.Bottom} id="c-in" />
                    <Handle type="target" position={Position.Left} id="d-in" />
                </>

            }
        </>

    )
}
export default memo(ResizeNode)