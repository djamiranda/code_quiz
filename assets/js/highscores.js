var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");
// clear highscore listener
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
// adds initial & score to list
if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = i+1 + ". " + allScores[i].initials + " - " + allScores[i].score;
    highScore.appendChild(createLi);
  }
}
// go back button listener
goBack.addEventListener("click", function () {
  window.location.replace("index.html");
});