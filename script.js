// LocalHost: 127.0.0.1
'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0'); // El --> Element
const score1El = document.getElementById('score--1'); // No # is used in getElementById
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Helper Functions
const switchActivePlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0; // Ternary operator to switch the active player from 0 to 1 or viceversa.
    player0El.classList.toggle('player--active'); // If class player--active exists, remove it, else, add it. This is the classList.toggle()
    player1El.classList.toggle('player--active');
};

const init = () => {
    scores = [0, 0]; // An array saving the scores of both players, [player1Score, player2Score].
    currentScore = 0;
    activePlayer = 0; // If 0 --> Player 1, If 1 --> Player 2.
    playing = true; // Flag giving an indicator that there is still no winner.

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player1El.classList.remove('player--winner', 'player--active');
    player0El.classList.remove('player--winner');
    player0El.classList.add('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    if (playing) {
        // Task 1. Generating a random dice roll (1 -> 6)
        const dice = Math.trunc(Math.random() * 6) + 1;
        // Task 2. Display the corresponding dice image
        diceEl.classList.remove('hidden');
        diceEl.src = `./imgs/dice-${dice}.png`
        console.log(dice);
        // Task 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; // Setting Dynamically the active player current score.
        }
        else {
            // if true, switch to the next player.
            // Remove player--active class from the current player and reset currentScore.
            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = 0; // Resetting the currentScore of the active player.
            switchActivePlayer();
        }
    }
});

// Holding dice functionality
btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        currentScore = 0;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            //Winning condition
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            diceEl.classList.add('hidden');
            document.getElementById(`current--${activePlayer}`).textContent = 0; // Resetting the currentScore of the active player
            switchActivePlayer();
        }
    }
});

// New game button functionality
btnNew.addEventListener('click', init);

// Starting point
init();