import "../css/pages/Home.css";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from "../services/api";
import SearchForm from "../components/SearchForm";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem("page");
        return savedPage ? JSON.parse(savedPage) : 1;
    });
    const [searching, setSearching] = useState(() => {
        const savedSearching = localStorage.getItem("searching");
        return savedSearching ? JSON.parse(savedSearching) : "nowPlaying";
    });

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                let moviesData;
                switch (searching) {
                    case "topRated":
                        moviesData = await getTopRatedMovies(page);
                        setSearchQuery("");
                        break;
                    case "upcoming":
                        moviesData = await getUpcomingMovies(page);
                        setSearchQuery("");
                        break;
                    case "nowPlaying":
                        moviesData = await getNowPlayingMovies(page);
                        setSearchQuery("");
                        break;
                    default:
                        moviesData = await searchMovies(searching, page);
                        break;
                }
                setMovies(moviesData);
                setError(null);
            } catch (error) {
                console.log(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [page, searching]);

    useEffect(() => {
        localStorage.setItem("page", JSON.stringify(page));
    }, [page]);

    useEffect(() => {
        localStorage.setItem("searching", JSON.stringify(searching));
    }, [searching]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        setLoading(true);
        handleSearchTypeChange(searchQuery);
        try {
            const searchResults = await searchMovies(searchQuery, page);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPage(newPage);
    };

    const handleSearchTypeChange = (type) => {
        setPage(1);
        setSearching(type);
    };

    window.onbeforeunload = () => {
        setPage(1);
        setSearching("nowPlaying");
    }

    return (
        <div className="home-container">
            <SearchForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />
            <div className="home-search-links">
                {["nowPlaying", "topRated", "upcoming"].map(type => (
                    <button 
                        key={type}
                        className={`home-link-button ${searching === type ? "active" : ""}`}
                        onClick={() => handleSearchTypeChange(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
                    </button>
                ))}
            </div>
            
            <HomePageButtons page={page} movies={movies} handlePageChange={handlePageChange} />

            {error ? (
                <div className="home-error-message">{error}</div>
            ) : loading ? (
                <div className="home-loading">Loading...</div>
            ) : (
                <div className="favorites-movies-container">
                    <div className="favorites-movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
            )}
            
            <HomePageButtons page={page} movies={movies} handlePageChange={handlePageChange} />
            
        </div>
    );
}

function HomePageButtons({ page, movies, handlePageChange }) {
    return (
        <div className="home-page-buttons">
            {page > 1 && (
                <button 
                    className="home-page-button"
                    onClick={() => handlePageChange(page - 1)}
                >⬅️</button>
            )}
            <div className="home-page-number">{page}</div>
            {movies.length === 20 && (
                <button 
                    className="home-page-button"
                    onClick={() => handlePageChange(page + 1)}
                >➡️</button>
            )}
        </div>
    );
}

export default Home;