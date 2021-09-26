//Creating variables ----
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
//-----------------------------------------------------

//Creating functions ----
function playSound(name) {

    let sound = new Audio("sounds/"+ name +".mp3");
    sound.play();
}
function animatePress(currentColour) {

    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}
//-----------------------------------------------------

//Starting the game ----
$(document).on("keydown", function(event) {

    if (started == false) {
        nextSequence();
    } else {
        undefined;
    }
    started = true;
});
//-----------------------------------------------------

//Adding the next colour to the game pattern ----
function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}
//-----------------------------------------------------

//Detecting the user's clicks ----
$(".btn").on("click", function() {

    //Remember: do NOT use qoutaition marks for using (this) method.
    //Also, to get the element's ID, you need to use (.attr) method.
    let userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);

    if (userClickedPattern.length === gamePattern.length) {
        checkAnswer();
    }

    animatePress(userChosenColour);

    playSound(userChosenColour);
});
//-----------------------------------------------------

//Checking the answer ----
function checkAnswer() {

    let passed = false;

    for (let i = 0; i < gamePattern.length; i++) {

        if (userClickedPattern[i] == gamePattern[i]) {
            passed = true;
        } else {
            passed = false;
        }
    }

    if (passed == true) {

        setTimeout(function() {
            nextSequence();
        }, 1000);
    } else {

        started = false;
        level = 0;
        gamePattern = [];
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
    }
}
//-----------------------------------------------------
