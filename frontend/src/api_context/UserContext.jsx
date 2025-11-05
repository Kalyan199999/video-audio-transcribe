import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) 
{   
  const url = "http://localhost:5000/api/user";

  const [user, setUser] = useState(localStorage.getItem("email") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // User Registration
  const registration = async (data) => 
  {
    try 
    {
      const response = await axios.post(`${url}/register`, data);

      const { email, token } = response.data;

      setUser(email);
      setToken(token);
      setIsLoggedIn(true);

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      return response.data;
    } 
    catch (error) 
    {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error; // Let caller handle toast/error UI
    }
  };

  // User Login
  const login = async (data) => 
  {
    try 
    {
      const response = await axios.post(`${url}/login`, data); // Corrected endpoint

      const { email, token } = response.data;

      setUser(email);
      setToken(token);
      setIsLoggedIn(true);

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      return response.data;
    } 
    catch (error) 
    {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // Logout
  const logout = () => 
  {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        registration,
        login,
        logout,
        user,
        token,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);