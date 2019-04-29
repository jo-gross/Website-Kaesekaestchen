document.addEventListener("DOMContentLoaded", function () {


	function KKGame (element) {
		var fieldWidth = 4;
		var fieldHeight = 4;
		var players = 2;

		//Grab params and parse
		var givenPlay = findGetParameter("p");
		var givenX = findGetParameter("w");
		var givenY = findGetParameter("h");

		if(givenX!=null && givenX!="" && parseInt(givenX) >=2){
			fieldWidth = parseInt(givenX);
		}

		if(givenY!=null && givenY!="" && parseInt(givenY) >=2){
			fieldHeight = parseInt(givenY);
		}

		if(givenPlay!=null && givenPlay!="" && parseInt(givenPlay) <=6 && parseInt(givenPlay) >=2){
			players = parseInt(givenPlay);
		}

		//Set Scorepanels of unused players invisible
		for(var i=players+1; i<7;i++){
			document.getElementById("scoreP" + i).classList.add('invisible');
		}

		//Recalc the new width of scorepanels
		var widthCalc = (100/players) - 2;
		document.styleSheets[0].cssRules[3].style.width = widthCalc + "%";

		//Change Width to the count of elements
		fieldWidth = (fieldWidth * 2) + 1;
		fieldHeight = (fieldHeight * 2) + 1;

		var current = 1,
		field = document.createElement("table"),
		finished, games, b, c, i, r, tr;

		//Display current player
		document.getElementById("scoreP" + current).classList.add('active');

		//Insert new KK-Table
		element.appendChild(field);
		field.appendChild(document.createElement("tbody"));

		for (r = 0; r < fieldHeight; r++) {
			// neue Tabellenzeile
			tr = document.createElement("tr");
			field.lastChild.appendChild(tr);

			for (c = 0; c < fieldWidth; c++) {
				// neue Tabellenzelle
				b = document.createElement("td");
				b.id = c + ";" + r;
				if(c%2==0 && r%2==0){
					b.className ="squareSmall";
				}
				if(c%2!=0 && r%2!=0){
					b.className ="squareBig";
				}
				if(c%2==0 && r%2!=0){
					b.className ="quaderVertical";
				}
				if(c%2!=0 && r%2==0){
					b.className ="quaderHorizontal";
				}

				tr.appendChild(b);

				b = document.createElement("button");
				b.className = "empty";
				b.innerHTML = "empty";

				tr.lastChild.appendChild(b);
			}
		}

		function mark (event) {
			// Tabellenzelle bestimmen
			var td = event.target;

			// Button oder Zelle?
			while (td.tagName.toLowerCase() != "td" && td != field) {
				td = td.parentNode;
			}

			// Zelle bei Bedarf markieren
			if (td.tagName.toLowerCase() == "td") {
				// angeklickte Zelle in td
				if(td.className == "quaderHorizontal" || td.className == "quaderVertical"){
					var wasBlock = checkNewOwner(td);

					td.className = td.className + " p" + current; // Klassennamen vergeben
					//td.innerHTML = "p" + current; // Spielersymbol eintragen
					td.innerHTML = "";

					//Select current and mark/unmark the scorepanel as 'active'
					if(wasBlock == "0"){
						document.getElementById("scoreP" + current).classList.remove('active');
						current++;
						document.getElementById("scoreP" + current).classList.add('active');
					}
					if(current > players){
						document.getElementById("scoreP" + current).classList.remove('active');
						current = 1;
						document.getElementById("scoreP" + current).classList.add('active');
					}
				}
			}

			checkBoxes();
		}

		function checkNewOwner(obj){

			var pos =  obj.id.split(";");
			var x = pos[0];
			var y = pos[1];
			//x = 0, y = 1
			if(obj.className == "quaderHorizontal") {
				var ret = "0";

				var t1x = x-1;
				var t1y = y-1;
				var t2x = x;
				var t2y = y-2;
				var t3x = x-(-1);
				var t3y = y-1;

				var	t1 = document.getElementById("" + t1x + ";" + t1y + "");
				var	t2 = document.getElementById("" + t2x + ";" + t2y + "");
				var t3 = document.getElementById("" + t3x + ";" + t3y + "");

				var b1x = x-1;
				var b1y = y- (-1);
				var b2x = x;
				var b2y = y-(-2);
				var b3x = x-(-1);
				var b3y = y-(-1);

				var	b1 = document.getElementById("" + b1x + ";" + b1y + "");
				var	b2 = document.getElementById("" + b2x + ";" + b2y + "");
				var	b3 = document.getElementById("" + b3x + ";" + b3y + "");

				//TOP
				//Nur wenn x>0 && x<fieldWidth && y > 1 && y <= fieldHeight
				if(x>0 && x<fieldWidth && y > 1 && y <= fieldHeight ){
					if( t1.className != "quaderVertical" && t2.className != "quaderHorizontal" && t3.className != "quaderVertical"){
						var sy = y-1;
						var block = document.getElementById("" + x + ";" + sy + "");
						block.className = block.className + " p" +current;
						ret = 1;

						var score = document.getElementById("scoreP" + current);
						score.innerHTML = parseInt(score.innerHTML)+1;
					}
				}
				//Bottom
				//Nur wenn x >0 && x<fieldWidth && y >= 0 && y < fieldHeight
				if(x>0 && x<fieldWidth && y >= 0 && y < fieldHeight -1){
					if(b1.className != "quaderVertical" && b2.className != "quaderHorizontal" && b3.className != "quaderVertical"){
						var sy = parseInt(y)+1;
						var block = document.getElementById("" + x + ";" + sy + "");
						block.className = block.className + " p" +current;
						ret = "1";

						var score = document.getElementById("scoreP" + current);
						score.innerHTML = parseInt(score.innerHTML)+1;
					}
				}
				return ret;

			}else if(obj.className == "quaderVertical"){
				var ret = "0";

				var l1x = x-1;
				var l1y = y-1;

				var l2x = x-2;
				var l2y = y;

				var l3x = x-1;
				var l3y = y-(-1);


				var r1x = x-(-1);
				var r1y = y-1;

				var r2x = x-(-2);
				var r2y = y;

				var r3x = x-(-1);
				var r3y = y-(-1);


				var l1 = document.getElementById("" + l1x + ";" + l1y + "");
				var l2 = document.getElementById("" + l2x + ";" + l2y + "");
				var l3 = document.getElementById("" + l3x + ";" + l3y + "");

				var r1 = document.getElementById("" + r1x + ";" + r1y + "");
				var r2 = document.getElementById("" + r2x + ";" + r2y + "");
				var r3 = document.getElementById("" + r3x + ";" + r3y + "");

				//LEFT
				//Nur wenn x > 1 && x <= fieldWidth && y > 0 && y < fieldHeight
				if(x > 1 && x <= fieldWidth && y > 0 && y < fieldHeight ){
					if(l1.className != "quaderHorizontal" && l2.className != "quaderVertical" && l3.className != "quaderHorizontal"){
						var sx = x-1;
						var block = document.getElementById("" + sx + ";" + y + "");
						block.className = block.className + " p" +current;
						ret = "1";

						var score = document.getElementById("scoreP" + current);
						score.innerHTML = parseInt(score.innerHTML)+1;
					}
				}
				//RIGHT
				//Nur wenn x >= 0 && x < fieldWidth && y > o && y < fieldHeight
				if(x >= 0 && x < fieldWidth-1 && y > 0 && y < fieldHeight ){
					if(r1.className != "quaderHorizontal" && r2.className != "quaderVertical" && r3.className != "quaderHorizontal"){
						var sx = parseInt(x)+1;
						var block = document.getElementById("" + sx + ";" + y + "");
						block.className = block.className + " p" +current;

						ret = "1";

						var score = document.getElementById("scoreP" + current);
						score.innerHTML = parseInt(score.innerHTML)+1;
					}
				}

				return ret;

			}
		}

		function reset(){

		}

		function checkBoxes(){
			var tds = field.getElementsByTagName("td"), // field ist unser <table>
			full = true; // wir gehen davon aus, dass alle Zellen benutzt wurden

			// alle Felder markiert?
			for (i = 0; i < tds.length; i++) {
				if (tds[i].className == "quaderHorizontal" || tds[i].className == "quaderVertical" ) {
					full = false;
				}
			}

			if (full) {

				var scoreP1 = document.getElementById("scoreP1");
				var scoreP2 = document.getElementById("scoreP2");
				var scoreP3 = document.getElementById("scoreP3");
				var scoreP4 = document.getElementById("scoreP4");
				var scoreP5 = document.getElementById("scoreP5");
				var scoreP6 = document.getElementById("scoreP6");


				scoreP1 = parseInt(scoreP1.innerHTML);
				scoreP2 = parseInt(scoreP2.innerHTML);
				scoreP3 = parseInt(scoreP3.innerHTML);
				scoreP4 = parseInt(scoreP4.innerHTML);
				scoreP5 = parseInt(scoreP5.innerHTML);
				scoreP6 = parseInt(scoreP6.innerHTML);

				//				alert(scoreP1 + " " + scoreP2 + " " + scoreP3 + " " + scoreP4 + " " + scoreP5 + " " + scoreP6)

				var endstring = "";

				if(scoreP1 > scoreP2 && scoreP1 > scoreP3 && scoreP1 > scoreP4 && scoreP1 > scoreP5 && scoreP1 > scoreP6)endstring = "Spieler 1 gewinnt mit " +scoreP1 + " Punkten";
				else if(scoreP2 > scoreP1 && scoreP2 > scoreP3 && scoreP2 > scoreP4 && scoreP2 > scoreP5 && scoreP2 > scoreP6)endstring = "Spieler 2 gewinnt mit " +scoreP2 + " Punkten";
				else if(scoreP3 > scoreP2 && scoreP3 > scoreP1 && scoreP3 > scoreP4 && scoreP3 > scoreP5 && scoreP3 > scoreP6)endstring = "Spieler 3 gewinnt mit " +scoreP3 + " Punkten";
				else if(scoreP4 > scoreP2 && scoreP4 > scoreP3 && scoreP4 > scoreP1 && scoreP4 > scoreP5 && scoreP4 > scoreP6)endstring = "Spieler 4 gewinnt mit " +scoreP4 + " Punkten";
				else if(scoreP5 > scoreP2 && scoreP5 > scoreP3 && scoreP5 > scoreP4 && scoreP5 > scoreP1 && scoreP5 > scoreP6)endstring = "Spieler 5 gewinnt mit " +scoreP5 + " Punkten";
				else if(scoreP6 > scoreP2 && scoreP6 > scoreP3 && scoreP6 > scoreP4 && scoreP6 > scoreP5 && scoreP6 > scoreP1)endstring = "Spieler 6 gewinnt mit " +scoreP6 + " Punkten";
				else endstring = "Unentschieden!";
				
				alert(endstring + "\n\n Drücke Ok für ein weiteres Spiel!");

				window.open ('index.html','_self',false);

			}
		}

		field.addEventListener("click", mark);
	}

	games = document.querySelectorAll(".kk-view");

	for (i = 0; i < games.length; i++) {
		KKGame(games[i]); // aktuelles Fundstück steht in games[i]
	}

	//get Params from url
	function findGetParameter(parameterName) {
		var result = null,
		tmp = [];
		location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
		return result;
	}

});
