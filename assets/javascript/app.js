
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDfnDvYeXayH-RrGcNSIzsFHX-CajLlkqQ",
    authDomain: "gtcbc-trainscheduler.firebaseapp.com",
    databaseURL: "https://gtcbc-trainscheduler.firebaseio.com",
    projectId: "gtcbc-trainscheduler",
    storageBucket: "",
    messagingSenderId: "225133807135"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Variables
var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = "";
var nextTrain = null;
var firstConvertedTime = null;
var minutesNextTrain = null;

//Form onlcick function
$("#saveButton").on("click", function(){
  //prevent default behavior
  event.preventDefault();  

//Get user input from form and store in variables
trainName = $("#trainName").val().trim();
destination =  $("#destination").val().trim();
firstTrain =  $("#firstTrain").val().trim();
frequency =  $("#frequencyMins").val().trim();

console.log("Train Name: " +trainName);
console.log("Destination: " +destination);
console.log("First Train: " +firstTrain);
console.log("Train Frequency: " +frequency);

// Creates variables to connect to firebase
var trainInfo = {
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency
};

//push trainInfo to database
database.ref().set(trainInfo);

//Clean input fields
clearForm()

});

function clearForm() {
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
};

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
}
