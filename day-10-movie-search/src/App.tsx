import { useState } from 'react'
import './App.css'
import axios from 'axios'

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w154";

function App() {

  const [movieSearch, setMovieSearch] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const key = import.meta.env.VITE_TMDB_KEY
  console.log("key:", key)


  const searchMovie = async () => {
    try {
      setError('')
      setLoading(true)

      const response = await axios.get('https://api.themoviedb.org/3/search/movie',
        {
          params: {
            query: movieSearch
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
          }
      })

      console.log('response:', response)
      setMovies(response.data.results)
      // search for movie in tmdb database

    } catch (e) {
      setError("Something has gone wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      { error && <p> {error} </p> }
      <h3>Movie Search</h3>

      <div className="movie-search">
          <input
            className="movie-search-input"
            name="movieSearch"
            value={movieSearch}
            onChange={(e) => setMovieSearch(e.target.value)}
          />

        <button className="search-button" onClick={searchMovie}> Search</button>
      </div>
      
      { loading ? (
        <p>Loading...</p>
      ) : (
        <>

          <div className="movie-results">
            { movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            ))}

          </div>
        </>
      )}

    </div>
  )
}

export default App
