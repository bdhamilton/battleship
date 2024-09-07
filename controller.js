import { Player } from "./ship.js";

class Controller {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player('computer');

    this.drawShips(1);
    console.log(this.player1.board);
  }

  drawShips(player = 1) {
    // Grab the ships list for the appropriate player.
    const domSelector = player === 1 ? "#player1" : "#player2";
    const domShips = document.querySelector(domSelector + " .ships");

    // Build the player's ships and add them to the gamebaord
    player = player === 1 ? this.player1 : this.player2;
    player.board.ships.forEach((ship) => {
      const row = ship.startingCoordinates[0];
      const col = ship.startingCoordinates[1];

      const shipElement = document.createElement("div");
      shipElement.classList.add("ship", `length${ship.length}`, `row${row}`, `col${col}`);
      if (!ship.isHorizontal) {
        shipElement.classList.add("vertical");
      }

      domShips.append(shipElement);
    });
    
  }

  // eraseBoard(player = 'player1') {
  //   const board = document.getElementById(player);
  //   const squares = board.querySelectorAll('button');

  //   // Empty each square.
  //   squares.forEach((square) => square.classList = 'square');
  // }



  // drawBoard(player = 'player1') {
  //   const gameboard = player === 'player1' ? this.player1.board : this.player2.board;
  //   const boardDOM = document.getElementById('player1');
    
  //   for (let i = 0; i < gameboard.length; i++) {
  //     const row = gameboard[i];

  //     for (let j = 0; j < row.length; j++) {
  //       // Grab relevant square on the gameboard
  //       let square = document.querySelector(`#row{$i} #col{$j}`);
  //       square.classList.add(row[j]);
  //     }
  //   }
  // }

}

const game = new Controller();
