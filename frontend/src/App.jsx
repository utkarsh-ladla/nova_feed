import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Bookmarks from './pages/Bookmarks'
import NotFound from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/bookmarks" element={<Bookmarks />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App
