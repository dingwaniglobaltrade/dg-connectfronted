"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import ProductDetailes from "@/app/component/Productmodless/productdetailes";
import ProtectedRoute from "@/app/component/protectedroute";
import { useDispatch } from "react-redux";
import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import S3Image from "../useable/S3Image";

import { fetchProductbyID } from "@/app/store/Actions/productAction";

// Lazy load 3D viewer
const ModelViewer = dynamic(
  () => import("@/app/component/Productmodless/ModelViewer.js"),
  { ssr: false },
);

const Page = ({ params }) => {
  // For Next.js 15+, use() is required if params is a Promise
  const { id } = use(params);

  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchProductbyID(id));
        console.log("Fetched product data:", result);
        setProductData(result);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const media = productData?.media || [];
  const modelFile = media.find((m) => m.type === "GLB");
  const imageFiles = media.filter((m) => m.type === "IMAGE");
  console.log({ imageFiles });
  const signedModelUrl = useSignedFile(modelFile?.fileName);

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="flex flex-col h-full">
          {/* Navbar */}
          <div className="w-full h-[12%] mt-3">
            <Upernavbar pagename="Product Details" />
          </div>

          {/* Main Section */}
          <div className="w-full py-6 flex lg:flex-row md:flex-col flex-col h-full justify-center items-center">
            {/* Swiper Section */}
            <div className="lg:w-[50%] md:w-full w-full lg:h-full h-auto">
              {media.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  // navigation
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  className="rounded-lg shadow-md bg-white "
                >
                  {/* First Slide - 3D Model */}
                  {modelFile && (
                    <SwiperSlide key="model-viewer">
                      <div className="w-full h-full flex justify-center items-center bg-gray-100">
                        <ModelViewer url={signedModelUrl} />
                      </div>
                    </SwiperSlide>
                  )}

                  {/* 🖼️ Image Slides */}
                  {imageFiles.length > 0
                    ? imageFiles.map((img, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-full h-[400px] relative">
                            <S3Image
                              s3Key={img.url}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </SwiperSlide>
                      ))
                    : !modelFile && (
                        <SwiperSlide>
                          <p className="text-center py-10 text-gray-600">
                            No media found
                          </p>
                        </SwiperSlide>
                      )}
                </Swiper>
              ) : (
                <p className="text-center text-gray-500 mt-5">
                  No media available
                </p>
              )}
            </div>

            {/* Product Details Section */}
            <div className="lg:w-[40%] w-full lg:h-full h-auto mt-6 lg:mt-0">
              <ProductDetailes product={productData} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
