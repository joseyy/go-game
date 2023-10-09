import Session from "./sessionClass.mjs";
import WebSocketServerWithQueue from "./sessionConnection.mjs";

export default class GameSession {
    constructor(session_1,session_2) { 
        this.session_1 = session_1;
        this.session_2 = session_2;
        this.session_1.opponentFound();
        this.session_2.opponentFound();
    }

    sessionEnded() {
        this.session_1.opponentLeftGame();
        this.session_2.opponentLeftGame();
    }
    
}