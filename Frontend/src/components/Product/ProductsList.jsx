import React, { useState, useEffect, useContext } from "react";
import SkeletonLoader from "../Skeleton/SkeletonLoading.jsx";
import Searchproduct from "./Searchproduct.jsx";
import { ShoppingCart, CreditCard } from "lucide-react";

import { ProductsContext } from "../hooks/Product/ProductsContextProvider.jsx";
export default function ProductsList() {
  const { Products, isLoading } = useContext(ProductsContext);

  return (
    <>
      <section id="products" className="min-h-auto px-4 py-8 md:px-6">
        <div className="relative max-w-7xl mx-auto mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
            <Searchproduct />
          </div>
        </div>

        {isLoading ? (
          <SkeletonLoader ProductLoad={isLoading} />
        ) : (
          <>
            <div className="relative max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Products && Array.isArray(Products) && Products.length > 0
                ? Products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-800/40 h-full backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                    >
                      <div className="relative">
                        <div className="overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="absolute top-4 left-4 flex justify-between gap-2">
                          {product.discount > 0 && (
                            <div className="bg-gradient-to-r from-red-500 to-red-500/60 text-white px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <span className="text-sm font-medium">
                                -{product.discount}% OFF
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex-grow">
                          <h2 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors mb-2">
                            {product.name}
                          </h2>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-baseline justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                ฿
                                {(product.discount > 0
                                  ? parseFloat(product.price) *
                                    (1 - product.discount / 100)
                                  : parseFloat(product.price)
                                ).toFixed(2)}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-sm text-gray-400/50 line-through">
                                  ฿{parseFloat(product.price).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group">
                              <ShoppingCart
                                size={16}
                                className="transform group-hover:scale-110 transition-transform"
                              />
                              Add to Cart
                            </button>

                            <a
                              href={`/buy-product/${product.id}`}
                              className="flex-1"
                            >
                              <button className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group">
                                <CreditCard
                                  size={16}
                                  className="transform group-hover:scale-110 transition-transform"
                                />
                                Buy Now
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div>
              {(!Array.isArray(Products) || Products.length === 0) && (
                <div className="w-full min-h-[300px] flex justify-center items-center rounded mt-8">
                  <div className="flex flex-col items-center p-6 rounded-xl transform transition-all duration-500 ease-in-out hover:scale-105">
                    <i className="fa-solid fa-basket-shopping text-white text-6xl mb-4 animate-bounce"></i>
                    <span className="text-xl text-white font-semibold">
                      ไม่พบสินค้า
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
