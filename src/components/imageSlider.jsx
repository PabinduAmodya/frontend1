import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active image index

  return (
    <div className="w-full h-96 flex flex-col items-center relative">
      {/* Main Image */}
      <img
        src={images[activeIndex]}
        alt="Main Product"
        className="w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300"
      />

      {/* Thumbnail Image Slider */}
      <div className="w-full absolute bottom-4 px-4">
        <div className="w-full  bg-opacity-80 backdrop-blur-mg shadow-lg rounded-lg p-3 flex items-center justify-center space-x-3 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-110 border-2 ${
                activeIndex === index ? "border-amber-500 scale-110" : "border-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
