import express from "express";
import dotenv from "dotenv";
import GameSessionManager from "./models/sessions/sessionConnection.mjs";
import DB from "./controller/db/db.mjs";
import PossibleMoves from "./controller/game/possibleMoves.mjs";

dotenv.config();

const app = express();

const db = new DB();

const gameSessionManager = new GameSessionManager(db);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on ${process.env.IP}:${process.env.PORT}`);
});
