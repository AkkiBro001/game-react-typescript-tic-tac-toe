/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Cell from "./components/Cell";
import celebrate from "./assets/celebrate.gif";
import bg from "./assets/bg.png";

function App() {

  const [go, setGo] = useState<"O" | "X">("O")
  const [cells, setCells] = useState<string[]>(["", "", "", "", "", "", "", "", ""])
  const [winner, setWinner] = useState<null | "X" | "O" | "Draw">(null)
  const [counter, setCounter] = useState<{ X: number, O: number }>({
    X: 0,
    O: 0
  })

  function resetGame() {
    setWinner(null);
    setCells(["", "", "", "", "", "", "", "", ""])
  }

  useEffect(()=>{
    document.body.style.backgroundImage = `url(${bg})`
  },[])


  useEffect(() => {
    const WinningPattern: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    const X_Value:boolean[] = [];
    const O_Value:boolean[] = [];

    WinningPattern.forEach(array => {
      
      const Draw = cells.every(cell => cell !== "")
      O_Value.push(array.every(index => cells[index] === "O"))
      X_Value.push(array.every(index => cells[index] === "X"))
      
     
     


    
      
      if(O_Value.includes(true)){
        setWinner("O")
        
      } else if (X_Value.includes(true)) {
          setWinner("X")
          
      } else if (!cells.includes("") && Draw) {
          return setWinner("Draw")
        }

  
    }
  ) 
  }, [cells])

  useEffect(()=>{
    if(winner === "O"){
      setCounter(pre => ({ ...pre, O: pre.O + 1 }))
    }else if(winner === "X"){
      setCounter(pre => ({ ...pre, X: pre.X + 1 }))
    }
  }, [winner])


  return <>
    {winner && <div className={`overlay ${(winner === "X" || winner === "O") ? "celebrate" : ""}`}
    style={{backgroundImage: `url(${celebrate})`}}
    >
      <button onClick={resetGame}>Play Again !!!</button>
    </div>}
    <header>
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="score">
        <div className={`${go === "O" ? "score__O" : ""}`}>
          <span className="shape O"></span>
          <span>{counter.O}</span>
        </div>
        <div className={`${go === "X" ? "score__X" : ""}`}>
          <span className="shape X"></span>
          <span>{counter.X}</span>
        </div>
      </div>
      {!winner ?
        <div className="whoTurn">
          <span className={`playerName ${go}`}></span>
          <span className="turn">Turn</span>
        </div> :
        <div style={{ fontSize: "3rem" }}>--</div>
      }
    </header>

    <section className="gameBoard">

      {
        cells.map((cell: string, index: number) => <Cell
          key={index}
          id={index.toString()}
          cell={cell}
          setCells={setCells}
          go={go}
          setGo={setGo}
          winner={winner}
        />)
      }

    </section>
    <h1 className="title">{
      winner === "O" ? <div className="score" style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <span className="shape O"></span>
        <span>is winner</span>
      </div> : winner === "X" ?
        <div className="score" style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
          <span className="shape X" style={{ transform: "translateY(0%)" }}></span>
          <span>is winner</span>
        </div> : winner === "Draw" ? <div className="score" style={{ display: "flex", alignItems: "center" }}>
          <span>Match Draw</span>

        </div> : null
    }</h1>
  </>
}

export default App