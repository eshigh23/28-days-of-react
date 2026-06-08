// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0
import { useEffect, useState } from 'react'
import axios from 'axios'


const PokemonList = () => {
    const LIMIT = 5
    const [pokemon, setPokemon] = useState([])
    const [count, setCount] = useState(null)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)


    const fetchPokemon = async () => {
        try {
            setLoading(true)
            setError(false)

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)

            const pokemonResults = response.data.results
            setPokemon(prev => [...prev, ...pokemonResults])
            setCount(response.data.count)
            
        } catch (e) {
            setError('Something went wrong, please try again.')

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [offset])


    const loadMorePokemon = () => {
        fetchPokemon()
    }

    return (
        <div>
            <h1>Pokemon List</h1>
         
            { error && <p>{error}</p> }

            <h3>Displaying { pokemon.length } of {count} results</h3>
            <ul>
                { pokemon.map(pokemon => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>

            { loading && <p>Loading...</p> }

            { count - pokemon.length > 0 && (
                <button onClick={()=> setOffset(prev => prev + LIMIT)}>Load more</button>
            )}
               
        </div> 
    )
};

export default PokemonList;
