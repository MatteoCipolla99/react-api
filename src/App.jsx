import { useState, useEffect } from "react";
import axios from "axios";

const startData = {
  title: "",
  image: "",
  content: "",
  tags: "",
};

export default function App() {
  const [formData, setFormData] = useState([]);
  const [users, setUsers] = useState(startData);

  const fetchData = () => {
    axios.get("http://localhost:3000/posts").then(function (res) {
      setFormData(res.data);
    });
  };

  useEffect(fetchData, []);
  const handleFormData = (fieldName, value) => {
    setUsers((prev) => {
      return { ...prev, [fieldName]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/posts", users).then((response) => {
      setFormData((prev) => [...prev, response.data]);
      setUsers(startData);
    });
  };

  return (
    <div className="container">
      <h1>Lista della spesa</h1>
      <ul>
        {formData.map((item, index) => (
          <div key={index} className="list-container">
            <li>
              <div>
                <strong>{item.title}</strong>
              </div>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "300px" }}
              />
              <div>{item.content}</div>
              <p>
                {Array.isArray(item.tags) ? item.tags.join(" - ") : item.tags}
              </p>
            </li>
          </div>
        ))}
      </ul>
      <hr />
      <h3>Aggiungi prodotto</h3>
      <form onSubmit={handleSubmit}>
        <input
          id="title"
          type="text"
          placeholder="Inserisci il titolo"
          value={formData.title}
          onChange={(event) => handleFormData("title", event.target.value)}
          required
        />
        <input
          id="image"
          type="text"
          placeholder="Inserisci l'url dell'immagine"
          value={formData.image}
          onChange={(event) => handleFormData("image", event.target.value)}
          required
        />
        <input
          id="content"
          type="text"
          placeholder="Inserisci il content"
          value={formData.content}
          onChange={(event) => handleFormData("content", event.target.value)}
          required
        />
        <input
          id="tags"
          type="text"
          placeholder="Inserisci i tag"
          value={formData.tags}
          onChange={(event) => handleFormData("tags", event.target.value)}
          required
        />

        <button type="submit">invia</button>
      </form>
    </div>
  );
}
