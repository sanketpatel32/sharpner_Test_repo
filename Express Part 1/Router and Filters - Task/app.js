const express = require("express")
const app = express()
const port  = 3000

const bookRoute = require("./routes/books")

app.use(express.json())
app.use("/books",bookRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

//   Deliverables:

// 1.Set Up the Server

// Use Express.js to create a server.


// 2.Create the Routes (API Endpoints) You need to create these routes:(Make sure you are using router for this)

// GET /books: Print a message and send a response like "Here is the list of books!".
// POST /books: Print the book data sent in the request and send a message like "Book has been added!".


// 3.Test Your API

// Use Postman or any API testing tool to test your endpoints