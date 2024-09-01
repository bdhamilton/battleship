const { Ship, Gameboard } = require('./ship.js');

test('creates a ship of a specified length', () => {

  expect(new Ship(5).length).toBe(5);
});

test('reports number of hits', () => {
  expect(new Ship(5).hits).toBe(0);
});

test('ships receive attacks', () => {
  const cruiser = new Ship(5);
  cruiser.hit(); 

  expect(cruiser.hits).toBe(1);
});

test('ships can be sunk', () => {
  const dingy = new Ship(1);
  dingy.hit();

  expect(dingy.isSunk()).toBe(true);
});

test('creates gameboard of correct size', () => {
  expect(new Gameboard(3, 5).board.length).toBe(5);
  expect(new Gameboard(3, 5).board[0].length).toBe(3);
});

test('recognizes when a ship does not fit', () => {
  const game = new Gameboard(3, 5);
  expect(game.canPlaceShip(0, 0, 25)).toBe(false);
});

test('places ships', () => {
  const game = new Gameboard(3, 5);
  game.placeShip(0, 0, 1);

  expect(game.board[0][0]).not.toBeNull();
  expect(() => game.placeShip(0, 0, 2)).toThrow(Error);
});

test('board can receive attacks', () => {
  const game = new Gameboard(3, 5);
  game.receiveAttack(0, 0);

  expect(game.board[0][0]).not.toBeNull();
});

test('board can tell if all ships are sunk', () => {
  const game = new Gameboard(3, 5);
  game.placeShip(0, 0, 1);
  game.receiveAttack(0, 0);

  expect(game.allSunk()).toBe(true);
  expect(game.board[0][0]).toBe('hit');
});

test('board knows if ships still remain afloat', () => {
  const game = new Gameboard(3, 5);
  game.placeShip(0, 0, 1);

  expect(game.allSunk()).toBe(false);
});