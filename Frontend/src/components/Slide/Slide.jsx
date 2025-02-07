import { useState, useEffect } from "react";
import SkeletonLoader from "../Skeleton/SkeletonLoading.jsx";
export default function Slide() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    const slides = [
      {
        id: 1,
        image: "https://beebom.com/wp-content/uploads/2018/11/Best-mmorpg-featured.jpg",
      },
      {
        id: 2,
        image: "https://play-lh.googleusercontent.com/2V50kxeXUT3G2UJj9_hdCNh8LJyMV4XnhlW7gKaR_uEAlRS94NkUsQEjeR3CXDxSVxg",
      },
      {
        id: 3,
        image: "https://images.ctfassets.net/nwksj2ft7iku/2lZIDWs2kHn54UTpyGaS6e/2ee23e41ebe8d9e5310ec3b8b74e3c4d/240822_RAVEN_TopBannerImage_WBG_DS_1440x720_EN.png",
      },
      {
        id: 4,
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1858120/header.jpg?t=1735395544",
      },
      {
        id: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpb0BnwSPKTvhcLffcpNsgIGGSP77gFr4H2A&s",
      },
    ];
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
  
      return () => clearInterval(interval);
    }, [currentSlide]);
  
  return (
<>
{isLoading ? (
        <SkeletonLoader Slide={isLoading} />
      ) : (
        <div className="px-3">
          <div className="relative my-3 w-full flex justify-center items-center h-[150px] sm:h-[200px] mx-auto max-w-4xl rounded  overflow-hidden ">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-full relative">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="w-full h-[200px] sm:h-[250px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 cursor-pointer rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white shadow-lg scale-110"
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
</>

)
}