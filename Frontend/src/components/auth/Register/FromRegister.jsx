import React, { useState, useRef, useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios.jsx";
export default function FromRegister() {
    const SubmitBtn = useRef(null);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });

      const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
      });
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
          ...form,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword, acceptTerms } = form;
    
        if (!username) {
          toast.error("กรุณากรอกชื่อผู้ใช้");
          return;
        }
    
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
          toast.error("กรุณากรอกอีเมลให้ถูกต้อง");
          return;
        }
    
        if (!password || !confirmPassword) {
          toast.error("กรุณากรอกรหัสผ่านและยืนยันรหัสผ่าน");
          return;
        }
    
        if (password.length < 6) {
          toast.error("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
          return;
        }
    
        if (password !== confirmPassword) {
          toast.error("รหัสผ่านไม่ตรงกัน");
          return;
        }
    
        if (!acceptTerms) {
          toast.error("กรุณายอมรับเงื่อนไข");
          return;
        }
    
        let toastId;
    
        try {
          SubmitBtn.current.disabled = true;
          SubmitBtn.current.classList.add("hidden");
    
          toastId = toast.loading("กำลังดำเนินการโปรดรอ...");
    
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/register`,
            form
          );
          toast.dismiss(toastId);
    
          if (response.status === 201) {
            toast.success("สมัครสมาชิกสำเร็จ 🎉" || response.data.message);
    
            setForm({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              acceptTerms: false,
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
            return;
          } else {
            toast.error(
              error.response?.data?.message ||
                "เกิดข้อผิดพลาดในระบบ ลองใหม่ภายหลัง ❌"
            );
          }
        } catch (error) {
          if (toastId) toast.dismiss(toastId);
    
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "เกิดข้อผิดพลาดในระบบ ลองใหม่ภายหลัง ❌";
    
          toast.error(errorMessage);
          console.error(error.response ? error.response.data : error.message);
        } finally {
          SubmitBtn.current.classList.remove("hidden");
          SubmitBtn.current.disabled = false;
        }
    }
  return (
<>
<div className="h-[calc(100vh-70px)] px-3 sm:px-0 flex items-center justify-center">
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl border border-white/20 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                  สมัครสมาชิก
                </h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mx-auto"></div>
              </div>
              <p className="text-center text-white/80 text-sm px-4 mt-4">
                กรุณากรอกข้อมูลด้านล่างเพื่อสร้างบัญชีของคุณ
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
                    <Mail
                      className="text-white/70 group-hover:text-white transition-colors duration-200 mr-3"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="อีเมล"
                      value={form.email}
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
                      onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                      className="focus:outline-none hover:opacity-80 transition-opacity"
                    >
                      {showPassword.password ? (
                        <EyeOff
                          className="text-white/70 hover:text-white"
                          size={20}
                          onClick={setShowPassword}
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

                <div className="relative group">
                  <div className="flex items-center bg-white/10 rounded-2xl p-3.5 border border-white/20 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 focus-within:border-white/40 focus-within:bg-white/15">
                    <Lock
                      className="text-white/70 group-hover:text-white transition-colors duration-200 mr-3"
                      size={20}
                    />
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="ยืนยันรหัสผ่าน"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none placeholder-white/50 text-white font-light"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                      className="focus:outline-none hover:opacity-80 transition-opacity"
                    >
                      {showPassword.confirmPassword ? (
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

              <div className="flex items-center space-x-3 p-4 transition-all duration-300">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 checked:bg-blue-500 hover:border-white/50 transition-all duration-200"
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors duration-200"
                >
                  ยอมรับ{" "}
                  <a
                    href="#"
                    className="text-blue-300 hover:text-blue-200 underline decoration-dotted"
                  >
                    เงื่อนไขและข้อตกลง
                  </a>
                </label>
              </div>

              <button
                ref={SubmitBtn}
                type="submit"
                className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-2xl font-medium
                   hover:translate-x-1   transition-all duration-300
                   transform "
              >
                สมัครสมาชิก
              </button>
            </form>
          </div>
        </div>
      </div>

</>

)
}