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

  const fetchData = () => {
    axios.get("http://localhost:3000/posts").then(function (res) {
      setFormData(res.data);
    });
  };

  useEffect(fetchData, []);

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
    </div>
  );
}
