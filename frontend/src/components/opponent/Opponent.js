export default function OpponentActive(props) {
  const { opponentActive } = props;
  function func1() {
    if (opponentActive) {
      return <h1>"opponent joined"</h1>;
    } else {
      return <h1>"waiting for opponent"</h1>;
    }
  }
  return <div className="opponent-active">{func1}</div>;
}
