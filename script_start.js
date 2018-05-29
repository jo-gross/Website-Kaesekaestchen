var players = 2;
var spielgroesseX = 2;
var spielgroesseY = 2;

function getValues(){
	players = parseInt(document.getElementById('players').value);
	if (players == "" || isNaN(players)) {
		players = 2;
	}

	spielgroesseX = parseInt(document.getElementById('spielgroesseX').value);
	if (spielgroesseX == "" || isNaN(spielgroesseX)) {
		spielgroesseX = 2;
	}

	spielgroesseY = parseInt(document.getElementById('spielgroesseY').value);
	if (spielgroesseY == "" || isNaN(spielgroesseY)) {
		spielgroesseY = 2;
	}

}

var restartbtn = document.getElementById("submitbutton");
restartbtn.onclick = function() {
  console.log("Start game");
  getValues();
  window.open ('game.html?'+players+'*'+spielgroesseX+'#'+spielgroesseY,'_self',false);
};
