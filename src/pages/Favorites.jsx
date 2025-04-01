import "../css/pages/Favorites.css"
import MovieCard from "../components/MovieCard"
import { useMovieContext } from "../contexts/MovieContext"

function Favorites() {
    const {favorites} = useMovieContext()

    if (favorites.length > 0) {
        return (
            <div className="favorites-container">
                <h2>Your Favorites</h2>
                <div 
                    className="favorites-movies-container"
                >
                    <div className={`favorites-movies-grid`}>
                        {favorites.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here.</p>
        </div>
    )
}

export default Favorites