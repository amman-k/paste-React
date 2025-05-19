import { useEffect,useState } from 'react'
import './App.css'

function App() {
  
  const [count,setCount]=useState(0);
  function handleClick(){
    setCount(count+1)
  }
  return (
    <>
      <p>Hello World!</p>
      <button onClick={handleClick}>Click me</button>
      <br />count is:{count}
    </>
  )
}

export default App
