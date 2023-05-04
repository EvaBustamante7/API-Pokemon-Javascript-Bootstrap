const pokemonContainer = document.querySelector('.pokemon-container')
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

//Paginación
let limit = 9;
let offset = 1;

/*condición ? valorSiVerdadero : valorSiFalso; 
offset != 1 ? (offset -= 9, removeChildNodes(pokemonContainer), fetchPokeNumber(offset, limit)) : null;*/

previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokeNumber(offset, limit);
    }
});

next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokeNumber(offset, limit);
});

function fetchPokemon(id) {
    // Endpoints. Búsqueda por "parámetro" id, pero se podría por nombre, clase, etc
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none";
        });

}
/*offset se refiere al número de elementos que se deben omitir al principio de un conjunto
limit se refiere al número máximo de elementos que se deben mostrar en un conjunto de datos*/
function fetchPokeNumber(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i < offset + limit; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    cardBack.appendChild(progressBars(pokemon.stats));


    //Card pokemon
    const CARD = document.createElement('div');
    CARD.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    /*como está definida la img en el array; otros: back_default, front_shiny. 
    pokemon.sprite.name etc ruta ya definida*/
    sprite.src = pokemon.sprites.other.home.front_default

    spriteContainer.appendChild(sprite);

    const NUMBER = document.createElement('p');
    //padStar creada para mostrar 3 dígitos, empezando con ceros al principio
    NUMBER.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const NAME = document.createElement('p');
    NAME.classList.add('name');
    NAME.textContent = pokemon.name;
    //Contenedor con la foto, el nºde pokemon y el nombre
    CARD.appendChild(spriteContainer);
    CARD.appendChild(NUMBER);
    CARD.appendChild(NAME);
    //Ahora añadimos todo a nuestra 1ª const
    pokemonContainer.appendChild(flipCard);
    flipCard.appendChild(cardContainer);
    cardContainer.appendChild(CARD);
    cardContainer.appendChild(cardBack);
    


}
//Todo más fácil con react
function progressBars(stats) {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');

    for (let i = 0; i < 3; i++) {
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        
        const statContainer = document.createElement('stat-container');
        statContainer.classList.add('stat-container');

        const statName = document.createElement('p');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add('progress');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        //Progress en Bootstrap
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;
        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }
    return statsContainer;
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokeNumber(offset, limit);