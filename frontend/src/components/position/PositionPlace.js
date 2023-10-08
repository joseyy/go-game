import "./PositionPlace.css";
import { useState } from "react";

export default function PositionPlace(props) {
  const { position } = props;
  const { color } = props;
  const { addPlay } = props;
  const { playCoor } = props;
  const { currentGamepState } = props;

  const [style, setStyle] = useState({
    top: position.top,
    left: position.left,
  });

  function handlePlay() {
    const newStyle = {
      ...style,
      backgroundColor: color,
    };
    setStyle(newStyle);
    addPlay((prev) => [...prev, {coor:playCoor, color:color}]);
    console.log(currentGamepState);
  }

  return <div className="position-place" style={style} onClick={handlePlay} />;
}
