import { useState, useEffect } from "react";
import "./App.css";

function SpawnTwo(board: number[][]): number[][] {
  const emptyCells: { i: number; j: number }[] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ i, j });
      }
    }
  }

  if (emptyCells.length === 0) return board;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const newBoard = board.map((row) => [...row]);

  newBoard[randomCell.i][randomCell.j] = Math.random() < 0.9 ? 2 : 4;

  return newBoard;
}

function slideLeft(row: number[]): number[] {
    let arr = row.filter(v => v != 0);
    for(let i = 0; i < arr.length - 1; i++){
      if(arr[i] === arr[i + 1]){
        arr[i] *= 2;
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter(v => v !== 0);
    while (arr.length < 4) arr.push(0);
    return arr;
}

function App() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [transitionLeft, setTransitionLeft] = useState<boolean>(false);
  const [transitionRight, setTransitionRight] = useState<boolean>(false);
  const [transitionUp, setTransitionUp] = useState<boolean>(false);
  const [transitionDown, setTransitionDown] = useState<boolean>(false);

  useEffect(() => {
    const initGame = () => {
      let newBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      newBoard = SpawnTwo(newBoard);
      newBoard = SpawnTwo(newBoard);

      setBoard(newBoard);
    };

    initGame();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      let movedBoard: number[][] | null = null;
      
      if (event.key === "ArrowLeft") {
        setTransitionLeft(true);

        setTimeout(() => {
          setTransitionLeft(false);
          movedBoard = board.map(row => slideLeft(row));
        }, 100);
      } else if (event.key === "ArrowRight") {
        setTransitionRight(true);

        setTimeout(() => {
          setTransitionRight(false);
        }, 100);
      } else if (event.key === "ArrowUp") {
        setTransitionUp(true);

        setTimeout(() => {
          setTransitionUp(false);
        }, 100);
      } else if (event.key === "ArrowDown") {
        setTransitionDown(true);

        setTimeout(() => {
          setTransitionDown(false);
        }, 100);
      } else {
        return;
      }

      setBoard((prev) => SpawnTwo(prev));
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [board]);

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
            <div
              key={j + "-" + i}
              className="bg-stone-400 size-12 sm:size-16 rounded-2xl m-auto text-black font-bold sm:text-2xl"
            >
              {cell != 0 && (
                <div
                  className={`${cell == 2 ? "bg-amber-200" : "bg-amber-400"} h-full rounded-2xl py-3 ${transitionLeft && j != 0 ? "transition-transform duration-100 -translate-x-20" : ""} ${transitionRight && j != 3 ? "transition-transform duration-100 translate-x-20" : ""} ${transitionUp && i != 0 ? "transition-transform duration-100 -translate-y-20" : ""} ${transitionDown && i != 3 ? "transition-transform duration-100 translate-y-20" : ""}`}
                >
                  {cell != 0 ? cell : ""}
                </div>
              )}
            </div>
          )),
        )}
      </div>
    </>
  );
}

export default App;
