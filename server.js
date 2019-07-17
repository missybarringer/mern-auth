const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose
  .connect(
      db,
      { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

  app.listen(port, () => console.log(`Server up and running on port ${port} !`));