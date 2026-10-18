
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

const URL = "https://pokeapi.co/api/v2/pokemon/";

let todosLosPokemon = [];

async function cargarPokemon() {
    const promesas = [];

    for (let i = 1; i <= 151; i++) {
        promesas.push(
            fetch(URL + i).then(response => response.json())
        );
    }

    todosLosPokemon = await Promise.all(promesas);

    mostrarLista(todosLosPokemon);
}

function mostrarLista(pokemons) {
    listaPokemon.innerHTML = "";

    pokemons.forEach(data => mostrarPokemon(data));
}

function mostrarPokemon(data) {
    let tipos = data.types.map(type =>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`
    ).join("");

    const pokeId = "#" + data.id.toString().padStart(3, "0");

    const div = document.createElement("div");
    div.classList.add("pokemon");

    div.innerHTML = `
        <p class="pokemon-id-back">${pokeId}</p>

        <div class="pokemon-imagen">
            <img
                src="${data.sprites.other["official-artwork"].front_default}"
                alt="${data.name}"
            >
        </div>

        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">${pokeId}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>

            <div class="pokemon-tipos">
                ${tipos}
            </div>

            <div class="pokemon-stats">
                <p class="stat">${data.height / 10} m</p>
                <p class="stat">${data.weight / 10} kg</p>
            </div>
        </div>
    `;

    listaPokemon.append(div);
}

botonesHeader.forEach(boton => {
    boton.addEventListener("click", event => {
        const botonId = event.currentTarget.id;

        if (botonId === "ver-todos") {
            mostrarLista(todosLosPokemon);
            return;
        }

        const pokemonFiltrados = todosLosPokemon.filter(data =>
            data.types.some(type => type.type.name === botonId)
        );

        mostrarLista(pokemonFiltrados);
    });
});

cargarPokemon();
