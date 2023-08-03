hisghscorelist = document.getElementById('highscorelist')
const highscore = JSON.parse(localStorage.getItem('highscore')) || []
console.log(highscore)

hisghscorelist.innerHTML = highscore.map(item =>{
    return `<li class='highscoreitem'><h3>${item.username} - ${item.score}</h3></li>`
})