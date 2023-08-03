const question = document.getElementById('question')
// console.log(question)
const hudcounter = document.getElementById('questionCounter')
const hudscore = document.getElementById('score')
const progressbarfull = document.getElementById('progressbarfull') 
const selectionCard = document.getElementsByClassName('selection-card')
const choices = Array.from(document.getElementsByClassName('choice-text'))
// console.log(choices)

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestion = []
let Questions = []
targetTime = 15
const scienceQuestions = [
    {
      question: "What is the chemical symbol for water?",
      option1: "HO2",
      option2: "CO2",
      option3: "H2O",
      option4: "CH4",
      answer: 3
    },
    {
      question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
      option1: "Oxygen",
      option2: "Carbon Dioxide",
      option3: "Nitrogen",
      option4: "Hydrogen",
      answer: 2
    },
    {
      question: "What is the largest organ in the human body?",
      option1: "Liver",
      option2: "Heart",
      option3: "Lungs",
      option4: "Skin",
      answer: 4
    },
    {
      question: "What is the chemical symbol for gold?",
      option1: "Ag",
      option2: "Au",
      option3: "Fe",
      option4: "Cu",
      answer: 2
    },
    {
      question: "What is the unit of measurement for force?",
      option1: "Watt",
      option2: "Newton",
      option3: "Volt",
      option4: "Ampere",
      answer: 2
    }
];
const historyQuestions = [
    {
      question: "Who was the first President of the United States?",
      option1: "Thomas Jefferson",
      option2: "Abraham Lincoln",
      option3: "George Washington",
      option4: "Benjamin Franklin",
      answer: 3
    },
    {
      question: "In which year did World War II end?",
      option1: "1945",
      option2: "1939",
      option3: "1918",
      option4: "1941",
      answer: 1
    },
    {
      question: "Which ancient civilization built the Great Pyramids of Giza?",
      option1: "Mayans",
      option2: "Greeks",
      option3: "Egyptians",
      option4: "Romans",
      answer: 3
    },
    {
      question: "The Magna Carta, signed in 1215, is considered a cornerstone of what?",
      option1: "Roman Law",
      option2: "English Common Law",
      option3: "Islamic Law",
      option4: "Biblical Law",
      answer: 2
    },
    {
      question: "Who is known for leading the nonviolent resistance movement in India against British colonial rule?",
      option1: "Nelson Mandela",
      option2: "Mahatma Gandhi",
      option3: "Martin Luther King Jr.",
      option4: "Winston Churchill",
      answer: 2
    }
];
const generalKnowledgeQuestions = [
    {
      question: "What is the capital of Australia?",
      option1: "Sydney",
      option2: "Melbourne",
      option3: "Canberra",
      option4: "Brisbane",
      answer: 3
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      option1: "Venus",
      option2: "Mars",
      option3: "Jupiter",
      option4: "Neptune",
      answer: 2
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      option1: "William Shakespeare",
      option2: "Charles Dickens",
      option3: "Mark Twain",
      option4: "Jane Austen",
      answer: 1
    },
    {
      question: "What is the currency of Japan?",
      option1: "Yuan",
      option2: "Euro",
      option3: "Yen",
      option4: "Dollar",
      answer: 3
    },
    {
      question: "Which famous scientist developed the theory of relativity?",
      option1: "Isaac Newton",
      option2: "Albert Einstein",
      option3: "Galileo Galilei",
      option4: "Nikola Tesla",
      answer: 2
    }
];


  
categoryName = ''
const Max_Question = 5

selectedCategory= (e)=>{
    categoryName = e.target.name
    if(categoryName == "History"){
        // console.log()
        Questions = historyQuestions
    }
    else if(categoryName == "Science"){
        Questions = scienceQuestions
    }
    else{
        console.log('gk')
        Questions = generalKnowledgeQuestions
    }
    selectionCard[0].style.display='none'; 
    document.getElementsByClassName('game')[0].style.display = 'flex'
    startGame()
    // Set the interval to update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);
}



startGame = ()=>{
    questionCounter = 0
    score = 0
    availableQuestion = [...Questions]
    console.log(availableQuestion)
    timerInterval=15
    getnewQuestion()
}
getnewQuestion = ()=>{
    if(availableQuestion.length === 0 || questionCounter >= Max_Question){
        //go to end page
        localStorage.setItem('Score',score)
        return window.location.assign('./end.html')
    }
    
    questionCounter++
    hudcounter.innerText = `${questionCounter}/${Max_Question}`
    progressbarfull.style.width = `${questionCounter/Max_Question*100}%`
    const questionIndex = Math.floor(Math.random()*availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex]
    console.log(currentQuestion)
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset.number
        choice.innerText = currentQuestion['option'+number]
    })
    availableQuestion.splice(questionIndex,1)
    acceptingAnswers = true

    // Initial call to updateTimer to display the initial value
    updateTimer();
}

choices.forEach(choice =>{
    choice.addEventListener('click',e=>{
        if (!acceptingAnswers) return;

        acceptingAnswers = false
        const selectedOption = e.target
        // console.log('selectedoption =',selectedOption)
        const selectedAnswer = selectedOption.dataset.number
        // console.log('selectedAnswer=',selectedAnswer)
        const classtoapply = selectedAnswer ==currentQuestion.answer?'correct':'incorrect'
        // console.log(classtoapply)
        if(classtoapply=='correct'){
            score++
        }
        hudscore.innerText=score
        choice.classList.add(classtoapply)
        setTimeout(()=>{
            targetTime = 15 //when clicked timer resets to 15 sec
            getnewQuestion()
            choice.classList.remove(classtoapply)
        },1000)
        
    })
})

function updateTimer() {
  targetTime = targetTime - 1;
  if (targetTime <= 0) {
    targetTime = 15
    getnewQuestion()
    return;
  }
  const minutes = Math.floor(targetTime / 60);
  const seconds = targetTime % 60;
  displayTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
}

function displayTime(time) {
  document.getElementById('timer').innerText = time;
}

