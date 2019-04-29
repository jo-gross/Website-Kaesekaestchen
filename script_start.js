/*
Default values and var inits
*/
var players = 2;
var fieldWidth = 2;
var fieldHeight = 2;

/*
Grabs all values from the inputs and validate them again
*/
function getValues(){
	players = parseInt(document.getElementById('players').value);
	if (players == "" || isNaN(players)) {
		players = 2;
	}

	fieldWidth = parseInt(document.getElementById('fieldWidth').value);
	if (fieldWidth == "" || isNaN(fieldWidth)) {
		fieldWidth = 2;
	}

	fieldHeight = parseInt(document.getElementById('fieldHeight').value);
	if (fieldHeight == "" || isNaN(fieldHeight)) {
		fieldHeight = 2;
	}

}

/*
Function that is called when form matches all requirements and ranges
graps all values from the form and opens the game
*/
function onSubmitFunction() {
  getValues();
  window.open('game.html?p='+players+'&w='+fieldWidth+'&h='+fieldHeight,'_self',false);
};
