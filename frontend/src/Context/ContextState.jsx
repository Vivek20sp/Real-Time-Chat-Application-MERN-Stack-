import { useEffect, useState } from "react";
import Context from "./ContextApi";

const ContextState = (props) => {
  const [AuthToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );
  const [loading, setloading] = useState(false);
  const [userInfo, setuserInfo] = useState('');

  useEffect(() => {
    const userDataInfo = async () => {
      setloading(true);
      try {
        const fetchData = await fetch("http://localhost:5000/api/auth/userData", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": String(AuthToken),
          },
        });
        const response = await fetchData.json();

        if (response.errors != null) {
          throw new Error(response.error);
        }

        setuserInfo(response);

        return response;

      } catch (error) {
        toast.error(error.message);
        console.log(`Error! ${error.message}`);
      } finally {
        setloading(false);
      }
    };
    if(AuthToken){
      userDataInfo();
    }
  }, []);


  return (
    <Context.Provider value={{ AuthToken, setAuthToken, userInfo, setuserInfo, loading }}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextState;
