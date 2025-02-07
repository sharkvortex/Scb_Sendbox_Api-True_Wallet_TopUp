import { useState, useCallback } from "react";
import axios from "../../axios.jsx";

export default function useCheckpayment() {
  const userId = sessionStorage?.getItem('userId')
  const FetchcheckStatus = useCallback(async (ref1, ref2, acToken, requestUId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/status-qrcode-payment`, 
        {  
          reference1: ref1,
          reference2:ref2,
          authorization: acToken,
          requestUId: requestUId,
          userId:userId
        },
        {  
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      return res.data
    } catch (error) {
      console.error("Error fetching payment status:", error);
    }
  },); 

  return { FetchcheckStatus };
}
