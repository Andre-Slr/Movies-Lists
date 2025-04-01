import "../css/pages/ListDetails.css";
import { useParams } from 'react-router-dom';
import { useListContext } from '../contexts/ListContext';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import EditListForm from "../components/EditListForm";
import ConfirmWindow from "../components/ConfirmWindow";

function ListDetails() {
    const { id } = useParams(); 
    const { getList, deleteList } = useListContext();
    const [list, setList] = useState();
    const [error, setError] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (id) {
            try {
                const fetchedList = getList(id);
                if (fetchedList) {
                    setList(fetchedList);
                } else {
                    setError('List not found');
                }
            } catch (err) {
                setError('Error fetching list');
            }
        } else {
            setError('Invalid list ID');
        }
    }, [id, getList]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!list) {
        return <p>Loading...</p>;
    }

    return (
        <div className="listDetails-container">
            <EditListForm 
                isOpen={showEditForm} 
                onClose={() => setShowEditForm(!showEditForm)} 
                list={list} />
            <ConfirmWindow
                isOpen={showConfirm}
                onClose={() => setShowConfirm(!showConfirm)}
                title={"Are you sure you want to delete this list"}
                onConfirmation={() => {deleteList(list.id);}}
                text={`${list.movies.length} movies will be deleted`}
                yes={"Delete"}
                no={"Cancel"}/>
            <div className="listDetails-header">
                <div className="listDetails-name"></div>
                <h2 className="listDetails-name">{list.list_name}</h2>
                <div className="listDetails-buttons-container">
                    <button 
                        className="listDetails-edit-btn"
                        onClick={() => setShowEditForm(!showEditForm)}>
                        🖋️
                    </button>
                    <button 
                        className="listDetails-edit-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowConfirm(!showConfirm);
                        }}>
                        🗑️
                    </button>
                </div>
            </div>
            <p className="listDetails-length">{list.movies.length} {list.movies.length !== 1 ? "movies" : "movie"}</p>
            <p className="listDetails-description">{list.list_description}</p>
            {list.movies.length > 0 ? (

                <div className="listDetails-movies-container">
                    <div className="listDetails-movies-grid">
                        {list.movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="listDetails-empty-text">Start adding movies to your list!</p>
            )}
        </div>
    );   
}

export default ListDetails;