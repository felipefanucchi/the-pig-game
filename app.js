/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score,
	activePlayer,
	roundScore,
	diceDOMzero,
	diceDOMone,
	gameStop,
	lastDiceZero,
	lastDiceOne,
	inputValue;

init();

//hide the dice
document.querySelector('.dice-0').style.display = 'none';
document.querySelector('.dice-1').style.display = 'none';

//EventListener
document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gameStop) return;

	// Roll the dice.
	var diceZero = Math.floor(Math.random() * 6) +1;
	var diceOne = Math.floor(Math.random() * 6) +1;

	// show the dice
	document.querySelector('.dice-0').style.display = 'block';
	document.querySelector('.dice-1').style.display = 'block';

	// Change the dice img.
	diceDOMzero.src = 'dice-'+ diceZero +'.png';
	diceDOMone.src = 'dice-'+ diceOne +'.png';

	// If Result equals one, lost all and pass his turn to the other player.
	//two six in a round, loss all.
	if(lastDiceZero === 6 || lastDiceOne === 6 && diceZero === 6 || diceOne === 6){
		document.querySelector('#score-'+ activePlayer).textContent = 0;
		roundScore = 0;
		score[activePlayer] = 0;

		diceDOMzero.style.display = 'none';
		diceDOMone.style.display = 'none';
		nextPlayer();
	} else if( diceZero !== 1 && diceOne !== 1 ){
		//Round Score add to the current.
		roundScore += (diceZero + diceOne); // Add the sum to the round score.

		document.querySelector('#current-'+activePlayer).textContent = roundScore;
	} else{
		diceDOMzero.style.display = 'none'; 
		diceDOMone.style.display = 'none'; 

		nextPlayer();
	}

	lastDiceZero = diceZero;

	lastDiceOne = diceOne;
});

//Another Event Listener to hold button.
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gameStop) return;

	diceDOMzero.style.display = 'none'; 
	diceDOMone.style.display = 'none'; 

	score[activePlayer] += roundScore;

	// Update the UI
	document.querySelector('#score-'+ activePlayer).textContent = score[activePlayer];

	if(score[activePlayer] >= inputValue){
		document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';

		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');

		diceDOMzero.style.display = 'none';
		diceDOMone.style.display = 'none';

		gameStop = true;
	} else{
		nextPlayer();
	}
});

function nextPlayer(){
	roundScore = 0;

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	gameStop = false;
	score = [0, 0];
	activePlayer = Math.floor(Math.random() * 2);
	roundScore = 0;
	diceDOMzero = document.querySelector('.dice-0');
	diceDOMone = document.querySelector('.dice-1');

	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	// When i initialize, both score must be 0.
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');

	document.querySelector('.overlay').classList.remove('inactive');
}

function setValue() {
	inputValue = document.getElementById('field-points').value;

	var reg = /^\d+$/g;

	if(reg.test(inputValue) && inputValue !== ""){
		document.querySelector('.overlay').classList.add('inactive');
	} else {
		alert('Insira um valor!')
	}
}

document.getElementById('points').addEventListener('submit', setValue);