
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

// Variables
var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = "";
var nextTrain = null;
var firstConvertedTime = null;
var minutesNextTrain = null;

// Form onlcick function
$("#saveButton").on("click", function () {
  //prevent default behavior
  event.preventDefault();

  // Get user input from form and store in variables
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrain").val().trim();
  frequency = $("#frequencyMins").val().trim();

  console.log("Train Name: " + trainName);
  console.log("Destination: " + destination);
  console.log("First Train: " + firstTrain);
  console.log("Train Frequency: " + frequency);

  // Creates variables to connect to firebase
  var trainInfo = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Push trainInfo to database
  database.ref().set(trainInfo);

  // Clean input fields
  clearInputFields()

});

// Function to clear submission fields
function clearInputFields() {
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequencyMins").val("");
};

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store firebase data into variables.
  trainName = childSnapshot.val().trainName;
  destination = childSnapshot.val().destination;
  firstTrain = childSnapshot.val().firstTrain;
  frequency = childSnapshot.val().frequency;

  // First Time (pushed back 1 year to make sure it comes before current time)
  firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

});
