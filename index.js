const questions = [
    {
        question: "What is my name?",
        answers: [
            { text: "MJ", correct: false },
            { text: "Manoj", correct: false },
            { text: "Schelon", correct: false },
            { text: "GOD", correct: true },
        ]
    },
    {
        question: "What is my sister's name?",
        answers: [
            { text: "dfb", correct: false },
            { text: "fgngr", correct: false },
            { text: "f vkf", correct: false },
            { text: "sjndvkk", correct: true },
        ]
    },
    {
        question: "What is my mommy's name?",
        answers: [
            { text: " msf v ", correct: false },
            { text: "Musjdnjvkmmy", correct: false },
            { text: "gukfbvjhmmi", correct: false },
            { text: "nsfkvksn", correct: true },
        ]
    },
    {
        question: "What is my laptop's name?",
        answers: [
            { text: "hehe", correct: false },
            { text: "adb", correct: false },
            { text: "jdbfj", correct: false },
            { text: "jdfn", correct: true },
        ]
    },
];


const questionElement = document.getElementById("question");
const answerElement = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");
const answerButtons = document.getElementById("ans-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button  = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", function () {
    if(currentQuestionIndex<questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length} !`;
    nextButton.innerHTML= "Play Again";
    nextButton.style.display = "block";
}

startQuiz();
