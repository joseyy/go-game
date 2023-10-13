import Websocket from "ws";

export default class Session {
  constructor(ws) {
    this.ws = ws;
    this.ws.on("message", this.onMessage.bind(this));
    this._gameSession = null;
    this._playerColor = "";
  }

  set playerColor(color) {
    this._playerColor = color;
  }

  get playerColor() {
    return this._playerColor;
  }

  onMessage(message) {
    console.log("Client message received, From Class Session Class: ", message);
  }

  waitingForOpponent() {
    this.ws.send('{"notification":"Waiting for opponent"}');
  }
  opponentFound() {
    this.ws.send('{"notification": "Opponent found"}');
  }

  opponentLeftGame() {
    this.ws.send('{"notification":"Opponent left"}');
  }

  set gameSession(value) {
    this._gameSession = value;
  }

  get gameSession() {
    return this._gameSession;
  }

  isWsClosed() {
    return this.ws.readyState === Websocket.CLOSED;
  }

  handlePlayerMessages(message) {}
}
