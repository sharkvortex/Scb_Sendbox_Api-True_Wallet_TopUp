import { Link } from "react-router-dom";
import { Home, GamepadIcon, Coins, X, Menu, Tags, Headset } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* Logo Name */}
      <div className="flex items-center space-x-4">
        {/* Btn Open Menu Moblie */}
        <div className="relative">
          <div
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="min-[1080px]:hidden cursor-pointer text-white focus:outline-none transform hover:scale-110 transition-transform"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        <Link to="/" className="flex items-center">
          <img
            src="https://png.pngtree.com/png-vector/20200615/ourmid/pngtree-white-video-game-controller-with-blue-circle-background-png-image_2256063.jpg"
            alt="Logo"
            className="w-10 h-10 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <span className="ml-3 text-xl font-bold hidden sm:block">
            Game Zone
          </span>
        </Link>
      </div>
      {/* Desktop Menu */}
      <nav   className="hidden  min-[1080px]:flex items-center justify-center gap-4">
        <div className="flex gap-4">
          {[
            { icon: Home, text: "หน้าหลัก", path: "/" },
            { icon: GamepadIcon, text: "สินค้า", path: "#products" },
            { icon: Coins, text: "เติมเงิน", path: "/topup" },
            { icon: Tags, text: "โปรโมชั่น", path: "/promotions" },
            { icon: Headset, text: "สนับสนุน", path: "/support" },
          ].map(({ icon: Icon, text, path }) =>
            path === "#products" ? (
              <a
                key={path}
                href={path}
                className="flex justify-center items-center space-x-2 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors duration-300 group"
              >
                <Icon
                  size={18}
                  className="text-blue-300 group-hover:text-white transition-colors"
                />
                <span className="group-hover:text-blue-300 transition-colors">
                  {text}
                </span>
              </a>
            ) : (
              <Link
                key={path}
                to={path}
                className="flex justify-center items-center space-x-2 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors duration-300 group"
              >
                <Icon
                  size={18}
                  className="text-blue-300 group-hover:text-white transition-colors"
                />
                <span className="group-hover:text-blue-300 transition-colors">
                  {text}
                </span>
              </Link>
            )
          )}
        </div>
      </nav>

      {/* Moblie Menu */}
      <div
        ref={menuRef}
        className={`min-[1080px]:hidden absolute left-0 top-[70px] rounded-b-sm overflow-hidden w-full bg-gray-800/90 shadow-lg transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-x-full opacity-0"
        } ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ zIndex: 1000 }}
      >
        {[
          { icon: Home, text: "หน้าหลัก", path: "/" },
          { icon: GamepadIcon, text: "สินค้า", path: "#products" },
          { icon: Coins, text: "เติมเงิน", path: "/topup" },
          { icon: Tags, text: "โปรโมชั่น", path: "/promotions" },
          { icon: Headset, text: "สนับสนุน", path: "/support" },
        ].map(({ icon: Icon, text, path }) =>
          path === "#products" ? (
            <a
              key={path}
              href={path}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors duration-300"
            >
              <Icon
                size={18}
                className="text-blue-300 group-hover:text-white transition-colors"
              />
              <span className="group-hover:text-blue-300 transition-colors">
                {text}
              </span>
            </a>
          ) : (
            <Link
              key={path}
              to={path}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon size={20} className="text-blue-300" />
              <span>{text}</span>
            </Link>
          )
        )}
      </div>
    </>
  );
}
