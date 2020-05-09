// Hold  browser specific Web Audio API
var webAudioAPI =
  (window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext);

// Check Web Audio API is available.
if (webAudioAPI) {
  //hold instance
  var audioContext = new webAudioAPI();
}

//hold two sine waves
var oscillator1, oscillator2;

var addOscillators = function(freq1, freq2){

  //init oscillator1
  oscillator1 = audioContext.createOscillator();
  oscillator1.type = 0;
  oscillator1.frequency.value = freq1;
  gainNode = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();
  oscillator1.connect(gainNode,0,0);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = .1;
  oscillator1.start ? oscillator1.start() : oscillator1.noteOn(0)

  //init oscillator2
  oscillator2 = audioContext.createOscillator();
  oscillator2.type = 0;
  oscillator2.frequency.value = freq2;
  gainNode = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = .1;
  oscillator2.start ? oscillator2.start() : oscillator2.noteOn(0)
};

function start() {
  //check oscillators init success
  if (typeof oscillator1 != 'undefined') oscillator1.disconnect();
  if (typeof oscillator2 != 'undefined') oscillator2.disconnect();
}


function stop() {
  oscillator1.disconnect();
  oscillator2.disconnect();
}
