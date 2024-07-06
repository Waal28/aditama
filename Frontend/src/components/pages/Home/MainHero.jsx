import { useState, useEffect } from "react";
import constants from "../../../../constants";

export default function MainHero() {
  const { img_carousel_landing_page } = constants;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % img_carousel_landing_page.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [img_carousel_landing_page.length]);

  return (
    <div
      id="beranda"
      className="relative w-full mb-20 overflow-hidden scroll-margin-top"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {img_carousel_landing_page.map((img, i) => (
          <div key={`slide${i}`} className="min-w-full">
            <img src={img} className="w-full lg:h-[400px] h-72 object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button
          className="btn btn-circle"
          onClick={() =>
            setCurrentSlide(
              currentSlide > 0
                ? currentSlide - 1
                : img_carousel_landing_page.length - 1
            )
          }
        >
          ❮
        </button>
        <button
          className="btn btn-circle"
          onClick={() =>
            setCurrentSlide(
              (currentSlide + 1) % img_carousel_landing_page.length
            )
          }
        >
          ❯
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-2">
        {img_carousel_landing_page.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
