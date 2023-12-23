require("dotenv").config();

const express = require("express");
const app = express();

// middleware
app.use(express.static("/public"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await DB connection
    app.listen(port, () => {
      console.log(`Listening on PORT:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
