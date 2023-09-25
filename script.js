const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
        answer: 1
    },
    {
        question: "What is JavaScript primarily used for?",
        choices: ["Styling web pages", "Creating interactive web pages", "Data storage"],
        answer: 1
    }
];

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");
const resultContainer = document.getElementById("result-container");
const startButton = document.getElementById("start-button");
const timerValue = document.getElementById("current-time");
const firstScore = document.getElementById("first-score")
const secondScore = document.getElementById("second-score")
const thirdScore = document.getElementById("third-score")
const clearButton = document.getElementById("clear-button")
const saveScore = document.getElementById("save-score")
const resultQuestion = document.getElementById("previous-result")
const scoreText = document.getElementById("score-text")
const scoreButton = document.getElementById("score-button")
//retreiving from local storage 
const highScores = JSON.parse(localStorage.getItem("highscores")) || {}

let path = window.location.pathname.split("/")
path = path[path.length - 1]


if (path === "index.html") {
    saveScore.style.display = "none";

    scoreText.addEventListener("change", (e) => {
        scoreText.value = e.target.value
    })

    scoreButton.addEventListener("click", () => {
        console.log(highScores, scoreText.value)
        highScores[scoreText.value] = score
        localStorage.setItem("highscores", JSON.stringify(highScores))
        window.location.href = "./highscores.html"
    })
}

keys = []
if (highScores&&path === "highscores.html") {
    console.log("40", highScores)
    keys = Object.keys(highScores)
    if (keys.length) {
        firstScore.innerText = highScores[keys[0]]
    }
    if (keys.length>1){
        secondScore.innerText = highScores[keys[1]]
    }
    if (keys.length>2){
        thirdScore.innerText = highScores[keys[2]]
    }
}

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 75;
let timerInterval;

function startQuiz() {
    resultContainer.style.display = "none";
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    renderQuestion();
    startTimer();
}

function renderQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = `${index + 1}. ${choice}`;
        choiceButton.addEventListener("click", () => checkAnswer(index));
        choicesContainer.appendChild(choiceButton);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        resultQuestion.innerText = "Correct"
        score++;
    } else {
        resultQuestion.innerText = "Wrong"
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    renderQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerValue.innerText = --timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.textContent = `Quiz Over! Your score: ${score}`;
    startButton.style.display = "block";
    saveScore.style.display = "block";
}

if (startButton) {
    startButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 75;
        resultContainer.textContent = "";
        startButton.style.display = "none";
        startQuiz();
    });
}











