document.querySelector("button").addEventListener("click", gradeQuiz);

// function setMarkImage(index, imageName, altText) {
//   let markContainer = document.querySelector(`#markImg${index}`);
//   markContainer.textContent = "";

//   let img = document.createElement("img");
//   img.src = `img/${imageName}`;
//   img.alt = altText;
//   markContainer.appendChild(img);
// }

function isFormValid() {
  let isValid = true;
  let q1Response = document.querySelector("#q1").value;
  let validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "Question 1 was not answered";
  }

  return isValid;
}

function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  let score = 0;

  function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    img.className = "mark-img";
    markContainer.appendChild(img);    
  }

  function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
  }

  function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
  }

  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;
  let q5Response = document.querySelector("#q5").value;
  let q6Response = document.querySelector("#q6").value;
  let q8Response = document.querySelector("#q8").value;
  let q9Response = document.querySelector("#q9").value.toLowerCase();
  // let q1Feedback = document.querySelector("#q1Feedback");
  // let markImg1 = document.querySelector("#markImg1");

  // q1Feedback.textContent = "";
  // q1Feedback.className = "";
  // markImg1.textContent = "";

  if (q1Response === "sacramento") {
    // q1Feedback.textContent = "Correct!";
    // q1Feedback.className = "bg-success text-white";
    rightAnswer(1);

    // let img = document.createElement("img");
    // img.src = "img/checkmark.png";
    // img.alt = "Checkmark";
    // markImg1.appendChild(img);

    // score += 20;
  } else {
  //   q1Feedback.textContent = "Incorrect!";
  //   q1Feedback.className = "bg-warning text-white";

  //   let img = document.createElement("img");
  //   img.src = "img/xmark.png";
  //   img.alt = "X mark";
  //   markImg1.appendChild(img);
  wrongAnswer(1);
  }

  if (q2Response === "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  if (document.querySelector("#Jefferson").checked &&
    document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked &&
    !document.querySelector("#Franklin").checked) {
  rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  let selectedQ4 = document.querySelector("input[name=q4]:checked");

  if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  if (q5Response === "California") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  if (q6Response === "50") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  let selectedQ7 = document.querySelector("input[name=q7]:checked");

  if (selectedQ7 !== null && selectedQ7.value === "Hawaii") {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  if (q8Response === "Alaska") {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  if (q9Response === "washington dc" || 
      q9Response === "washington d.c." || 
      q9Response === "washington, dc" || 
      q9Response === "washington, d.c." ||
      q9Response === "Washington" ||
      q9Response === "washington") {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  if (document.querySelector("#q10Oregon").checked &&
      document.querySelector("#q10Nevada").checked &&
      document.querySelector("#q10Arizona").checked &&
      !document.querySelector("#q10Texas").checked) {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  //document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
  let totalScore = document.querySelector("#totalScore");

  totalScore.textContent = `Total Score: ${score}`;

  if (score < 80) {
    totalScore.className = "text-danger";
  } else {
    totalScore.className = "text-success";
  }

  if (score > 80) {
    totalScore.textContent += " Congratulations!";
  }

  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}

displayQ4Choices();
displayQ7Choices();

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function displayQ7Choices() {
  let q7ChoicesArray = ["Alaska", "Hawaii", "Arizona", "New Mexico"];
  shuffleArray(q7ChoicesArray);

  let choicesContainer = document.querySelector("#q7Choices");
  choicesContainer.textContent = "";

  for (let choice of q7ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q7";
    input.id = `q7${choice.replaceAll(" ", "")}`;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

