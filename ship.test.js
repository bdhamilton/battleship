const Ship = require('./ship.js');

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
})