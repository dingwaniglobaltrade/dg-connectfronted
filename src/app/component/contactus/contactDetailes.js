import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";

const contactDetailes = () => {
  return (
    <div className="h-[90%] w-full lg:px-7 md:px-5 px-2 py-4 bg-[#f8f9fa] flex flex-col lg:gap-20 md:gap-20 gap-10 justify-center items-center">
      <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 gap-2 px-4">
        <div className="lg:w-[48%] md:w-[48%] w-[95%] flex flex-col gap-6 ">
          <h1 className="font-semibold text-xl text-primary mt-10">
            CONTACT INFORMATION
          </h1>
          <p className="text-[14px] text-gray-500">
            Thank you for your interest in Dingwani Foods! We value your
            feedback, inquiries, and suggestions. Please feel free to reach out
            to us using the contact information provided below: For wholesale
            inquiries, partnerships, or any other business-related matters,
            please contact our dedicated team through our official channels
          </p>
          <p className="text-[14px] text-gray-500">
            If you face any kind of{" "}
            <span className="text-black font-medium">issue</span>, have a{" "}
            <span className="text-black font-medium">question</span>, or would
            like to share your{" "}
            <span className="text-black font-medium">feedback</span>, we're here
            to help!
          </p>
          <h2 className="font-medium text-[14px]">
            Contact Number :
            <a
              href="https://wa.me/918269968097"
              target="_blank"
              className="text-primary font-semibold underline ml-1 text-[15px]"
            >
              +91 8269968097
            </a>
          </h2>
          <h3 className="font-medium text-[14px]">
            {" "}
            Email :
            <a
              href="mailto:info@dingwanifoods.com"
              target="_blank"
              className="text-primary underline ml-1 text-[15px] font-semibold"
            >
              info@dingwanifoods.com
            </a>
          </h3>
          <div className="flex flex-row gap-4">
            <a
              href="https://wa.me/918269968097"
              target="_blank"
              className="px-2 py-2 text-[24px] bg-white rounded-full hover:bg-primary hover:text-white"
            >
              <RiWhatsappFill />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61575989853302"
              target="_blank"
              className="px-2 py-2 text-[24px] bg-white rounded-full hover:bg-primary hover:text-white"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/dingwani_foods/"
              target="_blank"
              className="px-2 py-2 text-[24px] bg-white rounded-full hover:bg-primary hover:text-white"
            >
              <RiInstagramFill />
            </a>
            <a
              href="https://www.linkedin.com/company/dingwani-foods/?viewAsMember=true"
              target="_blank"
              className="px-2 py-2 text-[24px] bg-white rounded-full hover:bg-primary hover:text-white"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="lg:w-[50%] md:w-[50%]  w-[95%]">
          <div className="w-[100%] h-[400px] mt-10 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5459805612077!2d75.78147127504177!3d22.63342343073886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962f900147d42a7%3A0x6ba48bd472276d56!2sA%20to%20Z%20Industrial%20Services!5e0!3m2!1sen!2sin!4v1760423542116!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex gap-10 text-[14px] font-semibold text-primary">
        <div className="cursor-pointer">Terms & Condition</div>
        <div className="cursor-pointer">Privacy Policy</div>
        <div className="cursor-pointer">Refund Policy</div>
      </div>
    </div>
  );
};

export default contactDetailes;
