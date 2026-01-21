"use client";
import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";

export default function useSignedImage(
  s3Key,
  refreshMs = 55 * 60 * 1000 // refresh before expiry
) {
  const [url, setUrl] = useState(null);

  async function fetchSignedUrl() {
    if (!s3Key) return;

    try {
      const { data } = await axios.post("/s3/signed-url", {
        key: s3Key,
      });

      setUrl(data.url);
    } catch (err) {
      console.error("Signed URL fetch failed", err);
    }
  }

  useEffect(() => {
    fetchSignedUrl();
    const interval = setInterval(fetchSignedUrl, refreshMs);
    return () => clearInterval(interval);
  }, [s3Key]);

  return url;
}
