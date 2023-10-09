import dotenv from "dotenv";
import {WebSocketServer} from "ws";
import Session from "./sessionClass.mjs";
import GameSession from "./gameSession.mjs";

dotenv.config();

export default class WebSocketServerWithQueue {
  constructor() {
    this.wss = new WebSocketServer({port:3002});
    this.sessions = [];
    this.gameSessions = [];
    this.wss.on("connection", this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    console.log("Client connected");
    const session = new Session(ws);
    this.sessions.push(session);

    // Make sure there is at least 2 sessions
    if (this.sessions.length > 1) {
      const session_1 = this.sessions.shift();
      const session_2 = this.sessions.shift();
      const gameSession = new GameSession(session_1, session_2);
      this.gameSessions.push(gameSession);
      session_1.setGameSessionIndex(this.gameSessions.indexOf(gameSession));
      session_2.setGameSessionIndex(this.gameSessions.indexOf(gameSession));
      console.log("Game session started");
    } else {
      session.waitingForOpponent();
    }

    ws.on("close", () => {
      // remove game session if it exists from the gameSessions array
      if (session.gameSessionIndex !== null) {
        this.gameSessions[session.gameSessionIndex].sessionEnded();
        this.gameSessions.splice(session.gameSessionIndex, 1);
        console.log("Game session ended");
      }

      // remove session from sessions array
      const index = this.sessions.indexOf(session);
      if (index !== -1) {
        this.sessions.splice(index, 1);
      }
      console.log("Client disconnected");
    });
  }

  sendSessionsStats() {
    const stats = {
      sessions: this.sessions.length,
      gameSessions: this.gameSessions.length,
    };
    console.log(stats);
  }
}
