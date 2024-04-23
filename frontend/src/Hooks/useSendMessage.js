import React, { useContext, useState } from "react";
import getConversations from "../zustand/getConversations";
import toast from "react-hot-toast";
import Context from "../Context/ContextApi";

const useSendMessage = () => {
  const [loading, setloading] = useState(false);
  const { selectedConversation, setMessages,messages } = getConversations();
  const context = useContext(Context);
  const { AuthToken } = context;

  const sendMessage = async (message) => {
    setloading(true);
    try {
      const fetchData = await fetch(
        "http://localhost:5000/api/messageRoute/sendMessage/" +
          String(selectedConversation._id),
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": AuthToken,
          },
          body: JSON.stringify({ message }),
        }
      );
      const response = await fetchData.json();

      if (response.errors != null) {
        throw new Error(response.error);
      }

      setMessages([...messages, response.message]);
      
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
