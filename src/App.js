import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import ContactPage from './pages/ContactPage';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">Task Manager</h1>
            <div className="nav-links">
              <NavLink 
                to="/todos" 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Todos
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
<main>
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/todos" element={<TodoPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
