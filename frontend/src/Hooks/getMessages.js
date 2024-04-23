/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Context from "../Context/ContextApi";
import getConversations from "../zustand/getConversations";

const getMessages = () => {
  const [loading, setloading] = useState(false);
  const context = useContext(Context);
  const { AuthToken } = context;
  const { selectedConversation, setMessages, messages } = getConversations();

  useEffect(() => {
    const messagesSend = async () => {
      setloading(true);
      try {
        const fetchData = await fetch(
          "http://localhost:5000/api/messageRoute/getMessages/" +
            selectedConversation._id,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token": AuthToken,
            },
          }
        );
        const response = await fetchData.json();

        if (response.errors != null) {
          throw new Error(response.error);
        }
        setMessages(response.messages);
      } catch (error) {
        toast.error(error.message);
        console.log(`Error: ${error.message}`);
      } finally {
        setloading(false);
      }
    };
    if (selectedConversation?._id) {
      messagesSend();
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default getMessages;
