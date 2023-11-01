import Image from "next/image";
import React from "react";

interface Potential {
  icon?: string | undefined;
  title: string;
  description: string;
}

interface Experiences {
  icon?: string | undefined;
  title: string;
  description: string;
}

interface Mentor {
  icon?: string | undefined;
  title: string;
  description: string;
}

interface Opportunities {
  icon?: string | undefined;
  title: string;
  description: string;
}

interface Group {
  content: Potential[] | Experiences[] | Mentor[] | Opportunities[];
}

const Value = () => {
  const potential: Potential[] = [
    {
      icon: "./potential.svg",
      title: "Unlock Your Potential",
      description:
        "Join our programs and gain the skills and knowledge needed to excel in the tech and business world.",
    },
  ];

  const experiences: Experiences[] = [
    {
      icon: "./experience.svg",
      title: "Real-World Experience",
      description:
        "Get hands-on experience through our programs, setting you up for success.",
    },
  ];

  const mentor: Mentor[] = [
    {
      icon: "./mentor.svg",
      title: "World-Class Mentors:",
      description:
        "Benefit from mentorship by industry experts and investors from across the globe.",
    },
  ];

  const opportunities: Opportunities[] = [
    {
      icon: "./opportunities.svg",
      title: "Diverse Opportunities",
      description:
        "Explore programs tailored to your interests, whether you're a beginner or an experienced professional.",
    },
  ];

  const groups: Group[] = [
    {
      content: potential,
    },
    {
      content: experiences,
    },
    {
      content: mentor,
    },
    {
      content: opportunities,
    },
  ];

  return (
    <div className="container bg-white text-black font-montserrat pt-10 pb-20">
      <div
        className="absolute left-0 top-100 w-full h-full bg-cover bg-left"
        style={{ backgroundImage: 'url("/your-background-image.jpg")' }}
      >
        <Image src="./pattern.svg" alt="" width={100} height={100} />
      </div>
      <h1 className="text-2xl font-bold text-left p-2">
         Why Choose Uptick Talent?
      </h1>
      <div className="flex flex-row items-center justify-center">
        <div className="w-5/12 md:w-1/2 p-4">
          <Image
            src="./value.svg"
            alt=""
            height={150}
            width={150}
            className="w-full hidden md:block"
          />
        </div>
        <div className="w-7/12 md:w-full flex flex-col items-center justify-center">
          <div className="flex flex-wrap ">
            {groups.map((group, index) => (
              <div key={index} className="w-full md:w-1/2 p-2">
                {group.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col items-start ">
                    <Image
                      src={item.icon}
                      alt=""
                      width={35}
                      height={35}
                      className="shadow-md p-2"
                    />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="font-sm text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;
