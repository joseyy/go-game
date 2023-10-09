import "./App.css";
import BoardBox from "./components/board/BoardBox";
import PlayerColor from "./components/Player/PlayerColor";
import { useState } from "react";
import MainButton from "./component-misc/Button";
import OpponentActive from "./components/opponent/Opponent";

function App() {
  const [color, setColor] = useState("white");
  const [opponentActive, setOpponentActive] = useState(false);
  const [ws, setWs] = useState(null);

  return (
    <div className="App">
      <MainButton setWs={setWs} />
      <PlayerColor setColor={setColor} color={color} />
      <BoardBox color={color} />
    </div>
  );
}

export default App;
