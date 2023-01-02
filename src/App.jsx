import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ApiTestComponent from './components/ApiTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ApiTestComponent></ApiTestComponent>
    </div>
  )
}

export default App
