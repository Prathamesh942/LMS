import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  console.log(auth);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await axios.get("/api/v1/auth/checkAuth");
      setAuth(res.data);
    } catch (error) {
      setAuth({
        authenticate: false,
        user: null,
      });
      console.log(error);
    }
  }

  async function login(data) {
    sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    setAuth({
      authenticate: true,
      user: data.user,
    });
    await checkAuth();
  }

  function logout() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
