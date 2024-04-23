import React, { useState } from "react";
import toast from "react-hot-toast";

const useSignIn = () => {
  const [loading, setloading] = useState(false);
  const signIn = async (fullname, username, email, password, gender) => {
    setloading(true);
    try {
      const fetchPromise = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: fullname,
            username: username,
            email: email,
            password: password,
            gender: gender,
          }),
        }
      );
      const response = await fetchPromise.json();
      if (response.error != null) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      toast.error(error.message);
      console.log(`Error in signin ${error.message}`);
    } finally {
      setloading(false);
    }
  };
  return { loading, signIn };
};

export default useSignIn;
