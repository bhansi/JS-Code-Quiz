// Document Elements
let timer = document.querySelector("#timer");
let btnStartQuiz = document.querySelector("#btnStartQuiz");
let heading = document.querySelector("#heading");
let rules = document.querySelector("#rules");
let divOptions = document.querySelector("#options");
let horizonalRule = document.querySelector("hr");
let answerResult = document.querySelector("#answerResult");
let finalScore = document.querySelector("#finalScore");
let formInitials = document.querySelector("#initials");
let inputInitials = document.querySelector("#inputInitials");
let divQuiz = document.querySelector("#quiz");
let divHighscores = document.querySelector("#highscores");
let divHighscoresList = document.querySelector("#highscoresList");
let btnGoBack = document.querySelector("#goBack");
let btnClearHighscores = document.querySelector("#clearHighscores");
let anchorViewHighscores = document.querySelector("#viewHighscores");
let header = document.querySelector("#header");

// Variables
let timeRemaining = 75;
let takingQuiz = false;
let questionIndex = -1;
let answerResultTimer = 3;
let answered = false;

let highscores = {
    initialsList: [],
    scoresList: []
};

// Create questions array
let questions = [];

// Added question and options objects to questions array
function populateQuestions() {    
    questions.push({
        question: "Which of the following data types can be stored in a JavaScript array?",
        options: ["Numbers", "Strings", "Booleans", "All of the above"],
        answer: "All of the above"
    });
        
    questions.push({
        question: "The condition of an if statement is stored in __________.",
        options: ["Square brackets", "Curly braces", "Parenthesis", "Angle brackets"],
        answer: "Parenthesis"
    });
        
    questions.push({
        question: "String values must be enclosed within __________ when assigning values.",
        options: ["Single quotes", "Double quotes", "Hyphens", "Periods"],
        answer: "Double quotes"
    });
        
    questions.push({
        question: "Function declarations begin with the __________ keyword.",
        options: ["function", "fun", "let", "var"],
        answer: "function"
    });
        
    questions.push({
        question: "The __________ keyword(s) can be used to declare a variable.",
        options: ["var", "fun", "let", "Both var and let"],
        answer: "Both var and let"
    });
        
    questions.push({
        question: "How can the variable x be incremented by 1?",
        options: ["x++;", "x += 1;", "x = x + 1;", "All of the above"],
        answer: "All of the above"
    });
        
    questions.push({
        question: "Which command is used to print to the console?",
        options: ["document.print()", "document.log()", "console.print()", "console.log()"],
        answer: "console.log()"
    });
}

function changeHeading(newText) { heading.textContent = newText; }

function hideRules() { rules.style.display = "none"; }
function unhideRules() { rules.style.display = "block"; }

function hideBtnStartQuiz() { btnStartQuiz.style.display = "none"; }
function unhideBtnStartQuiz() { btnStartQuiz.style.display = "inline-block"; }

function hideOptions() { divOptions.style.display = "none"; }
function unhideOptions() { divOptions.style.display = "block"; }

function hideFormInitials() { formInitials.style.display = "none"; }
function unhideFormInitials() { formInitials.style.display = "block"; }

function hideQuiz() { divQuiz.style.display = "none"; }
function unhideQuiz() { divQuiz.style.display = "block"; }

function hideHighscores() { divHighscores.style.display = "none"; }
function unhideHighscores() { divHighscores.style.display = "block"; }

function displayOptions() {
    unhideOptions();
    let optionsList = questions[questionIndex].options;

    for(let i = 0; i < optionsList.length; i++) {
        document.querySelector("#option" + i).textContent = optionsList[i];
    }
}

function displayQuestion() {
    questionIndex = Math.floor(Math.random() * questions.length);
    heading.textContent = questions[questionIndex].question;
    displayOptions();
}

function endQuiz() {
    anchorViewHighscores.style.visibility = "hidden";
    takingQuiz = false;
    divQuiz.style.textAlign = "center";
    hideOptions();
    changeHeading("All done!");
    unhideFormInitials();
}

function startTimer() {
    let timerInterval = setInterval(function() {
        
        // Only decrement this timer if answerResult is visible to the user
        if(horizonalRule.style.display === "block") {
            answerResultTimer--;
        }
        else {
            timeRemaining--;
        }

        timer.textContent = "Time: " + timeRemaining;
        
        if(answerResultTimer === 0 && answered) {
            horizonalRule.style.display = "none";
            answerResult.style.display = "none"
            answered = false;
            questions.splice(questionIndex, 1);
            
            if(questions.length > 0 && takingQuiz) {
                displayQuestion();
            }
            else {
                clearInterval(timerInterval);
                endQuiz();
            }
        }
        
        if(timeRemaining === 0 && answerResultTimer === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function retrieveHighscores() {
    let storedHighScores = JSON.parse(localStorage.getItem("highscores"));
    if(storedHighScores) {
        highscores.initialsList = storedHighScores.initialsList.slice(0);
        highscores.scoresList = storedHighScores.scoresList.slice(0);
    }
}

function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function addScore(initials, score) {
    if(highscores.scoresList.length === 0) {
        highscores.initialsList.push(initials);
        highscores.scoresList.push(score);
        return;
    }
    
    for(let i = 0; i < highscores.scoresList.length; i++) {
        if(score > highscores.scoresList[i]) {
            highscores.initialsList.splice(i, 0, initials);
            highscores.scoresList.splice(i, 0, score);
            return;
        }
    }
    highscores.initialsList.push(initials);
    highscores.scoresList.push(score);
}

function displayHighscores() {
    for(let i = 0; i < highscores.scoresList.length; i++) {
        let child = document.createElement("p");
        child.textContent = highscores.initialsList[i] + " - " + highscores.scoresList[i];
        divHighscoresList.appendChild(child);
    }
}

// Event handlers
function handleStartQuiz() {
    if(!takingQuiz) {
        anchorViewHighscores.style.visibility = "hidden";
        timeRemaining = 75;
        timer.textContent = "Time: " + timeRemaining;
        divQuiz.style.textAlign = "left";
        hideRules();
        hideBtnStartQuiz();
        populateQuestions();
        displayQuestion();
        startTimer();
        takingQuiz = true;
    }
    else {
        unhideRules();
        unhideBtnStartQuiz();
        takingQuiz = false;
    }
}

function handleOptionClick(event) {
    if(answered) { return; }
    else { answered = true; }
    
    answerResultTimer = 3;
    let playerAnswer = document.querySelector("#" + event.target.id).textContent;
    
    horizonalRule.style.display = "block";
    
    if(playerAnswer === questions[questionIndex].answer) {
        answerResult.textContent = "Correct";
    }
    else {
        answerResult.textContent = "Incorrect";
        if(timeRemaining >= 10) {
            timeRemaining = timeRemaining - 10;
        }
        else {
            timeRemaining = 0;
            takingQuiz = false;
        }
    }
    
    answerResult.style.display = "block";
}

function handleFormInitialsSubmit(event) {
    event.preventDefault();
    let initials = inputInitials.value;
    if(initials) {
        retrieveHighscores();
        addScore(initials, timeRemaining);
        storeHighscores();
        hideQuiz();
        unhideHighscores();
        displayHighscores();
        inputInitials.value = "";
    }
}

function handleGoBack() {
    divHighscoresList.innerHTML = "";
    timer.textContent = "";
    anchorViewHighscores.style.visibility = "visible";
    header.style.visibility = "visible";
    changeHeading("Coding Quiz Challenge");
    hideHighscores();
    hideFormInitials();
    horizonalRule.style.display = "none";
    answerResult.style.display = "none";
    unhideRules();
    unhideBtnStartQuiz();
    unhideQuiz();
}

function handleClearHighscores() {
    divHighscoresList.innerHTML = "";
    highscores.initialsList = [];
    highscores.scoresList = [];
    localStorage.clear();
}

function handleViewHighscores() {
    hideQuiz();
    header.style.visibility = "hidden";
    unhideHighscores();
    retrieveHighscores();
    displayHighscores();
}

// Adding event listeners
btnStartQuiz.addEventListener("click", handleStartQuiz);
divOptions.addEventListener("click", handleOptionClick);
formInitials.addEventListener("submit", handleFormInitialsSubmit);
btnGoBack.addEventListener("click", handleGoBack);
btnClearHighscores.addEventListener("click", handleClearHighscores);
anchorViewHighscores.addEventListener("click", handleViewHighscores);
