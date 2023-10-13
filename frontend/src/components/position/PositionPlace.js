import "./PositionPlace.css";
import { useEffect, useState } from "react";

export default function PositionPlace(props) {
  const {
    position,
    color,
    setPlayState,
    playCoor,
    opponentPlay,
    wsSession,
    boardState,
    setBoardState,
    playerTurn,
  } = props;

  const [style, setStyle] = useState({
    top: position.top,
    left: position.left,
  });

  useEffect(() => {
    if (!(style.backgroundColor === opponentPlay.color)) {
      if (
        opponentPlay.coor.x === playCoor.x &&
        opponentPlay.coor.y === playCoor.y
      ) {
        let opponentColor = "";
        if (color === "white") {
          opponentColor = "black";
        } else if (color === "black") {
          opponentColor = "white";
        }
        const newStyle = {
          ...style,
          backgroundColor: opponentColor,
        };
        setStyle(newStyle);
      }
    }
  }, [opponentPlay, style, color, playCoor]);

  function handlePlay() {
    if (playerTurn !== "play") return;
    // Check if the position is already taken or invalid
    if (boardState) {
      const coors = boardState.map(({ move: { coor } }) => coor);
      for (const coor of coors) {
        if (coor.x === playCoor.x && coor.y === playCoor.y) return;
      }
    }

    const newStyle = {
      ...style,
      backgroundColor: color,
    };

    const newBoardState = boardState;
    newBoardState.push({ move: { coor: playCoor, color: color } });
    setBoardState(newBoardState);

    setStyle(newStyle);
    setPlayState({ move: { coor: playCoor, color: color } });
    wsSession.send(JSON.stringify({ move: { coor: playCoor, color: color } }));
    console.log(boardState);
  }

  return <div className="position-place" style={style} onClick={handlePlay} />;
}
