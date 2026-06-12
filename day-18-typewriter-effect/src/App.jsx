import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [sentence, setSentence] = useState('')
  const [index, setIndex] = useState(0)
  const [restartKey, setRestartKey] = useState(0)


// if new sentence is entered, reset index so it does not render
  useEffect(() => {
    setIndex(0)
  }, [sentence])


  useEffect(() => {
    setIndex(0) // index reset to 0 in case of restart w/o sentence change
    if (restartKey === 0) return  // don't run before button press

    const interval = setInterval(() => {
      setIndex(prev => {
        if (prev >= sentence.length) {
          clearInterval(interval)   // clear interval and stop increment
          return prev
        }
        return prev + 1
      })
    }, 500)

    return () => clearInterval(interval);

  }, [restartKey])


  return (
    <div>
      <label htmlFor="sentenceInput">Write a sentence:</label>
      <input
        type="text"
        id="sentenceInput"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      />

      <button onClick={() => setRestartKey(prev => prev + 1)}>Display with typewriter effect</button>

      <p>{sentence.slice(0, index)}</p> 
    </div>
  )
}

export default App
