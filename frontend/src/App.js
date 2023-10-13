import "./App.css";
import BoardBox from "./components/board/BoardBox";
import PlayerColor from "./components/Player/PlayerColor";
import { useState } from "react";
import MainButton from "./component-misc/Button";
import WaitingForPlayer from "./components/sessions/WatingForPlayer";
import PlayerTurn from "./components/playTurn/playerTurn";

function App() {
  const [color, setColor] = useState("red");
  const [showMainButton, setShowMainButton] = useState("show");
  const [playerFound, setPlayerFound] = useState(false);
  const [playState, setPlayState] = useState();
  const [wsSession, setWsSession] = useState(null);
  const [boardState, setBoardState] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(""); //   ["play", "wait", or ""]
  const [opponentPlay, setOpponentPlay] = useState({
    coor: { x: null, y: null },
    color: null,
  });

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
          setBoardState={setBoardState}
          setPlayerTurn={setPlayerTurn}
        />
      )}
      {showMainButton === "waiting" && !playerFound && <WaitingForPlayer />}
      <PlayerColor color={color} />
      <PlayerTurn playerTurn={playerTurn} />
      <BoardBox
        color={color}
        opponentPlay={opponentPlay}
        playState={playState}
        setPlayState={setPlayState}
        wsSession={wsSession}
        boardState={boardState}
        setBoardState={setBoardState}
        playerTurn={playerTurn}
      />
    </div>
  );
}

export default App;
