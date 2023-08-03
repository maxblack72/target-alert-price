const columnName                  = 0;
const columnTicker                = 1;
const columnTargetPrice           = 2;
const columnTargetPercentage      = 3;
const columnSignal                = 4;
const columnCurrentPrice          = 5;
const columnCurrentDiffPercentage = 6;
const columnEmailSent             = 7;

let bodyMessage = '';
// a message may have multiple items/stock 
let sendMessage = false; 
let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Prices");

function addStrategyRowToEmail(row, i) {
  console.log("OK2");
  sendMessage = true;
  bodyMessage += `<strong>${row[columnName]}</strong>: there is a ${row[columnSignal].toUpperCase()} signal since 
    current price is €${row[columnCurrentPrice].toFixed(2)}<br>`;
  i++;
  // stop sending message after the first one
  sheet.getRange(`H${i}`).setValue(true);
}

function addPercentageRowToEmail(row, i) {
  console.log("OK3");
  sendMessage = true;
  bodyMessage += `<strong>${row[columnName]}</strong>: current price is €${row[columnCurrentPrice].toFixed(2)} 
    and is ${row[columnTargetPercentage]*100}% around your target price<br>`;
  i++;
  // stop sending message after the first one
  sheet.getRange(`H${i}`).setValue(true);
}

function mySum(x) {
  return 2+x;
}

function checkPrices() {
  // Pulls data from the spreadsheet
  let source = sheet.getRange("A:H");
  let data = source.getValues();

  //Loops through the cells in the spreadsheet to find cells where the stock fell below purchase price
  let n = 0;
  for (let i in data) {
    //Skips the first row
    if (n++ == 0) continue;

    //Loads the current row
    let row = data[i];

    //Once at the end of the list, exits the loop
    if (row[columnTicker] == "") break;

    // if mail has been sent, go to next line
    if (row[columnEmailSent]) continue;

    // DEPENDING ON THE STRATEGY
    if (row[columnSignal] == 'Buy') {
      // if price is lower than target price
      if (row[columnCurrentPrice] <= row[columnTargetPrice]) {
        addStrategyRowToEmail(row, i);
        continue;
      }   
    } else if (row[columnSignal] == 'Sell') {
      // if price is upper than target price
      if (row[columnCurrentPrice] >= row[columnTargetPrice]) {
        addStrategyRowToEmail(row, i);
        continue;
      }
    }

    // if currente percentage diff is around target percentage
    if (Math.abs(row[columnCurrentDiffPercentage]) < row[columnTargetPercentage]) {
        global.addPercentageRowToEmail(row, i);
        continue;
    }
  }

  if (!sendMessage) return;

  sendEmail(bodyMessage);
}

function sendEmail(bodyMessage) {
  const intro = "<h3>Price alert</h3>";
  // console.log(intro + bodyMessage)
  MailApp.sendEmail({
    to: SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail(),
    subject: "Target price alert",
    htmlBody: intro + bodyMessage,
  });
}

global.checkPrices = checkPrices;
// global.addStrategyRowToEmail = addStrategyRowToEmail;
// global.addPercentageRowToEmail = addPercentageRowToEmail;
// global.sendEmail = sendEmail;
// global.mySum = mySum;