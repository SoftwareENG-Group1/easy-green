import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

interface SwipableTestimonialsProps {
  testimonials: Testimonial[];
}

const SwipableTestimonials = ({ testimonials }: SwipableTestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // Loop back to the first testimonial if we're at the last one
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length%3) );
  };

  const handlePrev = () => {
    // Loop back to the last testimonial if we're at the first one
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full py-8 bg-gray-50 text-[#114411]">
      <h2 className="max-w-lg mx-auto mt-2 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl">What Our Users Say</h2>
      <div className="relative mx-auto mt-10 max-w-7xl">
        {/* Testimonials Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 z-10 p-3 text-white bg-green-700 rounded-full hover:bg-[#114411]`}
            style={{ fontSize: "24px" }}
          >
            <ArrowBackIosNewIcon style={{ fontSize: "20px" }} />
          </button>

          {/* Testimonials */}
          <div className="flex w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-none w-full px-6 sm:w-1/3"
                  style={{ flex: "0 0 33.33%" }}
                >
                  <div className="py-6 bg-gray-100 rounded-lg shadow-lg px-14 hover:shadow-xl">
                    <p className="text-xl font-semibold">{testimonial.name}</p>
                    <p className="mt-3 text-lg text-gray-700">{testimonial.review}</p>
                    <div className="mt-4 text-xl text-yellow-500">
                      {"★".repeat(testimonial.rating)}
                      {"☆".repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`absolute right-0 z-10 p-3 text-white bg-green-700 rounded-full hover:bg-[#114411]`}
            style={{ fontSize: "24px" }}
          >
            <ArrowForwardIosIcon style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SwipableTestimonials;