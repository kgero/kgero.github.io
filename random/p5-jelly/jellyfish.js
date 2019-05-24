var jelly; // array of text of poem, one line per item
var loc; // array of y axis location of each line
var shown; // array of if the text is shown or not

function mouseInBand(yval) {
  return yval > mouseY && mouseY > yval-20
}

// normal line of text
function drawLineOfText(line, ypos, color) {
  fill(color);
  var xpos = 50;
  for (var i=0; i<line.length; i++) {
    text(line[i], xpos, ypos);
    xpos += textWidth(line[i]);
  }
}

// text that is pushed away from distortpos (x value)
function drawLineOfTextDistort(line, ypos, color, distortpos) {
  var maxmove=20;
  fill(color);
  var xpos = 50; // where text should be
  var dist; // distance btwn xpos and distortpos
  var move; // amount to move from xpos (GOING TO PICK A MIN/MAX VAL)
  for (var i=0; i<line.length; i++) {
    dist = xpos - distortpos;
    if (dist > 0) {  // shift left
      move = max(0, 0.1*dist + maxmove);
    } else {  // shift right
      move = min(0, -0.1*dist - maxmove);
    }
    text(line[i], xpos+move, ypos);
    xpos += textWidth(line[i]);
  }
}

function preload() {
  jelly = loadStrings('poem.txt');
  loc = [];
  shown = [];
}

function setup() {
	createCanvas(500, 600);
  var yval;
  background(50);
  textSize(16);
  for (var i = 0; i < jelly.length; i++) {
    fill(128+(i*10));
    yval = 50+i*20
    drawLineOfText(jelly[i], yval, 128+(i*10));
    append(loc, yval);
    append(shown, true);
    circle(50, yval, 5);
  }
}

function draw() {

  for (var i = 0; i < jelly.length; i++) {
    noStroke();
    fill(50, 50);
    yval = 50+i*20;
    rect(0, yval+4, 500, -20);
    if (mouseInBand(loc[i])) {
      drawLineOfTextDistort(jelly[i], yval, 210-(i*3), mouseX);
    } else if (!mouseInBand(loc[i])) {
      drawLineOfText(jelly[i], yval, 210-(i*3));
    }
  }
}