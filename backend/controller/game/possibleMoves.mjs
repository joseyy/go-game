export default class PossibleMoves {
  constructor(boardSize) {
    const range = Array.from({ length: boardSize }, (_, i) => i);

    this.possibleMoves = range.flatMap((x) =>
      range.map((y) => ({ x: x, y: y }))
    );
  }

  // Pass in the current board plays and return the moves player can't make
  getPossibleMoves(currentBoardPlays) {
    const plays = Array.isArray(currentBoardPlays)
      ? currentBoardPlays
      : [currentBoardPlays];
    this.possibleMoves = this.possibleMoves.filter((move) => {
      for (const element of plays) {
        if (move.x === element.x && move.y === element.y) {
          return false;
        }
      }
      return true;
    });
    return this.possibleMoves;
  }
}
