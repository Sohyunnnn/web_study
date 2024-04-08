import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  const handleIncrease = () => {
    setCount((count) => count + 1)
    console.log("increase가 클릭됨")
  }

  // -1 버튼 클릭 시 콘솔에 메시지 출력
  const handleDecrease = () => {
    setCount((count) => count - 1)
    console.log("decrease가 클릭됨")
  }

  return (
    <>
      <h2 id="number">{count}</h2>
    <div>
      <button id="increase" onClick={handleIncrease}>+1</button>
      <button id="decrease" onClick={handleDecrease}>-1</button>
    </div>
    </>
  )
}

export default App
