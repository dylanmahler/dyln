import { useState } from 'react'
import AgentMorphSpinner from './AgentMorphSpinner'
import './App.css'

function App() {
  const [thinking, setThinking] = useState(false)

  return (
    <div className="App">
      <div className="section light-mode">
        <h1>Light Mode</h1>
        <AgentMorphSpinner size={120} speed={1000} thinking={thinking} />
      </div>
      <div className="section dark-mode">
        <h1>Dark Mode</h1>
        <AgentMorphSpinner size={120} speed={1000} fillColor="#ffffff" thinking={thinking} />
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

