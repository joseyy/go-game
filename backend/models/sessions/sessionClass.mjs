import Websocket from "ws";

export default class Session {
  constructor(ws) {
    this.ws = ws;
    this.ws.on("message", this.onMessage.bind(this));
    this.gameSessionIndex = null;
  }

  onMessage(message) {
    console.log("message", message);
  }

  waitingForOpponent() {
    this.ws.send("Waiting for opponent");
  }
  opponentFound() {
    this.ws.send("Opponent found");
  }

  opponentLeftGame() {
    this.ws.send("Opponent left");
  }

  setGameSessionIndex(gameSessionIndex){
    this.gameSessionIndex = gameSessionIndex;
  }

}
