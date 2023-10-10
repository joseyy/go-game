import "./App.css";
import BoardBox from "./components/board/BoardBox";
import PlayerColor from "./components/Player/PlayerColor";
import { useState } from "react";
import MainButton from "./component-misc/Button";
import WaitingForPlayer from "./components/sessions/WatingForPlayer";

function App() {
  const [color, setColor] = useState("red");
  const [showMainButton, setShowMainButton] = useState("show");
  const [playerFound, setPlayerFound] = useState(false);
  const [opponentPlay, setOpponentPlay] = useState({
    coor: { x: null, y: null },
    color: null,
  });
  const [playState, setPlayState] = useState();
  const [wsSession, setWsSession] = useState(null);

  return (
    <div className="App">
      {showMainButton === "show" && (
        <MainButton
          setPlayerFound={setPlayerFound}
          setShowMainButton={setShowMainButton}
          setColor={setColor}
          setOpponentPlay={setOpponentPlay}
          playState={playState}
          setWsSession={setWsSession}
        />
      )}
      {showMainButton === "waiting" && !playerFound && <WaitingForPlayer />}
      <PlayerColor color={color} />
      <BoardBox
        color={color}
        opponentPlay={opponentPlay}
        playState={playState}
        setPlayState={setPlayState}
        wsSession={wsSession}
      />
    </div>
  );
}

export default App;
