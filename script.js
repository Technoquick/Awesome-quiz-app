let startBtn = document.querySelector(".startButton");
let infoBox = document.querySelector(".info-box");
let exitBtn = document.querySelector(".exitBtn");
let continueBtn = document.querySelector(".continueBtn");
let quizBox = document.querySelector(".quiz-box");
let questiontext = document.querySelector(".question-text");
let allOption = document.querySelectorAll(".option");
let nextBtn = document.querySelector(".next-btn");
let timeline = document.querySelector(".timeline");
let progressBar = document.querySelector(".progressBar");
let timelineTitle = document.querySelector(".timeline-title");
let currentQuestionIndicator = document.querySelector(
  ".currentQuestionIndicator",
);

let resultBox = document.querySelector(".result-box");
let quitQuiz = document.querySelector(".quit-quiz");
let replayQuiz = document.querySelector(".replay-quiz");
let scoreText = document.querySelector(".scoreText");
let currentQuestionIndex = 0;

let userScore = 0;
let timelineInterval = null;
let progressBarInterval = null;

const tickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
const crossicon = `<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;

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
  handleTimeline(15);
  handleProgressBar();
  // timelineTitle.innerText = "Time Up";
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < 9) {
    currentQuestionIndex = currentQuestionIndex + 1;
    //reset progress bar
    //reset time
    handleTimeline(15);
    handleProgressBar();
    showQuestion(currentQuestionIndex);
    nextBtn.classList.remove("Active");
    timelineTitle.innerText = "Time Left";
  } else {
    clearInterval(progressBarInterval);
    clearInterval(timelineInterval);
    quizBox.classList.remove("activeQuizBox");
    resultBox.classList.add("activeResultBox");
    handleShowResult();
  }
});

quitQuiz.addEventListener("click", () => {
  restart();
  resultBox.classList.remove("activeResultBox");
});

replayQuiz.addEventListener("click", () => {
  restart();
  resultBox.classList.remove("activeResultBox");
  quizBox.classList.add("activeQuizBox");
  showQuestion(currentQuestionIndex);
  handleTimeline(15);
  handleProgressBar();
});

//function to show /render question

const showQuestion = (index) => {
  questiontext.innerText =
    "" + questions?.[index].numb + ". " + questions?.[index].question;
  for (let i = 0; i < allOption?.length; i++) {
    //reset previous question state
    allOption[i].innerText = questions?.[index].options?.[i];
    allOption[i].classList.remove("correct");
    allOption[i].classList.remove("incorrect");
    allOption[i].classList.remove("disabled");
    if (index === 0) {
      allOption[i]?.addEventListener("click", optionClickHandler);
    }
  }
  currentQuestionIndicator.innerText = index + 1;
};

const handleTimeline = (time) => {
  clearInterval(timelineInterval);
  timeline.innerText = time;
  let timeValue = time;
  //set interval return a id of interval which we can use to clear the interval
  timelineInterval = setInterval(() => {
    timeValue--;
    if (timeValue < 10) {
      timeline.innerText = "0" + timeValue;
    } else {
      timeline.innerText = timeValue;
    }

    if (timeValue === 0) {
      timelineTitle.innerText = "Time Up";
      clearInterval(timelineInterval);
      nextBtn.classList.add("Active");
      const correctAnswer = questions[currentQuestionIndex].answer;
      for (let i = 0; i < allOption?.length; i++) {
        allOption[i].classList.add("disabled");
        if (allOption[i].innerText === correctAnswer) {
          allOption[i].classList.add("correct");
          allOption[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
    }
  }, 1000);
};

const handleProgressBar = () => {
  clearInterval(progressBarInterval);
  progressBar.style.width = "0%";
  let currentpercentage = 0;
  progressBarInterval = setInterval(() => {
    currentpercentage += 1 / 15;
    progressBar.style.width = currentpercentage + "%";
    if (currentpercentage >= 100) {
      clearInterval(progressBarInterval);
    }
  }, 10);
};

const optionClickHandler = (e) => {
  if (e.currentTarget.classList.contains("disabled")) {
    return;
  }
  clearInterval(progressBarInterval);
  clearInterval(timelineInterval);
  nextBtn.classList.add("Active");
  const userAnswer = e.currentTarget.innerText;
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    userScore++;
    e.currentTarget.classList.add("correct");
    e.currentTarget.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    //wrong Answer
    //mark user response as wrong
    //traverse and find correct answer
    //and then marked it as correct
    e.currentTarget.classList.add("incorrect");
    e.currentTarget.insertAdjacentHTML("beforeend", crossicon);
  }
  //find and show correct answer
  for (let i = 0; i < allOption?.length; i++) {
    allOption[i].classList.add("disabled");
    if (
      userAnswer !== correctAnswer &&
      allOption[i].innerText === correctAnswer
    ) {
      allOption[i].classList.add("correct");
      allOption[i].insertAdjacentHTML("beforeend", tickIcon);
    }
  }
};

const restart = () => {
  clearInterval(progressBarInterval);
  clearInterval(timelineInterval);
  userScore = 0;
  currentQuestionIndex = 0;
  timelineTitle.innerText = "Time left";
};

const handleShowResult = () => {
  scoreText.innerHTML = `<span>
           and nice 😊 ' you got 
          <p>${userScore}</p>  out of   <p>${questions?.length}</p>
         </span>  `;
};
