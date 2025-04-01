import "../css/components/CreateListForm.css";
import { useListContext } from "../contexts/ListContext";
import { useState } from "react";
import FloatingWindow from "./FloatingWindow";

function CreateListForm({ isOpen, onClose }) {
    const { createList } = useListContext();
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    
    return (
        <>
            <FloatingWindow 
                isOpen={isOpen} 
                onClose={onClose} 
                title={"Create New List"}>
                <div className="createListForm-content">
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
                                createList(listName, listDescription);
                                if (listName.trim() === '') return;
                                onClose();
                                setListName('');
                                setListDescription('');
                            }}>
                            Create List
                        </button>
                    </div>
                </div>
            </FloatingWindow>
        </>
    )
}

export default CreateListForm;