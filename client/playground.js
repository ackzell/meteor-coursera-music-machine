//playground.js

acontext = new AudioContext;  

//Now we can create an instance of our waveform generator and play it.

waveform = new Synth(acontext);

sounds = [
	{ name: 'arp1',       label : 'Arp',        file : 'arp.wav',                       player : null, },
	{ name: 'bass1',      label : 'Bass Line',  file : 'bassline.wav',                  player : null, },
	{ name: 'ethnic',      label : 'Ethnic',  file : 'Alesis-Fusion-Shakuhachi-C5.wav', player : null, },
	{ name: 'cymbal',     label : 'Cymbal',	    file : 'cymbal1.wav',                   player : null, },
	{ name: 'drums1',     label : 'Drums',      file : 'drums1.wav',                    player : null, },
	{ name: 'drums2',     label : 'snaredrum1', file : 'snaredrum1.wav',                player : null, },
	{ name: 'drums3',     label : 'Bass Drum',  file : 'bassdrum1.wav',                 player : null, },
	{ name: 'hihat',      label : 'Hihat',      file : 'hihat2.wav',                    player : null, },
];

numberOfSounds = sounds.length;

maxims = Array(numberOfSounds);

maxims.fill(new Maxim());

maxims.forEach(function(maxim, i) {
	sounds[i].player = maxim.loadFile(sounds[i].file);
	sounds[i].player.loop
});

playSound = function(index) {
	sounds[index].player.volume(1);
}

stopSound = function(index){
	sounds[index].player.volume(0);
}

playAll = function() {
	sounds.forEach(function(sound) {
		sound.player.play();
	});
}

stopAll = function() {
	sounds.forEach(function(sound) {
		sound.player.stop();
	});
}

setSpeed = function(speed) {

	sounds.forEach(function(sound) {
		sound.player.speed(speed);
	});
	
}


