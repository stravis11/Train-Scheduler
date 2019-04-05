
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
  trainFrequency = $("#frequencyMins").val().trim();

  console.log("Train Name: " + trainName);
  console.log("Destination: " + destination);
  console.log("First Train: " + firstTrain);
  console.log("Train Frequency: " + trainFrequency);

  // Creates variables to connect to firebase
  var trainInfo = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    trainFrequency: trainFrequency
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

database.ref().on("value", function (snapshot) {
  console.log(snapshot.val());

  // Store firebase data into variables.
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrain = snapshot.val().firstTrain;
  trainFrequency = snapshot.val().trainFrequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(trainFrequency);

  // First Time (pushed back 1 year to make sure it comes before current time)
  firstConvertedTime = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log("FIRST CONVERTED TIME: " + firstConvertedTime);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstConvertedTime), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart
  var timeApart = diffTime % trainFrequency;
  console.log("TIME APART: " + timeApart);

  // Minute until time arrival
  trainArrival = trainFrequency - timeApart;
  console.log("MINUTES TILL TRAIN: " + trainArrival);

  // Next Train
  nextTrain = moment().add(trainArrival, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   // Creating new row
   var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(trainArrival)
     );

     //Append newRow to the table
     $("#trainSchedule > tbody").append(newRow);
});
