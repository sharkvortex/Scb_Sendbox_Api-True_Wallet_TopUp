import axios from "../../axios.jsx"
import React, { useState, useEffect } from "react";
export default function GetHotSale() {
     const [hotProducts, setHotProducts] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const GetHotProducts = async () => {
            
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/hot-products`
            );
            if (response.status === 200) {
              setHotProducts(response.data.products);
            }
          } catch (error) {
            console.error("Error fetching hot products:", error);
          } finally {
            setIsLoading(false);
          }
        };
        GetHotProducts();
      },[]);

    return  {hotProducts, isLoading};
}