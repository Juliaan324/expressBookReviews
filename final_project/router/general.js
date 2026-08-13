const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author; //so we are setting variable to what im sending in the curl command
  let result = author.split('+').join(' ');
  //i'm then going to have some logic based on our new variable to send data back
  const values = Object.values(books);
  for(let i = 1; i <= 10; i++){
    if(books[i].author === result){
        res.send(values[i-1]);
    }
  }
   
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const title = req.params.title
    let new_result = title.split('+').join(' ');
    const new_values = Object.values(books);
    for(let i = 1; i <= 10; i++){
        if(books[i].title === new_result){
            res.send(new_values[i-1]);
        }
      }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
