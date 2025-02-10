import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import DnDappPage from './pages/DnDappPage'
import TestPage from './pages/TestPage'
import { Routes, Route } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes >
      <Route path="/" element={<HomePage />} />
      <Route path="/dndapp" element={<DnDappPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>

    </>
  )
}

export default App
