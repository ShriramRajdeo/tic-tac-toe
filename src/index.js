import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Game = (props)=>{
  const [squares,setSquare] = useState(Array(9).fill(null));
  const [currentPlayer,setCurrentPlayer] = useState("X");
  const [status, setStatus] = useState("Current Player : X");

  const clickHandler = (i)=>{
    if(checkWinner(squares) || squares[i]){
      return
    }

    let updatedSquare = [...squares]
    updatedSquare[i] = currentPlayer;
    setSquare(updatedSquare);

    let nextplayer = currentPlayer==="X" ? "O" : "X";
    setCurrentPlayer(nextplayer);
  } 

  function renderSquare(i){
    return (
      <Square 
        value={squares[i]} 
        clickHandler={()=>{clickHandler(i)}}
      />
    );
  }

  function checkWinner(squares){
    let list = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  
    for(let i=0;i<list.length;i++){
      let [a,b,c] = list[i];
      if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  useEffect(()=>{
    const winner = checkWinner(squares);
    let status;
    if (winner) {
      status = 'Winner is: ' + winner;
    }
    else{
      status = "Current Player : "+(currentPlayer);
    }

    setStatus(status);

  },[squares,currentPlayer])

  return(
    <div className="game-app">
      <div className="status"> {status} </div>

      <div className="box-container">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}

        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}

        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>


    </div>
  );
}

const Square = (props)=>{
  return(
    <button className="square" onClick={props.clickHandler}>{props.value}</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game status={"X"}/>);
