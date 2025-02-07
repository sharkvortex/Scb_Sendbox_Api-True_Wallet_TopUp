import React, { useState, useEffect } from "react";
import axios from "../axios.jsx";
import { createContext } from "react";

export const AuthLoginContext = createContext();

export default function AuthLoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const fetchLoginStatus = async () => {  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/isLogin`
        );
        setIsLoggedIn(response.data.isLogIn);
      } catch (error) {
        console.log("Error fetching login status:", error); 
        setIsLoggedIn(false);
      }
    };
    fetchLoginStatus();  
  },[]);

  if(isLoggedIn === null) return

  return (
    <AuthLoginContext.Provider value={isLoggedIn}>
      {children}
    </AuthLoginContext.Provider>
  );
}
