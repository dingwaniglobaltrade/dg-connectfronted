"use client";
import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

const startCamera = async () => {
  try {
    setHasCamera(true);

    // Wait for the video element to appear on screen
    await new Promise((resolve) => setTimeout(resolve, 300));

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" } // for front camera
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  } catch (err) {
    console.error("Camera error:", err);
    alert("Unable to access camera");
  }
};


  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Ensure canvas matches video stream resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const img = canvas.toDataURL("image/jpeg");

    setCapturedImage(img);
    onCapture(img);

    // Stop camera after capture
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setHasCamera(false);
  };

  return (
    <div className="flex flex-col items-start mt-1">

      {!hasCamera ? (
        <button
          type="button"
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Camera
        </button>
      ) : (
        <>
      <video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="w-64 h-48 border rounded"
  style={{ objectFit: "cover", backgroundColor: "black" }}
/>

          <button
            type="button"
            onClick={capturePhoto}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          >
            Capture
          </button>

          <canvas ref={canvasRef} className="hidden"></canvas>
        </>
      )}

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="w-64 h-48 mt-2 border rounded"
        />
      )}
    </div>
  );
};

export default CameraCapture;
