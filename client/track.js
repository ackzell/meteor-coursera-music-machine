Template.track.helpers({
	'sliderA': function(trackName) {
		var mm = MusicMachine.findOne();

		if (mm) {
			if (Template.instance().view.isRendered) {
				Template.instance().$('#sliderA-' + trackName).data('uiSlider').value(mm['slideA' + trackName]);
				
				return mm['slideA' + trackName];
			}
		}
	},
	'sliderB': function(trackName) {
		var mm = MusicMachine.findOne();

		if (mm) {
			if (Template.instance().view.isRendered) {
				Template.instance().$('#sliderB-' + trackName).data('uiSlider').value(mm['slideB' + trackName]);
				
				return mm['slideB' + trackName];
			}
		}

	}
});

Template.track.onRendered(function() {

	var el = this.$('.js-switch')[0];

	var name = this.data.name;

	var sw = new Switchery(el, {
		size: 'small',
		color: '#53A548',
		secondaryColor: '#19381F',
		jackColor: '#070F07',
		jackSecondaryColor: '#070F07'
		
	});


	Meteor.setTimeout(function() {
		var val = MusicMachine.findOne({});
		
		var checked = val && val[name] === 1;

		if (!checked) {
			el.click();
		}	
	}, 200);

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