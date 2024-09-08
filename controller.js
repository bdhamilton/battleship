import { Player } from "./ship.js";

class Controller {
  constructor() {
    this.player1 = new Player("self");
    this.player2 = new Player("cpu");

    this.drawBoard(this.player1.name);
    this.drawBoard(this.player2.name);
  }

  drawBoard(playerName) {
    // Create the gameboard div with relevant class and id
    const board = document.createElement("div");
    board.classList.add("gameboard");
    board.id = playerName;
    
    // Draw all rows
    const boardSize = this.player1.board.size;
    for (let i = 0; i < boardSize; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      row.dataset.row = i;
      
      // And draw all squares within each row
      for (let j = 0; j < boardSize; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.col = j;

        row.append(square);
      }

      board.append(row);
    }

    // Create ships div
    const ships = document.createElement("div")
    ships.classList.add("ships");
    board.append(ships);

    // Add the board to the DOM
    const tabletop = document.getElementById(playerName);
    tabletop.append(board);

    // Add the ships to the board
    if (playerName === "self" || true) {
      this.drawShips(playerName);
    }
  }

  drawShips(playerName) {
    // Grab the ships list for the appropriate player.
    const domShips = document.querySelector(`#${playerName} .ships`);

    // Build the player's ships and add them to the gamebaord
    const player = playerName === this.player1.name ? this.player1 : this.player2;
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
}

const game = new Controller();
