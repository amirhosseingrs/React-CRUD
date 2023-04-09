import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./books.css";
const Books = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books");
        setBooks(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const deleteHandler = async (id) => {
    const deleteConfirm = window.confirm('Are you sure you want to delete');
    if (deleteConfirm) {
      await axios.delete(`http://localhost:3001/${id}`)
      window.location.reload();
    }
  }
  const updateHandler = (id) => {
    navigate(`/update/${id}`);
  }
  return (
    <div className="Container">
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="book cover" />}
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <button className="delete" onClick={() => deleteHandler(book.id)}>Delete</button>
            <button className="update" onClick={() => updateHandler(book.id)}>Update</button>
          </div>
        ))}
      </div>

      <button className="btn">
        <Link to="/add">
          Add New Book
        </Link>
      </button>
    </div>
  );
};

export default Books;
