var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToZxDaN8R96rlogKttu68D-BdQZaifVX1F6lx9goBtwlEGUtGxd5wY54QsYyQcJoOqPq-z-zBUDJxS/pubhtml'

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  console.log(data);

  //Populate select element dropdown
  var select = document.getElementById('engineSelectField')
  for (index in data) {
    option = document.createElement('option');
    option.setAttribute('value', data[index]["engineName"]);
    var display = data[index]["engineDesignation"] + " | " + data[index]["engineName"];
    option.appendChild(document.createTextNode(display));
    select.appendChild(option);
  }

  app.data = data;
  }

window.addEventListener('DOMContentLoaded', init)
