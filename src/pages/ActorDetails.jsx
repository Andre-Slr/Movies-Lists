import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActorDetails, getActorImages, getActorMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function ActorDetails() {
    const { id } = useParams()
    const [actor, setActor] = useState(null)
    const [actorMovies, setActorMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showMore, setShowMore] = useState(false)
    const [images, setImages] = useState(null)
    const maxTextLength = 400

    useEffect(() => {
        const fetchActorMovies = async () => {
            try {
                const actorData = await getActorDetails(id)
                const actorMoviesData = await getActorMovies(id)
                const imagesData = await getActorImages(id)
                setActor(actorData)
                setActorMovies(actorMoviesData)
                setImages(imagesData)
                setError(null)
            } catch (error) {
                console.log(error)
                setError("Failed to load actor details...")
            } finally {
                setLoading(false)
            }
        };

        fetchActorMovies();
    }, [id]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!actor) {
        return <div>Actor not found</div>;
    }

    return (
        <div className="movieDetails-container">
            <div className="movieDetails-content">
                {images && <img src={`https://image.tmdb.org/t/p/w500${images.file_path}`} alt="" className="movieDetails-background" />}
                {actor.profile_path ? 
                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} className="poster" /> :
                    <img src="https://i.pinimg.com/736x/63/09/50/6309509c156741e5817a027644b6c5fc.jpg" alt={actor.name} className="poster" /> }
                <div className="movieDetails-description">
                    <h2 className="movieDetails-name">{actor.name}</h2>
                    {actor.birthday && <p className="movieDetails-date">Born: {actor.birthday}</p>}
                    <p className="movieDetails-overview">
                        {showMore ? actor.biography : actor.biography.slice(0, maxTextLength)}
                        {actor.biography.length > maxTextLength && !showMore && "..."}
                    </p>
                    { actor.biography.length > maxTextLength && (
                        <p className="showMore-btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</p>
                    )}
                </div>
            </div>
            <div className="cast-background">
                <h2 className="movieDetails-subtitle">Known For</h2>
                {actorMovies.length > 0 ? (
                    <div className="favorites-movies-container">
                        <div className="favorites-movies-grid">
                            {actorMovies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                            
                        </div>
                    </div>
                ) : (
                    <div>No movies found</div>
                )}
            </div>
        </div>
    );
}

export default ActorDetails;