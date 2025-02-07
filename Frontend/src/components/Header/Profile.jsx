import { useState, useRef, useEffect , useContext } from "react";
import { Wallet, User } from "lucide-react";
import { Link } from "react-router-dom";
import Username from "../hooks/Header/Username.jsx";
import Balance from "../hooks/Header/Balance.jsx";
import { toast } from "react-toastify";
import { AuthLoginContext } from "../auth/AuthLoginProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../axios.jsx";
export default function Profile({ LoginBtn = true, RegisterBtn = true }) {
  const isLoggedIn = useContext(AuthLoginContext)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileMenuButtonRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
        setIsProfileActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsProfileActive(!isProfileActive);
  };
 

  
  const SignOut = async () => {
    let toastId;
    try {
      toastId = toast.loading("กำลังลงชื่อออก...");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`
      );
  
      if (response.status === 200) {
        toast.success("ลงชื่อออกสำเร็จ!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response?.data?.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "เกิดข้อผิดพลาด";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };
  
  return (
    <>
      <div className="flex items-center space-x-4">
        {!isLoggedIn && (
          <div className="flex space-x-4">
            {LoginBtn && (
              <Link to={"/login"}>
                <button className="px-3 py-2 flex justify-center items-center space-x-2 hover:cursor-pointer duration-300 transition bg-white/10 text-white rounded-lg hover:bg-white/20 hover:shadow-lg">
                  <div>
                    <i className="fas fa-sign-in-alt flex text-white/40"></i>{" "}
                  </div>
                  <span>เข้าสู่ระบบ</span>
                </button>
              </Link>
            )}
            {RegisterBtn && (
              <Link to={"/register"}>
                <button className="px-3 py-2 flex items-center space-x-2 hover:cursor-pointer duration-300 transition bg-[#182e6b6e] text-white rounded-lg hover:bg-[#182e6bc4] hover:shadow-lg">
                  <i className="fas fa-user-plus text-[#006bb3]"></i>{" "}
                  <span>สมัครสมาชิก</span>
                </button>
              </Link>
            )}
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className="bg-white/10 px-3 py-1.5 cursor-default rounded-full flex items-center space-x-2 shadow-md hover:bg-white/20 transition-colors duration-300">
              <Wallet size={16} className="text-blue-300" />
              <Balance />
            </div>
            <div className="relative" ref={profileMenuRef}>
              <div
                ref={profileMenuButtonRef}
                className={`relative flex items-center justify-center space-x-2 rounded-full p-2 transition-colors duration-300 cursor-pointer ${
                  isProfileActive ? "bg-white/10" : "hover:bg-white/10"
                }`}
                onClick={handleProfileClick}
              >
                <div className="flex items-center justify-center gap-1">
                  <User size={20} className="text-blue-300" />
                  <Username className={`hidden sm:flex`} />
                </div>
              </div>

              <div
                ref={profileMenuRef}
                className={`absolute right-0 top-[40px] overflow-hidden p-2 w-48 h-auto bg-gray-800 rounded-lg shadow-lg z-50 transition-all duration-300 ease-out transform ${
                  isProfileMenuOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                }`}
              >
                <ul>
                  <li>
                    <div className="flex sm:hidden items-center cursor-default px-4 py-2 text-sm text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <i className="fas fa-user mr-2 text-blue-300"></i>
                      <Username />
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/order-history"
                      className="flex items-center px-4 py-2 text-sm text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                      <i className="fas fa-history mr-2 text-blue-300"></i>
                      ประวัติการสั่งซื้อ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="flex items-center px-4 py-2 text-sm text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                      <i className="fas fa-headset mr-2 text-blue-300"></i>
                      ติดต่อ
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        SignOut();
                        return;
                      }}
                      className="w-full cursor-pointer flex items-center px-4 py-2 rounded-lg text-sm text-white hover:bg-gray-700 transition-colors duration-300"
                    >
                      <div className="flex items-center" >
                      <i className="fas fa-sign-out-alt mr-2 text-red-400"></i>
                      <p  className="text-red-400">
                        ลงชื่อออก
                      </p>
                      </div>
                      
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
