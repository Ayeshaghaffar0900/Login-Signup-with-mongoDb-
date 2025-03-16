import { useState } from 'react'
import {BrowserRouter , Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import Login from './Login'

function App() {
 
  return (
    
    <BrowserRouter>
    <Routes>
      <Route index element={<Signup/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
