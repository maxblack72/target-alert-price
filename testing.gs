function addNumbers(a, b) {
  return a + b;
}

// Expose the addNumbers function to the global object
global.addNumbers = addNumbers;