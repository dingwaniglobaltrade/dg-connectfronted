// components/ModelViewer.js
"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

const Model = ({ url }) => {
  console.log({url});
  
  const ref = useRef();

  useEffect(() => {
    if (!url) {
      console.error("No model URL provided!");
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Model file not reachable");
        console.log("Model file exists, now loading via useGLTF...");
      })
      .catch((err) => {
        console.error("3D model fetch failed:", err);
      });
  }, [url]);

  const gltf = useGLTF(url); // must come AFTER url is defined

  useEffect(() => {
    if (gltf && ref.current) {
      console.log("GLTF loaded successfully from:");

      const box = new Box3().setFromObject(ref.current);
      const size = new Vector3();
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredSize = 2;
      const scale = desiredSize / maxDim;

      const center = new Vector3();
      box.getCenter(center);
      ref.current.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
    }
  }, [gltf, url]);

  if (!gltf) return null;

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// useGLTF.preload(url);

const ModelViewer = ({ url }) => {

  if (!url) return <p>No 3D model available</p>;

  return (
    <div className="lg:w-[700px] md:w-auto lg:h-[600px] h-auto bg-gray-200 rounded-[16px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 12, 22]} intensity={1.5} />
        <axesHelper args={[5]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxDistance={10}
          minDistance={3}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
