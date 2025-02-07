import React, { useState, useEffect, useContext } from "react";
import { Search } from "lucide-react";
import { ProductsContext } from "../hooks/Product/ProductsContextProvider.jsx";


export default function SearchProduct() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("*");
  const [selectedCategoryName, setSelectedCategoryName] = useState("เลือกหมวดหมู่");
  const { setFilters , Allcategory } = useContext(ProductsContext); 
  const categories = Allcategory;
  

 
  useEffect(() => {
    setFilters({ search: searchText, category: selectedCategoryId });
  }, [searchText, selectedCategoryId, setFilters]);

  return (
    <>
      <div className="relative w-full group">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="ค้นหาสินค้า..."
          className="w-full py-3 px-4 rounded-xl text-white 
                   placeholder:text-gray-400 bg-gray-800/60 backdrop-blur-sm 
                   border border-gray-700/50 
                   focus:border-blue-500/50 focus:bg-gray-700/60 focus:ring-2 
                   focus:ring-blue-500/20 focus:outline-none
                   transform transition-all duration-300 ease-in-out
                   hover:bg-gray-700/40 hover:border-gray-600/50"
        />
        <Search
          size={18}
          className={`absolute top-6 right-4 transform -translate-y-1/2 w-[30px] h-[30px] p-1.5 hover:bg-gray-800 rounded-full
                    transition-colors duration-300 hover:cursor-pointer hover:text-blue-400 
                    ${isFocused ? "text-blue-400" : "text-gray-400"}`}
        />
      </div>

      <div className="relative w-full flex justify-end">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="min-w-[200px] py-3 px-4 rounded-xl text-white 
                   bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 
                   focus:border-blue-500/50 focus:bg-gray-700/60 
                   focus:ring-2 focus:ring-blue-500/20 focus:outline-none
                   transform transition-all duration-300 ease-in-out
                   hover:bg-gray-700/40 hover:border-gray-600/50
                   flex items-center justify-between"
          >
            <span>{selectedCategoryName || "เลือกหมวดหมู่"}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-full max-h-[200px] 
                   overflow-y-auto rounded-xl shadow-lg bg-gray-800/60 backdrop-blur-sm 
                   border border-gray-700/50 focus:outline-none z-50"
            >
              <div>
                <div
                  onClick={() => {
                    setSelectedCategoryId("*");
                    setSelectedCategoryName("เลือกหมวดหมู่");
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700/40 cursor-pointer"
                >
                  เลือกหมวดหมู่
                </div>
                {categories.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedCategoryId(item.id);
                      setSelectedCategoryName(item.name);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700/40 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
