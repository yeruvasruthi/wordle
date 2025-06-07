function Notification({ message, onClose }) {
    if (!message) return null;
  
    return (
      <div className="notification" onClick={onClose}>
        {message}
      </div>
    );
  }
  
  export default Notification;
  