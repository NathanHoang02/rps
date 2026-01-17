giveEventListenersToInputs();
let computerScore = 0;
let playerScore = 0;
let roundNumber= 0; 
    
function game(e) 
{

  const playerSelection = e.target.dataset.choice;
  const computerSelection = computerPlay();

  let pressedInput = e.target;
  pressedInput.classList.add('pressed');

  resultOfRound = playRound(playerSelection, computerSelection);

  displaySelectionAndWinnerOfRound(playerSelection, computerSelection, resultOfRound);
  displayResultOfRoundInLog(playerSelection, computerSelection, resultOfRound, roundNumber);

  let resultOfGame;
  if (playerScore === 5 || computerScore === 5) 
  {
    if (playerScore > computerScore) 
    {
      resultOfGame = {message: 'You won!! Congratulations!', class: 'player-good'};
    } else if (playerScore < computerScore) 
    {
      resultOfGame = {message: 'You lost... booo!!', class: 'computer-bad'};
    }
    
    showGameResultMessage(resultOfGame);
    disableImageInputs();
    createResetButton();
  }

  displayScore(playerScore, computerScore);
}

function computerPlay() 
{
  const options = ['rock', 'paper', 'scissors'];
  let selection = Math.ceil(Math.random() * 3) - 1;
  return options[selection];
}

function changeDivText(idOfSelectedDiv, divTextContent) 
{
  selectedDiv = document.querySelector(`${idOfSelectedDiv}`);
  selectedDiv.textContent = `${divTextContent}`;
}

function playRound(playerSelection, computerSelection) 
{
  roundNumber++;

  if (playerSelection === computerSelection) 
  {
    return {message: "It's a draw!", winner: 'draw'}

  } else if ((playerSelection === 'rock' && computerSelection === 'paper') ||
            (playerSelection === 'paper' && computerSelection === 'scissors') ||
            (playerSelection === 'scissors' && computerSelection === 'rock')) 
  {
    computerScore++;
    return {message: 'You lost this round!', winner: 'computer'}

  } else if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')) 
  {
    playerScore++;
    return {message: 'You win this round!', winner: 'player'}
  }
}

function displaySelectionAndWinnerOfRound(playerSelection, computerSelection, resultOfRound) 
{
  changeDivText('#player-choice', `You chose ${playerSelection}.`);
  changeDivText('#computer-choice', `Computer chose ${computerSelection}.`);
  changeDivText('#result-of-round', resultOfRound.message);
}

function displayResultOfRoundInLog(playerSelection, computerSelection, resultOfRound, roundNumber) 
{
  let newLogItemForPlayer = document.createElement('imgages');
  let newLogItemForComputer = document.createElement('images');
  let newLogItemForWinners = document.createElement('div');

  newLogItemForPlayer.src = `images/${playerSelection}.jpg`; 
  newLogItemForComputer.src = `images/${computerSelection}.jpg`;
  newLogItemForPlayer.classList.add('log-item');
  newLogItemForComputer.classList.add('log-item');
  
  let playerLog = document.querySelector('#player-log');
  let computerLog = document.querySelector('#computer-log');
  let winnersLog = document.querySelector('#winners-log');

  playerLog.appendChild(newLogItemForPlayer);
  computerLog.appendChild(newLogItemForComputer);

  let winnerLog;
  let winnerLogClass;
  if (resultOfRound.winner === 'player') {
    winnerLog = `You won round ${roundNumber}!`;
    winnerLogClass = 'log-winner-player';
  } else if (resultOfRound.winner === 'computer') {
    winnerLog = `You lost round ${roundNumber}!`;
    winnerLogClass = 'log-winner-computer';
  } else if (resultOfRound.winner === 'draw') {
    winnerLog = `Draw in round ${roundNumber}!`
    winnerLogClass = 'log-winner-draw';
  }
  newLogItemForWinners.textContent = winnerLog;
  newLogItemForWinners.classList.add(winnerLogClass);
  
  winnersLog.appendChild(newLogItemForWinners);
}

function displayScore(playerScore, computerScore) 
{
  let scoreMessage = `Your score: ${playerScore}, Computer score: ${computerScore}`;
  changeDivText('#current-score', scoreMessage);
}

function showGameResultMessage(resultOfGame) 
{
  changeDivText('#result-of-game', resultOfGame.message)
  let resultMessage = document.querySelector('#result-of-game');
  resultMessage.classList.add(resultOfGame.class);
}

function disableImageInputs() 
{
  inputs = document.querySelector('#inputs').children;
  for (let input of inputs) {
    input.disabled = true;
  }
}

function enableImageInputs() 
{
  inputs = document.querySelector('#inputs').children;
  for (let input of inputs) {
    input.disabled = false;
  }
}

function createResetButton() 
{
  let resetButtonDiv = document.querySelector('#reset-button');
  let button = document.createElement('button');
  button.textContent = 'Play again!'
  button.classList.add('reset-button');
  button.addEventListener('click', resetGame);
  
  resetButtonDiv.appendChild(button);
}

function resetGame() 
{
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  displayScore(playerScore, computerScore);

  let logs = document.querySelector('#logs').childNodes;
  let resetButtonDiv = document.querySelector('#reset-button')

  for (let log of logs) 
  {
    log.innerHTML = '';
  }
  resetButtonDiv.innerHTML = '<br>';
  changeDivText('#result-of-game', '');

  let resultOfGameDiv = document.querySelector('#result-of-game');
  resultOfGameDiv.classList = '';

  enableImageInputs();
}

function removeTransition(e) 
{
  if (e.propertyName !== 'transform') return;
  this.classList.remove('pressed');
}

function giveEventListenersToInputs() 
{
  inputs = document.querySelectorAll('input[type=image]');
  inputs.forEach((input) => 
  {
    input.addEventListener('click', game);
    input.addEventListener('transitionend', removeTransition);
  });
}