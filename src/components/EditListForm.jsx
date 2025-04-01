import "../css/components/CreateListForm.css";
import { useListContext } from "../contexts/ListContext";
import { useEffect, useState } from "react";
import FloatingWindow from "./FloatingWindow";

function EditListForm({ isOpen, onClose, list }) {
    const { editList, deleteList, getList } = useListContext();
    const [listName, setListName] = useState("");
    const [listDescription, setListDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (list) {
            setListName(list.list_name);
            setListDescription(list.list_description);
        } else {
            setError("List not found");
        }
    }, [list, getList]);

    return (
        <FloatingWindow 
            isOpen={isOpen} 
            onClose={onClose} 
            title={"Edit List"}>
            <div className="createListForm-content">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <>
                        <p className="createListForm-text">List Name</p>
                        
                        <input 
                            type="text"
                            placeholder="Name your list"
                            className="list-name-input"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                        <p className="createListForm-text">List Description</p>
                        <input 
                            type="text"
                            placeholder="Describe what this list is for!" 
                            className="list-description-input"
                            value={listDescription}
                            onChange={(e) => setListDescription(e.target.value)} />
                        <div className="createListForm-buttons">
                            <button 
                                className="create-list-button"
                                type="button"
                                onClick={() => {
                                    if (listName.trim() === '') return;
                                    editList(list.id, listName, listDescription);
                                    onClose();
                                }}>
                                Edit List
                            </button>
                        </div>
                    </>
                )}
            </div>
        </FloatingWindow>
    );
}

export default EditListForm;