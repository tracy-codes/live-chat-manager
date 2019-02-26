require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨Hello World! 🌈✨🦄"
  });
});

const liveChatId = "EiEKGFVDZnhkeGxEaTJvMVZybEJkenUtR1E5dxIFL2xpdmU";
const MESSAGES_URL = "https://www.googleapis.com/youtube/v3/liveChat/messages";

function getLatestMessages() {
  return fetch(`${MESSAGES_URL}?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${
    process.env.YT_API_KEY
  }
  `)
    .then(res => res.json())
    .then(result => {
      console.log(result);
    });
}

getLatestMessages();

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
