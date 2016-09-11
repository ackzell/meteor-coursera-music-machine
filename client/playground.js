//playground.js

howls = {};

sounds.forEach(function(sound) {
	howls[sound.name] = new Howl({
		src: sound.file,
		loop: true
	});
});


playSound = function(name) {
	howls[name].volume(1);
}

stopSound = function(name){
	howls[name].volume(0);
}

playAll = function() {
	sounds.forEach(function(sound) {
		if (!howls[sound.name].playing()) {
			sound.id = howls[sound.name].play();
		}
	});
}

stopAll = function() {
	sounds.forEach(function(sound) {
		howls[sound.name].stop();
	});
}

setSpeed = function(speed) {

	var keys = Object.keys(howls);
	keys.forEach(function(key) {
		howls[key].rate(speed);
	});
	
}


