const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')

startButton.addEventListener('click', startGame)

let shuffledQuestions, currentQuestionIndex
function startGame() {
    // var startText = "start-text"
    // startText.parentNode.removeChild(startText)
    startButton.classList.add('hide')
    
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
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
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(
            answerButtonsEl.firstChild
        )
    }
}
function selectAnswer() {

}

const questions = [
    {
        question: 'lol',
        answers: [
            {text: 'ok', correct: true},
            {text: '', correct: false},
        ]
    }
]