import React, { useContext, useEffect } from "react";
import SocketContext from "../Context/SocketContext";
import getConversations from "../zustand/getConversations";
import messageRing from "../Sounds/iphone-sms-tone-original-mp4-5732.mp3";

const useSocket = () => {
  const context = useContext(SocketContext);
  const { Socket } = context;
  const { messages, setMessages } = getConversations();

  useEffect(() => {
    Socket?.on("messagesSend", (newMessages) => {
      const audio = new Audio(messageRing);
      newMessages.shouldVibrating = true;
      audio.play();
      setMessages([...messages, newMessages]);
    });

    return () => Socket?.off("messagesSend");
  }, [Socket, setMessages, messages]);
};

export default useSocket;
