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
          ['Etherium', 'ETH-EUR',  800, 4.00, 'Buy', 1000, 1.8, false],
          // ['Etherium', 'ETH-EUR',  800, 5.00, 'Sell', 1000, 10, false],
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

let {
  checkPrices
} = require('../apps_script');

// console.log(addPercentageRowToEmail.toString());

describe('checkPrices', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    global.MailApp = {
      sendEmail: jest.fn((body) => null)
    };
	});

  test('should pull data from the "Prices" sheet', () => {
    // Call the checkPrices to be tested
    // console.log(addPercentageRowToEmail.toString());
    const mockAddPercentageRowToEmail = jest.fn((row, i) => null);
    addPercentageRowToEmail = mockAddPercentageRowToEmail;

    // addPercentageRowToEmail(); //esegue la moccata ( il test diventa ok)
    checkPrices(); // non esegue la moccata ma l'originale
    expect(mockAddPercentageRowToEmail).toHaveBeenCalled();
  });


  // test('should pull data from the "Prices" sheet1', () => {
  //   // Call the checkPrices to be tested
  //   // console.log(addPercentageRowToEmail.toString());
  //   const mockAddStrategyRowToEmail = jest.fn((row, i) => null);
  //   addStrategyRowToEmail = mockAddStrategyRowToEmail;

  //   // addPercentageRowToEmail(); //esegue la moccata ( il test diventa ok)
  //   checkPrices(); // non esegue la moccata ma l'originale
  //   expect(mockAddStrategyRowToEmail).toHaveBeenCalled();
  // });

});

