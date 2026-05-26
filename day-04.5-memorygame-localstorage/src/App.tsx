import { useState } from 'react'
import './App.css'
import MemoryGame from './MemoryGame'
import useLocalStorage from './LocalStorage'

function App() {

  return (
    <div className="app">
      <h3>Memory Game</h3>
          
      <MemoryGame
        images={[
          "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1442458017215-285b83f65851?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1591181520189-abcb0735c65d?w=200&h=200&fit=crop",
        ]}
      />
    </div>
  )
  
}

export default App
