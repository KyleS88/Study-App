import { useCallback } from 'react'
import { useDataMap } from '../hooks/useMapData';
import useDebounce from '../hooks/useDebounce';
import '../styles/MapEditor.css'
import type { AppNode } from '../types/types';
const NoteEditor: React.FC<{ setIsEditNote: React.Dispatch<React.SetStateAction<boolean>> }> = ( {setIsEditNote} ) => {
  const { setNodes, setEditContext, setVisibleNote, visibleNote, handleUpdateNodeNote, currentNode, editContext, handleUpdateEdgeNote, setNote } = useDataMap();
    const handleUpdateEdgeNoteDebounce = useDebounce(handleUpdateEdgeNote, 500);
    const handleUpdateNodeNoteDebounce = useDebounce(handleUpdateNodeNote, 500);
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        console.log(e.target.value)
        const editKind = editContext.kind;
        if (editKind === 'node'){
            console.log('node');
            handleUpdateNodeNoteDebounce(currentNode?.id, e.target.value);
            setNote(editContext.id, e.target.value, true);
        } else if (editKind === 'edge'){
            console.log('edge');
            handleUpdateEdgeNoteDebounce(editContext.id, e.target.value);
            setNote(editContext.id, e.target.value, false);
        };
        setVisibleNote(e.target.value);
    }, [setVisibleNote, currentNode, editContext, handleUpdateNodeNoteDebounce, handleUpdateEdgeNoteDebounce, setNote]);
    const handleReturn = () => {
      setVisibleNote("");
      setIsEditNote(false);
      setEditContext({kind: null});
      setNodes((prevNode): AppNode[] => prevNode.map((node) => ({...node, selected: false})));
    };
  return (
    <>
      <form onSubmit={handleReturn} id='notes-enlarged'>
          <label id='notes-enlarged-label' htmlFor = "enlarged-notes">Term: {currentNode?.data.label || "Connection"}</label>
          <textarea name = "enlarged-notes" id = "enlarged-notes" value={visibleNote} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>handleInputChange(e)}></textarea>
          <button id='enlarged-notes-btn'>Return back to map</button>
      </form>
      
    </>
  )
}

export default NoteEditor