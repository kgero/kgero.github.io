// string is text to write
// curveArray is list of [x,y] pairs
function textOnCurve(string, curveArray) {
  w = curveArray[0][0];
  var txtIdx = 0;

  for (var i = 1; i < curveArray.length; i++) {
    var y = curveArray[i][1];
    var x = curveArray[i][0];
    // circle(curveArray[i][0], curveArray[i][1], 1);
    if (x > w) {
      push();
      translate(x,y);
      rotate(getPerpAngle(x, y, curveArray[i-1][0], curveArray[i-1][1]));
      var char = string.substring(txtIdx, txtIdx+1);
      text(char, 0, 0);
      txtIdx++;
      pop();
      w += textWidth(char) + 1;
    }
  }
}

// write the next char from a string to the curve
// w is the x value after which the char can be drawn (for spacing the letters)
// idx is the index of the curve array
// RETURN the next w
function charOnCurve(curveArray, w, idx, char) {

  for (var i = idx; i < curveArray.length; i++) {
    var y = curveArray[i][1];
    var x = curveArray[i][0];
    // circle(curveArray[i][0], curveArray[i][1], 1);
    if (x > w) {
      push();
      translate(x,y);
      rotate(getPerpAngle(x, y, curveArray[i-1][0], curveArray[i-1][1]));
      text(char, 0, 0);
      pop();
      w += textWidth(char) + 1;
      return [w, i];
    }
  }
  return [w, i];
}

// given two points, return angle perpendicular to the line they create
function getPerpAngle(x1, y1, x2, y2) {
  var ox1 = x2 - x1;
  var oy1 = y2 - y1;
  return atan2(oy1, ox1) + PI;
}


// get array of curve coordinates linear
// start, stop are [x,y] coordinates pairs
// one point per x coordinate
function getStartStopCurve(start, stop) {
  var curve = [];
  var xsteps = abs(start[0] - stop[0]);
  var ystepsize = (stop[1] - start[1])/xsteps;
  var ystep = start[1];
  for (var i = 0; i < xsteps; i++) {
    ystep += ystepsize;
    var y = ystep; 
    var x = start[0] + i;
    append(curve, [x, y]);
  }
  return curve;
}

function addPerlinNoise(curve) {
  noiseSeed(random()*100);
  var newCurve = [];
  for (var i = 0; i < curve.length-1; i++) {
    var y = curve[i][1] + ( 100 * noise(i * 0.002) );
    var x = curve[i][0];
    append(newCurve, [x,y]);
  }
  return newCurve;
}

// return control point from end of curve
function getControlPointEnd(curve, controlLen) {
  if (controlLen > curve.length) {
    throw "controlLen (" + controlLen + ") greater than length of curve (" + curve.length + ")"
  }
  var end = curve[curve.length-1];
  var preend = curve[curve.length-controlLen];
  var x1 = preend[0]; var y1 = preend[1];
  var x2 = end[0]; var y2 = end[1];
  var xc = x2 + 2*(x2-x1);
  var yc = y2 + 2*(y2-y1);
  return [xc, yc];
}

function getControlPointStart(curve, controlLen) {
  if (controlLen > curve.length) {
    throw "controlLen (" + controlLen + ") greater than length of curve (" + curve.length + ")"
  }
  var start = curve[0];
  var poststart = curve[controlLen];
  var x1 = poststart[0]; var y1 = poststart[1];
  var x2 = start[0]; var y2 = start[1];
  var xc = x2 + 2*(x2-x1);
  var yc = y2 + 2*(y2-y1);
  return [xc, yc];
}

// return an array of [x,y] points that smoothly connects curve1 to curve2
function getGapCurve(curve1, curve2) {
  var start = curve1[curve1.length-1];
  var stop = curve2[0];

  var control1 =  getControlPointEnd(curve1, 15);
  var control2 = getControlPointStart(curve2, 15);
  // line(start[0], start[1], control1[0], control1[1]);
  // line(stop[0], stop[1], control2[0], control2[1]);

  var x1 = start[0];
  var y1 = start[1];
  var x2 = control1[0]; 
  var y2 = control1[1];
  var x3 = control2[0];
  var y3 = control2[1];
  var x4 = stop[0];
  var y4 = stop[1];
  // bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  var curve = [];
  let steps = 100;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = bezierPoint(x1, x2, x3, x4, t);
    let y = bezierPoint(y1, y2, y3, y4, t);
    append(curve, [x,y]);
  }
  return curve;
}

// return curve of curve1 and curve2 connect smoothly
// assumes end of curve1 is start of curve2
// dist is the amount to cut out for the connection
function connectTwoCurves(curve1, curve2, dist) {
  // cut of end of curve1, then use a gap curve to connect the two
  curve1 = subset(curve1, 0, curve1.length-dist);
  var gapCurve = getGapCurve(curve1, curve2, dist);
  return concat(concat(curve1, gapCurve), curve2);
}

function shiftCurve(curve, shift) {
  var newcurve = [];
  for (var i = 0; i < curve.length-1; i++) {
    append(newcurve, [curve[i][0], curve[i][1]+shift]);
  }
  return newcurve;
}

// return true if the two curves overlap, else return false
// curve1 is 'above' curve2, so overlap is when this isn't the case
function theseCurvesOverlap(curve1, curve2) {
  var max = min(curve1.length, curve2.length);
  for (var i = 0; i < max; i++) {
    if (curve1[i][1] > curve2[i][1] - 10) {
      return true;
    }
  }
  return false;
}

// given the last curve, and the overlap between new curve and last, and the y start
// return the curve
function getNextCurve(last_curve, last_text, lap, y, y_dist) {
  // calc start and end x value of the overlap with the last curve
  // assumes textWidth of the string maps to the distance in the curve (approx.)
  var startx = textWidth(last_text.substring(0, lap.start));
  var endx = textWidth(last_text.substring(lap.start, lap.start+lap.len));

  
  var curve2 = shiftCurve(subset(last_curve, startx, endx), 15);
  var curve1 = addPerlinNoise(getStartStopCurve([0, y], curve2[0]));
  var curve3 = addPerlinNoise(getStartStopCurve(curve2[curve2.length-1], [3000, y]));
  // console.log('curve1.length', curve1.length, 'curve2.length',curve2.length, 'curve3.length',curve3.length);
  curve = connectTwoCurves(curve1, curve2, 140);
  curve = connectTwoCurves(curve, curve3, 140);
  return curve;
}

var currMillis;
var list_o_words;
var state = []; // one per text

let song;
let go; 
let vol;
var amplitude;

function mousePressed() {
  console.log('mousePressed');
  background(51);
  go = true;
  song.setVolume(0);
  song.play()
}



function setup() {

  song = loadSound('Calming-river.mp3');
  amplitude = new p5.Amplitude();

  vol = 0.01;
 

  createCanvas(3000, 700);
  background(51);
  fill('white');

  text('click to start', 100, 100);

  list_o_words = [
    "Long before the economic crisis of 2007-2008, this far-reaching multi-disciplinary effort integrated history, sociology, management, and economics to explain why today's business models have reached the limits of their adaptive range",
    "Decades of early research on the genetics of depression were built on nonexistent foundations. How did that happen? See how changing it's value causes more or less letters to appear, as it is the value used as the limit when looping over letters",
    "In theory, anyone who had this particular gene variant could be at higher risk for depression, and that finding, they said, might help in diagnosing such disorders, assessing suicidal behavior, or even predicting a person's response to antidepressants.",
    "I have 3 young adult boys 26 ,23,21 they all have paranoid schizophrenia . 2 comply and the oldest refuses meds. Its hard to live on ihss pay. I get atotal of 20 hpurs approved for 2 kids and since thw oldeat has it worst he dpesnt want help from anyone so i dont get any money for him. He wakes up screaming arguing with these voixes as if theyre hurting him. I have to stay home and watch them so i cant work no where else. I need help to get my oldest helps.",
    "Back then, tools for sequencing DNA weren't as cheap or powerful as they are today. When researchers wanted to work out which genes might affect a disease or trait, they made educated guesses, and picked likely 'candidate genes'.",
    "I was diagnosed with bi-polar when I was 14. Back when they didn't know as much as they do now. I had been over medicated for years. It always seemed that the solution for a person with mental illness was give them a pill for everything. You can't sleep here's a pill. You are manic here's a pill. Time after time.",
    "I have been dealing with mental illness for only a year however its only cuz i wasnt aware had mental health issues when i was younger.  I now know that always had issues and i am slowly getting used to it as part of my life. I was abused as a kid both physically and emotionally and it made my life a living hell.",
    "I want to start off by saying.. If i cry, don't feel sad. I don't want any sympathy. No one owes me any compassion. I'm good now.  My hope is to inspire others to come out and share their stories without fear and to inspire others to educate themselves and try to understand mental illness. This is NOT my way of playing victim, this is the most realist explanation of my story about suffering from mental illness and all its ugly, painful effects.",
    "Idk what is going on. Fir the last two years I have been experience outbid this world experiences. Seeing flashing lights pointed at my car at night, hearing things like rooster crow at 2 am, frogs that sound like they are from the Amazon, constantly bring followed by black tinted out SUVs... getting emails saying that my life is in danger on certain dates, a couple of their predictions were true."
    ];

  var list_o_curves = [];

  var overlap = [
    {"start": 70, "startOther": 50, "len": 50},
    {"start": 200, "len": 75},
    {"start": 100, "len": 75},
    {"start": 130, "len": 50},
    {"start": 150, "len": 20},
    {"start": 40, "len": 100},
    {"start": 190, "len": 80},
    {"start": 220, "len": 50}
    ];

  var y_dist = 70;
  var y = y_dist;
  curve = getStartStopCurve([0,y], [1500, y]);
  curve = addPerlinNoise(curve);

  append(list_o_curves, curve);
  // textOnCurve(list_o_words[0], curve);

  for (var i=0; i<overlap.length; i++) {
    console.log('looking at overlap', i);
    y += y_dist;
    lap = overlap[i];

    last_curve = list_o_curves[list_o_curves.length-1];
    last_text = list_o_words[i];

    curve = getNextCurve(last_curve, last_text, lap, y, y_dist);

    var curves_overlap = theseCurvesOverlap(list_o_curves[list_o_curves.length-1], curve);

    var maxTries = 10;
    var tries = 0;
    while (curves_overlap && tries < maxTries) {
      tries++;
      console.log('overlap found!', i);
      curve = getNextCurve(last_curve, last_text, lap, y, y_dist);
      curves_overlap = theseCurvesOverlap(list_o_curves[list_o_curves.length-1], curve);
    }

    append(list_o_curves, curve);
    // textOnCurve(list_o_words[i+1], curve);
  }

  for (var i=0; i<list_o_words.length; i++) {
    append(state, {
      curve: list_o_curves[i],
      words: list_o_words[i],
      index: 0,  // index of 'words' string
      w: 10,
      idx: 0, // idx of curve array
      start: false,
      intersec: false
    });
  }

  currMillis = millis();
}

function draw() {

  if (millis() - currMillis > 50 && go) {
    for (var i=0; i<list_o_words.length; i++) {
      if (!state[i].start && Math.random() < .05) { state[i].start = true; }
      if (state[i].start && state[i].index < state[i].words.length) {
        res = charOnCurve(state[i].curve, state[i].w, state[i].idx, state[i].words[state[i].index]);
        state[i].w = res[0];
        state[i].idx = res[1];
        state[i].index++;
        // check if close to other curve
        if (!state[i].intersec) {
          for (var j=0; j<list_o_words.length; j++) {
            // if diff curve, and other curve has more words printed
            if (i != j && state[i].index < state[j].index) {
              var curridx = state[i].idx;
              var yval_diff = abs(state[i].curve[curridx][1] - state[j].curve[curridx][1]);
              if (yval_diff < 20) {
                console.log(i, 'meeting', j);
                state[i].intersec = true;
                console.log(amplitude.getLevel());
                song.play();
                song.setVolume(vol, 1);
                
                vol += 0.02;
              }
            }
          }
        }
      } 
    }
    currMillis = millis();
  }
  
  
}
