import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import Session from "./sessionClass.mjs";
import GameSession from "./gameSession.mjs";

dotenv.config();

export default class WebSocketServerWithQueue {
  constructor() {
    this.wss = new WebSocketServer({ port: 3002 });
    this.sessions = [];
    this.gameSessions = [];
    this.wss.on("connection", this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    console.log("Client connected");
    const session = new Session(ws);
    this.sessions.push(session);
    // start new game session
    if (!this.startNewGameSession()) {
      session.waitingForOpponent();
    }

    ws.on("close", () => {
      // Find the game this session belongs to
      const gameSession = session.gameSession;

      if (gameSession) {
        gameSession.players.forEach((player) => {
          if (player !== session) {
            this.sessions.push(player);
            player.opponentLeftGame();
            console.log("player added to queue");

            player.opponentLeftGame();
            console.log("Opponent left game");

            if (!this.startNewGameSession()) {
              player.waitingForOpponent();
            }
          }
        });
        this.gameSessions.splice(this.gameSessions.indexOf(gameSession), 1);
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
      sessionsInQueue: this.sessions.length,
      gameSessions: this.gameSessions.length,
    };
    console.log(stats);
  }

  startNewGameSession() {
    // Make sure there is at least 2 sessions
    if (this.sessions.length < 2) {
      return false;
    }
    const session_1 = this.sessions.shift();
    const session_2 = this.sessions.shift();
    const gameSession = new GameSession(session_1, session_2);
    this.gameSessions.push(gameSession);

    session_1.gameSession = gameSession;
    session_2.gameSession = gameSession;
    this.sendSessionsStats();
    return true;
  }
}
