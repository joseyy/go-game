import "./App.css";
import BoardBox from "./components/board/BoardBox";
import PlayerColor from "./components/Player/PlayerColor";
import { useState } from "react";

function App() {
  const [color, setColor] = useState("white");
  return (
    <div className="App">
      <BoardBox color={color}/>
      <PlayerColor setColor={setColor} color={color}/>
    </div>
  );
}

export default App;
