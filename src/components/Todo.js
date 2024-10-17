import { useState } from "react";

export default function Todo({ text, completed, idx, editTask, toggleTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditTask = (e) => {
    if (e.key === "Enter") {
      editTask(idx, editedText);
      setIsEditing(false);
    }
  };

  return (
    <li className="todo__container">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTask(idx)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={handleInputChange}
          onKeyUp={handleEditTask}
          autoFocus
        />
      ) : (
        <p className={completed ? "completed" : ""} onClick={toggleEdit}>
          {text}
        </p>
      )}
    </li>
  );
}