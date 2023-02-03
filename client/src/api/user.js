import { useState, useEffect } from "react";
import axios from "axios";

export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    nationality: "",
    position: "",
    discoverable: "",
  });

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:5000/user/info", {
            headers: { Authorization: token },
          });
          console.log(res.data);
          updateUserData(res.data);
          setIsLogged(true);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const updateUserData = (newValues) => {
    setUser({
      ...user,
      ...newValues,
    });
  };

  return {
    isLogged: [isLogged, setIsLogged],
    user: [user, setUser],
  };
}
