import "./PlayerColor.css";

export default function PlayerColor(props) {
  const { color } = props;

  /*  function handlePlayerColor() {
    if (color === "white") {
      setColor("black");
    } else {
      setColor("white");
    }
  }
*/

  const playerColor = {
    backgroundColor: color,
  };

  return (
    <button className="player-color" style={playerColor}>
      {color}
    </button>
  );
}
