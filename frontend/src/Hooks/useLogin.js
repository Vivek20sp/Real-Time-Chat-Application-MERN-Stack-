import React, { useState } from "react";

const useLogin = () => {
  const [loading, setloading] = useState(false);
  const login = async (username, email, password) => {
    setloading(true);
    try {
      const fetchData = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const response = await fetchData.json();

      if (response.errors != null) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    } finally {
      setloading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
