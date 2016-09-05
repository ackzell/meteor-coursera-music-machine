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

	helpersObj['sliderB-' + sound.name] = function() {
		var mm = MusicMachine.findOne();

		if (mm) {
			if (Template.instance().view.isRendered) {
				Template.instance().$('#sliderB-' + sound.name).value(mm['slideB' + sound.name]);
				sound.player.setAmplitude(mm['slideB' + sound.name]);
				return mm['slideB' + sound.name];
			}
		}

	};
});

Template.track.helpers(helpersObj);

Template.track.onRendered(function() {

	var el = this.$('.js-switch')[0];

	var sw = new Switchery(el, { 
		size: 'small',
		color: '#53A548',
		secondaryColor: '#19381F',
		jackColor: '#070F07',
		jackSecondaryColor: '#070F07'
		
	});

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
				max: 100,
				orientation: 'horizontal'
			});
		}

		if (!this.$('#sliderB-' + sound.name).data('uiSlider')) {
			$('#sliderB-' + sound.name).slider({
				slide: handler,
				min: 0,
				max: 100,
				orientation: 'horizontal'
			});
		}
	});

});