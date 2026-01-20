"use client";
import Image from "next/image";
import useSignedImage from "@/app/customhooks/useSignedImage";

export default function S3Image({ s3Key, alt, ...props }) {
  const signedUrl = useSignedImage(s3Key);

  if (!signedUrl) return null;

  return <Image src={signedUrl} alt={alt} {...props} />;
}
