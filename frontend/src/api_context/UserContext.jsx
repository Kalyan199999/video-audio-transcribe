import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) 
{   
  const url = "http://localhost:5050/api/user";

  const [user, setUser] =  useState(() => 
      {
          const savedUser = localStorage.getItem("user");
          return savedUser ? JSON.parse(savedUser) : null;
      });

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [ error, setError ] = useState('');

  // User Registration
  const registration = async (data) => 
  {
    try 
    {
      const response = await axios.post(`${url}/register`, data);

      const data_fetched = response.data;

      // console.log(response);
      // console.log(data_fetched);
      
      const user_detail = data_fetched.data;

      const user_token = data_fetched.token;

      setUser(user_detail);
      setToken(user_token);
      setIsLoggedIn(true);

      localStorage.setItem("token", user_token );

      localStorage.setItem("user", JSON.stringify(user_detail));

      return data_fetched.ok;
    } 
    catch (err) 
    {
      setError( err.response?.data?.message || "Email exists or password is not valid" )

      console.log(err);
      
      console.error("Registration failed:", err.response?.data || err.message);

      return false;
    }
  };

  // User Login
  const login = async (data) => 
  {
    try 
    {
      const response = await axios.post(`${url}/login`, data); 

      const data_fetched = response.data;

      // console.log(data_fetched);
      
      const user_detail = data_fetched.data;

      const user_token = data_fetched.token;

      setUser(user_detail);
      setToken(user_token);
      setIsLoggedIn(true);

      localStorage.setItem("token", user_token );
      localStorage.setItem("user", JSON.stringify( user_detail ) );

      return data_fetched.ok;
    } 
    catch (err) 
    {
      setError( err.response?.data?.message || "User not exists or invalid password!" );
      console.error("Login failed:", err.response?.data || err.message);
      // throw error;
      return false;
    }
  };

  // Logout
  const logout = () => 
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);