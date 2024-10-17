import { useState, useEffect } from "react";
import "./style.css";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(""); // State for error message

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!newTodo.trim()) {
      setError("Task cannot be empty."); // Set error message if the task is empty
      return;
    }

    const newTodos = [...todos, { text: newTodo.trim(), completed: false }];
    setTodos(newTodos);
    setNewTodo("");
    setError(""); // Clear error after successful task addition
  };

  const editTask = (idx, newText) => {
    const updatedTodos = todos.map((todo, i) =>
      i === idx ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (idx) => {
    const updatedTodos = todos.map((todo, i) =>
      i === idx ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="todo">
      <h2>To Do List</h2>
      <div className="input__container">
        <input
          value={newTodo}
          className="input__field"
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder="Enter a new task"
        />
        <button className="btn" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="scroll">
        {todos.map((todo, idx) => (
          <Todo
            key={idx}
            idx={idx}
            text={todo.text}
            completed={todo.completed}
            toggleTask={toggleTask}
            editTask={editTask}
          />
        ))}
      </div>
      <div className="counter__container">
        <p>
          <span className="counter">{todos.length}</span> Items Total
        </p>
        <button id="delete__button" onClick={deleteAll}>
          Delete All
        </button>
      </div>
      {error && <p className="error">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default Todos;