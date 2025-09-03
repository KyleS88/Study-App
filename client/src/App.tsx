import './styles/App.css'
import { ReactFlowProvider } from '@xyflow/react'
import Validated from './components/Validated'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './components/AuthComponent/RegisterPage';
import LoginPage from './components/AuthComponent/LoginPage';
function App() {
  return (
  <div>
    <ReactFlowProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/validated" element={<Validated />} />
        </Routes>
      </BrowserRouter>
    </ReactFlowProvider>
  </div>
  )
}

export default App
