const pokemonContainer = document.querySelector('.pokemon-container')

function fetchPokemon(id) {
    // Endpoints. Búsqueda por "parámetro" id, pero se podría por nombre, clase, etc
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => {
        createPokemon(data);
    });
}
function fetchPokeNumber(number) {
    for (let i = 1; i <= number; i++) {
        fetchPokemon(i); 
    }
}

function createPokemon(pokemon) {
    const CARD = document.createElement('div');
    CARD.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    /*como está definida la img en el array; otros: back_default, front_shiny. 
    pokemon.sprite.name etc ya definidos*/
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const NUMBER = document.createElement('p');
    //padStar creada para añadir 3 dígitos, con dos ceros al principio
    NUMBER.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const NAME = document.createElement('p');
    NAME.classList.add('name');
    NAME.textContent = pokemon.name;
    //Contenedor con la foto, el nºde pokemon y el nombre
    CARD.appendChild(spriteContainer);
    CARD.appendChild(NUMBER);
    CARD.appendChild(NAME);
    //Ahora añadimos todo a nuestra 1ª const
    pokemonContainer.appendChild(CARD);
}

fetchPokeNumber(9);