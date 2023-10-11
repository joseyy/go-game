import "./BoardBox.css";
import PositionPlace from "../position/PositionPlace";
import GridBox from "./grid/BoxGrid";
import { useState } from "react";

export default function BoardBox(props) {
  const {
    boardState,
    playState,
    setPlayState,
    opponentPlay,
    color,
    wsSession,
    setBoardState,
  } = props;

  // Generate an array of PositionPlace with a position based on top=left for left 0-100px and top 0-100px
  const positionArray = [];
  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 20; c++) {
      const position = {
        top: `${r * 38 - 4}px`,
        left: `${c * 38 - 4}px`,
      };

      positionArray.push(
        <PositionPlace
          position={position}
          key={`x:${c}, y:${r}`}
          color={color}
          setPlayState={setPlayState}
          playCoor={{ x: r, y: c }}
          currentMoveState={playState}
          wsSession={wsSession}
          opponentPlay={opponentPlay}
          boardState={boardState}
          setBoardState={setBoardState}
        />
      );
    }
  }

  return (
    <div className="board-box">
      <GridBox />
      {positionArray}
    </div>
  );
}
