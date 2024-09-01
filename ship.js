class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

class Gameboard {
  constructor(width, height) {
    // Create an array of arrays to represent the gameboard.
    this.board = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(null);
      }
      this.board.push(row);
    }

    this.width = width;
    this.height = height;
    this.ships = [];
  }

  placeShip(row, column, length, horizontal = true) {
    // Can we place this ship here?
    if (!this.canPlaceShip(row, column, length, horizontal)) {
      throw new Error("Can't place this ship here.");
    }

    // Build a new ship and add it to the board.
    const ship = new Ship(length);
    this.ships.push(ship);

    // Place it on the appropriate coordinates.
    if (horizontal) {
      // Add it to each column in the designated row...
      for (let i = 0; i < length; i++) {
        this.board[row][column + i] = ship;
      }
    } else {
      // ...or to each row in the designated column.
      for (let i = 0; i < length; i++) {
        this.board[row + i][column] = ship;
      }     
    }
  }

  canPlaceShip(row, column, length, horizontal = true) {
    // Is the ship too long to fit on the board?
    if (horizontal) {
      if (column + length > this.width) {
        return false;
      }
    } else {
      if (row + length > this.height) {
        return false;
      }
    }

    // Are there other ships already in the way?
    if (horizontal) {
      // Check `length` columns in the designated row.
      for (let i = 0; i < length; i++) {
        // If we run into anything, we can't place the ship.
        if (this.board[row][column + i]) {
          return false;
        }
      }
    } else {
      // Check `length` rows in the designated column.
      for (let i = 0; i < length; i++) {
        // If we run into anything, we can't place the ship.
        if (this.board[row + i][column]) {
          return false;
        }
      }     
    }

    // If we didn't find any conflicts, we can place the ship.
    return true;
  }

  receiveAttack(row, column) {
    const square = this.board[row][column];

    if (square === null) {
      this.board[row][column] = 'miss';
      return 'miss';
    } else if (typeof square === 'object') {
      square.hit();
      this.board[row][column] = 'hit';
      return 'hit';
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = { Ship, Gameboard };