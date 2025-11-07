import { useState, useEffect } from 'react'
import AgentMorphSpinner from './AgentMorphSpinner'
import './App.css'

function App() {
  const [thinking, setThinking] = useState(false)
  const [spinnerSize, setSpinnerSize] = useState(120)

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 480) {
        setSpinnerSize(80)
      } else if (window.innerWidth <= 768) {
        setSpinnerSize(100)
      } else {
        setSpinnerSize(120)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="App">
      <div className="section light-mode">
        <h1>Light Mode</h1>
        <AgentMorphSpinner size={spinnerSize} speed={1000} thinking={thinking} />
      </div>
      <div className="section dark-mode">
        <h1>Dark Mode</h1>
        <AgentMorphSpinner size={spinnerSize} speed={1000} fillColor="#ffffff" thinking={thinking} />
      </div>
      <div className="controls">
        <button
          onClick={() => setThinking(v => !v)}
          className="control-button"
        >
          {thinking ? "Stop thinking" : "Start thinking"}
        </button>
      </div>
    </div>
  )
}

export default App

