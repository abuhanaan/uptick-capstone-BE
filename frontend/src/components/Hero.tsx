import React from "react";

export const Hero = () => {
  return (
    <div className="text-deep">
      <div className="container flex flex-col justify-center p-2 mx-2 sm:py-2 lg:py-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-4 text-left  sm:ml-2 lg:ml-16 rounded-sm lg:max-w-2xl xl:max-w-2xl lg:text-left">
          <h1 className="text-2xl font-semibold sm:text-4xl">
            Discover Your Potential with Uptick Talent
          </h1>
          <p className="mt-2 mb-2 text-lg sm:mb-12">
            At Uptick Talent, we are on a mission to incubate the next
            generation of great technology and business talent. Our innovative
            programs empower individuals to thrive in the ever-evolving world of
            tech and entrepreneurship.
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-center text-lg font-semibold rounded dark:bg-violet-400 dark:text-blue-950">
              Learn About Us
            </a>
          </div>
        </div>
        <div className="flex items-center  lg:bg-hero-pattern bg-no-repeat bg-right-top  justify-center p-6 mt-8 lg:mr-4 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="/HeroImage.png"
            alt="HeroImage"
            className="object-contain object-left-bottom h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};
