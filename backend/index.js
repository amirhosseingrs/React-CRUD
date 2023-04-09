import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

app.listen(3001 , () => {
    console.log('Server is running on port 3001');
})



// End Points


// Get Books End Point
app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books';
    db.query(q, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});


// Inser Book End Point
app.post('/books', (req, res) => {
    const q = 'INSERT INTO books (`title`, `description`, `cover`) VALUES (?)';
    // const values = [req.body.username, req.body.password];
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ]
    db.query(q, [values], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
});


// Update Book End Point
app.put('/books/:id', (req, res) => {
    // UPDATE `books` SET `title` = 'first test title', `description` = 'first test desc', `cover` = 'cover.jpg' WHERE `books`.`id` = 1;
    const q = 'UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE `books`.`id` = ?'
    const bookId = req.params.id;
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
    ]
    db.query(q, [...values,bookId] , (err, result) => {
        if (err) throw err;
        res.json(result);    
    })
})


// Delete Book End Point
app.delete('/:id', (req, res) => {
    const BookId = req.params.id;
    const q = 'DELETE FROM books WHERE `books`.`id` = ?'
    db.query(q, BookId, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

// Get One Book End Point
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = 'SELECT * FROM books WHERE `books`.`id` = ?'
    db.query(q, bookId, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})