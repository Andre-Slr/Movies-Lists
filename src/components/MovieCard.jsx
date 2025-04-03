import "../css/components/MovieCard.css";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useMovieContext } from "../contexts/MovieContext";
import AddToListWindow from "./AddToListWindow";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);
    const [isListWindowOpen, setIsListWindowOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsListWindowOpen(false);
            }
        };
        window.scrollTo({top: 0, behavior: "smooth"});
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }
    

    return (
        <div className="movieCard-container">
            <AddToListWindow isOpen={isListWindowOpen} onClose={() => setIsListWindowOpen(!isListWindowOpen)} movie={movie} />
            <Link to={`/movie_details/${movie.id}`} className="movieCard-link">
                <div className="movieCard">
                    <div className="movieCard-poster">
                        { movie.poster_path 
                            ? <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}/>
                            : <img />
                        }
                        <div className="movieCard-overlay">
                            <button
                                className={`movieCard-favorite-btn`}
                                onClick={onFavoriteClick}
                            >{`${favorite ? "♥️" : "🤍"} `}</button>
                            <button 
                                className="MovieCard-addToList-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsListWindowOpen(!isListWindowOpen)}}
                            >+</button>
                        </div>
                    </div>
                    <div className="movieCard-info">
                        <h3 className="movieCard-title">{movie.title}</h3>
                        <p>{movie.release_date?.split("-")[0]}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MovieCard;