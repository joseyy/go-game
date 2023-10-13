import GameSessionState from "./gameSessionState.mjs";
import { v4 as uuidv4 } from "uuid";
import PossibleMoves from "../../controller/game/possibleMoves.mjs";

export default class GameSession {
  constructor(session_1, session_2, db) {
    this.players = [session_1, session_2];
    this.players[0].opponentFound();
    this.players[1].opponentFound();
    // Generate a unique gameID
    this.gameID = uuidv4();

    // Create a new game session state
    this.gameSessionState = new GameSessionState(this.gameID);

    this.possibleMoves = new PossibleMoves(20);

    // db
    this.db = db;

    // Randomly choose a player color for each player (white or black)
    const randomIndex = Math.floor(Math.random() * 2); // 0 or 1
    this.players[randomIndex].ws.send('{"playerColor":"white"}');
    this.players[randomIndex].playerColor = "white";
    this.players[1 - randomIndex].ws.send('{"playerColor":"black"}');
    this.players[1 - randomIndex].playerColor = "black";

    // get ws from each player
    // set up event listeners for each player
    const ws_1 = this.players[0].ws;
    const ws_2 = this.players[1].ws;

    // Send player turn to play
    this.sendPlayerTurnToPlay();

    ws_1.on("message", this.onMessage.bind(this, 0));
    ws_2.on("message", this.onMessage.bind(this, 1));
  }

  sessionEnded() {
    console.log("Game session ended");
  }

  onMessage(playerIndex, message) {
    const messageParsed = JSON.parse(message);
    if (messageParsed.move) {
      // update game state with last move
      this.gameSessionState.setBoardState(messageParsed);

      // send state to other player
      const boardState = this.gameSessionState.getBoardState();
      this.players[1 - playerIndex].ws.send(JSON.stringify({ boardState }));

      // send move to other player for rendering
      this.players[1 - playerIndex].ws.send(JSON.stringify(messageParsed));

      // send player turn to play
      this.sendPlayerTurnToPlay();

      // save move to db
      this.db.saveMove(this.gameID, messageParsed.move);
    }
  }

  sendPlayerTurnToPlay() {
    if (this.gameSessionState.nextPlayerTurn() === "white") {
      if (this.players[0].playerColor === "white") {
        this.players[0].ws.send('{"playerTurn":"play"}');
        this.players[1].ws.send('{"playerTurn":"wait"}');
      } else {
        this.players[0].ws.send('{"playerTurn":"wait"}');
        this.players[1].ws.send('{"playerTurn":"play"}');
      }
    } else {
      if (this.players[0].playerColor === "black") {
        this.players[0].ws.send('{"playerTurn":"play"}');
        this.players[1].ws.send('{"playerTurn":"wait"}');
      } else {
        this.players[0].ws.send('{"playerTurn":"wait"}');
        this.players[1].ws.send('{"playerTurn":"play"}');
      }
    }
  }
}
