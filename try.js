const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');

function fetchPokemon(id) {
  // Endpoints. Búsqueda por "parámetro" id, pero se podría por nombre, clase, etc
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      createPokemon(data);
      spinner.style.display = "none";
    });
}

function fetchPokeNumber(number) {
    spinner.style.display = "block";
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${number}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonList = data.results.map((pokemon, index) => {
          return {
            ...pokemon,
            index: index + 1 // Añade un índice a cada objeto Pokemon
          };
        });
        pokemonList.sort((a, b) => a.index - b.index); // Ordena los objetos Pokemon por su índice
  
        pokemonList.forEach((pokemon) => {
          fetchPokemon(pokemon.name);
        });
      });
  }
  
  function createPokemon(pokemon) {
    const CARD = document.createElement('div');
    CARD.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = new Image();
    sprite.onload = function() {
        spriteContainer.appendChild(sprite);

        const NUMBER = document.createElement('p');
        NUMBER.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

        const NAME = document.createElement('p');
        NAME.classList.add('name');
        NAME.textContent = pokemon.name;

        CARD.appendChild(spriteContainer);
        CARD.appendChild(NUMBER);
        CARD.appendChild(NAME);

        pokemonContainer.appendChild(CARD);
    }
    sprite.src = pokemon.sprites.other.home.front_default;
}

fetchPokeNumber(9);