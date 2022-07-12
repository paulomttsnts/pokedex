let init = 0;

async function viewStats(namePokemon) {
    const arrayPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    const arrayDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`);

    let description;

    const dataPokemon = await arrayPokemon.json();
    const dataDescription = await arrayDescription.json();

    for (descriptions of dataDescription.flavor_text_entries) {
        if(descriptions.language.name == "en"){
            description = descriptions.flavor_text;
            break;
        }
    }

    description = description.replace(//g, ' ')

    document.querySelector("#pokemon").innerHTML = `<section id="pokemon">
    <div class="pokemon-infos">
        <h3 class="pokemon-infos-id">#${dataPokemon.id}</h3>
        <h2 class="pokemon-infos-name">${dataPokemon.name}</h2>
        <div class="pokemon-infos-types"></div>
        <div class="pokemon-infos-image">
            <img class="" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dataPokemon.id}.png" alt="Imagem do ${dataPokemon.name}">
        </div>
    </div>
    <div class="pokemon-stats">
        <p class="description">${description}</p>
        <ul class="stats">
            <li class="stats-item">
                <p class="stats-item-p">HP: ${dataPokemon.stats[0].base_stat}</p>
            </li>
            <li class="stats-item">
                <p class="stats-item-p">Attack: ${dataPokemon.stats[1].base_stat}</p>
            </li>
            <li class="stats-item">
                <p class="stats-item-p">Defense: ${dataPokemon.stats[2].base_stat}</p>
            </li>
            <li class="stats-item">
                <p class="stats-item-p">Special attack: ${dataPokemon.stats[3].base_stat}</p>
            </li>
            <li class="stats-item">
                <p class="stats-item-p">Special defense: ${dataPokemon.stats[4].base_stat}</p>
            </li>
            <li class="stats-item">
                <p class="stats-item-p">Speed: ${dataPokemon.stats[5].base_stat}</p>
            </li>
        </ul>
    </div>
</section>`;

    for (types of dataPokemon.types) {
        document.querySelector(".pokemon-infos-types").insertAdjacentHTML("beforeend", `<p class="pokemon-infos-type">${types.type.name}</p>`)
    }
    
};

async function getPokemons() {
    const arrayPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${init}`);

    const dataPokemons = await arrayPokemons.json();

    dataPokemons.results.forEach(async function (pokemon) {
    const arrayPokemon = await fetch(pokemon.url);
    const dataPokemon = await arrayPokemon.json();

    namePokemon = dataPokemon.name;
    idPokemon = dataPokemon.id;

    document.querySelector(".pokemons").insertAdjacentHTML("beforeend", 
    `<div class="pokemon-card">
        <img class="pokemon-card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png" alt="Imagem do ${namePokemon}" onclick="viewStats('${namePokemon}')">
    </div>`
    );

    });
};

document.querySelector(".pokemons").addEventListener("scroll", function() {
    divPokemons = document.querySelector(".pokemons");
    
    if(divPokemons.scrollLeft + divPokemons.clientWidth >= divPokemons.scrollWidth) {
        init = init + 20;
        getPokemons();
    };
});

getPokemons();