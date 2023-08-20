// Document Elements
let timer = document.querySelector("#timer");
let btnStartQuiz = document.querySelector("#btnStartQuiz");
let heading = document.querySelector("#heading");
let rules = document.querySelector("#rules");
let divOptions = document.querySelector("#options");
let horizonalRule = document.querySelector("hr");
let answerResult = document.querySelector("#answerResult");

// Variables
let timeRemaining = 75;
let answerResultTimer = 3;
let takingQuiz = false;
let questionIndex = -1;

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
        question: "The condition of an if statement is stored in __________",
        options: ["Square brackets", "Curly braces", "Parenthesis", "Angle brackets"],
        answer: "Parenthesis"
    });
        
    questions.push({
        question: "String values must be enclosed within __________ when assigning values.",
        options: ["Single quotes", "Double quotes", "Hyphens", "Periods"],
        answer: "Double quotes"
    });
}

function changeHeading(newText) { heading.textContent = newText; }

function hideRules() { rules.style.display = "none"; }

function unhideRules() { rules.style.display = "block"; }

function hideBtnStartQuiz() { btnStartQuiz.style.display = "none"; }

function unhideBtnStartQuiz() { btnStartQuiz.style.display = "inline-block"; }

function displayOptions() {
    divOptions.style.display = "block";
    let optionsList = questions[questionIndex].options;

    for(let i = 0; i < optionsList.length; i++) {
        let option = document.createElement("p");
        option.textContent = optionsList[i];
        option.id = "option" + i;
        divOptions.appendChild(option);
    }
}

function displayQuestion() {
    questionIndex = Math.floor(Math.random() * questions.length);
    heading.textContent = questions[questionIndex].question;
    displayOptions();
}

function startTimer() {
    let timerInterval = setInterval(function() {
        timeRemaining--;
        timer.textContent = "Time: " + timeRemaining;
        
        if(timeRemaining === 0) {
            clearInterval(timerInterval);
        }
        if(horizonalRule.style.display === "block") {
            answerResultTimer--;
        }
        if(answerResultTimer === 0) {
            horizonalRule.style.display = "none";
            answerResult.style.display = "none"
            answerResultTimer = 3;
        }
    }, 1000);
}

// Event handlers
function handleStartQuiz() {
    if(!takingQuiz) {
        timer.textContent = "Time: " + timeRemaining;
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
    let playerAnswer = document.querySelector("#" + event.target.id).textContent;

    horizonalRule.style.display = "block";

    answerResult.textContent = playerAnswer === questions[questionIndex].answer ? "Correct" : "Incorrect";
    answerResult.style.display = "block";
}

btnStartQuiz.addEventListener("click", handleStartQuiz);
divOptions.addEventListener("click", handleOptionClick);
