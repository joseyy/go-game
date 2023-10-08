import Websocket from "ws";

export default class Session {
  constructor(ws) {
    this.ws = ws;
    this.ws.on("message", this.onMessage.bind(this));
  }

  onMessage(message) {
    console.log("message", message);
  }

  handleSomeThing(){
    console.log("handleSomeThing");
  }

}

