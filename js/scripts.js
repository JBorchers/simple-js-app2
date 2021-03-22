let pokemon = [
    {name: "Charmander", height: 2, type: "fire"},
    {name: "Oddish",  height: 1.6, type: "grass"},
    {name: "Snorlax",  height: 6.9, type: "normal"}
  ];

for (let i=0; i < pokemon.length; i++){
  if (pokemon[i].height <5){
    document.write(pokemon[i].name + " (" + pokemon[i].height + ")" + " - this is a small pokemon");
  }else {
    document.write(pokemon[i].name + " (" + pokemon[i].height + ")" + " - wow that is a big pokemon!");
  }
}