let pokemonRepository = (function () {
  let pokemonList = [
      {name: "Charmander", height: 2, type: "fire"},
      {name: "Oddish",  height: 1.6, type: "grass"},
      {name: "Snorlax",  height: 6.9, type: "normal"}
    ];

    function getAll() {
      return pokemonList;
    }

    function add(item) {
      pokemonList.push(item);
    }

    return {
      getAll: getAll,
      add: add
    }

    })();

    pokemonRepository.getAll().forEach(function(pokemon) {
      document.write(pokemon.name + ' is ' + pokemon.height + ' feet tall.<br>')
    })