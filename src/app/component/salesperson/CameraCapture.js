"use client";
import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // 🔥 Needed for Chrome & mobile browsers
        await videoRef.current.play();
      }

      setHasCamera(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // 🔥 Canvas size must match video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imageData = canvas.toDataURL("image/jpeg");

    setCapturedImage(imageData);
    onCapture(imageData);

    // Stop camera
    const stream = video.srcObject;
    stream.getTracks().forEach((track) => track.stop());
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
          <video ref={videoRef} className="w-64 h-48 border rounded" />
          <button
            type="button"
            onClick={capturePhoto}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          >
            Capture
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="w-64 h-48 mt-2 border"
        />
      )}
    </div>
  );
};

export default CameraCapture;
