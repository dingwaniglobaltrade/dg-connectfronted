"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dropdown from "@/icons/dropdown.svg";
import Profile from "@/icons/profile.svg";
import Setting from "@/icons/setting.svg";
import Signout from "@/icons/signoutdrop.svg";
import { GiShoppingCart } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import { io } from "socket.io-client";

import {
  fetchCurrentUser,
  logoutCurrentUser,
} from "@/app/store/Actions/loginAction";
import { fetchCartData } from "@/app/store/Actions/cartAction";
import NotificationDrawer from "../notification/notiicationcom";
import S3Image from "@/app/component/useable/S3Image";

const Upernavbar = ({ pagename }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef();

  const loginState = useSelector((state) => state.login);
  const admin = loginState?.admin;
  const id = admin?.id;
  const userType = admin?.userType;
  // 2. Handle user dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Auto-fetch user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !admin) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // 4. Cart data fetch
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (!id) return;
    if (userType !== "retailer" && userType !== "distributor") return;
    fetchAllCartItems();
  }, [dispatch, id, userType]);

  const fetchAllCartItems = async () => {
    try {
      const result = await dispatch(fetchCartData(id));
      if (result?.data) {
        const items = result.data.cartItems || [];
        setCartItems(items);
      }
    } catch (error) {
      console.log("Error fetching Cart Items", error);
    }
  };

  const cartpage = async () => {
    await fetchAllCartItems();
    router.push("/viewpages/cart");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    await dispatch(logoutCurrentUser());
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="h-[12%] w-full 2xl:flex xl:flex lg:flex hidden gap-4 items-center justify-between pr-10 shadow-md bg-white">
      <div className="font-semibold text-[23px] text-texthearder pl-8">
        {pagename}
      </div>

      <div className="flex items-center gap-8" ref={dropdownRef}>
        {/* 🔔 Notification Icon */}
        <div
          className="w-[40px] h-[40px] bg-[#FFFAF1] flex justify-center items-center rounded-[10px] cursor-pointer relative"
          onClick={() => setShowNotifications(true)}
        >
          <IoMdNotificationsOutline className="text-[24px] text-[#FFA412]" />
        </div>

        {/* 📝 Drawer Component */}
        <NotificationDrawer
          show={showNotifications}
          onClose={() => setShowNotifications(false)}
        />

        {(userType === "retailer" || userType === "distributor") && (
          <div
            className="bg-[#FFFAF1] rounded-[10px] cursor-pointer relative w-[50px] h-[50px] flex items-center justify-center"
            onClick={cartpage}
          >
            <GiShoppingCart className="font-bold text-[32px]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        )}

        {/* 👤 Profile */}
        <div className="flex gap-4 relative">
          {/* IMAGE SECTION */}
          {(() => {
            let fileName = null;

            if (admin?.userType === "retailer") {
              fileName = admin?.shopImage;
            } else if (admin?.userType === "distributor") {
              fileName = admin?.profileImage;
            }

            return (
              <div className="w-[50px] h-[50px] rounded-[12px] overflow-hidden bg-gray-200">
                <S3Image
                  s3Key={fileName}
                  alt="User image"
                  className="w-full h-full object-cover"
                  fallback="/default-user.png"
                />
              </div>
            );
          })()}

          <div className="flex flex-col py-1">
            <div className="text-texthearder font-medium font-[16px]">
              {admin?.name || "--"}
            </div>
            <div className="text-pgrey font-normal font-[14px]">
              {admin?.userType || "----"}
            </div>
          </div>

          <div className="pt-4 cursor-pointer" onClick={toggleDropdown}>
            <Image src={dropdown} alt="Drop down" height={10} width={10} />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[122%] right-0 w-[150px] bg-white shadow-lg border-t-[2px] border-grey-300 z-50">
              <ul className="flex flex-col text-sm text-black">
                <Link href={`/viewpages/profile/${userType}/${id}`}>
                  <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-4">
                    <Image src={Profile} alt="Profile" />
                    Profile
                  </li>
                </Link>
                <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-4">
                  <Image src={Setting} alt="Settings" />
                  Settings
                </li>
                <li
                  onClick={handleLogout}
                  className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-4"
                >
                  <Image src={Signout} alt="Signout" />
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upernavbar;
