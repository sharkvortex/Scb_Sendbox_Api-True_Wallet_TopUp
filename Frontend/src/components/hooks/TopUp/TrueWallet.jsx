import {useState } from "react";
import axios from '../../axios.jsx';

export default function TrueWallet() {
  const [loading , setLoading] = useState(false)
    const TopupTrueWallet = async (voucher_link) => {
      try {
        setLoading(true)
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/topup-truewallet`,
          { voucher_link } 
        );
        return res.data
      } catch (error) {
        throw error
      }finally{
        setLoading(false)
      }
    };
  return {TopupTrueWallet , loading};
}
