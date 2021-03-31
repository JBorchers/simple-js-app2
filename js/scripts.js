// let pokemon = [
//     {name: "Charmander", height: 2, type: "fire"},
//     {name: "Oddish",  height: 1.6, type: "grass"},
//     {name: "Snorlax",  height: 6.9, type: "normal"}
//   ];

// for (let i=0; i < pokemon.length; i++){
//   if (pokemon[i].height <5){
//     document.write(pokemon[i].name + " (" + pokemon[i].height + " feet)" + " - this is a small pokemon<br>"
//     );
//   }else {
//     document.write(pokemon[i].name + " (" + pokemon[i].height + " feet)" + " - wow that is a big pokemon!<br>");
//   }
// }

let pokemonList = [
    {name: "Charmander", height: 2, type: "fire"},
    {name: "Oddish",  height: 1.6, type: "grass"},
    {name: "Snorlax",  height: 6.9, type: "normal"}
  ];

  pokemonList.forEach(function(pokemon) {
    if (pokemon.height <5){
      document.write(pokemon.name + " (" + pokemon.height + " feet)" + " - this is a small pokemon<br>"
      );
    }else {
      document.write(pokemon.name + " (" + pokemon.height + " feet)" + " - wow that is a big pokemon!<br>"
    })