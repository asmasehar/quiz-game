const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;



finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("saved");
    /* as forms submit and save the data on click so using preventDefault to prevent its default
     action which is to then post to a different page */
     e.preventDefault();

     const score = {
         score: Math.floor(Math.random() * 100),
         name: username.value
     };

     
     highScores.push(score);

     //if b score is higher than a score then, put b first
     highScores.sort((a,b) => b.score - a.score);
     highScores.splice(5);
     
     localStorage.setItem("highScores", JSON.stringify(highScores));
     window.location.assign("../index.html");
};