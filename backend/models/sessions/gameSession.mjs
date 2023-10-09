import Session from "./sessionClass.mjs";
import WebSocketServerWithQueue from "./sessionConnection.mjs";

export default class GameSession {
  constructor(session_1, session_2) {
    this.players = [session_1, session_2];
  }
  sessionEnded() {
    console.log("Game session ended");
  }
}
