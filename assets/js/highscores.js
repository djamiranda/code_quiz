var highscore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getitem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i=0; i<allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textcontent = allScores[i].initials + " " + allScores[i].score;
        highscore.appendChild(createLi);
    }
}

goBack.addEventListener("click", function () {
    window.location.replace("index.html");
});