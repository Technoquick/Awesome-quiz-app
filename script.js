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
let currentQuestionIndicator = document.querySelector(
  ".currentQuestionIndicator",
);
let currentQuestionIndex = 0;

let userScore = 0;
let timelineInterval = null;
let progressBarInterval = null;

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
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < 9) {
    currentQuestionIndex = currentQuestionIndex + 1;
    //reset progress bar
    //reset time
    handleTimeline(15);
    handleProgressBar();
    showQuestion(currentQuestionIndex);
  }
});

//function to show /render question

const showQuestion = (index) => {
  questiontext.innerText =
    "" + questions?.[index].numb + ". " + questions?.[index].question;
  for (let i = 0; i < allOption?.length; i++) {
    //reset previous question state
    allOption[i].classList.remove("correct");
    allOption[i].classList.remove("incorrect");
    allOption[i].classList.remove("disabled");

    // Remove previous icon
    const icon = allOption[i].querySelector(".icon");
    if (icon) {
      icon.remove();
    }

    allOption[i].innerText = questions?.[index].options?.[i];
    allOption[i]?.addEventListener("click", optionClickHandler);
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
      clearInterval(timelineInterval);
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

const tickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
const crossicon = `<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;
const optionClickHandler = (e) => {
  clearInterval(progressBarInterval);
  clearInterval(timelineInterval);
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
      allOption[i].insertAdjacentElement("beforeend", tickIcon);
    }
  }
};
