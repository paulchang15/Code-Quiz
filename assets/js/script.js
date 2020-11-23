var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var retryBtn = document.getElementById('retry-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var startText = document.getElementById('start-text')
var viewScore = document.getElementsByClassName('.high-score')
var counter = 75
var shuffledQuestions, currentQuestionIndex


var questions = [
    {
        question: 'What is a variable?',
        answers: [
            {text: 'a global scope parameter', correct: true},
            {text: 'a math term', correct: false},
            {text: '', correct: false},
            {text: '', correct: false},
        ]
    }, {
        question: 'What is a array?',
        answers: [
            {text: 'a global scope parameter', correct: true},
            {text: 'a math term', correct: false},
            {text: '', correct: false},
            {text: '', correct: false},
        ]
    }
]

// function to start the game
function startGame() {
    startBtn.classList.add('hide')
    startText.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion();
    timeLeft();
};

// function to set the next question by shuffling questions
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
};

// function to display the question
function showQuestion(question) {
    console.log(question)

    // function to loop through answers to determine whether they are correct or not
    function selectAnswer() {
        for (var i = 0; i < question.answers.length; i++) {
            if (this.textContent === question.answers[i].text) {
                if (question.answers[i].correct) {
                    counter += 10
                    resetState();
                    questionEl.textContent = "Correct!"
                    nextBtn.classList.remove('hide')
                } else {
                    counter -= 5
                    resetState();
                    questionEl.textContent = "Incorrect!"
                    nextBtn.classList.remove('hide')
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
    var counter = 75
    var currentTime = document.querySelector("#time-left")
    currentTime.innerText = `Time: ${counter}`
    var startCountdown = setInterval(function() {
        counter--;
        if(counter === 0) {
            clearInterval(startCountdown);
            resetState();
            questionEl.textContent = "The Game has ended! Would you like to retry?"
            retryBtn.classList.remove('hide')
            retryBtn.addEventListener('click', startGame);
        }
        currentTime.innerText = `Time: ${counter}`
    }, 1000);
};

function highScore() {
    // if there is no localStorage with that name
    if (localStorage.getItem('.high-score') === null) {
        localStorage.setItem('.high-score', JSON.stringify([]))
    }
    // that way we always have some localStorage
    localStorage.setItem ('timeLeft', JASON.stringify.counter)
    var data = JSON.parse(localStorage.getItem(".high-score"));
    data.push(timeLeft);
    localStorage.setItem(".high-score", JSON.stringify(data));
};

function allScores() {
    viewScore.addEventListener('click', highScore);
    console.log(allScores)
};

function endGame() {
    if (question.answers.length < question.answers.length[max]) {

    }
};

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex ++
    setNextQuestion()
})
