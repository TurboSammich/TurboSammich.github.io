var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1bQ-VOlz4uY-2Lyjc0Bd-Rzn3__neXQ6HiqHp7Jkk16Y/pubhtml'

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo} )
}

function showInfo(data, tabletop) {
  console.log(data);

  //Populate Frame select dropdown
  var select = document.getElementById('selectField')
  var frameData = data["frames"]["elements"];
  for (index in frameData) {
    option = document.createElement('option');
    option.setAttribute('value', frameData[index]["name"]);
    var display = frameData[index]["designation"] + " | " + frameData[index]["name"];
    option.appendChild(document.createTextNode(display));
    select.appendChild(option);
  }

  //Populate Engine Series select dropdown
  var seriesSelect = document.getElementById('engineSeriesSelect')
  var engineData = data["engines"]["elements"];
  for (index in engineData) {
    var series = engineData[index]["engineSeries"];
    seriesSelect.value = series;
    if (seriesSelect.selectedIndex == -1) {
      option = document.createElement('option');
      option.setAttribute('value',series);
      option.appendChild(document.createTextNode(series));
      seriesSelect.appendChild(option);
    }
    seriesSelect.value = "";
  }

  app.frameData = frameData;
  app.engineData = engineData;
  }

window.addEventListener('DOMContentLoaded', init)
