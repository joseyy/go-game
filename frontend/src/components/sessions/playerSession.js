export function initiatePlayerSession(props) {
  const { setWsSession } = props;
  const playerWS = new WebSocket("ws://localhost:3002");
  playerWS.onopen = () => {
    console.log("connected");
  };
  playerWS.onmessage = (event) => {
    const dataObj = JSON.parse(event.data);
    handleMessagesFromServer(props, dataObj);

    if (dataObj.notification) {
      if (dataObj.notification === "Opponent left") playerWS.close();
    }
  };
  playerWS.onclose = () => {
    console.log("disconnected");
  };

  setWsSession(playerWS);
}

export async function handleMessagesFromServer(props, event) {
  const { setPlayerFound, setShowMainButton, setColor, setOpponentPlay } =
    props;
  console.log("event:", event);

  if (event.notification) {
    if (event.notification === "Opponent found") {
      setPlayerFound(true);
      setShowMainButton("hide");
    } else if (event.notification === "Opponent left") {
      setPlayerFound(false);
      setShowMainButton("show");
    }
  } else if (event.playerColor) {
    if (event.playerColor === "white") {
      setColor("white");
    } else if (event.playerColor === "black") {
      setColor("black");
    }
  } else if (event.move) {
    setOpponentPlay(event.move);
  }
}
