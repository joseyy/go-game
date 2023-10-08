import { useState, useEffect } from "react";
import Websocket from "ws";
import "./Button.css";

export default function MainButton(props) {
  const { setWs } = props;
  const { newWs } = props;

  useEffect(() => {
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
  }, []);

  function handleClick() {
    newWs.send("Hey I am a new Client");
  }

  return (
    <button className="main-button" onClick={handleClick}>
      Start!
    </button>
  );
}
