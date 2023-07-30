const { addNumbers } = require('../testing.gs');

test('adds two numbers correctly', () => {
  expect(global.addNumbers(2, 3)).toBe(5);
});