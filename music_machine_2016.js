//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection('musicMachine');

if (Meteor.isClient) {

  Meteor.startup(function() {});


  var helpersObj = {
    "startdac": function() {

      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.start === 1) {
          playAll();

        } else {
          stopAll();
        }
      }

      return Session.get('startdac');
    },

    "sliderVal1": function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        if (Template.instance().view.isRendered) {
          Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
          setSpeed(slider.slide / 50);
          return slider.slide;
        }
      }
    },
  };

  sounds.forEach(function(sound) {

    var isPlaying = null;

    helpersObj[sound.name] = function() {

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

  helpersObj.soundsArr = sounds;

  Template.playground.helpers(helpersObj);

  var eventsObj = {};

  sounds.forEach(function(sound, i) {
    eventsObj['change ' + '#' + sound.name + ':checkbox'] = function(event, instance) {

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

  eventsObj['click .startButton'] = function() {
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

  eventsObj['click .stopButton'] = function() {
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

  Template.playground.events(eventsObj);

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
}

if (Meteor.isServer) {
  //MusicMachine.remove({});
  if (MusicMachine.find().count() === 0) {

    var insertObject = {
      slide: 50
    };

    sounds.forEach(function(sound) {
      insertObject['slideA' + sound.name] = 50;
      insertObject['slideB' + sound.name] = 50;
    });

    MusicMachine.insert(insertObject);
  }

}