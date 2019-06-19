//alert("Hello");
var buttonColors=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
function nextSequence(){
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level "+level);
}
$(".btn").click(function(){
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  var currentButton=$("#"+currentColor);
  console.log(currentButton);
  currentButton.addClass("pressed");
  setTimeout(function(){
    currentButton.removeClass("pressed");
  },100);
}
var Started=false;
var level=0;
$(document).keypress(function(){
  if (!Started){
    Started=true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if (currentLevel==gamePattern.length-1){
      setTimeout(function() {nextSequence()},1000);
    }
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    startOver();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }
}

function startOver(){
  level=0;
  Started=false;
  userClickedPattern=[];
  gamePattern=[];
}
