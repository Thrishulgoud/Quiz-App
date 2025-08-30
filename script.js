const quizData = [
    // Cricket
    {
        question: "Who holds the record for most centuries in international cricket?",
        options: ["Sachin Tendulkar", "Virat Kohli", "Ricky Ponting", "Steve Smith"],
        correct: 0
    },
    {
        question: "Which country won the ICC Cricket World Cup 2023?",
        options: ["India", "Australia", "England", "New Zealand"],
        correct: 1
    },
    // Coding
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
        correct: 0
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["Python", "Java", "C", "Assembly"],
        correct: 2
    },
    // General Knowledge
    {
        question: "What is the largest organ in the human body?",
        options: ["Brain", "Heart", "Skin", "Liver"],
        correct: 2
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        correct: 1
    },
    // Current Affairs
    {
        question: "Which country hosted the G20 Summit in 2023?",
        options: ["USA", "China", "India", "Japan"],
        correct: 2
    },
    {
        question: "Who is the CEO of OpenAI as of 2024?",
        options: ["Sam Altman", "Elon Musk", "Sundar Pichai", "Mark Zuckerberg"],
        correct: 0
    },
    // Politics
    {
        question: "Who is the current Prime Minister of India?",
        options: ["Rahul Gandhi", "Narendra Modi", "Amit Shah", "Arvind Kejriwal"],
        correct: 1
    },
    {
        question: "Which country became the newest member of BRICS in 2024?",
        options: ["Iran", "Saudi Arabia", "Egypt", "Ethiopia"],
        correct: 0
    }
];


// Add these new variables at the top
let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 120;
let timer;

// Add this new function to shuffle and select random questions
function getRandomQuestions(amount = 10) {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, amount);
}

// Modify the startQuiz function
function startQuiz() {
    currentQuestions = getRandomQuestions();
    currentQuestion = 0;
    score = 0;
    timeLeft = 120;
    
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    totalQuestionsElement.textContent = currentQuestions.length;
    startTimer();
    loadQuestion();
}

// Update the loadQuestion function
function loadQuestion() {
    const question = currentQuestions[currentQuestion];
    questionEl.textContent = question.question;
    currentQuestionElement.textContent = currentQuestion + 1;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    nextButton.disabled = true;
}

// Update the selectOption function
function selectOption(index) {
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    
    const options = optionsContainer.children;
    for (let option of options) {
        option.classList.remove('selected');
        option.disabled = true;
    }
    options[index].classList.add('selected');
    
    if (index === currentQuestions[currentQuestion].correct) {
        score++;
        options[index].style.backgroundColor = '#4CAF50';
        correctSound.play();
    } else {
        options[index].style.backgroundColor = '#ff4444';
        options[currentQuestions[currentQuestion].correct].style.backgroundColor = '#4CAF50';
        wrongSound.play();
    }
    
    nextButton.disabled = false;
}

// Update the nextQuestion function
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < currentQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// The rest of your functions can remain the same
// ...existing code stays the same until nextQuestion function...

// Add these DOM element selections at the top after your initial variables
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const totalScoreElement = document.getElementById('total-score');
const timeTakenElement = document.getElementById('time-taken');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const timeElement = document.getElementById('time');

// Add event listeners
document.getElementById('start-btn').addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

function showResult() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = score;
    totalScoreElement.textContent = currentQuestions.length;
    timeTakenElement.textContent = 120 - timeLeft;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            showResult();
        }
    }, 1000);
}

function restartQuiz() {
    clearInterval(timer);
    resultContainer.style.display = 'none';
    startScreen.style.display = 'block';
    quizContainer.style.display = 'none';
    timeElement.textContent = 120;
    
    // Reset all states
    currentQuestions = [];
    currentQuestion = 0;
    score = 0;
    timeLeft = 120;
}