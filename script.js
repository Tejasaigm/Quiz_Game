const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: "H2O"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        correctAnswer: "Japan"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        correctAnswer: "2"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Oxygen"],
        correctAnswer: "Hydrogen"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        correctAnswer: "Albert Einstein"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctAnswer: "Nile River"
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: "Nitrogen"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "8", "10", "12"],
        correctAnswer: "8"
    },
    {
        question: "Which country is famous for the Great Wall?",
        options: ["India", "China", "Japan", "Russia"],
        correctAnswer: "China"
    },
    {
        question: "What is the freezing point of water in Celsius?",
        options: ["0°C", "10°C", "-10°C", "100°C"],
        correctAnswer: "0°C"
    },
    {
        question: "Who is known as the father of computers?",
        options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
        correctAnswer: "Charles Babbage"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctica"],
        correctAnswer: "Antarctica"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Venus", "Mercury", "Mars"],
        correctAnswer: "Mercury"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 300;
let timer;

// DOM Elements
const startScreen = document.getElementById("startScreen");
const quizContainer = document.getElementById("quizContainer");
const resultScreen = document.getElementById("resultScreen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const timeLeftElement = document.getElementById("timeLeft");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");
const totalQuestionsElement = document.getElementById("totalQuestions");
const restartButton = document.getElementById("restartButton");

// Start Quiz
document.getElementById("startButton").addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("div");
        button.className = "option";
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = "none";
}

// Check Answer
function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }

    // Highlight correct and incorrect answers
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        if (option.textContent === currentQuestion.correctAnswer) {
            option.classList.add("correct");
        } else if (option.textContent === selectedOption) {
            option.classList.add("incorrect");
        }
        option.style.pointerEvents = "none"; // Disable further clicks
    });

    nextButton.style.display = "block";
}

// Next Question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

// Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    resultScreen.style.display = "block";
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = quizData.length;
}

// Restart Quiz
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    timeLeftElement.textContent = timeLeft;
    resultScreen.style.display = "none";
    startQuiz();
});
