export default class GameSessionState {
  constructor(gameSessionId) {
    this.boardState = [];
  }
  setBoardState(boardState) {
    this.boardState.push(boardState);
  }
  getBoardState() {
    return this.boardState;
  }
}
