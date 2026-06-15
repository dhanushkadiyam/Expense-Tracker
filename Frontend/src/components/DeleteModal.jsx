import "./DeleteModal.css";
function DeleteModal({ isOpen, title, message, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="delete-modal-buttons">
          <button onClick={onCancel}>Cancel</button>

          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
