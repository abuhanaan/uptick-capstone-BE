"use client";

import Image from "next/image";
import React, { useState } from "react";

interface TalentBeginner {
  image: string;
  title: string;
  description: string;
  learnMore: string;
}
interface TalentTech {
  image: string;
  title: string;
  description: string;
  learnMore: string;
}
interface TalentBusiness {
  image: string;
  title: string;
  description: string;
  learnMore: string;
}
interface TalentMap {
  image: string;
  title: string;
  description: string;
  learnMore: string;
}

interface Tab {
  title: string;
  content: TalentBeginner[] | TalentTech[] | TalentBusiness[] | TalentMap[];
}

const Programs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(
    "1. Uptick Talent Beginner"
  );

  const talentBeginner: TalentBeginner[] = [
    {
      image: "./program.svg",
      title: "Programs for Secondary Schools",
      description:
        "Ignite young minds with our technology and business training designed for secondary school students. Empower the leaders of tomorrow!.",
      learnMore: "Learn More",
    },
  ];

  const talentTech: TalentTech[] = [
    {
      image: "./program.svg",
      title: "Talent Technology Program Overview",
      description:
        "Dive into our startup incubation programs, where expert mentors are ready to guide you on your entrepreneurial journey. Access application forms to kickstart your startup dreams.",
      learnMore: "Learn More",
    },
  ];

  const talentBusiness: TalentBusiness[] = [
    {
      image: "./program.svg",
      title: "Startup Incubation Programs",
      description:
        "Dive into our startup incubation programs, where expert mentors are ready to guide you on your entrepreneurial journey. Access application forms to kickstart your startup dreams.",
      learnMore: "Learn More",
    },
  ];
  const talentMap: TalentMap[] = [
    {
      image: "./program.svg",
      title: "Talent Placement Services",
      description:
        "Explore our talent placement services and success stories of non-technical talent. Whether you're a company or an individual, find the resources you need.",
      learnMore: "Learn More",
    },
  ];

  const tabs: Tab[] = [
    {
      title: "1. Uptick Talent Beginner",
      content: talentBeginner,
    },
    {
      title: "2. Uptick Talent Tech",
      content: talentTech,
    },
    {
      title: "3. Uptick Talent Business",
      content: talentBusiness,
    },
    {
      title: "4. Uptick Talent Map",
      content: talentMap,
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container bg-white text-black">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-center font-montserrat font-semibold">
          Our Programs
        </h2>
      </div>
      <div className="flex flex-row p-4 border-2 rounded-lg m-6">
        <div className="tab-title  md:w-full mx-auto flex items font-montserrat -center justify-center flex-col border-r-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-title cursor-pointer text-center text-lg font-bold p-3 font-montserrat ${
                activeTab === tab.title
                  ? "active-tab text-white bg-black m-2 text-center rounded-lg font-montserrat"
                  : ""
              }`}
              onClick={() => handleTabClick(tab.title)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="tab-content  md:w-full p-4 pl-8">
          {tabs
            .find((tab) => tab.title === activeTab)
            ?.content.map((item, index) => (
              <div key={index} className="">
                <div className="flex justify-center items-center ">
                  <Image src={item.image} alt="" width={80} height={80} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-montserrat pb-2 pt-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 font-montserrat font-medium text-base leading-6">
                    {item.description}
                  </p>
                  <a
                    href={item.learnMore}
                    className="text-blue-500 hover:underline font-montserrat"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
