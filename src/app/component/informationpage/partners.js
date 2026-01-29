import React from "react";
import { FaHandshake } from "react-icons/fa6";
import DGTLogo from "@/icons/informationpage/logoDGT.png";
import DingwaniFoods from "@/icons/informationpage/dingwani-foods-logo.png";
import AtoZlogo from "@/icons/informationpage/atoz-logo.png";
import Azislab from "@/icons/informationpage/azis-labs-logo.png";
import Image from "next/image";
import Link from "next/link";

const partnersData = [
  {
    id: 1,
    logo: AtoZlogo,
    name: "A to Z Industrial Services",
    description:
      "A To Z Industrial Services provides the best range of food-grade seaweed testing, packaged drinking water plant testing laboratory & other services with effective and timely delivery.",
    link: "https://atozindustrialservices.in/",
    view: "View More →",
  },
  {
    id: 2,
    logo: DingwaniFoods,
    name: "Dingwani foods",
    description:
      "Dingwani Foods is a snack manufacturing brand specializing in crispy wafers, choco-coated treats, peanuts, and namkeen. Crafted with quality ingredients and bold flavors, our wide range of snacks is made to delight every taste and moment.",
    link: "/",
    view: "View More →",
  },
  {
    id: 3,
    logo: Azislab,
    name: "Azis Labs",
    description:
      "AZIS LABS is committed to provide our services with a focus on understanding our client’s individual exceeding their expectations. Hard work, precise interpretations and timely results are the foundation of our organization’s philosophy & mission.",
    link: "/",
    view: "View More →",
  },
  {
    id: 4,
    logo: DGTLogo,
    name: "Dingwani Global Trade",
    description:
      "Dingwani Global Trade is an India-based export and trading company committed to connecting the world with India’s best-quality products",
    link: "https://dglobaltrade.com/",
    view: "View More →",
  },
];

const Partners = () => {
  return (
    <section className="w-full bg-[#27338945] px-4 sm:px-8 lg:px-24 py-16">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <FaHandshake className="text-4xl sm:text-5xl text-primary mb-2" />
        <h1 className="text-primary font-bold text-2xl sm:text-3xl lg:text-4xl cursor-pointer">
          Our Partners
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
        {partnersData.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col  gap-4 p-6 bg-white rounded-2xl shadow-md"
          >
            <div className="flex-shrink-0 flex justify-center">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-[160px] h-[140px] object-contain"
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                {partner.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {partner.description}
              </p>
              <Link
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-sm sm:text-base text-primary mt-3 leading-relaxed">
                  View More →
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
