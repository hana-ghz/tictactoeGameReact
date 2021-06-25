import React, { useState } from "react";
import Board from "./Board";

const calculateWinner = (squares) => {
  // all possible combination of squres to win
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // the winner is the one who has any of the combinations previously
    // states filled with its letter
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // if no winner is found , null is returned
  return null;
};

function Game(props) {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXisNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  let status = "";

  //current is set to the element of history with index = stepNumbers
  const current = history[stepNumber].squares;
  const winner = calculateWinner(current);
  const moves = history.map((step, move) => {
    const description = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const handleClick = (i) => {
    const updatedHistory = history.slice(0, stepNumber + 1);
    // a filled squared can't be change
    //No moves allowed if a winner is found
    if (!(current[i] || winner)) {
      // currentCopy is created  for immutability purposes
      const currentCopy = current.map((el, index) => {
        if (index !== i) {
          return el;
        } else {
          return xIsNext ? "X" : "O";
        }
      });
      //add the latest modification to the history of the board
      setHistory([...updatedHistory, { squares: currentCopy }]);
      // change between X and O after every click
      setXisNext(!xIsNext);
      setStepNumber(updatedHistory.length);
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    // player 'X' will always have the right to play when the numbers of steps is even
    setXisNext(step % 2 === "0");
  };

  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={current}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
