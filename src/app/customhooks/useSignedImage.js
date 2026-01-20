"use client";
import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";

export default function useSignedImage(s3Key, refreshMs = 5 * 60 * 60 * 1000) {
  const [url, setUrl] = useState(null);

  async function fetchSignedUrl() {
    if (!s3Key) return;

    try {
      const res = await axios.fetch("/api/v1/s3/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: s3Key }),
      });

      const data = await res.json();
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
