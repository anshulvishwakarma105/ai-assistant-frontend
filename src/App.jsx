import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import About from './pages/About'
import Terms from './pages/Terms'
import Feedback from './pages/Feedback'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}
