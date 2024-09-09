import { Player } from "./ship.js";

class ViewController {
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
        square.dataset.row = i;
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
    if (playerName === "self") {
      this.drawShips(playerName);
    } else {
      this.addListeners();
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

  drawHits(playerName) {
    // Grab the player and the relevant DOM board
    const player = playerName === "self" ? this.player1 : this.player2;
    const domBoard = document.getElementById(player.name);

    // Consider each square on the gameboard.
    for (let i = 0; i < player.board.size; i++) {
      const row = i;

      for (let j = 0; j < player.board.size; j++) {
        const col = j;

        // If a square has been hit, set the dom 
        if (player.board[i][j] === "hit" || player.board[i][j] === "miss") {
          const domSquare = document.querySelector(`#${player.name} [data-row="${row}]"] [data-col="${col}"]`);
          domSquare.classList.add("hit");
        }
      }
    }
  }

  addListeners() {
    // Grab all enemy squares on the DOM.
    const enemySquares = document.querySelectorAll("#cpu .square");

    // Add event listeners to any squares not already hit.
    enemySquares.forEach((square) => {
      if (!square.classList.contains("hit") && !square.classList.contains("miss")) {
        square.addEventListener('click', this.attackSquare);
      }
    })
  }

  attackSquare(event) {
    const square = event.target;
    const isHit = game.player2.board.receiveAttack(square.dataset.row, square.dataset.col);

    if (isHit) {
      console.log("Target hit!");
      square.classList.add("hit");
    } else {
      console.log("Target missed!");
      square.classList.add("miss");
    }

    square.removeEventListener("click", game.attackSquare);
  }
}

const game = new ViewController();
