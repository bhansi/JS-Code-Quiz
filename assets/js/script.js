// Document Elements
let btnStartQuiz = document.querySelector("#btnStartQuiz");
let heading = document.querySelector("#heading");
let rules = document.querySelector("#rules");
let divOptions = document.querySelector("#options");

// Variables
let takingQuiz = false;

// Create questions array and add questions
let questions = [];

function populateQuestions() {    
    questions.push({
        question: "Which of the following data types can be stored in a JavaScript array?",
        options: ["Numbers", "Strings", "Booleans", "All of the above"],
        answer: "All of the above"
    });
        
    questions.push({
        question: "The condition of an if statement is store in __________",
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

function displayOptions(questionIndex) {
    divOptions.style.display = "block";
    let optionsList = questions[questionIndex].options;

    for(let i = 0; i < options.length; i++) {
        // divOptions.appendChild(document.createElement());
    }
}

function displayQuestion() {
    questionIndex = Math.floor(Math.random() * questions.length);
    heading.textContent = questions[questionIndex].question;
    displayOptions();
}

function handleStartQuiz() {
    if(!takingQuiz) {
        hideRules();
        hideBtnStartQuiz();
        populateQuestions();
        displayQuestion();
        takingQuiz = true;
    }
    else {
        unhideRules();
        unhideBtnStartQuiz();
        takingQuiz = false;
    }
}

btnStartQuiz.addEventListener("click", handleStartQuiz);