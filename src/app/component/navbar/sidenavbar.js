"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { logoutCurrentUser } from "@/app/store/Actions/loginAction";
import { fetchCartData } from "@/app/store/Actions/cartAction";
import SidenavItem from "./SidenavItem";
import { iconMap } from "@/app/utils/constants/iconMap";
import NotificationDrawer from "../notification/notiicationcom";

import LogoImage from "@/icons/dgtlogo.svg";
//import LogoImage from "@/icons/Logo.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";

const sidenavitems = [
  {
    label: "Dashboard",
    link: "/portalpages/dashboard",
    altLinks: {
      salesperson: "/salespersonpages",
      distributor: "/viewpages/productpages",
      salesperson: "/viewpages/productpages",
    },
    iconKey: "dashboard",
    roles: ["admin", "subadmin", "salesperson"],
  },
  {
    label: "Attendance",
    link: "/portalpages/attendance",
    altLinks: {
      salesperson: "/salespersonpages/salesperson-Attendance",
    },
    iconKey: "attendance",
    roles: ["admin", "subadmin", "salesperson"],
  },
  {
    label: "Orders",
    link: "/portalpages/orders",
    // altLinks: {
    //   retailer: "/retailer/orders",
    //   distributor: "/distributor/orders",
    //   salesperson: "/salesperson/order",
    // },
    iconKey: "orders",
    roles: ["admin", "subadmin", "distributor", "salesperson"],
  },
  {
    label: "Products",
    link: "/portalpages/allproduct",
    altLinks: {
      retailer: "/viewpages/productpages",
      distributor: "/viewpages/productpages",
      salesperson: "/viewpages/productpages",
    },
    iconKey: "products",
    roles: ["admin", "subadmin", "distributor", "retailer", "salesperson"],
  },
  {
    label: "My Orders",
    link: "/viewpages/my-orders",
    iconKey: "myorder",
    roles: ["retailer", "distributor"],
  },
  {
    label: "Inventory",
    link: "/portalpages/invetory",
    iconKey: "inventory",
    roles: ["admin", "subadmin"],
  },
  {
    label: "Salesperson",
    link: "/distributorPages/salesperson",
    iconKey: "staff",
    roles: ["distributor"],
  },
  {
    label: "Distributor",
    link: "/portalpages/distributor",
    iconKey: "warehouse",
    roles: ["admin", "subadmin"],
  },
  {
    label: "Retailers",
    link: "/portalpages/retailers",
    iconKey: "retailers",
    roles: ["admin", "subadmin", "distributor", "salesperson"],
  },
  {
    label: "Customers",
    link: "/portalpages/customer",
    iconKey: "customer",
    roles: ["admin", "subadmin"],
  },
  {
    label: "Staff Management",
    link: "/portalpages/staff",
    iconKey: "staff",
    roles: ["admin", "subadmin"],
  },
  {
    label: "Expenses",
    link: "/portalpages/expense",
    iconKey: "expense",
    roles: ["admin", "subadmin", "salesperson"],
  },
  {
    label: "Routes",
    link: "/portalpages/routes",
    altLinks: {
      distributor: "/distributorPages/routes",
    },
    iconKey: "routes",
    roles: ["admin", "distributor"],
  },
  {
    label: "Enquries",
    link: "/portalpages/enquries",
    iconKey: "expense",
    roles: ["admin", "subadmin"],
  },
  {
    label: "Reports",
    link: "/portalpages/reports",
    iconKey: "reports",
    roles: ["admin"],
  },
  {
    label: "Analytics",
    link: "/sjkd",
    iconKey: "analytics",
    roles: ["admin"],
  },
  {
    label: "Profile",
    link: "/viewpages/profile", // base path
    dynamic: true, // custom flag to indicate dynamic link
    iconKey: "profile", // add your profile icon in iconMap
    roles: ["retailer", "distributor", "salesperson"],
  },
  {
    label: "Support",
    link: "/viewpages/contact-us",
    iconKey: "support",
    roles: ["retailer", "distributor", "salesperson"],
  },
  {
    label: "Sign Out",
    link: "",
    iconKey: "signout",
    isLogout: true,
    roles: ["admin", "subadmin", "retailer", "distributor", "salesperson"],
  },
];

const Sidenavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const loginState = useSelector((state) => state.login);
  const admin = loginState?.admin;
  const userType = loginState?.admin?.userType;
  const id = loginState?.admin?.id;
  const [cartItems, setCartItems] = useState([]);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // ✅ state for notification

  const handleLogout = async () => {
    await dispatch(logoutCurrentUser());
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleCloseMenu = () => setShowMobileMenu(false);

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

  return (
    <>
      {/* 📱 Mobile Header (below md) */}
      <div className="2xl:hidden xl:hidden lg:hidden md:flex flex p-3 bg-white shadow-md justify-between items-center w-full">
        <Image src={LogoImage} alt="Logo" className="h-8 w-auto" />

        <div className="flex justify-center gap-4 items-center">
          <IoMdNotificationsOutline
            className="text-[24px] text-[#FFA412] cursor-pointer"
            onClick={() => setShowNotifications(true)}
          />

          {/* Notification Drawer */}
          <NotificationDrawer
            show={showNotifications}
            onClose={() => setShowNotifications(false)}
          />

          {(userType === "retailer" || userType === "distributor") && (
            <div
              className="relative cursor-pointer w-[35px] h-[35px] flex items-center justify-center"
              onClick={cartpage}
            >
              <GiShoppingCart className="text-[32px]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          )}

          <FiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setShowMobileMenu(true)}
          />
        </div>
      </div>

      {/* 💻 Desktop & Tablet Sidebar (md and up) */}
      <div className="2xl:flex xl:flex lg:flex md:hidden hidden flex-col w-[18%] bg-white shadow-sm py-4 h-screen overflow-y-auto">
        <div className="px-4 flex justify-center mb-4">
          <Image src={LogoImage} alt="Logo" className="" />
        </div>

        <div className="flex flex-col gap-3 px-2">
          {sidenavitems
            .filter((item) => item.roles?.includes(userType))
            .map((item) => {
              let targetLink = item.altLinks?.[userType] || item.link;
              if (item.dynamic) targetLink = `${item.link}/${userType}/${id}`;

              // FIXED ACTIVE CHECK
              const isActive =
                !item.isLogout &&
                (targetLink === "/"
                  ? pathname === "/"
                  : pathname.startsWith(targetLink));

              return (
                <SidenavItem
                  key={item.label}
                  item={{ ...item, link: targetLink }}
                  isActive={isActive}
                  onClick={() =>
                    item.isLogout ? handleLogout() : router.push(targetLink)
                  }
                />
              );
            })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={handleCloseMenu}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-[85%] max-w-[300px] bg-white shadow-lg p-4 overflow-y-auto transition-all duration-300 ease-in-out">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div className="w-[120px] ">
                <Image src={LogoImage} alt="Logo" className="w-full h-auto" />
              </div>
              <button onClick={handleCloseMenu} className="text-2xl text-black">
                <FiX />
              </button>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col mt-6 gap-3 text-[14px]">
              {sidenavitems
                .filter((item) => item.roles?.includes(userType))
                .map((item) => {
                  const Icon = iconMap[item.iconKey];
                  let targetLink = item.altLinks?.[userType] || item.link;
                  if (item.dynamic)
                    targetLink = `${item.link}/${userType}/${id}`;

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.isLogout
                          ? handleLogout()
                          : router.push(targetLink);
                        handleCloseMenu();
                      }}
                      className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition"
                    >
                      {Icon ? (
                        <Image
                          src={Icon}
                          alt={`${item.label} icon`}
                          width={20}
                          height={20}
                        />
                      ) : (
                        <span className="w-5 h-5" />
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidenavbar;
