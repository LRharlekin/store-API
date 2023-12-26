require("dotenv").config();
const connectDB = require("./db/connect");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// middlewares
app.use(express.static("/public"));
app.use(express.json());

// routes
const productsRouter = require("./routes/products");

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.use("/api/v1/products", productsRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await DB connection, and log when successful
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to db...");

    app.listen(port, () => {
      console.log(`Listening on PORT:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
