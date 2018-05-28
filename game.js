document.addEventListener("DOMContentLoaded", function () {


	function TicTacToe (element) {
		var spielgroesseX = 5;
		var spielgroesseY = 5;
		players = 4;


		spielgroesseX = (spielgroesseX * 2) + 1;
		spielgroesseY = (spielgroesseY * 2) + 1;

		var current = 1,
		field = document.createElement("table"),
		caption = document.createElement("caption"),
		finished, games, b, c, i, r, tr;

		// Tabelle ins Dokument einfügen
		element.appendChild(field);

		// Tabelle aufbauen
		field.appendChild(caption); // Beschriftung
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

				/*
				if(r%2==0 && c%2==0){
				b = document.createElement("p");
				b.innerHTML = "§";
			}else if(r%2!=0&&c%2!=0) {
			b = document.createElement("p");
			b.innerHTML = "0";

		}else{
		*/
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
			checkNewOwner(td);
			td.className = "p" + current; // Klassennamen vergeben
			//td.innerHTML = "p" + current; // Spielersymbol eintragen
			td.innerHTML = "";
			checkNewOwner(td);
			current++;

			if(current > players){
				current = 1;
			}
		}
	}

	checkBoxes();
}

function checkNewOwner(obj){
	var pos =  obj.id.split(";");
	// //alert(pos[0] + " " + pos[1]);
	//
	var x = pos[0];
	var y = pos[1];
	// //x = 0, y = 1
	if(obj.className == "quaderHorizontal") {

		var t1x = x-1;
		var t1y = y-1;

		var t2x = x;
		var t2y = y-2;

		var t3x = x+1;
		var t3y = y-1;


		var	t1 = document.getElementById("" + t1x + ";" + t1y + "");
		var	t2 = document.getElementById("" + t2x + ";" + t2y + "");
		var t3 = document.getElementById("" + t3x + ";" + t3y + "");


		// var	t1 = document.getElementById("" + x-1 + ";" + y-1 + "");
		// var	t2 = document.getElementById("" + x + ";" + y-2 + "");
		// var t3 = document.getElementById("" + x+1 + ";" + y-1 + "");
		//
		// var	b1 = document.getElementById("" + x-1 + ";" + y+1 + "");
		// var	b2 = document.getElementById("" + x + ";" + y+2 + "");
		// var	b3 = document.getElementById("" + x+1 + ";" + y+1 + "");
		// }
		if(t1.className != "quaderVertical" && t2.className != "quaderHorizontal" && t3.className != "quaderVertical"){
			// var block = document.getElementById("" + x + ";" + y-1 + "");
			var block = document.getElementById("0,0");
			block.className = "p"+current;
		}

		// if(b1!=null && b2!=null && b3!=null && b1.className != "quaderVertical" && b2.className != "quaderHorizontal" && b3.className != "quaderVertical"){
		// 	//feld Füllen
		// 	// var block = document.getElementById("" + x + ";" + y+1 + "");
		// 	var block = document.getElementById("0;0");
		// 	block.className = "p"+current;
		// }

	}else if(obj.className == "quaderVertical"){
		var l1 = document.getElementById("" + x-1 + ";" + y-1 + "");
		var l2 = document.getElementById("" + x-2 + ";" + y + "");
		var l3 = document.getElementById("" + x-1 + ";" + y+1 + "");

		var r1 = document.getElementById("" + x+1 + ";" + y-1 + "");
		var r2 = document.getElementById("" + x+2 + ";" + y + "");
		var r3 = document.getElementById("" + x+1 + ";" + y+1 + "");

		if(x.className != "quaderHorizontal"){

		}

	}else{
		// alert(pos[0] + " " + pos[1]);
	}
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

	// wenn full, dann Spiel vorbei, wenn nicht full, dann noch nicht
	if (full) {
		alert("Hi");
		// Spiel zu Ende weil alle Felder belegt
	}
}

// Ereignis bei Tabelle überwachen
field.addEventListener("click", mark);
}

// finde alle Spiel-Platzhalter
games = document.querySelectorAll(".tic-tac-toe");

for (i = 0; i < games.length; i++) {
	TicTacToe(games[i]); // aktuelles Fundstück steht in games[i]
}


});
