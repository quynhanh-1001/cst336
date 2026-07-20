//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLosses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = "";  //clearing the textbox

   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";   //clearing the feedback
  
    //clearing previous guesse
    document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = Number(document.querySelector("#playerGuess").value);
    console.log("Player guess: " + guess);

    if (isNaN(guess) || guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";

        document.querySelector("#playerGuess").value = "";
        document.querySelector("#playerGuess").focus();

        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);
    //feedback.style.color = "orange";
    console.log("Attempts left: " + (7 - attempts));
    //feedback.style.color = ("blue");

    document.querySelector("#guesses").textContent += guess + " ";

    if (guess == randomNumber) {
        totalWins++;
        document.querySelector("#wins").textContent = totalWins;

        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        gameOver();
    } else {
        //document.querySelector("#guesses").textContent += guess + " ";

        if (attempts == 7) {
            totalLosses++;
            document.querySelector("#losses").textContent = totalLosses;

            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = " Guess was high";
            feedback.style.color = "orange";
        } else {
            feedback.textContent = "Guess was low";
            feedback.style.color = "orange";
        }
    }

    document.querySelector("#playerGuess").value = "";
    document.querySelector("#playerGuess").focus();
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");

    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //displays Reset button
}