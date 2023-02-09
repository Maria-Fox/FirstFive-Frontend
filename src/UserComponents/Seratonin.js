import React from "react";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import './Seratonin.css';


const Seratonin = () => {
  return (
    <div className="Seratonin-Div">
      <h1>Click away!</h1>

      <p>Seratonin fact ....</p>
      <button onClick={() => confetti()} className="SButton">Click</button>
    </div >
  )
}

export default Seratonin;