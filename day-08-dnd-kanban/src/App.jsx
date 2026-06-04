import { useState } from 'react'
import './App.css'
import ToDoList from './ToDoList'

function App() {
  return (
    <ToDoList
      todos={[
        { id: 1, text: "buy milk", status: "to-do" },
        { id: 2, text: "wash bike", status: "in-progress" },
        { id: 3, text: "do the budget", status: "done" },
        { id: 4, text: "call jane", status: "to-do" },
        { id: 5, text: "call billy", status: "to-do" },
      ]}
    />
  )
}

export default App
