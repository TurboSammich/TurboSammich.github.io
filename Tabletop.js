var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1bQ-VOlz4uY-2Lyjc0Bd-Rzn3__neXQ6HiqHp7Jkk16Y/pubhtml'
console.log("TEST")
function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  console.log(data);
  app.data = data;
  }

window.addEventListener('DOMContentLoaded', init)
