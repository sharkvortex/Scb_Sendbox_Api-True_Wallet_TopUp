import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useRef } from "react";
import { User, Lock, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios.jsx";
export default function FormLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const [showPassword, setShowPassword] = useState({ password: false });
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const SubmitBtn = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error("กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน");
      return;
    }
    let toastId;
    try {
      SubmitBtn.current.disabled = true;
      SubmitBtn.current.classList.add("hidden");
      toastId = toast.loading("กำลังดำเนินการโปรดรอ...");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          username: form.username,
          password: form.password,
        }
      );
      if (response.status === 200) {
        toast.success("เข้าสู่ระบบสำเร็จ 🎉");
        setForm("");
        sessionStorage.setItem('userId',response.data.userId)
        setTimeout(() => {
          document.location.href='/'
        }, 1500);
      }
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      SubmitBtn.current.disabled = false;
      SubmitBtn.current.classList.remove("hidden");
      console.error("เกิดข้อผิดพลาด:", error);
      toast.error(
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในระบบ ลองใหม่ภายหลัง ❌"
      );
    }
  };
  return (
    <>
      <div className="h-[calc(100vh-70px)] px-3 sm:px-0 flex items-center justify-center">
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl  overflow-hidden">
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl "></div>
          <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl "></div>
          <div className="absolute top-1/2 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col items-center p-2 mb-8">
              <h1 className="text-3xl text-white font-bold text-center mb-3 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text ">
                เข้าสู่ระบบ
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mx-auto"></div>
              <p className="text-center text-white/80 text-sm px-4 mt-4">
                กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="flex items-center bg-white/10 rounded-2xl p-3.5 border border-white/20 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 focus-within:border-white/40 focus-within:bg-white/15">
                    <User
                      className="text-white/70 group-hover:text-white transition-colors duration-200 mr-3"
                      size={20}
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="ชื่อผู้ใช้"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none placeholder-white/50 text-white font-light"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="flex items-center bg-white/10 rounded-2xl p-3.5 border border-white/20 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 focus-within:border-white/40 focus-within:bg-white/15">
                    <Lock
                      className="text-white/70 group-hover:text-white transition-colors duration-200 mr-3"
                      size={20}
                    />
                    <input
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      placeholder="รหัสผ่าน"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none placeholder-white/50 text-white font-light"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="focus:outline-none hover:opacity-80 transition-opacity"
                    >
                      {showPassword.password ? (
                        <EyeOff
                          className="text-white/70 hover:text-white"
                          size={20}
                        />
                      ) : (
                        <Eye
                          className="text-white/70 hover:text-white"
                          size={20}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                ref={SubmitBtn}
                type="submit"
                className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-2xl font-medium
                   hover:opacity-90 transition-all duration-300
                   transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
