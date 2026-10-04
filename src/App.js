import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <h2>StreamList</h2>

          <div className="nav-links">
            <Link to="/">StreamList</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
