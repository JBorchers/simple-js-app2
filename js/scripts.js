// fetches from pokeAPI
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      /* eslint-disable no-console */
      console.log('pokemon is not correct');
      /* eslint-enable no-console */
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('list-group-item-action');
    let button = document.createElement('button');
    // use parameter in forEach to get pokemon.name
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-block');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // event listeners (clicks) for each button
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // opens modal with pokemon information
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // pulling from the object, which is 'pokemon'
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    // let modalBodyLeft = $('.col-md-4');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    // pokemon name
    let titleElement = $('<h1>' + pokemon.name + '</h1>');

    // pokemon description
    let heightElement = $(
      '<p>' + 'height: ' + pokemon.height + ' feet tall' + '</p>'
    );
    let weightElement = $(
      '<p>' + 'weight: ' + pokemon.weight + ' pounds' + '</p>'
    );
    let typesElement = $(
      '<p>' + 'type: ' + returnValue(pokemon.types) + '</p>'
    );
    // let abilitiesElement = $('<p>' + 'abilities: ' + returnValue(pokemon.abilities) + '</p>');
    // let contentElement = document.createElement('p');
    // contentElement.innerText = 'height: ' + pokemon.height + ' feet tall';

    // pokemon image
    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    // modalBody.append(abilitiesElement);
  }

  // FETCHES complete list of pokemon from URL
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // 'results' named in api
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          // adds each pokemon from results to pokemonList variable; from 'function add(item) {' (line 10)
          add(pokemon);
        });
      })
      .catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  // GETS Pokemon details using the URL from Pokemon object in above parameter
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;
        returnValue(details.types);
        // returnValue(details.abilities);
      })
      .catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  function returnValue(object) {
    for (let key of Object.keys(object)) {
      let value = object[key].type.name;
      return value;
    }
  }

  // searchbar narrows down pokemon list
  $(document).ready(function () {
    $('#searchInput').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#pokemonList li').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  // sends data outside of function
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    // hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  // data is now loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
