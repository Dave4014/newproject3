import React, { useState } from 'react';
import './TodoPage.css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'incomplete':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="todo-page">
      <div className="todo-container">
        <h1>Todo List</h1>
        
        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="add-button">Add Todo</button>
        </form>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={filter === 'incomplete' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('incomplete')}
          >
            Incomplete ({todos.filter(t => !t.completed).length})
          </button>
          <button
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="no-todos">
              {filter === 'all' 
                ? 'No todos yet. Add one above!' 
                : `No ${filter} todos.`}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span 
                  className="todo-text"
                  onClick={() => toggleComplete(todo.id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#333'
                  }}
                >
                  {todo.text}
                </span>
                <div className="todo-actions">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={todo.completed ? 'uncomplete-btn' : 'complete-btn'}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;