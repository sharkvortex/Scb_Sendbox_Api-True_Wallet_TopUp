import { useState , useEffect } from "react"
import axios from "../../axios.jsx";
export default function Username({className}) {
    const [username , setUsername] = useState('Admin')

    useEffect(()=>{
        const getUsername = async()=>{
            try{
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/isLogin`
                  );
                  setUsername(response.data.username);
            }catch(error){
                console.log(error);
            }
            getUsername();
        }
    },[]);

  return (
<>
 <span className={`${className}`}>{username}</span>

</>

)
}