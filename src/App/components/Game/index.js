import React, { useState } from "react";
import Board from "../Board";

/**
 * A game of tic-tac-toe.
 */
const Game = () => {
    const [gameHistory, setGameHistory] = useState([{ squares: Array(9).fill(null) }]); // Start of game, all squares are empty
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    let winningSquares = [];

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        /**
         * a, b, c vars are references to indcies, defined by the elements of the lines array
         * lines is a collection of index-trios that make up winning lines
         * if a, b, and c contain the same value 'x' or 'o', it returns the winner
         */

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
              // if there is a value in square a and
              squares[a] &&
              // it is equal to what is in square b and
              squares[a] === squares[b] &&
              // it is equal to what is in square c
              squares[a] === squares[c]
              ) {
                // Add the to the winningSquares array
                winningSquares.push(a, b, c);
                // return the value in square a
                return squares[a];
            }
        }

        // no winner
        return null;
    };

    const handleClick = (i) => {
        const history = gameHistory.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // when a player wins or a square has been filled, the function returns without any processing
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";

        setGameHistory([...history, { squares }]);
        setStepNumber(history.length);
        setXisNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    };

    const current = gameHistory[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = gameHistory.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
      } else if (!current.squares.includes(null)) {
        status = "It's a Draw";
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");

    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                    winningSquares={winningSquares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default Game;
