import FromRegister from "../components/auth/Register/FromRegister";
import { ToastContainer } from "react-toastify";
import { AuthLoginContext } from "../components/auth/AuthLoginProvider";
import { useContext , useEffect } from "react";
import { Navigate } from "react-router-dom"
import Header from "../components/Header/Header";
export default function Register() {
 const isLoggedIn = useContext(AuthLoginContext)
 if (isLoggedIn) {
  return <Navigate to="/" />
}
  return (
    <>
    {!isLoggedIn ? (
          <>
          <Header RegisterBtn={false}/>
          <FromRegister/>
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
