const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores"));

//joining all elements in the array
highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score"> ${score.name} - ${score.score}</li>`;
    })
    .join("");
