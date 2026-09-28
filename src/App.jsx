import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import About from './pages/About'
import Terms from './pages/Terms'
import Feedback from './pages/Feedback'
import NotFound from './pages/NotFound'
import { Alert } from './components/Popups'

export default function App() {
  const [alert, setAlert] = useState(null);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/chat" element={<Navigate to='/chat/new' />} />
        <Route path="/chat/:id" element={<Chat alert={alert} setAlert={setAlert}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/feedback" element={<Feedback setAlert={setAlert}/>} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      {
        alert &&
        <Alert alert={alert} setAlert={setAlert} />
      }
    </>
  )
}
