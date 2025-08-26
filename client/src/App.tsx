import './styles/App.css'
import { ReactFlowProvider } from '@xyflow/react'
import Validated from './components/Validated'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import Register from './components/AuthComponent/Register';

function App() {
  return (
  <div>
    <ReactFlowProvider>
      <Validated />
    </ReactFlowProvider>
  </div>
  )
}

export default App
