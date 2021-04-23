let pokemonRepository = (function () {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  function n(e) {
    'object' == typeof e && 'name' in e
      ? t.push(e)
      : console.log('pokemon is not correct');
  }
  function o(t) {
    pokemonRepository.loadDetails(t).then(function () {
      i(t);
    });
  }
  function i(t) {
    let e = $('.modal-body'),
      n = $('.modal-title');
    $('.modal-header');
    n.empty(), e.empty();
    let o = $('<h1>' + t.name + '</h1>'),
      i = $('<p>height: ' + t.height + ' feet tall</p>'),
      l = $('<p>weight: ' + t.weight + ' pounds</p>'),
      s = $('<p>type: ' + a(t.types) + '</p>'),
      c = document.createElement('img');
    (c.src = t.imageUrl),
      n.append(o),
      e.append(c),
      e.append(i),
      e.append(l),
      e.append(s);
  }
  function a(t) {
    for (let e of Object.keys(t)) {
      return t[e].type.name;
    }
  }
  return (
    $(document).ready(function () {
      $('#searchInput').on('keyup', function () {
        var t = $(this).val().toLowerCase();
        $('#pokemonList li').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(t) > -1);
        });
      });
    }),
    {
      getAll: function () {
        return t;
      },
      add: n,
      addListItem: function (t) {
        let e = document.querySelector('.pokemon-list'),
          n = document.createElement('li');
        n.classList.add('list-group-item'),
          n.classList.add('list-group-item-action');
        let i = document.createElement('button');
        (i.innerText = t.name),
          i.classList.add('btn'),
          i.classList.add('btn-block'),
          i.setAttribute('data-target', '#pokemonModal'),
          i.setAttribute('data-toggle', 'modal'),
          n.appendChild(i),
          e.appendChild(n),
          i.addEventListener('click', function () {
            o(t);
          });
      },
      loadList: function () {
        return fetch(e)
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              n({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      loadDetails: function (t) {
        let e = t.detailsUrl;
        return fetch(e)
          .then(function (t) {
            return t.json();
          })
          .then(function (e) {
            (t.imageUrl = e.sprites.front_default),
              (t.height = e.height),
              (t.types = e.types),
              (t.weight = e.weight),
              (t.abilities = e.abilities),
              a(e.types);
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      showDetails: o,
      showModal: i,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
