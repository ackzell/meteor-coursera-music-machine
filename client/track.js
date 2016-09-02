var helpersObj = {
	isChecked: function() {
		var mm = MusicMachine.findOne();

		return mm && mm[this.label] === 1;
	}
};

sounds.forEach(function(sound, i) {
	helpersObj['sliderA-' + sound.name] = function() {
		var mm = MusicMachine.findOne();

		if (mm) {
			if (Template.instance().view.isRendered) {
				Template.instance().$('#sliderA-' + sound.name).value(mm['slideA' + sound.name]);
				sound.player.setAmplitude(mm['slideA' + sound.name]);
				return mm['slideA' + sound.name];
			}
		}

	};
});

Template.track.helpers(helpersObj);

Template.track.onRendered(function() {

	sounds.forEach(function(sound) {
		
		var handler = _.throttle(function(event, ui) {
			var val = MusicMachine.findOne({});
			var setObj = {};
			setObj['slideA' + sound.name] = ui.value;
			MusicMachine.update({
					_id: val._id
				}, {
					$set: setObj
				});
		}, 50, {
			leading: false
		});

		if (!this.$('#sliderA-' + sound.name).data('uiSlider')) {
			$('#sliderA-' + sound.name).slider({
				slide: handler,
				min: 0,
				max: 100
			});
		}
	});

});