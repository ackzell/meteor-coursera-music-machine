Template.track.helpers({
	isChecked: function() {
		var mm = MusicMachine.findOne();

		return mm && mm[this.label] === 1;
	}
});