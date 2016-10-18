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
