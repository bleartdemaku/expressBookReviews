const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');

const fetchBooks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 100)
  })
}

const fetchBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    // Assuming books is the object containing book details
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject(new Error('Book not found'));
      }
    }, 100); // Simulating a delay of 100ms
  });
};

const fetchBooksByAuthor = async (author) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByAuthor = Object.values(books).filter(book => book.author === author);
      resolve(booksByAuthor);
    }, 100); // Simulating a delay of 100ms
  });
};

const fetchBooksByTitle = (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByTitle = Object.values(books).filter(book => book.title === title);
      resolve(booksByTitle);
    }, 100); // Simulating a delay of 100ms
  });
};


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const books = await fetchBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books list', error: error.message });
  }
});

// Get book details based on ISBN
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const booksByAuthor = await fetchBooksByAuthor(author);
    res.json(booksByAuthor);
  } catch (error) {
    res.status(404).json({ message: 'Books not found for author', error: error.message });
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
    res.send(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(book => book.title === title);
  res.send(booksByTitle);
});

//  Get book review
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  fetchBooksByTitle(title)
    .then((booksByTitle) => {
      res.json(booksByTitle);
    })
    .catch((error) => {
      res.status(404).json({ message: 'Books not found for title', error: error.message });
    });
});

module.exports.general = public_users;
