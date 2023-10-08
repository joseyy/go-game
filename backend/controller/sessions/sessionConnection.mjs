import Session from "../../models/sessions/sessionClass.mjs";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

export default function InitiateNewClientConnection() {
  const wss = new WebSocketServer({
    port: process.env.WS_PORT,
    host: process.env.IP,
  });

  wss.on("connection", (ws) => {
    console.log("Client connected");
    const session = new Session(ws);

    
    
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}