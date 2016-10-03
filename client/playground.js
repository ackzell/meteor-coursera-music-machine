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

// howler allows chaning the speed (rate) 
// between 0.5 and 4.0, and
// the slider goes from 0 to 100, thus:
// (4 - 0.5) / 100 = 0.035
soundSpeed = function(speed, sound) {
  howls[sound].rate(speed * 0.035); 

  //console.log(`setting speed for ${sound} at ${speed}`);
};

soundVolume = function(vol, sound) {
  howls[sound].volume(vol);
};