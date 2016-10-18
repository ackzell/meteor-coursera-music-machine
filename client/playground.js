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

Meteor.startup(function() {});

  var playgroundHelpersObj = {
    'startdac': function() {

      var mm = MusicMachine.findOne();
      if (mm) {
        if (mm.start === 1) {
          playAll();

        } else {
          stopAll();
        }
      }

      return Session.get('startdac');
    },

    'sliderVal1': function() {
      var mm = MusicMachine.findOne();
      if (mm) {
        if (Template.instance().view.isRendered) {
          Template.instance().$('#slider1').data('uiSlider').value(mm.slide);
          setSpeed(mm.slide / 50);
          return mm.slide;
        }
      }
    },
  };

  sounds.forEach(function(sound) {

    var isPlaying = null;

    playgroundHelpersObj[sound.name] = function() {

      var starter = MusicMachine.findOne();

      if (starter) {

        isPlaying = starter[sound.name] === 1;

        if (isPlaying) {
          playSound(sound.name);
        } else {
          stopSound(sound.name);
        }
      }
    };

  });

  playgroundHelpersObj.soundsArr = sounds;

  Template.playground.helpers(playgroundHelpersObj);

  var playgroundEventsObj = {};

  sounds.forEach(function(sound, i) {
    playgroundEventsObj['change ' + '#' + sound.name + ':checkbox'] = function(event, instance) {

      var toggled = event.target.checked ? 1 : 0;
      var val = MusicMachine.findOne();

      var setVal = {};
      setVal[sound.name] = toggled;

      MusicMachine.update({
        _id: val._id
      }, {
        $set: setVal
      });

      console.log(MusicMachine.findOne());
    };

  });

  playgroundEventsObj['click .startButton'] = function() {
    Session.set('startdac', 1);
    var val = MusicMachine.findOne({});
    MusicMachine.update({
      _id: val._id
    }, {
      $set: {
        start: 1
      }
    });
  };

  playgroundEventsObj['click .stopButton'] = function() {
    Session.set('startdac', 0);
    var val = MusicMachine.findOne({});
    MusicMachine.update({
      _id: val._id
    }, {
      $set: {
        start: 0
      }
    });
  };

  Template.playground.events(playgroundEventsObj);

  Template.playground.onRendered(function() {
    $('h2').hide();

    var handler = _.throttle(function(event, ui) {
      var val = MusicMachine.findOne({});
      MusicMachine.update({
        _id: val._id
      }, {
        $set: {
          slide: ui.value
        }
      });
    }, 50, {
      leading: false
    });

    if (!this.$('#slider1').data('uiSlider')) {
      $("#slider1").slider({
        slide: handler,
        min: 0,
        max: 100
      });
    }

  });