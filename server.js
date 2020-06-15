const express = require("express");
const logger = require("morgan"); // Specifies status code
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true })); //  Nested objects is set to true 
app.use(express.json()); // Allows you to send json files to the server

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ useNewUrlParser: true,
useFindAndModify: false});

require("./routes/apiroutes.js")(app);
require("./routes/htmlroutes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

