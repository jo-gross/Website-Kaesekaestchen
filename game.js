document.addEventListener("DOMContentLoaded", function () {


	function TicTacToe (element) {
		var spielgroesseX = 4;
		var spielgroesseY = 4;
		var players = 2;

		var uebernahme=new String(document.location.href);
		var uebergabe=uebernahme.indexOf("?");
		var fi1 = uebernahme.indexOf("*");
		var fi2 = uebernahme.indexOf("#");

		var givenPlay=new String(uebernahme.substring(uebergabe+1, fi1));
		var givenX=new String(uebernahme.substring(fi1+1,fi2));
		var givenY=new String(uebernahme.substring(fi2+1,uebernahme.length));

		alert(givenPlay + "#" + givenX + "#" + givenY);

		if(givenX!=null && givenX!="" && parseInt(givenX) >=2){
			spielgroesseX = parseInt(givenX);
		}

		if(givenY!=null && givenY!="" && parseInt(givenY) >=2){
			spielgroesseY = parseInt(givenY);
		}


		if(givenPlay!=null && givenPlay!="" && parseInt(givenPlay) <=6 && parseInt(givenPlay) >=2){
			players = parseInt(givenPlay);
		}

		spielgroesseX = (spielgroesseX * 2) + 1;
		spielgroesseY = (spielgroesseY * 2) + 1;

		var current = 1,
		field = document.createElement("table"),
		finished, games, b, c, i, r, tr;

		element.appendChild(field);
		field.appendChild(document.createElement("tbody"));

		for (r = 0; r < spielgroesseY; r++) {
			// neue Tabellenzeile
			tr = document.createElement("tr");
			field.lastChild.appendChild(tr);

			for (c = 0; c < spielgroesseX; c++) {
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

					if(wasBlock == "0"){
						current++;
					}
					if(current > players){
						current = 1;
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
				//Nur wenn x>0 && x<spielgroesseX && y > 1 && y <= spielgroesseY
				if(x>0 && x<spielgroesseX && y > 1 && y <= spielgroesseY ){
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
				//Nur wenn x >0 && x<spielgroesseX && y >= 0 && y < spielgroesseY
				if(x>0 && x<spielgroesseX && y >= 0 && y < spielgroesseY -1){
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
				//Nur wenn x > 1 && x <= spielgroesseX && y > 0 && y < spielgroesseY
				if(x > 1 && x <= spielgroesseX && y > 0 && y < spielgroesseY ){
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
				//Nur wenn x >= 0 && x < spielgroesseX && y > o && y < spielgroesseY
				if(x >= 0 && x < spielgroesseX-1 && y > 0 && y < spielgroesseY ){
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

				alert(scoreP1 + " " + scoreP2 + " " + scoreP3 + " " + scoreP4 + " " + scoreP5 + " " + scoreP6)

				     if(scoreP1 > scoreP2 && scoreP1 > scoreP3 && scoreP1 > scoreP4 && scoreP1 > scoreP5 && scoreP1 > scoreP6)alert("Spieler 1 gewinnt mit " +scoreP1 + " Punkten");
				else if(scoreP2 > scoreP1 && scoreP2 > scoreP3 && scoreP2 > scoreP4 && scoreP2 > scoreP5 && scoreP2 > scoreP6)alert("Spieler 2 gewinnt mit " +scoreP2 + " Punkten");
				else if(scoreP3 > scoreP2 && scoreP3 > scoreP1 && scoreP3 > scoreP4 && scoreP3 > scoreP5 && scoreP3 > scoreP6)alert("Spieler 3 gewinnt mit " +scoreP3 + " Punkten");
				else if(scoreP4 > scoreP2 && scoreP4 > scoreP3 && scoreP4 > scoreP1 && scoreP4 > scoreP5 && scoreP4 > scoreP6)alert("Spieler 4 gewinnt mit " +scoreP4 + " Punkten");
				else if(scoreP5 > scoreP2 && scoreP5 > scoreP3 && scoreP5 > scoreP4 && scoreP5 > scoreP1 && scoreP5 > scoreP6)alert("Spieler 5 gewinnt mit " +scoreP5 + " Punkten");
				else if(scoreP6 > scoreP2 && scoreP6 > scoreP3 && scoreP6 > scoreP4 && scoreP6 > scoreP5 && scoreP6 > scoreP1)alert("Spieler 6 gewinnt mit " +scoreP6 + " Punkten");
				else alert("Unentschieden!");

			}
		}

		field.addEventListener("click", mark);
	}

	games = document.querySelectorAll(".tic-tac-toe");

	for (i = 0; i < games.length; i++) {
		TicTacToe(games[i]); // aktuelles Fundstück steht in games[i]
	}


});
