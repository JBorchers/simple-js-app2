// fetches from pokeAPI
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function getAll() {
    return pokemonList;
  }
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
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
      // event listeners (clicks) for each button
      button.addEventListener('click', function (event) {
        showDetails(pokemon);
      });
    }
    
    // displays pokemon details in console
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
      });
    }
    
    // FETCHES complete list of pokemon from URL
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        // "results" named in api
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          // adds each pokemon from results to pokemonList variable; from "function add(item) {" (line 10)
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    
    // GETS Pokemon details using the URL from Pokemon object in above parameter
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
    
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    // data is now loaded
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });