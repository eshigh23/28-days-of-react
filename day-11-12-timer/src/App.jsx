import { useEffect, useState } from 'react'
import './App.css'

const seconds = 5 * 60

function App() {

  const [isActive, setIsActive] = useState(false)
  const [timer, setTimer] = useState(seconds)


  useEffect(() => {
    if (!isActive) return

    // declare initial prevTime outside of setInterval
    let prevTime = new Date()

    // every 100 milliseconds, check timestamp differences
    const intervalID = setInterval(() => {
      const now = new Date()
      const diff = now - prevTime

      if (diff >= 1000) {
        setTimer(prev => {
          if (prev <= 1) {  // if time reaches 0, stop timer and set it to 0
            setIsActive(false)
            return 0
          } else {  // otherwise, decrement timer
            return prev - 1
          }
        })
        prevTime = now
      }
    }, 100)

    return () => {
      clearInterval(intervalID)
    }

  }, [isActive])




  return (
    <div className="timer">
      <h3>{timer}</h3>

      <div className="buttons">
        <button onClick={() => setIsActive(true)}> Start </button>
        <button onClick={() => setIsActive(false)}>Stop</button>
        <button onClick={() => {
          setIsActive(false)
          setTimer(seconds)
        }}>Reset</button>
      </div>
    </div>
    
  )
}

export default App
