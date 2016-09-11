//playground.js

sounds = [
	{ name: 'jungleBeat',  label : 'Jungle Beat',               file : 'jungle-beat.wav',         },
	{ name: 'lrSn0029',    label : 'Synth',                     file : 'LR_SN_0029.wav',              },
	{ name: 'medieval',    label : 'Medieval',                  file : 'medieval-introduction.wav',   },
	{ name: 'harp',        label : 'Harp',	                    file : 'harp.wav',                    },
	{ name: 'bounceSeq5',  label : 'Bounce',                    file : 'bounce-seq-5.wav',            },
	{ name: 'string1Loop', label : 'String Loop',               file : 'string-1-loop.wav',           },
	{ name: 'arp',         label : 'Arpeggiated Chord',         file : 'arpeggiated-cmaj-chord.wav',  },
	{ name: 'excessive',   label : 'Excessive Exposure Vocals', file : 'excessiveexposure.wav',       },
];

numberOfSounds = sounds.length;

howlers = [];
sounds.forEach(function(sound) {
	howlers.push(new Howl({
		src: sound.file,
		loop: true
	}));
});

playSound = function(index) {
	howlers[index].volume(1);
}

stopSound = function(index){
	howlers[index].volume(0);
}

playAll = function() {
	sounds.forEach(function(sound, i) {
		sound.id = howlers[i].play();
	});
}

stopAll = function() {
	sounds.forEach(function(sound, i) {
		howlers[i].stop(sound.id);
	});
}

setSpeed = function(speed) {

	sounds.forEach(function(sound, i) {
		howlers[i].rate(speed, sounds.id);
	});
	
}


