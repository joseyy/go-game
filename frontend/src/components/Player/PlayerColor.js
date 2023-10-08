import "./PlayerColor.css";

export default function PlayerColor(props) {
  const color = props.color;
  const setColor = props.setColor;

  function handlePlayerColor() {
    if (color === "white") {
      setColor("black");
    } else {
      setColor("white");
    }
  }

  const playerColor = {
    backgroundColor: color,
  };

  return (
    <button
      className="player-color"
      onClick={handlePlayerColor}
      style={playerColor}
    >
      {color}
    </button>
  );
}
