import "../css/components/CastCard.css"
import { Link } from "react-router-dom"

function CastCard({actor}) {
    return(
        <div key={actor.id} className="actor-container">
            <Link to={`/actor_details/${actor.id}`} className="actor-link">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
                    alt={actor.name} />
                <p className="actorName">{actor.name}</p>
                <p className="actorCharacter">{actor.character}</p>
            </Link>
        </div>
    )
}

export default CastCard