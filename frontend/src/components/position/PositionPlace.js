import "./PositionPlace.css";
import { useEffect, useState } from "react";

export default function PositionPlace(props) {
  const {
    position,
    color,
    setPlayState,
    playCoor,
    playState,
    opponentPlay,
    wsSession,
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
    const newStyle = {
      ...style,
      backgroundColor: color,
    };
    setStyle(newStyle);
    console.log("color", color);
    console.log("style", style);
    setPlayState({ move: { coor: playCoor, color: color } });
    wsSession.send(JSON.stringify({ move: { coor: playCoor, color: color } }));
    console.log(playState);
  }

  return <div className="position-place" style={style} onClick={handlePlay} />;
}
