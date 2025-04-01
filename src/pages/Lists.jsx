import "../css/pages/Lists.css";
import { useListContext } from "../contexts/ListContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateListForm from "../components/CreateListForm";
import EditListForm from "../components/EditListForm";
import ConfirmWindow from "../components/ConfirmWindow";

function Lists() {
    const [showForm, setShowForm] = useState(false);
    const { lists, deleteList } = useListContext();
    const [showEditForm, setShowEditForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [thisList, setThisList] = useState(null);

    const handleEditClick = (e, list) => {
        e.preventDefault();
        setThisList(list);
        setShowEditForm(true);
    };
    const handleDeleteClick = (e, list) => {
        e.preventDefault();
        setThisList(list);
        setShowConfirm(true);
    };

    return (
        <div className="listsPage-container">
            <div className="listsPage-header">
                <h2>My Lists</h2>
            </div>
            <div className="listsPage-button-container">
                <button 
                    className="create-list-button"
                    onClick={() => setShowForm(!showForm)}>
                    Create New List
                </button>
            </div>

            <CreateListForm
                isOpen={showForm}
                onClose={() => setShowForm(!showForm)}/>

            {lists.length > 0 ? (
                <div className="listsPage-content">
                    {lists.map((list) => (
                        <Link to={`/list_details/${list.id}`} 
                            key={list.id} 
                            className="listsPage-list-link">
                            <div className="listsPage-list-card">
                                <h3>{list.list_name}</h3>
                                <p>{list.movies.length} {list.movies.length !== 1 ? "movies" : "movie"}</p>
                                <button 
                                    className="listDetails-edit-btn"
                                    onClick={(e) => handleEditClick(e, list)}>
                                    🖋️
                                </button>
                                <button 
                                    className="listDetails-edit-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteClick(e, list);
                                    }}>
                                    🗑️
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No lists yet</p>
            )}

            {thisList && (
                <div>
                    <EditListForm 
                        isOpen={showEditForm} 
                        onClose={() => setShowEditForm(false)} 
                        list={thisList} />
                    
                    <ConfirmWindow
                        isOpen={showConfirm}
                        onClose={() => setShowConfirm(!showConfirm)}
                        title={"Are you sure you want to delete this list"}
                        onConfirmation={() => {deleteList(thisList.id);}}
                        text={`${thisList.movies.length} movies will be deleted`}
                        yes={"Delete"}
                        no={"Cancel"}/>
                </div>
            )}
        </div>
    );
}

export default Lists;