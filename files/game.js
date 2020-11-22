
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


fetch("https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple").then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestions => {
        //fetching the questions in an array
        const formattedQuestions = {
            question: loadedQuestions.question
        };

        const answerchoices = [...loadedQuestions.incorrect_answers];
        //giving random position for correct answer
        formattedQuestions.answer = Math.floor(Math.random() * 3)+1;
        
        /* to check the correct answer,-1 to make it 0 base index, 
        0 because we're not removing any element */
        answerchoices.splice(formattedQuestions.answer -1, 0 , loadedQuestions.correct_answer);
        
        //to display answers in choices
        answerchoices.forEach((choice, index) => {
            formattedQuestions["choice" + (index +1)] = choice;
        })
        return formattedQuestions;
    });
   
    startGame();
})
.catch(err => {
    console.error(err);
});

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if( availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to end page
        return window.location.assign("end.html");
    }

    questionCounter++;
    // questionCounterText.innerText =questionCounter + "/" + MAX_QUESTIONS;

    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;

    //update the progress bar, width must be in percentage
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    //to display the question on browser
    question.innerText = currentQuestion.question;

    //to display choices
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    }); 

    //to eliminate question already displayed
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {

    choice.addEventListener("click" , e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswers = selectedChoice.dataset["number"];
        
       /* same as ternary
        const classtoApply = 'incorrect';
        if(selectedAnswers == currentQuestion.answer){
            classtoApply = 'correct';
        };
        */

        const classtoApply = selectedAnswers == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classtoApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        //to select the choice and display correct or incorrect by colors
        selectedChoice.parentElement.classList.add(classtoApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classtoApply);
            getNewQuestion();
        }, 1000);
   
    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

