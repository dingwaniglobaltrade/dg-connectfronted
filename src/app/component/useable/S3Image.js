"use client";
import Image from "next/image";
import useSignedImage from "@/app/customhooks/useSignedImage";

export default function S3Image({ s3Key, className = "", alt = "" }) {
  const signedUrl = useSignedImage(s3Key);
console.log({s3Key});

  if (!signedUrl) {
    return (
      <div className="bg-gray-200 animate-pulse rounded w-full h-full" />
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={signedUrl}
        alt={alt}
        fill
        className={className}
      />
    </div>
  );
}
