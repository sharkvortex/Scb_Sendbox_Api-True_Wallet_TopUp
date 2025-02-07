import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormLogin from "../components/auth/Login/FormLogin.jsx";
import Header from "../components/Header/Header.jsx"
import { AuthLoginContext } from "../components/auth/AuthLoginProvider.jsx";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom"
export default function Login() {
  const isLoggedIn = useContext(AuthLoginContext);
  if (isLoggedIn) {
    return <Navigate to="/" />
  }
  return (
    <>
    {!isLoggedIn ? (
      <>
      <Header LoginBtn={false}/>
      <FormLogin/>
      </>
    ) : (
      <>
      
      </>
    )}
    
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ fontFamily: "'Sarabun', sans-serif", fontSize: "12px" }}
      />
    </>
  );
}
