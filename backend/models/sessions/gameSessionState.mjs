export default class GameSessionState {
  constructor(gameSessionId) {
    this.gameSessionId = gameSessionId;
    this.boardState = [];
  }
  setBoardState(boardState) {
    this.boardState.push(boardState);
  }
  getBoardState() {
    return this.boardState;
  }

  nextPlayerTurn() {
    // check boardstate last move and return player color
    // if last move is white return black
    if (this.boardState.length === 0) return "black";
    if (this.boardState[this.boardState.length - 1].move.color === "white")
      return "black";
    if (this.boardState[this.boardState.length - 1].move.color === "black")
      return "white";
  }
}
