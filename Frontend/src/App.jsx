import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import DriveHome from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DriveHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
