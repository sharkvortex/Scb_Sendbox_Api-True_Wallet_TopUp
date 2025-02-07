import { useState, useEffect } from "react";

const CountdownTimer = ({ time, onTimeout }) => {
  const targetDate = new Date(time).getTime();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft("หมดเวลา || หากสแกนชำระแล้วโปรดรอ");

        if (typeof onTimeout === "function") {
          onTimeout();  
        }
        
        return;
      }

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes} นาที ${seconds} วินาที`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onTimeout]);

  return timeLeft; 
};

export default CountdownTimer;
