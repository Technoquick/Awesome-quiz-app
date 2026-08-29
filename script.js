let startBtn = document.querySelector('.startButton')
let infoBox = document.querySelector('.info-box')
let exitBtn =document.querySelector('.exitBtn')
let continueBtn = document.querySelector('.continueBtn')
let quizBox = document.querySelector('.quiz-box')
startBtn.addEventListener('click' , ()=>{
   //we have to inject class name to info box
    infoBox.classList.add('activeInfoBox')
    
});

exitBtn.addEventListener('click', ()=>{
//we have to remove the class name from info box

 infoBox.classList.remove('activeInfoBox')
});

continueBtn.addEventListener('click', ()=>{
    infoBox.classList.remove('activeInfoBox')
    quizBox.classList.add('activeQuizBox')
    
})
