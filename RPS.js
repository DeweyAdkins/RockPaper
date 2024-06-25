document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('name-input');
    const startGameButton = document.getElementById('start-game');
    const playerHands = document.querySelectorAll('.player .hands .hand');
    const botHands = document.querySelectorAll('.bot .hands .hand');
    const playerWins = document.getElementById('player-wins');
    const botWins = document.getElementById('bot-wins');
    const resultDisplay = document.getElementById('result');
    let playerName = '';

    startGameButton.addEventListener('click', () => {
        playerName = playerNameInput.value || 'Player';
        document.getElementById('player-name').textContent = playerName;
        resetGame();
    });

    playerHands.forEach(hand => {
        hand.addEventListener('click', () => {
            const playerHand = hand.classList[1];
            playRound(playerHand);
        });
    });

    function playRound(playerHand) {
        const botHand = getRandomHand();
        updateHands(playerHand, botHand);
        determineWinner(playerHand, botHand);
    }

    function getRandomHand() {
        const hands = ['rock', 'paper', 'scissors'];
        return hands[Math.floor(Math.random() * hands.length)];
    }

    function updateHands(playerHand, botHand) {
        playerHands.forEach(hand => {
            hand.classList.remove('selected');
        });
        botHands.forEach(hand => {
            hand.classList.remove('selected');
        });
        document.querySelector(`.player .hands .${playerHand}`).classList.add('selected');
        document.querySelector(`.bot .hands .${botHand}`).classList.add('selected');
    }

    function determineWinner(playerHand, botHand) {
        if (playerHand === botHand) {
            resultDisplay.textContent = 'It\'s a tie!';
        } else if ((playerHand === 'rock' && botHand === 'scissors') ||
            (playerHand === 'paper' && botHand === 'rock') ||
            (playerHand === 'scissors' && botHand === 'paper')) {
            resultDisplay.textContent = `${playerName} wins!`;
            playerWins.textContent = parseInt(playerWins.textContent) + 1;
        } else {
            resultDisplay.textContent = 'Bot wins!';
            botWins.textContent = parseInt(botWins.textContent) + 1;
        }
    }

    function resetGame() {
        playerWins.textContent = '0';
        botWins.textContent = '0';
        resultDisplay.textContent = '';
        playerHands.forEach(hand => {
            hand.classList.remove('selected');
        });
        botHands.forEach(hand => {
            hand.classList.remove('selected');
        });
    }
});
