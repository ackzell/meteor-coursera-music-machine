Template.track.helpers({
	'isChecked': function() {
		var mm = MusicMachine.findOne();
		if (mm) {
			return !!mm[this.name];
		}
	},
	'sliderA': function(trackName) {
		var mm = MusicMachine.findOne();

		if (mm) {
			if (Template.instance().view.isRendered) {
				Template.instance().$('#sliderA-' + trackName).data('uiSlider').value(mm['slideA' + trackName]);
				soundSpeed(mm['slideA' + trackName], trackName);
				return Number(mm['slideA' + trackName] * 0.035).toFixed(2);
			}
		}
	},
	'sliderB': function(trackName) {
		var mm = MusicMachine.findOne();

		if (mm) {
			if (Template.instance().view.isRendered) {
				Template.instance().$('#sliderB-' + trackName).data('uiSlider').value(mm['slideB' + trackName]);
				if (!!mm[this.name]) {
					soundVolume(mm['slideB' + trackName] / 100, trackName);
				}
				return mm['slideB' + trackName] / 100;
			}
		}

	}
});

Template.track.onRendered(function() {

	var name = this.data.name;

	var handlerA = _.throttle(function(event, ui) {
		var val = MusicMachine.findOne({});
		var setObj = {};
		setObj['slideA' + name] = ui.value;
		MusicMachine.update({
				_id: val._id
			}, {
				$set: setObj
			});

	}, 50, {
		leading: false
	});

	var handlerB = _.throttle(function(event, ui) {
		var val = MusicMachine.findOne({});
		var setObj = {};
		setObj['slideB' + name] = ui.value;
		MusicMachine.update({
				_id: val._id
			}, {
				$set: setObj
			});

	}, 50, {
		leading: false
	});

	if (!this.$('#sliderA-' + name).data('uiSlider')) {
		$('#sliderA-' + name).slider({
			slide: handlerA,
			min: 0,
			max: 100,
			orientation: 'horizontal'
		});
	}

	if (!this.$('#sliderB-' + name).data('uiSlider')) {
		$('#sliderB-' + name).slider({
			slide: handlerB,
			min: 0,
			max: 100,
			orientation: 'horizontal'
		});
	}
	

});