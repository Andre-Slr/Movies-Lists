import FloatingWindow from "./FloatingWindow"

function ConfirmWindow({isOpen, onClose, title, text, onConfirmation, yes, no}) {
    return (
        <FloatingWindow 
            isOpen={isOpen}
            onClose={onClose}
            title={title}>
                <div className="createListForm-content">
                    <p className="createListForm-text">{text}</p>
                    <div className="createListForm-buttons">
                        <button 
                            className="create-list-button"
                            type="button"
                            onClick={() => {
                                onConfirmation();
                                onClose();
                            }}>
                            {yes}
                        </button>
                        <button 
                            className="create-list-button no"
                            type="button"
                            onClick={() => {
                                onClose();
                            }}>
                            {no}
                        </button>
                    </div>
                </div>
        </FloatingWindow>
    )
}

export default ConfirmWindow;