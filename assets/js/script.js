var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var retryBtn = document.getElementById('retry-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var startText = document.getElementById('start-text')
var viewScore = document.getElementById('high-score')
var scores = document.getElementById('all-scores')
var counter = 60
var startCountdown 
var shuffledQuestions, currentQuestionIndex
var isPaused = false

var questions = [
    {
        question: 'Commonly used data types DO Not Include:',
        answers: [
            {text: 'strings', correct: false},
            {text: 'booleans', correct: false},
            {text: 'alerts', correct: true},
            {text: 'numbers', correct: false},
        ]
    }, {
        question: 'The condition in an if/else statement is enclosed with____.',
        answers: [
            {text: 'parenthesis', correct: true},
            {text: 'quotes', correct: false},
            {text: 'curly brackets', correct: false},
            {text: 'square brackets', correct: false},
        ]
    },
    {
        question: 'Arrays in Javascript can be used to store ______.',
        answers: [
            {text: 'numbers and strings', correct: false},
            {text: 'other arrays', correct: false},
            {text: 'booleans', correct: false},
            {text: 'all of the above', correct: true},
        ]
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        answers: [
            {text: 'parenthesis', correct: false},
            {text: 'quotes', correct: true},
            {text: 'commas', correct: false},
            {text: 'curly brackets', correct: false},
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            {text: 'Javascript', correct: false},
            {text: 'console.log', correct: true},
            {text: 'terminal/bash', correct: false},
            {text: 'for loops', correct: false},
        ]
    },
]

// function to start the game
function startGame() {
    startBtn.classList.add('hide')
    startText.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    retryBtn.classList.add('hide');
    setNextQuestion();
    timeLeft();
};

// function to set the next question by shuffling questions
function setNextQuestion() {
    resetState()
    // if our current question is => than actual length of questions, then endGame, otherwise showQuestion
    if (currentQuestionIndex >= questions.length) {
        endGame();
    } else {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
};

// function to display the question
function showQuestion(question) {
    // function to loop through answers to determine whether they are correct or not
    function selectAnswer() {
        for (var i = 0; i < question.answers.length; i++) {
            console.log(this.textContent)
            if (this.textContent === question.answers[i].text) {
                if (question.answers[i].correct) {
                    counter += 10
                    resetState();
                    questionEl.textContent = "Correct!"
                    nextBtn.classList.remove('hide');
                } else {
                    counter -= 5
                    resetState();
                    questionEl.textContent = "Incorrect!"
                    nextBtn.classList.remove('hide');
                }
            }
        }
    };
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    });
};

// function to reset the state of the questions layout
function resetState() {
    nextBtn.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(
            answerButtonsEl.firstChild
        )
    }  
};

function timeLeft() {
    var currentTime = document.querySelector("#time-left")
    currentTime.innerText = `Time: ${counter}`
    startCountdown = setInterval(function() {
        if(counter === 0) {
            resetState();
            clearInterval(startCountdown);
            questionEl.textContent = "Your time has ran out! Would you like to retry?"
            retryBtn.classList.remove('hide')
        } 
        if(isPaused) {
            
        } else {
            counter--;
        }
        
        currentTime.innerText = `Time: ${counter}`
    }, 1000);
};

function highScore() {
    // if there is no localStorage with that name
    if (localStorage.getItem('high-score') === null) {
        localStorage.setItem('high-score', JSON.stringify([]))
    }
    // that way we always have some localStorage
    localStorage.setItem ('timeLeft', counter)
    var data = JSON.parse(localStorage.getItem("high-score"));
    data.push(counter);
    localStorage.setItem("high-score", JSON.stringify(data));
};

function allScores() {
    var data = JSON.parse(localStorage.getItem("high-score"));
    startBtn.classList.add('hide');
    retryBtn.classList.remove('hide');
    var scoreList = 'highscore:\n'
    for (var i = 0; i < data.length; i++) {
        scoreList = scoreList + data[i] + '\n'
    }
    scores.textContent = scoreList;
    console.log(scoreList)
    pauseGame();
};

function pauseGame() {
    isPaused = true
};

function endGame() {
    questionEl.textContent = "Good job on finishing the Questions! Click on View High Score to view your scores!",
    retryBtn.classList.remove('hide');
    clearInterval(startCountdown);
    highScore();
    counter = 60
};

retryBtn.addEventListener('click', startGame);
viewScore.addEventListener('click', allScores);
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex ++
    setNextQuestion()
})
