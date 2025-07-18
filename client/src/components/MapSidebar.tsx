import '../styles/MapEditor.css'
import {type Node} from '@xyflow/react'

interface MySidebarProps {
    editTermInputRef:React.RefObject<HTMLInputElement|null>,
    editTermValue:string|null,
    handleUpdateNodeTerm: (nodeid: string, term: string) => void,
    nodes: Node[],
    currTerm: string,
    setCurrTerm: React.Dispatch<React.SetStateAction<string>>,
    handleAddTerm: () => void,
    handleSelectAll: () => void,
    activeNodeId: string|null,
}

function MapSidebar(props:MySidebarProps) {
  return (
    <div className='rf-ui'>
        <form onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="term-input">Term:</label>
            <input 
                type="text" 
                id="term-input" 
                name='term-input' 
                placeholder='e.g. Cells' 
                value={props.currTerm}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                props.setCurrTerm(e.target.value)
                }
            />
            <button id='rf-add-term-btn' onClick={props.handleAddTerm}>Add Term</button>
            <button id='rf-select-all' onClick={props.handleSelectAll}>Select All</button>
            <label htmlFor="rf-edit-term">Edit Current Term:</label>
            <input type="text" 
                id="rf-edit-term" 
                className={props.activeNodeId? "edit": "no-edit"} 
                value={props.editTermValue !== null? props.editTermValue: "Select a term to edit"} 
                ref={props.editTermInputRef}
                onChange={(e)=>props.handleUpdateNodeTerm(props.activeNodeId as string, e.target.value)}/>
        </form>
    </div>  )
}

export default MapSidebar