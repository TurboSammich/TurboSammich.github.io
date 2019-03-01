var app = angular.module("frameApp",[]);

//this controller is the display
//it receives <ReceivedData> from lookupField
app.frameData = ""

app.controller("displayField", function($scope,$rootScope, demoService) {
  $scope.title="Results";
  $rootScope.$on("dummyevent", function(){
    var t = demoService.GetData()
    $scope.ReceivedData = t;
    for (element in t) {
      if (element == "link") {
        var url = t[element]
        document.getElementById(element).disabled = false
        document.getElementById(element).onclick = function() {
          window.open(url,'_blank')
          console.log("HELP ME")
        }
      } else {
        document.getElementById(element).value = t[element]
      }
    }
  });
  function Launch() {
    console.log("HELP")
  }
});

//this controller is the 'input'
//it passes user input to demoService, and asks it to send it to displayField
app.controller("lookupField",function($scope, demoService) {
  $scope.title = "Search Input";
  var select = document.getElementById('selectField');
  var option
  $scope.SendData = function() {
    var d = $scope.sampledata;
    demoService.SetData(d);
  }
});

app.service("demoService",function($rootScope){
  this.TempData = "";
  this.SetData = function(d) {
    for (var index in app.frameData) {
      if (app.frameData.hasOwnProperty(index)) {
        if (app.frameData[index]["name"] == d) {
          this.TempData = app.frameData[index]
        }
      }
    }
    $rootScope.$emit("dummyevent")
    }

    this.GetData = function() {
      return this.TempData;
    }
  })

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
  console.log(sheetName)
  document.getElementById(sheetName).style.display = "block";
  evt.currentTarget.className += " active";
}
