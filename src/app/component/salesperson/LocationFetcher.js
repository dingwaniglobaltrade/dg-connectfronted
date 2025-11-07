"use client";
import React, { useState } from "react";

const LocationFetcher = ({ onLocation, onAddress }) => {
  const [loading, setLoading] = useState(false);

  const fetchLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Send lat/lng to parent
        onLocation({ latitude, longitude });

        try {
          // Reverse geocode
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address =
            data?.display_name || `Lat: ${latitude}, Lng: ${longitude}`;

          // ✅ only parent manages address state
          onAddress(address);
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          onAddress(`Lat: ${latitude}, Lng: ${longitude}`);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Location error:", err);
        alert("Unable to fetch location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  return (
    <button
      type="button"
      onClick={fetchLocation}
      disabled={loading}
      className="bg-primary text-[12px] text-white px-4 py-1.5 rounded-[10px] mt-6"
    >
      {loading ? "Fetching..." : "Get"}
    </button>
  );
};

export default LocationFetcher;
