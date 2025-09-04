import '../styles/MapEditor.css'
import { type MySidebarProps } from '../types/types'
import { useDataMap} from '../hooks/useMapData'
import axios, {type AxiosResponse} from 'axios'
import { useCallback, useEffect, useRef, useState} from 'react'
import useDebounce from '../hooks/useDebounce'

const MapSidebar: React.FC<MySidebarProps> = (props) => {
    const { editNoteRef, setVisibleNote, visibleNote, setEditContext, handleFocusInput, deleteEdge, setIsEdgeEditing, editContext, setIsNodeEditing, isNodeEditing, deleteNode, handleUpdateNodeNote, handleUpdateEdgeNote, currentNode, setNote, isEdgeEditing, edges} = useDataMap();

    useEffect(() => {
        switch (editContext.kind) {
            case 'node':
                setVisibleNote(currentNode?.data.note || '');
                handleFocusInput();
                break;
            case 'edge': {
                editNoteRef.current?.focus();
                const edge = edges.find(e => e.id === editContext.id);
                setVisibleNote(edge?.data.note ?? 'An error has occur please refresh page');
                break;
            }
            default:
                setVisibleNote('');
                editNoteRef.current?.blur();
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editContext, setVisibleNote]);

    const handleRemoveCurrent = async (): Promise<void> => {
        if (!isNodeEditing.length && !isEdgeEditing.length) {
            console.log("Please select a node/ edge to delete");
            return;
        }
        const editKind: string | null = editContext.kind;
        console.log(editKind)
        try {
            setVisibleNote("");
            if (editKind === 'node') {
                const returnDataNode: AxiosResponse = await axios.delete("http://localhost:5174/api/user/nodes/", {
                data: { nodes: isNodeEditing }
            });
            setIsNodeEditing("Remove current editing node", false);
            deleteNode(isNodeEditing);
            } else if (editKind === 'edge') {
                const returnDataEdge: AxiosResponse = await axios.delete("http://localhost:5174/api/user/edges/", {
                data: { edges: isEdgeEditing }
            });
            setIsEdgeEditing("Remove current editing edge", false);
            deleteEdge(isEdgeEditing);
            setEditContext({kind: null});
            }
        } catch (error) {
            setVisibleNote("AN ERROR HAS OCCURED PLEASE REFRESH THE PAGE");
            setEditContext({kind: null});
            console.log(error.response.data);
            console.log("Cannot complete deletion transaction");
        }
    };
    const handleUpdateEdgeNoteDebounce = useDebounce(handleUpdateEdgeNote, 500);
    const handleUpdateNodeNoteDebounce = useDebounce(handleUpdateNodeNote, 500);
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        console.log(e.target.value)
        const editKind = editContext.kind;
        setVisibleNote(e.target.value);
        if (editKind === 'node'){
            handleUpdateNodeNoteDebounce(currentNode?.id, e.target.value);
            if (currentNode) setNote(currentNode.id, e.target.value, true);
        } else if (editKind === 'edge'){
            handleUpdateEdgeNoteDebounce(editContext.id, e.target.value);
            setNote(editContext.id, e.target.value, false);
        };
    }, [setVisibleNote, currentNode, editContext, handleUpdateNodeNoteDebounce, handleUpdateEdgeNoteDebounce, setNote]);
    // const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    //     if (currentNode) {
    //         handleUpdateNodeNoteDebounce(currentNode.id, e.target.value);
    //         setNote(currentNode.id, e.target.value, true);
    //     };
    //     setLocalNote(e.target.value);
    // };
  return (
    <div className='rf-ui'>
            {/* edit the handleEditNotes to update the data in client with corresponding data in backend */}
            <button id='rf-add-term-btn' onClick={props.handleAddTerm}>Add Term</button>
            <button id='rf-select-all' onClick={props.handleSelectAll}>Select All</button>
            <button id='rf-remove-btn' onClick={handleRemoveCurrent}>Remove</button>
            <textarea name="note" id="note" className="note" value={isEdgeEditing.length>0 || isNodeEditing.length > 0? visibleNote: ''} placeholder='Enter your note for the node or connection here' ref={editNoteRef} readOnly={editContext.kind === null} onChange={(e) => handleInputChange(e)}></textarea>
            <button id='rf-edit-notes' onClick={(e)=>(editContext.kind?props.handleEditNotes(editContext.id): null, e.preventDefault())}>Expand Note</button>
    </div>  )
}

export default MapSidebar