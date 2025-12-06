"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Background from "@/icons/loginpagebg.png";
import Spark from "@/icons/spark.svg";
import Charchater from "@/icons/charachter.png";
import PasswordIcon from "@/icons/form/passwordinput.svg";
import ProfileIcon from "@/icons/form/profileinput.svg";
import UserRoleIcon from "@/icons/form/userRole.svg";
import { useDispatch } from "react-redux";
import { asyncfetchlogin } from "@/app/store/Actions/loginAction";
import { toast } from "react-toastify";

const Midcom = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false); // new

  const [formData, setFormData] = useState({
    email: "",
    userType: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await dispatch(asyncfetchlogin(formData));
      const result = response?.payload || response;

      const token = result.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      if (result.success) {
        toast.success("Login Successful");
        setIsRedirecting(true); // show loading screen

        const role = formData.userType.toLowerCase();
        let redirectPath = "/";

        if (role === "distributor") redirectPath = "/viewpages/productpages";
        else if (role === "salesperson") redirectPath = "/salespersonpages";
        else if (role === "retailer") redirectPath = "/viewpages/productpages";

        setTimeout(() => {
          router.push(redirectPath);
        }, 1500); // small delay to show spinner
      } else {
        toast.error(result.message || "Login failed. Please try again.");
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error("Login Error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // UI
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
        <p className="mt-4 text-sm text-gray-600">
          Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col-reverse md:flex-row lg:flex-row">
      {/* Left (Form) Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="text-[25px] font-bold mb-4">LOGIN</div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 text-sm mt-2 text-[13px]">
            <div className="flex flex-row">
              <span className="h-11 w-15 px-2 flex justify-center items-center bg-[#F1F0FE] rounded-s-[6px]">
                <Image
                  src={ProfileIcon}
                  alt="Profile Icon"
                  className="h-7 w-7"
                />
              </span>
              <input
                className="placeholder-[#000] text-[#1C1C1C] w-[370px] py-3 rounded-r-[6px] px-2 text-black bg-[#F1F0FE] outline-none"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-row">
              <span className="h-11 px-2 flex justify-center items-center bg-[#F1F0FE] rounded-s-[6px]">
                <Image
                  src={UserRoleIcon}
                  alt="User Role Icon"
                  className="h-7 w-7"
                />
              </span>
              <select
                className="w-[370px] py-2 rounded-r-[6px] px-1 text-black bg-[#F1F0FE] outline-none"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Role</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub-admin</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
                <option value="salesperson">Salesperson</option>
              </select>
            </div>

            <div className="flex flex-row items-center">
              <span className="h-11 px-2 flex justify-center items-center bg-[#F1F0FE] rounded-s-[6px]">
                <Image
                  src={PasswordIcon}
                  alt="Password Icon"
                  className="h-7 w-7"
                />
              </span>
              <input
                className="placeholder-[#000] bg-[#F1F0FE] text-[#1C1C1C] w-[370px] py-3 rounded-r-[6px] px-2 text-black outline-none"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-semibold text-white rounded-[8px] bg-primary"
              >
                Login Now
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Right (Visual) Section */}
      <div className="w-full lg:w-1/2 relative h-[400px] md:h-auto">
        <div className="absolute inset-0">
          <Image
            src={Background}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute flex top-[15%] lg:right-[30%] right-[10%] w-[80%] md:w-[60%] lg:w-[55%] lg:h-[70%] h-[60%] bg-[#9586f4] rounded-[20px] z-10 p-4">
          <div className="xl:flex lg:flex hidden w-16 h-16 bg-white rounded-full items-center justify-center lg:mt-[320px] mt-[10px]  -ml-12">
            <Image src={Spark} alt="spark icon" width={48} height={48} />
          </div>
          <div className="flex flex-col w-full h-full justify-start text-start items-start text-white font-bold text-[28px]">
            <p>Dingwani Connects</p>
            <p>Together With </p>
            <p>Every Trade</p>
            <p> Partner.</p>
            {/* <p>— Login Now!!!</p> */}
          </div>
        </div>
        <div className="xl:absolute lg:absolute  z-[50]  lg:top-[29%] md:top-[29%] top-[18%] lg:right-[23%] md:right-[22%] right-[14%] w-[40%]">
          <Image src={Charchater} alt="Character" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Midcom;
