let startBtn = document.querySelector(".startButton");
let infoBox = document.querySelector(".info-box");
let exitBtn = document.querySelector(".exitBtn");
let continueBtn = document.querySelector(".continueBtn");
let quizBox = document.querySelector(".quiz-box");
let questiontext = document.querySelector(".question-text");
let allOption = document.querySelectorAll(".option");
let nextBtn = document.querySelector(".next-btn");
let currentQuestionIndex = 0;

startBtn.addEventListener("click", () => {
  //we have to inject class name to info box
  infoBox.classList.add("activeInfoBox");
});

exitBtn.addEventListener("click", () => {
  //we have to remove the class name from info box

  infoBox.classList.remove("activeInfoBox");
});

continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfoBox");
  quizBox.classList.add("activeQuizBox");

  //here we need to start showing question
  showQuestion(currentQuestionIndex);
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex <= 9) {
    currentQuestionIndex = currentQuestionIndex + 1;
    showQuestion(currentQuestionIndex);
  }
});

//function to show /render question

const showQuestion = (index) => {
  questiontext.innerText =
    "" + questions?.[index].numb + ". " + questions?.[index].question;
  for (let i = 0; i < allOption?.length; i++) {
    allOption[i].innerText = questions?.[index].options?.[i];
  }
};
