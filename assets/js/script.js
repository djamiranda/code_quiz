// questions & answers array
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
      answer: "3. parentheses",
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above",],
      answer: "4. all of the above",
    },
    {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console log"],
      answer: "4. console log",
    },
  ];

  var score = 0;
  var questionList = 0;
  var currentTime = document.querySelector("#currentTime");
  var timer = document.querySelector("#startTime");
  var questionsSection = document.querySelector("#questionsSection");
  var wrapper = document.querySelector("#wrapper");
  
  var secondsLeft = 75;
  var holdInterval = 0;
  var penalty = 10;
  var ulCreate = document.createElement("ul");
//   timer function
  timer.addEventListener("click", function () {
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = "Time Left: " + secondsLeft;
  
        if (secondsLeft <= 0) {
          clearInterval(holdInterval);
          allDone();
          currentTime.textContent = "Time's up!";
        }
      }, 1000);
    }
    render(questionList);
  });
  
  // question choices list items
  function render(questionList) {
    questionsSection.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionList].title;
      var userChoices = questions[questionList].choices;
      questionsSection.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsSection.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", compare);
    });
  }
  // answer compare & score function
  function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
      var createSection = document.createElement("section");
      createSection.setAttribute("id", "createSection");
      if (element.textContent == questions[questionList].answer) {
        score++;
        createSection.textContent = "Correct!";
      } else {
        secondsLeft = secondsLeft - penalty;
        createSection.textContent = "Wrong!";
      }
    }
  
    questionList++;
//   answer total 
    if (questionList >= questions.length) {
      allDone();
      createSection.textContent =
        "You got  " +
        score +
        " / " +
        questions.length +
        " Correct!";
    } else {
      render(questionList);
    }
    questionsSection.appendChild(createSection);
  }
  
  // all done function
  function allDone() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";
  
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";
  
    questionsSection.appendChild(createH1);
    console.log(createH1)

    // displays final score 
    if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;
  
      questionsSection.appendChild(createP);
      console.log(createP)
    }
//   enter your initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
  
    questionsSection.appendChild(createLabel);
    console.log(createLabel)

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
  
    questionsSection.appendChild(createInput);
    console.log(createInput)

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
  
    questionsSection.appendChild(createSubmit);
    console.log(createSubmit)
  
    // initials & score saved to local storage
    createSubmit.addEventListener("click", function () {
      var initials = createInput.value;
  
      if (initials.length === 0) {
        alert("Please enter your initials");
      } else {
        var finalScore = {
          initials: initials,
          score: timeRemaining,
        };
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
          allScores = [];
        } else {
          allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        window.location.replace("highscores.html");
      }
    });
  }