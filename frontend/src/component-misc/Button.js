import { useState, useEffect } from "react";
import { initiatePlayerSession } from "../components/sessions/playerSession";
import "./Button.css";

export default function MainButton(props) {
  const { setShowMainButton, setWsSession } = props;
  const [wsActive, setWsActive] = useState(false);

  function handleClick() {
    if (!wsActive) {
      setShowMainButton("waiting");
      initiatePlayerSession(props);
      setWsActive(true);
    }
  }

  return (
    <button className="main-button" onClick={handleClick}>
      Start!
    </button>
  );
}
