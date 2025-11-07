"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncfetchroute } from "@/app/store/Actions/routeAction";
import {
  asyncfetchretailer,
  createRetailer,
  editRetailerdetailes,
} from "@/app/store/Actions/retailerAction";
import { fetchAllDistributor } from "@/app/store/Actions/distributorAction";
import { toast } from "react-toastify";
import LocationFetcher from "@/app/component/salesperson/LocationFetcher";

const RetailerForm = ({ initialData = {}, isEditMode = false }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.admin); //Assuming you store user in redux

  const userRole = user?.userType; // "admin", "subadmin", "salesperson"

  const assignedRoute = user?.routeID; //salesperson's assigned route

  const [retailerFormData, setRetailerFormData] = useState({
    shopName: "",
    shopImage: "",
    name: "",
    email: "",
    mobile: "",
    gstn: "",
    address: "",
    latitude: "",
    longitude: "",
    routeID: "",
    assignedDistributor: "",
  });

  const [routes, setRoutes] = useState([]);
  const [routePage, setRoutePage] = useState(1);
  const [routeHasMore, setRouteHasMore] = useState(true);
  const [loadingRoutes, setLoadingRoutes] = useState(false);

  const [distributor, setDistributor] = useState([]);
  const [distPage, setDistPage] = useState(1);
  const [distHasMore, setDistHasMore] = useState(true);
  const [loadingDist, setLoadingDist] = useState(false);

  const limit = 10; // number per page
  const [liveAddress, setLiveAddress] = useState("");

  // Handle lat/lng update
  const handleLocation = ({ latitude, longitude }) => {
    setRetailerFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  // Handle human-readable address update
  const handleAddress = (address) => {
    setLiveAddress(address);
  };
  console.log("userRole", userRole);
  // Fetch routes only if admin or subadmin

  const loadDistributors = async (pageNum = 1) => {
    if (loadingDist || !distHasMore) return;
    setLoadingDist(true);
    try {
      const result = await dispatch(
        fetchAllDistributor({ page: pageNum, limit })
      );
      console.log({ result: result.distributors });

      if (result?.distributors?.length > 0) {
        setDistributor((prev) => {
          const combined = [...prev, ...result.distributors];
          const unique = combined.filter(
            (dist, index, self) =>
              index === self.findIndex((d) => d.id === dist.id)
          );
          return unique;
        });
        setDistPage(pageNum);
        setDistHasMore(result.distributors.length === limit); // if less than limit, no more
      } else {
        setDistHasMore(false);
      }
    } catch (err) {
      console.error("Distributor fetch error:", err);
    } finally {
      setLoadingDist(false);
    }
  };

  // Fetch routes only if admin or subadmin
  const loadRoutes = async (pageNum = 1) => {
    if (loadingRoutes || !routeHasMore) return;
    setLoadingRoutes(true);
    try {
      const result = await dispatch(asyncfetchroute({ page: pageNum, limit }));
      if (result?.routes?.length > 0) {
        setRoutes((prev) => {
          const combined = [...prev, ...result.routes];
          // Deduplicate by id
          const unique = combined.filter(
            (route, index, self) =>
              index === self.findIndex((r) => r.id === route.id)
          );
          return unique;
        });
        setRoutePage(pageNum);
        setRouteHasMore(result.routes.length === limit);
      } else {
        setRouteHasMore(false);
      }
    } catch (err) {
      console.error("Route fetch error:", err);
    } finally {
      setLoadingRoutes(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (userRole === "admin" || userRole === "subadmin") {
      loadDistributors(1);
      loadRoutes(1);
    } else if (userRole === "distributor") {
      loadRoutes(1);
    }
  }, [dispatch, userRole]);

  // If editing, set initial data
  useEffect(() => {
    if (initialData) {
      const sanitized = Object.fromEntries(
        Object.entries(initialData).map(([key, val]) => [key, val ?? ""])
      );
      setRetailerFormData((prev) => ({ ...prev, ...sanitized }));
    } else if (userRole === "salesperson") {
      // For salesperson, auto-set their assigned route
      setRetailerFormData((prev) => ({
        ...prev,
        routeID: assignedRoute || "",
      }));
    }
  }, [initialData, userRole, assignedRoute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRetailerFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.keys(retailerFormData).forEach((key) => {
        if (
          retailerFormData[key] !== null &&
          retailerFormData[key] !== undefined
        ) {
          formData.append(key, retailerFormData[key]);
        }
      });

      let result;
      if (!initialData) {
        result = await dispatch(createRetailer(formData));
      } else {
        result = await dispatch(
          editRetailerdetailes(retailerFormData.id, formData)
        );
      }

      if (result?.success) {
        toast.success(
          `Retailer ${initialData ? "updated" : "created"} successfully!`
        );
      } else {
        toast.warn(result?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Retailer Submit Error:", err);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      {/* Show location fetcher only for salesperson */}
      {/* {userRole === "salesperson" && (
        <LocationFetcher
          onLocation={handleLocation}
          onAddress={handleAddress}
        />
      )} */}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-1 grid-cols-1">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 text-[12px] mt-2">
            {/* Common fields */}
            <div>
              <label className="text-texthearder font-semibold">
                Shop Name
              </label>
              <input
                type="text"
                name="shopName"
                value={retailerFormData.shopName || ""}
                onChange={handleChange}
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">Image</label>
              <input
                type="file"
                name="shopImage"
                onChange={(e) =>
                  setRetailerFormData((prev) => ({
                    ...prev,
                    shopImage: e.target.files[0],
                  }))
                }
                className="w-full py-1 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">
                Concern Person Name
              </label>
              <input
                type="text"
                name="name"
                value={retailerFormData.name || ""}
                onChange={handleChange}
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={retailerFormData.email || ""}
                onChange={handleChange}
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={retailerFormData.mobile || ""}
                onChange={handleChange}
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">GSTN</label>
              <input
                type="text"
                name="gstn"
                value={retailerFormData.gstn || ""}
                onChange={handleChange}
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">
                Shop Address
              </label>
              <input
                type="text"
                name="address"
                value={retailerFormData.address || ""}
                onChange={handleChange}
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              />
            </div>

            {/* Show Live Location only for salesperson */}

            {user?.userType === "salesperson" && (
              <div className="flex flex-row gap-2">
                <div>
                  <label className="text-texthearder font-semibold">
                    Live Location
                  </label>
                  <input
                    type="text"
                    name="livelocation"
                    value={liveAddress}
                    readOnly
                    className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
                  />
                </div>
                <LocationFetcher
                  onLocation={handleLocation}
                  onAddress={handleAddress}
                />
              </div>
            )}

            {/* Show Routes for the distributor */}

            {user?.userType === "distributor" && (
              <div>
                <label className="text-texthearder font-semibold">Route</label>
                <select
                  name="routeID"
                  value={retailerFormData.routeID || ""}
                  onChange={handleChange}
                  required
                  className="w-full py-1.5 rounded px-2 mt-1 text-black border border-gray-200"
                  onScroll={(e) => {
                    const bottom =
                      e.target.scrollHeight - e.target.scrollTop <=
                      e.target.clientHeight + 5;
                    if (bottom && routeHasMore) {
                      loadRoutes(routePage + 1);
                    }
                  }}
                >
                  <option value="">Select Route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.routeName}
                    </option>
                  ))}
                  {loadingRoutes && <option disabled>Loading...</option>}
                </select>
              </div>
            )}

            {/* Route & Distributor for Admin/Subadmin */}
            {(user?.userType === "admin" || user?.userType === "subadmin") && (
              <>
                <div>
                  <label className="text-texthearder font-semibold">
                    Route
                  </label>
                  <select
                    name="routeID"
                    value={retailerFormData.routeID || ""}
                    onChange={handleChange}
                    required
                    className="w-full py-1.5 rounded px-2 mt-1 text-black border border-gray-200"
                    onScroll={(e) => {
                      const bottom =
                        e.target.scrollHeight - e.target.scrollTop <=
                        e.target.clientHeight + 5;
                      if (bottom && routeHasMore) {
                        loadRoutes(routePage + 1);
                      }
                    }}
                  >
                    <option value="">Select Route</option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.routeName}
                      </option>
                    ))}
                    {loadingRoutes && <option disabled>Loading...</option>}
                  </select>
                </div>

                <div>
                  <label className="text-texthearder font-semibold">
                    Distributor
                  </label>
                  <select
                    name="assignedDistributor"
                    value={retailerFormData.assignedDistributor || ""}
                    onChange={handleChange}
                    required
                    className="w-full py-1.5 rounded px-2 mt-1 text-black border border-gray-200"
                    onScroll={(e) => {
                      const bottom =
                        e.target.scrollHeight - e.target.scrollTop <=
                        e.target.clientHeight + 5;
                      if (bottom && distHasMore) {
                        loadDistributors(distPage + 1);
                      }
                    }}
                  >
                    <option value="">Select Distributor</option>
                    {distributor.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.firmName}
                      </option>
                    ))}
                    {loadingDist && <option disabled>Loading...</option>}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
          >
            {initialData ? "Update Retailer" : "Create Retailer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RetailerForm;
