var app = angular.module("engineApp",[]);

//this controller is the display
//it receives <ReceivedData> from lookupField
app.data = ""

app.controller("displayField", function($scope,$rootScope, demoService) {
  $scope.title="Results";
  $rootScope.$on("dummyevent", function(){
    var t = demoService.GetData()
    $scope.ReceivedData = t;
    for (element in t) {
      if (element == "engineLink") {
        var url = t[element]
        document.getElementById(element).disabled = false
        document.getElementById(element).onclick = function() {
          window.open(url,'_blank')
        }
      } else {
        document.getElementById(element).value = t[element]
      }
    }
  });
});

//this controller is the 'input'
//it passes user input to demoService, and asks it to send it to displayField
app.controller("lookupField",function($scope, demoService) {
  $scope.title = "Search Input";
  var select = document.getElementById('engineSelectField');
  var option
  $scope.SendData = function() {
    var d = $scope.sampledata;
    demoService.SetData(d);
  }
});

app.service("demoService",function($rootScope){
  this.TempData = "";
  this.SetData = function(d) {
    for (var index in app.data) {
      if (app.data.hasOwnProperty(index)) {
        if (app.data[index]["engineName"] == d) {
          this.TempData = app.data[index]
        }
      }
    }
    $rootScope.$emit("dummyevent")
    }

    this.GetData = function() {
      return this.TempData;
    }
  })
