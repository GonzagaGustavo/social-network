import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3001, () => console.log("> Server listening on port: 3001"));
