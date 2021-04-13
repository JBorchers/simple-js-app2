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
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }
    
       // opens modal with pokemon information
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
        // console.log(item.name, item.height);
      });
    }    
    
    // pulling from the object, which is "pokemon"
    function showModal(pokemon) {
      // let modalDescription = document.querySelector('.modal-description');
      // let modalTitle = document.querySelector('.modal-title');
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');
      
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
      
      // pokemon name
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      
      // pokemon description
      let contentElement = document.createElement('p');
      contentElement.innerText = "height: " + pokemon.height + " feet tall";

      // pokemon image
      let imageElement = document.querySelector('img');
      imageElement.src = pokemon.imageUrl;      
    
      
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
      
      modalContainer.classList.add('is-visible');
    }
    
    // hides modal when "close" button is clicked
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
    
    // hides modal when "escape" key is pressed
      window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
    
    // hides modal when clicked outside of modal
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    
    
    
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal(item.name, item.url);
    });
    
    
    
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
      showDetails: showDetails,
      showModal: showModal
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    // data is now loaded
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });