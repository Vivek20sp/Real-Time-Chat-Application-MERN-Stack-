import React, { useContext, useState } from "react";
import toast from 'react-hot-toast';
import Context from "../Context/ContextApi";


const useLogout = () => {
  const [loading, setloading] = useState(false);
  const context = useContext(Context);
  const {setAuthToken} = context;
  const logout = async () => {
    setloading(true);
    try {
      const fetchPromise = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await fetchPromise.json();
      if (response.error != null) {
        throw new Error(response.error);
      }
      localStorage.removeItem("token");
      setAuthToken(null);
      return response;
    } catch (error) {
        toast.error(error.message);
        console.log(`Error: ${error.message}`);
    } finally {
        setloading(false);
    }
  };
  return {loading, logout};
};

export default useLogout;
