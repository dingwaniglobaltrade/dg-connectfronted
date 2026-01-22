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
import LogoImage from "@/icons/dgtlogo.svg";

const Midcom = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [isRedirecting, setIsRedirecting] = useState(false); // new
  const [isLoading, setIsLoading] = useState(false);

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

    // Prevent multiple requests
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await dispatch(asyncfetchlogin(formData));
      const result = response?.payload || response;

      if (result?.token && typeof window !== "undefined") {
        localStorage.setItem("token", result.token);
      }

      if (result.success) {
        toast.success("Login Successful");
        setIsRedirecting(true);

        const role = formData.userType.toLowerCase();
        let redirectPath = "/viewpages/productpages";

        if (role === "distributor") redirectPath = "/viewpages/productpages";
        else if (role === "salesperson") redirectPath = "/salespersonpages";
        else if (role === "retailer") redirectPath = "/viewpages/productpages";

        setTimeout(() => {
          router.push(redirectPath);
        }, 1500);
      } else {
        toast.error(result.message || "Login failed");
        setError(result.message || "Login failed");
        setIsLoading(false); // 🔓 unlock button
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error(err);
      setError("Something went wrong");
      setIsLoading(false); // 🔓 unlock button
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
    <>
      <div className="hidden md:flex h-screen w-screen bg-white text-black">
        {/* Left (Form) Section */}
        <div className="w-full lg:w-1/2 px-10 flex flex-col justify-center items-center">
          <Image
            className="w-[120px] h-[120px]"
            src={LogoImage}
            alt="Logo Image"
          />
          <div className="flex  flex-col justify-center items-center ">
            {/* STEP 1 – USER TYPE */}
            {step === 1 && (
              <div className="flex flex-col items-center gap-5 max-w-md text-center">
                <h2 className="text-2xl font-bold ">Select Account Type</h2>

                <p className="text-sm">
                  Registration for retailers, distributors, and event partners
                  is managed by{" "}
                  <span className="font-semibold text-primary">
                    Dingwani Connects
                  </span>
                  . Login access is granted only after verification and
                  approval.
                </p>

                <div className="flex gap-4">
                  {["distributor", "retailer", "salesperson"].map((role) => (
                    <button
                      key={role}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, userType: role }))
                      }
                      className={`px-4 py-2 rounded text-white ${
                        formData.userType === role
                          ? "bg-primary"
                          : "bg-gray-400"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!formData.userType}
                  onClick={() => setStep(2)}
                  className={`px-6 py-2 rounded text-white font-semibold ${
                    formData.userType
                      ? "bg-primary"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* STEP 2 – LOGIN FORM */}
            {step === 2 && (
              <>
                <div className="text-[25px] font-bold mb-4">LOGIN</div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex">
                    <span className="px-2 bg-[#F1F0FE] flex items-center rounded-l">
                      <Image src={ProfileIcon} alt="icon" className="h-7 w-7" />
                    </span>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-[350px] px-2 py-2 bg-[#F1F0FE] rounded-r"
                    />
                  </div>

                  <div className="flex">
                    <span className="px-2 bg-[#F1F0FE] flex items-center rounded-l">
                      <Image
                        src={PasswordIcon}
                        alt="icon"
                        className="h-7 w-7"
                      />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      className="w-[350px] px-2 py-2 bg-[#F1F0FE] rounded-r"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-2 rounded"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <button
                  onClick={() => setStep(1)}
                  className="mt-3 text-sm text-primary underline"
                >
                  ← Change user type
                </button>
              </>
            )}
          </div>
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
            <div className="2xl:flex xl:flex lg:flex md:hidden hidden flex-col w-full h-full justify-start justify-start items-start text-white font-bold text-[28px]">
              <p>Dingwani Connects</p>
              <p>Together With </p>
              <p>Every Trade</p>
              <p> Partner.</p>
            </div>
          </div>
          <div className="xl:absolute lg:absolute  z-[50]  lg:top-[29%] md:top-[29%] top-[18%] lg:right-[23%] md:right-[22%] right-[14%] w-[40%]">
            <Image src={Charchater} alt="Character" width={500} height={500} />
          </div>
        </div>
      </div>

      {/* //mobile view only */}
      {/* ================= MOBILE VIEW ================= */}
      <div className="flex md:hidden min-h-screen w-screen items-center justify-center">
        {/* 🔄 LOADING STATE */}
        {isLoading ? (
          <div className="w-screen h-screen bg-white">
            <div className="flex flex-col w-full h-full absolute ">
              <div
                className="items-right text-end w-full font-semibold text-primary
            relative top-28"
              >
                We are connecting you...
              </div>
              <Image
                src={Charchater}
                alt="Loading Character"
                className="w-auto max-w-[320px]
               items-left text-start pr-10 relative top-24"
                priority
              />
            </div>
          </div>
        ) : (
          /* LOGIN FORM */

          <div className="w-screen h-screen px-5 flex flex-col justify-center">
            <Image
              src={LogoImage}
              alt="Logo"
              className="w-[170px] h-[60px] mx-auto mb-4"
            />
            <h1 className="text-center font-semibold mb-8 text-primary">
              {" "}
              Dingwani Connects Together With Every Trade Partner.
            </h1>
            <div className="text-center bg-white px-2 py-5 rounded-[10px] border-[1px] border-grey-50 shadow-lg">
              {step === 1 && (
                <div className="flex flex-col items-center gap-5 max-w-md text-center">
                  <h2 className="text-2xl font-bold">Select Account Type</h2>

                  <p className="text-sm">
                    Registration for retailers, distributors, and event partners
                    is managed by{" "}
                    <span className="font-semibold text-primary">
                      Dingwani Connects
                    </span>
                    . Login access is granted only after verification and
                    approval.
                  </p>

                  <div className="flex gap-3">
                    {["distributor", "retailer", "salesperson"].map((role) => (
                      <button
                        key={role}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, userType: role }))
                        }
                        className={`px-2 py-2 rounded text-white ${
                          formData.userType === role
                            ? "bg-primary"
                            : "bg-gray-400"
                        }`}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={!formData.userType}
                    onClick={() => setStep(2)}
                    className={`px-6 py-2 rounded text-white font-semibold ${
                      formData.userType
                        ? "bg-primary"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* STEP 2 – LOGIN FORM */}
              {step === 2 && (
                <>
                  <h2 className="text-[22px] font-bold text-primary mb-6">
                    Login
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                      <span className="px-2 bg-[#F1F0FE] flex items-center rounded-l">
                        <Image
                          src={ProfileIcon}
                          alt="icon"
                          className="h-7 w-7"
                        />
                      </span>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-[350px] px-2 py-2 bg-[#F1F0FE] rounded-r"
                      />
                    </div>

                    <div className="flex">
                      <span className="px-2 bg-[#F1F0FE] flex items-center rounded-l">
                        <Image
                          src={PasswordIcon}
                          alt="icon"
                          className="h-7 w-7"
                        />
                      </span>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-[350px] px-2 py-2 bg-[#F1F0FE] rounded-r"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-2 rounded"
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </form>

                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-sm text-primary underline"
                  >
                    ← Change user type
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Midcom;
