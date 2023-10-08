import "./BoxGrid.css";
export default function HorizontalLine(props) {
  const { position } = props;
  const style = {
    top: position.top,
  };

  return <div className="horizontal-line" style={style} />;
}
