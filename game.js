var buttonColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function() {
  $("h1").text("level " + level);
  nextSequence();
  gameStart();
});

function gameStart() {
  $(".btn").on("click", function() {
    //way2 using atrribute (attr())

    console.log(gamepattern.length);

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("User " + userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1)
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamepattern[currentLevel]) {
    if (userClickedPattern.length == gamepattern.length) {
      nextSequence();
      userClickedPattern = [];
    }
  } else {
    $("h1").text("Game Over! Press any key to start");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 1000);
    $(".btn").off("click");
    startOver();
  }
}

function startOver() {
  gamepattern = [];
  userClickedPattern = [];
  level = 0;
}
// $(".btn").on("click",function(event) {
//   //way2 using atrribute (attr())
//   var userChosenColour = event.currentTarget.id;
//   console.log(userChosenColour);
//   userClickedPattern.push(userChosenColour);
//   console.log(userClickedPattern);
//
//   playSound(userChosenColour);
//   animatePress(userChosenColour);
// })

// $(".btn").on("click",function() {
//   //way2 using atrribute (attr())
//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);
//   console.log(userClickedPattern);
//
//   playSound(userChosenColour);
//   animatePress(userChosenColour);
// })

//create random color and put it in game pattern[]
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];
  console.log(randomChosenColour);

  gamepattern.push(randomChosenColour);
  console.log("game: " + gamepattern);

  //Flashing
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound
  playSound(randomChosenColour);

  //change h1 to level
  level++;
  $("h1").text("level " + level);
}

// Play sound for cliked color or randome color
function playSound(name) {
  switch (name) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    default:
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      break;
  }
}

//apply animation affect when click on color and remove it in 100 milisecond
function animatePress(currentColour) {
  this.color = currentColour;
  var self = $("#" + this.color);
  self.addClass("pressed");
  setTimeout(function() {
    self.removeClass("pressed")
  }, 100);
}
