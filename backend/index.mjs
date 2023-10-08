import express from "express";
import dotenv from "dotenv";
import InitiateNewClientConnection from "./controller/sessions/sessionConnection.mjs";

dotenv.config();

const app = express();

InitiateNewClientConnection();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server listening on ${process.env.IP}:${process.env.PORT}`);
});
