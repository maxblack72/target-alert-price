const columnName                  = 0;
const columnTicker                = 1;
const columnTargetPrice           = 2;
const columnTargetPercentage      = 3;
const columnStrategy              = 4;
const columnCurrentPrice          = 5;
const columnCurrentDiffPercentage = 6;
const columnEmailSent             = 7;

let bodyMessage = '';
let sendMessage = false;

function getSheetByName(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function AddStrategyRowToEmail(row, i) {
  let sheet = getSheetByName('Prices');
  sendMessage = true;
  bodyMessage += `<strong>${row[columnName]}</strong>: current price is €${row[columnCurrentPrice].toFixed(2)} 
    and your strategy is ${row[columnStrategy].toUpperCase()}<br>`;
  i++;
  // stop sending message after the first one
  sheet.getRange(`H${i}`).setValue(true);
}

function AddPercentageRowToEmail(row, i) {
  sendMessage = true;
  bodyMessage += `<strong>${row[columnName]}</strong>: current price is €${row[columnCurrentPrice].toFixed(2)} 
    and is ${row[columnTargetPercentage]*100}% around your target price<br>`;
  i++;
  // stop sending message after the first one
  sheet.getRange(`H${i}`).setValue(true);
}

function checkPrices() {
  // Pulls data from the spreadsheet
  let sheet = getSheetByName('Prices');
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
    if (row[columnStrategy] == 'Lower than') {
      // if price is lower than target price
      if (row[columnCurrentPrice] <= row[columnTargetPrice]) {
        AddStrategyRowToEmail(row, i);
        continue;
      }   
    } else if (row[columnStrategy] == 'Upper than') {
      // if price is upper than target price
      if (row[columnCurrentPrice] >= row[columnTargetPrice]) {
        AddStrategyRowToEmail(row, i);
        continue;
      }
    }

    // if currente percentage diff is around target percentage
    if (Math.abs(row[columnCurrentDiffPercentage]) < row[columnTargetPercentage]) {
        AddPercentageRowToEmail(row, i);
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
global.getSheetByName = getSheetByName;
