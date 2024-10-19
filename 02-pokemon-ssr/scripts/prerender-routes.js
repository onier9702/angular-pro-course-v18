
// auto invoked function
( async () => {

  const fs = require('fs');
  const TOTAL_POKEMONS = 5;
  const TOTAL_PAGES = 10;

  const pokemonNamesList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(resp => resp.json());

  // console.log(pokemonNamesList);

  const pokemonsIds = Array.from({length: TOTAL_POKEMONS}, (_, i) => i + 1);
  // console.log(pokemonsIds);

  let fileContent = pokemonsIds.map(
    id => `/pokemons/${id}`
  ).join('\n');

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  fileContent += '\n';
  fileContent += pokemonNamesList.results.map(pokemon =>
    `/pokemons/page/${pokemon.name}`
  ).join('\n');

  // console.log(fileContent);

  fs.writeFileSync('routes.txt', fileContent);

})();
