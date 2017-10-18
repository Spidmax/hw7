var keys = {
  A: 0,
  S: 1,
  :anguished: 2,
  F: 3,
  G: 4,
  H: 5,
  J: 6,
  K: 7,
  L: 8
};

var frequencies = [174, 196, 220, 246, 261, 294, 330, 349, 392];
var oscillators = [];
var playing = [];

function setup() {
	createCanvas (450, 400);
  backgroundColor = color(255, 0, 255);
  textAlign(CENTER);
  
  for (var i = 0; i < frequencies.length; i++) {
    var osc = new p5.Oscillator();
    osc.setType(‘triangle’);
    osc.freq(frequencies[i]);
    osc.amp(0);
    osc.start();
    oscillators[i] = osc;
  }
}



function draw() {
  background(backgroundColor)
  text(‘click to play’, width / 2, height / 2);
	highlight();
}

function keyPressed() {
  print(“got key press for “, key);
  var index = keys[key];
  var osc = oscillators[index];
  if (osc) {
    osc.amp(0.5, 0.1);
    playing[index] = true;
    backgroundColor = color(0, 255, 255);
  }
}

function keyReleased() {
  print(“got key release for “, key);
  var index = keys[key];
  var osc = oscillators[index];
  if (osc) {
    osc.amp(0, 0.5);
    playing[index] = false;
    backgroundColor = color(255, 0, 255);
  }
}

function highlight() {
	for (i = 0; i < 9; i ++) {
		if (playing[i] == true) {
			fill(255);
			rect(width/9*i, 0, width/9, height);
		}
	}
}
