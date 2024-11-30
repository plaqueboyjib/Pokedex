// Function to fetch Pokémon data
async function fetchPokemonData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1350'); // Fetch first 1350 Pokémon
    const data = await response.json();
    return data.results; // Return the list of Pokémon
}

// Function to filter Pokémon based on search input
function filterPokemons(pokemons, searchTerm) {
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to display Pokémon cards
async function displayPokemons(pokemons) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; // Clear previous results

    const pokemonDetails = await Promise.all(pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json())));

    // Sort Pokémon by their ID
    pokemonDetails.sort((a, b) => a.id - b.id);

    pokemonDetails.forEach(details => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';

        // Check number of types and set background accordingly
        if (details.types.length === 1) {
            card.style.backgroundColor = getColorByType(details.types[0].type.name); // Solid color for single type
        } else {
            card.style.background = getGradientByTypes(details.types); // Gradient for dual types
        }
        
        // Create type container
        const typeContainer = document.createElement('div');
        typeContainer.className = 'type-container';
    
        details.types.forEach(type => {
            const typeIndicator = document.createElement('div');
            typeIndicator.className = 'type-indicator';
            typeIndicator.style.backgroundColor = lightenColor(getColorByType(type.type.name), 20); // Set lighter background color
            typeIndicator.textContent = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1); // Capitalize type name
            typeContainer.appendChild(typeIndicator); // Append type indicator to container
        });
    
        // Update innerHTML to include Pokémon ID and name
        card.innerHTML = `
        <div class="pokemon-info"> <!-- New container for text -->
        <div class="pokemon-id">#${details.id}</div> <!-- Pokémon ID -->
        <div class="pokemon-name">${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</div> <!-- Pokémon Name -->
        </div>
        <img class="pokemon-sprite" src="${details.sprites.front_default}" alt="${details.name} sprite" />
        `;

        card.appendChild(typeContainer); // Append type container to card
        container.appendChild(card);
    });
}

// Function to get gradient by types
function getGradientByTypes(types) {
    if (types.length === 2) {
        const color1 = getColorByType(types[0].type.name);
        const color2 = getColorByType(types[1].type.name);
        return `linear-gradient(to top left, ${color1}, ${color2})`; // Gradient between two colors
    } else {
        return getGradientByType(types[0].type.name); // Single type gradient
    }
}

// Function to get gradient by type
function getGradientByType(type) {
    switch (type) {
        case 'grass':
            return 'linear-gradient(to bottom, #78C850, #A8D8B9)';
        case 'fire':
            return 'linear-gradient(to bottom, #F08030, #F8BBA0)';
        case 'water':
            return 'linear-gradient(to bottom, #6890F0, #A4C8E1)';
        case 'electric':
            return 'linear-gradient(to bottom, #F8D030, # F8EBA0)';
        case 'ice':
            return 'linear-gradient(to bottom, #98D8D8, #B2E2E2)';
        case 'fighting':
            return 'linear-gradient(to bottom, #C03028, #D08078)';
        case 'poison':
            return 'linear-gradient(to bottom, #A040A0, #D080D0)';
        case 'ground':
            return 'linear-gradient(to bottom, #E0C068, #E0D0A0)';
        case 'flying':
            return 'linear-gradient(to bottom, #A890F0, #D0B0E0)';
        case 'psychic':
            return 'linear-gradient(to bottom, #F85888, #F8A0B0)';
        case 'bug':
            return 'linear-gradient(to bottom, #A8B820, #D0D0A0)';
        case 'rock':
            return 'linear-gradient(to bottom, #B8A038, #D0C0A0)';
        case 'ghost':
            return 'linear-gradient(to bottom, #705898, #A8A0C0)';
        case 'dragon':
            return 'linear-gradient(to bottom, #7038F8, #A0A0E0)';
        case 'dark':
            return 'linear-gradient(to bottom, #705848, #A8A0A0)';
        case 'steel':
            return 'linear-gradient(to bottom, #B8B8D0, #D0D0E0)';
        case 'fairy':
            return 'linear-gradient(to bottom, #F0B0E0, #F8D0E0)';
        default:
            return 'linear-gradient(to bottom, #A8A8A8, #D0D0D0)'; // Default gradient for unknown types
    }
}

// Function to get color by type
function getColorByType(type) {
    switch (type) {
        case 'grass':
            return '#78C850';
        case 'fire':
            return '#F08030';
        case 'water':
            return '#6890F0';
        case 'electric':
            return '#F8D030';
        case 'ice':
            return '#98D8D8';
        case 'fighting':
            return '#C03028';
        case 'poison':
            return '#A040A0';
        case 'ground':
            return '#E0C068';
        case 'flying':
            return '#A890F0';
        case 'psychic':
            return '#F85888';
        case 'bug':
            return '#A8B820';
        case 'rock':
            return '#B8A038';
        case 'ghost':
            return '#705898';
        case 'dragon':
            return '#7038F8';
        case 'dark':
            return '#705848';
        case 'steel':
            return '#B8B8D0';
        case 'fairy':
            return '#F0B0E0';
        default:
            return '#A8A8A8'; // Default color for unknown types
    }
}

// Function to lighten a hex color
function lightenColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    const pokemons = await fetchPokemonData();
    await displayPokemons(pokemons);

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', async () => {
        const searchTerm = searchInput.value;
        const filteredPokemons = filterPokemons(pokemons, searchTerm);
        await displayPokemons(filteredPokemons);
    });
});
