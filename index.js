//Hold record and play buttons
const recordBtn = $("#record-btn");
const playBtn = $("#play-btn");

var recording = false; //recording toggle
var pattern = []; //init playback pattern
var i = 0; //pattern iterator

//Add handlers to all buttons
$(".btn").on("click", handleBtn);
recordBtn.on("click", handleRecord);
playBtn.on("click", handlePlay);

//Handle button pad
function handleBtn() {
  var pressedBtn = this;

  $(pressedBtn).addClass("btn-pressed"); //change appearance

  setTimeout(function() {
    $(pressedBtn).removeClass("btn-pressed"); //reset appearance
  }, 200);
}

//Handle Record Button
function handleRecord() {
  recording = true; //toggle recording on
  recordBtn.addClass("control-pressed"); //change appearance
}

//Handle Play Button
function handlePlay() {
  //if playback pattern is not empty
  if (pattern.length !== 0) {
    playBtn.addClass("control-pressed"); //change appearance
    recording = false; //toggle recording off
    recordBtn.removeClass("control-pressed"); //reset appearance for record button

    playback(); //start playback
  }
}

//Recursively play each freq pair in playback pattern
function playback() {
  addOscillators(pattern[i], pattern[i + 1]); //play freq pair at iterator
  //time out pair playback
  setTimeout(function() {
    stop();
  }, 500);

  i += 2; //increment iterator

  //schedule next freq pair
  setTimeout(function() {
    //if iteration not complete
    if (i < pattern.length) {
      playback(); //play next freq pair
    }
    //if completed
    else {
      playBtn.removeClass("control-pressed"); //reset play button appearance
      pattern = []; //reset playback pattern
      i = 0; //reset iterator
    }
  }, 500);
}

//-------------Play Sounds-----------------//

// Hold  browser specific Web Audio API
var webAudioAPI =
  (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext);

//Hold sine waves
var oscillator1, oscillator2;

//Play sound
var addOscillators = function(freq1, freq2) {
  // Check Web Audio API is available.
  if (webAudioAPI) {
    //hold instance
    var audioContext = new webAudioAPI();
  }

  //init oscillator1
  oscillator1 = audioContext.createOscillator();
  oscillator1.frequency.value = freq1;
  gainNode = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();
  oscillator1.connect(gainNode, 0, 0);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = .1;
  oscillator1.start();

  //init oscillator2
  oscillator2 = audioContext.createOscillator();
  oscillator2.frequency.value = freq2;
  gainNode = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = .1;
  oscillator2.start();

  //Add freq pairs to playback pattern if recording on
  if (recording) {
    pattern.push(freq1, freq2);
  }
};

//Stop playing sound
function stop() {
  oscillator1.disconnect();
  oscillator2.disconnect();
}
