let direction='forget';
let playorpause='pause';
let fader, speed, totaltime, wordinterval, wordfade;
let text, wordcount, newtext, wordspan, wordid;
let wordweights = [];
const remainingwords = [];
let doc, terms, tags;


/* Function for doing weighted random selection from array
   see https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript
   ^^ also contains nice explanation of how this works
*/
function weighted_random(weights) {
  var i;
  let cumulative_weights = weights.slice();

  for (i = 1; i < cumulative_weights.length; i++)
      cumulative_weights[i] += cumulative_weights[i - 1];

  var random = Math.random() * cumulative_weights[cumulative_weights.length - 1];

  for (i = 0; i < cumulative_weights.length; i++)
      if (cumulative_weights[i] > random)
          break;

  return i;
}

/* Function for inverting weights of the words.
   max value of wordweights will become 1
*/
function invert_weights() {
  let m = Math.max(...wordweights) + 1;
  let newweights = [];
  for (var i=0; i<wordweights.length; i++) {
    newweights.push(m - wordweights[i]);
  }
  wordweights = newweights.slice();
}

/* Function for calculating weights of words in the poem.
   Words that are __more "important"__ have __larger__ weight
   i.e. default weights are for __emerging__
   See list of tags here: https://observablehq.com/@spencermountain/compromise-tags
*/
function calculate_weights() {
  let w, weight, tag;
  
  for (var i=0; i<remainingwords.length; i++) {
    weight = 1;
    tag = terms[i].terms[0].tags[0]
    if (tag === 'Noun') { weight += 10; }
    else if (tag === 'Verb') { weight += 10; }
    else if (tag === 'Adjective') { weight += 5; }
    else if (tag === 'Adverb') { weight += 3; }
    else if (tag === 'Pronoun') { weight += 10; }
    else if (tag === 'Date') { weight += 100; }
    wordweights.push(weight);
  }
}

// when called, will pick a (weighted) random word and fade it
// pops selected word from remainingwords array
function fadeWords(){
  
  if (remainingwords.length === 0) {return;}
  
  const elementIndx = weighted_random(wordweights);
  wordid = remainingwords[elementIndx];
  remainingwords.splice(elementIndx, 1);
  wordweights.splice(elementIndx, 1);

  wordspan = document.getElementById(wordid);
  if (direction == 'forget') {
    wordspan.style.animation = "fadeAway "+(wordfade).toString()+"s linear 0s 1 normal forwards";
  } else {
    wordspan.style.animation = "fadeIn "+(wordfade).toString()+"s linear 0s 1 normal forwards";
  }
}

/* Main function for animation
   - Puts the input text in the div
   - Calculates speed function based on slider
   - Starts the fadeWord() function on an interval timer
   - Hides in the input div
   
   Animation speed variables
     speed : input from the slider, integer from 1 to 100
     wordinterval : milliseconds between picking a new word to fade
     fade : time it takes a word to fade
*/ 
function change(dir) {
  direction = dir;
  
  // reset text variables
  text = document.getElementById('raw').value;
  wordcount = 0;
  newtext = '';
  remainingwords.splice(0, remainingwords.length); // empty array
  wordweights.splice(0, wordweights.length); // empty array

  // parse with compromise  
  // terms object is list of {'terms': [array], 'text': string}
  doc = nlp(text);
  terms = doc.terms().json();
  tags = terms.map(d => {
    return d.terms[0].tags[0]; // get high level tag
  });
  
  // add text to div
  for (var i=0; i < terms.length; i++) {
    wordcount++;
    let w = terms[i].text;
    let n = (terms[i].terms[0].post.match(/\n/g) || []).length;
    w += "<br>".repeat(n); 
    if (direction == 'forget') {
      newtext += ' <span id="' + wordcount + '">' + w + '</span>';
    } else {
      newtext += ' <span id="' + wordcount + '" class="gone">' + w + '</span>';
    }
    remainingwords.push(wordcount);
  }
  // for(let i = 0; i < lines.length ; i++){
  //   let words = lines[i].split(' ');
  //   for(let j=0, sizej = words.length; j<sizej; j++){
  //     wordcount++;
  //     if (direction == 'forget') {
  //       newtext += ' <span id="' + wordcount + '">' + words[j] + '</span>';
  //     } else {
  //       newtext += ' <span id="' + wordcount + '" class="gone">' + words[j] + '</span>';
  //     }
  //     remainingwords.push(wordcount);
  //   }
  //   newtext += '<br>';
  // } 
  document.getElementById("output").innerHTML = newtext;
  
  // set up weights
  calculate_weights();
  if (direction == 'forget') { invert_weights(); }
  if (wordweights.length !== remainingwords.length) {
    console.log("error! length of wordweights doesn't match length of remaining words.")
  }

  // calculate speed variables
  speed = document.getElementById('speed').value;
  totaltime = (speed**4) / 200000; // in seconds
  wordinterval = totaltime*1000/wordcount; //  in milliseconds
  wordfade = wordinterval/1000; // in seconds
  console.log('wordcount', wordcount, '\nspeed', speed, '\ntotaltime (s)', totaltime, '\ninterval (ms)', wordinterval, '\nfade (s)', wordfade);

  // set up the fadeWords interval
  clearInterval(fader);
  fader = null;
  fader = setInterval(fadeWords, wordinterval);

  // hide the text entry div
  document.getElementById('textentry').style.display = "none";
}

// functionality for play / pause button
function playpause() {
  console.log(playorpause);
  if (playorpause == 'play') {
    fader = setInterval(fadeWords, wordinterval);
    playorpause = 'pause';
  } else {
    clearInterval(fader);
    playorpause = 'play';
  }
  document.getElementById('playorpause').innerHTML = playorpause;
}

// functionality for back button
function back() {
  document.getElementById("textentry").style.display = "block";
  playorpause = 'pause';
  document.getElementById('playorpause').innerHTML = playorpause;
}


// modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
