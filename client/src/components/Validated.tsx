import React, {useState} from 'react'
import MapEditor from './MapEditor'
import NoteEditor from './NoteEditor'

const Validated: React.FC = () => {
    const [isEditNote, setIsEditNote] = useState<boolean>(false)
  return (
  <>
    {
        isEditNote? 
        <NoteEditor 
          setIsEditNote = { setIsEditNote } /> :
        <MapEditor 
            setIsEditNote = { setIsEditNote } /> 
        
    }
  </>

  )
}

export default Validated