import "./BoxGrid.css";
import VerticalLine from "./VerticalLine";
import HorizontalLine from "./HorizontalLine";

export default function GridBox(props) {
  const gridHarray = [];
  const gridVarray = [];
  for (let i = 0; i < 18; i++) {
    const hPosition = {
      top: `${i * 38 + 28 + 19}px`,
    };
    const vPosition = {
      left: `${i * 38 + 28 + 19}px`,
    };

    gridVarray.push(<VerticalLine position={vPosition} key={i} />);
    gridHarray.push(<HorizontalLine position={hPosition} key={i} />);
  }

  return (
    <div className="grid-box">
      {gridHarray}
      {gridVarray}
    </div>
  );
}
