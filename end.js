let scoretext = document.getElementById('score-text')
let username = document.getElementById('username')
let savebutton = document.getElementById('savebutton')
const currentScore = localStorage.getItem('Score')
scoretext.innerText = `You scored ${currentScore} out of 5! Great job!`

const highscore = JSON.parse(localStorage.getItem('highscore')) || []
console.log(highscore)

username.addEventListener('keyup',()=>{
    savebutton.disabled = !username.value
})

savehighScore = e=>{
    e.preventDefault()
    console.log('clicked the button')
    const scoreArray = {
        score:currentScore,
        username:username.value
    }
    username.value = ''
    highscore.push(scoreArray)
    console.log(highscore)
    highscore.sort((a,b)=>b.score-a.score)
    highscore.splice(5)
    localStorage.setItem('highscore',JSON.stringify(highscore))
}

