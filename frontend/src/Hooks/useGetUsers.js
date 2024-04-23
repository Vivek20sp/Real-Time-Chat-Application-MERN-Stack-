import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Context from "../Context/ContextApi";

const useGetUsers = () => {
  const [loading, setloading] = useState(false);
  const [Conversatation, setConversatation] = useState([]);
  const context = useContext(Context);
  const { AuthToken } = context;
  const  showConv = AuthToken;

  // Get all users

  useEffect(() => {
    const getUsers = async () => {
      try {
        setloading(true);
        const fetchData = await fetch(
          "http://localhost:5000/api/auth/getAllUser",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "auth-token": showConv,
            },
          }
        );
        const response = await fetchData.json();
        if (response.error) {
          throw new Error(response.error);
        }
        setConversatation(response.Users);
        return response;
      } catch (error) {
        toast.error("Authonication Invalid");
      } finally {
        setloading(false);
      }
    };
    getUsers();
  },[]);
  return { loading, Conversatation };
};

export default useGetUsers;
