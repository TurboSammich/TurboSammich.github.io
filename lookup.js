var app = angular.module("dataStore",[]);

//this controller is the display
//it receives <ReceivedData> from lookupField
app.data = ""

app.controller("displayField", function($scope,$rootScope, demoService) {
  $scope.title="Results";
  $rootScope.$on("dummyevent", function(){
    var t = demoService.GetData()
    $scope.ReceivedData = t;
  });
});

//this controller is the 'input'
//it passes user input to demoService, and asks it to send it to displayField
app.controller("lookupField",function($scope, demoService) {
  $scope.title = "Search Input";
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
        if (app.data[index]["name"] == d) {
          this.TempData = app.data[index]["designation"]
        }
      }
    }
    $rootScope.$emit("dummyevent")
    }
    console.log("END SERVICE")

    this.GetData = function() {
      return this.TempData;
    }
  })
