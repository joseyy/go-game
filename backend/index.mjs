import express from "express";
import dotenv from "dotenv";
import WebSocketServerWithQueue from "./models/sessions/sessionConnection.mjs";
import { WebSocketServer } from "ws";
dotenv.config();

const app = express();

const webSocketServerWithQueue = new WebSocketServerWithQueue();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on ${process.env.IP}:${process.env.PORT}`);
});
