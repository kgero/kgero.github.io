let direction='forget';
let playorpause='pause';
let fader, speed, totaltime, wordinterval, wordfade;
let text, lines, wordcount, newtext, span, wordid;
const remainingwords = [];

function fadeWords(){
  if (remainingwords.length === 0) {return;}
  const elementIndx = Math.floor(Math.random() * (remainingwords.length-1));
  wordid = remainingwords[elementIndx];
  remainingwords.splice(elementIndx, 1);

  span = document.getElementById(wordid);
  // console.log('remainingwords.length', remainingwords.length, 'elementIndx', elementIndx, 'wordid', wordid);
  if (direction == 'forget') {
    span.style.animation = "fadeAway "+(wordfade).toString()+"s linear 0s 1 normal forwards";
  } else {
    span.style.animation = "fadeIn "+(wordfade).toString()+"s linear 0s 1 normal forwards";
  }
}

function change(dir) {
  direction = dir;
  // text variables
  text = document.getElementById('raw').value;
  lines = text.split('\n');
  wordcount = 0;
  newtext = '';
  remainingwords.splice(0, remainingwords.length);

  for(let i = 0; i < lines.length ; i++){
    let words = lines[i].split(' ');
    for(let j=0, sizej = words.length; j<sizej; j++){
      wordcount++;
      if (direction == 'forget') {
        newtext += ' <span id="' + wordcount + '">' + words[j] + '</span>';
      } else {
        newtext += ' <span id="' + wordcount + '" class="gone">' + words[j] + '</span>';
      }
      
      remainingwords.push(wordcount);
    }
    newtext += '<br>';
  }
  document.getElementById("output").innerHTML = newtext;

  /* Animation speed variables
     speed : input from the slider, time in seconds for poem to dis/appear
     wordinterval : milliseconds between picking a new word to fade
     fade : time it takes a word to fade
  */
  speed = document.getElementById('speed').value;

  totaltime = (speed**4) / 200000; // in seconds
  wordinterval = totaltime*1000/wordcount; //  in milliseconds
  wordfade = wordinterval/1000; // in seconds
  console.log('wordcount', wordcount, '\nspeed', speed, '\ntotaltime (s)', totaltime, '\ninterval (ms)', wordinterval, '\nfade (s)', wordfade);


  clearInterval(fader);
  fader = null;
  fader = setInterval(fadeWords, wordinterval);

  document.getElementById('textentry').style.display = "none";
}

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

function back() {
  document.getElementById("textentry").style.display = "block";
  playorpause = 'pause';
  document.getElementById('playorpause').innerHTML = playorpause; 
}

