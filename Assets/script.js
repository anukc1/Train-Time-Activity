
var currentTime = moment(currentTime).format("hh:mm:ss");
$("#currentTime").append(currentTime);

var firebaseConfig = {
    apiKey: "AIzaSyDjae3O5J_Iv2Bkd47URTtHMimUceLdZE0",
    authDomain: "train-time-f3a54.firebaseapp.com",
    databaseURL: "https://train-time-f3a54.firebaseio.com",
    projectId: "train-time-f3a54",
    storageBucket: "train-time-f3a54.appspot.com",
    messagingSenderId: "94900366387",
    appId: "1:94900366387:web:1c4bdfe32fb6cf74"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#submitbtn").on("click", function(event) {

    event.preventDefault();

    var trainName = $("#TrainName").val().trim();
    var destination = $("#Destination").val().trim();
    var firstTrain = $("#MilitaryTime").val().trim();
    var frequency  = $("#Frequency").val().trim();

    var newTrain = {
        name : trainName,
        place: destination,
        howOften: frequency,
        first : firstTrain,
        
    };

 if( !$("#TrainName").val() || !$("#Destination").val() || !$("#MilitaryTime").val() || !$("#Frequency").val()) {

  alert("Input cannot be left blank");
 }
 else {

  database.ref().push(newTrain);

    
  alert(" Your train's been added");

  $("#TrainName").val("");
  $("#Destination").val("");
  $("#MilitaryTime").val("");
  $("#Frequency").val("");

 }
 
   
  });

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var frequency = childSnapshot.val().howOften;
    var firstTrain = childSnapshot.val().first;
    ;
    
    
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    
   

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes"). format("hh:mm");

    console.log(nextTrain,  "is so so min away");
    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)

    );
    
    $("#trainTable > tbody").append(newRow);
    
  });