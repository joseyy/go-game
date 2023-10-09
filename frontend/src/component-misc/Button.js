import { useState, useEffect } from "react";
import Websocket from "ws";
import "./Button.css";

export default function MainButton(props) {
  const [ws, setWs] = useState(null);

  function handleClick() {
    if (!ws) {
      const newWs = new WebSocket("ws://localhost:3002");

      newWs.onopen = () => {
        console.log("connected");
      };

      newWs.onmessage = (event) => {
        console.log("received message:", event.data);
      };

      newWs.onclose = () => {
        console.log("disconnected");
      };

      setWs(newWs);

      return () => {
        newWs.close();
      };
    }
  }

  return (
    <button className="main-button" onClick={handleClick}>
      Start!
    </button>
  );
}
