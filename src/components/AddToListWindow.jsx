import "../css/components/AddToListWindow.css";
import { useState } from "react";
import { useListContext } from "../contexts/ListContext";
import FloatingWindow from "./FloatingWindow";
import CreateListForm from "./CreateListForm";

function AddToListWindow({ isOpen, onClose, movie }) {
    const { lists, addMovieToList, isMovieInList, removeMovieFromList } = useListContext();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="addToListWindow-container">
            <FloatingWindow isOpen={isOpen} onClose={onClose} title={"Add to List"}>
                <div className="addToListWindow-header">
                    <button 
                        className="createNewList-button"
                        onClick={() => setShowForm(!showForm)}>
                        Create New List
                    </button>
                </div>
                <CreateListForm
                    isOpen={showForm}
                    onClose={() => setShowForm(!showForm)}/>
                <div className="addToListWindow-buttons-grid">
                    {lists.map((list) => (
                        <button
                            className={`addToListWindow-add-btn ${isMovieInList(list.id, movie.id) ? "in-list" : ""}`}
                            key={list.id}
                            onClick={(e) => {
                                e.preventDefault();
                                if (isMovieInList(list.id, movie.id)) {
                                    removeMovieFromList(list.id, movie.id);
                                } else {
                                    addMovieToList(list.id, movie);
                                }
                                onClose();
                            }}
                        >
                            {list.list_name}
                        </button>
                    ))}
                </div>
            </FloatingWindow>
        </div>
    );
}

export default AddToListWindow;