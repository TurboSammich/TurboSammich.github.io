var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1bQ-VOlz4uY-2Lyjc0Bd-Rzn3__neXQ6HiqHp7Jkk16Y/pubhtml'

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo} )
}

function showInfo(data, tabletop) {
  console.log(data);

  //Populate select element dropdown
  var select = document.getElementById('selectField')
  for (index in data) {
    option = document.createElement('option');
    option.setAttribute('value', data[index]["name"]);
    var display = data[index]["designation"] + " | " + data[index]["name"];
    option.appendChild(document.createTextNode(display));
    select.appendChild(option);
  }

  app.data = data;
  }

window.addEventListener('DOMContentLoaded', init)
