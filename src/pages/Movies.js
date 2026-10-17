
import React, { useState } from "react";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  const searchMovies = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a movie title.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      if (!apiKey) {
        throw new Error("TMDB API key is missing.");
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve movie information.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movies-page">
      <h1>Movie Search</h1>

      <p>Search for movies using The Movie Database (TMDB).</p>

      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>Enter a movie title to begin searching.</p>
      )}

      <div className="movie-results">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width="200"
              />
            ) : (
              <p>No poster available</p>
            )}

            <h2>{movie.title}</h2>

            <p>
              <strong>Release Date:</strong>{" "}
              {movie.release_date || "Not available"}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average != null
                ? `${movie.vote_average.toFixed(1)}/10`
                : "Not available"}
            </p>

            <p>
              <strong>Overview:</strong>{" "}
              {movie.overview || "No overview available."}
            </p>
          </div>
        ))}
      </div>

      <p>
        Movie information provided by The Movie Database (TMDB).
        This application is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}

export default Movies;
