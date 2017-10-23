var keys = {
  17: 0, // G    - control
  Q: 1, // Ab
  A: 2, // A
  W: 3, // Bb
  S: 4, // B
  D: 5, // C
  R: 6, // Db
  F: 7, // D
  T: 8, // Eb
  G: 9, // E
  H: 10, // F
  U: 11, // Gb
  J: 12, // G
  I: 13, // Ab
  K: 14, // A
  O: 15, // Bb
  L: 16, // B
  186: 17, // C  - ;
  219: 18, // Db - [
  222: 19, // D  - '
  221: 20, // Eb - ]
  13: 21 // E    - return
};

var frequencies = [196, 207.7, 220, 233.1, 246.9, 261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370, 392, 415.3, 440, 466.2, 493.9, 523.3, 554.4, 587.3, 622.3, 659.3];
var oscillators = [];
var playing = [];
var drops = [];
var radius = 0;

function setup() {
  createCanvas(400, 400);
  backgroundColor = color(255, 0, 255);
  textAlign(CENTER);
  
  for (var i = 0; i < frequencies.length; i++) {
    var osc = new p5.Oscillator();
    osc.setType('triangle');
    osc.freq(frequencies[i]);
    osc.amp(0);
    osc.start();
    oscillators[i] = osc;
    playing[i] = false;
  }
}

function draw() {
  background(255);
  noStroke();
  for (var i = 0; i < playing.length; i++) {
    if (playing[i]) {
      fill(frequencies[i]/3);
    } else {
      fill(255);
    }
    ellipse((i+0.3) * width/playing.length, height/4, width/playing.length*0.9);
  }
  drops.forEach(processDrop);
  drops = drops.filter(isVisible);
}

function processDrop(drop) {
  drop.y += 5;
  drop.opacity -= 6;
	radius += 0.2;
  
	stroke(drop.shade, drop.opacity);
  ellipse(drop.x, drop.y, width/playing.length*0.9 - radius);
}

function isVisible(drop) {
  return drop.opacity > 0;
}

function currentIndex() {
  return key in keys ? keys[key] : keys[keyCode];
}

function keyPressed() {
  print("got key press for ", key, keyCode);
  var index = currentIndex();
  var osc = oscillators[index];
  if (osc) {
    osc.amp(0.5, 0.1);
    playing[index] = true;
  }
	radius = 0;
}

function keyReleased() {
  print("got key release for ", key, keyCode);
  var index = currentIndex();
  var osc = oscillators[index];
  if (osc) {
    osc.amp(0, 0.5);
    playing[index] = false;
    
    drops.push({
      shade: frequencies[index]/3,
      x: (index+0.3) * width/playing.length,
      y: height/4,
      opacity: 255
    });
  }
}
