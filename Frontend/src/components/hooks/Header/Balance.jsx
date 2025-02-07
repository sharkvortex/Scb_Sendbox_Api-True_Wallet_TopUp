import { useState, useEffect } from "react"
import axios from "../../axios.jsx"
export default function Balance() {
    const [Balance   ,setBalance   ] = useState(0);
    useEffect(()=>{
        const getBalance = async()=>{
            try{
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/isLogin`
                  );
                  setBalance(response.data.balance)
            }catch(error){
                console.log(error)
            }
        }
        getBalance();
    },[])

  return (
<>
<span className="ml-0.5 text-sm text-blue-300">{parseFloat(Balance).toFixed(2)} ฿</span>

</>

)
}