import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  
  
  return (
    <>
      <div className="flex justify-between">
        <div className="my-auto mx-3 text-center text-2xl font-bold">2048</div>
        <div className="flex flex-col bg-amber-500 p-3 m-3 rounded-2xl text-black">
          <span>Score</span>
          <span>0</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 bg-stone-200 p-3 sm:p-5 rounded-2xl">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div key={j + "-" + i} className="bg-stone-400 size-12 sm:size-16 rounded-2xl">
              {cell != 0 ? cell : ""}
            </div>
          )),
        )}
      </div>
    </>
  );
}

export default App;
