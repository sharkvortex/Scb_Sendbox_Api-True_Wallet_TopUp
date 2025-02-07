import { useState , useEffect } from "react"
import TrueWallet from "../../hooks/TopUp/TrueWallet"
export default function TrueMoneyTopUp() {
    const {TopupTrueWallet} = TrueWallet();
     const TopUpVoucher = async(voucher_link)=>{
        try{
            const response = await TopupTrueWallet(voucher_link)
            return response
        }catch(error){
            console.log(error);
        }
     }
  return {TopUpVoucher}
}