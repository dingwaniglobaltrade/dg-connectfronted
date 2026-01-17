"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchEnquries } from "@/app/store/Actions/enquriesAction";

const EnquiryCard = () => {
  const dispatch = useDispatch();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await dispatch(
          asyncfetchEnquries({
            page: currentPage,
            limit: pageSize,
          })
        );

        if (result?.data) {
          setEnquiries(result.data);
        }
      } catch (err) {
        console.error("Error fetching enquiries:", err);
        setError("Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage]);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Viewed: "bg-blue-100 text-blue-700",
    "Not-Viewed": "bg-gray-100 text-gray-700",
    Intrested: "bg-green-100 text-green-700",
    "Not-intrested": "bg-red-100 text-red-700",
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div
      className="
        max-h-[85vh] 
        overflow-y-auto 
        px-2
      "
    >
      <div className="flex flex-wrap justify-center">
        {enquiries.length === 0 ? (
          <p className="p-4 text-gray-500">No enquiries found</p>
        ) : (
          enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-4"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 cursor-pointer"
                  onClick={() =>
              window.open(`/portalpages/enquries/${enquiry.id}`, "_blank")
            }>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4 ">
                  <h1 className="text-lg font-semibold truncate">
                    {enquiry.FirstName} {enquiry.LastName}
                  </h1>

                  <span
                    className={`px-3 py-1 text-sm rounded-full w-fit ${
                      statusColors[enquiry.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {enquiry.status}
                  </span>
                </div>

                {/* Body */}
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Mobile:</span>{" "}
                    {enquiry.mobile}
                  </p>

                  <p className="break-all">
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {enquiry.email}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">Created:</span>{" "}
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EnquiryCard;
