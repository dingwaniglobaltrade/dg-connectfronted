"use client";
import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: { ideal: "environment" }, // Rear camera on phones
          width: { ideal: 1280 },               // Safe defaults
          height: { ideal: 720 },
          aspectRatio: { ideal: 1.777 },        // Fixes iOS white screen
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Required for iOS + modal overlays
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play();
      }

      setHasCamera(true);
    } catch (err) {
      console.log("Camera error: ", err);
      alert("Camera not available on this device or permission denied.");
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
            className="w-64 h-48 border rounded bg-black"
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
