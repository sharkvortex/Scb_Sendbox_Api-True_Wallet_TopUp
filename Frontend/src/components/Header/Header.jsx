import { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SkeletonLoader from "../Skeleton/SkeletonLoading.jsx";
import Navigation from "./Navigation.jsx";
import Profile from "./Profile.jsx";
export default function Header({LoginBtn,RegisterBtn}) {
  const [isLoading, setisLoading] = useState(false);
  
 
  return (
    <>
    {isLoading ? (
      <SkeletonLoader Header={isLoading} />
    ) : (
      <header className="w-full relative h-[70px] text-sm lg:px-[50px] bg-gradient-to-r from-gray-900/50 via-blue-900/50 to-purple-900/50 text-white flex justify-between items-center shadow-2xl z-50 px-4">
        
        
        <Navigation/>
        <Profile LoginBtn={LoginBtn} RegisterBtn={RegisterBtn}/>
        
          </header>
    )}
      </>
  );

}
