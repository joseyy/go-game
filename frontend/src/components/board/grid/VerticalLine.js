import "./BoxGrid.css";
export default function VerticalLine(props) {
  const { position } = props;
  const style = {
    left: position.left,
  };

  return <div className="vertical-line" style={style} />;
}
