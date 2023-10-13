import { useEffect, useState } from "react";

export default function PlayerTurn(props) {
  const { playerTurn } = props;

  const [turnStyle, setTurnStyle] = useState({
    backgroundColor: "",
  });

  useEffect(() => {

    if (playerTurn === "wait" && turnStyle.backgroundColor === "red") return;
    if (playerTurn === "play" && turnStyle.backgroundColor === "green") return;
    if (playerTurn === "" && turnStyle.backgroundColor === "") return;

    if (playerTurn === "play") {
      setTurnStyle({
        backgroundColor: "green",
      });
    } else if (playerTurn === "wait") {
      setTurnStyle({
        backgroundColor: "red",
      });
    } else {
      setTurnStyle({
        backgroundColor: "",
      });
    }
  }, [playerTurn, setTurnStyle, turnStyle]);

  return (
    <div className="player-turn" style={turnStyle}>
      <p>{playerTurn}</p>
    </div>
  );
}
