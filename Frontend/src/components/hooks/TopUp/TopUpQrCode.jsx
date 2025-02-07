import {useState } from "react";
import axios from '../../axios.jsx';

export default function TopUpQrCode() {
  const [qrloading , setQRLoading] = useState(false)
    const QrCodeRequest = async (amount) => {
      try {
        setQRLoading(true)
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/topup-qrPromptPay`,
          { amount } 
        );
        return res;
      } catch (error) {
        throw error
      }finally{
        setQRLoading(false)
      }
    };
  return {QrCodeRequest , qrloading};
}
