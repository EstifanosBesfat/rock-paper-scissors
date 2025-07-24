// Initialize score from localStorage or default
let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// Randomly select computer move
function selectMove() {
    const moves = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * moves.length);
    return moves[index];
}

// Compare user and computer moves
function compare(user, computer) {
    if (user === computer) return "tie";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "win";
    }
    return "lose";
}

// Play a round
function play(userChoice) {
    const computerChoice = selectMove();
    const result = compare(userChoice, computerChoice);

    if (result === "win") score.wins++;
    else if (result === "lose") score.losses++;
    else score.ties++;

    localStorage.setItem("score", JSON.stringify(score));
    updateDisplay(userChoice, computerChoice, result);
}

// Update the display
function updateDisplay(user, computer, result) {
    // Show result text
    const resultText = document.getElementById("resultText");
    if (result) {
        if (result === "win") resultText.textContent = "You win!";
        else if (result === "lose") resultText.textContent = "You lose!";
        else resultText.textContent = "It's a tie!";
    } else {
        resultText.textContent = "";
    }

    // Show moves
    const moveText = document.getElementById("moveText");
    if (user && computer) {
        moveText.innerHTML = `You 
            <img src="rock-paper-scissors-icons/${user}-emoji.png" class="emoji" alt="${user}">
            <img src="rock-paper-scissors-icons/${computer}-emoji.png" class="emoji" alt="${computer}">
            Computer`;
    } else {
        moveText.innerHTML = "";
    }

    // Show score
    const scoreText = document.getElementById("scoreText");
    scoreText.textContent = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

// Reset the score
function resetScore() {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
    localStorage.setItem("score", JSON.stringify(score));
    updateDisplay();
}

// Set initial display
updateDisplay();