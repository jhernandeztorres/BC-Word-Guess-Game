// array that holds the words
var computerChoice = [
    "Hiro Hamada", "Tadashi Hamada", "Gogo Tomago", "Wasabi", "Honey Lemon", "Fred", "San Fransokyo", "Alistair Krei",
    "Callaghan", "Baymax", "Abigail", "Aunt Cass", "Yama", "Heathcliff"
];

var wins = 0;
var currentGuess = [];
var guessesLeft = 6;
var pick = []; // variable to hold the picked word
var currentWord = []; // array to hold letters for selected word
var allowedCharacters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

// random choice from array
var computerPick = computerChoice[Math.floor(Math.random() * computerChoice.length)];

// new variable to not change original content
var who = computerPick;
computerPick = computerPick.toUpperCase();
console.log("Computer picked " + who);

// push the word as blanks
for (var i = 0; i < computerPick.length; i++) {
    // add spaces for certain words
    if (computerPick[i] === " ") {
        pick.push("&nbsp");
        currentWord.push("&nbsp");
    } else {
        pick.push("-");
        currentWord.push(computerPick[i]);
    };
};

// function to update HTML
function updateHTML() {
    if (guessesLeft === 0) {
        outcome("lose");
    }

    var win = wins; // updates win counter
    var guess = guessesLeft; // updates remaining guesses
    var current = currentGuess; // user choices
    var choice = pick; // answer and '-'

    document.getElementById("wins").innerHTML = win;
    document.getElementById("guess").innerHTML = guess;
    document.getElementById("currentGuess").innerHTML = current;
    document.getElementById("currentWord").innerHTML = choice.join(" ");

}

function win() {
    var img = document.getElementById("img");
    // replace the image with the src image connected by name
    img.setAttribute("src", "assets/images/" + who + ".png");
    // replace the name text with the character name
    var name = document.getElementById("who");
    name.textContent = who;
}

function lose() {
    var img = document.getElementById("img");
    // replace the image with the src image connected by name
    img.setAttribute("src", "assets/images/Fail.png");
    // replace the name text with the character name
    var name = document.getElementById("who");
    name.textContent = "Try Again!";
}

// win or lose outcomes
function outcome(result) {
    // user wins
    if (result === "win") {
        wins++;
        var choice = pick;
        // choose new word
        var replace = document.getElementById("currentWord").textContent;
        document.getElementById("currentWord").textContent = choice;

        win();
    } else if (result === "lose") {
        lose();
    };

    // reset the blanks
    currentGuess = [];
    guessesLeft = 6;
    pick = [];
    currentWord = [];

    // computers new pick
    computerPick = computerChoice[Math.floor(Math.random() * computerChoice.length)];

    who = computerPick;
    computerPick = computerPick.toUpperCase();
    console.log("Computer picked " + who);

    for (var i = 0; i < computerPick.length; i++) {
        if (computerPick[i] === " ") {
            pick.push("&nbsp");
            currentWord.push("&nbsp");
        } else {
            pick.push("-");
            currentWord.push(computerPick[i]);
        };
        updateHTML();
    };
};

updateHTML(); // updates to blank word

document.onkeyup = function (e) {
    var userGuess = e.key;

    // lower case to upper case
    userGuess = userGuess.toUpperCase();

    console.log("User pressed " + userGuess);

    // check for duplicate letter pressed
    if (currentGuess.includes(userGuess)) {
        var already = document.getElementById("alreadyGuessed");
        already.textContent = userGuess;
        return;

    } else if (allowedCharacters.includes(userGuess)) {
        currentGuess.push(userGuess);

        // match with letters in array
        if (currentWord.includes(userGuess)) {

            // replace blanks with correct letters
            for (var i = 0; i < currentWord.length; i++) {

                if (userGuess === currentWord[i]) {
                    pick[i] = userGuess;
                }
            };

            if (!pick.includes("-")) {
                outcome("win");
            };
        } else {
            guessesLeft--;
        };
    };

    updateHTML();
};