import { useEffect } from 'react'
import useStore from '../store/mapStore'
import { type AppNode } from '../assets/types';
const NoteEditor: React.FC<{ setIsEditNote: React.Dispatch<React.SetStateAction<boolean>> }> = ( {setIsEditNote} ) => {

  const nodes: AppNode[] = useStore((state) => state.nodes);
  const currentNode: (AppNode | undefined) = nodes.find((node: AppNode) => node.selected === true);

  useEffect(()=> {
      if (currentNode === undefined) setIsEditNote(false);
    }, [setIsEditNote, currentNode]
  )

  return (
    <>
      <form>
          <label htmlFor = "notes">Term: {currentNode?.data.label}</label>
          <textarea name = "notes" id = "notes"></textarea>
          <button onClick = {() => setIsEditNote(false)} >Return back to map</button>
      </form>
      
    </>
  )
}

export default NoteEditor