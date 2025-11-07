"use client";
import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setHasCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Capture image
  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200);
    const imageData = canvasRef.current.toDataURL("image/png"); // base64 string
    setCapturedImage(imageData);
    onCapture(imageData); // send image back to parent form
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
          <video ref={videoRef} autoPlay className="w-64 h-48 border rounded" />
          <button
            type="button"
            onClick={capturePhoto}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          >
            Capture
          </button>
          <canvas ref={canvasRef} width="300" height="200" className="hidden" />
        </>
      )}
      {capturedImage && (
        <img src={capturedImage} alt="Captured" className="w-64 h-48 mt-2 border" />
      )}
    </div>
  );
};

export default CameraCapture;
