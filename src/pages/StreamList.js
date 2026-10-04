import React, { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("StreamList entry:", title);
    setTitle("");
  };

  return (
    <div>
      <h1>StreamList</h1>
      <p>Add a movie or program you want to watch.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie or program"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit">Add to StreamList</button>
      </form>
    </div>
  );
}

export default StreamList;