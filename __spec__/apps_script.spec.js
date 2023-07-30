// index.test.js

var gas = require('gas-local');
//pick default mock object
var defMock = gas.globalMockDefault;
//Mock MailApp by extending default mock object
var customMock = { 
  SpreadsheetApp: { getActiveSpreadsheet: function () { return 50; } },
     __proto__: defMock 
  };
//pass it to require
const { checkPrices } = gas.require('../apps_script.js', customMock);

// Import the function you want to test
// const { checkPrices } = require('../apps_script');


// Mock the getSheetByName function
global.getSheetByName = jest.fn((name) => {
  // Here, you can define the behavior of the mock function for different inputs.
  // For example, you can return different mocked sheets based on the name input.
  if (name === 'Prices') {
    return {
      getRange: jest.fn(() => ({
        getValue: jest.fn(() => 42), // Mock the return value here
      })),
    };
  } else if (name === 'OtherSheet') {
    // Add another mocked sheet behavior here if needed.
    // You can customize the behavior of different sheets depending on your test cases.
  }

  // Return null or undefined for any other cases.
  return null;
});

describe('checkPrices', () => {
  test('should pull data from the "Prices" sheet', () => {
    // Mock the 'getValues' method of the 'getRange' method of the 'sheet' object
    const mockGetValues = jest.fn();
    const mockGetRange = jest.fn(() => ({ getValues: mockGetValues }));

    // Mock the return values of the 'getValues' method
    const mockData = [
      ['Product A', 10, '$100'],
      ['Product B', 5, '$50'],
      ['Product C', 3, '$30'],
      // Add more data rows as needed for your specific test case
    ];
    mockGetValues.mockReturnValueOnce(mockData);

    // console.log(checkPrices);
    // Call the checkPrices to be tested
    global.checkPrices();

    // Assert that the function does what it is supposed to do with the data
    // For example, you can expect the result to have a specific format or behavior
    // based on the data you provided.
    // expect(result).toBe(/* your expectation here */);
  });
});

