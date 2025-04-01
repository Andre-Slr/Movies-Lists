import { Link, useNavigate } from "react-router-dom"
import "../css/components/NavBar.css"

function NavBar() {
    const navigate = useNavigate();

    const resetLocalStorage = () => {
        localStorage.setItem("page", JSON.stringify(1));
        localStorage.setItem("searching", JSON.stringify("nowPlaying"));
        navigate("/");
        };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link" onClick={resetLocalStorage}>Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link" onClick={resetLocalStorage}>Home</Link>
                <Link to="/lists" className="nav-link">My Lists</Link>
                <Link to="/favorites" className="nav-link">🤍</Link>
            </div>
        </nav>
    )
}

export default NavBar