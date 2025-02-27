async function fetchPokeData(pokeName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        if (response.ok) {
            console.log('Successful api request')
            const pokeData = await response.json();
            return pokeData
        } else {
            const errorText = await response.text();
            throw new Error(`Failed with status ${response.status}: ${errorText}`);
        }
    } catch(error) {
        console.error("Error requesting data:", error);
        displayError(error.message)
        throw error;
    }
}

function displayError (message) {
    alert(message)
    alert("Please enter a valid Pokemon name or number")
}

function reloadPage() {
    window.location.reload();
}

async function showPokeData() {
    const user_input = document.getElementById("user_input").value;
    const pokeData = await fetchPokeData(user_input);
    const pokeInfoElement = document.getElementById("poke-info");
    document.getElementById("title").textContent = "Pokemon Info Below";

    const types = pokeData.types.map(typeInfo => typeInfo.type.name);
    pokeInfoElement.innerHTML = ""
    pokeInfoElement.innerHTML = `
        <h2>${pokeData.name}-${pokeData.id}</h2>
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <h3>Abilities</h3>
        <ul>
            ${pokeData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        <h3>Base Experience</h3>
        <p>${pokeData.base_experience}</p>
        <h3>Type(s)</h3>
        <p>${`${types.join(', ')}`}</p>
        <button type="button" onclick="reloadPage()">Pick New Pokemon</button>
    `;
}