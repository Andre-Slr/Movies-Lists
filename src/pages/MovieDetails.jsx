import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getMovieImages, getMovieTrailer, getMovieCast, getSimilarMovies } from "../services/api";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";
import "../css/pages/MovieDetails.css";
import AddToListWindow from "../components/AddToListWindow";
import { useMovieContext } from "../contexts/MovieContext"

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
  const [isListWindowOpen, setIsListWindowOpen] = useState(false);
  const [showMore, setShowMore] = useState(false)
  const [images, setImages] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const maxTextLength = 400

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        const castData = await getMovieCast(id);
        const imageData = await getMovieImages(id);
        const recommendData = await getSimilarMovies(id);
        setMovie(movieData);
        setCast(castData);
        setImages(imageData)
        setRecommendations(recommendData);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to load movie details...");
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const trailerData = await getMovieTrailer(id);
        setTrailer(trailerData);
      } catch (error) {
        console.log(error);
        setTrailer(null);
      }
    }

    fetchMovieTrailer();
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not Found</div>;
  }
  const favorite = isFavorite(movie.id)

  
  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) {
        removeFromFavorites(movie.id)
    }
    else {
        addToFavorites(movie)
    }
  }

  return (
    <div className="movieDetails-container">
      <div className="movieDetails-content">
        {images && <img src={`https://image.tmdb.org/t/p/w500${images.file_path}`} alt="" className="movieDetails-background" />}
        {movie.poster_path ? 
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="poster"/> :
          <img src="https://i.pinimg.com/736x/67/f9/93/67f993c25d6f680facab2a83e51b34c5.jpg" alt={movie.title} className="poster"/>
        }
        <AddToListWindow isOpen={isListWindowOpen} onClose={() => setIsListWindowOpen(!isListWindowOpen)} movie={movie} />
        <div className="movieDetails-overlay">
          <button
              className={`movieDetails-favorite-btn`}
              onClick={onFavoriteClick}
          >{`${favorite ? "♥️" : "🤍"} `}</button>
          <button 
              className="movieDetails-addToList-btn"
              onClick={(e) => {
                  e.preventDefault();
                  setIsListWindowOpen(!isListWindowOpen)}}
          >+ Add to List</button>
        </div>
        <div className="movieDetails-description">
          <h2 className="movieDetails-name">{movie.title}</h2>
          <p className="movieDetails-tagline">{movie.tagline}</p>
          <p className="movieDetails-date">{movie.release_date.slice(0,4)}</p>
          <p className="movieDetails-overview">
              {showMore ? movie.overview : movie.overview.slice(0, maxTextLength)}
              {movie.overview.length > maxTextLength && !showMore && "..."}
          </p>
          { movie.overview.length > maxTextLength && (
              <p className="showMore-btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</p>
          )}
          
          {trailer && (
            <iframe
              title={trailer.name}
              width="380"
              height="240"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allow="autoplay; encrypted-media;"
              allowFullScreen
              className="movieDetails-trailer"
            />
          )}
        </div>
      </div>
      <div className="cast-background">
        <h2 className="movieDetails-subtitle">Cast</h2>
        <div className="movieDetails-cast">
          {cast.length > 0 ? (
            cast.slice(0, 10).map((actor) => (
              (actor.profile_path && <CastCard key={actor.id} actor={actor} />)
            ))
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      </div>
      <h2 className="movieDetails-subtitle">Recommended</h2>
      <div className="favorites-movies-container">
        <div className="favorites-movies-grid">
            {recommendations.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;