import TopupForm from "../components/Topup/TopupForm";
import Header from "../components/Header/Header";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthLoginContext } from "../components/auth/AuthLoginProvider";
export default function TopUp() {
  const isLoggedIn = useContext(AuthLoginContext);
  if (!isLoggedIn) {
    toast.warning("กรุณาเข้าสู่ระบบ");
      return <Navigate to={"/login"} />;
  }
  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <TopupForm />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
