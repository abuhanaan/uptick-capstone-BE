import React from "react";

export const Mission = () => {
  return (
    <div className="text-deep">
      <div className="container flex flex-col justify-center mx-1 sm:py-6 lg:py-6 lg:flex-row lg:justify-between">
        <div className="flex flex-row">
          <div className="flex flex-row space-y-4 sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4 lg:justify-start">
            <img
              src="/Mask_Group.png"
              alt="Uptick Talent"
              className="object-contain mb-2 h-85 sm:h-90 lg:h-96 xl:h-112 2xl:h-128"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col justify-center p-4 text-left rounded-sm lg:max-w-2xl xl:max-w-2xl lg:text-left">
            <h1 className="text-2xl font-semibold sm:text-4xl">Our Mission</h1>
            <p className="mt-1 mb-2 text-lg sm:mb-4">
              Incubate the next generation of great technology and bussiness
              talent
            </p>{" "}
            <h1 className="text-2xl font-semibold sm:text-4xl">Our Vision</h1>
            <p className="mt-1 mb-2 text-lg sm:mb-12">
              To empower 1 Million African students and youths with Digital
              Marketing skills by 2024 through trainings, resources and access
              to opportunities.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="/Uptick.png"
            alt="Uptick Talent"
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};
