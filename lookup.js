var app = angular.module("frameApp",[]);

//this controller is the display
//it receives <ReceivedData> from lookupField
app.frameData = ""

function openSheet(evt,sheetName) {
  var i, tabcontent, tablinks

  tabcontent = document.getElementsByClassName("tabcontent");
  for(i=0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  //get all elements with class="tablinks" and remove "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i=0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active","");
  }

  //Show current tab, add active class to button that opened it
  document.getElementById(sheetName).style.display = "block";
  evt.currentTarget.className += " active";
}

var fillFields = function(t) {
  for (element in t) {
    if (element == "link" || element == "engineLink" || element == "staffLink") {
      var url = t[element]
      document.getElementById(element).disabled = false
      document.getElementById(element).onclick = function() {
        window.open(url,'_blank')
      }
    } else {
      console.log(element)
      document.getElementById(element).value = t[element]
    }
  }
}

$(document).ready(function() {
  //Click "frame" button to default to that pane
  document.getElementById("frameButton").click();
  //update frame fields when frame select changes
  var frameSelect = document.getElementById('selectField')
  frameSelect.onchange = function() {
    var dataSet = app.frameData
    for (var index in dataSet) {
      if(dataSet.hasOwnProperty(index)) {
        if (dataSet[index]["name"] == frameSelect.value) {
          fillFields(dataSet[index]);
        }
      }
    }
  }
  //define onchange behavior for engine selects
  var seriesSelect = document.getElementById('engineSeriesSelect')
  seriesSelect.onchange = function() {
    var select = document.getElementById('engineSelectField');
    select.options.length = 0;
    option = document.createElement('option');
    option.setAttribute('value',"");
    option.setAttribute('hidden','');
    option.setAttribute('disabled','');
    option.setAttribute('selected','');
    option.appendChild(document.createTextNode("--Select Engine--"));
    select.appendChild(option);
    for (index in app.engineData) {
      if (app.engineData[index]["engineSeries"] == seriesSelect.value) {
        option = document.createElement('option');
        option.setAttribute('value', app.engineData[index]["engineDesignation"]);
        var display = app.engineData[index]["engineDesignation"] + " | " + app.engineData[index]["engineName"];
        option.appendChild(document.createTextNode(display));
        select.appendChild(option);
      }
    }
    select.value = "";
  }
  //update engine fields when engine select changes
  var engineSelect = document.getElementById('engineSelectField')
  engineSelect.onchange = function() {
    var dataSet = app.engineData
    for (var index in dataSet) {
      if(dataSet.hasOwnProperty(index)) {
        if (dataSet[index]["engineDesignation"] == engineSelect.value) {
          fillFields(dataSet[index]);
        }
      }
    }
  }
  //define onchange behavior for staff selects
  var roleSelect = document.getElementById('staffRoleSelect')
  roleSelect.onchange = function() {
    var select = document.getElementById('staffSelectField');
    select.options.length = 0;
    option = document.createElement('option');
    option.setAttribute('value',"");
    option.setAttribute('hidden','');
    option.setAttribute('disabled','');
    option.setAttribute('selected','');
    option.appendChild(document.createTextNode("--Select Personnel--"));
    select.appendChild(option);
    for (index in app.staffData) {
      if (app.staffData[index]["staffRole"] == roleSelect.value) {
        option = document.createElement('option');
        option.setAttribute('value', app.staffData[index]["staffName"]);
        var display = app.staffData[index]["staffName"];
        option.appendChild(document.createTextNode(display));
        select.appendChild(option);
      }
    }
    select.value = "";
  }
  //update engine fields when engine select changes
  var staffSelect = document.getElementById('staffSelectField')
  staffSelect.onchange = function() {
    var dataSet = app.staffData
    for (var index in dataSet) {
      if(dataSet.hasOwnProperty(index)) {
        if (dataSet[index]["staffName"] == staffSelect.value) {
          fillFields(dataSet[index]);
        }
      }
    }
  }
});
