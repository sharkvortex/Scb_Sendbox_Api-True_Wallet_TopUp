import Header from "./components/Header/Header.jsx";
import Slide from "./components/Slide/Slide.jsx";
import HotSale from "./components/HotSale/HotSale.jsx";
import ProductsList from "./components/Product/ProductsList.jsx";
import { useEffect } from "react";
import ProductsContextProvider from "./components/hooks/Product/ProductsContextProvider.jsx";
export default function Index() {
  useEffect(() => {
    document.title = "GameZone";
  });
  return (
    <>
      <Header />
      <Slide />
      <HotSale />
      <ProductsContextProvider>
        <ProductsList />
      </ProductsContextProvider>
      
    </>
  );
}
