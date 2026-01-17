"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchEnquiryByID,
  updatetheEnquriesStatus,
} from "@/app/store/Actions/enquriesAction";

const STATUS_OPTIONS = [
  "Pending",
  "Viewed",
  "Not-Viewed",
  "Intrested",
  "Not-intrested",
];

const ROLE_OPTIONS = ["Retailer", "Distributor", "Trader", "Others"];

const EnquiryDetailsPage = ({ id }) => {
  const dispatch = useDispatch();

  const [enquiry, setEnquiry] = useState(null);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await dispatch(fetchEnquiryByID(id));
        setEnquiry(result);

        // initialize editable fields
        setStatus(result.status);
        setRole(result.UserRoleIntrested || "");
      } catch {
        setError("Failed to load enquiry details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleUpdate = async () => {
    setUpdating(true);

    const result = await dispatch(
      updatetheEnquriesStatus(id, {
        status,
        UserRoleIntrested: role,
      })
    );

    if (result?.success) {
      setEnquiry((prev) => ({
        ...prev,
        status,
        UserRoleIntrested: role,
      }));
    }

    setUpdating(false);
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!enquiry) return null;

  return (
    <div className="max-h-[85vh] overflow-y-auto bg-gray-50 px-4 sm:px-8 lg:px-16 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {enquiry.FirstName} {enquiry.LastName}
          </h1>

          {/* Editable Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              <option value="">Select Role</option>
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <button
              onClick={handleUpdate}
              disabled={updating}
              className="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
        {/* Sections */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {" "}
          {/* Personal Info */}{" "}
          <div>
            {" "}
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              {" "}
              Personal Information{" "}
            </h3>{" "}
            <ul className="space-y-2 text-sm text-gray-600">
              {" "}
              <li>
                {" "}
                <b>Age:</b> {enquiry.age || "-"}{" "}
              </li>{" "}
              <li>
                {" "}
                <b>Qualification:</b> {enquiry.qualification || "-"}{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          {/* Contact Info */}{" "}
          <div>
            {" "}
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              {" "}
              Contact Information{" "}
            </h3>{" "}
            <ul className="space-y-2 text-sm text-gray-600">
              {" "}
              <li>
                {" "}
                <b>Mobile:</b> {enquiry.mobile}{" "}
              </li>{" "}
              <li className="break-all">
                {" "}
                <b>Email:</b> {enquiry.email}{" "}
              </li>{" "}
              <li>
                {" "}
                <b>City:</b> {enquiry.city || "-"}{" "}
              </li>{" "}
              <li>
                {" "}
                <b>State:</b> {enquiry.state || "-"}{" "}
              </li>{" "}
              <li>
                {" "}
                <b>Country:</b> {enquiry.country || "-"}{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          {/* Business Info */}{" "}
          <div className="md:col-span-2">
            {" "}
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              {" "}
              Business Information{" "}
            </h3>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              {" "}
              <p>
                {" "}
                <b>Company:</b> {enquiry.Company || "-"}{" "}
              </p>{" "}
              <p>
                {" "}
                <b>Business Type:</b> {enquiry.BussinessType || "-"}{" "}
              </p>{" "}
              <p>
                {" "}
                <b>Nature:</b> {enquiry.bussinessNature || "-"}{" "}
              </p>{" "}
              <p>
                {" "}
                <b>Experience:</b> {enquiry.experienceInCurrentBussiness || "-"}{" "}
              </p>{" "}
              <p>
                {" "}
                <b>Annual Revenue:</b> {enquiry.annualRevenue || "-"}{" "}
              </p>{" "}
              <p>
                {" "}
                <b>Infrastructure:</b> {enquiry.infrastructure || "-"}{" "}
              </p>{" "}
              <p>
                {" "}
                <b>Vehicle:</b> {enquiry.vehicle || "-"}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Reason */}{" "}
          <div className="md:col-span-2">
            {" "}
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              {" "}
              Interest Reason{" "}
            </h3>{" "}
            <p className="text-sm text-gray-600">
              {" "}
              {enquiry.interestReason || "-"}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Footer */}{" "}
        <div className="mt-10 text-sm text-gray-500">
          {" "}
          Created on {new Date(enquiry.createdAt).toLocaleDateString()}{" "}
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetailsPage;
