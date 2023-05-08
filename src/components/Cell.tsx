import React from "react";

interface props{
    id: string,
    cell: string,
    setCells: React.Dispatch<React.SetStateAction<string[]>>
    go: string,
    setGo: React.Dispatch<React.SetStateAction<"O" | "X">>,
    winner: null | "X" | "O" | "Draw"
}



function Cell({id, cell, setCells, go, setGo, winner}: props) {

  function handleClick (e: React.MouseEvent) {
      const event = e.target as Element;
      const firstChild = event.firstChild as Element;
      let taken;
      if(event.firstChild === null){
        taken = event.classList.contains("X") || event.classList.contains("O");
      }else{
        taken = firstChild.classList.contains("X") || firstChild.classList.contains("O")
      }

      if(!taken && event.firstChild !== null){
        firstChild.classList.add(go)  
        setGo(pre => pre === "X" ? "O" : "X")
        handleCellChange()
      }
      
  }

  function handleCellChange(){
    setCells(cells => cells.map((cell, i) => {
      if(i.toString() === id){
          return go
      }else{
        return cell
      }
    }))
  }
  return (
    <div className="cell" onClick={(e) => !winner && handleClick(e)}><span className={`shape ${cell}`} id={id}></span></div>
  )
}

export default Cell