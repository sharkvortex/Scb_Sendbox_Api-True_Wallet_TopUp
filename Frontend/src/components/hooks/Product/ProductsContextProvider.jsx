import { useState, useEffect, createContext } from "react";
import axios from "../../axios.jsx";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", category: "" });
  // Get Products
  useEffect(() => {
    const GetProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`,
          {
            params: {
              search: filters.search || "",
              category: filters.category !== "*" ? filters.category : "",
            },
          }
        );
        if (response.status === 200) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    GetProducts();
  }, [filters]);
// -----------------------------------
  const [Allcategory , setAllcategory] = useState([]);
  // Get Category
  useEffect(()=>{
    const GetCategory = async() =>{
      try{
        setIsLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/category`)
         
          if(response.status === 200){
            setAllcategory(response.data.category)
          }
      }catch(error){
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }
    GetCategory();
  },[])

  
  return (
    <ProductsContext.Provider value={{ Products, isLoading ,setFilters ,Allcategory }}>
      {children}
    </ProductsContext.Provider>
  );
}
