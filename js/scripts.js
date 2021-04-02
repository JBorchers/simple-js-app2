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

    function addListItem(pokemon) {
      let pokemonList = document.querySelector ('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      // use parameter in forEach to get pokemon.name
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener('click', function (event) {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon) {
      console.log(pokemon);
    }

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem
    }

    })();

    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });