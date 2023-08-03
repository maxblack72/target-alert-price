// Import the function you want to test
global.SpreadsheetApp = {
  getActiveSpreadsheet: () => ({
    getOwner: () => ({
      getEmail: jest.fn((name) => null)
    }),
    getSheetByName: (name) => ({
      getRange: (range) => ({
        getValues: jest.fn((name) => [
          [],
          ['Etherium', 'ETH-EUR',  999, 5.00, 'Buy', 1000, 1.3, false],
          // ['Palantir', 'NYSE:PLTR',	14.30,  3.00,	'Buy',	19.98,	39.72,	false]
        ]),
        setValue: jest.fn((boolValue) => true)
      })
    }),
  }),
};
global.columnName                  = 0;
global.columnTicker                = 1;
global.columnTargetPrice           = 2;
global.columnTargetPercentage      = 3;
global.columnStrategy              = 4;
global.columnCurrentPrice          = 5;
global.columnCurrentDiffPercentage = 6;
global.columnEmailSent             = 7;



require('../apps_script');

// // Create a mock for the entire module
// jest.mock('../apps_script', () => ({
//   addStrategyRowToEmail: jest.fn(),
//   addPercentageRowToEmail: jest.fn(),
//   sendEmail: jest.fn(),
// }));
addPercentageRowToEmail = jest.fn((row, i) => null)

describe('checkPrices', () => {
  afterEach(() => {
  });
  beforeEach(() => {
    global.MailApp = {
      sendEmail: jest.fn((body) => null)
    };
	});

  test('should pull data from the "Prices" sheet', () => {
    // Call the checkPrices to be tested
    checkPrices();
    // console.log(addPercentageRowToEmail.toString());

    expect(addPercentageRowToEmail).toHaveBeenCalled();
  });
});

