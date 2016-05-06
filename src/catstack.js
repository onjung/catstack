// Created by On Jung.

// Game variables.
var mov = false;
var id = "";
var firstClick = false;
var secondClick = false;
var recPrevCoor = false;
var clickCount = 0;
var maxCats = 0;

// Record previous image location.
var prevX = 0;
var prevY = 0;

// Timer variables.
var timeSec = 0;
var timeMin = 0;
var counter = 0;
var timerId = -1;

// Constants used for setting up the game and location
// of the disks.
var MAX_CATS = 8;
var CAT_HEIGHT = 20;
var BASE_HEIGHT = 25;
var OFFSET_LEFT = 0;
var OFFSET_RIGHT = 30;
var EMPTY = "";

// Links to the ads.
var ad1 = "ads/ad1.png";
var ad2 = "ads/ad2.png";
var ad3 = "ads/ad3.png";
var ad4 = "ads/ad4.png";
var ad5 = "ads/ad5.png";
var adNum = 0;

// Contains which disks are in the towers.
var tower1 = new Array(3);
var tower2 = new Array(3);
var tower3 = new Array(3);

window.onload=function(){
	initialize();
}

// This method sets the game up and loads all the variables with the correct
// values and draws the picture in the game screen.
function initialize() {
	var index = 0;
	maxCats = parseInt(document.getElementById("numcat").value);
	
	setImgLocation();
	
	for (index = 0; index < maxCats; index++) {
		tower1[index] = "cat" + (index + 1);
		tower2[index] = EMPTY;
		tower3[index] = EMPTY;
	}
	
	var height = numCats(tower1);
	var ind = 0;

	for (ind = 0; ind < maxCats; ind++) {
		var cat = document.getElementById(tower1[ind]);
		cat.style.left = 100 - cat.offsetWidth/2;
		cat.style.top = 275 - height*CAT_HEIGHT;
		height -= 1;
	}
	timer();
	Ad();
}

// Images that are the not being used will be set offscreen.
function setImgLocation() {
	var index = 0;
	for (index = 0; index < MAX_CATS; index++) {
		document.getElementById("cat" + (index + 1)).style.left = -100;
		document.getElementById("cat" + (index + 1)).style.top = -100;
	}
}

// When the user clicks the restart button, it will reset the game.
function restart() {
	timeSec = 0;
	timeMin = 0;
	counter = 0;
	var index = 0;
	for (index = 0; index < MAX_CATS; index++) {
		tower1[index] = EMPTY;
		tower2[index] = EMPTY;
		tower3[index] = EMPTY;
	}
	window.clearInterval(timerId);
	document.getElementById("msg").innerHTML = "";
	document.getElementById("counter").innerHTML = "Steps " + counter;
	initialize();
}

// Updates the ad at every 60 second interval.
function Ad() {
	window.setInterval("updateAd()", 60000);
}

// Rotates through a set of ads and changes them every 60 seconds.
function updateAd() {
	adNum += 1;
	
	if (adNum % 5 == 0) {
		document.getElementById("ad").src = ad1;
	} else if (adNum % 5 == 1) {
		document.getElementById("ad").src = ad2;
	} else if (adNum % 5 == 2) {
		document.getElementById("ad").src = ad3;
	} else if (adNum % 5 == 3) {
		document.getElementById("ad").src = ad4;
	} else {
		document.getElementById("ad").src = ad5;
	}
}

// Updates the game timer.
function timer() {
	timerId = window.setInterval("updateTime()", 1000);
}

// Updates the game timer text.
function updateTime() {
	timeSec += 1;
	
	if (timeSec > 60) {
		timeSec = 0;
		timeMin += 1;
	}
	
	var t = document.getElementById("time");
	
	if (timeSec < 10) {
		t.innerHTML = "Time " + timeMin + ":0" + timeSec;
	} else {
		t.innerHTML = "Time " + timeMin + ":" + timeSec;
	}
}	

// On the first click event, it will make the disk follow the movement of 
// the mouse cursor. And on the second mouse click it set the image on the
// stop depending the on the location of where the second click occurred.
function updateMouseCoordinates(event) {
	if (firstClick) {
		if (getFirstCat(catLocator(id), id)) {
			if (!recPrevCoor) {
				prevLocation(id);
				recPrevCoor = true;
			}
			clickCount += 1;
			if (clickCount == 2) {
				secondClick = true;
				recPrevCoor = false;
				clickCount = 0;
			}
			firstClick = false;
			move(event);
		} else {
			firstClick = false;
		}
	} else if (clickCount == 1) {
		move(event);
	}
	
	if (secondClick) {
		lockPosition();
	}
}

// Records the location of where image was on the first mouse click.
function prevLocation(idNmae) {
	prevX = document.getElementById(id).offsetLeft;
	prevY = document.getElementById(id).offsetTop;
}

// Updates the disk location upon the movement of the mouse.
function move(event) {
	var pic = document.getElementById(id);
	
	pic.style.left = event.clientX;
	pic.style.top = event.clientY;
}

// Sets the global variable id to indicate the image that the
// mouse has selected.
function setIdPic(idName) {
	id = idName;
}

// Locates and return the tower that the disk was in.
function catLocator(catId) {
	var index = getIndex(catId);
	if (tower1[index] != EMPTY) {
		return tower1;
	} else if (tower2[index] != EMPTY) {
		return tower2;
	} else if (tower3[index] != EMPTY) {
		return tower3;
	}
}

// Get the index value of the disk.
function getIndex(catId) {
	if (catId == "cat1") {
		return 0;
	} else if (catId == "cat2") {
		return 1;
	} else if (catId == "cat3") {
		return 2;
	} else if (catId == "cat4") {
		return 3;
	} else if (catId == "cat5") {
		return 4;
	} else if (catId == "cat6") {
		return 5;
	} else if (catId == "cat7") {
		return 6;
	} else if (catId == "cat8") {
		return 7;
	}
}

// Returns the number of disks in the tower.
function numCats(tower) {
	var index = 0;
	var num = 0;
	for (index = 0; index < maxCats; index++) {
		if (tower[index] != EMPTY) {
			num += 1;
		}
	}
	return num;
}

// Return true or false if the selected cat is the first cat
// stack/tower.
function getFirstCat(tower, catId) {
	var ind = 0;
	var upTo = getIndex(catId);
	
	for (ind = 0; ind < upTo; ind++) {
		if (tower[ind] != EMPTY) {
			return false;
		}
	}
	return true;
}

// Checks whether or not if the disks is smaller than the disk
// that is already in the stack.
function checkValidMove(tower, catId) {
	return getFirstCat(tower, catId);
}

// Check whether if the middle tower or the rightmost tower has
// all the disks in the correct order.
function checkGameDone(tower) {
	var index = 0;
	if (tower == 2) {
		for (index = 0; index < maxCats; index++) {
			if (tower2[index] != "cat" + (index + 1)) {
				return false;
			}
		}
		return true;
	} else if (tower == 3) {
		for (index = 0; index < maxCats; index++) {
			if (tower3[index] != "cat" + (index + 1)) {
				return false;
			}
		}
		return true;
	}
}

// Updates the tower information once the user made
// correct move.
function updateTower(tower, catId) {
	var first = 32;
	var second = 172;
	var third = 312;
	var fourth = 500;

	var index = getIndex(catId);
	
	if (prevX >= first && prevX <= second) {
		tower1[index] = EMPTY;
	} else if (prevX > second && prevX <= third) {
		tower2[index] = EMPTY;
	} else if (prevX > third && prevX <= fourth) {
		tower3[index] = EMPTY;
	}
	
	if (tower == "tower1") {
		tower1[index] = catId;
	} else if (tower == "tower2") {
		tower2[index] = catId;
	} else if (tower == "tower3") {
		tower3[index] = catId;
	}
}

// Update the location of the disk upon the second mouse click, update
// the tower list if the move was valid and check whether if the user 
// has completed the game.
function lockPosition() {
	//var bg = document.getElementById("bg");
	var bgTop = 0;
	var bgBottom = 300;
	
	var first = 32;
	var second = 172;
	var third = 312;
	var fourth = 500;
	
	var cat = document.getElementById(id);
	var catX = cat.offsetLeft;
	var catY = cat.offsetTop;
	
	if (catY >= bgTop && catY <= bgBottom) {
		if (catX >= first && catX <= second && checkValidMove(tower1, id) && !(prevX >= first && prevX <= second)) {
			cat.style.left = 100 - cat.offsetWidth/2;
			cat.style.top = 255 - numCats(tower1)*CAT_HEIGHT;
			
			updateTower("tower1", id);
		
			counter += 1;
			document.getElementById("counter").innerHTML = "Step Counter: " + counter;
		} else if (catX > second && catX <= third && checkValidMove(tower2, id) && !(prevX > second && prevX <= third)) {
			cat.style.left = 100 + 140 - cat.offsetWidth/2;
			cat.style.top = 255 - numCats(tower2)*CAT_HEIGHT;
			
			updateTower("tower2", id);
			
			counter += 1;
			document.getElementById("counter").innerHTML = "Step Counter: " + counter;
		} else if (catX > third && catX <= fourth && checkValidMove(tower3, id) && !(prevX > third && prevX <= fourth)) {
			cat.style.left = 100 + 140 + 140 - cat.offsetWidth/2;
			cat.style.top = 255 - numCats(tower3)*CAT_HEIGHT;
			
			updateTower("tower3", id);
			
			counter += 1;
			document.getElementById("counter").innerHTML = "Step Counter: " + counter;
		} else {
			cat.style.left = prevX;
			cat.style.top = prevY;
		}
	} else {
		cat.style.left = prevX;
		cat.style.top = prevY;
	}
	secondClick = false;
	prevX = 0;
	prevY = 0;
	id = "";
	
	if (checkGameDone(2) || checkGameDone(3)) {
		document.getElementById("msg").innerHTML = "YOU'VE WON!!";
		window.clearInterval(timerId);
	}
}
