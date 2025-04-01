import "../css/components/FloatingWindow.css";

function FloatingWindow({ isOpen, onClose, title, children }) {
  return (
    <>
        {isOpen ? (
            <div className="floating-component">
                <div className="floating-background" onClick={() => onClose()}/>
                <div className="floating-container">
                    <div className="floating-controls">
                        <h2>{title}</h2>
                        <button 
                            className="floating-close"
                            onClick={onClose}
                            type="button"/>
                    </div>
                    {children}
                </div>
            </div>
        ) : null} 
    </>
  );
}
export default FloatingWindow;