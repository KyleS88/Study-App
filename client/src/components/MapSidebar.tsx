import '../styles/MapEditor.css'
import { type MySidebarProps } from '../assets/types'


const MapSidebar: React.FC<MySidebarProps> = (props) => {
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
   
            />
            <button id='rf-add-term-btn' onClick={props.handleAddTerm}>Add Term</button>
            <button id='rf-select-all' onClick={props.handleSelectAll}>Select All</button>
            <button id='rf-edit-notes' onClick={()=>(props.activeNode?props.handleEditNotes(props.activeNode.id): null)}>Edit Current Note</button>
        </form>
    </div>  )
}

export default MapSidebar