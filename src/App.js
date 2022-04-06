import { cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";
import PokemonThumnail from "./components/PokemonThumnail";
import Modal from "./components/modal/Modal";
import "./App.css";


function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('http://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject (result) {
      result.forEach(async pokemon => {
        const res = await fetch(`http://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();
        setAllPokemons(currentList => [...currentList, data]);
      })
    }
    
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className="app-container">
      <h1>Pokémon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          { allPokemons.map((pokemon, index) => 
            <PokemonThumnail 
            id = {pokemon.id}
            name = {pokemon.name}
            image = {pokemon.sprites.other.dream_world.front_default}
            type = {pokemon.types[0].type.name}
            key = {index}
            />
          )}
          
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
