import { useEffect, useCallback } from 'react'
import { useDataMap } from '../hooks/useMapData';
import useDebounce from '../hooks/useDebounce';
import { useEditNote } from '../hooks/useEditNote';
import '../styles/MapEditor.css'
const NoteEditor: React.FC<{ setIsEditNote: React.Dispatch<React.SetStateAction<boolean>> }> = ( {setIsEditNote} ) => {
  const { setEditContext, setVisibleNote, visibleNote, handleUpdateNodeNote, currentNode, editContext, handleFocusInput, edges, handleUpdateEdgeNote, setNote } = useDataMap();
  const editNoteRef = useEditNote();
    useEffect(() => {
        switch (editContext.kind) {
            case 'node':
                setVisibleNote(currentNode?.data.note || '');
                handleFocusInput();
                break;
            case 'edge': {
                editNoteRef.current?.focus();
                const edge = edges.find(e => e.id === editContext.id);
                setVisibleNote(edge?.data.note ?? '');
                break;
            }
            default:
                setVisibleNote('');
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editContext, setVisibleNote]);

    const handleUpdateEdgeNoteDebounce = useDebounce(handleUpdateEdgeNote, 500);
    const handleUpdateNodeNoteDebounce = useDebounce(handleUpdateNodeNote, 500);
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        console.log(e.target.value)
        const editKind = editContext.kind;
        if (editKind === 'node'){
                  console.log('node')

            handleUpdateNodeNoteDebounce(currentNode?.id, e.target.value);
            setNote(editContext.id, e.target.value, true);
        } else if (editKind === 'edge'){
                            console.log('edge')

            handleUpdateEdgeNoteDebounce(editContext.id, e.target.value);
            setNote(editContext.id, e.target.value, false);
        };
        setVisibleNote(e.target.value);
    }, [setVisibleNote, currentNode, editContext, handleUpdateNodeNoteDebounce, handleUpdateEdgeNoteDebounce, setNote]);
    const handleReturn = () => {
      setVisibleNote("");
      setIsEditNote(false);
      setEditContext({kind: null});
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