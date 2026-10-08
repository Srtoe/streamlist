import React, { useState } from "react";
import { FaPlus, FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function StreamList() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setItems([...items, newItem]);
    setTitle("");
  };

  const handleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  const handleSaveEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, title: editingTitle }
          : item
      )
    );

    setEditingId(null);
    setEditingTitle("");
  };

  const handleCancelEdit = () => {
  setEditingId(null);
  setEditingTitle("");
};

  return (
    <div className="streamlist-container">
      <h1>StreamList</h1>
      <p>Add a movie or program you want to watch.</p>

      <form onSubmit={handleSubmit} className="streamlist-form">
        <input
          type="text"
          placeholder="Enter a movie or program"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit">
  <FaPlus /> Add to StreamList
</button>
      </form>

      <ul className="streamlist-items">
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                />

                <button onClick={() => handleSaveEdit(item.id)}>
                  Save
                </button>
                <button onClick={handleCancelEdit}>
  Cancel
</button>
              </>
            ) : (
              <>
                <span>{item.title}</span>

                <button onClick={() => handleComplete(item.id)}>
  <FaCheck /> Complete
</button>

                <button onClick={() => handleEdit(item)}>
  <FaEdit /> Edit
</button>

                <button onClick={() => handleDelete(item.id)}>
  <FaTrash /> Delete
</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;